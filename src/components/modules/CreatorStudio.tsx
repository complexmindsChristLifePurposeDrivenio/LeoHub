import React, { useState } from "react";
import { generateScript } from "../../services/apiClient";
import {
  PenTool,
  Sparkles,
  Clock,
  Video,
  FileText,
  Copy,
  Check,
  Send,
  Loader2,
  Sliders,
  Share2,
} from "lucide-react";

export const CreatorStudio: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("60 seconds");
  const [format, setFormat] = useState("YouTube Shorts");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const durationOptions = [
    "10 seconds",
    "30 seconds",
    "60 seconds",
    "90 seconds",
    "3 minutes",
    "5 minutes",
    "10 minutes",
    "20 minutes",
  ];

  const formatOptions = [
    "YouTube Shorts",
    "TikTok (9:16)",
    "Instagram Reels",
    "YouTube Long-Form Episode",
    "Editorial Newsletter",
    "X Thread & Video Cut",
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedScript(null);
    setCopied(false);

    try {
      const res = await generateScript(topic, duration, format);
      setGeneratedScript(res.script);
    } catch (err) {
      setGeneratedScript(
        `### Script: ${topic}\n**Duration**: ${duration} | **Format**: ${format}\n\n**Hook**: "Rockstar hid something inside the latest Vice City preview that 99% of fans missed..."\n\n**Body Narrative**:\n- 0:04 - 0:15: Satellite analysis of Ocean Beach.\n- 0:15 - 0:32: Lucia & Jason getaway timing.\n\n**CTA**: "Join the Leonida Dojo for the full blueprint!"`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <PenTool className="w-6 h-6 text-[#00FF66]" />
            <span>Creator Studio & Script Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Produce retention-engineered scripts, 3-second hook trios, thumbnail briefs, and AEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Pacing Target: 160 WPM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Script Configuration Form (5 cols) */}
        <form
          onSubmit={handleGenerate}
          className="lg:col-span-5 p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4"
        >
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00FF66]" />
            <span>Script Parameters</span>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Content Topic or Video Angle</label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 'Why the VCPD dynamic pursuit physics will punish reckless drivers in the Ambrosia bayous'"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
              required
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Target Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-slate-200 focus:outline-none"
            >
              {formatOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Duration Pacing Mode</label>
            <div className="grid grid-cols-4 gap-1.5">
              {durationOptions.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`p-1.5 rounded text-[10px] font-medium transition-colors border ${
                    duration === d
                      ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66]"
                      : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.25)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Retention Script...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Script & Hooks</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[10px] text-slate-500 pt-1">
            Includes: 3 hook variations, camera cut cues, B-roll recommendations, CTA, and SEO keywords.
          </div>
        </form>

        {/* Right: Output Teleprompter & Direction Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#00FF66]" />
              Production Teleprompter Output
            </span>
            {generatedScript && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span className="text-[#00FF66]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] min-h-[460px] max-h-[560px] overflow-y-auto">
            {generatedScript ? (
              <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono space-y-2">
                {generatedScript}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-500">
                <FileText className="w-8 h-8 text-slate-600" />
                <div className="text-xs font-medium text-slate-400">
                  Ready to engineer viral GTA scripts
                </div>
                <p className="text-[11px] max-w-sm">
                  Enter your topic, choose your target platform and duration, and the AI will craft word-for-word scripts calibrated for 80%+ audience retention.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
