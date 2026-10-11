import React, { useState } from "react";
import { Layers, Sparkles, Sliders, Shield, Zap, Eye, Compass, Gauge, Radio } from "lucide-react";

export const MotionHub: React.FC = () => {
  const [blurLevel, setBlurLevel] = useState(28);
  const [accentColor, setAccentColor] = useState<"#00FF66" | "#FFD700" | "#00E5FF">("#00FF66");
  const [showHudOverlay, setShowHudOverlay] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTiltAngle({ x, y });
  };

  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#00FF66]" />
            <span>Motion Hub & Liquid Glass 2026</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Translucent glass physics, 28px optical diffusion, 60fps HUD overlays, and responsive motion tokens.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
              reducedMotion
                ? "bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66]"
                : "bg-white/[0.05] border-white/[0.08] text-slate-300"
            }`}
          >
            Reduced Motion: {reducedMotion ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Motion Token Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Design Token Controls (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00FF66]" />
            <span>Liquid Glass Parameters</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Backdrop Blur Intensity</span>
                <span className="font-mono text-[#00FF66]">{blurLevel}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="48"
                value={blurLevel}
                onChange={(e) => setBlurLevel(parseInt(e.target.value))}
                className="w-full accent-[#00FF66]"
              />
            </div>

            <div>
              <div className="text-xs text-slate-300 mb-1.5">Primary Accent Luminescence</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAccentColor("#00FF66")}
                  className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                    accentColor === "#00FF66"
                      ? "border-[#00FF66] bg-[#00FF66]/20 text-[#00FF66]"
                      : "border-white/[0.08] text-slate-400"
                  }`}
                >
                  Emerald #00FF66
                </button>
                <button
                  type="button"
                  onClick={() => setAccentColor("#FFD700")}
                  className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                    accentColor === "#FFD700"
                      ? "border-[#FFD700] bg-[#FFD700]/20 text-[#FFD700]"
                      : "border-white/[0.08] text-slate-400"
                  }`}
                >
                  Vice Gold #FFD700
                </button>
                <button
                  type="button"
                  onClick={() => setAccentColor("#00E5FF")}
                  className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                    accentColor === "#00E5FF"
                      ? "border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF]"
                      : "border-white/[0.08] text-slate-400"
                  }`}
                >
                  Cyan #00E5FF
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">In-Game HUD Elements</span>
                <input
                  type="checkbox"
                  checked={showHudOverlay}
                  onChange={(e) => setShowHudOverlay(e.target.checked)}
                  className="accent-[#00FF66]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-black/40 p-3 border border-white/[0.06] text-[11px] text-slate-400 space-y-1 font-mono">
            <div>canvas: #0B0C10 (Obsidian)</div>
            <div>backdrop-filter: blur({blurLevel}px)</div>
            <div>sheen: linear-gradient(135deg, white 0%, transparent 100%)</div>
            <div>accent: {accentColor}</div>
          </div>
        </div>

        {/* Right: Interactive 3D Holographic Card & HUD Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-semibold text-white">Interactive 3D Motion Viewport</div>

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: "1000px",
            }}
            className="relative h-[440px] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0B0C10] flex items-center justify-center p-8 transition-all"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-300"
              style={{
                backgroundColor: accentColor,
              }}
            />

            {/* 3D Glass HUD Panel */}
            <div
              style={{
                transform: `rotateX(${tiltAngle.y}deg) rotateY(${tiltAngle.x}deg)`,
                backdropFilter: `blur(${blurLevel}px)`,
                borderColor: `${accentColor}33`,
              }}
              className="relative z-10 w-full max-w-lg p-6 rounded-2xl bg-white/[0.03] border shadow-2xl transition-transform duration-100 ease-out space-y-6"
            >
              {/* Glass Sheen Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="font-display font-bold text-white text-sm tracking-wider">
                    VCPD TELEMETRY HUD // SECTOR 04
                  </span>
                </div>
                <span className="font-mono text-xs" style={{ color: accentColor }}>
                  142 MPH · GEAR 6
                </span>
              </div>

              {/* HUD Speedometer & Mini Gauge Mock */}
              {showHudOverlay && (
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                    <Gauge className="w-4 h-4 mx-auto text-slate-400" />
                    <div className="text-[10px] text-slate-400 uppercase">Engine RPM</div>
                    <div className="font-mono font-bold text-white text-sm">7,450</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                    <Radio className="w-4 h-4 mx-auto text-slate-400" />
                    <div className="text-[10px] text-slate-400 uppercase">Radio Wave</div>
                    <div className="font-mono font-bold text-white text-sm">Flash FM</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                    <Compass className="w-4 h-4 mx-auto text-slate-400" />
                    <div className="text-[10px] text-slate-400 uppercase">Bearing</div>
                    <div className="font-mono font-bold text-white text-sm">184° S</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Move cursor to inspect 3D Liquid Glass depth</span>
                <span style={{ color: accentColor }} className="font-semibold">
                  60 FPS Smooth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
