import React from "react";
import { DarkModeContext } from '../context/DarkModeContext.js';
import { useContext } from "react";

export const Container = ({ children, className }) => {

    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div className={`max-w-6xl w-full mx-auto md:rounded-b-2xl md:mb-0 pb-0 relative ${isDarkMode ? 'bg-black/5 text-white md:mb-7' : 'bg-white/30 backdrop-blur-lg text-black'} ${className}`}>
            {children}
        </div>
    )
}
