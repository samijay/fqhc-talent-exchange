"use client";

import { useEffect, useRef } from "react";
import type { CaliforniaFQHC } from "@/lib/california-fqhcs";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Region colors mapping
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

interface FQHCMapProps {
  fqhcs: CaliforniaFQHC[];
}

export default function FQHCMap({ fqhcs }: FQHCMapProps) {
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
      const color = REGION_COLORS[fqhc.region] || "#3b82f6";
      const marker = L.circleMarker([fqhc.lat, fqhc.lng], {
        radius: 8,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.7,
      });

      // Build popup content
      let popupHTML = `
        <div class="p-3 w-64">
          <h3 class="font-bold text-base mb-2">${escapeHtml(fqhc.name)}</h3>
          <div class="text-sm space-y-1 text-gray-700">
            <p><strong>Location:</strong> ${escapeHtml(fqhc.city)}, ${escapeHtml(fqhc.county)}</p>
            <p><strong>Region:</strong> ${escapeHtml(fqhc.region)}</p>
            <p><strong>Patients:</strong> ${escapeHtml(fqhc.patientCount)}</p>
            <p><strong>Staff:</strong> ${escapeHtml(fqhc.staffCount)}</p>
      `;

      // Add Glassdoor rating if available
      if (fqhc.glassdoorRating) {
        const stars = renderStars(fqhc.glassdoorRating);
        popupHTML += `<p><strong>Rating:</strong> <span class="text-yellow-500">${stars}</span> ${fqhc.glassdoorRating.toFixed(1)}/5.0`;
        if (fqhc.glassdoorReviewCount) {
          popupHTML += ` (${fqhc.glassdoorReviewCount} reviews)`;
        }
        popupHTML += `</p>`;
      }

      // Add ECM badge if applicable
      if (fqhc.ecmProvider) {
        popupHTML += `<p><span class="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded font-semibold">ECM Provider</span></p>`;
      }

      // Add website link
      if (fqhc.website) {
        popupHTML += `<p class="mt-3"><a href="${escapeHtml(fqhc.website)}" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-700 font-semibold">Visit Website →</a></p>`;
      }

      // Add View Details link
      popupHTML += `<p class="mt-3"><a href="/directory/${escapeHtml(fqhc.slug)}" class="text-teal-600 hover:text-teal-700 font-semibold">View Details →</a></p>`;
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

      let html = `<div class="text-sm font-bold mb-2">Regions</div>`;
      Object.entries(REGION_COLORS).forEach(([region, color]) => {
        html += `
          <div class="flex items-center gap-2 mb-1.5">
            <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%; border: 2px solid ${color};"></div>
            <span class="text-xs">${region}</span>
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
  }, [fqhcs]);

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
