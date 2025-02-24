"use client";

import { useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ThreeDCardDemo from "@/components/pages/card"; // Import the 3D card

const images = [
    { src: "/images/image1.jpg", caption: "A glass teapot sitting on a table, holding a bottle of arak, inspired by Derek Jarman. Made of dried flowers, coffee, and musical instruments, with phragmites. A still image from the movie, set in Tehran, full-width, inspired by Jeanne du Maurier. The subject is in brown robes, captured in multi-layered artworks." },
    { src: "/images/image2.jpg", caption: "A group of ducks floating on a lake, captured in an Unsplash photograph during sunset. The panorama is inspired by Flora Macdonald Reid, with swans and an ocean shoreline visible on the horizon." },
    { src: "/images/image3.jpg", caption: "A woman standing in front of a bush of purple flowers, a Pexels contest winner. The fashion model has a happy expression, trending on Pexels." },
    { src: "/images/image4.jpg", caption: "A woman in a pink suit and a man in a white shirt, captured trending on ArtStation. The 30-year-old French woman is walking confidently in the style of Davey Adesida." },
    { src: "/images/image5.jpg", caption: "A woman taking a picture of herself in a mirror, a Pexels contest winner, inspired by Tran Nguyen. She stands in a grassy field with rippling fabric, symbolizing a distortion of reality." },
    { src: "/images/image6.jpg", caption: "A man standing in water holding a lantern, featured on Pexels. The scene is set under a moonlit, starry sky, evoking themes of beauty in ugliness, a shining crescent moon, and a sense of longing. The calm ambiance reflects a lunar walk, with the atmosphere of camping." },
    { src: "/images/image7.jpg", caption: "A person pouring orange juice into a glass, captured on Unsplash in Brazil. The photo shows a large local food spread, with mangoes featured prominently." },
    { src: "/images/image8.jpg", caption: "A small boat floating in the middle of the ocean, a Pexels contest winner. The image represents a solid object in a void." },
    { src: "/images/image9.jpg", caption: "A woman in a black top holding a pink ball, depicted in a 90s fashion editorial. The youthful Japanese girl is tall, lanky, and dressed in shamanistic dark blue clothes. The photo features sleek round shapes, with the stone being round as well. The image is playful and cheerful, capturing her in baggy clothing with fringe. This archive photo has a three-color scheme, resembling a magazine photograph." },
    { src: "/images/image10.jpg", caption: "A man sitting next to a body of water, holding a camera." },
];

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Forces re-render for animation

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="absolute inset-0 bg-[#000000f5] text-white flex items-center justify-center px-8">
      {/* Main Content Wrapper */}
      <div className="flex items-center justify-start w-full max-w-6xl gap-16 relative">
        {/* Image & Controls */}
        <div className="relative flex items-center z-20">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all absolute left-[-50px] z-30 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>

          {/* 3D Card with Image */}
          <div className="relative w-full h-full flex items-center justify-center mx-4 z-10">
            <ThreeDCardDemo src={images[currentIndex].src} />
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all absolute right-[-50px] z-30 shadow-lg hover:shadow-xl transform hover:scale-105 "
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <div key={key} className="w-full h-auto text-white flex items-center pl-12">
          <TextGenerateEffect
            words={images[currentIndex].caption}
            className="text-[#fafafa]"  // Applying the color #fafafa to the text
          />
        </div>
      </div>
    </div>
  );
}
