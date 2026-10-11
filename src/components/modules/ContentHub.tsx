import React, { useState } from "react";
import { INITIAL_CONTENT_ITEMS } from "../../data/mockData";
import { ContentItem } from "../../types";
import { FolderKanban, Search, Filter, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const ContentHub: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>(INITIAL_CONTENT_ITEMS);
  const [filterFormat, setFilterFormat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesFormat = filterFormat === "all" || item.format === filterFormat;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-[#00FF66]" />
            <span>Content Hub & Canonical Inventory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of scripts, shorts, deep dives, prompts, and published media across CMPlay.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content assets..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none w-48 sm:w-56"
            />
          </div>

          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Formats ({items.length})</option>
            <option value="Shorts">Shorts (9:16)</option>
            <option value="News Update">News Updates</option>
            <option value="Deep Dive">Deep Dives</option>
            <option value="Podcast Segment">Podcast Segments</option>
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E1017] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/[0.06] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 font-semibold">Title & Hook</th>
                <th className="p-3.5 font-semibold">Format</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Publish Date</th>
                <th className="p-3.5 font-semibold text-right">Performance</th>
                <th className="p-3.5 font-semibold text-right">Attributed Rev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 max-w-xs sm:max-w-md">
                    <div className="font-semibold text-white truncate">{item.title}</div>
                    <div className="text-[11px] text-slate-400 italic truncate mt-0.5">
                      "{item.hook}"
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300 font-mono text-[11px]">{item.format}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium capitalize ${
                        item.workflowStatus === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.workflowStatus === "approved"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : "bg-white/[0.05] text-slate-300 border border-white/[0.08]"
                      }`}
                    >
                      {item.workflowStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                    {item.publishDate || "Queued"}
                  </td>
                  <td className="p-3.5 text-right font-mono text-[11px] text-slate-200 tabular-nums">
                    {item.views ? `${item.views.toLocaleString()} views` : "—"}
                  </td>
                  <td className="p-3.5 text-right font-mono text-[11px] text-[#00FF66] font-bold tabular-nums">
                    {item.revenue ? `$${item.revenue.toFixed(2)}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
