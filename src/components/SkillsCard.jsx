import React, { useEffect, useState } from 'react';
import useInView from '../Hook/UseInView';

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
      }, 40); // Speed of increment

      return () => clearInterval(timer);
    }
  }, [isInView, value, progress]);

  return (
    <div
      ref={ref}
      className="card bg-white/10 backdrop-blur-md border border-white/20 md:w-[400px] h-[250px] shadow-lg p-6 text-white dark:text-white"
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
          className="w-full h-3 md:mt-3 mt-5 appearance-none rounded-lg overflow-hidden border border-white/30"
        />
        <span className="absolute right-0 text-sm text-gray-50 md:-top-2 -top-0 font-semibold">{progress}%</span>
      </div>
    </div>
  );
}

export default SkillCard;
