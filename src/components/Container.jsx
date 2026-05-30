import React from "react";
import { DarkModeContext } from '../context/DarkModeContext';
import { useContext } from "react";

export const Container = ({ children, className }) => {

    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div className={`max-w-6xl w-full mx-auto md:rounded-b-2xl md:mb-7 ${isDarkMode ? 'bg-black/5 text-white' : 'bg-white text-black'} ${className}`}>
            {children}
        </div>
    )
}