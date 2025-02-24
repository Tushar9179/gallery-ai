import { useState, useEffect } from "react";

export const useAccessibility = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Function to check if 'reduce-motion' class is present
    const checkMotionSetting = () => {
      setReduceMotion(document.body.classList.contains("reduce-motion"));
    };

    checkMotionSetting(); // Run once on mount

    // Observe changes in body class list to detect updates dynamically
    const observer = new MutationObserver(() => checkMotionSetting());

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return { reduceMotion };
};
