
import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
} from "motion/react";
import { FaGithub } from "react-icons/fa";


/* =========================================================
   GITHUB ICON FIELD
   ========================================================= */

function GithubIconField() {
    const containerRef = useRef(null);

    /*
     * More GitHub icons
     *
     * x = horizontal position (%)
     * y = vertical position (%)
     * size = icon size
     */
    const icons = [
        { id: 1, x: 4, y: 18, size: 22 },
        { id: 2, x: 11, y: 55, size: 18 },
        { id: 3, x: 18, y: 25, size: 28 },
        { id: 4, x: 25, y: 72, size: 20 },
        { id: 5, x: 31, y: 42, size: 25 },
        { id: 6, x: 37, y: 15, size: 18 },
        { id: 7, x: 43, y: 65, size: 30 },
        { id: 8, x: 49, y: 30, size: 21 },
        { id: 9, x: 55, y: 78, size: 18 },
        { id: 10, x: 61, y: 18, size: 27 },
        { id: 11, x: 67, y: 52, size: 20 },
        { id: 12, x: 73, y: 30, size: 32 },
        { id: 13, x: 79, y: 72, size: 21 },
        { id: 14, x: 85, y: 18, size: 19 },
        { id: 15, x: 91, y: 48, size: 28 },
        { id: 16, x: 96, y: 76, size: 18 },
        { id: 17, x: 8, y: 82, size: 26 },
        { id: 18, x: 23, y: 12, size: 17 },
        { id: 19, x: 35, y: 82, size: 22 },
        { id: 20, x: 52, y: 52, size: 17 },
        { id: 21, x: 69, y: 82, size: 25 },
        { id: 22, x: 88, y: 82, size: 22 },
    ];

    const [mouse, setMouse] = useState({
        x: -1000,
        y: -1000,
    });

    const handleMouseMove = (event) => {
        if (!containerRef.current) return;

        const rect =
            containerRef.current.getBoundingClientRect();

        setMouse({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setMouse({
            x: -1000,
            y: -1000,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="
        relative
        bg-white
        mt-5
        h-18.75
        rounded-md
        overflow-hidden
        shadow-[inset_0_0_25px_rgba(0,0,0,0.12)]
        border border-black/5
      "
        >
            {/* =================================================
          INNER SHADOW / DEPTH
          ================================================= */}

            <div
                className="
          absolute
          inset-0
          pointer-events-none
          rounded-md
          shadow-[inset_0_0_18px_rgba(0,0,0,0.10)]
        "
            />

            {/* Subtle center glow */}
            <div
                className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-40
          h-20
          rounded-full
          bg-indigo-100/50
          blur-3xl
          pointer-events-none
        "
            />

            {/* GitHub icons */}
            {icons.map((icon) => (
                <GithubFloatingIcon
                    key={icon.id}
                    icon={icon}
                    mouse={mouse}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
}


/* =========================================================
   SINGLE GITHUB ICON
   ========================================================= */

function GithubFloatingIcon({
    icon,
    mouse,
    containerRef,
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, {
        stiffness: 180,
        damping: 18,
        mass: 0.6,
    });

    const smoothY = useSpring(y, {
        stiffness: 180,
        damping: 18,
        mass: 0.6,
    });

    const rotate = useSpring(0, {
        stiffness: 160,
        damping: 20,
    });

    const scale = useSpring(1, {
        stiffness: 220,
        damping: 18,
    });

    useEffect(() => {
        if (!containerRef.current) return;

        const rect =
            containerRef.current.getBoundingClientRect();

        const iconX =
            (icon.x / 100) * rect.width;

        const iconY =
            (icon.y / 100) * rect.height;

        const dx = iconX - mouse.x;
        const dy = iconY - mouse.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        /*
         * How close the cursor needs to be
         * before the icon reacts.
         */
        const influenceRadius = 105;

        if (
            distance < influenceRadius &&
            distance > 0
        ) {
            /*
             * Stronger movement when cursor
             * gets closer.
             */
            const strength =
                (1 - distance / influenceRadius) * 42;

            const normalizedX = dx / distance;
            const normalizedY = dy / distance;

            x.set(normalizedX * strength);
            y.set(normalizedY * strength);

            /*
             * Small rotation toward the
             * opposite direction.
             */
            rotate.set(normalizedX * 18);

            /*
             * Grow slightly when cursor
             * gets close.
             */
            scale.set(1.18);
        } else {
            x.set(0);
            y.set(0);
            rotate.set(0);
            scale.set(1);
        }
    }, [
        mouse,
        icon.x,
        icon.y,
        containerRef,
        x,
        y,
        rotate,
        scale,
    ]);

    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.25}
            dragMomentum
            whileDrag={{
                scale: 1.35,
                rotate: 15,
                cursor: "grabbing",
                zIndex: 50,
            }}
            whileHover={{
                scale: 1.08,
            }}
            style={{
                position: "absolute",
                left: `${icon.x}% `,
                top: `${icon.y}% `,
                x: smoothX,
                y: smoothY,
                rotate,
                scale,
                transformStyle: "preserve-3d",
            }}
            className="
        cursor-grab
        select-none
        text-indigo-500
        drop-shadow-[0_2px_3px_rgba(0,0,0,0.18)]
      "
        >
            <FaGithub size={icon.size} />
        </motion.div>
    );
}


export default GithubIconField;

