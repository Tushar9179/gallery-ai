"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

export function SpotlightNew() {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Spotlight />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Gallery <br /> Reimagined with AI.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto">
            AI-generated image descriptions and voice assistance for a truly accessible gallery experience.
          </p>
  
          {/* Your Button (Centered Below Text) */}
                    <Link href="/explore">
            <button className="p-[3px] relative mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Start your journey
                </div>
            </button>
            </Link>
        </div>
       
      </div>
    );
  }
  

export default SpotlightNew;