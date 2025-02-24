"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [reduceMotion, setReduceMotion] = useState(false);
  let wordsArray = words.split(" ");

  useEffect(() => {
    // Check motion setting when component mounts and on updates
    const checkMotionSetting = () => {
      setReduceMotion(document.body.classList.contains("reduce-motion"));
    };

    checkMotionSetting(); // Run once on mount

    // Listen for class changes on body
    const observer = new MutationObserver(checkMotionSetting);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reduceMotion) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.09),
        }
      );
    } else {
      // Instantly reveal text if Reduce Motion is enabled
      animate("span", { opacity: 1, filter: "none" }, { duration: 0 });
    }
  }, [scope.current, reduceMotion]); // Now properly updates when motion is toggled

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-fafafa opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-fafafa text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
