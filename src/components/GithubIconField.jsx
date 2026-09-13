import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
} from "motion/react";
import { FaGithub } from "react-icons/fa";

import { DarkModeContext } from "../context/DarkModeContext.js";

/* =========================================================
   GITHUB ICON FIELD
   ========================================================= */

function GithubIconField() {
    const containerRef = useRef(null);

    const { isDarkMode } = React.useContext(DarkModeContext);

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

    /* =======================================================
       5 MINUTE COUNTDOWN
       ======================================================= */

    const COUNTDOWN_DURATION = 5 * 60 * 1000;

    const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
    const [countdownFinished, setCountdownFinished] = useState(false);

    useEffect(() => {
        const startTime = Date.now();

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(COUNTDOWN_DURATION - elapsed, 0);

            setTimeLeft(remaining);

            if (remaining === 0) {
                setCountdownFinished(true);
                clearInterval(timer);
            }
        }, 10);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    const milliseconds = timeLeft % 1000;

    const formattedCountdown =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}.` +
        `${String(milliseconds).padStart(3, "0")}`;

    /* =======================================================
       MOUSE POSITION + SPOTLIGHT
       ======================================================= */

    const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

    const spotX = useMotionValue(-1000);
    const spotY = useMotionValue(-1000);
    const spotSmoothX = useSpring(spotX, { stiffness: 120, damping: 22 });
    const spotSmoothY = useSpring(spotY, { stiffness: 120, damping: 22 });

    const handleMouseMove = (event) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;

        setMouse({ x: mx, y: my });
        spotX.set(mx);
        spotY.set(my);
    };

    const handleMouseLeave = () => {
        setMouse({ x: -1000, y: -1000 });
        spotX.set(-1000);
        spotY.set(-1000);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative mt-5 h-[75px] rounded-xl overflow-hidden border ${isDarkMode
                ? "border-white/10"
                : "border-black/10"
                }`}
            style={{
                background: isDarkMode
                    ? "radial-gradient(circle at 20% 20%, #1e1b4b, transparent 60%), linear-gradient(135deg, #0b0f1a, #0e1330)"
                    : "#ffffff",
                boxShadow: isDarkMode
                    ? "inset 0 0 25px rgba(0,0,0,0.55)"
                    : "inset 0 0 18px rgba(0,0,0,0.06)",
            }}
        >
            <style>{`
                @keyframes ghBob {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
            `}</style>

            {/* tiny dot-grid texture — indigo in dark mode, small black dots in light mode */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: isDarkMode ? 0.18 : 0.35,
                    backgroundImage: isDarkMode
                        ? "radial-gradient(circle, #818cf8 0.6px, transparent 0.6px)"
                        : "radial-gradient(circle, #000000 0.6px, transparent 0.6px)",
                    backgroundSize: "8px 8px",
                }}
            />

            {/* cursor-tracking spotlight */}
            <motion.div
                className={`absolute w-32 h-32 rounded-full pointer-events-none z-10 ${isDarkMode ? "mix-blend-screen" : "mix-blend-multiply"
                    }`}
                style={{
                    left: 0,
                    top: 0,
                    x: spotSmoothX,
                    y: spotSmoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: isDarkMode
                            ? "radial-gradient(circle, rgba(129,140,248,0.35), transparent 70%)"
                            : "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
                    }}
                />
            </motion.div>

            {/* countdown — compact corner badge */}
            <div className="absolute top-1.5 left-2 z-30 flex items-center gap-1.5 pointer-events-none select-none">
                {!countdownFinished ? (
                    <>
                        <span className="relative flex h-1.5 w-1.5">
                            <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDarkMode ? "bg-indigo-400" : "bg-indigo-500"
                                    }`}
                            />
                            <span
                                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isDarkMode ? "bg-indigo-400" : "bg-indigo-500"
                                    }`}
                            />
                        </span>
                        <span
                            className={`font-mono text-[11px] tracking-wider tabular-nums ${isDarkMode ? "text-indigo-300" : "text-indigo-600"
                                }`}
                        >
                            {formattedCountdown}
                        </span>
                    </>
                ) : (
                    <span
                        className={`font-mono text-[10px] tracking-wide ${isDarkMode ? "text-pink-400" : "text-pink-500"
                            }`}
                    >
                        ⏱ you found the end
                    </span>
                )}
            </div>

            {icons.map((icon) => (
                <GithubFloatingIcon
                    key={icon.id}
                    icon={icon}
                    mouse={mouse}
                    containerRef={containerRef}
                    isDarkMode={isDarkMode}
                />
            ))}
        </div>
    );
}

/* =========================================================
   SINGLE GITHUB ICON
   ========================================================= */

function GithubFloatingIcon({ icon, mouse, containerRef, isDarkMode }) {
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
    const smoothY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });
    const rotate = useSpring(0, { stiffness: 160, damping: 20 });
    const scale = useSpring(1, { stiffness: 220, damping: 18 });

    useEffect(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const iconX = (icon.x / 100) * rect.width;
        const iconY = (icon.y / 100) * rect.height;

        const dx = iconX - mouse.x;
        const dy = iconY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 105;

        if (distance < influenceRadius && distance > 0) {
            const strength = (1 - distance / influenceRadius) * 42;
            const normalizedX = dx / distance;
            const normalizedY = dy / distance;

            x.set(normalizedX * strength);
            y.set(normalizedY * strength);
            rotate.set(normalizedX * 18);
            scale.set(1.18);
        } else {
            x.set(0);
            y.set(0);
            rotate.set(0);
            scale.set(1);
        }
    }, [mouse, icon.x, icon.y, containerRef, x, y, rotate, scale]);

    const bobDelay = `${(icon.id * 137) % 3000}ms`;
    const bobDuration = `${3 + (icon.id % 3)}s`;

    return (
        <div
            style={{
                position: "absolute",
                left: `${icon.x}%`,
                top: `${icon.y}%`,
            }}
        >
            <div
                style={{
                    animation: `ghBob ${bobDuration} ease-in-out infinite`,
                    animationDelay: bobDelay,
                }}
            >
                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.25}
                    dragMomentum
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    whileDrag={{
                        scale: 1.35,
                        rotate: 15,
                        cursor: "grabbing",
                        zIndex: 50,
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                    style={{
                        x: smoothX,
                        y: smoothY,
                        rotate,
                        scale,
                        transformStyle: "preserve-3d",
                    }}
                    className={`cursor-grab select-none transition-colors duration-300 ${hovered
                        ? isDarkMode
                            ? "text-fuchsia-400"
                            : "text-fuchsia-500"
                        : isDarkMode
                            ? "text-indigo-400"
                            : "text-indigo-500"
                        }`}
                >
                    <FaGithub
                        size={icon.size}
                        style={{
                            filter: hovered
                                ? isDarkMode
                                    ? "drop-shadow(0 0 6px rgba(232,121,249,0.6))"
                                    : "drop-shadow(0 0 5px rgba(217,70,239,0.35))"
                                : isDarkMode
                                    ? "drop-shadow(0 2px 3px rgba(0,0,0,0.45))"
                                    : "drop-shadow(0 2px 3px rgba(0,0,0,0.15))",
                            transition: "filter 0.3s ease",
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default GithubIconField;