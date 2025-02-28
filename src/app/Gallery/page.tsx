"use client";  // Ensure this is at the top
import { ParallaxScrollDemo } from "@/components/pages/paralax";
import { FloatingNavDemo } from "@/components/pages/navbar";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-y-auto">
      {/* Floating Nav Section */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black"> {/* Add background color to navbar */}
        <FloatingNavDemo />
      </div>

      {/* Parallax Section */}
      <div className="pt-20"> {/* Add padding-top to push content below the navbar */}
        <ParallaxScrollDemo />
      </div>
    </div>
  );
}
