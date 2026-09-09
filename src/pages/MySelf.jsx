
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import BlogPage from "../pages/BlogPage.jsx";

import { books } from "../data/books.js";
import { blogs } from "../data/blogs";

import gallary01 from "../data/gallary01.js";
import gallary02 from "../data/gallary02.js";
import gallary03 from "../data/gallary03.js";

import { DarkModeContext } from "../context/DarkModeContext.js";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import GithubHeatmap from "../components/GithubHeatmap.jsx";


/* =========================================================
   SMOOTH 3D TILT CARD

   Premium / soft 3D movement:
   - Smooth mouse tracking
   - Spring physics
   - Gentle tilt
   - Small Z-axis lift
   - Tiny hover scale
   - Smooth reset
   ========================================================= */

function TiltCard({
  children,
  strength = 6,
  className = "",
}) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /*
   * First spring:
   * Makes mouse movement feel slightly delayed and fluid.
   */
  const smoothX = useSpring(mouseX, {
    stiffness: 140,
    damping: 24,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 140,
    damping: 24,
    mass: 0.7,
  });

  /*
   * Convert mouse position into rotation.
   */
  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [strength, -strength]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-strength, strength]
  );

  /*
   * Gentle movement toward the viewer.
   */
  const translateZ = useSpring(0, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  });

  /*
   * Very subtle hover scale.
   */
  const scale = useSpring(1, {
    stiffness: 180,
    damping: 22,
    mass: 0.7,
  });

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    translateZ.set(18);
    scale.set(1.012);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);

    translateZ.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        z: translateZ,
        scale,

        transformStyle: "preserve-3d",
        transformPerspective: 1400,
      }}
      className={`h-full will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}


/* =========================================================
   DEPTH LAYER

   Used for elements that should visually float above
   the main surface.
   ========================================================= */

function DepthLayer({
  children,
  className = "",
  distance = 10,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        z: 0,
        opacity: 0,
      }}
      whileInView={{
        z: distance,
        opacity: 1,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function Reveal({
  children,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 22,
        rotateX: -8,
        filter: "blur(5px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "none",
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.65,
        delay,
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function MySelf({
  username = "SharwanKunwar",
}) {
  const [profile, setProfile] = useState(null);

  const [repos, setRepos] = useState([]);

  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
  });

  const [isMuted, setIsMuted] = useState(true);

  const { isDarkMode } =
    React.useContext(DarkModeContext);


  /* =======================================================
     SCROLL TO TOP
     ======================================================= */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  /* =======================================================
     GITHUB DATA
     ======================================================= */

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${username}`
        );

        const userData = await userRes.json();

        setProfile(userData);


        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );

        const repoData = await repoRes.json();

        if (Array.isArray(repoData)) {
          setRepos(repoData);

          const totalStars = repoData.reduce(
            (acc, repo) =>
              acc + repo.stargazers_count,
            0
          );

          const totalForks = repoData.reduce(
            (acc, repo) =>
              acc + repo.forks_count,
            0
          );

          setStats({
            stars: totalStars,
            forks: totalForks,
          });
        }
      } catch (error) {
        console.error(
          "Error fetching GitHub data:",
          error
        );
      }
    }

    fetchGithubData();
  }, [username]);


  /* =======================================================
     LOADING
     ======================================================= */

  if (!profile) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDarkMode
          ? "bg-neutral-950 text-white"
          : "bg-neutral-100 text-neutral-900"
          }`}
      >
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p
            className={`text-sm ${isDarkMode
              ? "text-neutral-400"
              : "text-neutral-600"
              }`}
          >
            Loading Developer Data...
          </p>
        </div>
      </div>
    );
  }


  const galleryColumns = [
    gallary01,
    gallary02,
    gallary03,
  ];


  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode
        ? "bg-transparent text-white"
        : "bg-neutral-100 text-neutral-900"
        }`}
      style={{
        perspective: "1600px",
      }}
    >

      {/* ===================================================
          BACKGROUND
          =================================================== */}

      {!isDarkMode && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "url('/BG_Images/bg001.jpeg')",
            }}
          />

          <div className="fixed inset-0 bg-white/60 pointer-events-none" />
        </>
      )}


      {isDarkMode && (
        <>
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(79,70,229,0.12),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.08),transparent_30%)] pointer-events-none" />

          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        </>
      )}


      {/* ===================================================
          CONTENT
          =================================================== */}

      <div className="relative z-10 max-w-6xl mx-auto px-3 md:px-5 pt-24 pb-20">


        {/* =================================================
            HERO VIDEO
            ================================================= */}

        <Reveal
          className="relative mb-8"
          delay={0.05}
        >
          <section
            className="relative group"
            style={{
              perspective: "1400px",
            }}
          >

            <div
              className={`absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-700 ${isDarkMode
                ? "bg-indigo-500"
                : "bg-indigo-400"
                }`}
            />


            <motion.div
              whileHover={{
                scale: 1.008,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative h-[240px] md:h-[360px] overflow-hidden rounded-3xl border shadow-2xl ${isDarkMode
                ? "border-white/10 bg-white/[0.03] shadow-indigo-950/30"
                : "border-black/10 bg-white/40 shadow-slate-300/50"
                }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              <motion.video
                src="/video/video.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                style={{
                  transform:
                    "translateZ(0px) scale(1.01)",
                }}
              />


              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(129,140,248,0.22),transparent_30%)] pointer-events-none" />


              {/* Sound Toggle */}

              <button
                onClick={() =>
                  setIsMuted(!isMuted)
                }
                aria-label={
                  isMuted
                    ? "Unmute video"
                    : "Mute video"
                }
                className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>


              {/* Hero Text */}

              <DepthLayer
                distance={26}
                className="absolute bottom-6 left-6 md:left-10"
              >
                <p className="text-indigo-300 text-sm tracking-[0.3em] uppercase font-semibold mb-1">
                  Developer • Builder • Learner
                </p>

                <h1 className="text-white text-2xl md:text-5xl font-bold tracking-tight">
                  My Digital Journey
                </h1>

                <p className="text-white/70 md:mt-2 text-sm md:text-base mt-1 max-w-xl">
                  A collection of the things I build,
                  read, write, and experience.
                </p>
              </DepthLayer>

            </motion.div>
          </section>
        </Reveal>



        {/* =================================================
            PROFILE
            ================================================= */}

        <Reveal
          className="mb-12"
          delay={0.1}
        >
          <TiltCard strength={4}>

            <section
              className={`relative rounded-3xl border p-4 md:p-7 backdrop-blur-xl shadow-2xl overflow-hidden ${isDarkMode
                ? "bg-white/[0.025] border-white/10 shadow-indigo-950/20"
                : "bg-white/50 border-black/10 shadow-slate-300/40"
                }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              {/* Decorative Glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
                style={{
                  transform:
                    "translateZ(2px)",
                }}
              />


              <div className="grid md:grid-cols-[280px_1fr] gap-7">


                {/* Profile Image */}

                <div className="relative group">

                  <div
                    className={`absolute -inset-1 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-500 ${isDarkMode
                      ? "bg-indigo-500"
                      : "bg-indigo-400"
                      }`}
                  />

                  <img
                    src={profile.avatar_url}
                    alt={
                      profile.name || username
                    }
                    className="relative w-full md:w-[280px] h-[330px] md:h-[350px] rounded-2xl border-2 border-indigo-500 object-cover"
                  />

                </div>


                {/* Profile Info */}

                <div className="flex flex-col justify-center">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {profile.name}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${isDarkMode
                        ? "bg-green-400/10 text-green-400 border-green-400/20"
                        : "bg-green-500/10 text-green-600 border-green-500/20"
                        }`}
                    >
                      Available to build
                    </span>

                  </div>


                  <p
                    className={`mt-3 leading-relaxed max-w-2xl ${isDarkMode
                      ? "text-neutral-400"
                      : "text-neutral-600"
                      }`}
                  >
                    {profile.bio ||
                      "Software developer focused on building useful applications and learning new technologies."}
                  </p>


                  {/* Social Links */}

                  <section className="flex flex-wrap justify-center md:justify-start pt-3 items-center gap-3">

                    {/* GitHub */}

                    <a
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode
                        ? "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                        : "border-black/10 bg-black/5 text-neutral-700 hover:bg-black/10"
                        }`}
                    >
                      <FaGithub size={18} />
                      <span>GitHub</span>
                    </a>


                    {/* LinkedIn */}

                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode
                        ? "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                        : "border-black/10 bg-black/5 text-neutral-700 hover:bg-black/10"
                        }`}
                    >
                      <FaLinkedin size={18} />
                      <span>LinkedIn</span>
                    </a>


                    {/* Facebook */}

                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode
                        ? "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                        : "border-black/10 bg-black/5 text-neutral-700 hover:bg-black/10"
                        }`}
                    >
                      <FaFacebook size={18} />
                      <span>Facebook</span>
                    </a>

                  </section>


                  {/* Stats */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">

                    <StatCard
                      label="Public Repos"
                      value={profile.public_repos}
                      isDarkMode={isDarkMode}
                    />

                    <StatCard
                      label="Followers"
                      value={profile.followers}
                      isDarkMode={isDarkMode}
                    />

                    <StatCard
                      label="Total Stars"
                      value={stats.stars}
                      isDarkMode={isDarkMode}
                    />

                    <StatCard
                      label="Total Forks"
                      value={stats.forks}
                      isDarkMode={isDarkMode}
                    />

                  </div>

                </div>
              </div>


              {/* GitHub Contribution */}

              <GithubHeatmap
                date={new Date().getFullYear()}
              />

            </section>

          </TiltCard>
        </Reveal>



        {/* =================================================
            BOOKS
            ================================================= */}

        <div className="mb-6">

          <h2
            className={`text-2xl md:text-3xl font-semibold tracking-tight ${isDarkMode
              ? "text-white"
              : "text-neutral-900"
              }`}
          >
            Favorite Books
          </h2>

          <p
            className={`mt-2 text-sm md:text-[15px] ${isDarkMode
              ? "text-neutral-400"
              : "text-neutral-600"
              }`}
          >
            A few books that shaped the way I think,
            learn, and build.
          </p>

        </div>


        <section className="mb-16">

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6">

            {books.map((item, index) => (

              <Reveal
                key={index}
                delay={index * 0.04}
              >

                <TiltCard strength={6}>

                  <a
                    href={item.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl"
                  >

                    {/* Book Cover */}

                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md ring-1 ring-black/5">

                      <img
                        src={item.imgPath}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />


                      {/* Description Overlay */}

                      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">

                        <p className="text-xs text-white/90 leading-relaxed line-clamp-4">
                          {item.description}
                        </p>

                      </div>


                      {/* Arrow */}

                      <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">

                        <svg
                          className="h-3.5 w-3.5 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>

                      </div>

                    </div>

                  </a>

                </TiltCard>

              </Reveal>

            ))}

          </div>

        </section>



        {/* =================================================
            BLOGS
            ================================================= */}

        <SectionHeader
          eyebrow="Thoughts"
          title="My Blogs"
          description="Things I've learned, explored, and wanted to put into words."
          isDarkMode={isDarkMode}
        />


        <Reveal
          className="mb-16"
          delay={0.08}
        >

          <TiltCard strength={3.5}>

            <section
              className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode
                ? "border-white/10 bg-white/[0.025] shadow-indigo-950/20"
                : "border-black/10 bg-white/50 shadow-slate-300/30"
                }`}
            >

              <div className="p-4 md:p-6">

                <section className="flex flex-col gap-3">

                  {blogs.map((item) => (

                    <BlogPage
                      key={item.id}
                      img={item.img}
                      id={item.id}
                      title={item.title}
                      des={item.des}
                    />

                  ))}

                </section>

              </div>

            </section>

          </TiltCard>

        </Reveal>



        {/* =================================================
            GALLERY
            ================================================= */}

        <SectionHeader
          eyebrow="Life Outside Code"
          title="My Gallery"
          description="A visual collection of moments, places, and memories."
          isDarkMode={isDarkMode}
        />


        <Reveal delay={0.12}>

          <section
            className={`rounded-3xl border p-3 md:p-5 shadow-2xl ${isDarkMode
              ? "border-white/10 bg-white/[0.025] shadow-indigo-950/20"
              : "border-black/10 bg-white/50 shadow-slate-300/40"
              }`}
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
            }}
          >

            <div className="h-[700px] overflow-y-auto pr-1">

              <div className="grid md:grid-cols-3 gap-4 items-start">

                {galleryColumns.map(
                  (column, columnIndex) => (

                    <div
                      key={columnIndex}
                      className="flex flex-col gap-4"
                    >

                      {column.map(
                        (item, index) => (

                          <TiltCard
                            key={index}
                            strength={4}
                          >

                            <div
                              className="relative group overflow-hidden rounded-2xl shadow-lg border border-black/5 dark:border-white/10 transition-shadow duration-500 group-hover:shadow-2xl"
                              style={{
                                transformStyle:
                                  "preserve-3d",
                              }}
                            >

                              <img
                                src={item.path}
                                alt={item.id}
                                loading="lazy"
                                className="w-full rounded-2xl shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                              />

                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                            </div>

                          </TiltCard>

                        )
                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        </Reveal>

      </div>

    </main>
  );
}



/* =========================================================
   SECTION HEADER
   ========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  isDarkMode,
}) {
  return (
    <motion.div
      className="mb-7"
      initial={{
        opacity: 0,
        x: -14,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
    >

      <p
        className={`text-xs tracking-[0.25em] uppercase font-semibold mb-2 ${isDarkMode
          ? "text-indigo-400"
          : "text-indigo-600"
          }`}
      >
        {eyebrow}
      </p>


      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h2>


      <p
        className={`mt-2 text-sm max-w-xl ${isDarkMode
          ? "text-neutral-500"
          : "text-neutral-600"
          }`}
      >
        {description}
      </p>

    </motion.div>
  );
}



/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  label,
  value,
  isDarkMode,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        rotateX: 4,
        rotateY: -3,
        z: 12,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 20,
        mass: 0.7,
      }}
      className={`group rounded-2xl border p-4 md:p-5 text-center shadow-lg transition-colors duration-300 ${isDarkMode
        ? "bg-white/[0.035] border-white/10 hover:bg-white/[0.06]"
        : "bg-white/50 border-black/10 hover:bg-white/80"
        }`}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
    >

      <p
        className={`text-2xl md:text-3xl font-bold transition-transform duration-500 group-hover:scale-105 ${isDarkMode
          ? "text-indigo-400"
          : "text-indigo-600"
          }`}
      >
        {value}
      </p>


      <p
        className={`text-[11px] md:text-xs mt-2 ${isDarkMode
          ? "text-neutral-500"
          : "text-neutral-500"
          }`}
      >
        {label}
      </p>

    </motion.div>
  );
}
