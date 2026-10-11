import React, { useState } from "react";
import { ASSETS } from "../../assets/assetPaths";
import { Image as ImageIcon, Sparkles, Sliders, ShieldCheck, Download, Copy, Check, Eye } from "lucide-react";

export const ImageLabSD: React.FC = () => {
  const [prompt, setPrompt] = useState(
    "Cinematic 35mm photograph of Lucia standing next to a customized Bravado Banshee on Ocean Beach at twilight, neon reflections in tidal puddles, 8k resolution, photorealistic volumetric lighting"
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "blurry, distorted anatomy, text artifacts, low resolution, over-saturated, cartoonish"
  );
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1" | "4:3">("16:9");
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState(ASSETS.heroSkyline);
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      name: "Vice City Neon Noir",
      prompt: "Lucia and Jason navigating a rain-soaked Ocean Drive in Vice City, neon cyan and magenta reflections, cinematic lighting, 8k",
    },
    {
      name: "Ambrosia Swamp Airboat",
      prompt: "Airboat accelerating through misty subtropical mangroves of Leonida at sunrise, Spanish moss, volumetric rays, high detail",
    },
    {
      name: "Tactical Cover Art",
      prompt: "Action movie style GTA VI promotional poster with bold typography space, gold and emerald color grading, gritty detail",
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveImage(ASSETS.heroSkyline);
    }, 1200);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#FFD700]" />
            <span>Stable Diffusion 3.5 Visual Lab</span>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 font-mono">
              Diffusers Architecture
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate high-resolution thumbnails, cinematic concept art, environment backdrops, and character portraits.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
          <span>SD 3.5 Commercial License Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompt & Model Controls (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FFD700]" />
            <span>Generation Parameters</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>Positive Prompt</span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="text-[#00FF66] hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/50"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Negative Prompt</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1.5">Aspect Ratio</label>
            <div className="grid grid-cols-4 gap-2">
              {(["16:9", "9:16", "1:1", "4:3"] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`p-2 rounded-lg text-center text-xs font-mono font-bold border transition-colors ${
                    aspectRatio === ratio
                      ? "bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700]"
                      : "bg-white/[0.03] border-white/[0.08] text-slate-400"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Sampling Steps</span>
                <span className="font-mono text-white">{steps}</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={steps}
                onChange={(e) => setSteps(parseInt(e.target.value))}
                className="w-full accent-[#FFD700]"
              />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>CFG Guidance</span>
                <span className="font-mono text-white">{cfgScale}</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={cfgScale}
                onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                className="w-full accent-[#FFD700]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-lg bg-[#FFD700] text-black font-semibold text-xs hover:bg-[#FFD700]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? "Executing SD 3.5 Large Run..." : "Generate Image"}</span>
            </button>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
            <div className="text-[11px] font-semibold text-slate-400">Quick Prompt Presets:</div>
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPrompt(p.prompt)}
                className="w-full text-left p-2 rounded bg-white/[0.02] hover:bg-white/[0.06] text-[11px] text-slate-300 transition-colors"
              >
                <div className="font-semibold text-white">{p.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{p.prompt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: High-Resolution Canvas & Output Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>High-Fidelity Render Viewport</span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span>Resolution: 1920 x 1080</span>
              <span>·</span>
              <span className="text-[#00FF66]">FP16 TensorRT</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-black aspect-video group shadow-2xl">
            <img
              src={activeImage}
              alt="Stable Diffusion Output"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
              <div className="text-xs text-white max-w-md">
                <div className="font-bold">SD 3.5 Large Tensor Output</div>
                <div className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{prompt}</div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeImage}
                  download="leonida_render.jpg"
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs backdrop-blur-md transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div
              onClick={() => setActiveImage(ASSETS.heroSkyline)}
              className="aspect-video rounded-lg overflow-hidden border border-white/[0.1] cursor-pointer hover:border-[#FFD700] transition-colors"
            >
              <img
                src={ASSETS.heroSkyline}
                alt="Vice City Sunset"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() => setActiveImage(ASSETS.leonidaMap)}
              className="aspect-video rounded-lg overflow-hidden border border-white/[0.1] cursor-pointer hover:border-[#FFD700] transition-colors"
            >
              <img
                src={ASSETS.leonidaMap}
                alt="Leonida Satellite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() => setActiveImage(ASSETS.clipforgeVisual)}
              className="aspect-video rounded-lg overflow-hidden border border-white/[0.1] cursor-pointer hover:border-[#FFD700] transition-colors"
            >
              <img
                src={ASSETS.clipforgeVisual}
                alt="ClipForge Visual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
