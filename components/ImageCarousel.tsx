"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  label?: string;
}

export default function ImageCarousel({ images, label = "Image carousel" }: ImageCarouselProps) {
  const validImages = useMemo(() => images.filter((image) => image.src), [images]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (validImages.length === 0) {
    return null;
  }

  const currentImage = validImages[currentIndex];
  const hasMultipleImages = validImages.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? validImages.length - 1 : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index === validImages.length - 1 ? 0 : index + 1));
  };

  return (
    <figure className="not-prose my-8 w-full" aria-label={label}>
      <div className="relative overflow-hidden rounded-sm border border-neutral-200 bg-white">
        <div className="relative flex aspect-video w-full items-center justify-center bg-neutral-100">
          <Image
            src={currentImage.src}
            alt={currentImage.alt || currentImage.caption || label}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-contain"
            loading="lazy"
          />
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-900 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <figcaption className="mt-3 flex gap-2 text-sm text-center text-neutral-600 md:flex-row justify-between items-center">
        <span>{currentImage.caption || currentImage.alt || `Image ${currentIndex + 1}`}</span>
        {hasMultipleImages && (
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            {currentIndex + 1} / {validImages.length}
          </span>
        )}
      </figcaption>

      {hasMultipleImages && (
        <div className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Carousel image selector">
          {validImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === currentIndex ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-500"
              }`}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
