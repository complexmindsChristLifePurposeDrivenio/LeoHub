import React, { useState } from "react";
import { Newspaper, Sparkles, Plus, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface EditorialStory {
  id: string;
  title: string;
  format: string;
  stage: "research" | "angle" | "hook" | "script" | "review" | "approved" | "published";
  angle: string;
  hook: string;
  assignedCreator: string;
  targetDate: string;
}

const INITIAL_STORIES: EditorialStory[] = [
  {
    id: "story-01",
    title: "Why Lucia's Probation Timeline Restricts Early Map Access",
    format: "news analysis",
    stage: "script",
    angle: "Comparing GTA: San Andreas locked bridge mechanics to 2026 digital GPS probation bounds.",
    hook: "You won't be able to explore all of Vice City on day one, and here's the proof in Trailer 1.",
    assignedCreator: "ViceLoreEditor",
    targetDate: "Oct 12, 2026",
  },
  {
    id: "story-02",
    title: "Leonida Dynamic Storm Engine: Frame Pacing and Volumetrics",
    format: "deep dive",
    stage: "review",
    angle: "Detailed hardware breakdown of cloud simulation and tire friction on wet asphalt.",
    hook: "Rockstar just filed a patent that makes rain in GTA VI completely unpredictable.",
    assignedCreator: "TechAnalyst",
    targetDate: "Oct 14, 2026",
  },
  {
    id: "story-03",
    title: "10 Classic Vice City (2002) Locations Reimagined in GTA VI",
    format: "comparison",
    stage: "hook",
    angle: "Side-by-side archival photographic comparison with 2026 4K screenshots.",
    hook: "The Malibu Club looks completely unrecognizable 24 years later.",
    assignedCreator: "NostalgiaDesk",
    targetDate: "Oct 18, 2026",
  },
];

export const LeonidaNewsroom: React.FC = () => {
  const [stories, setStories] = useState<EditorialStory[]>(INITIAL_STORIES);
  const [showNewStoryForm, setShowNewStoryForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFormat, setNewFormat] = useState("news analysis");
  const [newAngle, setNewAngle] = useState("");
  const [newHook, setNewHook] = useState("");

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStory: EditorialStory = {
      id: `story-${Date.now()}`,
      title: newTitle,
      format: newFormat,
      stage: "research",
      angle: newAngle || "Investigating community reaction and trailer evidence.",
      hook: newHook || "What Rockstar didn't tell you in the latest announcement...",
      assignedCreator: "Staff Editor",
      targetDate: "Oct 2026",
    };

    setStories([newStory, ...stories]);
    setNewTitle("");
    setNewAngle("");
    setNewHook("");
    setShowNewStoryForm(false);
  };

  const handleAdvanceStage = (id: string) => {
    const stages: EditorialStory["stage"][] = [
      "research",
      "angle",
      "hook",
      "script",
      "review",
      "approved",
      "published",
    ];
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const currentIndex = stages.indexOf(s.stage);
        const nextIndex = Math.min(stages.length - 1, currentIndex + 1);
        return { ...s, stage: stages[nextIndex] };
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#00FF66]" />
            <span>Leonida Newsroom & Editorial Pipeline</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Transform raw intelligence into viral news analyses, deep dives, and script briefs.
          </p>
        </div>

        <button
          onClick={() => setShowNewStoryForm(!showNewStoryForm)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.2)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Editorial Story</span>
        </button>
      </div>

      {/* New Story Modal / Drawer */}
      {showNewStoryForm && (
        <form
          onSubmit={handleCreateStory}
          className="p-5 rounded-xl border border-white/[0.12] bg-[#0E1017] space-y-4 animate-in fade-in duration-150"
        >
          <div className="text-xs font-semibold text-white">Create Editorial Story Assignment</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Headline / Story Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 'How Lucia & Jason's Heist Mechanics Surpass GTA V'"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/40"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Editorial Format</label>
              <select
                value={newFormat}
                onChange={(e) => setNewFormat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-slate-200 focus:outline-none"
              >
                <option value="breaking update">Breaking Update</option>
                <option value="news analysis">News Analysis</option>
                <option value="deep dive">Deep Dive</option>
                <option value="comparison">Comparison</option>
                <option value="theory">Theory / Speculation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Editorial Angle</label>
              <input
                type="text"
                value={newAngle}
                onChange={(e) => setNewAngle(e.target.value)}
                placeholder="Unique journalistic thesis or counter-intuitive take"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Opening Retention Hook</label>
              <input
                type="text"
                value={newHook}
                onChange={(e) => setNewHook(e.target.value)}
                placeholder="First 3 seconds verbal punchline"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewStoryForm(false)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-xs text-slate-300 hover:bg-white/[0.1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90"
            >
              Add to Production Pipeline
            </button>
          </div>
        </form>
      )}

      {/* Editorial Stories Pipeline */}
      <div className="grid grid-cols-1 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3 hover:border-white/[0.15] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#00FF66] font-semibold">
                    {story.format}
                  </span>
                  <span>·</span>
                  <span className="text-xs text-slate-400 capitalize">
                    Stage: <strong className="text-white">{story.stage}</strong>
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white">{story.title}</h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => handleAdvanceStage(story.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3 h-3 text-[#00FF66]" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs space-y-1.5">
              <div>
                <span className="text-slate-400 font-medium">Angle: </span>
                <span className="text-slate-200">{story.angle}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Opening Hook: </span>
                <span className="text-[#00FF66] italic">"{story.hook}"</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Assigned Editor: {story.assignedCreator}</span>
              <span>Target: {story.targetDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
