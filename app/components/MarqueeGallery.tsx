"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  fileName: string;
  src: string;
};

type MarqueeGalleryProps = {
  images: GalleryItem[];
};

export default function MarqueeGallery({ images }: MarqueeGalleryProps) {
  const [paused, setPaused] = useState(false);

  if (images.length === 0) {
    return (
      <div className="marquee-fallback">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="work-placeholder" key={index}>
            <span>Work {index + 1}</span>
          </div>
        ))}
      </div>
    );
  }

  const loopImages = [...images, ...images];

  const handleItemClick = () => setPaused((prev) => !prev);

  return (
    <div
      className={`marquee ${paused ? "is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
      }}
    >
      <div className="marquee-track">
        {loopImages.map((image, index) => {
          return (
            <figure
              className="marquee-item"
              key={`${image.fileName}-${index}`}
              onClick={handleItemClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleItemClick();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${image.fileName}，點擊暫停或繼續輪播`}
            >
              <div className="tinted-image marquee-tint">
                <Image
                  src={image.src}
                  alt={image.fileName}
                  fill
                  sizes="220px"
                  className="tinted-image__photo"
                />
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
