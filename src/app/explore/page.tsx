"use client";

import { useState, useEffect } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ThreeDCardDemo from "@/components/pages/card";

// Define image paths without captions initially
const imagePaths = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
];

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [images, setImages] = useState(imagePaths.map(path => ({
    src: path,
    caption: "Loading caption...",
    isLoading: true,
    hasError: false
  })));
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(""); // For more detailed loading status


  // Hardcoded fallback captions
  const fallbackCaptions: { [key: string]: string } = {
    "image1.jpg": "A glass teapot sitting on a table, holding a bottle of arak, inspired by Derek Jarman. Made of dried flowers, coffee, and musical instruments, with phragmites. A still image from the movie, set in Tehran, full-width, inspired by Jeanne du Maurier. The subject is in brown robes, captured in multi-layered artworks.",
    "image2.jpg": "A group of ducks floating on a lake, captured in an Unsplash photograph during sunset. The panorama is inspired by Flora Macdonald Reid, with swans and an ocean shoreline visible on the horizon.",
    "image3.jpg": "A woman standing in front of a bush of purple flowers, a Pexels contest winner. The fashion model has a happy expression, trending on Pexels.",
    "image4.jpg": "A woman in a pink suit and a man in a white shirt, captured trending on ArtStation. The 30-year-old French woman is walking confidently in the style of Davey Adesida.",
    "image5.jpg": "A woman taking a picture of herself in a mirror, a Pexels contest winner, inspired by Tran Nguyen. She stands in a grassy field with rippling fabric, symbolizing a distortion of reality.",
    "image6.jpg": "A man standing in water holding a lantern, featured on Pexels. The scene is set under a moonlit, starry sky, evoking themes of beauty in ugliness, a shining crescent moon, and a sense of longing. The calm ambiance reflects a lunar walk, with the atmosphere of camping.",
    "image7.jpg": "A person pouring orange juice into a glass, captured on Unsplash in Brazil. The photo shows a large local food spread, with mangoes featured prominently.",
    "image8.jpg": "A small boat floating in the middle of the ocean, a Pexels contest winner. The image represents a solid object in a void.",
    "image9.jpg": "A woman in a black top holding a pink ball, depicted in a 90s fashion editorial. The youthful Japanese girl is tall, lanky, and dressed in shamanistic dark blue clothes. The photo features sleek round shapes, with the stone being round as well. The image is playful and cheerful, capturing her in baggy clothing with fringe. This archive photo has a three-color scheme, resembling a magazine photograph.",
    "image10.jpg": "A man sitting next to a body of water, holding a camera.",
  };

  // Fetch caption for a specific image
  const fetchCaption = async (index: number) => {
    const imageName = imagePaths[index].split("/").pop() || "";
    
    try {
      setLoadingStatus(`Analyzing image ${index + 1} of ${imagePaths.length}...`);

      const response = await fetch(imagePaths[index]);
      const blob = await response.blob();
      const file = new File([blob], imageName, { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", file);

      const apiResponse = await fetch("http://127.0.0.1:5000/caption", {
        method: "POST",
        body: formData,
      });

      console.log("API Response Status:", apiResponse.status);
      const data = await apiResponse.json();
      console.log("API Response Data:", data);

      if (!apiResponse.ok || data.error) {
        throw new Error(data.error || `Server Error: ${apiResponse.status}`);
      }

      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = {
          ...newImages[index],
          caption: data.caption || "No caption available",
          isLoading: false,
          hasError: false,
        };
        return newImages;
      });
    } catch (error) {
      console.error(`Error generating caption for image ${index}:`, error);
      
      // If API fails, use the fallback caption
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = {
          ...newImages[index],
          caption: fallbackCaptions[imageName] || "Caption unavailable",
          isLoading: false,
          hasError: true,
        };
        return newImages;
      });
    } finally {
      setIsLoading(false);
      setLoadingStatus("");
    }
  };


  // Initialize and generate captions for the first image
  useEffect(() => {
    fetchCaption(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setKey(prev => prev + 1);
    if (images[nextIndex].isLoading) {
      fetchCaption(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setKey(prev => prev + 1);
    if (images[prevIndex].isLoading) {
      fetchCaption(prevIndex);
    }
  };

  // Function to speak the caption text aloud
  const handleMicClick = (caption:string) => {
    const utterance = new SpeechSynthesisUtterance(caption);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="absolute inset-0 bg-[#000000f5] text-white flex items-center justify-center px-8">
      {/* Main Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-start w-full max-w-6xl gap-8 md:gap-16 relative">
        {/* Image & Controls */}
        <div className="relative flex items-center z-20 w-full md:w-auto">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all absolute left-0 md:left-[-50px] z-30 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Previous image"
            disabled={isLoading}
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
            {images.length > 0 && <ThreeDCardDemo src={images[currentIndex]?.src || ""} />}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all absolute right-0 md:right-[-50px] z-30 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Next image"
            disabled={isLoading}
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

        {/* Caption area with loading indicator */}
        {/* Caption area with loading indicator */}
                <div className="w-full h-auto text-white flex flex-col justify-center items-center md:items-start pl-0 md:pl-12 mt-8 md:mt-0">
                  {isLoading || images[currentIndex]?.isLoading ? (
                    // Loading state with animated dots
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse delay-150"></div>
                        <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse delay-300"></div>
                      </div>
                      <span className="text-center text-gray-300">
                        {loadingStatus || "Analyzing image with AI..."}
                      </span>
                    </div>
                  ) : images[currentIndex]?.hasError ? (
                    // Fallback caption when AI caption fails
                    <div key={key} className="w-full text-center md:text-left">
                      <p className="text-sm text-gray-400 mb-2">
                        Using fallback caption - AI analysis failed.
                      </p>
                      <TextGenerateEffect
                        key={currentIndex} // Force re-render on image change
                        words={images[currentIndex]?.caption || "Caption unavailable"}
                        className="text-white text-lg font-semibold"
                      />
                    </div>
                  ) : (
                    // Display AI-generated caption
                    <div key={key} className="w-full text-center md:text-left">
                      <TextGenerateEffect
                        key={currentIndex} // Force re-render on image change
                        words={images[currentIndex]?.caption || "Loading caption..."}
                        className="text-white text-lg font-semibold"
                      />
                    </div>
                  )}

          {/* Mic Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handleMicClick(images[currentIndex]?.caption || "No caption available")}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all"
              aria-label="Speak Caption"
              disabled={isLoading || images[currentIndex]?.isLoading}
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
                className="lucide lucide-mic"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image progression indicator */}
      {images.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setKey(prev => prev + 1);
                  if (images[index].isLoading) {
                    fetchCaption(index);
                  }
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Loading indicator for initial page load */}
      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-5 h-5 bg-purple-600 rounded-full animate-pulse"></div>
              <div className="w-5 h-5 bg-purple-600 rounded-full animate-pulse delay-150"></div>
              <div className="w-5 h-5 bg-purple-600 rounded-full animate-pulse delay-300"></div>
            </div>
            <p className="text-white text-lg">Loading gallery...</p>
          </div>
        </div>
      )}
    </div>
  );
}