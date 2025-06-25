import React, { useEffect, useState } from 'react';
import useInView from '../Hook/useInView';
import {motion} from 'motion/react';

function SkillCard({ title, description, value }) {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView && progress < value) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= value) {
            clearInterval(timer);
            return value;
          }
          return prev + 1;
        });
      }, 20); // Speed of increment

      return () => clearInterval(timer);
    }
  }, [isInView, value, progress]);

  return (
    <motion.div
      ref={ref}
      initial={{x:-200,scale:1, opacity:0,filter:'blur(10px)'}}
      whileInView={{scale:1, x: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="card bg-white/10 backdrop-blur-md border border-white/20 md:w-[400px] md:h-[190px] h-[220px] shadow-lg p-6 text-white dark:text-white"
    >
      <h1 className="text-xl font-semibold dark:text-white mb-2">{title}</h1>
      <p className="text-sm text-neutral-400 dark:text-gray-300 mb-4">{description}</p>
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          readOnly
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #d1d5db ${progress}%, #d1d5db 100%)`,
          }}
          className="w-full h-2 md:mt-5 mt-5 appearance-none rounded-lg overflow-hidden border border-white/30"
        />
        <span className="absolute right-0 text-sm text-gray-50 md:-top-0 -top-0 font-semibold">{progress}%</span>
      </div>
    </motion.div>
  );
}

export default SkillCard;
