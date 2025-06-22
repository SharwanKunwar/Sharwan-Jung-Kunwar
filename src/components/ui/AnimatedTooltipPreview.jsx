"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/AnimatedTooltip";
const people = [
  {
    id: 1,
    name: "React js",
    designation: "Frontend Framework",
    image: "/tackStack/atom.png",
  },
  {
    id: 2,
    name: "JavaScript",
    designation: "Language",
    image: "/tackStack/js.png",
  },
  {
    id: 3,
    name: "Java",
    designation: "Language",
    image: "/tackStack/java.png",
  },
  {
    id: 4,
    name: "Tailwindcss",
    designation: "Styling",
    image: "/tackStack/Tailwindcss.png",
  },
  {
    id: 5,
    name: "Motion",
    designation: "Animation",
    image: "/tackStack/motion.png", // framer motion logo
  },
  {
    id: 6,
    name: "Spring Boot",
    designation: "Backend Framework",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    id: 7,
    name: "Postgresql",
    designation: "Database",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
];


export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-end justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
