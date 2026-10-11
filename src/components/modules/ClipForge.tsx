import React, { useState } from "react";
import { ClipCandidate } from "../../types";
import { INITIAL_CLIPS } from "../../data/mockData";
import { ASSETS } from "../../assets/assetPaths";
import { detectMoments } from "../../services/apiClient";
import {
  Scissors,
  Play,
  Sparkles,
  Smartphone,
  Share2,
  CheckCircle2,
  Clock,
  Layers,
  Upload,
  Link as LinkIcon,
  ShieldCheck,
  Send,
  Loader2,
  Tv,
} from "lucide-react";

export const ClipForge: React.FC = () => {
  const [clips, setClips] = useState<ClipCandidate[]>(INITIAL_CLIPS);
  const [selectedClip, setSelectedClip] = useState<ClipCandidate>(INITIAL_CLIPS[0]);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [videoTitleInput, setVideoTitleInput] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionOutput, setDetectionOutput] = useState<string | null>(null);
  const [activeCropMode, setActiveCropMode] = useState<"9:16" | "1:1" | "16:9">("9:16");
  const [captionStyle, setCaptionStyle] = useState<"neon" | "bold_yellow" | "clean_white">("neon");

  const handleIngestAndDetect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitleInput.trim() || isDetecting) return;
    setIsDetecting(true);
    setDetectionOutput(null);

    try {
      const res = await detectMoments(
        videoTitleInput,
        videoUrlInput || "Gameplay stream covering high-speed pursuit in Ocean Beach during tropical thunderstorm"
      );
      setDetectionOutput(res.moments);

      const newClip: ClipCandidate = {
        id: `clip-${Date.now()}`,
        sourceTitle: videoTitleInput,
        sourceUrl: videoUrlInput || "https://youtube.com/watch?v=ingested_stream",
        sourceType: "Gameplay",
        rightsStatus: "Original Owned",
        startTime: "00:15",
        endTime: "00:45",
        durationSeconds: 30,
        hookScore: 94,
        actionMoment: "Extreme drift maneuver through Vice City police barricade",
        captionText: "Wait until you see the water splash reflections on the rear fender...",
        status: "detected",
        targetPlatforms: ["TikTok", "YouTube Shorts", "Instagram Reels"],
      };

      setClips([newClip, ...clips]);
      setSelectedClip(newClip);
    } catch (err) {
      setDetectionOutput("Detection engine offline. Using local template.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleApproveClip = (id: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "ready" } : c))
    );
    if (selectedClip.id === id) {
      setSelectedClip({ ...selectedClip, status: "ready" });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[#00FF66]" />
            <span>ClipForge Studio</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              v2026.10
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Universal content clipping, AI moment detection, 9:16 vertical reframing, and rights provenance.
          </p>
        </div>

        {/* Rights Policy Notice */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
          <span>CMPlay Transformative Rights Engine Active</span>
        </div>
      </div>

      {/* Ingest Source Video / Stream Sandbox */}
      <form
        onSubmit={handleIngestAndDetect}
        className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4"
      >
        <div className="text-xs font-semibold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#00FF66]" />
          <span>Ingest Source Video or Gameplay Stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Source Video Title / Episode</label>
            <input
              type="text"
              value={videoTitleInput}
              onChange={(e) => setVideoTitleInput(e.target.value)}
              placeholder="e.g. 'Ocean Beach 4-Star Evacuation with Lucia & Jason'"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
              required
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">YouTube / Twitch Stream URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
              />
              <button
                type="submit"
                disabled={isDetecting}
                className="px-4 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.25)] shrink-0"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Detecting Moments...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Detect Moments</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {detectionOutput && (
          <div className="p-4 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-slate-200 whitespace-pre-line leading-relaxed">
            {detectionOutput}
          </div>
        )}
      </form>

      {/* Main Studio Viewport: Vertical 9:16 Canvas & Candidate Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 9:16 Vertical Preview Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-4 h-4 text-[#00FF66]" />
              9:16 Vertical Framing Engine
            </span>
            <div className="flex items-center gap-1 bg-white/[0.05] p-0.5 rounded-md">
              <button
                type="button"
                onClick={() => setActiveCropMode("9:16")}
                className={`px-2 py-0.5 text-[10px] rounded ${
                  activeCropMode === "9:16" ? "bg-[#00FF66] text-black font-semibold" : "text-slate-400"
                }`}
              >
                9:16
              </button>
              <button
                type="button"
                onClick={() => setActiveCropMode("1:1")}
                className={`px-2 py-0.5 text-[10px] rounded ${
                  activeCropMode === "1:1" ? "bg-[#00FF66] text-black font-semibold" : "text-slate-400"
                }`}
              >
                1:1
              </button>
            </div>
          </div>

          {/* Smartphone Mockup Frame */}
          <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/[0.15] bg-black shadow-2xl flex flex-col justify-between p-4">
            <img
              src={ASSETS.clipforgeVisual}
              alt="ClipForge Vertical Stage"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

            {/* Top Phone Overlay */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-white/90">
              <span className="font-mono">{selectedClip.startTime} / {selectedClip.endTime}</span>
              <span className="px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold text-[10px] border border-[#00FF66]/30">
                Hook Score: {selectedClip.hookScore}/100
              </span>
            </div>

            {/* Center Dynamic Subtitle Overlay */}
            <div className="relative z-10 text-center px-2 space-y-2">
              <div
                className={`text-sm md:text-base font-extrabold uppercase leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] ${
                  captionStyle === "neon"
                    ? "text-[#00FF66] text-shadow-[0_0_12px_#00FF66]"
                    : captionStyle === "bold_yellow"
                    ? "text-[#FFD700]"
                    : "text-white"
                }`}
              >
                "{selectedClip.captionText}"
              </div>
            </div>

            {/* Bottom Platform Targets & Controls */}
            <div className="relative z-10 space-y-2 bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-white/[0.1]">
              <div className="text-[10px] text-slate-300 font-medium truncate">
                {selectedClip.sourceTitle}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {selectedClip.targetPlatforms.map((p) => (
                    <span
                      key={p}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.1] text-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleApproveClip(selectedClip.id)}
                  className="px-2.5 py-1 rounded bg-[#00FF66] text-black font-bold text-[10px] hover:bg-[#00FF66]/90 transition-colors"
                >
                  {selectedClip.status === "ready" ? "Approved ✓" : "Approve Clip"}
                </button>
              </div>
            </div>
          </div>

          {/* Subtitle Style Chooser */}
          <div className="flex items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px]">Captions:</span>
            <button
              onClick={() => setCaptionStyle("neon")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                captionStyle === "neon"
                  ? "border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10"
                  : "border-white/[0.1] text-slate-400"
              }`}
            >
              Neon Emerald
            </button>
            <button
              onClick={() => setCaptionStyle("bold_yellow")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                captionStyle === "bold_yellow"
                  ? "border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10"
                  : "border-white/[0.1] text-slate-400"
              }`}
            >
              Vice Gold
            </button>
            <button
              onClick={() => setCaptionStyle("clean_white")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                captionStyle === "clean_white"
                  ? "border-white text-white bg-white/10"
                  : "border-white/[0.1] text-slate-400"
              }`}
            >
              Minimal White
            </button>
          </div>
        </div>

        {/* Right: Detected Moment Candidates Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Detected Clip Candidates ({clips.length})</h2>
            <span className="text-xs text-slate-400 font-mono">Sorted by Hook Score</span>
          </div>

          <div className="space-y-3">
            {clips.map((clip) => {
              const isSelected = selectedClip.id === clip.id;
              return (
                <div
                  key={clip.id}
                  onClick={() => setSelectedClip(clip)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? "bg-[#0E1017] border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.1)]"
                      : "bg-[#0E1017]/70 border-white/[0.08] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{clip.sourceTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#00FF66] font-bold">
                        {clip.hookScore}/100 HOOK
                      </span>
                      <span>·</span>
                      <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                        {clip.startTime} - {clip.endTime} ({clip.durationSeconds}s)
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Moment Trigger: </span>
                    {clip.actionMoment}
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300">
                    <span className="text-slate-400">Suggested Overlay: </span>
                    <span className="text-white italic">"{clip.captionText}"</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <span>Rights: {clip.rightsStatus}</span>
                      <span>·</span>
                      <span>Source: {clip.sourceType}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveClip(clip.id);
                      }}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        clip.status === "ready"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/[0.08] hover:bg-[#00FF66] hover:text-black text-white"
                      }`}
                    >
                      {clip.status === "ready" ? "Ready for Export" : "Approve"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
