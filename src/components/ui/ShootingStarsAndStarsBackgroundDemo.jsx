"use client";

import { Container } from '../../components/Container'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import React, { useContext } from "react";
import { ShootingStars } from "../ui/ShootingStars";
import { StarsBackground } from "../ui/StarsBackground";
import { DarkModeContext } from '../../context/DarkModeContext';

export function ShootingStarsAndStarsBackgroundDemo({ children }) {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div
            className={`flex flex-col items-center justify-center relative w-full min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}>

            <Container className="no-scrollbar relative z-10">
                <Navbar />
                <div>
                    {children ? children : <Outlet />}
                </div>
            </Container>

            <div 
                className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500" 
                style={{ opacity: isDarkMode ? 1 : 0 }}
                aria-hidden="true"
            >
                <ShootingStars />
                <StarsBackground />
            </div>
        </div>
    );
}
