"use client";
import { useState, useEffect, useRef } from "react";
import { Accessibility, AArrowUp, Activity, Contrast } from "lucide-react";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Load saved preferences from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTextSize = parseFloat(localStorage.getItem("textSize") || "1");
      const savedContrast = localStorage.getItem("highContrast") === "true";
      const savedMotion = localStorage.getItem("reduceMotion") === "true";

      setTextSize(savedTextSize);
      setHighContrast(savedContrast);
      setReduceMotion(savedMotion);
      applySettings(savedTextSize, savedContrast, savedMotion);
    }
  }, []);

  // Apply settings to the document
  const applySettings = (size: number, contrast: boolean, motion: boolean) => {
    document.documentElement.style.setProperty("--text-scale", size.toString());
    document.body.classList.toggle("high-contrast", contrast);
    document.body.classList.toggle("reduce-motion", motion);
  };

  // Toggle functions
  const toggleTextSize = () => {
    const newSize = textSize === 1 ? 1.2 : 1;
    setTextSize(newSize);
    if (typeof window !== "undefined") localStorage.setItem("textSize", newSize.toString());
    applySettings(newSize, highContrast, reduceMotion);
  };

  const toggleContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    if (typeof window !== "undefined") localStorage.setItem("highContrast", newContrast.toString());
    applySettings(textSize, newContrast, reduceMotion);
  };

  const toggleMotion = () => {
    const newMotion = !reduceMotion;
    setReduceMotion(newMotion);
    if (typeof window !== "undefined") localStorage.setItem("reduceMotion", newMotion.toString());
    applySettings(textSize, highContrast, newMotion);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-purple-700 transition flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Accessibility size={24} />
      </button>

      {/* Accessibility Options Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-16 right-6 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-60 z-50"
        >
          <h3 className="text-lg font-semibold mb-3">Accessibility Options</h3>

          <button
            onClick={toggleTextSize}
            className="flex items-center gap-2 w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded mb-2"
          >
            <AArrowUp size={20} />
            {textSize === 1 ? "Increase Text Size" : "Reset Text Size"}
          </button>

          <button
            onClick={toggleContrast}
            className="flex items-center gap-2 w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded mb-2"
          >
            <Contrast size={20} />
            {highContrast ? "Disable High Contrast" : "Enable High Contrast"}
          </button>

          <button
            onClick={toggleMotion}
            className="flex items-center gap-2 w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded"
          >
            <Activity size={20} />
            {reduceMotion ? "Enable Animations" : "Reduce Motion"}
          </button>
        </div>
      )}
    </div>
  );
}
