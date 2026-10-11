import React, { useState } from "react";
import { DollarSign, Check, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

export const MonetizationView: React.FC = () => {
  const [activePlan, setActivePlan] = useState<"creator" | "studio" | "enterprise">("creator");

  const revenueStreams = [
    { name: "ClipForge Pro & Studio Subscriptions", amount: 3840.0, pct: 45 },
    { name: "GTA Dojo Certifications & Courses", amount: 1890.5, pct: 24 },
    { name: "Marketplace Asset Royalties (HUD / LUTs)", amount: 1120.0, pct: 18 },
    { name: "Developer API & RAG Inference Credits", amount: 760.0, pct: 13 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#00FF66]" />
            <span>Monetization Engine & Revenue Streams</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Diversified revenue architecture: consumer subscriptions, creator tooling, digital marketplace, and B2B RAG.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FF66] bg-[#00FF66]/10 px-3 py-1.5 rounded-lg border border-[#00FF66]/20">
          <span>Gross MRR: $7,610.50</span>
        </div>
      </div>

      {/* Revenue Breakdown Progress Bars */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
        <div className="text-xs font-semibold text-white">Monthly Revenue Stream Distribution</div>
        <div className="space-y-3">
          {revenueStreams.map((stream) => (
            <div key={stream.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{stream.name}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-white font-bold tabular-nums">${stream.amount.toFixed(2)}</span>
                  <span className="text-slate-500">({stream.pct}%)</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00FF66] rounded-full"
                  style={{ width: `${stream.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Tier Cards for Creators */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-white">Creator & Studio Subscription Tiers</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => setActivePlan("creator")}
            className={`p-5 rounded-xl border transition-all cursor-pointer space-y-4 ${
              activePlan === "creator"
                ? "bg-[#0E1017] border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.15)]"
                : "bg-[#0E1017]/70 border-white/[0.08]"
            }`}
          >
            <div>
              <div className="text-xs text-[#00FF66] font-mono font-bold">FOR SOLO CREATORS</div>
              <h3 className="text-lg font-bold text-white mt-1">Creator Pro</h3>
              <div className="text-2xl font-mono font-extrabold text-white mt-2 tabular-nums">
                $29 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00FF66]" /> Unlimited ClipForge 9:16 Exports
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00FF66]" /> Gemini 3.8 Script & Hook Generator
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00FF66]" /> GTA Dojo Yellow → Blue Belt Access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00FF66]" /> 500 SD 3.5 Large Image Generations
              </li>
            </ul>

            <button className="w-full py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-colors">
              {activePlan === "creator" ? "Current Active Plan" : "Switch to Creator Pro"}
            </button>
          </div>

          <div
            onClick={() => setActivePlan("studio")}
            className={`p-5 rounded-xl border transition-all cursor-pointer space-y-4 ${
              activePlan === "studio"
                ? "bg-[#0E1017] border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                : "bg-[#0E1017]/70 border-white/[0.08]"
            }`}
          >
            <div>
              <div className="text-xs text-[#FFD700] font-mono font-bold">FOR MEDIA TEAMS</div>
              <h3 className="text-lg font-bold text-white mt-1">Production Studio</h3>
              <div className="text-2xl font-mono font-extrabold text-white mt-2 tabular-nums">
                $99 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFD700]" /> Multi-Seat Creator Collaboration (5 seats)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFD700]" /> NVIDIA NIM Dedicated Inference Queue
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFD700]" /> Full GTA Dojo Black Belt Masterclass
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FFD700]" /> 4K ProRes & WebM HUD Alpha Overlays
              </li>
            </ul>

            <button className="w-full py-2 rounded-lg bg-[#FFD700] text-black font-semibold text-xs hover:bg-[#FFD700]/90 transition-colors">
              {activePlan === "studio" ? "Current Active Plan" : "Upgrade to Studio"}
            </button>
          </div>

          <div
            onClick={() => setActivePlan("enterprise")}
            className={`p-5 rounded-xl border transition-all cursor-pointer space-y-4 ${
              activePlan === "enterprise"
                ? "bg-[#0E1017] border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                : "bg-[#0E1017]/70 border-white/[0.08]"
            }`}
          >
            <div>
              <div className="text-xs text-cyan-400 font-mono font-bold">B2B & ENTERPRISE</div>
              <h3 className="text-lg font-bold text-white mt-1">White-Label OS</h3>
              <div className="text-2xl font-mono font-extrabold text-white mt-2 tabular-nums">
                $499 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" /> Private RAG Vector Deployment on Cloud SQL
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" /> Custom Domain & White-Label Creator UI
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" /> 10,000 SDK / API Requests / Hour
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" /> Dedicated Technical Lead
              </li>
            </ul>

            <button className="w-full py-2 rounded-lg bg-cyan-400 text-black font-semibold text-xs hover:bg-cyan-300 transition-colors">
              {activePlan === "enterprise" ? "Current Active Plan" : "Inquire Enterprise"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
