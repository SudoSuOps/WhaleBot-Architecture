export type Direction = "LONG" | "SHORT" | "NEUTRAL";

export interface MarketSnapshot {
  asset: string;
  price: number;
  markPrice?: number;
  fundingRate?: number;
  fundingZScore?: number;
  openInterestUsd?: number;
  oiChangePct1h?: number;
  volume24hUsd?: number;
  basisAnnualizedPct?: number;
  volatility1h?: number;
  volatility24h?: number;
  orderbookSkew?: number;        // +ve = bid heavy, -ve = ask heavy
  whaleFlowToxicity?: number;    // 0-1, 1 = super toxic flow
  liquidationBandsAbove?: number;
  liquidationBandsBelow?: number;
  timestamp: number;
}

export interface ModelOpinion {
  model: string;                 // "gpt-4.1", "gemini-2.0-flash", "qwen-32b"
  direction: Direction;
  probLong: number;              // 0-1
  probShort: number;             // 0-1
  horizonMinutes: number;        // typical holding horizon
  reasoning: string;
  rawText?: string;
}

export type ConfidenceLabel = "LOW" | "MEDIUM" | "HIGH";

export interface EnsembleDecision {
  asset: string;
  price: number;
  finalDirection: Direction;
  finalProbLong: number;
  finalProbShort: number;
  confidenceLabel: ConfidenceLabel;
  modelOpinions: ModelOpinion[];
  snapshot: MarketSnapshot;
}

/**
 * Clamp helper
 */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * Compute confidence label based on dispersion + agreement.
 */
function computeConfidence(opinions: ModelOpinion[]): ConfidenceLabel {
  if (opinions.length === 0) return "LOW";

  const avgLong =
    opinions.reduce((acc, o) => acc + clamp01(o.probLong), 0) /
    opinions.length;
  const avgShort =
    opinions.reduce((acc, o) => acc + clamp01(o.probShort), 0) /
    opinions.length;

  const primary = Math.max(avgLong, avgShort);
  const directions = opinions.map((o) => o.direction);
  const longCount = directions.filter((d) => d === "LONG").length;
  const shortCount = directions.filter((d) => d === "SHORT").length;
  const majority = Math.max(longCount, shortCount);

  if (primary > 0.7 && majority >= 2) return "HIGH";
  if (primary > 0.55 && majority >= 2) return "MEDIUM";
  return "LOW";
}

/**
 * Fuse multiple model opinions into final ensemble decision.
 */
export function fuseOpinions(
  asset: string,
  price: number,
  snapshot: MarketSnapshot,
  opinions: ModelOpinion[]
): EnsembleDecision {
  if (opinions.length === 0) {
    return {
      asset,
      price,
      finalDirection: "NEUTRAL",
      finalProbLong: 0.5,
      finalProbShort: 0.5,
      confidenceLabel: "LOW",
      modelOpinions: [],
      snapshot,
    };
  }

  const avgLong =
    opinions.reduce((acc, o) => acc + clamp01(o.probLong), 0) /
    opinions.length;
  const avgShort =
    opinions.reduce((acc, o) => acc + clamp01(o.probShort), 0) /
    opinions.length;

  let finalDirection: Direction = "NEUTRAL";
  if (avgLong > 0.55 && avgLong > avgShort + 0.05) {
    finalDirection = "LONG";
  } else if (avgShort > 0.55 && avgShort > avgLong + 0.05) {
    finalDirection = "SHORT";
  } else {
    finalDirection = "NEUTRAL";
  }

  const confidenceLabel = computeConfidence(opinions);

  return {
    asset,
    price,
    finalDirection,
    finalProbLong: clamp01(avgLong),
    finalProbShort: clamp01(avgShort),
    confidenceLabel,
    modelOpinions: opinions,
    snapshot,
  };
}
