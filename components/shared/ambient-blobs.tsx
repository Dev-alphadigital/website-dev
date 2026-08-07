"use client";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

// Soft blurred blue + red blobs behind section content. Each blob has two
// independent layers of motion on two different elements, since they'd
// otherwise fight over the same `transform` property:
// - The FloatingElement wrapper drifts toward/away from the cursor (same
//   registerElement/useAnimationFrame system already driving the hero's
//   logo parallax), so the whole background layer visibly responds to
//   mouse movement.
// - The inner div keeps its own slow CSS `blob` keyframe (see
//   tailwind.config.ts) for a gentle organic scale/shift independent of
//   the cursor, so it's not perfectly still when the mouse hasn't moved.
// sensitivity/depth are tuned so the cursor offset is actually visible --
// an earlier pass (sensitivity 0.5, depth 0.3-0.8) only ever moved a blob
// 10-25px even at the opposite corner of the section, which read as "not
// following the cursor at all" even though the transform genuinely was
// updating every frame.
export function AmbientBlobs() {
  return (
    <Floating sensitivity={1.4} className="overflow-hidden pointer-events-none" aria-hidden="true">
      <FloatingElement depth={0.9} className="-left-16 top-1/4">
        <div className="h-64 w-64 animate-blob rounded-full bg-blue-sub/25 blur-3xl md:h-80 md:w-80" />
      </FloatingElement>
      <FloatingElement depth={1.4} className="-right-16 top-2/3">
        <div
          className="h-56 w-56 animate-blob-slow rounded-full bg-signal/25 blur-3xl md:h-72 md:w-72"
          style={{ animationDelay: "-8s" }}
        />
      </FloatingElement>
      <FloatingElement depth={0.6} className="-bottom-16 left-1/2">
        <div
          className="h-64 w-64 animate-blob rounded-full bg-blue-sub/15 blur-3xl md:h-80 md:w-80"
          style={{ animationDelay: "-16s" }}
        />
      </FloatingElement>
    </Floating>
  );
}
