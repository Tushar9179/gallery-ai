"use client";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export function ParallaxScrollDemo() {
  const [images, setImages] = useState<string[]>([]); // Array of image URLs
  const [error, setError] = useState<string>(""); // To store error messages

  useEffect(() => {
    async function fetchImages() {
      try {
        console.log("Fetching images...");
        const res = await fetch(`http://localhost:8000/images`);
        console.log("Response status:", res.status);  // Log the response status
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        
        // Ensure images is an array and filter out any invalid URLs
        const validImages = data.images.filter((image: { url: string }) => image.url && image.url.trim() !== "");
        setImages(validImages.map((image: { url: string }) => image.url)); // Only pass valid URLs
      } catch (error) {
        setError(`Failed to fetch images: ${error.message}`);
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return <ParallaxScroll images={images} />;
}

export default ParallaxScrollDemo;
