import React from "react";
import { NavigationTab } from "../../types";
import { Search, Sparkles, ShieldAlert, BookOpen } from "lucide-react";

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenQuickSearch: () => void;
  onOpenNewProduction: () => void;
  onOpenTutorial: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickSearch,
  onOpenNewProduction,
  onOpenTutorial,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 md:px-6 flex items-center justify-between transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectTab("command_center")}
        className="text-left font-display font-bold text-lg md:text-xl tracking-tight text-white hover:text-[#00FF66] transition-colors focus:outline-none flex items-center gap-2"
      >
        <span className="text-[#00FF66]">LEONIDA</span>
        <span className="text-white/80 font-light text-sm tracking-widest uppercase">CREATOR HUB</span>
      </button>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectTab("content_factory")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 flex items-center gap-1.5 ${
            currentTab === "content_factory"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-[#00FF66] font-bold">Content Factory</span>
        </button>
        <button
          onClick={() => onSelectTab("cornerstone_calendar")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 flex items-center gap-1.5 ${
            currentTab === "cornerstone_calendar"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          <span>13-Week Plan</span>
        </button>
        <button
          onClick={() => onSelectTab("command_center")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "command_center"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          Command
        </button>
        <button
          onClick={() => onSelectTab("overdrive_vi")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "overdrive_vi"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          Overdrive VI
        </button>
        <button
          onClick={() => onSelectTab("clipforge")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "clipforge"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          ClipForge
        </button>
        <button
          onClick={() => onSelectTab("gta_dojo")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "gta_dojo"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          GTA Dojo
        </button>
        <button
          onClick={() => onSelectTab("gta_chat")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "gta_chat"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          GTA Chat
        </button>
        <button
          onClick={() => onSelectTab("marketplace")}
          className={`hover:text-white transition-colors cursor-pointer pb-1 ${
            currentTab === "marketplace"
              ? "text-white border-b-2 border-[#00FF66] font-semibold"
              : "text-slate-400"
          }`}
        >
          Marketplace
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenTutorial}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-200 transition-colors cursor-pointer"
          title="System Architecture & Operating Tutorial"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#00FF66]" />
          <span className="hidden sm:inline">Tutorial</span>
        </button>

        <button
          onClick={onOpenQuickSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 transition-colors"
          title="Global Search"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search Intel</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] rounded border border-white/[0.1] text-slate-400">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={onOpenNewProduction}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_15px_rgba(0,255,102,0.25)] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">New Production</span>
        </button>
      </div>
    </header>
  );
};
