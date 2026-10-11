import React, { useState } from "react";
import { INITIAL_SOURCES } from "../../data/mockData";
import { IntelligenceSource, ConfidenceClass } from "../../types";
import { analyzeClaim } from "../../services/apiClient";
import {
  FileCheck,
  Shield,
  Search,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
} from "lucide-react";

export const LeonidaIntelligence: React.FC = () => {
  const [sources, setSources] = useState<IntelligenceSource[]>(INITIAL_SOURCES);
  const [claimInput, setClaimInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [claimResult, setClaimResult] = useState<string | null>(null);
  const [filterConfidence, setFilterConfidence] = useState<string>("all");

  const handleVerifyClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setClaimResult(null);

    try {
      const res = await analyzeClaim(claimInput);
      setClaimResult(res.analysis);
    } catch (err) {
      setClaimResult("Verification service unavailable. Please check API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredSources = sources.filter((s) => {
    if (filterConfidence === "all") return true;
    return s.confidence === filterConfidence;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-[#00FF66]" />
            <span>Leonida Intelligence & Verification</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Rockstar claim extraction, citation ledger, contradiction detector, and fact verification engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Sources ({sources.length})</option>
            <option value="official">Official Communications</option>
            <option value="verified">Verified Technical Reports</option>
            <option value="analysis">Mapping & Community Analysis</option>
          </select>
        </div>
      </div>

      {/* Claim Extraction & Verification Sandbox */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Sparkles className="w-4 h-4 text-[#00FF66]" />
          <span>Interactive Claim & Rumor Fact-Checker</span>
          <span className="text-[10px] text-slate-400 font-normal">
            (Evaluates input against verified Rockstar disclosures and patent logs)
          </span>
        </div>

        <form onSubmit={handleVerifyClaim} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              placeholder="e.g. 'Rockstar stated that Vice City will have fully enterable shopping malls and 700+ vehicles at launch'"
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-4 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.2)]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Verify Claim</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span>Quick test claims:</span>
            <button
              type="button"
              onClick={() =>
                setClaimInput(
                  "GTA VI is scheduled for release on November 19, 2026 on PS5 and Xbox Series X|S."
                )
              }
              className="text-[#00FF66] hover:underline"
            >
              [Release Date & Platforms]
            </button>
            <button
              type="button"
              onClick={() =>
                setClaimInput(
                  "Lucia has an ankle monitor in Trailer 1 which prevents her from leaving Vice City initially."
                )
              }
              className="text-[#00FF66] hover:underline"
            >
              [Lucia Ankle Monitor]
            </button>
            <button
              type="button"
              onClick={() =>
                setClaimInput(
                  "The game map is confirmed to be smaller than GTA V Los Santos."
                )
              }
              className="text-amber-400 hover:underline"
            >
              [Map Scale Debunk]
            </button>
          </div>
        </form>

        {claimResult && (
          <div className="p-4 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-slate-200 whitespace-pre-line leading-relaxed space-y-2">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-slate-400 text-[11px]">
              <span>Intelligence Analysis Output</span>
              <span className="text-[#00FF66]">Gemini 3.8 Verified</span>
            </div>
            <div>{claimResult}</div>
          </div>
        )}
      </div>

      {/* Verified Source Registry Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Source Verification Registry</h2>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {filteredSources.length} Primary Records
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0E1017] overflow-hidden divide-y divide-white/[0.06]">
          {filteredSources.map((source) => (
            <div key={source.id} className="p-4 hover:bg-white/[0.02] transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{source.title}</span>
                  <a
                    href={source.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">{source.publisher}</span>
                  <span>·</span>
                  <span
                    className={`capitalize font-medium ${
                      source.confidence === "official"
                        ? "text-emerald-400"
                        : source.confidence === "verified"
                        ? "text-cyan-400"
                        : "text-amber-400"
                    }`}
                  >
                    {source.confidence}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{source.summary}</p>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-2">
                  <span>Author: {source.author}</span>
                  <span>·</span>
                  <span>Published: {source.publicationDate}</span>
                  <span>·</span>
                  <span>Verified: {source.retrievalDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {source.relatedEntities.map((ent) => (
                    <span
                      key={ent}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 text-[10px]"
                    >
                      {ent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
