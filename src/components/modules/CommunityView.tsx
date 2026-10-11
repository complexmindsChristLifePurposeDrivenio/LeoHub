import React, { useState } from "react";
import { INITIAL_COMMUNITY_THREADS } from "../../data/mockData";
import { CommunityThread } from "../../types";
import { Users, ThumbsUp, MessageSquare, Plus, Award, Shield, Sparkles } from "lucide-react";

export const CommunityView: React.FC = () => {
  const [threads, setThreads] = useState<CommunityThread[]>(INITIAL_COMMUNITY_THREADS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<CommunityThread["category"]>("Theory");

  const categories = [
    { id: "all", label: "All Discussions" },
    { id: "Theory", label: "Lore & Theories" },
    { id: "Map Discovery", label: "Map Discoveries" },
    { id: "Clip Contest", label: "Clip Contests" },
  ];

  const handleUpvote = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: CommunityThread = {
      id: `th-${Date.now()}`,
      author: "You (CMPlay Creator)",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=YouCreator",
      title: newTitle,
      content: newContent,
      category: newCategory,
      upvotes: 1,
      commentsCount: 0,
      timestamp: "Just now",
    };

    setThreads([newThread, ...threads]);
    setNewTitle("");
    setNewContent("");
    setShowNewThreadModal(false);
  };

  const filteredThreads = threads.filter((t) => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00FF66]" />
            <span>Leonida Creator Community</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect with fellow GTA creators, compete in weekly Dojo clip challenges, and share map discoveries.
          </p>
        </div>

        <button
          onClick={() => setShowNewThreadModal(!showNewThreadModal)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.2)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post Discussion</span>
        </button>
      </div>

      {/* New Post Form Modal */}
      {showNewThreadModal && (
        <form
          onSubmit={handleCreateThread}
          className="p-5 rounded-xl border border-white/[0.12] bg-[#0E1017] space-y-3 animate-in fade-in duration-150"
        >
          <div className="text-xs font-semibold text-white">Create Community Post</div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Thread Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. 'Has anyone tested the ocean barrier buoy boundaries in the mapping survey?'"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-slate-200 focus:outline-none"
              >
                <option value="Theory">Theory & Lore</option>
                <option value="Map Discovery">Map Discovery</option>
                <option value="Clip Contest">Clip Contest Entry</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Post Content</label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share evidence, coordinates, or prompt tips..."
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowNewThreadModal(false)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-xs text-slate-300 hover:bg-white/[0.1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90"
            >
              Publish Thread
            </button>
          </div>
        </form>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? "bg-white/[0.1] text-white border border-white/[0.12]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-3">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3 hover:border-white/[0.15] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={thread.avatar}
                  alt={thread.author}
                  className="w-6 h-6 rounded-full bg-white/[0.05]"
                />
                <span className="text-xs font-semibold text-white">{thread.author}</span>
                {thread.hasOfficialBadge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 font-bold">
                    Official Cartographer
                  </span>
                )}
                <span className="text-[11px] text-slate-500">· {thread.timestamp}</span>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono">
                {thread.category}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">{thread.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{thread.content}</p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-t border-white/[0.04]">
              <button
                onClick={() => handleUpvote(thread.id)}
                className="flex items-center gap-1.5 hover:text-[#00FF66] transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="font-mono tabular-nums">{thread.upvotes} Upvotes</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="font-mono tabular-nums">{thread.commentsCount} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
