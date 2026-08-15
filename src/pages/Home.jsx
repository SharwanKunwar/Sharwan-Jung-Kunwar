import React, { useState, useEffect, useContext } from "react";
import { Container } from "../components/Container";
import { motion } from "motion/react";

import {
  SiNextdotjs,
  SiC,
  SiReact,
  SiSpringboot,
  SiOpenjdk,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiGithub,
  SiAntdesign,
} from "react-icons/si";

import ProjectCard from "../components/ProjectCard";
import { Button } from "antd";
import Resume from "../pages/Resume";
import { DarkModeContext } from "../context/DarkModeContext.js";
import { Link } from "react-router-dom";
import GithubHeatmap from "../components/GithubHeatmap";

/* =========================================================
   PROJECT DATA
========================================================= */

const ProjectDetails = [
  {
    id: 1,
    title: "Focus Planner",
    imgUrl: "/2026Projects/focusPlanner.png",
    URL: "https://focus-planner-mu.vercel.app/",
    source: "https://github.com/SharwanKunwar/FocusPlanner",
    description:
      "A modern focus planner that helps users organize tasks, set daily goals, track progress, and boost productivity with a clean, distraction-free interface.",
    teck: ["ReactJS", "Tailwindcss", "Motion", "antd"],
    date: "March 21, 2026, 11:00 PM",
  },
  {
    id: 2,
    title: "Fack-Data-Builder",
    imgUrl: "/2026Projects/202601.png",
    URL: "https://fake-data-builder.vercel.app/",
    source: "https://github.com/SharwanKunwar/Fake-Data-Builder",
    description:
      "A tool that generates realistic fake data for testing and development. Built to simplify workflows, experiment with datasets, and make development faster and easier.",
    teck: ["ReactJS", "Tailwindcss", "Motion", "antd"],
    date: "Dec 5, 2025, 2:06 PM",
  },
  {
    id: 3,
    title: "DeathNote",
    imgUrl: "/2026Projects/DeathNote.png",
    URL: "https://death-note-sage.vercel.app/",
    source: "https://github.com/SharwanKunwar/DeathNote",
    description:
      "A Death Note themed REST app built with Spring Boot & PostgreSQL in Docker. Write a target's name and cause of death, view all entries, and delete them — powered by a dark, anime-inspired frontend. ☠️📓",
    teck: ["ReactJS", "Tailwindcss", "antd"],
    date: "May 31, 2026, 12:21 PM",
  },
  {
    id: 4,
    title: "Youtube Long Video Playlist Generator",
    imgUrl: "/MainProjectImage/ShortPlaylist.png",
    URL: "https://generate-playlist.vercel.app/",
    source: "https://github.com/SharwanKunwar/Generate-Playlist",
    description:
      "A React + Tailwind app that creates long YouTube video playlists instantly. Organize videos, manage playback flow, and enjoy a clean responsive experience. 🎬⚛️",
    teck: ["ReactJS", "Tailwindcss", "Motion", "antd"],
    date: "May 8, 2026, 10:52 PM",
  },
];

/* =========================================================
   SKILLS
========================================================= */

const primarySkills = [
  {
    icon: SiReact,
    name: "React",
    color: "text-cyan-400",
    glow: "hover:shadow-cyan-500/20",
  },
  {
    icon: SiSpringboot,
    name: "Spring Boot",
    color: "text-green-500",
    glow: "hover:shadow-green-500/20",
  },
  {
    icon: SiOpenjdk,
    name: "Java",
    color: "text-red-500",
    glow: "hover:shadow-red-500/20",
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    color: "text-blue-500",
    glow: "hover:shadow-blue-500/20",
  },
  {
    icon: SiDocker,
    name: "Docker",
    color: "text-sky-500",
    glow: "hover:shadow-sky-500/20",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind",
    color: "text-cyan-400",
    glow: "hover:shadow-cyan-500/20",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    color: "text-neutral-900 dark:text-white",
    glow: "hover:shadow-white/10",
  },
];

