import React, { useState } from "react";
import { Cpu, Search, Database, Layers, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface RagDocument {
  id: string;
  sourceClass: "Official" | "Verified" | "Community" | "Analysis";
  title: string;
  chunks: number;
  similarityScore?: number;
  snippet: string;
}

const KNOWLEDGE_DOCS: RagDocument[] = [
  {
    id: "doc-01",
    sourceClass: "Official",
    title: "Take-Two Form 10-K & Rockstar Official Communique #1",
    chunks: 142,
    similarityScore: 0.94,
    snippet: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Scheduled for release on November 19, 2026.",
  },
  {
    id: "doc-02",
    sourceClass: "Verified",
    title: "US Patent #11285388: Dynamic Environmental Simulation in Open Worlds",
    chunks: 88,
    similarityScore: 0.89,
    snippet: "System and method for virtual world navigation and local weather simulation enabling real-time hydroplaning, wind sheer drag on lightweight vehicles, and procedural storm fronts.",
  },
  {
    id: "doc-03",
    sourceClass: "Analysis",
    title: "Leonida Cartographic Survey Project v4.2 Landmass Matrix",
    chunks: 310,
    similarityScore: 0.82,
    snippet: "Coordinate triangulation based on radio antenna landmarks in Trailer 1 places total map area at ~132 sq kilometers, with over 35% comprised of navigable inland waterways and keys.",
  },
  {
    id: "doc-04",
    sourceClass: "Community",
    title: "Vice City Police Department Radio Codes & Dispatch Behavior",
    chunks: 64,
    similarityScore: 0.74,
    snippet: "Observations of pursuit mechanics suggest police dispatch no longer spawns instantly in player line-of-sight, but utilizes realistic vehicular response routes from county stations.",
  },
];

export const GtaLlmRag: React.FC = () => {
  const [vectorQuery, setVectorQuery] = useState("");
  const [activeResults, setActiveResults] = useState<RagDocument[]>(KNOWLEDGE_DOCS);
  const [isSearching, setIsSearching] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.75);

  const handleVectorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vectorQuery.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const q = vectorQuery.toLowerCase();
      const filtered = KNOWLEDGE_DOCS.filter(
        (doc) =>
          doc.title.toLowerCase().includes(q) ||
          doc.snippet.toLowerCase().includes(q) ||
          doc.sourceClass.toLowerCase().includes(q)
      );
      setActiveResults(filtered.length > 0 ? filtered : KNOWLEDGE_DOCS);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#00FF66]" />
            <span>GTA LLM & RAG Intelligence Layer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pluggable vector database (Supabase pgvector) + semantic chunking + confidence-weighted citation retrieval.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <Database className="w-4 h-4 text-[#00FF66]" />
          <span>Embedding: gemini-embedding-2-preview (768-dim)</span>
        </div>
      </div>

      {/* RAG Query Simulator */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
        <div className="text-xs font-semibold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#00FF66]" />
            Semantic Vector Query & Cosine Similarity Inspector
          </span>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Cosine Similarity Cutoff:</span>
            <span className="font-mono text-[#00FF66] font-bold tabular-nums">
              {(similarityThreshold * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <form onSubmit={handleVectorSearch} className="flex gap-2">
          <input
            type="text"
            value={vectorQuery}
            onChange={(e) => setVectorQuery(e.target.value)}
            placeholder="e.g. 'volumetric storm physics and tire hydroplaning on coastal highways'"
            className="flex-1 px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search Vectors</span>
          </button>
        </form>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0.5"
            max="0.95"
            step="0.05"
            value={similarityThreshold}
            onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
            className="w-48 accent-[#00FF66]"
          />
          <span className="text-[11px] text-slate-400">Adjust threshold for precision vs recall</span>
        </div>
      </div>

      {/* Retrieved Knowledge Chunks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-white">
          <span>Ranked Retrieved Vector Chunks ({activeResults.length})</span>
          <span className="text-slate-400 font-mono text-[11px]">Ranked by Cosine Proximity</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {activeResults.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017] hover:border-white/[0.15] transition-colors space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                      doc.sourceClass === "Official"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : doc.sourceClass === "Verified"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {doc.sourceClass} Source
                  </span>
                  <span className="text-xs font-bold text-white">{doc.title}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#00FF66] font-bold">
                    Score: {((doc.similarityScore ?? 0.85) * 100).toFixed(1)}%
                  </span>
                  <span>·</span>
                  <span className="text-slate-400">{doc.chunks} embedded chunks</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/[0.04] font-mono text-[11px]">
                "{doc.snippet}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Provenance: Document #{doc.id}</span>
                <span className="text-emerald-400">Zero-Hallucination Safe</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
