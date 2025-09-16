"use client"

import * as React from "react"
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card"
import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
images: {
  src: string;
  alt: string;
}[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
const carouselRef = React.useRef<HTMLDivElement>(null);

React.useEffect(() => {
  const updateSize = () => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height
      });
    }
  };

  updateSize();
  window.addEventListener('resize', updateSize);
  
  const resizeObserver = new ResizeObserver(updateSize);
  if (carouselRef.current) {
    resizeObserver.observe(carouselRef.current);
  }

  return () => {
    window.removeEventListener('resize', updateSize);
    resizeObserver.disconnect();
  };
}, []);

// Calculate responsive card dimensions with aspect ratio
// Maintain a 3:4 aspect ratio (width:height)
const aspectRatio = 3 / 4;

// Use container height as the limiting factor to prevent overflow
const maxCardHeight = containerSize.height * 0.95; // 95% of container height
const maxCardWidth = maxCardHeight * aspectRatio;

// Also check against container width for very wide containers
const widthBasedHeight = (containerSize.width * 0.7) / aspectRatio;

// Use the smaller of the two to ensure cards fit
const cardHeight = Math.min(maxCardHeight, widthBasedHeight, 450); // Cap at 450px
const cardWidth = cardHeight * aspectRatio;

return (
  <div ref={carouselRef} className="w-full h-full">
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full h-full relative"
    >
      <CarouselContent className="h-full items-center">
        {images.map((image, index) => (
          <CarouselItem 
            key={index} 
            className="pl-0 flex-shrink-0"
            style={{ flexBasis: 'auto' }}
          >
            {/* Container with margin for spacing */}
            <div className="px-1">
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl"
                style={{ 
                  width: `${cardWidth}px`, 
                  height: `${cardHeight}px` 
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  priority={index === 0}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  </div>
)
}