const secondarySkills = [
  {
    icon: SiJavascript,
    name: "JavaScript",
    color: "text-yellow-400",
    glow: "hover:shadow-yellow-500/20",
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    color: "text-blue-500",
    glow: "hover:shadow-blue-500/20",
  },
  {
    icon: SiC,
    name: "C",
    color: "text-blue-500",
    glow: "hover:shadow-blue-500/20",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    color: "text-neutral-900 dark:text-white",
    glow: "hover:shadow-white/10",
  },
  {
    icon: SiMongodb,
    name: "MongoDB",
    color: "text-green-500",
    glow: "hover:shadow-green-500/20",
  },
  {
    icon: SiFirebase,
    name: "Firebase",
    color: "text-yellow-500",
    glow: "hover:shadow-yellow-500/20",
  },
  {
    icon: SiHtml5,
    name: "HTML5",
    color: "text-orange-500",
    glow: "hover:shadow-orange-500/20",
  },
  {
    icon: SiCss3,
    name: "CSS3",
    color: "text-blue-500",
    glow: "hover:shadow-blue-500/20",
  },
  {
    icon: SiFramer,
    name: "Motion",
    color: "text-purple-500",
    glow: "hover:shadow-purple-500/20",
  },
  {
    icon: SiAntdesign,
    name: "Ant Design",
    color: "text-blue-600",
    glow: "hover:shadow-blue-500/20",
  },
];

/* =========================================================
   SKILL CARD
========================================================= */

