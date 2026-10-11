import React, { useState } from "react";
import { ASSETS } from "../../assets/assetPaths";
import { History, Radio, Tv, Sparkles, Disc, Flame, Volume2, Copy, Check } from "lucide-react";

export const NostalgiaLab: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("Vice City (2002)");
  const [enableCrtShader, setEnableCrtShader] = useState(true);
  const [activeStation, setActiveStation] = useState("Flash FM");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const RETRO_GAMES = [
    { title: "GTA: Vice City (2002)", era: "1986 Miami", station: "Flash FM", vibes: "Synthwave, pastels, Ocean View Hotel, Tommy Vercetti" },
    { title: "GTA: San Andreas (2004)", era: "1992 West Coast", station: "Radio Los Santos", vibes: "Lowriders, Ganton, Mount Chiliad, CJ" },
    { title: "GTA III (2001)", era: "2001 Liberty City", station: "Game FM", vibes: "Cloudy gray skies, Portland docks, Claude Speed" },
    { title: "Midnight Club II (2003)", era: "Y2K Street Racing", station: "Techno Beats", vibes: "Nitrous purges, Tokyo neon, Paris cobblestones" },
  ];

  const handleGenerateRetroPrompt = () => {
    const prompt = `Vintage 2002 PlayStation 2 promo artwork of ${selectedGame}, low-poly geometry aesthetics with authentic scanlines, rich warm Miami sunset gradients, vaporwave neon signage, nostalgic Y2K game magazine spread, 35mm film grain, retro commercial aesthetic.`;
    setGeneratedPrompt(prompt);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-purple-400" />
            <span>Nostalgia Lab (PS2 / Y2K Archive)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Retro aesthetic laboratory honoring GTA III, Vice City (2002), San Andreas, and early 2000s gaming culture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnableCrtShader(!enableCrtShader)}
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              enableCrtShader
                ? "bg-purple-500/20 border-purple-500 text-purple-300"
                : "bg-white/[0.05] border-white/[0.08] text-slate-400"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>CRT Scanline Shader: {enableCrtShader ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CRT Display Showcase (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Tv className="w-4 h-4 text-purple-400" />
              Sony Trinitron CRT Simulation
            </span>
            <span className="font-mono text-purple-400">480i · 4:3 Aspect</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-black aspect-[4/3] group shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <img
              src={ASSETS.nostalgiaPs2}
              alt="Retro CRT Display"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* CRT Scanline Overlay Effect */}
            {enableCrtShader && (
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]">
                <div
                  className="w-full h-full opacity-35"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
                    backgroundSize: "100% 4px",
                  }}
                />
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-purple-300 border border-purple-500/30">
              AV-1 · MEMORY CARD (8MB)
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/[0.1] flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="font-bold text-white">{selectedGame}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">128-bit Emotion Engine</span>
            </div>
          </div>
        </div>

        {/* Right: Retro Prompt Generator & Era Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
            <div className="text-xs font-semibold text-white">Classic Title Selection</div>
            <div className="space-y-2">
              {RETRO_GAMES.map((game) => (
                <button
                  key={game.title}
                  onClick={() => {
                    setSelectedGame(game.title);
                    setActiveStation(game.station);
                  }}
                  className={`w-full p-3 rounded-lg text-left text-xs transition-colors border ${
                    selectedGame === game.title
                      ? "bg-purple-500/10 border-purple-500/40 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="font-bold">{game.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{game.vibes}</div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Radio Station:</span>
                <span className="font-mono text-purple-300 font-bold">{activeStation}</span>
              </div>

              <button
                onClick={handleGenerateRetroPrompt}
                className="w-full py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-xs hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Retro Art Prompt</span>
              </button>
            </div>

            {generatedPrompt && (
              <div className="p-3.5 rounded-lg bg-black/60 border border-white/[0.08] space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Stable Diffusion Retro Recipe:</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="text-purple-300 hover:text-white flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#00FF66]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] font-mono leading-relaxed">{generatedPrompt}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
