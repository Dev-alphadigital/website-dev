import { Heart, MessageCircle } from "lucide-react";
import { instagramContent } from "@/lib/content";

const placeholderTiles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  likes: 20 + i * 7,
  comments: 2 + i,
}));

export function Instagram() {
  return (
    <section className="bg-cream-2 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-2xl font-extrabold text-navy md:text-4xl">{instagramContent.headline}</h2>
        <a href={instagramContent.handleHref} className="mt-2 inline-block text-sm font-bold text-signal">
          {instagramContent.handle}
        </a>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-4 gap-2 px-6 sm:gap-3">
        {placeholderTiles.map((tile) => (
          <div
            key={tile.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-white"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-navy/5 font-display text-xs font-bold text-navy/20">
              IG
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-navy/60 text-white opacity-0 transition group-hover:opacity-100">
              <span className="flex items-center gap-1 text-xs font-semibold">
                <Heart size={13} /> {tile.likes}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold">
                <MessageCircle size={13} /> {tile.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
