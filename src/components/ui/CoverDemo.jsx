import React from "react";
import {Cover} from './Cover'
import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";
import {motion, scale} from 'motion/react';

export function CoverDemo() {
  return (
    <div>
      <section className="flex justify-center items-end gap-5  w-full md:h-[20px] h-[30px]"></section>
      <motion.h1
      initial={{y:-100, opacity: 0, scale:0.98, filter:"blur(10px)" }}
      animate={{y:-5, opacity: 1, scale:1.1, filter:"blur(0px)"}}
      transition={{ duration: 0.5, delay:0.1 }}
      className="text-[75%] text-white md:text-3xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-0 relative z-20 py-2 bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        <motion.span 
          className="text-5xl">Hi I'm</motion.span><br /> <span><Cover>Sharwan jung kunwar</Cover></span>
        </motion.h1>
      <motion.h2 
      initial={{y:-100, opacity: 0, scale:0.98, filter:"blur(10px)" }}
      animate={{y:0, opacity: 1, scale:1.1, filter:"blur(0px)"}}
      transition={{ duration: 0.5, delay:0.2 }}
      className="text-[20px] text-gray-300">AKA Spider Man</motion.h2>
      <motion.p 
      initial={{y:-100, opacity: 0, scale:0.50, filter:"blur(10px)" }}
      animate={{y:0, opacity: 1, scale:1, filter:"blur(0px)"}}
      transition={{ duration: 0.5, delay:0.3 }}
      className="text-[15px] mt-7 px-1 text-white">Full-stack dev | Java & React | Passionate coder | Guitarist | Dreamer chasing groth & goals.</motion.p>
      <section className="md:flex md:flex-row justify-center items-center  flex flex-col  w-full md:h-[150px] h-[300px]">
        <a  href="https://www.facebook.com/sravana.kumvara/">
        <motion.button 
        initial={{x:-500,opacity:0,filter:'blur(10px)'}}
        animate={{x:0,opacity:1,filter:'blur(0px)'}}
        transition={{ duration: 0.5, delay:0.4 }}
        onTap={{scale:1.1}}
        className="btn-grad md:text-[15px] font-normal text-[16px] md:w-[250px] w-[350px] border border-white/30 md:h-[45px] h-[50px] text-white md:rounded-full rounded-full">Let's connect</motion.button>
        </a>
        
        <a  href="https://github.com/SharwanKunwar">
        <motion.button 
        initial={{x:500,opacity:0,filter:'blur(10px)'}}
        animate={{x:0,opacity:1,filter:'blur(0px)'}}
        transition={{ duration: 0.5, delay:0.4 }}
        onTap={{scale:1.1}}
        className="btn-grad md:text-[15px] font-normal text-[15px] md:w-[250px] w-[350px] border border-white/30 md:h-[45px] h-[50px] text-white md:rounded-full rounded-full">View my work</motion.button>
        </a>
      </section>

      <motion.section 
      initial={{opacity:0, y:100, scale:0.90,filter:'blur(10px)'}}
      animate={{opacity:1, y:0, scale:1,filter:'blur(0px)'}}
      transition={{ duration: 0.5, delay:0.5 }}
      className="flex justify-center items-end gap-5  w-full h-[100px]">
        <AnimatedTooltipPreview/>
      </motion.section>
      
    </div>
  );
}
