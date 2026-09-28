"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { smoothEase } from "@/lib/motion";

export type ArchivePhoto = {
  caption: string;
  /** First image is the cover thumbnail. */
  images: string[];
};

type ArchivePhotoGalleryProps = {
  photos: ArchivePhoto[];
};

export function ArchivePhotoGallery({ photos }: ArchivePhotoGalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const album = activeAlbum !== null ? photos[activeAlbum] : null;
  const slides = album?.images ?? [];
  const currentSrc = slides[slideIndex] ?? null;

  useEffect(() => {
    if (activeAlbum === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveAlbum(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        setSlideIndex((i) => (i > 0 ? i - 1 : slides.length - 1));
      }
      if (event.key === "ArrowRight") {
        setSlideIndex((i) => (i < slides.length - 1 ? i + 1 : 0));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeAlbum, slides.length]);

  if (!photos.length) return null;

  function openAlbum(index: number) {
    setActiveAlbum(index);
    setSlideIndex(0);
  }

  function closeAlbum() {
    setActiveAlbum(null);
    setSlideIndex(0);
  }

  return (
    <>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {photos.map((photo, index) => {
          const cover = photo.images[0];
          if (!cover) return null;

          return (
            <ScrollReveal key={`${photo.caption}-${cover}`} delay={index * 0.08}>
              <button
                type="button"
                onClick={() => openAlbum(index)}
                className="group w-full overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={cover}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {photo.images.length > 1 ? (
                    <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-white">
                      {photo.images.length}
                    </span>
                  ) : null}
                </div>
                <p className="px-4 py-3 text-sm font-semibold text-slate-800">
                  {photo.caption}
                </p>
              </button>
            </ScrollReveal>
          );
        })}
      </div>

      <AnimatePresence>
        {album && currentSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={album.caption}
            onClick={closeAlbum}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeAlbum}
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIndex((i) =>
                        i > 0 ? i - 1 : slides.length - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-primary"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIndex((i) =>
                        i < slides.length - 1 ? i + 1 : 0,
                      )
                    }
                    className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-primary"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </>
              ) : null}

              <div className="relative aspect-[4/3] w-full bg-slate-100 sm:aspect-[16/10]">
                <Image
                  key={currentSrc}
                  src={currentSrc}
                  alt={album.caption}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <p className="text-base font-semibold text-slate-900">
                  {album.caption}
                </p>
                {slides.length > 1 ? (
                  <p className="shrink-0 text-sm text-slate-500">
                    {slideIndex + 1} / {slides.length}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
