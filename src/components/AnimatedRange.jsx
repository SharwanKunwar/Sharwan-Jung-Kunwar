import React, { useState, useEffect } from 'react';
import useInView from '../Hook/UseInView';

function AnimatedRange({ targetValue }) {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId;
    let start;

    const duration = 1500; // animation duration in ms

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        readOnly
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #d1d5db ${value}%, #d1d5db 100%)`,
        }}
        className="w-full h-3 md:mt-3 mt-5 appearance-none rounded-lg overflow-hidden border border-white/30"
      />
      <span className="absolute right-0 text-sm text-gray-50 md:-top-2 -top-0 font-semibold">{value}%</span>
    </div>
  );
}
