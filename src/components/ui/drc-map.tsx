'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

const DRC_CENTER: [number, number] = [-2.5, 23.5];
const DRC_ZOOM = 5;

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  popup?: string;
  color?: 'green' | 'amber' | 'red' | 'blue';
}

interface DRCMapProps {
  markers?: MapMarker[];
  height?: number;
  zoom?: number;
  center?: [number, number];
  satellite?: boolean;
}

const markerColors: Record<string, string> = {
  green: '#16a34a',
  amber: '#d97706',
  red: '#dc2626',
  blue: '#2563eb',
};

function createIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 14px; height: 14px;
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

export function DRCMap({
  markers = [],
  height = 400,
  zoom = DRC_ZOOM,
  center = DRC_CENTER,
  satellite = false,
}: DRCMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    const tileUrl = satellite
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution = satellite
      ? '&copy; Esri, Maxar, Earthstar Geographics'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    L.tileLayer(tileUrl, { attribution, maxZoom: 18 }).addTo(map);

    markers.forEach((m) => {
      const color = markerColors[m.color || 'green'];
      const marker = L.marker([m.lat, m.lng], { icon: createIcon(color) }).addTo(map);
      const tooltipContent = m.popup
        ? `<div style="font-family:system-ui;font-size:13px;line-height:1.4">
            <strong>${m.label}</strong><br/>
            <span style="color:#555">${m.popup}</span>
          </div>`
        : `<strong style="font-family:system-ui;font-size:13px">${m.label}</strong>`;
      marker.bindTooltip(tooltipContent, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95,
        className: 'drc-map-tooltip',
      });
    });

    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ height, width: '100%', borderRadius: 8 }} />;
}
