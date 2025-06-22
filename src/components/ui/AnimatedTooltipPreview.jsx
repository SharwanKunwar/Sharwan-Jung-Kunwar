"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/AnimatedTooltip";
import {
  FaJs,
  FaReact,
  FaJava,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFramer,
  SiSpringboot,
  SiPostgresql,
} from "react-icons/si";

const people = [
  {
    id: 1,
    name: "JavaScript",
    designation: "Language",
    icon: <FaJs className="text-yellow-400 w-8" />,
  },
  {
    id: 2,
    name: "React JS",
    designation: "Frontend Framework",
    icon: <FaReact className="text-sky-400 w-10" />,
  },
  {
    id: 3,
    name: "Java",
    designation: "Language",
    icon: <FaJava className="text-red-500 w-7" />,
  },
  {
    id: 4,
    name: "Tailwind CSS",
    designation: "Styling",
    icon: <SiTailwindcss className="text-blue-400 w-10" />,
  },
  {
    id: 5,
    name: "Framer Motion",
    designation: "Animation",
    icon: <SiFramer className="text-pink-500 w-9" />,
  },
  {
    id: 6,
    name: "Spring Boot",
    designation: "Backend Framework",
    icon: <SiSpringboot className="text-green-600 w-10" />,
  },
  {
    id: 7,
    name: "PostgreSQL",
    designation: "Database",
    icon: <SiPostgresql className="text-blue-600 w-9" />,
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-end justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
