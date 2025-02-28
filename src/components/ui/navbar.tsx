"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import exp from "constants";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-0 inset-x-0 bg-white dark:bg-gray-900 shadow-md z-50 p-4")}> 
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="text-sm p-2">Go back to the main dashboard</div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Gallery">
          <div className="text-sm grid grid-cols-3 gap-2 p-2">
            <img src="/gallery1.jpg" alt="Preview 1" className="w-16 h-16 object-cover rounded-md" />
            <img src="/gallery2.jpg" alt="Preview 2" className="w-16 h-16 object-cover rounded-md" />
            <img src="/gallery3.jpg" alt="Preview 3" className="w-16 h-16 object-cover rounded-md" />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Favorites">
          <div className="text-sm p-2">Your liked photos in one place</div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Upload">
          <div className="text-sm p-2">Add new images to the gallery</div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;