import React, { useState } from "react";
import { INITIAL_MARKETPLACE_ITEMS } from "../../data/mockData";
import { MarketplaceItem } from "../../types";
import { ShoppingBag, Star, Sparkles, Download, Check, ShieldCheck } from "lucide-react";

export const MarketplaceView: React.FC = () => {
  const [items] = useState<MarketplaceItem[]>(INITIAL_MARKETPLACE_ITEMS);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [filterCat, setFilterCat] = useState("all");

  const handlePurchase = (id: string) => {
    if (!purchasedIds.includes(id)) {
      setPurchasedIds([...purchasedIds, id]);
    }
  };

  const filteredItems = items.filter(
    (item) => filterCat === "all" || item.category === filterCat
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#00FF66]" />
            <span>Leonida Creator Marketplace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Storefront for original motion HUD overlays, 35mm LUTs, Stable Diffusion prompt packs, and Dojo masterclasses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.08]">
          <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
          <span>Rockstar IP Compliance Verified: Original Creator Works Only</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isPurchased = purchasedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017] space-y-3 hover:border-white/[0.15] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[#00FF66] font-mono border border-white/[0.08]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono font-bold">{item.rating}</span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      ({item.salesCount} sold)
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((t) => (
                    <span key={t} className="text-[10px] text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Price</div>
                  <div className="text-lg font-mono font-extrabold text-[#00FF66] tabular-nums">
                    ${item.price}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(item.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isPurchased
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-[#00FF66] text-black hover:bg-[#00FF66]/90 shadow-[0_0_12px_rgba(0,255,102,0.2)]"
                  }`}
                >
                  {isPurchased ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Unlocked / Download</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Get Asset (${item.price})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
