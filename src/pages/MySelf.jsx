import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import BookCard from "../components/BookCard";
import { books } from "../data/books.js";
import BlogPage from "../pages/BlogPage.jsx";
import { blogs } from "../data/blogs";
import MyLocationMap from "../components/MyLocationMap.jsx";
import gallary01 from "../data/gallary01.js";
import gallary02 from "../data/gallary02.js";
import gallary03 from "../data/gallary03.js";
import { DarkModeContext } from "../context/DarkModeContext.js";

export default function MySelf({ username = "SharwanKunwar" }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
  });
  const [isMuted, setIsMuted] = useState(true);

  const { isDarkMode } = React.useContext(DarkModeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            (acc, repo) => acc + repo.stargazers_count,
            0
          );

          const totalForks = repoData.reduce(
            (acc, repo) => acc + repo.forks_count,
            0
          );

          setStats({
            stars: totalStars,
            forks: totalForks,
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    }

    fetchGithubData();
  }, [username]);

  if (!profile) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-neutral-950 text-white" : "bg-neutral-100"
          }`}
      >
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p
            className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
          >
            Loading Developer Data...
          </p>
        </div>
      </div>
    );
  }

  const galleryColumns = [gallary01, gallary02, gallary03];

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-900"
        }`}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      {!isDarkMode && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('/BG_Images/bg001.jpeg')",
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

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-6xl mx-auto px-3 md:px-5 pt-24 pb-20">

        {/* =====================================================
            HERO VIDEO
        ====================================================== */}

        <section className="relative group mb-8">
          <div
            className={`absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-700 ${isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
              }`}
          />

          <div
            className={`relative h-[240px] md:h-[360px] overflow-hidden rounded-3xl border ${isDarkMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-black/10 bg-white/40"
              }`}
          >
            <video
              src="/video/video.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full
                 flex items-center justify-center
                 bg-black/40 backdrop-blur-md
                 border border-white/20
                 text-white
                 hover:bg-black/60
                 hover:scale-105
                 active:scale-95
                 transition-all duration-300"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            <div className="absolute bottom-6 left-6 md:left-10">
              <p className="text-indigo-300 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-2">
                Developer • Builder • Learner
              </p>

              <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
                My Digital Journey
              </h1>

              <p className="text-white/70 text-sm md:text-base mt-2 max-w-xl">
                A collection of the things I build, read, write, and experience.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROFILE
        ====================================================== */}

        <section
          className={`rounded-3xl border p-4 md:p-7 mb-12 backdrop-blur-xl ${isDarkMode
            ? "bg-white/[0.025] border-white/10"
            : "bg-white/50 border-black/10"
            }`}
        >
          <div className="grid md:grid-cols-[280px_1fr] gap-7">

            {/* Profile Image */}

            <div className="relative group">
              <div
                className={`absolute -inset-1 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-500 ${isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
                  }`}
              />

              <img
                src={profile.avatar_url}
                alt={profile.name || username}
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

              {/* GitHub Link */}

              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 mt-5 w-fit px-4 py-2 rounded-xl text-sm border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode
                  ? "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
                  : "border-black/10 bg-black/5 text-neutral-700 hover:bg-black/10"
                  }`}
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>

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

          {/* =================================================
              GITHUB CONTRIBUTION
          ================================================== */}

          <div
            className={`mt-7 rounded-2xl border p-4 md:p-5 overflow-hidden ${isDarkMode
              ? "bg-black/20 border-white/10"
              : "bg-white/40 border-black/10"
              }`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">GitHub Activity</p>

                <p
                  className={`text-xs mt-1 ${isDarkMode
                    ? "text-neutral-500"
                    : "text-neutral-500"
                    }`}
                >
                  My coding consistency throughout the year.
                </p>
              </div>

              <span
                className={`text-xs ${isDarkMode
                  ? "text-neutral-500"
                  : "text-neutral-500"
                  }`}
              >
                {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex justify-center items-center overflow-x-auto pb-2">
              <GitHubCalendar
                username={username}
                year={new Date().getFullYear()}
              />
            </div>
          </div>
        </section>


        {/* Books section ---------------------------------------------------- */}

        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {books.map((item, index) => (
              <a
                key={index}
                href={item.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Cover */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 bg-red-400">
                  <img
                    src={item.imgPath}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                  {/* Description overlay */}
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-white/90 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow icon */}
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
            ))}
          </div>
        </section>

        {/* =====================================================
            BLOGS
        ====================================================== */}

        <SectionHeader
          eyebrow="Thoughts"
          title="My Blogs"
          description="Things I've learned, explored, and wanted to put into words."
          isDarkMode={isDarkMode}
        />

        <section
          className={`mb-16 rounded-3xl border overflow-hidden ${isDarkMode
            ? "border-white/10 bg-white/[0.025]"
            : "border-black/10 bg-white/50"
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

        {/* =====================================================
            GALLERY
        ====================================================== */}

        <SectionHeader
          eyebrow="Life Outside Code"
          title="My Gallery"
          description="A visual collection of moments, places, and memories."
          isDarkMode={isDarkMode}
        />

        <section
          className={`rounded-3xl border p-3 md:p-5 ${isDarkMode
            ? "border-white/10 bg-white/[0.025]"
            : "border-black/10 bg-white/50"
            }`}
        >
          <div className="h-[700px] overflow-y-auto pr-1">
            <div className="grid md:grid-cols-3 gap-4 items-start">

              {galleryColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="flex flex-col gap-4"
                >
                  {column.map((item, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-2xl"
                    >
                      <img
                        src={item.path}
                        alt={item.id}
                        loading="lazy"
                        className="w-full rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-[1.025]"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </section>

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
    <div className="mb-7">

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

    </div>
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
    <div
      className={`group rounded-2xl border p-4 md:p-5 text-center transition-all duration-300 hover:-translate-y-1 ${isDarkMode
        ? "bg-white/[0.035] border-white/10 hover:bg-white/[0.06]"
        : "bg-white/50 border-black/10 hover:bg-white/80"
        }`}
    >
      <p
        className={`text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105 ${isDarkMode
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


    </div>
  );
}