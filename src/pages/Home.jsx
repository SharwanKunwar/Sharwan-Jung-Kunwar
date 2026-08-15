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
  SiMongodb,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiGithub,
  SiAntdesign,
} from "react-icons/si";
import { Button } from "antd";
import ProjectCard from "../components/ProjectCard";
import Resume from "../pages/Resume";
import { DarkModeContext } from "../context/DarkModeContext.js";
import { Link } from "react-router-dom";
import GithubHeatmap from "../components/GithubHeatmap";

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

/* -------------------------------------------------------------------------- */
/* Skills Marquee Data                                                        */
/* -------------------------------------------------------------------------- */

const topRow = [
  {
    icon: SiReact,
    name: "React",
    tag: "UI Library",
    color: "#61dafb",
  },
  {
    icon: SiSpringboot,
    name: "Spring Boot",
    tag: "Backend",
    color: "#6cbf47",
  },
  {
    icon: SiOpenjdk,
    name: "Java",
    tag: "Language",
    color: "#e76f51",
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    tag: "Database",
    color: "#4f8fc0",
  },
  {
    icon: SiDocker,
    name: "Docker",
    tag: "Containers",
    color: "#3fa9f5",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind",
    tag: "Styling",
    color: "#38bdf8",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    tag: "Version Control",
    color: "#9aa0a6",
  },
];

const bottomRow = [
  {
    icon: SiJavascript,
    name: "JavaScript",
    tag: "Language",
    color: "#f2cc4c",
  },
  {
    icon: SiC,
    name: "C",
    tag: "Language",
    color: "#8fb7e8",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    tag: "Framework",
    color: "#a3a3a3",
  },
  {
    icon: SiMongodb,
    name: "MongoDB",
    tag: "Database",
    color: "#5fc76b",
  },
  {
    icon: SiFirebase,
    name: "Firebase",
    tag: "Platform",
    color: "#f5b942",
  },
  {
    icon: SiHtml5,
    name: "HTML5",
    tag: "Markup",
    color: "#e8734a",
  },
  {
    icon: SiCss3,
    name: "CSS3",
    tag: "Styling",
    color: "#4d90d6",
  },
  {
    icon: SiFramer,
    name: "Framer",
    tag: "Motion",
    color: "#b39ddb",
  },
  {
    icon: SiAntdesign,
    name: "Ant Design",
    tag: "UI Kit",
    color: "#4d8cd6",
  },
];

