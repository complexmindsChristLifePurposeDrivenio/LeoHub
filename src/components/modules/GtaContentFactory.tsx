import React, { useState } from "react";
import { NavigationTab, GtaContentIdea, GtaVideoPackage } from "../../types";
import {
  FACTORY_METRICS,
  TODAY_CHECKLIST,
  NICHE_QUILTING_EXAMPLES,
  SEED_IDEAS,
  FEATURED_VIDEO_PACKAGE,
  CONTENT_CLUSTERS,
  COMMENT_MINING_POOL,
  CONTENTFORGE_NICHES,
} from "../../data/gtaContentFactoryData";
import { executeGodmodeCommand } from "../../services/apiClient";
import {
  Cpu,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Video,
  Mic,
  Image as ImageIcon,
  FileText,
  Share2,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Terminal,
  Download,
  Copy,
  Check,
  Play,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Filter,
  Plus,
  Compass,
  Eye,
  RefreshCw,
  FolderKanban,
  ThumbsUp,
  Sliders,
  HelpCircle,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";
import { SystemTutorialModal } from "../modals/SystemTutorialModal";

interface GtaContentFactoryProps {
  onSelectTab: (tab: NavigationTab) => void;
}

type FactorySubTab =
  | "dashboard"
  | "ideas"
  | "research"
  | "script"
  | "visuals"
  | "voice_edit"
  | "thumbnails"
  | "approval"
  | "repurpose"
  | "monetization"
  | "clusters_miner";

export const GtaContentFactory: React.FC<GtaContentFactoryProps> = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState<FactorySubTab>("dashboard");
  const [isContentForgeMode, setIsContentForgeMode] = useState<boolean>(false);
  const [selectedNiche, setSelectedNiche] = useState<string>("gaming");
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // GodMode Command Center State
  const [commandInput, setCommandInput] = useState<string>("/gta next");
  const [commandHistory, setCommandHistory] = useState<
    { command: string; output: string; time: string }[]
  >([
    {
      command: "/gta next",
      output: `### GODMODE // NEXT BEST ACTION\n**Active Project**: CMPlay GTA 6 Content Factory\n**Candidate Video**: "The Detail Rockstar Wants You To Miss" (Code: CM-GTA6-0041)\n**Current State**: QA / READY FOR FINAL APPROVAL\n**Master Score**: 91/100 (Click: 94, Retention: 92, Originality: 95)\n**Next Task**: Execute Final Human Approval Gate & Schedule Multi-Platform Repurposing Drop\n**Estimated Time**: 15 minutes\n**Status**: [WAITING FOR CREATOR SIGN-OFF]`,
      time: "10:40:02",
    },
  ]);
  const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);

  // Active Video Package & Approval State
  const [pkg, setPkg] = useState<GtaVideoPackage>(FEATURED_VIDEO_PACKAGE);
  const [approvalDecision, setApprovalDecision] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [todayTasks, setTodayTasks] = useState(TODAY_CHECKLIST);

  // Idea Bank state
  const [ideas, setIdeas] = useState<GtaContentIdea[]>(SEED_IDEAS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Execute GodMode Command Handler
  const handleRunCommand = async (cmdToRun?: string) => {
    const targetCmd = cmdToRun || commandInput;
    if (!targetCmd.trim()) return;

    setIsExecutingCommand(true);
    try {
      const res = await executeGodmodeCommand(targetCmd, pkg.title, {
        state: pkg.currentState,
        code: pkg.code,
      });

      setCommandHistory((prev) => [
        {
          command: targetCmd,
          output: res.output,
          time: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 9),
      ]);

      // If user ran /gta build, route to approval or script view
      if (targetCmd.includes("/gta build")) {
        setActiveTab("approval");
      } else if (targetCmd.includes("/gta research")) {
        setActiveTab("research");
      } else if (targetCmd.includes("/gta script")) {
        setActiveTab("script");
      } else if (targetCmd.includes("/gta visuals")) {
        setActiveTab("visuals");
      } else if (targetCmd.includes("/gta repurpose")) {
        setActiveTab("repurpose");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecutingCommand(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const toggleTask = (id: string) => {
    setTodayTasks(
      todayTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Export Full 17-File Video Package as a comprehensive text bundle
  const handleExportFullPackage = () => {
    const timestamp = new Date().toISOString();
    const packageManifest = `================================================================================
CMPLAY GTA 6 CONTENT FACTORY // MASTER VIDEO PACKAGE
PACKAGE CODE: ${pkg.code}
TITLE: ${pkg.title}
GENERATED: ${timestamp}
ORCHESTRATION: GODMODE / CORNERSTONE OS
================================================================================

[FILE 1: SCRIPT.MD]
# ${pkg.title}
Thesis: ${pkg.thesis}

${pkg.script}

--------------------------------------------------------------------------------
[FILE 2: RESEARCH.JSON]
{
  "code": "${pkg.code}",
  "title": "${pkg.title}",
  "thesis": "${pkg.thesis}",
  "research_score": ${pkg.researchScore},
  "originality_score": ${pkg.originalityScore},
  "sources": [
    "Take-Two Interactive Patent US20230285860A1 (Dynamic Maritime Contraband)",
    "Miami-Dade County Maritime Logistics & Drawbridge GIS Survey",
    "Rockstar Games Official Trailer 1 Frame 1422 Telemetry"
  ]
}

--------------------------------------------------------------------------------
[FILE 3: HOOKS.TXT]
${pkg.hooks.map((h, i) => `${i + 1}. [${h.type}] (Score: ${h.score}/100)\n   "${h.hook}"`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 4: SCENES.JSON]
${JSON.stringify(pkg.scenes, null, 2)}

--------------------------------------------------------------------------------
[FILE 5: IMAGE-PROMPTS.TXT]
${pkg.scenes.map((s) => `Scene ${s.sceneId} (${s.timestamp}):\n${s.imagePrompt}`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 6: VIDEO-PROMPTS.TXT]
${pkg.scenes.map((s) => `Scene ${s.sceneId} Animation:\n${s.videoPrompt}`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 7: VOICEOVER.TXT]
Voice Mode: ${pkg.voiceMode}
Tone: Confident, investigative, controlled, slightly dramatic.
${pkg.scenes.map((s) => `[${s.timestamp}] ${s.narration}`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 8: CAPTIONS.SRT]
1
00:00:00,000 --> 00:00:08,000
Look closely at the motel room mirror behind Lucia at timestamp 0:42...

2
00:00:08,000 --> 00:00:25,000
You aren't looking at Ocean Drive. You're looking at a decommissioned shipping viaduct...

--------------------------------------------------------------------------------
[FILE 9: TITLE-OPTIONS.TXT]
${pkg.titles.map((t, i) => `${i + 1}. [${t.category}] ${t.title}`).join("\n")}

--------------------------------------------------------------------------------
[FILE 10: THUMBNAIL-PROMPTS.TXT]
${pkg.thumbnails.map((th) => `THUMBNAIL [${th.type}] Text Overlay: "${th.textOverlay}"\nPrompt: ${th.prompt}`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 11: DESCRIPTION.TXT]
${pkg.seoDescription}

--------------------------------------------------------------------------------
[FILE 12: TAGS.TXT]
${pkg.tags.join(", ")}

--------------------------------------------------------------------------------
[FILE 13: SHORTS.MD]
${pkg.repurpose.shorts.map((sh, idx) => `### Short #${idx + 1}: ${sh.title}\nHook: "${sh.hook}"\nAngle: ${sh.angle}`).join("\n\n")}

--------------------------------------------------------------------------------
[FILE 14: BLOG.MD]
# ${pkg.repurpose.blogArticle.title}
Outline:
${pkg.repurpose.blogArticle.outline.map((o) => `- ${o}`).join("\n")}

--------------------------------------------------------------------------------
[FILE 15: NEWSLETTER.MD]
${pkg.repurpose.newsletter}

--------------------------------------------------------------------------------
[FILE 16: COMMUNITY-POST.MD]
${pkg.repurpose.communityPost}

--------------------------------------------------------------------------------
[FILE 17: PRODUCT-OPPORTUNITIES.JSON]
${JSON.stringify(pkg.products, null, 2)}
`;

    const blob = new Blob([packageManifest], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${pkg.code}_Master_Production_Package.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredIdeas = ideas.filter(
    (i) => selectedCategory === "All" || i.category === selectedCategory
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* MASTER SYSTEM HEADER */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0E1017] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/30 text-[#00FF66] font-mono text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                {isContentForgeMode ? "CONTENTFORGE OS" : "CMPLAY GTA CONTENT FACTORY"}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                GODMODE ORCHESTRATION LAYER
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-300 text-xs font-medium">
                Cornerstone OS Infrastructure
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              {isContentForgeMode
                ? "Universal Multi-Niche Media Production Factory"
                : "CMPlay GTA 6 Content Factory"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {isContentForgeMode
                ? "White-label sellable architecture: transforms any proven idea into original research, script, visual package, and monetization funnel."
                : "Turn one GTA 6 topic into a researched, original, multi-platform content package. Proven structure → original research → unique thesis → multi-channel revenue."}
            </p>

            {/* Core Principle Badge */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono text-slate-300 flex items-center gap-2 overflow-x-auto">
              <span className="text-[#00FF66] font-bold">CORE LAW:</span>
              <span className="truncate">
                Structure → Angle → Original Research → Thesis → Script → Visuals → Voice → Edit → Thumbnail → Human Approval → Publish → Analyze → Learn
              </span>
            </div>
          </div>

          {/* Mode Switcher & Export CTA */}
          <div className="flex flex-col gap-2.5 shrink-0">
            <div className="p-2 rounded-xl bg-black/50 border border-white/[0.08] space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center justify-between">
                <span>Architecture Mode:</span>
                <span className="text-[#00FF66]">
                  {isContentForgeMode ? "White-Label SaaS" : "CMPlay Gaming"}
                </span>
              </div>
              <button
                onClick={() => setIsContentForgeMode(!isContentForgeMode)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isContentForgeMode
                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-white/[0.08] text-slate-200 hover:bg-white/[0.12]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isContentForgeMode ? "Switch to CMPlay GTA 6" : "Switch to ContentForge OS"}
                </span>
              </button>
            </div>

            <button
              onClick={() => setShowTutorial(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>System Tutorial & Guide</span>
            </button>

            <button
              onClick={handleExportFullPackage}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_20px_rgba(0,255,102,0.25)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Master Package (17 Files)</span>
            </button>
          </div>
        </div>

        {/* Niche selector when in ContentForge mode */}
        {isContentForgeMode && (
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2 animate-in fade-in">
            <span className="text-xs text-slate-400 font-mono">Target Niche Layer:</span>
            {CONTENTFORGE_NICHES.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNiche(n.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedNiche === n.id
                    ? "bg-[#00FF66] text-black font-semibold"
                    : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GODMODE COMMAND TERMINAL */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#0E1017]/95 backdrop-blur-xl p-4 md:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00FF66]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              GODMODE Command Console
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              (20 System Commands Active)
            </span>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              "/gta next",
              "/gta build",
              "/gta quilt",
              "/gta research",
              "/gta script",
              "/gta visuals",
              "/gta repurpose",
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setCommandInput(cmd);
                  handleRunCommand(cmd);
                }}
                className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[10px] font-mono text-slate-300 hover:text-[#00FF66] transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#00FF66] font-bold">
              $
            </span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRunCommand();
              }}
              placeholder="Enter GodMode command (e.g. /gta build, /gta quilt, /gta next)..."
              className="w-full bg-black/50 border border-white/[0.1] rounded-xl pl-8 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
            />
          </div>

          <button
            onClick={() => handleRunCommand()}
            disabled={isExecutingCommand}
            className="px-4 py-2 rounded-xl bg-[#00FF66] text-black font-mono font-bold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isExecutingCommand ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>EXECUTE</span>
          </button>
        </div>

        {/* Terminal Output stream */}
        {commandHistory.length > 0 && (
          <div className="max-h-48 overflow-y-auto p-3 rounded-xl bg-black/70 border border-white/[0.06] space-y-2 text-xs font-mono text-slate-300">
            {commandHistory.map((item, idx) => (
              <div key={idx} className="space-y-1 border-b border-white/[0.04] pb-2 last:border-none last:pb-0">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-[#00FF66]">CMD: {item.command}</span>
                  <span>{item.time}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-slate-200">
                  {item.output}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DASHBOARD TELEMETRY TILES */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Ideas Bank</div>
          <div className="text-xl font-bold font-mono text-white">{FACTORY_METRICS.ideas}</div>
          <div className="text-[10px] text-[#00FF66]">+15 generated today</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Researched</div>
          <div className="text-xl font-bold font-mono text-cyan-400">{FACTORY_METRICS.research}</div>
          <div className="text-[10px] text-slate-400">Classified & verified</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">In Production</div>
          <div className="text-xl font-bold font-mono text-purple-400">{FACTORY_METRICS.production}</div>
          <div className="text-[10px] text-slate-400">Scripting & visuals</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Ready / QA</div>
          <div className="text-xl font-bold font-mono text-amber-400">{FACTORY_METRICS.ready}</div>
          <div className="text-[10px] text-slate-400">Approval gated</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Avg CTR</div>
          <div className="text-xl font-bold font-mono text-[#00FF66]">{FACTORY_METRICS.ctr}%</div>
          <div className="text-[10px] text-slate-400">Target &gt; 7.0%</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Retention</div>
          <div className="text-xl font-bold font-mono text-white">{FACTORY_METRICS.retention}%</div>
          <div className="text-[10px] text-slate-400">Watch: 12.4K hrs</div>
        </div>
      </div>

      {/* NAVIGATION TABS FOR MODULES */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-white/[0.08]">
        {[
          { id: "dashboard", label: "Dashboard", icon: FolderKanban },
          { id: "ideas", label: "Idea Factory & Quilting", icon: Sparkles },
          { id: "research", label: "Research & Originality", icon: Search },
          { id: "script", label: "Script Studio", icon: FileText },
          { id: "visuals", label: "Visual Engine & Scenes", icon: ImageIcon },
          { id: "voice_edit", label: "Voice & CapCut Timeline", icon: Mic },
          { id: "thumbnails", label: "Thumbnail & Titles", icon: Eye },
          { id: "approval", label: "Human Approval Gate", icon: ShieldCheck },
          { id: "repurpose", label: "Repurpose Engine", icon: Share2 },
          { id: "monetization", label: "Digital Products", icon: DollarSign },
          { id: "clusters_miner", label: "Clusters & Comment Miner", icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FactorySubTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#00FF66] text-black font-semibold shadow-sm"
                  : "bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: DASHBOARD & NEXT BEST VIDEO */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NEXT BEST VIDEO HERO CARD */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-[#0E1017] via-[#121622] to-[#0E1017] border border-[#00FF66]/30 shadow-[0_0_30px_rgba(0,255,102,0.1)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/30 text-[#00FF66] font-mono text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  NEXT BEST VIDEO (GODMODE AUDIT)
                </span>
                <span className="font-mono text-xs text-white bg-black/40 px-3 py-1 rounded-lg border border-white/[0.08]">
                  Score: <strong className="text-[#00FF66]">91 / 100</strong>
                </span>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-display font-extrabold text-white">
                  "{pkg.title}"
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Package Code: {pkg.code} · Target Duration: 10:14 · Niche: Vice City Geography & Mysteries
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#00FF66] font-semibold">
                  Unique Thesis:
                </div>
                <p className="leading-relaxed">{pkg.thesis}</p>
              </div>

              {/* Status matrix */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] text-center">
                  <div className="text-[10px] text-slate-400">Originality</div>
                  <div className="text-sm font-bold font-mono text-[#00FF66]">{pkg.originalityScore}/100</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] text-center">
                  <div className="text-[10px] text-slate-400">Research</div>
                  <div className="text-sm font-bold font-mono text-cyan-400">{pkg.researchScore}/100</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] text-center">
                  <div className="text-[10px] text-slate-400">Thumbnail</div>
                  <div className="text-sm font-bold font-mono text-amber-400">{pkg.thumbnailScore}/100</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] text-center">
                  <div className="text-[10px] text-slate-400">Risk</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">{pkg.riskLevel}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleRunCommand("/gta build")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>[BUILD VIDEO PACKAGE]</span>
                </button>

                <button
                  onClick={() => setActiveTab("approval")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Approval Gate</span>
                </button>

                <button
                  onClick={() => setActiveTab("script")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>View Script & Scenes</span>
                </button>
              </div>
            </div>

            {/* TODAY OPERATIONAL CHECKLIST */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                  <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Today's Production Sprint
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {todayTasks.filter((t) => t.done).length}/{todayTasks.length} Done
                </span>
              </div>

              <div className="space-y-2.5">
                {todayTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      t.done
                        ? "bg-[#00FF66]/[0.04] border-[#00FF66]/30 text-slate-300"
                        : "bg-black/30 border-white/[0.06] text-slate-200 hover:border-white/[0.15]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-[#00FF66] accent-[#00FF66] cursor-pointer"
                    />
                    <span className={`text-xs ${t.done ? "line-through text-slate-500" : ""}`}>
                      {t.task}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] text-slate-400 space-y-1 font-mono">
                <div className="text-slate-300 font-semibold">Weekly Calendar Roster:</div>
                <div>Mon: Strategy · Tue: Build · Wed: Assembly · Thu: Distribution · Fri: Scorecard</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: IDEA FACTORY & NICHE QUILTING */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          {/* Niche Quilting Showcase */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00FF66]" />
                  Niche Quilting Engine (Proven Formulas $\to$ Original GTA Angles)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Copies the underlying structure, curiosity mechanism and emotional trigger—never the content.
                </p>
              </div>
              <button
                onClick={() => handleRunCommand("/gta quilt")}
                className="px-3 py-1.5 rounded-lg bg-[#00FF66]/20 border border-[#00FF66]/40 text-[#00FF66] text-xs font-semibold hover:bg-[#00FF66]/30 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Run /gta quilt</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NICHE_QUILTING_EXAMPLES.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3"
                >
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    Input: "{ex.provenCompetitorTitle}"
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Formula: <code className="text-[#00FF66]">{ex.inputFormula}</code>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono text-slate-400">Original GTA Adaptations:</div>
                    {ex.gtaAdaptations.map((a, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-white/[0.03] text-xs text-white flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{a.title}</span>
                        <span className="text-[10px] font-mono text-[#00FF66] shrink-0">
                          {a.score}/100
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Factor Scoring Formula Banner */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-slate-300">
              <span className="text-[#00FF66] font-bold">7-Factor Master Scoring: </span>
              <span>S = 0.20C + 0.20R + 0.20O + 0.15Q + 0.10M + 0.10E + 0.05U</span>
            </div>
            <div className="text-slate-400">
              &lt; 70 = Back to Ideation · &gt; 85 = Production Candidate
            </div>
          </div>

          {/* Idea Bank Table */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-display font-bold text-white">
                GTA 6 Idea Bank ({filteredIdeas.length})
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filter Category:</span>
                {["All", "Mysteries", "Lore & Narrative", "History & Reality", "Development & Tech"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                        selectedCategory === cat
                          ? "bg-[#00FF66] text-black font-semibold"
                          : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              {filteredIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 rounded-xl bg-black/30 border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{idea.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">
                          {idea.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            idea.scores.total >= 90
                              ? "bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/30"
                              : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                          }`}
                        >
                          Score: {idea.scores.total}/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{idea.angle}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setPkg({ ...pkg, title: idea.title, thesis: idea.thesis });
                          setActiveTab("dashboard");
                        }}
                        className="px-3 py-1 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-colors"
                      >
                        BUILD
                      </button>
                      <button className="px-2.5 py-1 rounded-lg bg-white/[0.06] text-xs text-slate-300 hover:text-white">
                        EDIT
                      </button>
                      <button className="px-2.5 py-1 rounded-lg bg-white/[0.06] text-xs text-slate-300 hover:text-white">
                        KEEP
                      </button>
                    </div>
                  </div>

                  {/* Score breakdown metrics */}
                  <div className="grid grid-cols-7 gap-2 pt-2 border-t border-white/[0.04] text-[10px] font-mono text-center">
                    <div>
                      <span className="text-slate-500">Click: </span>
                      <span className="text-slate-200">{idea.scores.click}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Retention: </span>
                      <span className="text-slate-200">{idea.scores.retention}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Originality: </span>
                      <span className="text-slate-200">{idea.scores.originality}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Research: </span>
                      <span className="text-slate-200">{idea.scores.research}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Monetize: </span>
                      <span className="text-slate-200">{idea.scores.monetization}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Engage: </span>
                      <span className="text-slate-200">{idea.scores.engagement}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Reuse: </span>
                      <span className="text-slate-200">{idea.scores.reusability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: RESEARCH & ORIGINALITY GATE */}
      {activeTab === "research" && (
        <div className="space-y-6">
          {/* Research Card */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#00FF66] uppercase">
                  Research Dossier // Code: {pkg.code}
                </span>
                <h3 className="text-lg font-display font-bold text-white">{pkg.title}</h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                  Research Score: {pkg.researchScore}/100
                </span>
              </div>
            </div>

            {/* Unique Thesis Callout */}
            <div className="p-4 rounded-xl bg-[#00FF66]/[0.05] border border-[#00FF66]/30 space-y-1">
              <div className="text-[11px] font-mono text-[#00FF66] font-bold uppercase">
                The Unique Thesis (Separates from generic coverage)
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{pkg.thesis}</p>
            </div>

            {/* Fact vs Speculation Taxonomy */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase">
                Claims Classification Taxonomy:
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                        CONFIRMED
                      </span>
                      <span className="font-semibold text-white">
                        Trailer Frame 1422 Reflection Topography Anomaly
                      </span>
                    </div>
                    <p className="text-slate-300">
                      Pixel analysis of motel room window confirms curved viaduct terrain not matching Ocean Drive.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">Confidence: 98%</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-cyan-500/20 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400">
                        LIKELY
                      </span>
                      <span className="font-semibold text-white">
                        Take-Two Patent US20230285860A1 Water Displacement
                      </span>
                    </div>
                    <p className="text-slate-300">
                      Dynamic wake and lunar tide patents filed by Rockstar technology directors align with trailer boat wakes.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">Confidence: 91%</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400">
                        SPECULATION (LABELED)
                      </span>
                      <span className="font-semibold text-white">
                        Offshore Island Cluster Connected Via Smuggling Tunnels
                      </span>
                    </div>
                    <p className="text-slate-300">
                      Community theory regarding secondary accessible keys during hurricane weather events.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">Confidence: 45%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Originality Audit Checkpoint */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
                  Originality Gate & Checklist
                </h3>
                <p className="text-xs text-slate-400">
                  Enforces uniqueness to protect channel integrity and monetization standards.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 font-mono font-bold text-xs">
                Audit Score: {pkg.originalityScore}/100 (APPROVED)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {[
                "1. Unique thesis established and non-generic",
                "2. Contains original research and patent telemetry",
                "3. Substantially differs from existing YouTube uploads",
                "4. All speculation is strictly labeled as speculation",
                "5. Visual instructions use original AI prompts (no stolen key art)",
                "6. Narration advances an argument rather than filler",
                "7. Thumbnail focal point is original artwork without fake logos",
                "8. Value exists independently of AI generation",
                "9. Avoids copy-paste noun swapping",
                "10. Distinct perspective recognizable as CMPlay signature",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: SCRIPT STUDIO & HOOK GENERATOR */}
      {activeTab === "script" && (
        <div className="space-y-6">
          {/* 5 Hooks Generator */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#00FF66]" />
                  5 Hook Variations Ranked
                </h3>
                <p className="text-xs text-slate-400">
                  Every video receives 5 distinct psychological angle hooks.
                </p>
              </div>
              <button
                onClick={() => handleRunCommand("/gta hook")}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                Regenerate Hooks
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {pkg.hooks.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#00FF66] font-bold uppercase">{h.type}</span>
                      <span className="text-slate-400">{h.score}/100</span>
                    </div>
                    <p className="text-xs text-slate-200 italic leading-snug">"{h.hook}"</p>
                  </div>
                  <button
                    onClick={() => handleCopy(h.hook, `hook-${i}`)}
                    className="w-full py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedText === `hook-${i}` ? "Copied" : "Copy Hook"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 9-Part Documentary Script View */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  9-Part Documentary Script Architecture
                </h3>
                <p className="text-xs text-slate-400">
                  Structure: Cold Open → Promise → Context → Discovery → Escalation → Contrast → Payoff → Reveal → CTA
                </p>
              </div>
              <button
                onClick={() => handleCopy(pkg.script, "full-script")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                {copiedText === "full-script" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === "full-script" ? "Copied" : "Copy Script"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {pkg.script}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: VISUAL ENGINE & SCENES */}
      {activeTab === "visuals" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#00FF66]" />
                  Sequential Scene Generator & AAA Visual Prompts
                </h3>
                <p className="text-xs text-slate-400">
                  Script $\to$ Scene Detection $\to$ Image Prompt $\to$ Video Prompt $\to$ B-Roll $\to$ Caption
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {pkg.scenes.length} Scenes Calibrated
              </span>
            </div>

            {/* Content Safety Banner */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Safety Rule:</strong> Never reproduce official Rockstar promotional key art or trademarked logos. Always generate original cinematic game-inspired art.
              </span>
            </div>

            <div className="space-y-4">
              {pkg.scenes.map((scene) => (
                <div
                  key={scene.sceneId}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.04] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00FF66]/20 text-[#00FF66]">
                        Scene {scene.sceneId}
                      </span>
                      <span className="font-mono text-xs text-cyan-400">{scene.timestamp}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">
                        {scene.visualType}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Camera: {scene.camera} · Lighting: {scene.lighting}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Narration:</div>
                      <p className="text-slate-200 italic leading-snug">"{scene.narration}"</p>
                      <div className="text-[10px] font-mono text-[#00FF66] pt-1">
                        Burned Caption: "{scene.caption}"
                      </div>
                    </div>

                    <div className="space-y-1.5 p-3 rounded-lg bg-black/60 border border-white/[0.04]">
                      <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                        Image Prompt (SD 3.5 / Midjourney):
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug">{scene.imagePrompt}</p>

                      <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold pt-1">
                        Video Animation Prompt (Runway / Luma):
                      </div>
                      <p className="text-slate-400 text-[11px] leading-snug">{scene.videoPrompt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: VOICE & CAPCUT TIMELINE */}
      {activeTab === "voice_edit" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Engine */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#00FF66]" />
                  Voice Engine & Narration Modes
                </h3>
                <span className="text-xs font-mono text-[#00FF66]">8 Modes</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "1. Darren / Human",
                  "2. AI Documentary (Active)",
                  "3. Deep Male Resonance",
                  "4. Young Male Analytical",
                  "5. Female Investigative",
                  "6. High-Energy Breakdown",
                  "7. True-Crime Investigative",
                  "8. Custom Voice Clone",
                ].map((mode, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                      i === 1
                        ? "bg-[#00FF66]/10 border-[#00FF66]/40 text-[#00FF66]"
                        : "bg-black/30 border-white/[0.06] text-slate-300 hover:border-white/[0.15]"
                    }`}
                  >
                    {mode}
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 space-y-2">
                <div className="font-mono text-[#00FF66] font-bold text-[11px]">
                  Voice Direction Principles:
                </div>
                <p className="leading-relaxed">
                  Confident, conversational, investigative, controlled, slightly dramatic. Avoid robotic rhythm, fake urgency, and constant hype.
                </p>
              </div>
            </div>

            {/* CapCut Timeline Planner */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-cyan-400" />
                  CapCut Editing Blueprint & Pacing
                </h3>
                <span className="text-xs font-mono text-cyan-400">10:14 Target</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { time: "0:00–0:15", label: "Fast Hook", note: "Immediate unanswered question + visual zoom" },
                  { time: "0:15–0:45", label: "Promise + Context", note: "Frame what viewer will discover" },
                  { time: "0:45–2:00", label: "First Discovery", note: "Reveal first evidence frame" },
                  { time: "2:00–4:00", label: "Development", note: "Historical / lore context" },
                  { time: "4:00–6:00", label: "Escalation", note: "Introduce Take-Two patent data" },
                  { time: "6:00–8:00", label: "Major Reveal", note: "Unexpected contradiction & offshore shipping" },
                  { time: "8:00–9:30", label: "Interpretation", note: "Explain why the evidence matters" },
                  { time: "9:30–10:14", label: "Payoff + Next Video", note: "Core thesis conclusion + CTA card" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] flex items-center justify-between gap-2"
                  >
                    <div className="font-mono text-[#00FF66] font-bold w-20">{item.time}</div>
                    <div className="font-medium text-white w-32">{item.label}</div>
                    <div className="text-[11px] text-slate-400 truncate flex-1">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: THUMBNAILS & TITLES */}
      {activeTab === "thumbnails" && (
        <div className="space-y-6">
          {/* 5 Thumbnail Concepts */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#00FF66]" />
                  5 Thumbnail Concepts (Extreme Curiosity Gap)
                </h3>
                <p className="text-xs text-slate-400">
                  Original artwork with 2–4 words max text. No official promotional artwork or fake Rockstar logos.
                </p>
              </div>
              <button
                onClick={() => handleRunCommand("/gta thumbnail")}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                Regenerate Concepts
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {pkg.thumbnails.map((th) => (
                <div
                  key={th.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-[#00FF66] uppercase font-bold">
                      {th.type}
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-[#00FF66]/30 text-center text-xs font-mono font-extrabold text-[#00FF66]">
                      "{th.textOverlay}"
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug pt-1">{th.concept}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(th.prompt, th.id)}
                    className="w-full py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedText === th.id ? "Copied Prompt" : "Copy AI Prompt"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 20 Titles Grid */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-display font-bold text-white">
                Title Variations (Categorized & Verified)
              </h3>
              <span className="text-xs font-mono text-slate-400">&lt; 70 characters target</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {pkg.titles.map((t, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] flex items-center justify-between gap-2"
                >
                  <span className="font-medium text-white">{t.title}</span>
                  <span className="text-[10px] font-mono text-[#00FF66] px-2 py-0.5 rounded bg-white/[0.04]">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 8: HUMAN APPROVAL GATE */}
      {activeTab === "approval" && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0E1017] via-[#141924] to-[#0E1017] border border-[#00FF66]/40 shadow-[0_0_35px_rgba(0,255,102,0.12)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    HUMAN APPROVAL GATE // MANDATORY CHECKPOINT
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white mt-1">
                  Final Publish Check: "{pkg.title}"
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Package ID: {pkg.code} · GodMode refuses to auto-publish without manual sign-off.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setApprovalDecision("rejected")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    approvalDecision === "rejected"
                      ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                      : "bg-white/[0.06] text-slate-300 hover:text-white"
                  }`}
                >
                  [REJECT]
                </button>
                <button
                  onClick={() => setActiveTab("script")}
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  [EDIT]
                </button>
                <button
                  onClick={() => setApprovalDecision("approved")}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    approvalDecision === "approved"
                      ? "bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]"
                      : "bg-[#00FF66]/80 text-black hover:bg-[#00FF66]"
                  }`}
                >
                  [APPROVE FOR PRODUCTION]
                </button>
              </div>
            </div>

            {/* Scorecard Metric Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] text-center">
                <div className="text-[10px] font-mono text-slate-400">Originality Score</div>
                <div className="text-2xl font-bold font-mono text-[#00FF66]">{pkg.originalityScore}/100</div>
                <div className="text-[10px] text-slate-500">Threshold: 90+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] text-center">
                <div className="text-[10px] font-mono text-slate-400">Research Quality</div>
                <div className="text-2xl font-bold font-mono text-cyan-400">{pkg.researchScore}/100</div>
                <div className="text-[10px] text-slate-500">Threshold: 85+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] text-center">
                <div className="text-[10px] font-mono text-slate-400">Thumbnail Score</div>
                <div className="text-2xl font-bold font-mono text-amber-400">{pkg.thumbnailScore}/100</div>
                <div className="text-[10px] text-slate-500">Threshold: 85+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] text-center">
                <div className="text-[10px] font-mono text-slate-400">Title Score</div>
                <div className="text-2xl font-bold font-mono text-purple-400">{pkg.titleScore}/100</div>
                <div className="text-[10px] text-slate-500">Threshold: 85+</div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] text-center">
                <div className="text-[10px] font-mono text-slate-400">Copyright Risk</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">{pkg.riskLevel}</div>
                <div className="text-[10px] text-slate-500">Protected</div>
              </div>
            </div>

            {/* 15-Point Publishing Preflight Checklist */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                15-Item Pre-Flight Checklist:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {[
                  "Title approved & under 70 chars",
                  "Thumbnail approved (no fake logos)",
                  "Script originality ≥ 90",
                  "Research claims verified",
                  "Speculation strictly labeled",
                  "Visual rights checked & original",
                  "Voice mode approved (AI Doc)",
                  "Captions checked & synchronized",
                  "Description generated with links",
                  "Affiliate disclosure reviewed",
                  "Playlist selected (Vice City)",
                  "End screen planned with CTA",
                  "Related video selected",
                  "Community post scheduled",
                  "Multi-platform cutdowns ready",
                ].map((chk, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>

            {approvalDecision === "approved" && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
                <div>
                  <strong>PACKAGE APPROVED BY CREATOR:</strong> Ready for distribution deployment and multi-channel repurposing.
                </div>
                <button
                  onClick={handleExportFullPackage}
                  className="px-4 py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Manifest</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 9: REPURPOSE ENGINE */}
      {activeTab === "repurpose" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#00FF66]" />
                  Repurpose Engine (1 Long-Form $\to$ 10 Platform Derivatives)
                </h3>
                <p className="text-xs text-slate-400">
                  Turns one YouTube anchor asset into native vertical shorts, blog, newsletter, and social threads.
                </p>
              </div>
              <button
                onClick={() => handleRunCommand("/gta repurpose")}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                Regenerate Package
              </button>
            </div>

            {/* 3 Shorts */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-[#00FF66] font-bold">
                3 Standalone YouTube Shorts / TikToks / Reels (9:16)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pkg.repurpose.shorts.map((sh, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs"
                  >
                    <div className="font-semibold text-white">{sh.title}</div>
                    <div className="text-slate-300 italic">Hook: "{sh.hook}"</div>
                    <p className="text-[11px] text-slate-400">{sh.angle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* X Thread & Community Post */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs">
                <div className="text-xs font-mono uppercase text-cyan-400 font-bold">
                  X Thread (5 Tweets)
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-slate-300 font-mono text-[11px]">
                  {pkg.repurpose.xThread.map((tw, i) => (
                    <div key={i} className="p-2 rounded bg-black/40 border border-white/[0.04]">
                      {tw}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs">
                <div className="text-xs font-mono uppercase text-purple-400 font-bold">
                  YouTube Community Post & Poll
                </div>
                <p className="text-slate-200 leading-relaxed">{pkg.repurpose.communityPost}</p>

                <div className="text-xs font-mono uppercase text-amber-400 font-bold pt-2">
                  Newsletter Teaser
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{pkg.repurpose.newsletter}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 10: DIGITAL PRODUCTS & MONETIZATION */}
      {activeTab === "monetization" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#00FF66]" />
                  Digital Product Ladder & Revenue Stack
                </h3>
                <p className="text-xs text-slate-400">
                  Every video reveals a problem that translates into complementary downloadable assets.
                </p>
              </div>
              <button
                onClick={() => onSelectTab("monetization")}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                Open Monetization Hub
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  FREE LEAD MAGNET
                </div>
                <div className="font-bold text-white text-sm">{pkg.products.freeLeadMagnet}</div>
                <p className="text-slate-400 text-[11px]">
                  Builds email list independent of YouTube algorithms.
                </p>
                <div className="text-[#00FF66] font-mono font-bold">$0.00 (Email Capture)</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  LOW TICKET PRODUCT
                </div>
                <div className="font-bold text-white text-sm">{pkg.products.lowTicket.name}</div>
                <p className="text-slate-400 text-[11px]">
                  Entry-level field guide PDF with coordinates.
                </p>
                <div className="text-cyan-300 font-mono font-bold">{pkg.products.lowTicket.price}</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                  MID TICKET TOOLKIT
                </div>
                <div className="font-bold text-white text-sm">{pkg.products.midTicket.name}</div>
                <p className="text-slate-400 text-[11px]">
                  Creator prompt pack, 4K LUTs, and script templates.
                </p>
                <div className="text-purple-300 font-mono font-bold">{pkg.products.midTicket.price}</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  HIGH TICKET / SERVICE
                </div>
                <div className="font-bold text-white text-sm">Channel Automation Setup</div>
                <p className="text-slate-400 text-[11px]">{pkg.products.service}</p>
                <div className="text-amber-300 font-mono font-bold">$497 / month</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 11: CLUSTERS & COMMENT MINER */}
      {activeTab === "clusters_miner" && (
        <div className="space-y-6">
          {/* Content Clusters */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00FF66]" />
              Thematic Content Clusters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONTENT_CLUSTERS.map((cl) => (
                <div
                  key={cl.id}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 text-xs"
                >
                  <div className="font-bold text-white text-sm">{cl.name}</div>
                  <p className="text-slate-400">{cl.description}</p>
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                    {cl.videos.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[11px] p-1.5 rounded bg-white/[0.02]"
                      >
                        <span className="text-slate-200 truncate">{v.title}</span>
                        <span className="text-[10px] font-mono text-[#00FF66] shrink-0">
                          {v.views}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Mining Pool */}
          <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-4">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Audience Comment Mining Loop
            </h3>
            <p className="text-xs text-slate-400">
              Converts real community comments into research questions and future video concepts.
            </p>

            <div className="space-y-3">
              {COMMENT_MINING_POOL.map((cm) => (
                <div
                  key={cm.id}
                  className="p-4 rounded-xl bg-black/30 border border-white/[0.06] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-mono font-medium">{cm.author}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400">
                      {cm.status}
                    </span>
                  </div>
                  <p className="text-slate-200 italic leading-snug">"{cm.comment}"</p>
                  <div className="p-2.5 rounded bg-black/60 border border-white/[0.04] space-y-1">
                    <div className="text-[10px] font-mono text-[#00FF66]">
                      Research Question: {cm.researchQuestion}
                    </div>
                    <div className="text-white font-semibold">
                      Proposed Video: "{cm.proposedVideoTitle}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Embedded System Tutorial Modal */}
      <SystemTutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onSelectTab={onSelectTab}
      />
    </div>
  );
};
