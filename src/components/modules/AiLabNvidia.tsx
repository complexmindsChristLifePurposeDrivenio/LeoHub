import React, { useState } from "react";
import { Server, Cpu, Activity, Zap, CheckCircle2, Sliders, RefreshCw, BarChart } from "lucide-react";

interface ModelEndpoint {
  id: string;
  name: string;
  provider: "Gemini" | "NVIDIA NIM" | "Ollama" | "HuggingFace";
  status: "online" | "standby" | "busy";
  latencyMs: number;
  costPer1kTokens: string;
  contextWindow: string;
  activeJobs: number;
}

const ENDPOINTS: ModelEndpoint[] = [
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash (Primary RAG)",
    provider: "Gemini",
    status: "online",
    latencyMs: 142,
    costPer1kTokens: "$0.00015",
    contextWindow: "1M Tokens",
    activeJobs: 3,
  },
  {
    id: "nvidia-nim-llama3",
    name: "NVIDIA NIM Llama-3-70B-Instruct",
    provider: "NVIDIA NIM",
    status: "online",
    latencyMs: 98,
    costPer1kTokens: "$0.00080",
    contextWindow: "128K Tokens",
    activeJobs: 1,
  },
  {
    id: "sd-3.5-large-diffusers",
    name: "Stable Diffusion 3.5 Large (Diffusers)",
    provider: "NVIDIA NIM",
    status: "online",
    latencyMs: 1450,
    costPer1kTokens: "$0.012 / img",
    contextWindow: "8K Tokens (CLIP+T5)",
    activeJobs: 2,
  },
  {
    id: "ollama-local-qwen",
    name: "Ollama Local Fallback (Qwen 2.5)",
    provider: "Ollama",
    status: "standby",
    latencyMs: 420,
    costPer1kTokens: "$0.00 (Local VRAM)",
    contextWindow: "32K Tokens",
    activeJobs: 0,
  },
];

export const AiLabNvidia: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ModelEndpoint[]>(ENDPOINTS);
  const [selectedRouter, setSelectedRouter] = useState("auto");
  const [vramUsage, setVramUsage] = useState(8.4); // out of 24 GB
  const [gpuTemp, setGpuTemp] = useState(62); // Celsius

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Server className="w-6 h-6 text-[#00FF66]" />
            <span>AI Lab & NVIDIA Infrastructure Stack</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            GPU-accelerated model routing, latency monitoring, NVIDIA NIM inference, and VRAM budget controls.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-white">NVIDIA RTX 4090 / H100 Cluster</span>
        </div>
      </div>

      {/* GPU Telemetry Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>VRAM Utilization</span>
            <Cpu className="w-3.5 h-3.5 text-[#00FF66]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {vramUsage} / 24 GB
          </div>
          <div className="text-[11px] text-slate-400">35% allocated to SD 3.5 & RAG</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>GPU Core Temp</span>
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">{gpuTemp}°C</div>
          <div className="text-[11px] text-emerald-400">Cooling normal (fan 42%)</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg Inference Latency</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">114 ms</div>
          <div className="text-[11px] text-slate-400">P95 below 220ms</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Token Efficiency</span>
            <BarChart className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">84.2%</div>
          <div className="text-[11px] text-slate-400">Cached prompt tokens</div>
        </div>
      </div>

      {/* Model Router Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-white">
          <span>Connected Model Endpoints ({endpoints.length})</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Routing Policy:</span>
            <select
              value={selectedRouter}
              onChange={(e) => setSelectedRouter(e.target.value)}
              className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.08] text-xs text-white"
            >
              <option value="auto">Auto (Lowest Latency)</option>
              <option value="quality">Quality First (Gemini Pro/NIM)</option>
              <option value="cost">Cost Optimized (Flash / Local)</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0E1017] overflow-hidden divide-y divide-white/[0.06]">
          {endpoints.map((ep) => (
            <div key={ep.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{ep.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">
                    {ep.provider}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 font-mono text-[11px]">
                  <span>Context: {ep.contextWindow}</span>
                  <span>·</span>
                  <span>Rate: {ep.costPer1kTokens}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <div className="text-slate-200 font-bold">{ep.latencyMs}ms</div>
                  <div className="text-[10px] text-slate-400">{ep.activeJobs} jobs in queue</div>
                </div>

                <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                  {ep.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
