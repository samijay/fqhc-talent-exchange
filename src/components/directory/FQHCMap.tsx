"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue with bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Resilience grade colors (primary) + region colors (fallback)
const GRADE_COLORS: Record<string, string> = {
  A: "#059669", // emerald-600
  B: "#16a34a", // green-600
  C: "#d97706", // amber-600
  D: "#ea580c", // orange-600
  F: "#dc2626", // red-600
};

const REGION_COLORS: Record<string, string> = {
  "Los Angeles": "#ef4444",
  "San Diego": "#f97316",
  "Bay Area": "#0d9488",
  Sacramento: "#8b5cf6",
  "Central Valley": "#eab308",
  "Inland Empire": "#ec4899",
  "Central Coast": "#06b6d4",
  "North State": "#22c55e",
  "North Coast": "#6366f1",
};

// Helper function to render star rating
function renderStars(rating: number | null): string {
  if (!rating) return "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "★".repeat(fullStars);
  if (hasHalfStar) stars += "½";
  return stars;
}

/** Minimal FQHC shape needed by the map — works with both CaliforniaFQHC and DirectoryFQHC */
interface MapFQHC {
  name: string;
  slug: string;
  city: string;
  county: string;
  region: string;
  lat: number;
  lng: number;
  patientCount: string;
  staffCount: string;
  glassdoorRating: number | null;
  glassdoorReviewCount: number | null;
  ecmProvider: boolean;
  website: string;
  resilienceGrade?: string;
  jobCount?: number;
}

interface FQHCMapProps {
  fqhcs: MapFQHC[];
  locale?: string;
}

export default function FQHCMap({ fqhcs, locale = "en" }: FQHCMapProps) {
  const isEs = locale === "es";
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  useEffect(() => {
    // Return early if container is not available
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([36.7783, -119.4179], 6);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create markers
    const markers: L.CircleMarker[] = [];
    fqhcs.forEach((fqhc) => {
      // Color by resilience grade (if available) or fall back to region color
      const color = fqhc.resilienceGrade
        ? GRADE_COLORS[fqhc.resilienceGrade] || REGION_COLORS[fqhc.region] || "#3b82f6"
        : REGION_COLORS[fqhc.region] || "#3b82f6";

      const marker = L.circleMarker([fqhc.lat, fqhc.lng], {
        radius: 8,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.7,
      });

      // Build enriched popup
      const gradeLabel = fqhc.resilienceGrade || "—";
      const gradeStyle = fqhc.resilienceGrade
        ? `background-color: ${GRADE_COLORS[fqhc.resilienceGrade]}; color: white; font-weight: bold; display: inline-block; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 6px;`
        : "";

      let popupHTML = `
        <div class="p-3 w-72">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            ${fqhc.resilienceGrade ? `<span style="${gradeStyle}">${gradeLabel}</span>` : ""}
            <h3 style="font-weight: bold; font-size: 14px; margin: 0;">${escapeHtml(fqhc.name)}</h3>
          </div>
          <div style="font-size: 13px; color: #444; line-height: 1.6;">
            <p><strong>${isEs ? "Ubicación:" : "Location:"}</strong> ${escapeHtml(fqhc.city)}, ${escapeHtml(fqhc.region)}</p>
            <p><strong>${isEs ? "Pacientes:" : "Patients:"}</strong> ${escapeHtml(fqhc.patientCount)} · <strong>${isEs ? "Personal:" : "Staff:"}</strong> ${escapeHtml(fqhc.staffCount)}</p>
      `;

      // Job count
      if (fqhc.jobCount && fqhc.jobCount > 0) {
        popupHTML += `<p><span style="background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">🟢 ${fqhc.jobCount} ${isEs ? "empleos abiertos" : "open positions"}</span></p>`;
      }

      // Glassdoor rating
      if (fqhc.glassdoorRating) {
        const stars = renderStars(fqhc.glassdoorRating);
        popupHTML += `<p><span style="color: #f59e0b;">${stars}</span> ${fqhc.glassdoorRating.toFixed(1)}/5.0`;
        if (fqhc.glassdoorReviewCount) {
          popupHTML += ` <span style="color: #999; font-size: 11px;">(${fqhc.glassdoorReviewCount})</span>`;
        }
        popupHTML += `</p>`;
      }

      // Badges
      const badges: string[] = [];
      if (fqhc.ecmProvider) badges.push(`<span style="background: #f0fdfa; color: #0f766e; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">ECM</span>`);

      if (badges.length > 0) {
        popupHTML += `<p style="margin-top: 4px;">${badges.join(" ")}</p>`;
      }

      // Links
      popupHTML += `<p style="margin-top: 8px;"><a href="/directory/${escapeHtml(fqhc.slug)}" style="color: #0f766e; font-weight: 600; text-decoration: none;">${isEs ? "Ver Perfil →" : "View Profile →"}</a></p>`;
      popupHTML += `</div></div>`;

      marker.bindPopup(popupHTML, {
        maxWidth: 280,
        className: "fqhc-popup",
      });

      marker.addTo(map);
      markers.push(marker);
    });

    mapRef.current = map;
    markersRef.current = markers;

    // Add legend
    const legend = new L.Control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "bg-white p-3 rounded-lg shadow-lg");
      div.style.backgroundColor = "white";
      div.style.padding = "12px 16px";
      div.style.borderRadius = "8px";
      div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";

      let html = `<div style="font-size: 13px; font-weight: bold; margin-bottom: 8px;">${isEs ? "Grado de Resiliencia" : "Resilience Grade"}</div>`;
      const gradeLabels: Record<string, string> = {
        A: isEs ? "A — Excelente" : "A — Excellent",
        B: isEs ? "B — Bueno" : "B — Good",
        C: isEs ? "C — Regular" : "C — Fair",
        D: isEs ? "D — En Riesgo" : "D — At Risk",
        F: isEs ? "F — Crítico" : "F — Critical",
      };
      Object.entries(GRADE_COLORS).forEach(([grade, color]) => {
        html += `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>
            <span style="font-size: 12px;">${gradeLabels[grade] || grade}</span>
          </div>
        `;
      });

      div.innerHTML = html;
      return div;
    };
    legend.addTo(map);

    // Cleanup function
    return () => {
      map.remove();
      markersRef.current = [];
    };
  }, [fqhcs, isEs]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[350px] sm:h-[500px] rounded-xl overflow-hidden shadow-md"
      style={{ minHeight: "350px" }}
    />
  );
}

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
