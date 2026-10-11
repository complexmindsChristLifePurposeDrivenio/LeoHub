import React, { useState, useEffect } from "react";
import { NavigationTab } from "../../types";
import { Search, X, MapPin, Scissors, GraduationCap, Cpu, Calendar } from "lucide-react";
import { INITIAL_ENTITIES } from "../../data/mockData";
import { BLUEPRINT_WEEKS } from "../../data/cornerstoneBlueprintData";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEntities = INITIAL_ENTITIES.filter((entity) =>
    entity.name.toLowerCase().includes(query.toLowerCase()) ||
    entity.description.toLowerCase().includes(query.toLowerCase()) ||
    entity.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredWeeks = BLUEPRINT_WEEKS.filter((w) =>
    w.phase.toLowerCase().includes(query.toLowerCase()) ||
    w.primaryFocus.toLowerCase().includes(query.toLowerCase()) ||
    w.brandDivision.toLowerCase().includes(query.toLowerCase()) ||
    w.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    `week ${w.weekNumber}`.includes(query.toLowerCase()) ||
    "blueprint".includes(query.toLowerCase()) ||
    "calendar".includes(query.toLowerCase()) ||
    "13-week".includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0F1117] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00FF66]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Cornerstone 13-week plan, Supabase, agents, FCI, CMPlay, districts..."
            className="flex-1 bg-transparent border-none text-white placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onSelectTab("content_factory");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#00FF66]/15 border border-[#00FF66]/30 text-xs text-[#00FF66] text-left transition-colors"
              >
                <Cpu className="w-4 h-4 text-[#00FF66]" />
                <div>
                  <div className="font-semibold text-white">Content Factory</div>
                  <div className="text-[10px] text-[#00FF66]/90">GodMode Production</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSelectTab("cornerstone_calendar");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 text-left transition-colors"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-semibold text-white">13-Week Blueprint</div>
                  <div className="text-[10px] text-slate-400">Operating Calendar</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSelectTab("overdrive_vi");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 text-left transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#00FF66]" />
                <div>
                  <div className="font-medium">OVERDRIVE VI Map</div>
                  <div className="text-[10px] text-slate-400">Leonida GIS</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSelectTab("clipforge");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 text-left transition-colors"
              >
                <Scissors className="w-4 h-4 text-[#FFD700]" />
                <div>
                  <div className="font-medium">ClipForge Studio</div>
                  <div className="text-[10px] text-slate-400">9:16 Moment Clipping</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSelectTab("gta_dojo");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 text-left transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-medium">GTA Dojo</div>
                  <div className="text-[10px] text-slate-400">12 Belt Tracks</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSelectTab("gta_chat");
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 text-left transition-colors"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-medium">GTA Chat Assistant</div>
                  <div className="text-[10px] text-slate-400">Gemini Powered RAG</div>
                </div>
              </button>
            </div>
          </div>

          {filteredWeeks.length > 0 && query && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#00FF66] px-2 mb-1.5 flex items-center justify-between">
                <span>Cornerstone 13-Week Blueprint ({filteredWeeks.length})</span>
                <span className="text-[10px] text-slate-400 font-mono">143 Scheduled Events</span>
              </div>
              <div className="space-y-1">
                {filteredWeeks.slice(0, 4).map((w) => (
                  <div
                    key={w.weekNumber}
                    onClick={() => {
                      onSelectTab("cornerstone_calendar");
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors border border-transparent hover:border-white/[0.08]"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded">
                          Week {w.weekNumber}
                        </span>
                        <span className="font-semibold text-white">{w.phase}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{w.brandDivision}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {w.primaryFocus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Knowledge Entities ({filteredEntities.length})
            </div>
            <div className="space-y-1">
              {filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  onClick={() => {
                    onSelectTab("overdrive_vi");
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors border border-transparent hover:border-white/[0.08]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{entity.name}</span>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {entity.category} · {entity.confidence}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {entity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-black/40 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between px-4">
          <span>Navigate with mouse or arrow keys</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
