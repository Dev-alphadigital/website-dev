"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  animationDuration?: number;
  loop?: boolean;
}

export function WorldMap({
  dots = [],
  lineColor = "#FB3D00",
  showLabels = true,
  animationDuration = 2,
  loop = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#3b4a5c" : "#d8d2c2",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  function projectPoint(lat: number, lng: number) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }

  function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  // Labels render as an HTML overlay instead of SVG <text>: this SVG scales
  // via its viewBox to fill the container, so a fixed SVG-unit font size
  // shrinks along with everything else at mobile widths (illegible) and
  // there's no single unit value that reads well at both a ~340px mobile
  // container and a ~980px desktop one. HTML text sized in real px is
  // independent of that scale. Also de-dupes by point, since multiple
  // routes sharing an origin (e.g. every route starting from the same
  // office) would otherwise stack identical labels directly on top of
  // each other.
  const labels = useMemo(() => {
    const seen = new Map<string, { x: number; y: number; label: string }>();
    dots.forEach((dot) => {
      [dot.start, dot.end].forEach((point) => {
        if (!point.label) return;
        const { x, y } = projectPoint(point.lat, point.lng);
        const key = `${Math.round(x)}-${Math.round(y)}`;
        if (!seen.has(key)) {
          seen.set(key, { x, y, label: point.label });
        }
      });
    });

    // Two genuinely distinct points can still project close together (e.g.
    // Dubai and Islamabad), which stacks their labels into an unreadable
    // overlap once every point gets a fixed-size HTML label -- worse at
    // mobile widths where the whole map is more compressed. Default every
    // label above its dot; when another label is within range, flip the
    // lower (larger-y) one below its dot so the pair pulls apart instead
    // of colliding in the middle.
    const points = Array.from(seen.values()).map((p) => ({ ...p, anchor: "above" as "above" | "below" }));
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];
        if (Math.abs(a.x - b.x) < 70 && Math.abs(a.y - b.y) < 45) {
          (a.y <= b.y ? b : a).anchor = "below";
        }
      }
    }
    return points;
  }, [dots]);

  return (
    <div className="relative aspect-[2/1] w-full rounded-2xl bg-white font-sans dark:bg-black">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="World map showing Alpha Digital office connections"
        height={495}
        width={1056}
        draggable={false}
        unoptimized
      />
      <svg ref={svgRef} viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full select-none">
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: animationDuration,
                  delay: 0.4 * i,
                  ease: "easeOut",
                  repeat: loop ? Infinity : 0,
                  repeatDelay: 2,
                }}
              />
            </g>
          );
        })}

        <defs>
          {/* Fades in at the origin only, then stays fully opaque through to
              the destination dot. Fading out at both ends (the original
              95%-100% stop) left the last stretch of every curve nearly
              transparent, so the line visually stopped short of the dot it
              was supposed to connect to instead of reaching it. */}
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="1" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g>
              <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="3" fill={lineColor} />
              <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="3" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="3" fill={lineColor} />
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="3" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        ))}
      </svg>

      {showLabels && (
        <div className="pointer-events-none absolute inset-0">
          {labels.map((point) => (
            <span
              key={point.label}
              className={`absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-medium text-navy shadow-sm sm:text-[12px] dark:bg-black/80 dark:text-white ${
                point.anchor === "above" ? "-translate-y-[calc(100%+6px)]" : "translate-y-1.5"
              }`}
              style={{ left: `${(point.x / 800) * 100}%`, top: `${(point.y / 400) * 100}%` }}
            >
              {point.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
