// Soft blurred blue + red blobs that drift slowly behind section content.
// Pure CSS keyframes (see tailwind.config.ts `blob` animation) rather than
// Framer Motion or JS-driven state, since this is a purely decorative,
// always-on background layer -- no scroll/hover trigger to get wrong, no
// mount-timing dependency, nothing to hydrate. Meant for sections sitting on
// the flat cream-2 background, which otherwise has no motion at all.
export function AmbientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-16 top-1/4 h-64 w-64 animate-blob rounded-full bg-blue-sub/10 blur-3xl md:h-80 md:w-80" />
      <div
        className="absolute -right-16 top-2/3 h-56 w-56 animate-blob-slow rounded-full bg-signal/10 blur-3xl md:h-72 md:w-72"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute -bottom-16 left-1/2 h-64 w-64 animate-blob rounded-full bg-blue-sub/[0.06] blur-3xl md:h-80 md:w-80"
        style={{ animationDelay: "-16s" }}
      />
    </div>
  );
}
