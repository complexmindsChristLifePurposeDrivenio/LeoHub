import React, { useState } from "react";
import { Terminal, Copy, Check, Key, Code, Webhook, Shield, Sparkles } from "lucide-react";

export const DeveloperPortal: React.FC = () => {
  const [activeLang, setActiveLang] = useState<"typescript" | "curl" | "python">("typescript");
  const [apiKey, setApiKey] = useState("lch_live_948f2e1a87b64099cd3");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    typescript: `import { LeonidaClient } from "@cmplay/leonida-sdk";

const client = new LeonidaClient({
  apiKey: process.env.LEONIDA_API_KEY,
});

// Execute RAG Fact Verification
const verification = await client.intel.verifyClaim({
  claim: "GTA VI target release date confirmed for November 19, 2026",
  confidenceFloor: "verified",
});

console.log(verification.verdict); // "OFFICIAL"
console.log(verification.citations);`,
    curl: `curl -X POST https://api.cmplay.network/v1/intel/verify \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "claim": "Volumetric storm physics hydroplaning parameters",
    "mode": "research"
  }'`,
    python: `from leonida import LeonidaClient

client = LeonidaClient(api_key="${apiKey}")

# ClipForge AI Moment Extractor
moments = client.clipforge.detect_moments(
    stream_url="https://youtube.com/watch?v=ocean_drive_pursuit",
    hook_threshold=85
)

for clip in moments.candidates:
    print(f"Hook: {clip.hook_score}/100 | {clip.start_time} - {clip.end_time}")`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#00FF66]" />
            <span>Developer Portal & SDK Spec</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Programmatic access to Leonida RAG knowledge, ClipForge transcoder, and Stable Diffusion 3.5 APIs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <Key className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>API Rate Limit: 10,000 req / min</span>
        </div>
      </div>

      {/* API Key Management */}
      <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-white">Your Leonida Production API Key</div>
          <div className="text-[11px] text-slate-400">Scoped for RAG queries, moment detection, and image generation.</div>
        </div>
        <div className="flex items-center gap-2">
          <code className="px-3 py-1.5 rounded bg-black/60 border border-white/[0.1] font-mono text-xs text-[#00FF66]">
            {apiKey}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200"
          >
            Copy Key
          </button>
        </div>
      </div>

      {/* Code Examples & SDK */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/[0.06]">
            <button
              onClick={() => setActiveLang("typescript")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeLang === "typescript"
                  ? "bg-[#00FF66] text-black font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setActiveLang("curl")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeLang === "curl"
                  ? "bg-[#00FF66] text-black font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              cURL
            </button>
            <button
              onClick={() => setActiveLang("python")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeLang === "python"
                  ? "bg-[#00FF66] text-black font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Python
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                <span className="text-[#00FF66]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-black/80 border border-white/[0.06] overflow-x-auto">
          <pre className="font-mono text-xs text-emerald-300 leading-relaxed">
            {codeSnippets[activeLang]}
          </pre>
        </div>
      </div>
    </div>
  );
};
