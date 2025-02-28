"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={cn("h-screen w-full bg-[#0A0A0A] overflow-y-auto", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-10 py-40 px-10">
        {[firstPart, secondPart, thirdPart].map((part, partIndex) => (
          <div className="grid gap-10" key={"col-" + partIndex}>
            {part.map((el, idx) => (
              <motion.div
                style={{ y: partIndex === 0 ? translateFirst : partIndex === 1 ? translateSecond : translateThird }}
                key={"grid-" + partIndex + idx}
                className="relative group"
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover object-left-top rounded-lg"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxScroll;
