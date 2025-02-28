"use client";
import React, { useEffect, useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export default function FloatingNavDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR mismatch

  const navItems = [
    { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
    { name: "About", link: "/about", icon: <IconUser className="h-4 w-4" /> },
    { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
  ];

  return (
        <div className="relative w-full bg-red-500 p-4">
          <h1 className="text-white text-lg">Navbar Loaded</h1>
        </div>
  );
}
