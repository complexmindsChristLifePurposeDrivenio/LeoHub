import React, { useState } from "react";
import { GtaViEntity, ConfidenceClass } from "../../types";
import { INITIAL_ENTITIES } from "../../data/mockData";
import { ASSETS } from "../../assets/assetPaths";
import {
  MapPin,
  Shield,
  Layers,
  Car,
  Crosshair,
  User,
  Compass,
  Info,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Search,
} from "lucide-react";

export const OverdriveVI: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedConfidence, setSelectedConfidence] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<GtaViEntity | null>(
    INITIAL_ENTITIES[0]
  );
  const [activePin, setActivePin] = useState<string | null>("dist-ocean-beach");

  const categories = [
    { id: "all", label: "All Entities" },
    { id: "district", label: "Districts & Map" },
    { id: "character", label: "Characters" },
    { id: "vehicle", label: "Vehicles" },
    { id: "weapon", label: "Weapons" },
  ];

  const filteredEntities = INITIAL_ENTITIES.filter((entity) => {
    const matchesCat =
      selectedCategory === "all" || entity.category === selectedCategory;
    const matchesConf =
      selectedConfidence === "all" || entity.confidence === selectedConfidence;
    const matchesSearch =
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesConf && matchesSearch;
  });

  const getConfidenceBadge = (confidence: ConfidenceClass) => {
    switch (confidence) {
      case "official":
        return (
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Official
          </span>
        );
      case "verified":
        return (
          <span className="text-cyan-400 font-medium inline-flex items-center gap-1">
            <Shield className="w-3 h-3" /> Verified
          </span>
        );
      case "reported":
        return (
          <span className="text-amber-400 font-medium inline-flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Reported
          </span>
        );
      default:
        return (
          <span className="text-slate-400 font-medium inline-flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Community Theory
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span>OVERDRIVE VI</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 font-mono">
              World Database 2026
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive GIS cartography, characters, district dossiers, and vehicle telemetry.
          </p>
        </div>

        {/* Search & Confidence Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter database..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/40 w-44 sm:w-56"
            />
          </div>

          <select
            value={selectedConfidence}
            onChange={(e) => setSelectedConfidence(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Confidence Tiers</option>
            <option value="official">Official (Rockstar)</option>
            <option value="verified">Verified Research</option>
            <option value="reported">Reported</option>
            <option value="theory">Community Theory</option>
          </select>
        </div>
      </div>

      {/* Category Tabs (Interactive Segmented Control) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-white/[0.06]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-white/[0.1] text-white border border-white/[0.12]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map + Entity Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Tactical Map GIS (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Compass className="w-4 h-4 text-[#00FF66]" />
              Leonida Satellite Reconnaissance Layer
            </span>
            <span className="font-mono text-[11px] text-slate-400">Coords: 25.7617° N, 80.1918° W</span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#0E1017] group aspect-video">
            <img
              src={ASSETS.leonidaMap}
              alt="Leonida Satellite Map"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Location Hotspots */}
            <button
              onClick={() => {
                setActivePin("dist-ocean-beach");
                setSelectedEntity(INITIAL_ENTITIES[0]);
              }}
              style={{ top: "45%", left: "76%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#00FF66]/20 hover:bg-[#00FF66] border border-[#00FF66] transition-transform hover:scale-125 focus:outline-none group/pin cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                Ocean Beach
              </div>
            </button>

            <button
              onClick={() => {
                setActivePin("dist-ambrosia-wetlands");
                setSelectedEntity(INITIAL_ENTITIES[1]);
              }}
              style={{ top: "60%", left: "28%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-cyan-400/20 hover:bg-cyan-400 border border-cyan-400 transition-transform hover:scale-125 focus:outline-none group/pin cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                Ambrosia Wetlands
              </div>
            </button>

            <button
              onClick={() => {
                setActivePin("dist-port-gellhorn");
                setSelectedEntity(INITIAL_ENTITIES[2]);
              }}
              style={{ top: "82%", left: "42%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400 border border-amber-400 transition-transform hover:scale-125 focus:outline-none group/pin cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                Port Gellhorn
              </div>
            </button>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08]">
              <span>Active Sector: {selectedEntity?.location || "State of Leonida"}</span>
              <span className="text-[#00FF66]">GIS Overlay Active</span>
            </div>
          </div>

          {/* Quick Filter Cards */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setSelectedCategory("district");
                setSelectedEntity(INITIAL_ENTITIES[0]);
              }}
              className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors"
            >
              <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00FF66]" />
                3 Major Districts
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Vice City, Keys, Wetlands</div>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("character");
                setSelectedEntity(INITIAL_ENTITIES[3]);
              }}
              className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors"
            >
              <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                2 Protagonists
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Lucia & Jason Dossiers</div>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("vehicle");
                setSelectedEntity(INITIAL_ENTITIES[5]);
              }}
              className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-colors"
            >
              <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                Vehicle Roster
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Bravado Banshee GTS</div>
            </button>
          </div>
        </div>

        {/* Selected Entity Dossier Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedEntity ? (
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="capitalize">{selectedEntity.category}</span>
                    <span>·</span>
                    <span>{getConfidenceBadge(selectedEntity.confidence)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedEntity.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedEntity.description}
              </p>

              {/* Entity Key Specifications */}
              <div className="rounded-lg bg-black/40 border border-white/[0.06] p-3 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Tactical Specifications
                </div>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(selectedEntity.details).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-medium text-white text-right max-w-xs">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedEntity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.06]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 rounded-xl border border-white/[0.08] bg-[#0E1017]">
              Select a location, character, or vehicle to inspect dossier.
            </div>
          )}

          {/* List of matching entities */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Database Entries ({filteredEntities.length})
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredEntities.map((ent) => (
                <button
                  key={ent.id}
                  onClick={() => setSelectedEntity(ent)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between cursor-pointer ${
                    selectedEntity?.id === ent.id
                      ? "bg-[#00FF66]/10 border-[#00FF66]/40 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]"
                  }`}
                >
                  <div>
                    <div className="text-xs font-medium">{ent.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      {ent.category} · {ent.location || "Leonida"}
                    </div>
                  </div>
                  <div>{getConfidenceBadge(ent.confidence)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
