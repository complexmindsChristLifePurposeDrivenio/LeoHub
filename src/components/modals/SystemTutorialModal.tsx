import React, { useState } from "react";
import { NavigationTab } from "../../types";
import {
  BookOpen,
  X,
  Compass,
  Calendar,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  Download,
  Terminal,
  Share2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Search,
  Eye,
  FileText,
  Mic,
  Video,
  ExternalLink,
} from "lucide-react";

interface SystemTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

type TutorialSection =
  | "overview"
  | "calendar"
  | "content_factory"
  | "commands"
  | "monetization";

export const SystemTutorialModal: React.FC<SystemTutorialModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [activeSection, setActiveSection] = useState<TutorialSection>("overview");
  const [commandSearch, setCommandSearch] = useState<string>("");

  if (!isOpen) return null;

  const GODMODE_COMMANDS_LIST = [
    { cmd: "/gta next", desc: "Identifies the single highest-value unfinished video task in the queue", example: "/gta next" },
    { cmd: "/gta build", desc: "Executes the full 13-stage assembly pipeline stopping at Human Approval", example: "/gta build" },
    { cmd: "/gta idea", desc: "Generates 15 original GTA 6 video concepts with 7-factor scoring", example: "/gta idea" },
    { cmd: "/gta quilt", desc: "Reverse-engineers proven non-GTA title structures into fresh GTA angles", example: "/gta quilt" },
    { cmd: "/gta research", desc: "Generates a verified Research Card with Confirmed vs Speculation taxonomy", example: "/gta research" },
    { cmd: "/gta thesis", desc: "Crystallizes the core unique thesis separating the video from common tropes", example: "/gta thesis" },
    { cmd: "/gta script", desc: "Writes a 9-part high-retention documentary script (Cold Open to CTA)", example: "/gta script" },
    { cmd: "/gta hook", desc: "Produces 5 psychological hooks (Mystery, Shock, Evidence, Story, Contrarian)", example: "/gta hook" },
    { cmd: "/gta scenes", desc: "Breaks down script into sequential scenes with timestamps and captions", example: "/gta scenes" },
    { cmd: "/gta visuals", desc: "Generates safe AAA cinematic image/video prompts (SD 3.5 / Runway)", example: "/gta visuals" },
    { cmd: "/gta voice", desc: "Calibrates narration tone across 8 voice modes (AI Doc, Human, Deep)", example: "/gta voice" },
    { cmd: "/gta thumbnail", desc: "Creates 5 thumbnail concepts with 2-4 word max text overlays", example: "/gta thumbnail" },
    { cmd: "/gta title", desc: "Outputs 20 categorized YouTube titles under 70 characters", example: "/gta title" },
    { cmd: "/gta seo", desc: "Generates natural keyword description, hashtags, and disclosure statements", example: "/gta seo" },
    { cmd: "/gta qa", desc: "Audits originality score (≥90) and safety checklist before approval", example: "/gta qa" },
    { cmd: "/gta publish", desc: "Final pre-flight publishing sign-off (requires human approval)", example: "/gta publish" },
    { cmd: "/gta repurpose", desc: "Derives 3 Shorts, 3 Reels, 3 TikToks, X thread, blog, and newsletter", example: "/gta repurpose" },
    { cmd: "/gta analytics", desc: "Evaluates 24h/7d/28d CTR, retention, and watch time performance", example: "/gta analytics" },
    { cmd: "/gta comments", desc: "Mines real audience comments into research questions and future titles", example: "/gta comments" },
    { cmd: "/gta product", desc: "Extracts monetizable digital products (free PDF, $9 guide, $29 pack)", example: "/gta product" },
    { cmd: "/gta cluster", desc: "Connects related videos into interconnected 6-video thematic hubs", example: "/gta cluster" },
  ];

  const filteredCommands = GODMODE_COMMANDS_LIST.filter(
    (c) =>
      c.cmd.toLowerCase().includes(commandSearch.toLowerCase()) ||
      c.desc.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#0E1017] border border-white/[0.15] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00FF66]/15 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>System Operating Tutorial & Architecture Guide</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66]">
                  OPERATOR MANUAL
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Master guide for Cornerstone OS, GodMode orchestration, and the GTA 6 Content Factory.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-white/[0.06] bg-[#0B0C10] overflow-x-auto shrink-0">
          {[
            { id: "overview", label: "1. The 3-Layer Architecture", icon: Compass },
            { id: "calendar", label: "2. 13-Week Calendar & Rule", icon: Calendar },
            { id: "content_factory", label: "3. Content Factory Workflow", icon: Sparkles },
            { id: "commands", label: "4. GodMode Terminal (20 Cmds)", icon: Terminal },
            { id: "monetization", label: "5. Monetization & ContentForge", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as TutorialSection)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#00FF66] text-[#00FF66] font-semibold bg-white/[0.04]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs leading-relaxed">
          {/* SECTION 1: OVERVIEW & 3-LAYER ARCHITECTURE */}
          {activeSection === "overview" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-gradient-to-r from-black/60 to-black/30 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-[#00FF66] font-bold uppercase tracking-wider">
                  The Core Relationship
                </span>
                <h3 className="text-base font-display font-bold text-white">
                  How The System Is Structured (Brand Silos & Execution)
                </h3>
                <p className="text-slate-300">
                  To prevent clutter and preserve brand value, the platform is cleanly separated into three distinct operational layers:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                    LAYER 1: FOUNDATION
                  </div>
                  <h4 className="text-sm font-bold text-white">Cornerstone OS</h4>
                  <p className="text-[11px] text-slate-400">
                    The shared engineering infrastructure, GitHub monorepos, Supabase database, Sanity CMS, and the official 13-week operating calendar.
                  </p>
                  <div className="text-[10px] font-mono text-purple-300">Role: Infrastructure & Schedule</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                    LAYER 2: ORCHESTRATION
                  </div>
                  <h4 className="text-sm font-bold text-white">GodMode</h4>
                  <p className="text-[11px] text-slate-400">
                    The autonomous state machine that enforces quality gates, manages the 20 slash commands, calculates idea scores, and tracks production states.
                  </p>
                  <div className="text-[10px] font-mono text-cyan-300">Role: Quality & State Control</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-[#00FF66]/30 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[#00FF66] font-bold">
                    LAYER 3: PUBLIC BRAND
                  </div>
                  <h4 className="text-sm font-bold text-white">CMPlay Media Factory</h4>
                  <p className="text-[11px] text-slate-400">
                    The public gaming brand delivering high-retention GTA 6 documentaries, ClipForge 9:16 shorts, Dojo courses, and digital products.
                  </p>
                  <div className="text-[10px] font-mono text-[#00FF66]">Role: Public Output & Audience</div>
                </div>
              </div>

              {/* White label note */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-1">
                <div className="text-cyan-300 font-semibold font-mono text-[11px]">
                  💡 The Sellable SaaS Asset: ContentForge OS
                </div>
                <p className="text-slate-300 text-[11px]">
                  Inside the Content Factory, click <strong>"Switch to ContentForge OS"</strong> to strip all GTA/CMPlay branding. You can sell this exact production system to creators in Sports, Finance, Fitness, Faith, and Local Business.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    onSelectTab("content_factory");
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00FF66] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Content Factory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveSection("calendar")}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Next: 13-Week Operating Calendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: 13-WEEK OPERATING CALENDAR */}
          {activeSection === "calendar" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-[#00FF66] font-bold uppercase">
                  The Official Operating Rule
                </span>
                <h3 className="text-base font-display font-bold text-white">
                  Why The Calendar Governs Execution
                </h3>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  Blueprint → Calendar → Weekly Outcome → Build → Content → Distribution → Revenue → Review → Next Iteration
                </p>
                <p className="text-slate-400 text-[11px]">
                  The calendar determines <em>when projects get worked on</em>, preventing the project list from becoming another source of clutter.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white text-xs">The 5-Day Weekly Rhythm (Monday through Friday):</div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-[11px]">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="font-bold text-[#00FF66]">MONDAY</div>
                    <div className="font-semibold text-white">Strategy + Architecture</div>
                    <p className="text-slate-400">Plan and select the week's primary deliverable outcome.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="font-bold text-cyan-400">TUESDAY</div>
                    <div className="font-semibold text-white">Build + Capture</div>
                    <p className="text-slate-400">Heavy technical and product development sprint.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="font-bold text-purple-400">WEDNESDAY</div>
                    <div className="font-semibold text-white">Assembly + Production</div>
                    <p className="text-slate-400">Connect the pieces into a working end-to-end system.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="font-bold text-amber-400">THURSDAY</div>
                    <div className="font-semibold text-white">Distribution + Monetization</div>
                    <p className="text-slate-400">Turn work into content, products, demos, or sales assets.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="font-bold text-emerald-400">FRIDAY</div>
                    <div className="font-semibold text-white">Reflection + Scorecard</div>
                    <p className="text-slate-400">Cornerstone Scorecard & Content Command Logbook.</p>
                  </div>
                </div>
              </div>

              {/* Google Calendar import instruction */}
              <div className="p-4 rounded-xl bg-[#00FF66]/[0.05] border border-[#00FF66]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#00FF66] text-xs flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    How to Import the 143 Scheduled Events into Google Calendar
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Central Time (CT)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>In the <strong>13-Week Blueprint</strong> tab, click <strong>"Download .ics (143 Events)"</strong>.</li>
                  <li>Open <strong>calendar.google.com</strong> in your browser.</li>
                  <li>Click the top-right Settings gear ⚙️ → <strong>Settings</strong>.</li>
                  <li>In the left sidebar, click <strong>Import & export</strong> → <strong>Import</strong>.</li>
                  <li>Select the downloaded <code>Cornerstone_OS_Official_Blueprint_90_Day_Calendar.ics</code> file and click <strong>Import</strong>.</li>
                </ol>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    onSelectTab("cornerstone_calendar");
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>Open 13-Week Operating Calendar</span>
                </button>
                <button
                  onClick={() => setActiveSection("content_factory")}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Next: Content Factory Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: CONTENT FACTORY WORKFLOW */}
          {activeSection === "content_factory" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-[#00FF66] font-bold uppercase">
                  Production Philosophy
                </span>
                <h3 className="text-base font-display font-bold text-white">
                  The 10-Stage Pipeline: From Proven Structure to Revenue
                </h3>
                <p className="text-slate-300 text-[11px]">
                  The factory does <strong>NOT</strong> produce generic AI slop. It extracts proven structural curiosity, conducts primary source research, enforces an originality score $\ge 90$, and packages one video into 10 platform derivatives.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: "1. Niche Quilting",
                    desc: "Takes an underlying competitor title formula (e.g. 'Why [GROUP] Are [ACTION]') and adapts it to GTA 6 angles without copying text.",
                    score: "Formula: S = 0.20C + 0.20R + 0.20O + 0.15Q + 0.10M + 0.10E + 0.05U",
                  },
                  {
                    step: "2. Research Studio & Fact Taxonomy",
                    desc: "Classifies all claims into CONFIRMED, LIKELY, REPORTED, SPECULATION (LABELED), and UNKNOWN. Never presents rumors as facts.",
                    score: "Crystallizes 'The Unique Thesis' to stand apart.",
                  },
                  {
                    step: "3. Originality Audit Gate",
                    desc: "Enforces 10-point originality audit. If score is < 75: Return to research; 75-89: Revise; 90+: Approved for production.",
                    score: "Protects channel from mass-produced content strikes.",
                  },
                  {
                    step: "4. Script Studio & 5-Hook Engine",
                    desc: "Writes 9-part documentary script: Cold Open → Promise → Context → Discovery → Escalation → Contrast → Payoff → Reveal → CTA.",
                    score: "Generates 5 psychological hooks (Mystery, Shock, Evidence, Story, Contrarian).",
                  },
                  {
                    step: "5. Sequential Scenes & Visual Prompts",
                    desc: "Detects 18 sequential scenes with camera, lighting, movement, and burned captions. Generates AAA prompts for SD 3.5 & video models.",
                    score: "Strict copyright check: No official promotional art or logos.",
                  },
                  {
                    step: "6. Voice & CapCut Timeline Pacing",
                    desc: "Chooses among 8 voice modes (Darren/Human, AI Doc, Deep Resonance). Maps 10-minute editing retention zooms.",
                    score: "Pacing map from 0:00 to 10:14.",
                  },
                  {
                    step: "7. Thumbnails (2-4 Words) & Titles",
                    desc: "Generates 5 extreme curiosity gap thumbnail concepts with 2-4 word text overlays and 20 categorized titles under 70 chars.",
                    score: "High CTR focal point with clear foreground separation.",
                  },
                  {
                    step: "8. Human Approval Gate",
                    desc: "GodMode refuses to auto-publish without human creator sign-off. Creator clicks [APPROVE], [EDIT], or [REJECT].",
                    score: "15-item pre-flight verification checklist.",
                  },
                  {
                    step: "9. Repurpose Engine",
                    desc: "Expands 1 long-form video into 3 Shorts, 3 Reels, 3 TikToks, 1 Community Poll, 1 X Thread (5 tweets), 1 Blog, and 1 Newsletter.",
                    score: "1-to-10 multi-platform audience leverage.",
                  },
                  {
                    step: "10. Master Package Exporter",
                    desc: "One click exports all 17 production files into a clean folder bundle (script.md, research.json, scenes.json, prompts, etc.).",
                    score: "Standardized folder: CM-GTA6-XXXX/",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/30 border border-white/[0.04] flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#00FF66]/15 border border-[#00FF66]/30 flex items-center justify-center font-mono text-[10px] text-[#00FF66] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{item.step}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{item.score}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    onSelectTab("content_factory");
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00FF66] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Content Factory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveSection("commands")}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Next: GodMode Commands</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: GODMODE TERMINAL COMMANDS */}
          {activeSection === "commands" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00FF66] font-bold uppercase">
                    GodMode Command Reference (20 Commands)
                  </span>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={commandSearch}
                      onChange={(e) => setCommandSearch(e.target.value)}
                      placeholder="Search commands..."
                      className="bg-black/60 border border-white/[0.1] rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Type any command into the GodMode Console in the Content Factory or click to inspect its function.
                </p>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredCommands.map((c) => (
                  <div
                    key={c.cmd}
                    className="p-3 rounded-xl bg-black/30 border border-white/[0.04] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-0.5 rounded bg-black/60 text-[#00FF66] font-mono font-bold text-xs border border-[#00FF66]/20">
                          {c.cmd}
                        </code>
                        <span className="text-white font-medium">{c.desc}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectTab("content_factory");
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-slate-300 hover:text-[#00FF66] transition-colors shrink-0"
                    >
                      Run in Console
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                ⭐ <strong>Pro Tip:</strong> <code>/gta next</code> tells you the single best next action in seconds, and <code>/gta build</code> executes the whole chain from idea to packaged assets without skipping human sign-off!
              </div>
            </div>
          )}

          {/* SECTION 5: MONETIZATION & CONTENTFORGE OS */}
          {activeSection === "monetization" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-[#00FF66] font-bold uppercase">
                  Revenue Architecture
                </span>
                <h3 className="text-base font-display font-bold text-white">
                  The Monetization Ladder & ContentForge OS
                </h3>
                <p className="text-slate-300 text-[11px]">
                  YouTube AdSense is only top-of-funnel cash flow. Every video exposes a viewer problem that connects directly to a complementary digital asset.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                  <div className="font-mono text-emerald-400 font-bold text-[10px]">TIER 1: FREE</div>
                  <div className="font-bold text-white">Lead Magnet PDF</div>
                  <p className="text-slate-400 text-[11px]">
                    Free GPS Telemetry guide builds an owned email audience independent of YouTube.
                  </p>
                  <div className="text-[#00FF66] font-mono font-bold">$0.00 (Email Capture)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/30 space-y-1.5">
                  <div className="font-mono text-cyan-400 font-bold text-[10px]">TIER 2: LOW-TICKET</div>
                  <div className="font-bold text-white">Field Guide PDF</div>
                  <p className="text-slate-400 text-[11px]">
                    $9 Lore & Location guide converts casual subscribers into active buyers.
                  </p>
                  <div className="text-cyan-300 font-mono font-bold">$9.00</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/30 space-y-1.5">
                  <div className="font-mono text-purple-400 font-bold text-[10px]">TIER 3: MID-TICKET</div>
                  <div className="font-bold text-white">Creator Toolkit</div>
                  <p className="text-slate-400 text-[11px]">
                    $29–$49 prompt pack, 4K LUTs, and script templates for aspiring creators.
                  </p>
                  <div className="text-purple-300 font-mono font-bold">$29.00 – $49.00</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30 space-y-1.5">
                  <div className="font-mono text-amber-400 font-bold text-[10px]">TIER 4: SERVICE / SAAS</div>
                  <div className="font-bold text-white">Channel Setup / ContentForge</div>
                  <p className="text-slate-400 text-[11px]">
                    $497/mo channel automation or license the ContentForge OS SaaS to other niches.
                  </p>
                  <div className="text-amber-300 font-mono font-bold">$497 / mo</div>
                </div>
              </div>

              {/* Selling ContentForge OS */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-black/40 border border-cyan-500/30 space-y-2">
                <div className="text-cyan-300 font-bold font-mono text-xs">
                  How To Sell "ContentForge OS" To Other Niches:
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  The underlying architecture (Niche Quilting → Original Research → Script → Visuals → Voice → Approval → 1-to-10 Repurposing) works for any industry. By selecting <strong>Sports</strong>, <strong>Finance</strong>, <strong>Fitness</strong>, <strong>Faith</strong>, or <strong>Local Business</strong>, you keep the production engine and adapt only the niche inputs.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => {
                    onSelectTab("content_factory");
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00FF66] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.25)]"
                >
                  <span>Ready! Launch Content Factory</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
            <span>Cornerstone OS &middot; GodMode &middot; CMPlay System Active</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium transition-colors"
          >
            Close Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};
