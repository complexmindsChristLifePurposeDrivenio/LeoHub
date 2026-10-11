import React from "react";
import { BarChart3, TrendingUp, Users, Eye, Play, Sparkles, ArrowUpRight } from "lucide-react";

export const AnalyticsView: React.FC = () => {
  const RETENTION_POINTS = [
    { sec: "0s", pct: 100 },
    { sec: "3s (Hook)", pct: 89 },
    { sec: "10s", pct: 82 },
    { sec: "20s", pct: 76 },
    { sec: "30s", pct: 71 },
    { sec: "45s", pct: 64 },
    { sec: "60s (CTA)", pct: 58 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00FF66]" />
            <span>Audience Retention & Production Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry measuring 3-second hook retention, platform conversion, and asset reuse multiplier.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <TrendingUp className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>Active Loop: 1 Source → 8 Derivatives</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-xs text-slate-400">Total Ecosystem Views</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">1.84M</div>
          <div className="text-[11px] text-[#00FF66] font-mono">+42.8% vs last month</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-xs text-slate-400">Avg 3-Sec Hook Retention</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">89.4%</div>
          <div className="text-[11px] text-[#00FF66] font-mono">+12.1% with ClipForge Hooks</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-xs text-slate-400">Content Reuse Multiplier</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">7.4x</div>
          <div className="text-[11px] text-slate-400">1 raw recording → 7 multiplatform cuts</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-xs text-slate-400">Audience Subscribers</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">94,200</div>
          <div className="text-[11px] text-emerald-400">+3,800 this week</div>
        </div>
      </div>

      {/* Hook Retention Curve Diagram */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Average 60-Second Short Form Retention Curve</div>
            <div className="text-[11px] text-slate-400">Benchmarked across 42 published ClipForge videos</div>
          </div>
          <span className="text-xs font-mono text-[#00FF66]">Above 80th Percentile Benchmark</span>
        </div>

        {/* Visual Retention Graph */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-7 gap-2 items-end h-44">
            {RETENTION_POINTS.map((pt) => (
              <div key={pt.sec} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-mono text-[#00FF66] font-bold tabular-nums">
                  {pt.pct}%
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#00FF66]/20 to-[#00FF66] border-t border-[#00FF66] transition-all duration-300"
                  style={{ height: `${(pt.pct / 100) * 120}px` }}
                />
                <span className="text-[10px] text-slate-400 font-mono">{pt.sec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00FF66]" />
            <span>AI Retention Recommendation:</span>
          </div>
          <span className="text-slate-300 text-[11px]">
            Shots switching camera angles between 0:03 and 0:05 preserve +14% watch time through the midway mark.
          </span>
        </div>
      </div>
    </div>
  );
};
