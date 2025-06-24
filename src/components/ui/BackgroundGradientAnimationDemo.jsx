import React from "react";
import { BackgroundGradientAnimation } from "../ui/BackgroundGradientAnimation";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div
        className="absolute z-40 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <div className="w-6/12 h-full flex justify-center items-center">
        <div className=" w-6/12 h-6/12 rounded-lg">
        <img className="rounded-lg" src="sharwanjungkunwar0007.jpg" alt="" />
        </div>
        </div>
        <div className="bg-neutral-500 w-6/12 h-full flex justify-center items-center">
        <div className="bg-yellow-400 w-[90%] h-[90%]">
            
        </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
