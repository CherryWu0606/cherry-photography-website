"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  slides: readonly HeroSlide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-carousel" aria-label="首頁攝影作品輪播">
      {slides.map((slide, index) => (
        <div
          className={`hero-carousel__slide${index === activeIndex ? " is-active" : ""}`}
          key={slide.src}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1100px) 100vw, 58vw"
            className="hero-carousel__image"
          />
        </div>
      ))}

      <div className="hero-carousel__dots" aria-label="切換首頁輪播照片">
        {slides.map((slide, index) => (
          <button
            className={`hero-carousel__dot${index === activeIndex ? " is-active" : ""}`}
            key={slide.src}
            type="button"
            aria-label={`切換到第 ${index + 1} 張照片`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
