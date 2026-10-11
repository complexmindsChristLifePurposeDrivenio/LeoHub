import React, { useState, useEffect } from "react";
import { NavigationTab, BrandDivision } from "../../types";
import {
  BLUEPRINT_WEEKS,
  ALL_143_EVENTS,
  triggerIcsDownload,
} from "../../data/cornerstoneBlueprintData";
import { requestAiWeeklyReview } from "../../services/apiClient";
import {
  Calendar as CalendarIcon,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  BookOpen,
  Layers,
  BarChart2,
  Flame,
  FileText,
  AlertCircle,
  HelpCircle,
  X,
  Plus,
  Play,
  RotateCcw,
} from "lucide-react";

interface CornerstoneCalendarProps {
  onSelectTab: (tab: NavigationTab) => void;
}

type ViewMode = "matrix" | "roadmap" | "events" | "review";

export const CornerstoneCalendar: React.FC<CornerstoneCalendarProps> = ({ onSelectTab }) => {
  // Current local date in context is 2026-10-08 (Week 3, Thursday)
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(3);
  const [viewMode, setViewMode] = useState<ViewMode>("matrix");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [searchEventQuery, setSearchEventQuery] = useState<string>("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  // Deliverables completion state backed by localStorage
  const [completedDeliverables, setCompletedDeliverables] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("cornerstone_deliverables_v1");
      return saved ? JSON.parse(saved) : { "w1-1": true, "w1-2": true, "w1-3": true, "w2-1": true, "w2-2": true, "w3-1": true };
    } catch {
      return { "w1-1": true, "w1-2": true, "w1-3": true, "w2-1": true, "w2-2": true, "w3-1": true };
    }
  });

  // Friday Scorecard State
  const [scorecardRating, setScorecardRating] = useState<"green" | "amber" | "red">("green");
  const [buildVelocity, setBuildVelocity] = useState<number>(92);
  const [agentReliability, setAgentReliability] = useState<number>(96);
  const [blockersText, setBlockersText] = useState<string>("");
  const [achievementsText, setAchievementsText] = useState<string>("");
  const [aiReviewOutput, setAiReviewOutput] = useState<string>("");
  const [isGeneratingAiReview, setIsGeneratingAiReview] = useState<boolean>(false);

  // Content Command Logbook items
  const [logbookEntries, setLogbookEntries] = useState([
    {
      id: "log-1",
      weekNumber: 3,
      brand: "Cornerstone OS",
      title: "The 13-Week Operating OS Architecture Breakdown",
      format: "YouTube Longform",
      platform: "YouTube",
      status: "Published",
      retention: "68% @ 30s",
      leads: 38,
    },
    {
      id: "log-2",
      weekNumber: 3,
      brand: "CMPlay",
      title: "Leonida Dynamic Volumetric Weather & GPS Coordinates",
      format: "9:16 Shorts",
      platform: "YouTube Shorts / TikTok",
      status: "Scheduled",
      retention: "84% @ 5s",
      leads: 92,
    },
    {
      id: "log-3",
      weekNumber: 2,
      brand: "ComplexMinds",
      title: "Autonomous Agent RAG Pipelines with Supabase & n8n",
      format: "X Thread + Video Demo",
      platform: "X / Twitter",
      status: "Published",
      retention: "4,200 impressions",
      leads: 19,
    },
  ]);

  const [newLogTitle, setNewLogTitle] = useState("");
  const [newLogBrand, setNewLogBrand] = useState<BrandDivision>("Cornerstone OS");
  const [newLogFormat, setNewLogFormat] = useState("YouTube Shorts");

  const selectedWeek = BLUEPRINT_WEEKS.find((w) => w.weekNumber === selectedWeekNum) || BLUEPRINT_WEEKS[2];

  const toggleDeliverable = (id: string) => {
    const updated = { ...completedDeliverables, [id]: !completedDeliverables[id] };
    setCompletedDeliverables(updated);
    try {
      localStorage.setItem("cornerstone_deliverables_v1", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage error", e);
    }
  };

  const handleGenerateAiReview = async () => {
    setIsGeneratingAiReview(true);
    try {
      const res = await requestAiWeeklyReview({
        weekNumber: selectedWeek.weekNumber,
        phase: selectedWeek.phase,
        brandDivision: selectedWeek.brandDivision,
        achievements: achievementsText || `Finished deliverables for ${selectedWeek.phase}: ${selectedWeek.primaryOutcome}`,
        blockers: blockersText || "No critical blockers remaining.",
      });
      setAiReviewOutput(res.review);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAiReview(false);
    }
  };

  const handleAddLogbookEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;
    const newEntry = {
      id: `log-${Date.now()}`,
      weekNumber: selectedWeekNum,
      brand: newLogBrand,
      title: newLogTitle,
      format: newLogFormat,
      platform: "Multi-Platform",
      status: "Ready",
      retention: "Pending Drop",
      leads: 0,
    };
    setLogbookEntries([newEntry, ...logbookEntries]);
    setNewLogTitle("");
  };

  const filteredEvents = ALL_143_EVENTS.filter((evt) => {
    const matchesSearch =
      evt.summary.toLowerCase().includes(searchEventQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchEventQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchEventQuery.toLowerCase());
    const matchesWeek = brandFilter === "all" || evt.brandDivision === brandFilter;
    const matchesType =
      eventTypeFilter === "all" ||
      (eventTypeFilter === "morning" && ["strategy", "build", "assembly", "distribution", "review"].includes(evt.eventType)) ||
      (eventTypeFilter === "afternoon" && evt.eventType === "afternoon_block") ||
      (eventTypeFilter === "evening" && evt.eventType === "evening_scorecard");
    return matchesSearch && matchesWeek && matchesType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Operating Header */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0E1017] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/30 text-[#00FF66] font-mono text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                CORNERSTONE OS BLUEPRINT
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300 text-xs">
                13-Week Operating Calendar
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
                Active: Week 3 (Oct 5–9, 2026) · Thursday
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              The Execution Layer of Cornerstone OS
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Beginning <span className="text-white font-medium">Monday, September 21, 2026</span>.
              The calendar determines when projects get worked on, preventing the backlog from becoming clutter.
              143 scheduled events covering infrastructure, agents, content engine, distribution, and major brand divisions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-[#00FF66]" /> 13 Phases (90 Days)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> 143 Scheduled Events (Central Time)
              </span>
              <span>·</span>
              <span className="text-slate-300">
                Weekly Outcome → Build → Content → Distribution → Revenue → Review
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <button
              onClick={triggerIcsDownload}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] cursor-pointer group"
              title="Download RFC 5545 .ics file with 143 scheduled events"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Download .ics (143 Events)</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Google Calendar Import Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Official Rule Pipeline Strip */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E1017]/80 backdrop-blur-md p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
            Official Execution Law
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Governs when projects get built, stopping backlog clutter
          </span>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex items-center min-w-[760px] gap-2">
            {[
              { step: "Blueprint", desc: "13-Week Vision" },
              { step: "Calendar", desc: "143 Events (CT)" },
              { step: "Weekly outcome", desc: "Mon Architecture" },
              { step: "Build", desc: "Tue Engineering" },
              { step: "Content", desc: "Wed Production" },
              { step: "Distribution", desc: "Thu Multi-Platform" },
              { step: "Revenue", desc: "Stripe & Leads" },
              { step: "Review", desc: "Fri Scorecard" },
              { step: "Next iteration", desc: "Monday Reboot" },
            ].map((item, idx) => (
              <React.Fragment key={item.step}>
                <div
                  className={`flex-1 p-2.5 rounded-lg border text-center transition-all ${
                    idx === 2 || idx === 3
                      ? "bg-[#00FF66]/10 border-[#00FF66]/40 text-[#00FF66]"
                      : "bg-white/[0.03] border-white/[0.06] text-slate-300 hover:border-white/[0.15]"
                  }`}
                >
                  <div className="text-xs font-bold whitespace-nowrap">{item.step}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.desc}</div>
                </div>
                {idx < 8 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setViewMode("matrix")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "matrix"
                ? "bg-[#00FF66] text-black font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Weekly Operating Matrix
          </button>
          <button
            onClick={() => setViewMode("roadmap")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "roadmap"
                ? "bg-[#00FF66] text-black font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            13-Week Macro Roadmap
          </button>
          <button
            onClick={() => setViewMode("events")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "events"
                ? "bg-[#00FF66] text-black font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            143 Scheduled Events List
          </button>
          <button
            onClick={() => setViewMode("review")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "review"
                ? "bg-[#00FF66] text-black font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Friday Review & Logbook
          </button>
        </div>

        {/* Quick Week Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium">Select Week:</label>
          <select
            value={selectedWeekNum}
            onChange={(e) => setSelectedWeekNum(Number(e.target.value))}
            className="bg-[#0E1017] border border-white/[0.12] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00FF66]"
          >
            {BLUEPRINT_WEEKS.map((w) => (
              <option key={w.weekNumber} value={w.weekNumber}>
                Week {w.weekNumber}: {w.phase} ({w.brandDivision})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW 1: WEEKLY OPERATING MATRIX */}
      {viewMode === "matrix" && (
        <div className="space-y-6">
          {/* Week Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E1017] via-[#121622] to-[#0E1017] border border-white/[0.1] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-extrabold text-white">
                    Week {selectedWeek.weekNumber}: {selectedWeek.phase}
                  </span>
                  {selectedWeek.weekNumber === 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
                      CURRENT BENCHMARK
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.08] text-slate-300">
                    {selectedWeek.brandDivision}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  {selectedWeek.startDate} to {selectedWeek.endDate} · Central Time (US/Chicago)
                </p>
              </div>

              {/* Associated module jump */}
              <button
                onClick={() => onSelectTab(selectedWeek.associatedModuleTab)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-xs text-slate-200 transition-colors"
              >
                <span>Launch {selectedWeek.phase} Hub</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#00FF66]" />
              </button>
            </div>

            {/* Primary Outcome Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#00FF66]">
                Primary Weekly Outcome (Locked Deliverable)
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {selectedWeek.primaryOutcome}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Stack:</span>
                {selectedWeek.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[11px] text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Day Operating Schedule Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#00FF66]" />
                Operating Rhythm: Monday through Friday
              </h2>
              <span className="text-xs text-slate-400 font-mono">Central Time Schedule</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {selectedWeek.days.map((day) => {
                const isToday = selectedWeek.weekNumber === 3 && day.dayName === "Thursday";
                return (
                  <div
                    key={day.dayName}
                    className={`rounded-xl border p-4 flex flex-col justify-between space-y-4 transition-all ${
                      isToday
                        ? "bg-[#00FF66]/[0.06] border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.12)]"
                        : "bg-[#0E1017]/90 border-white/[0.08] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">
                            {day.dayName}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{day.dateString}</div>
                        </div>
                        {isToday && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00FF66] text-black">
                            TODAY
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#00FF66]">{day.theme}</div>
                        <p className="text-[11px] text-slate-300 leading-snug">{day.primaryFocus}</p>
                      </div>

                      {/* Morning Block */}
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1 text-left">
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-medium">
                          <span>MORNING FOCUS</span>
                          <span>{day.morningBlock.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-200 font-medium leading-tight">
                          {day.morningBlock.action}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight italic pt-0.5">
                          Deliverable: {day.morningBlock.deliverable}
                        </div>
                      </div>

                      {/* Daily Afternoon Block */}
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1 text-left">
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-300 font-medium">
                          <span>AFTERNOON BLOCK</span>
                          <span>{day.afternoonBlock.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-medium leading-tight">
                          {day.afternoonBlock.focus}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight">
                          {day.afternoonBlock.activity}
                        </div>
                      </div>

                      {/* Friday Evening Deliverable */}
                      {day.eveningBlock && (
                        <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 space-y-1 text-left">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#00FF66] font-medium">
                            <span>FRIDAY EVENING</span>
                            <span>{day.eveningBlock.time}</span>
                          </div>
                          <div className="text-[10px] text-slate-200 leading-tight font-medium">
                            {day.eveningBlock.deliverable}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Deliverables Interactive Checklist */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                  Week {selectedWeek.weekNumber} Execution Deliverables
                </h3>
                <p className="text-xs text-slate-400">
                  Check off items as completed to maintain velocity without backlog clutter.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00FF66]">
                {selectedWeek.keyDeliverables.filter((d) => completedDeliverables[d.id]).length} /{" "}
                {selectedWeek.keyDeliverables.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedWeek.keyDeliverables.map((item) => {
                const isDone = Boolean(completedDeliverables[item.id]);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleDeliverable(item.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? "bg-[#00FF66]/[0.05] border-[#00FF66]/30 text-slate-200"
                        : "bg-black/30 border-white/[0.06] text-slate-300 hover:border-white/[0.15]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}} // handled by div click
                      className="mt-0.5 w-4 h-4 rounded text-[#00FF66] accent-[#00FF66] cursor-pointer"
                    />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium leading-snug">{item.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 shrink-0 ml-2">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isDone ? "Completed · Ready for next pipeline phase" : "In execution"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 13-WEEK MACRO ROADMAP */}
      {viewMode === "roadmap" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                13-Week Macro Roadmap Overview
              </h2>
              <p className="text-xs text-slate-400">
                13 sequential phases covering all major brand divisions and system components.
              </p>
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="bg-[#0E1017] border border-white/[0.12] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Brand Divisions</option>
                <option value="Cornerstone OS">Cornerstone OS</option>
                <option value="ComplexMinds">ComplexMinds</option>
                <option value="CMPlay">CMPlay</option>
                <option value="ChristLIFE.io">ChristLIFE.io</option>
                <option value="Sports Analytics">Sports Analytics</option>
                <option value="FCI Wrestling">FCI Wrestling</option>
                <option value="StreamMinds">StreamMinds</option>
                <option value="Products & Commerce">Products & Commerce</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLUEPRINT_WEEKS.filter(
              (w) => brandFilter === "all" || w.brandDivision === brandFilter
            ).map((w) => {
              const isCurrent = w.weekNumber === 3;
              const completedCount = w.keyDeliverables.filter((d) => completedDeliverables[d.id]).length;
              return (
                <div
                  key={w.weekNumber}
                  onClick={() => {
                    setSelectedWeekNum(w.weekNumber);
                    setViewMode("matrix");
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isCurrent
                      ? "bg-[#0E1017] border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.15)]"
                      : "bg-[#0E1017]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0E1017]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#00FF66] px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                          WEEK {w.weekNumber}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{w.startDate}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-display font-bold text-white group-hover:text-[#00FF66] transition-colors">
                        {w.phase}
                      </h3>
                      <div className="text-xs text-slate-400 font-medium">{w.brandDivision}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {w.primaryFocus}
                    </p>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] text-slate-300 font-medium">
                      🎯 <span className="text-slate-400">Outcome:</span> {w.primaryOutcome}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[11px]">
                      {completedCount}/{w.keyDeliverables.length} Deliverables
                    </span>
                    <span className="text-[#00FF66] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                      View Week <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: 143 SCHEDULED EVENTS EXPLORER */}
      {viewMode === "events" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00FF66]" />
                143 Scheduled Events Explorer (Google Calendar Feed)
              </h2>
              <p className="text-xs text-slate-400">
                All 143 events synchronized across 13 weeks in Central Time (US/Chicago).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchEventQuery}
                  onChange={(e) => setSearchEventQuery(e.target.value)}
                  placeholder="Search events, topics..."
                  className="bg-[#0E1017] border border-white/[0.12] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="bg-[#0E1017] border border-white/[0.12] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Event Blocks</option>
                <option value="morning">Morning Primary Focus (9am - 12pm CT)</option>
                <option value="afternoon">Daily Afternoon Block (1pm - 4pm CT)</option>
                <option value="evening">Friday Evening Scorecard (5pm - 7:30pm CT)</option>
              </select>

              <button
                onClick={triggerIcsDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF66]/20 border border-[#00FF66]/40 text-[#00FF66] text-xs font-semibold hover:bg-[#00FF66]/30 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export .ICS
              </button>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing {filteredEvents.length} of 143 blueprint events
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-[#0E1017]/90 border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.08] text-slate-300">
                      W{evt.weekNumber} · {evt.dayName}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      {evt.date} · {evt.startTime} - {evt.endTime} CT
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-800/40">
                      {evt.brandDivision}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white">{evt.summary}</h4>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <div className="text-[11px] font-mono text-slate-400">
                    📍 {evt.location}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedWeekNum(evt.weekNumber);
                      setViewMode("matrix");
                    }}
                    className="mt-2 text-xs text-[#00FF66] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Open Week {evt.weekNumber} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: FRIDAY EVENING REVIEW & CONTENT COMMAND LOGBOOK */}
      {viewMode === "review" && (
        <div className="space-y-8">
          {/* Header banner */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.1] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FF66]">
              <Sparkles className="w-4 h-4" />
              FRIDAY EVENING OPERATIONS PROTOCOL
            </div>
            <h2 className="text-xl md:text-2xl font-display font-extrabold text-white">
              Cornerstone Scorecard & Content Command Logbook
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Every Friday evening (17:00 – 19:30 CT), assess progress, rate KPIs, triage blockers,
              log published content throughput, and calibrate Monday priorities according to the Blueprint rule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PART 1: CORNERSTONE SCORECARD */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#00FF66]" />
                  Cornerstone Scorecard (Week {selectedWeek.weekNumber})
                </h3>
                <div className="flex items-center gap-1">
                  {(["green", "amber", "red"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setScorecardRating(r)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all ${
                        scorecardRating === r
                          ? r === "green"
                            ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                            : r === "amber"
                            ? "bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                            : "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                          : "bg-white/[0.06] text-slate-400 hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Build Velocity</span>
                    <span className="font-mono text-[#00FF66]">{buildVelocity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={buildVelocity}
                    onChange={(e) => setBuildVelocity(Number(e.target.value))}
                    className="w-full accent-[#00FF66] bg-black/40 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Agent Reliability Rate</span>
                    <span className="font-mono text-cyan-400">{agentReliability}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={agentReliability}
                    onChange={(e) => setAgentReliability(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-black/40 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Blockers & Accomplishments inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">
                    Accomplishments Shipped This Week
                  </label>
                  <textarea
                    rows={2}
                    value={achievementsText}
                    onChange={(e) => setAchievementsText(e.target.value)}
                    placeholder={`e.g. Deployed ${selectedWeek.phase} core schemas, validated 9:16 vertical hooks...`}
                    className="w-full bg-black/40 border border-white/[0.08] rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">
                    Blockers Identified & Triage Strategy
                  </label>
                  <textarea
                    rows={2}
                    value={blockersText}
                    onChange={(e) => setBlockersText(e.target.value)}
                    placeholder="e.g. Supabase connection pooling overhead; mitigation: enabled transaction mode..."
                    className="w-full bg-black/40 border border-white/[0.08] rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
                  />
                </div>
              </div>

              {/* AI Executive Review Button */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleGenerateAiReview}
                  disabled={isGeneratingAiReview}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#00FF66]" />
                  <span>
                    {isGeneratingAiReview
                      ? "Synthesizing Executive Scorecard..."
                      : "Generate AI Friday Review (Gemini 3.8)"}
                  </span>
                </button>

                {aiReviewOutput && (
                  <div className="p-4 rounded-xl bg-black/50 border border-[#00FF66]/30 text-xs text-slate-200 space-y-2 whitespace-pre-wrap font-mono">
                    {aiReviewOutput}
                  </div>
                )}
              </div>
            </div>

            {/* PART 2: CONTENT COMMAND LOGBOOK */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00FF66]" />
                  Content Command Logbook (YouTube-First)
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {logbookEntries.length} Items Logged
                </span>
              </div>

              {/* Add New Entry Form */}
              <form onSubmit={handleAddLogbookEntry} className="space-y-3 p-3.5 rounded-xl bg-black/30 border border-white/[0.06]">
                <div className="text-[11px] font-semibold text-[#00FF66] uppercase">
                  Log New Content Production Asset
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newLogTitle}
                    onChange={(e) => setNewLogTitle(e.target.value)}
                    placeholder="Content Title / Asset Hook..."
                    className="w-full bg-black/40 border border-white/[0.08] rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newLogBrand}
                      onChange={(e) => setNewLogBrand(e.target.value as BrandDivision)}
                      className="bg-black/40 border border-white/[0.08] rounded-lg p-1.5 text-xs text-white"
                    >
                      <option value="Cornerstone OS">Cornerstone OS</option>
                      <option value="ComplexMinds">ComplexMinds</option>
                      <option value="CMPlay">CMPlay</option>
                      <option value="ChristLIFE.io">ChristLIFE.io</option>
                      <option value="Sports Analytics">Sports Analytics</option>
                      <option value="FCI Wrestling">FCI Wrestling</option>
                      <option value="StreamMinds">StreamMinds</option>
                      <option value="Products & Commerce">Products & Commerce</option>
                    </select>
                    <select
                      value={newLogFormat}
                      onChange={(e) => setNewLogFormat(e.target.value)}
                      className="bg-black/40 border border-white/[0.08] rounded-lg p-1.5 text-xs text-white"
                    >
                      <option value="YouTube Longform">YouTube Longform</option>
                      <option value="9:16 Shorts">9:16 Shorts / Reels</option>
                      <option value="X Thread">X Thread + Breakdown</option>
                      <option value="Newsletter">Substack Newsletter</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log To Command Journal</span>
                </button>
              </form>

              {/* Logbook Items Stream */}
              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {logbookEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded">
                          W{entry.weekNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {entry.brand}
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">
                          {entry.format}
                        </span>
                      </div>
                      <div className="font-semibold text-white leading-tight">
                        {entry.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Retention: {entry.retention}</span>
                        <span>·</span>
                        <span>Leads: {entry.leads}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.08] text-slate-300">
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE CALENDAR IMPORT GUIDE MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0F1117] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-[#00FF66]" />
                <h3 className="text-lg font-display font-bold text-white">
                  Import into Google Calendar
                </h3>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-slate-200">
                <p className="font-medium text-[#00FF66] mb-1">
                  143 Scheduled Events · Central Time (America/Chicago)
                </p>
                <p className="text-slate-300">
                  Begins Monday, September 21, 2026. Sets the 5-day rhythm and Friday evening reviews for all 13 phases.
                </p>
              </div>

              <div className="space-y-3 font-normal">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    Click <strong>Download .ics</strong> below to save{" "}
                    <code className="text-[#00FF66] font-mono bg-black/40 px-1.5 py-0.5 rounded">
                      Cornerstone_OS_Official_Blueprint_90_Day_Calendar.ics
                    </code>{" "}
                    to your machine.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    Open <strong>Google Calendar</strong> (calendar.google.com).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    Click the <strong>Settings gear icon ⚙️</strong> in the top right → select{" "}
                    <strong>Settings</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    In the left navigation menu, click <strong>Import &amp; export</strong> → select{" "}
                    <strong>Import</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    Click <strong>Select file from your computer</strong>, choose the downloaded{" "}
                    <code>.ics</code> file, pick your target calendar, and click <strong>Import</strong>.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-slate-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerIcsDownload();
                  setShowImportModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_15px_rgba(0,255,102,0.25)] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .ics File Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
