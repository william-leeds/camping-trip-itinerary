'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapStops } from '@/data/itinerary';
import { playMapSound } from './sounds';

// Sound wrapper passed from parent
type SfxFn = (fn: () => void) => void;

function createStopIcon(stop: typeof mapStops[number], index: number) {
  if (stop.image) {
    return L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="marker-container" style="position:relative;width:52px;height:52px;">
          <div style="
            position:absolute;inset:0;
            border-radius:50%;
            background:#fbbf24;
            opacity:0.4;
            box-shadow:0 0 12px 4px rgba(251,191,36,0.4);
          "></div>
          <img
            src="${stop.image}"
            style="
              position:absolute;top:2px;left:2px;
              width:48px;height:48px;
              border-radius:50%;
              object-fit:cover;
              border:3px solid white;
              box-shadow:0 2px 8px rgba(0,0,0,0.3);
            "
          />
          <div style="
            position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);
            background:rgba(254,243,199,0.95);
            border:1px solid #92400e;
            border-radius:6px;
            padding:1px 6px;
            white-space:nowrap;
            font-size:11px;
            font-weight:700;
            color:#78350f;
            box-shadow:0 1px 3px rgba(0,0,0,0.15);
          ">${stop.emoji} ${stop.name}</div>
        </div>
      `,
      iconSize: [52, 70],
      iconAnchor: [26, 26],
    });
  }

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="
          position:absolute;inset:0;
          border-radius:50%;
          background:#fef3c7;
          border:2px solid #92400e;
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          box-shadow:0 2px 8px rgba(0,0,0,0.2);
        ">${stop.emoji}</div>
        <div style="
          position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);
          background:rgba(254,243,199,0.95);
          border:1px solid #92400e;
          border-radius:6px;
          padding:1px 6px;
          white-space:nowrap;
          font-size:11px;
          font-weight:700;
          color:#78350f;
          box-shadow:0 1px 3px rgba(0,0,0,0.15);
        ">${stop.emoji} ${stop.name}</div>
      </div>
    `,
    iconSize: [44, 62],
    iconAnchor: [22, 22],
  });
}

interface AdventureMapProps {
  sfx: SfxFn;
}

export default function AdventureMap({ sfx }: AdventureMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Calculate bounds to fit all stops with padding
    const lats = mapStops.map(s => s.lat);
    const lngs = mapStops.map(s => s.lng);
    const bounds = L.latLngBounds(
      [Math.min(...lats) - 0.3, Math.min(...lngs) - 0.5],
      [Math.max(...lats) + 0.3, Math.max(...lngs) + 0.5]
    );

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    }).fitBounds(bounds, { padding: [30, 30] });

    // OpenStreetMap terrain-style tiles (OpenTopoMap for terrain)
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
      maxZoom: 17,
    }).addTo(map);

    // Draw the route line
    const routeCoords: L.LatLngExpression[] = mapStops.map(s => [s.lat, s.lng]);
    L.polyline(routeCoords, {
      color: '#dc2626',
      weight: 3,
      opacity: 0.7,
      dashArray: '10 6',
      lineCap: 'round',
    }).addTo(map);

    // Add stop markers
    mapStops.forEach((stop, i) => {
      const icon = createStopIcon(stop, i);
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      marker.on('click', () => {
        sfx(() => playMapSound(Math.min(i, 5)));
      });
    });

    mapInstanceRef.current = map;
    setReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [sfx]);

  return (
    <div className="max-w-3xl mx-auto px-3 mt-6">
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl overflow-hidden shadow-xl">
        <h2 className="text-center text-amber-900 font-extrabold text-lg pt-5 pb-1">
          🗺️ The Adventure Map
        </h2>
        <p className="text-center text-amber-700/60 text-xs mb-3">🔊 Tap the stops to hear them! Pinch to zoom.</p>
        <div
          ref={mapContainerRef}
          style={{ height: '500px', width: '100%' }}
          className="rounded-b-2xl"
        />
      </div>
    </div>
  );
}
