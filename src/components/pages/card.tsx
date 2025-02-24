"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

// Accept an image source as a prop
interface ThreeDCardDemoProps {
  src: string;
}

export function ThreeDCardDemo({ src }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        {/* Card Title */}
       
        {/* Card Description */}
        

        {/* Card Image */}
        <CardItem translateZ="100" className="w-full p-1">
          <Image
            src={src} // Dynamic image source from props
            height="1000"
            width="1000"
            className=" w-100 h-100 object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"

          />
        </CardItem>

        <div className="flex justify-between items-center">
         
         
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ThreeDCardDemo;
