"use client";

import { useRef } from "react";
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
  lineColor = "#F1502F",
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
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
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
              {showLabels && dot.start.label && (
                <text x={projectPoint(dot.start.lat, dot.start.lng).x} y={projectPoint(dot.start.lat, dot.start.lng).y - 10} textAnchor="middle" className="fill-navy text-[8px] font-semibold dark:fill-white">
                  {dot.start.label}
                </text>
              )}
            </g>
            <g>
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="3" fill={lineColor} />
              <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="3" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
              {showLabels && dot.end.label && (
                <text x={projectPoint(dot.end.lat, dot.end.lng).x} y={projectPoint(dot.end.lat, dot.end.lng).y - 10} textAnchor="middle" className="fill-navy text-[8px] font-semibold dark:fill-white">
                  {dot.end.label}
                </text>
              )}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
