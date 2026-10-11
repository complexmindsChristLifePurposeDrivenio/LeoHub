import React, { useState } from "react";
import { DOJO_TRACKS } from "../../data/mockData";
import { DojoTrack } from "../../types";
import { ASSETS } from "../../assets/assetPaths";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  Sparkles,
  BookOpen,
  ShieldAlert,
  Flame,
} from "lucide-react";

export const GtaDojo: React.FC = () => {
  const [tracks, setTracks] = useState<DojoTrack[]>(DOJO_TRACKS);
  const [selectedTrack, setSelectedTrack] = useState<DojoTrack>(DOJO_TRACKS[0]);
  const [currentBelt, setCurrentBelt] = useState("Green Belt");
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  const BELTS = [
    { name: "White Belt", color: "bg-slate-200 text-black", req: "0 Tracks" },
    { name: "Yellow Belt", color: "bg-yellow-400 text-black", req: "1 Track" },
    { name: "Orange Belt", color: "bg-orange-500 text-white", req: "2 Tracks" },
    { name: "Green Belt", color: "bg-emerald-500 text-black font-bold", req: "3 Tracks" },
    { name: "Blue Belt", color: "bg-blue-500 text-white", req: "5 Tracks" },
    { name: "Purple Belt", color: "bg-purple-500 text-white", req: "7 Tracks" },
    { name: "Brown Belt", color: "bg-amber-800 text-white", req: "9 Tracks" },
    { name: "Black Belt", color: "bg-black text-[#00FF66] border border-[#00FF66]", req: "All 12 Tracks" },
  ];

  const SAMPLE_QUIZ = [
    {
      q: "Under CMPlay's rights policy, what is the mandatory requirement when clipping third-party GTA gameplay?",
      options: [
        "Upload raw clips with zero commentary or transformation",
        "Add meaningful original analysis, critical context, or creative re-editing",
        "Delete the original creator's watermark",
        "Wait 30 days before posting to TikTok",
      ],
      correct: 1,
    },
    {
      q: "What is the optimal window to hook 9:16 mobile viewers on TikTok and YouTube Shorts?",
      options: ["10 to 15 seconds", "3 to 4 seconds", "30 seconds", "Only after the title card"],
      correct: 1,
    },
  ];

  const handleAnswerQuiz = (optionIndex: number) => {
    setSelectedQuizOption(optionIndex);
    const isCorrect = optionIndex === SAMPLE_QUIZ[activeQuizQuestion ?? 0].correct;
    setQuizScore(isCorrect ? 100 : 0);
  };

  const handleToggleModule = (trackId: string, moduleId: string) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id !== trackId) return t;
        const updatedMods = t.modules.map((m) =>
          m.id === moduleId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMods.filter((m) => m.completed).length;
        const rate = Math.round((completedCount / (updatedMods.length || 1)) * 100);
        return { ...t, modules: updatedMods, completionRate: rate };
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#FFD700]" />
            <span>GTA Dojo Academy</span>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 font-mono">
              Belt Progression
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            12 specialized tracks spanning gameplay mastery, ClipForge editing, lore verification, and creator monetization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Current Standing</div>
            <div className="text-xs font-bold text-[#00FF66]">{currentBelt}</div>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <img
              src={ASSETS.dojoMastery}
              alt="Dojo Crest"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Belt Hierarchy Bar */}
      <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Martial Belt Ladder</span>
          <span className="text-[11px] text-slate-400">Target: Black Belt Certification</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {BELTS.map((b) => {
            const isCurrent = b.name === currentBelt;
            return (
              <div
                key={b.name}
                onClick={() => setCurrentBelt(b.name)}
                className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                  isCurrent
                    ? "ring-2 ring-[#00FF66] scale-105 shadow-[0_0_12px_rgba(0,255,102,0.2)]"
                    : "opacity-75 hover:opacity-100"
                } bg-white/[0.04] border border-white/[0.06]`}
              >
                <div className={`text-[10px] py-0.5 px-1.5 rounded mb-1 font-bold ${b.color}`}>
                  {b.name}
                </div>
                <div className="text-[9px] text-slate-400">{b.req}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Track Curriculum & Lesson Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 12 Tracks List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-300">
            Dojo Tracks ({tracks.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {tracks.map((track) => {
              const isSelected = selectedTrack.id === track.id;
              const isLocked = track.status === "locked";
              return (
                <div
                  key={track.id}
                  onClick={() => !isLocked && setSelectedTrack(track)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isLocked
                      ? "opacity-50 bg-white/[0.01] border-white/[0.04] cursor-not-allowed"
                      : isSelected
                      ? "bg-[#0E1017] border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                      : "bg-[#0E1017]/70 border-white/[0.08] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{track.name}</span>
                      {isLocked && <Lock className="w-3 h-3 text-slate-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {track.beltRequirement}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {track.tagline}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{track.modules.length} Modules</span>
                    <span className="font-mono text-emerald-400 tabular-nums">
                      {track.completionRate}% Complete
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-[#00FF66] transition-all duration-300"
                      style={{ width: `${track.completionRate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Track Lesson Syllabus & Quiz (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-yellow-400 font-mono">
                  {selectedTrack.beltRequirement} Track
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedTrack.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedTrack.tagline}</p>
              </div>

              <button
                onClick={() => setActiveQuizQuestion(0)}
                className="px-3 py-1.5 rounded-lg bg-[#FFD700] text-black font-bold text-xs hover:bg-[#FFD700]/90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(255,215,0,0.2)]"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Test Certification</span>
              </button>
            </div>

            {/* Modules List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Course Modules
              </div>
              <div className="space-y-2">
                {selectedTrack.modules.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleModule(selectedTrack.id, m.id)}
                        className={`p-1 rounded transition-colors ${
                          m.completed
                            ? "text-[#00FF66]"
                            : "text-slate-500 hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <div>
                        <div
                          className={`text-xs font-medium ${
                            m.completed ? "line-through text-slate-400" : "text-white"
                          }`}
                        >
                          {m.title}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize">
                          {m.type} lesson · {m.duration}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleModule(selectedTrack.id, m.id)}
                      className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
                    >
                      {m.completed ? "Revisit" : "Start"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Certification Quiz Modal / Drawer */}
            {activeQuizQuestion !== null && (
              <div className="p-4 rounded-xl border border-yellow-400/30 bg-black/80 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs text-yellow-400 font-semibold">
                  <span>Certification Knowledge Check #{activeQuizQuestion + 1}</span>
                  <button
                    onClick={() => {
                      setActiveQuizQuestion(null);
                      setQuizScore(null);
                      setSelectedQuizOption(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="text-xs text-white font-medium">
                  {SAMPLE_QUIZ[activeQuizQuestion].q}
                </div>

                <div className="space-y-1.5">
                  {SAMPLE_QUIZ[activeQuizQuestion].options.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerQuiz(idx)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors border ${
                        selectedQuizOption === idx
                          ? idx === SAMPLE_QUIZ[activeQuizQuestion].correct
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold"
                            : "bg-red-500/20 border-red-500 text-red-300"
                          : "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizScore !== null && (
                  <div className="text-xs text-center pt-2">
                    {quizScore === 100 ? (
                      <span className="text-[#00FF66] font-bold">
                        Correct! +50 Dojo Points added to {currentBelt} progress.
                      </span>
                    ) : (
                      <span className="text-amber-400">
                        Incorrect. Review Module #2 on Fair Use & Transformation.
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