const SkillCard = ({ icon: Icon, name, color, glow }) => {
  return (
    <div
      className={`
        group
        relative
        shrink-0

        w-[86px]
        h-[86px]

        md:w-[92px]
        md:h-[92px]

        flex
        flex-col
        items-center
        justify-center

        rounded-2xl

        bg-white/50
        dark:bg-white/[0.035]

        backdrop-blur-xl

        border
        border-black/[0.08]
        dark:border-white/[0.09]

        shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1.5
        hover:scale-[1.04]

        hover:bg-white/70
        dark:hover:bg-white/[0.07]

        hover:border-indigo-400/30
        hover:shadow-xl

        ${glow}
      `}
    >
      {/* Inner glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl

          opacity-0
          group-hover:opacity-100

          transition-opacity
          duration-300

          bg-gradient-to-br
          from-indigo-500/[0.08]
          via-transparent
          to-purple-500/[0.08]
        "
      />

      {/* Top shine */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-1/2
          h-px

          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent

          opacity-30
          group-hover:opacity-80

          transition-opacity
          duration-300
        "
      />

      {/* Icon */}
      <Icon
        className={`
          relative
          z-10

          text-[30px]
          md:text-[34px]

          mb-2

          transition-transform
          duration-300

          group-hover:scale-110

          ${color}
        `}
      />

      {/* Name */}
      <span
        className="
          relative
          z-10

          text-[10px]
          md:text-[11px]

          font-medium
          tracking-wide

          whitespace-nowrap

          text-neutral-700
          dark:text-neutral-300

          transition-colors
          duration-300

          group-hover:text-neutral-950
          dark:group-hover:text-white
        "
      >
        {name}
      </span>
    </div>
  );
};

/* =========================================================
   SKILL MARQUEE ROW
========================================================= */

const SkillMarqueeRow = ({
  skills,
  direction = "left",
  duration = "28s",
  isDarkMode,
}) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div
        className={`
          pointer-events-none
          absolute
          left-0
          top-0
          bottom-0
          z-20

          w-16
          md:w-28

          bg-gradient-to-r

          ${isDarkMode
            ? "from-[#080808]/95 via-[#080808]/50 to-transparent"
            : "from-white/80 via-white/40 to-transparent"
          }
        `}
      />

      {/* Right fade */}
      <div
        className={`
          pointer-events-none
          absolute
          right-0
          top-0
          bottom-0
          z-20

          w-16
          md:w-28

          bg-gradient-to-l

          ${isDarkMode
            ? "from-[#080808]/95 via-[#080808]/50 to-transparent"
            : "from-white/80 via-white/40 to-transparent"
          }
        `}
      />

      {/* Moving track */}
      <div
        className={`
          flex
          w-max
          gap-5
          md:gap-7

          ${direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
          }
        `}
        style={{
          animationDuration: duration,
        }}
      >
        {/* First group */}
        <div className="flex shrink-0 gap-5 md:gap-7">
          {skills.map((skill, index) => (
            <SkillCard
              key={`first-${skill.name}-${index}`}
              {...skill}
            />
          ))}
        </div>

        {/* Duplicate group */}
        <div
          className="flex shrink-0 gap-5 md:gap-7"
          aria-hidden="true"
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={`second-${skill.name}-${index}`}
              {...skill}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   HOME
========================================================= */

function Home() {
  const [more, setMore] = useState(false);

  const { isDarkMode } = useContext(DarkModeContext);

  /* Scroll to top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* =======================================================
     HAPTIC
  ======================================================= */

  const vibrate = (pattern) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const haptic = {
    tap: () => vibrate(15),
    soft: () => vibrate(30),
    success: () => vibrate([30, 20, 80]),
  };

  return (
    <main
      id="home"
      className="
        relative
        min-h-screen

        flex
        items-start
        justify-start

        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: !isDarkMode
          ? "url('/BG_Images/bg001.jpeg')"
          : "none",
      }}
    >
      {/* Light mode overlay */}
      {!isDarkMode && (
        <div
          className="
            absolute
            inset-0

            bg-white/50

            pointer-events-none
          "
        />
      )}

      <Container
        className="
          relative
          z-10

          min-h-[210vh]

          p-4
          md:p-10

          md:pt-10
          pt-10
        "
      >
        <div className="md:h-12.5 h-4.25" />

        {/* =================================================
            HERO
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
            filter: "blur(7px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "none",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
        >
          {/* Status */}

          <div className="mt-15 mb-4">
            <p
              className={`
                inline-flex
                items-center
                gap-2

                rounded-full

                text-sm

                py-1.5
                px-4

                font-medium

                backdrop-blur-md

                border
                shadow-sm

                transition-all
                duration-300

                hover:scale-105

                ${isDarkMode
                  ? "text-indigo-300 border-indigo-500/30 bg-indigo-500/10"
                  : "text-indigo-600 border-indigo-200 bg-indigo-50/50"
                }
              `}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    animate-ping
                    absolute
                    inline-flex

                    h-full
                    w-full

                    rounded-full

                    bg-indigo-400
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex

                    rounded-full

                    h-2
                    w-2

                    bg-indigo-500
                  "
                />
              </span>

              Full Stack Developer
            </p>
          </div>

          {/* Name */}

          <div className="space-y-4">
            <div>
              <h1
                className={`
                  text-3xl
                  md:text-4xl

                  font-bold
                  tracking-tight

                  ${isDarkMode
                    ? "text-white [text-shadow:1px_1px_20px_rgb(156_163_175_/_0.7)]"
                    : "text-neutral-900 [text-shadow:1px_1px_30px_rgb(156_163_175_/_0.5)]"
                  }
                `}
              >
                Sharwan Jung Kunwar
              </h1>

              <div
                className={`
                  mt-1
                  mb-2

                  flex
                  gap-1.5

                  text-sm

                  ${isDarkMode
                    ? "text-neutral-400"
                    : "text-neutral-500"
                  }
                `}
              >
                <div className="flex items-center gap-1">
                  <i className="ri-home-7-line text-lg text-yellow-300" />

                  <span>
                    From{" "}
                    <strong className="font-medium">
                      Attriya-Kailali
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-2-line text-lg text-indigo-400" />

                  <span>
                    Based in{" "}
                    <strong className="font-medium">
                      Bhaktapur, Bode
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}

          <p
            className={`
              pt-1
              mb-5

              md:text-[15px]
              text-sm

              max-w-full

              text-shadow-sm

              leading-relaxed

              ${isDarkMode
                ? "text-neutral-400"
                : "text-neutral-600"
              }
            `}
          >
            I write code, chaos writes back. I treat bugs like unpaid
            mentors — brutal, frequent, oddly educational. I break more
            than I build some days, but every crash teaches me something
            new. Slowly, painfully, beautifully — it becomes functional
            software. Mostly.
          </p>
        </motion.section>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <section
          className="
            w-full

            flex
            justify-start
            items-center
            flex-wrap

            gap-5

            mt-4
          "
        >
          <motion.button
            initial={{
              opacity: 0,
              y: 15,
              filter: "blur(5px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "none",
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              haptic.soft();
              setMore(!more);
            }}
            className="
              border
              border-black/30

              rounded

              px-5
              py-1

              bg-indigo-400

              text-white
              font-bold
              text-[13px]

              text-shadow-sm

              mastShadow

              hover:bg-indigo-500
              hover:border-indigo-500

              transition-all
              duration-300
            "
          >
            <i className="ri-folder-history-line mr-1 text-md" />

            My Story
          </motion.button>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SharwanKunwar/Dev"
          >
            <motion.button
              initial={{
                opacity: 0,
                y: 15,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "none",
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              onClick={haptic.tap}
              className={`
                border
                border-black/30

                px-2
                py-1

                text-[13px]

                hover:text-white
                hover:bg-indigo-500
                hover:border-indigo-500

                rounded
                mastShadow

                transition-all
                duration-300

                ${isDarkMode ? "WhiteShadow" : ""}
              `}
            >
              🌟 Give Star
            </motion.button>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SharwanKunwar"
          >
            <motion.button
              initial={{
                opacity: 0,
                y: 15,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "none",
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              onClick={haptic.tap}
              className={`
                border
                border-black/30

                px-2
                py-1

                text-[13px]

                hover:text-white
                hover:bg-indigo-500
                hover:border-indigo-500

                rounded
                mastShadow

                transition-all
                duration-300

                ${isDarkMode ? "WhiteShadow" : ""}
              `}
            >
              <section className="flex items-center justify-center gap-2">
                <SiGithub />
                Follow Me
              </section>
            </motion.button>
          </a>
        </section>

        {/* =================================================
            GITHUB HEATMAP
        ================================================= */}

        <div
          className={`
            md:flex
            hidden

            my-10

            bg-gray-50/30

            backdrop-blur-2xl

            rounded-md

            shadow-sm

            ${isDarkMode
              ? "bg-slate-800 mastWhiteShadow"
              : ""
            }
          `}
        >
          <GithubHeatmap />
        </div>

        {/* =================================================
            MY STORY
        ================================================= */}

        {more && (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
              filter: "blur(5px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "none",
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="md:mt-3 mt-5"
          >
            <p
              className={`
                text-sm
                md:text-[18px]

                font-medium

                max-w-full

                text-shadow-sm

                leading-relaxed

                ${isDarkMode
                  ? "text-neutral-400"
                  : "text-neutral-600"
                }
              `}
            >
              C taught me pain first, logic second — self-taught,
              self-doubted, self-improved. From full-stack chaos to
              Android, React, Spring Boot, and PostgreSQL, I learned
              each one by breaking it first and understanding it later.
              I don't fear bugs, I collect them like badges of honor.
              Still building. Still breaking. Still leveling up.
            </p>

            <section
              className={`
                mt-10
                w-full
                md:text-sm
                text-sm
                max-w-2xl

                ${isDarkMode
                  ? "text-neutral-400"
                  : "text-neutral-600"
                }
              `}
            >
              <p
                className="
                  text-lg
                  font-bold
                  capitalize
                  text-indigo-500
                  [text-shadow:1px_1px_90px_theme(colors.indigo.500)]
                "
              >
                <span
                  className="
                    text-2xl
                    text-indigo-500
                    text-shadow-black
                  "
                >
                  i
                </span>

                F googling me is your thing—go ahead. You can find me
                across the web.
              </p>

              <div
                className="
                  grid
                  md:grid-cols-8
                  grid-cols-5
                  gap-1
                  md:mt-3
                  mt-5
                "
              >
                <span
                  className={`
                    text-sm
                    md:text-2xl

                    font-medium

                    text-shadow-sm

                    ${isDarkMode
                      ? "text-neutral-300"
                      : "text-neutral-700"
                    }
                  `}
                >
                  <i className="text-2xl ri-fingerprint-line" />
                </span>

                <section className="flex justify-start items-center">
                  <motion.a
                    initial={{
                      opacity: 0,
                      x: 100,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "none",
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1.1,
                    }}
                    href="https://www.facebook.com/sravana.kumvara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className={`
                      px-2
                      py-1
                      text-[13px]

                      rounded
                      border

                      transition-all
                      duration-300

                      mastShadow

                      hover:text-white
                      hover:bg-indigo-500
                      hover:border-indigo-500

                      ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }
                    `}
                  >
                    Facebook
                  </motion.a>
                </section>

                <section className="flex justify-start items-center">
                  <motion.a
                    initial={{
                      opacity: 0,
                      x: 100,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "none",
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 1.3,
                    }}
                    href="https://www.linkedin.com/in/sharwan-kunwar-95a919317/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={`
                      px-2
                      py-1
                      text-[13px]

                      rounded
                      border

                      transition-all
                      duration-300

                      mastShadow

                      hover:text-white
                      hover:bg-indigo-500
                      hover:border-indigo-500

                      ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }
                    `}
                  >
                    LinkedIn
                  </motion.a>
                </section>

                <section className="flex justify-start items-center">
                  <motion.a
                    initial={{
                      opacity: 0,
                      x: 100,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "none",
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 1.5,
                    }}
                    href="https://github.com/SharwanKunwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className={`
                      px-2
                      py-1
                      text-[13px]

                      rounded
                      border

                      transition-all
                      duration-300

                      mastShadow

                      hover:text-white
                      hover:bg-indigo-500
                      hover:border-indigo-500

                      ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }
                    `}
                  >
                    GitHub
                  </motion.a>
                </section>
              </div>
            </section>
          </motion.section>
        )}

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section className="mt-16">
          <h2
            className={`
              text-2xl
              md:text-3xl

              font-semibold

              mb-3

              tracking-tight

              ${isDarkMode
                ? "text-white"
                : "text-neutral-900"
              }
            `}
          >
            Recently Worked Projects
          </h2>

          <p
            className={`
              mb-6

              text-sm
              md:text-[15px]

              ${isDarkMode
                ? "text-neutral-400"
                : "text-neutral-600"
              }
            `}
          >
            Explore my coding journey through a mix of projects...
          </p>

          <div
            className="
              grid

              lg:grid-cols-2
              lg:grid-rows-2

              gap-5

              py-5
            "
          >
            {ProjectDetails.map((item) => (
              <ProjectCard
                key={item.id}
                title={item.title}
                img={item.imgUrl}
                des={item.description}
                SUrl={item.source}
                PUrl={item.URL}
                Stack={item.teck}
                dt={item.date}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/projects">
              <Button
                size="large"
                className="
                  w-full!
                  mb-10
                  h-12
                  text-base
                  shadow-sm
                "
                onClick={haptic.soft}
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </section>

        {/* =================================================
            SKILLS
        ================================================= */}

        <section className="relative mt-16 md:mt-20">
          {/* Header */}

          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="
                  h-px
                  w-8
                  bg-indigo-500
                "
              />

              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                  text-indigo-500
                "
              >
                Technologies
              </span>
            </div>

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-end
                md:justify-between

                gap-3
              "
            >
              <div>
                <h2
                  className={`
                    text-2xl
                    md:text-3xl

                    font-semibold
                    tracking-tight

                    ${isDarkMode
                      ? "text-white"
                      : "text-neutral-900"
                    }
                  `}
                >
                  Tools I Build With
                </h2>

                <p
                  className={`
                    mt-2
                    text-sm
                    max-w-xl
                    leading-relaxed

                    ${isDarkMode
                      ? "text-neutral-400"
                      : "text-neutral-600"
                    }
                  `}
                >
                  Technologies I use to turn ideas into
                  functional, scalable and occasionally
                  chaotic software.
                </p>
              </div>

              {/* Learning indicator */}

              <div
                className={`
                  hidden
                  md:flex

                  items-center
                  gap-2

                  text-xs
                  font-medium

                  ${isDarkMode
                    ? "text-neutral-400"
                    : "text-neutral-500"
                  }
                `}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex

                      h-full
                      w-full

                      rounded-full

                      bg-green-400

                      opacity-60

                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex

                      h-2
                      w-2

                      rounded-full

                      bg-green-500
                    "
                  />
                </span>

                Always learning
              </div>
            </div>
          </div>

          {/* =================================================
              MARQUEE CONTAINER
          ================================================= */}

          <div
            className="
              relative

              py-5
              md:py-6

              rounded-3xl

              overflow-hidden

              border
              border-black/[0.05]
              dark:border-white/[0.06]

              bg-white/[0.20]
              dark:bg-white/[0.015]

              backdrop-blur-sm
            "
          >
            {/* Ambient glow */}

            <div
              className="
                pointer-events-none

                absolute

                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2

                w-[60%]
                h-24

                rounded-full

                bg-indigo-500/[0.08]

                blur-3xl
              "
            />

            {/* Row 1 */}

            <SkillMarqueeRow
              skills={primarySkills}
              direction="left"
              duration="28s"
              isDarkMode={isDarkMode}
            />

            {/* Divider */}

            <div
              className="
                relative
                z-10

                mx-8
                md:mx-16

                my-5

                h-px

                bg-gradient-to-r

                from-transparent

                via-black/10

                to-transparent

                dark:via-white/10
              "
            />

            {/* Row 2 */}

            <SkillMarqueeRow
              skills={secondarySkills}
              direction="right"
              duration="34s"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Hint */}

          <p
            className={`
              mt-4

              text-center

              text-[10px]
              md:text-xs

              tracking-wide

              ${isDarkMode
                ? "text-neutral-500"
                : "text-neutral-400"
              }
            `}
          >
            Hover over the technologies to pause the showcase
          </p>
        </section>

        {/* =================================================
            RESUME
        ================================================= */}

        <Resume />
      </Container>
    </main>
  );
}

export default Home;