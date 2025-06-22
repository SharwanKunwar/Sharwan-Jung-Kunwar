import React from "react";
import {Cover} from './Cover'
import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";

export function CoverDemo() {
  return (
    <div>
        <section className="flex justify-center items-end gap-5  w-full md:h-[100px] h-[30px]"></section>
      <h1
        className="text-2xl text-white md:text-3xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-0 relative z-20 py-2 bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Hi I'm<br /> <span><Cover>Sharwan jung kunwar</Cover></span>
      </h1>
      <h1 className="text-2xl">AKA Spider Man</h1>
      <p className="text-[15px] mt-7">Full-stack dev | Java & React | Passionate coder | Guitarist | Dreamer chasing groth & goals.</p>
      <section className="md:flex md:flex-row justify-center items-center gap-5 flex flex-col  w-full md:h-[150px] h-[200px]">
        <button className="text-[12px] md:w-[200px] w-[250px] border border-white/30 h-[40px] bg-sky-400 text-white md:rounded-full rounded-sm">Let's connect</button>
        <button className="text-[12px] md:w-[200px] w-[250px] border border-white/30 h-[40px] bg-sky-400 text-white md:rounded-full rounded-sm">View my work</button>
      </section>
      <section className="flex justify-center items-end gap-5  w-full h-[100px] bg-red-400">
        <AnimatedTooltipPreview/>
      </section>
      
    </div>
  );
}
