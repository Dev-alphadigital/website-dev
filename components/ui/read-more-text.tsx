"use client";

import * as React from "react";

interface ReadMoreTextProps {
  text: string;
  /** Exact substring marking where the visible-by-default portion ends. */
  cutoff: string;
  className?: string;
}

// Mobile-only "Read More" truncation. The paragraph is unchanged at sm and
// up (the rest of the copy stays inline via sm:inline, the toggle itself is
// sm:hidden) -- only mobile gates the tail of the text behind a tap.
export function ReadMoreText({ text, cutoff, className }: ReadMoreTextProps) {
  const [expanded, setExpanded] = React.useState(false);
  const cutIndex = text.indexOf(cutoff);

  if (cutIndex === -1) {
    return <p className={className}>{text}</p>;
  }

  const visiblePart = text.slice(0, cutIndex + cutoff.length);
  const restPart = text.slice(cutIndex + cutoff.length);

  return (
    <p className={className}>
      {visiblePart}
      <span className={expanded ? "inline" : "hidden sm:inline"}>{restPart}</span>{" "}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="font-bold text-signal sm:hidden"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </p>
  );
}
