"use client";

import { Container } from '../../components/Container'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import React from "react";
import { ShootingStars } from "../ui/ShootingStars";
import { StarsBackground } from "../ui/StarsBackground";
export function ShootingStarsAndStarsBackgroundDemo({ children }) {
    return (
        <div
            className="bg-gray-900 flex flex-col items-center justify-center relative w-full">

            <Container className="no-scrollbar relative z-10">
                <Navbar />
                <div>
                    {children ? children : <Outlet />}
                </div>
            </Container>


            <ShootingStars />
            <StarsBackground />
        </div>
    );
}
