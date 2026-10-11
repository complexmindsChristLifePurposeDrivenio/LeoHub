import React, { useState } from "react";
import { Video, Film, Sliders, Play, Sparkles, Plus, Clock, Copy, Check } from "lucide-react";

interface StoryboardShot {
  id: string;
  shotNumber: number;
  cameraMovement: string;
  visualCue: string;
  voiceoverLine: string;
  durationSeconds: number;
  aiPrompt: string;
}

const INITIAL_SHOTS: StoryboardShot[] = [
  {
    id: "shot-01",
    shotNumber: 1,
    cameraMovement: "Low-angle high-speed dolly forward",
    visualCue: "Bravado Banshee GTS speeding past palm trees along Ocean Drive, tires kicking up water mist",
    voiceoverLine: "Rockstar just hid something inside the latest Vice City preview that 99% of fans missed...",
    durationSeconds: 3,
    aiPrompt: "Cinematic drone tracking shot behind high-performance sports car on neon coastal boulevard, wet asphalt reflections, volumetric twilight fog, 4k 60fps",
  },
  {
    id: "shot-02",
    shotNumber: 2,
    cameraMovement: "Snap zoom to side mirror reflection",
    visualCue: "Lucia adjusts side mirror, revealing flashing VCPD cruiser sirens 200 meters back",
    voiceoverLine: "Because if you zoom into Lucia's rearview mirror at 24 seconds...",
    durationSeconds: 4,
    aiPrompt: "Extreme close-up of side view car mirror showing flashing red and blue police sirens through raindrops, atmospheric cinematic lighting",
  },
  {
    id: "shot-03",
    shotNumber: 3,
    cameraMovement: "Top-down satellite pull-out to GIS map",
    visualCue: "Seamless transition from Ocean Drive pavement to satellite overhead map of Leonida",
    voiceoverLine: "You realize this pursuit is happening in an area that isn't even on the official tourist brochure.",
    durationSeconds: 5,
    aiPrompt: "Seamless continuous camera pull-back from sports car street level up through clouds into tactical military satellite map view of southern Florida coastline",
  },
];

export const VideoLab: React.FC = () => {
  const [shots, setShots] = useState<StoryboardShot[]>(INITIAL_SHOTS);
  const [selectedShot, setSelectedShot] = useState<StoryboardShot>(INITIAL_SHOTS[0]);
  const [copiedShotId, setCopiedShotId] = useState<string | null>(null);

  const totalDuration = shots.reduce((acc, s) => acc + s.durationSeconds, 0);

  const handleCopyPrompt = (shot: StoryboardShot) => {
    navigator.clipboard.writeText(shot.aiPrompt);
    setCopiedShotId(shot.id);
    setTimeout(() => setCopiedShotId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Video className="w-6 h-6 text-[#00FF66]" />
            <span>Video Lab & Storyboard Director</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Script-to-storyboard planning, camera cut pacing, and Veo / Sora AI video prompt generation.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Total Cut Duration:</span>
          <span className="text-[#00FF66] font-bold tabular-nums">{totalDuration} Seconds</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Storyboard Timeline Reel (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-white">Shot Sequence Timeline ({shots.length} Shots)</div>

          <div className="space-y-3">
            {shots.map((shot) => {
              const isSelected = selectedShot.id === shot.id;
              return (
                <div
                  key={shot.id}
                  onClick={() => setSelectedShot(shot)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-[#0E1017] border-[#00FF66]/50 shadow-[0_0_15px_rgba(0,255,102,0.1)]"
                      : "bg-[#0E1017]/70 border-white/[0.08] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#00FF66] font-bold">
                      SHOT #{shot.shotNumber.toString().padStart(2, "0")} · {shot.cameraMovement}
                    </span>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {shot.durationSeconds}s
                    </span>
                  </div>

                  <div className="text-xs text-white font-medium">{shot.visualCue}</div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300">
                    <span className="text-slate-400">VO: </span>
                    <span className="italic">"{shot.voiceoverLine}"</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Shot AI Prompt & Camera Direction (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Shot #{selectedShot.shotNumber} Camera Parameters
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Veo 3.1 Compatible</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Camera Movement:</span>
                <span className="text-white font-medium">{selectedShot.cameraMovement}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Pacing:</span>
                <span className="text-white font-mono">{selectedShot.durationSeconds} Seconds</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>AI Video Generation Prompt</span>
                <button
                  onClick={() => handleCopyPrompt(selectedShot)}
                  className="text-[#00FF66] hover:underline flex items-center gap-1"
                >
                  {copiedShotId === selectedShot.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-200 leading-relaxed">
                {selectedShot.aiPrompt}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 text-[11px] text-[#00FF66] space-y-1">
              <div className="font-bold">Director's Note:</div>
              <div>
                Ensure visual match with previous shot on road surface wetness. Transition cut should hit on the word "rearview mirror".
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
