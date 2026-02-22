"use client";

import { useState } from "react";
import { ChevronDown, FlaskConical } from "lucide-react";

const SUBSCORES = [
  {
    name: "Historique (M_hist)",
    weight: "25%",
    desc: "Proximité de décharges et industries historiques, anciens sites portuaires.",
  },
  {
    name: "Morphologie (M_morpho)",
    weight: "25%",
    desc: "Type de côte favorable à l'accumulation : plages rocheuses, criques abritées, caps.",
  },
  {
    name: "Fluvial (M_river)",
    weight: "20%",
    desc: "Proximité d'une embouchure de rivière et population en amont (apport de verre).",
  },
  {
    name: "Océanique (M_ocean)",
    weight: "15%",
    desc: "Exposition aux courants dominants et vagues favorisant le dépôt côtier.",
  },
  {
    name: "Population (M_pop)",
    weight: "15%",
    desc: "Densité de population historique côtière (source de verre rejeté).",
  },
];

export function MethodologyPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors duration-150 hover:bg-ocean-600/30"
      >
        <div className="flex items-center gap-2">
          <FlaskConical className="h-3.5 w-3.5 text-text-tertiary" />
          <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Méthodologie
          </h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-text-tertiary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
          {/* Formula */}
          <div className="rounded-md border border-glass-deep/10 bg-ocean-900/60 p-3">
            <p className="font-[family-name:var(--font-display)] text-[11px] leading-relaxed text-glass">
              Score = 0.25 × hist + 0.25 × morpho + 0.20 × river + 0.15 ×
              ocean + 0.15 × pop
            </p>
          </div>

          {/* Sub-scores descriptions */}
          <div className="mt-3 space-y-3">
            {SUBSCORES.map((sub) => (
              <div key={sub.name}>
                <div className="flex items-center gap-1.5">
                  <span className="font-[family-name:var(--font-display)] text-[11px] font-medium text-text-primary">
                    {sub.name}
                  </span>
                  <span className="rounded-full bg-glass-deep/10 px-1.5 py-px font-[family-name:var(--font-display)] text-[9px] font-medium tabular-nums text-glass-deep">
                    {sub.weight}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-text-tertiary">
                  {sub.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sources */}
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <p className="text-[10px] uppercase tracking-wider text-text-tertiary">
              Sources de données
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-text-tertiary">
              Estimations basées sur des données océanographiques (OSCAR),
              géomorphologiques (Sentinel-2), hydrologiques (HydroSHEDS),
              historiques (OSM) et légales (WDPA, DNP Thailand).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
