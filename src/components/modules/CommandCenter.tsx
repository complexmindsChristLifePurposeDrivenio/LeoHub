import React from "react";
import { NavigationTab } from "../../types";
import { ASSETS } from "../../assets/assetPaths";
import { GTA_VI_RELEASE_DATE, INITIAL_CONTENT_ITEMS, DOJO_TRACKS } from "../../data/mockData";
import { triggerIcsDownload } from "../../data/cornerstoneBlueprintData";
import {
  Compass,
  Calendar,
  Sparkles,
  Scissors,
  MapPin,
  MessageSquare,
  GraduationCap,
  Play,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  Clock,
  Layers,
  CheckCircle2,
  Download,
  ChevronRight,
} from "lucide-react";

interface CommandCenterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onSelectTab }) => {
  // Calculate days until Nov 19, 2026
  const targetDate = new Date(GTA_VI_RELEASE_DATE);
  const today = new Date();
  const diffTime = Math.max(0, targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Showcase with Liquid Glass Aesthetic */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0E1017]">
        <div className="absolute inset-0">
          <img
            src={ASSETS.heroSkyline}
            alt="Vice City Skyline at Sunset"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-medium text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>Target Launch: November 19, 2026</span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-[#00FF66] tabular-nums">{diffDays} Days Remaining</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Leonida Creator Operating System
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            The unified infrastructure for GTA intelligence, 9:16 ClipForge transformation,
            RAG knowledge research, Stable Diffusion 3.5 visual generation, and creator monetization.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab("content_factory")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Content Factory (GodMode)</span>
            </button>
            <button
              onClick={() => onSelectTab("cornerstone_calendar")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-medium text-xs backdrop-blur-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#00FF66]" />
              <span>13-Week Operating Plan</span>
            </button>
            <button
              onClick={() => onSelectTab("clipforge")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-medium text-xs backdrop-blur-lg transition-colors cursor-pointer"
            >
              <Scissors className="w-4 h-4 text-cyan-400" />
              <span>Launch ClipForge</span>
            </button>
            <button
              onClick={() => onSelectTab("overdrive_vi")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-medium text-xs backdrop-blur-lg transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Explore Leonida Map</span>
            </button>
            <button
              onClick={() => onSelectTab("gta_chat")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-medium text-xs backdrop-blur-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Query GTA Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cornerstone OS 13-Week Blueprint Execution Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0E1017] via-[#141824] to-[#0E1017] border border-[#00FF66]/30 shadow-[0_0_25px_rgba(0,255,102,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
              OFFICIAL BLUEPRINT
            </span>
            <span className="text-xs font-mono text-slate-300">
              Week 3: Content Engine (Oct 5–9, 2026) · Thursday Focus
            </span>
          </div>
          <h2 className="text-base font-display font-bold text-white">
            Cornerstone OS Operating Calendar: Execution Layer Active
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rule: <strong>Blueprint → Calendar → Weekly outcome → Build → Content → Distribution → Revenue → Review.</strong> The calendar governs when projects get worked on, preventing backlog clutter across all brand divisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => triggerIcsDownload()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            title="Download Cornerstone_OS_Official_Blueprint_90_Day_Calendar.ics"
          >
            <Download className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>.ics (143 Events)</span>
          </button>
          <button
            onClick={() => onSelectTab("cornerstone_calendar")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_15px_rgba(0,255,102,0.25)] cursor-pointer"
          >
            <span>Open Operating Calendar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Operational Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Clip Pipeline</span>
            <Scissors className="w-3.5 h-3.5 text-[#00FF66]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">14 Active</div>
          <div className="text-[11px] text-slate-400">3 ready for vertical export</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>RAG Verified Claims</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">248 Ingested</div>
          <div className="text-[11px] text-slate-400">98.4% official citation rate</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Dojo Mastery</span>
            <GraduationCap className="w-3.5 h-3.5 text-[#FFD700]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">Green Belt</div>
          <div className="text-[11px] text-slate-400">4 of 12 tracks mastered</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-lg space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Monthly Revenue</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">$6,840.50</div>
          <div className="text-[11px] text-slate-400">+34% vs previous cycle</div>
        </div>
      </div>

      {/* Two Column Layout: Production Pipeline & Quick Studio Routers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Content & Clip Queue (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Active Content Production Queue</h2>
            <button
              onClick={() => onSelectTab("content_hub")}
              className="text-xs text-[#00FF66] hover:underline flex items-center gap-1"
            >
              <span>View All 24 Items</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0E1017]/90 overflow-hidden divide-y divide-white/[0.06]">
            {INITIAL_CONTENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{item.title}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{item.format}</span>
                    <span>·</span>
                    <span className="capitalize">{item.workflowStatus}</span>
                    {item.views && (
                      <>
                        <span>·</span>
                        <span className="font-mono tabular-nums">
                          {item.views.toLocaleString()} views
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs text-slate-400 italic max-w-xs truncate hidden md:block">
                    "{item.hook}"
                  </span>
                  <button
                    onClick={() => onSelectTab("creator_studio")}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-200 border border-white/[0.08] transition-colors"
                  >
                    Open Studio
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Master Flywheel Architecture banner */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-gradient-to-r from-emerald-950/20 to-black/40 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00FF66]" />
              <span>Leonida Master Flywheel Pipeline</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              GTA INFO → LEONIDA INTEL → CONTENT IDEA → SCRIPT → IMAGE/VIDEO LAB → CLIPFORGE → MOTION HUB → PUBLISH → COMMUNITY → ANALYTICS → REINVEST.
            </p>
          </div>
        </div>

        {/* Right: Quick Studio Workflows & System Status */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white">Production Workspaces</h2>
            <div className="space-y-2">
              <button
                onClick={() => onSelectTab("creator_studio")}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-[#00FF66]/10 text-[#00FF66] group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Creator Studio</div>
                  <div className="text-[11px] text-slate-400">Scripts & 3-Second Retention Hooks</div>
                </div>
              </button>

              <button
                onClick={() => onSelectTab("image_lab")}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-[#FFD700]/10 text-[#FFD700] group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Stable Diffusion 3.5 Lab</div>
                  <div className="text-[11px] text-slate-400">Thumbnails, Concept Art & Posters</div>
                </div>
              </button>

              <button
                onClick={() => onSelectTab("nostalgia_lab")}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Nostalgia Lab (PS2 / Y2K)</div>
                  <div className="text-[11px] text-slate-400">GTA III, Vice City 2002, San Andreas</div>
                </div>
              </button>

              <button
                onClick={() => onSelectTab("motion_hub")}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Motion Hub Design System</div>
                  <div className="text-[11px] text-slate-400">Liquid Glass 2026 Tokens & HUDs</div>
                </div>
              </button>
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#00FF66]" />
                Infrastructure Health
              </span>
              <span className="text-[10px] text-[#00FF66] font-mono">NOMINAL</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Gemini API (3.8 Flash)</span>
                <span className="text-slate-200 font-mono">Ready</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>NVIDIA NIM / GPU VRAM</span>
                <span className="text-slate-200 font-mono">7.2 / 24 GB (30%)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>RAG Vector Store (Supabase)</span>
                <span className="text-slate-200 font-mono">15,402 Vectors</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ClipForge Transcoder</span>
                <span className="text-slate-200 font-mono">FFmpeg v7.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