/* -------------------------------------------------------------------------- */
/* Utility                                                                     */
/* -------------------------------------------------------------------------- */

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");

  const full =
    h.length === 3
      ? h
        .split("")
        .map((c) => c + c)
        .join("")
      : h;

  const bigint = parseInt(full, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const maskStyle = {
  maskImage:
    "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
};

/* -------------------------------------------------------------------------- */
/* Skill Chip                                                                  */
/* -------------------------------------------------------------------------- */

function SkillChip({ icon: Icon, name, tag, color, isDarkMode }) {
  return (
    <div
      className="group relative flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.035]"
      style={{
        background: isDarkMode
          ? "rgba(255,255,255,0.035)"
          : "rgba(255,255,255,0.6)",
        borderColor: isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 28px -12px ${hexToRgba(
          color,
          0.55,
        )}`;

        e.currentTarget.style.borderColor = hexToRgba(color, 0.45);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";

        e.currentTarget.style.borderColor = isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)";
      }}
    >
      {/* Accent bar */}
      <span
        className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full opacity-90"
        style={{ background: color }}
      />

      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: hexToRgba(color, 0.16),
          color,
        }}
      >
        <Icon className="text-lg" />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span
          className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          {name}
        </span>

        <span
          className={`text-[10px] tracking-wide ${isDarkMode ? "text-white/40" : "text-black/40"
            }`}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

function Home() {
  const [more, setMore] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);

  /* Scroll to top when page loads */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Haptic Feedback                                                          */
  /* ------------------------------------------------------------------------ */

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
      className="relative min-h-screen flex items-start justify-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: !isDarkMode
          ? "url('/BG_Images/bg001.jpeg')"
          : "none",
      }}
    >
      {/* Background overlay */}
      {!isDarkMode && (
        <div className="absolute inset-0 bg-white/50 pointer-events-none" />
      )}

      <Container className="min-h-[210vh] p-4 md:p-10 md:pt-10 pt-10">
        <div className="md:h-12.5 h-4.25" />

        {/* ------------------------------------------------------------------ */}
        {/* Hero Section                                                       */}
        {/* ------------------------------------------------------------------ */}

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
          <div className="mt-15 mb-4">
            <p
              className={`inline-flex items-center gap-2 rounded-full text-sm py-1.5 px-4 font-medium backdrop-blur-md border shadow-sm transition-all duration-300 hover:scale-105 ${isDarkMode
                  ? "text-indigo-300 border-indigo-500/30 bg-indigo-500/10"
                  : "text-indigo-600 border-indigo-200 bg-indigo-50/50"
                }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>

              Full Stack Developer
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold tracking-tight ${isDarkMode
                    ? "text-white [text-shadow:1px_1px_20px_rgb(156_163_175_/_0.7)]"
                    : "text-neutral-900 [text-shadow:1px_1px_30px_rgb(156_163_175_/_0.5)]"
                  }`}
              >
                Sharwan Jung Kunwar
              </h1>

              <div
                className={`mt-1 mb-2 flex gap-1.5 text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-500"
                  }`}
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

          <p
            className={`pt-1 mb-5 md:text-[15px] text-sm max-w-full text-shadow-sm leading-relaxed ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
          >
            I write code, chaos writes back. I treat bugs like unpaid mentors
            — brutal, frequent, oddly educational. I break more than I build
            some days, but every crash teaches me something new. Slowly,
            painfully, beautifully — it becomes functional software. Mostly.
          </p>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/* Hero Buttons                                                       */}
        {/* ------------------------------------------------------------------ */}

        <section className="w-full flex justify-start items-center flex-wrap gap-5 mt-4">
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
            className={`border border-black/30 px-2 py-1 text-[13px] hover:text-white hover:bg-indigo-500 rounded mastShadow hover:border-indigo-300 ${isDarkMode ? "WhiteShadow" : ""
              }`}
          >
            <i className="ri-folder-history-line mr-1 text-md text-indigo-300 hover:text-shadow-sm" />
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
              className={`border border-black/30 px-2 py-1 text-[13px] hover:text-white hover:bg-indigo-500 rounded mastShadow hover:border-indigo-500 ${isDarkMode ? "WhiteShadow" : ""
                }`}
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
              className={`border border-black/30 px-2 py-1 text-[13px] hover:text-white hover:bg-indigo-500 rounded mastShadow hover:border-indigo-500 ${isDarkMode ? "WhiteShadow" : ""
                }`}
            >
              <section className="flex items-center justify-center gap-2">
                <SiGithub />
                Follow Me
              </section>
            </motion.button>
          </a>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Github Heatmap                                                     */}
        {/* ------------------------------------------------------------------ */}

        <div
          className={`md:flex hidden my-10 bg-gray-50/30 backdrop-blur-2xl rounded-md shadow-sm ${isDarkMode && "bg-slate-800 mastWhiteShadow"
            }`}
        >
          <GithubHeatmap />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* My Story Expanded                                                  */}
        {/* ------------------------------------------------------------------ */}

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
              className={`text-sm md:text-[18px] font-medium max-w-full text-shadow-sm leading-relaxed ${isDarkMode
                  ? "text-neutral-400"
                  : "text-neutral-600"
                }`}
            >
              C taught me pain first, logic second — self-taught, self-doubted,
              self-improved. From full-stack chaos to Android, React, Spring
              Boot, and PostgreSQL, I learned each one by breaking it first and
              understanding it later. I don't fear bugs, I collect them like
              badges of honor. Still building. Still breaking. Still leveling
              up.
            </p>

            <section
              className={`mt-10 w-full md:text-sm text-sm max-w-2xl ${isDarkMode
                  ? "text-neutral-400"
                  : "text-neutral-600"
                }`}
            >
              <p className="text-lg font-bold capitalize text-indigo-500 [text-shadow:1px_1px_90px_theme(colors.indigo.500)]">
                <span className="text-2xl text-indigo-500 text-shadow-black">
                  i
                </span>
                F googling me is your thing—go ahead. You can find me across the
                web.
              </p>

              <div className="grid md:grid-cols-8 grid-cols-5 gap-1 md:mt-3 mt-5">
                {/* Fingerprint */}
                <span
                  className={`text-sm md:text-2xl font-medium text-shadow-sm ${isDarkMode
                      ? "text-neutral-300"
                      : "text-neutral-700"
                    }`}
                >
                  <i className="text-2xl ri-fingerprint-line" />
                </span>

                {/* Facebook */}
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
                    className={`px-2 py-1 text-[13px] rounded border transition-all duration-300 mastShadow hover:text-white hover:bg-indigo-500 hover:border-indigo-500 ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20 hover:shadow-lg hover:shadow-indigo-500/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }`}
                  >
                    Facebook
                  </motion.a>
                </section>

                {/* LinkedIn */}
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
                    className={`px-2 py-1 text-[13px] rounded border transition-all duration-300 mastShadow hover:text-white hover:bg-indigo-500 hover:border-indigo-500 ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20 hover:shadow-lg hover:shadow-indigo-500/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }`}
                  >
                    LinkedIn
                  </motion.a>
                </section>

                {/* GitHub */}
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
                    className={`px-2 py-1 text-[13px] rounded border transition-all duration-300 mastShadow hover:text-white hover:bg-indigo-500 hover:border-indigo-500 ${isDarkMode
                        ? "text-neutral-200 bg-white/5 border-white/20 hover:shadow-lg hover:shadow-indigo-500/20"
                        : "text-neutral-800 bg-white/50 border-black/20"
                      }`}
                  >
                    GitHub
                  </motion.a>
                </section>
              </div>
            </section>
          </motion.section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Favorite Projects                                                  */}
        {/* ------------------------------------------------------------------ */}

        <section className="mt-16">
          <h2
            className={`text-2xl text-shadow-sm md:text-3xl font-semibold mb-3 tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"
              }`}
          >
            Recently Worked Projects
          </h2>

          <p
            className={`mb-6 text-sm md:text-[15px] ${isDarkMode
                ? "text-neutral-400"
                : "text-neutral-600"
              }`}
          >
            Explore my coding journey through a mix of projects...
          </p>

          <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-5 py-5">
            {ProjectDetails.map((item, index) => (
              <ProjectCard
                key={index}
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
                className="w-full! mb-10 h-12 text-base shadow-sm"
                onClick={haptic.soft}
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Skills Marquee                                                     */}
        {/* ------------------------------------------------------------------ */}

        <div className="relative w-full md:mt-10 mt-5">

          {/* Tech Stack Label */}
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

            <span
              className={`text-[11px] uppercase tracking-[0.15em] ${isDarkMode
                  ? "text-white/40"
                  : "text-black/40"
                }`}
            >
              Tech Stack
            </span>
          </div>

          {/* Top Row - Left to Right */}
          <div
            className="relative w-full overflow-hidden py-2"
            style={maskStyle}
          >
            <div className="flex w-max animate-marquee-left gap-3 hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, idx) =>
                topRow.map((item, i) => (
                  <SkillChip
                    key={`top-${idx}-${i}`}
                    {...item}
                    isDarkMode={isDarkMode}
                  />
                )),
              )}
            </div>
          </div>

          {/* Bottom Row - Right to Left */}
          <div
            className="relative mt-4 w-full overflow-hidden py-2"
            style={maskStyle}
          >
            <div className="flex w-max animate-marquee-right gap-3 hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, idx) =>
                bottomRow.map((item, i) => (
                  <SkillChip
                    key={`bottom-${idx}-${i}`}
                    {...item}
                    isDarkMode={isDarkMode}
                  />
                )),
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Resume Section                                                     */}
        {/* ------------------------------------------------------------------ */}

        <Resume />
      </Container>
    </main>
  );
}

export default Home;