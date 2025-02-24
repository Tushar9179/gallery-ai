"use client";
import { ParallaxScroll } from "../ui/parallax-scroll";

export function ParallaxScrollDemo() {
  return <ParallaxScroll images={images} />;
}

const images = Array.from({ length: 13 }, (_, i) => `/images/image${i + 1}.jpg`);
export default ParallaxScrollDemo;