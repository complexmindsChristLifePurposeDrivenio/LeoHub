import React, { useState } from "react";
import { Settings, Shield, Server, Bell, Key, Database, Check } from "lucide-react";

export const SettingsView: React.FC = () => {
  const [brandSilo, setBrandSilo] = useState<"CMPlay" | "Cornerstone">("CMPlay");
  const [gpuEndpoint, setGpuEndpoint] = useState("https://nim.nvidia.cornerstone.internal:8000/v1");
  const [autoCitation, setAutoCitation] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#00FF66]" />
            <span>Leonida Hub Settings & Brand Governance</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage infrastructure routing, brand silo separation, and AI inference endpoints.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-[#00FF66] border border-emerald-500/30 text-xs">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-3xl">
        {/* Brand Governance Silo */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Shield className="w-4 h-4 text-[#00FF66]" />
            <span>Brand Governance & Data Siloing</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Principle: Cornerstone provides foundational infrastructure (auth, db, routing); CMPlay provides the dedicated GTA & gaming creator ecosystem.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setBrandSilo("CMPlay")}
              className={`p-3 rounded-lg text-left text-xs border transition-all ${
                brandSilo === "CMPlay"
                  ? "bg-[#00FF66]/10 border-[#00FF66] text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-slate-400"
              }`}
            >
              <div className="font-bold text-[#00FF66]">CMPlay Vertical</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                GTA VI, Vice City, Leonida, GTA Dojo, ClipForge
              </div>
            </button>

            <button
              type="button"
              onClick={() => setBrandSilo("Cornerstone")}
              className={`p-3 rounded-lg text-left text-xs border transition-all ${
                brandSilo === "Cornerstone"
                  ? "bg-[#FFD700]/10 border-[#FFD700] text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-slate-400"
              }`}
            >
              <div className="font-bold text-[#FFD700]">The Cornerstone Hub</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Multi-brand parent infrastructure & enterprise routing
              </div>
            </button>
          </div>
        </div>

        {/* AI & GPU Cluster Settings */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Inference Endpoints & RAG Storage</span>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              NVIDIA NIM Cluster Base URL
            </label>
            <input
              type="text"
              value={gpuEndpoint}
              onChange={(e) => setGpuEndpoint(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#00FF66]/50"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs text-slate-200">Enforce Automated Source Citations</div>
              <div className="text-[11px] text-slate-500">
                Requires all GTA Chat responses to link to verified research
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoCitation}
              onChange={(e) => setAutoCitation(e.target.checked)}
              className="accent-[#00FF66]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.2)]"
        >
          Save System Configuration
        </button>
      </form>
    </div>
  );
};
