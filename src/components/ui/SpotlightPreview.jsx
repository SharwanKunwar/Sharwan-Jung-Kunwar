import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/Spotlight";
import { CoverDemo } from "./CoverDemo";

export function SpotlightPreview() {
  return (
    <div
      className="relative flex md:h-[40rem] h-[50rem] w-full overflow-hidden rounded-b-2xl bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )} />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          <CoverDemo/>
        </h1>
        <div
          className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          
          
        </div>
      </div>
    </div>
  );
}
