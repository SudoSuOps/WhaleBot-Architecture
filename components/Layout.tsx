import React, { useState } from "react";

import WhaleBotView from "./WhaleBotView";
import NetworkView from "./NetworkView";
import ProtocolView from "./ProtocolView";
import HowItWorksView from "./HowItWorksView";
import StrategyView from "./StrategyView";
import SignalPanel from "./SignalPanel";
import SystemMonitor from "./SystemMonitor";
import SettingsView from "./SettingsView";

const tabs = [
  { id: "whalebot", label: "WhaleBot" },
  { id: "network", label: "Network" },
  { id: "protocol", label: "Protocol" },
  { id: "how", label: "How It Works" },
  { id: "strategy", label: "Strategies" },
  { id: "signals", label: "Signals" },
  { id: "system", label: "System Monitor" },
  { id: "settings", label: "Settings" }
];

export default function Layout() {
  const [active, setActive] = useState("whalebot");

  const render = () => {
    switch (active) {
      case "whalebot": return <WhaleBotView />;
      case "network": return <NetworkView />;
      case "protocol": return <ProtocolView />;
      case "how": return <HowItWorksView />;
      case "strategy": return <StrategyView />;
      case "signals": return <SignalPanel />;
      case "system": return <SystemMonitor />;
      case "settings": return <SettingsView />;
      default: return <WhaleBotView />;
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-whale-900 p-4 border-r border-whale-700">
        <div className="text-xl font-bold mb-6 text-whale-light">
          WhalePerp
        </div>

        <nav className="flex flex-col space-y-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`p-2 text-left rounded ${
                active === t.id
                  ? "bg-whale-700 text-white"
                  : "text-whale-light hover:bg-whale-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto bg-whale-950">
        {render()}
      </main>
    </div>
  );
}
