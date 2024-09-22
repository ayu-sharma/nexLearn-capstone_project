"use client";
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface CarouselItem {
  src: string;
  alt: string;
  text: string;
}

interface CarouselPageProps {
  items: CarouselItem[];
  interval?: number;
  controls?: boolean;
  fade?: boolean;
}

const Carousal: React.FC<CarouselPageProps> = ({ items, interval = 2000, controls = false, fade = true }) => {
  return (
    <div>
      <Carousel fade={fade} controls={controls} indicators={false} interval={interval}>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#D2D6DB] to-[#707275]">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                <div
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  className="mb-4"
                />
                {item.src && (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto rounded"
                  />
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousal;
