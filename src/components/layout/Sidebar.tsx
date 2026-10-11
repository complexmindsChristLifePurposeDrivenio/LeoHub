import React from "react";
import { NavigationTab } from "../../types";
import {
  Compass,
  Calendar,
  Sparkles,
  MapPin,
  FileCheck,
  Newspaper,
  Scissors,
  GraduationCap,
  MessageSquare,
  Cpu,
  PenTool,
  Layers,
  History,
  Server,
  Image as ImageIcon,
  Video,
  FolderKanban,
  Users,
  ShoppingBag,
  Terminal,
  BarChart3,
  DollarSign,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavGroup {
  label: string;
  items: {
    tab: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Execution & Strategy",
    items: [
      { tab: "cornerstone_calendar", label: "13-Week Blueprint", icon: Calendar },
      { tab: "command_center", label: "Command Center", icon: Compass },
      { tab: "overdrive_vi", label: "OVERDRIVE VI", icon: MapPin },
      { tab: "leonida_intelligence", label: "Leonida Intelligence", icon: FileCheck },
      { tab: "leonida_newsroom", label: "Leonida Newsroom", icon: Newspaper },
    ],
  },
  {
    label: "Creative Production",
    items: [
      { tab: "content_factory", label: "GTA Content Factory", icon: Sparkles },
      { tab: "clipforge", label: "ClipForge Studio", icon: Scissors },
      { tab: "creator_studio", label: "Creator Studio", icon: PenTool },
      { tab: "motion_hub", label: "Motion Hub (Liquid Glass)", icon: Layers },
      { tab: "video_lab", label: "Video Lab", icon: Video },
    ],
  },
  {
    label: "AI & Synthesis",
    items: [
      { tab: "gta_chat", label: "GTA Chat (Gemini)", icon: MessageSquare },
      { tab: "gta_llm", label: "GTA LLM & RAG", icon: Cpu },
      { tab: "ai_lab", label: "AI Lab & NVIDIA Stack", icon: Server },
      { tab: "image_lab", label: "Image Lab (SD 3.5)", icon: ImageIcon },
    ],
  },
  {
    label: "Culture & Education",
    items: [
      { tab: "gta_dojo", label: "GTA Dojo", icon: GraduationCap },
      { tab: "nostalgia_lab", label: "Nostalgia Lab (PS2)", icon: History },
      { tab: "community", label: "Community", icon: Users },
    ],
  },
  {
    label: "Commerce & Platform",
    items: [
      { tab: "content_hub", label: "Content Hub", icon: FolderKanban },
      { tab: "marketplace", label: "Marketplace", icon: ShoppingBag },
      { tab: "developer_portal", label: "Developer Portal", icon: Terminal },
      { tab: "analytics", label: "Analytics", icon: BarChart3 },
      { tab: "monetization", label: "Monetization", icon: DollarSign },
      { tab: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
}) => {
  return (
    <aside
      className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-[#0B0C10]/95 backdrop-blur-2xl border-r border-white/[0.08] transition-all duration-200 flex flex-col ${
        isOpen ? "w-64" : "w-16"
      } shrink-0 overflow-y-auto overflow-x-hidden`}
    >
      <div className="p-3 flex-1 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            {isOpen && (
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => onSelectTab(item.tab)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left group ${
                      isActive
                        ? "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 shadow-[0_0_12px_rgba(0,255,102,0.15)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-[#00FF66]"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    {isOpen && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {isOpen && isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#00FF66] opacity-80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Brand Attribution & Disclaimer Footer */}
      {isOpen && (
        <div className="p-3 border-t border-white/[0.06] text-[11px] text-slate-400 space-y-1 bg-black/30">
          <div className="flex items-center justify-between">
            <span>CMPlay Ecosystem</span>
            <span className="text-[#00FF66]">Nov 19, 2026</span>
          </div>
          <div className="text-[10px] leading-tight text-slate-400">
            Unofficial fan & creator platform. Not affiliated with Rockstar Games.
          </div>
        </div>
      )}
    </aside>
  );
};
