export function Footer() {
  return (
    <footer className="bg-navy py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-lg font-extrabold text-white">
          Alpha<span className="text-signal">Digital</span>
        </span>
        <p className="text-xs text-cream-2/50">
          &copy; {new Date().getFullYear()} Alpha Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
