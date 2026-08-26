import { useContext, useEffect, useState } from "react";
import { Button } from "antd";

import { Container } from "../components/Container";
import { DarkModeContext } from "../context/DarkModeContext.js";
import BigProjectCard from "../components/BigProjectCard";

const API_URL = "https://project-api-umber.vercel.app/api/projectDetails";

const filters = [
  { id: "all", label: "All" },
  { id: "full-stack", label: "Full Stack" },
  { id: "ui-design", label: "UI Designs" },
  { id: "frontend", label: "Frontend Only" },
];

function Projects() {
  const { isDarkMode } = useContext(DarkModeContext);

  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();

        setProjects(result.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Check whether all projects are visible
  const allLoaded = visibleCount >= filteredProjects.length;

  // Load 4 more projects
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Change filter
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setVisibleCount(4);
  };

  const activeFilterLabel =
    filters.find((filter) => filter.id === activeFilter)?.label || "All";

  const formatDate = (dt) => {
    if (!dt) return "";
    const date = new Date(dt);
    if (isNaN(date.getTime())) return dt;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: !isDarkMode ? "url('/BG_Images/bg001.jpeg')" : "none",
      }}
    >
      {/* Keyframes for the commit-node reveal */}
      <style>{`
        @keyframes timelinePop {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .timeline-item {
          animation: timelinePop 0.5s ease forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background overlay */}
      {!isDarkMode && (
        <div className="absolute inset-0 bg-white/50 pointer-events-none" />
      )}

      <Container>
        <div className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-25 flex flex-col justify-center items-center gap-4">

          {/* Page Heading */}
          <h1
            className={`text-2xl sm:text-3xl px-3 font-medium text-start w-full lg:w-[95%] lg:mt-3 ${isDarkMode ? "text-white" : ""
              }`}
          >
            {activeFilterLabel} Projects
          </h1>

          <div className="w-full lg:w-[95%] min-h-screen">

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pb-10 px-3  border-b border-black/30 border-dotted">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${isActive
                      ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
                      : isDarkMode
                        ? "border-white/25 bg-white/5 text-white hover:bg-white/15"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-indigo-400 hover:text-indigo-600"
                      }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Loading State */}
            {loading && (
              <div className={`py-10 text-center ${isDarkMode ? "text-white" : "text-neutral-600"}`}>
                Loading projects...
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="py-10 text-center text-red-500">{error}</div>
            )}

            {/* Timeline */}
            {!loading && !error && filteredProjects.length > 0 && (
              <div className="relative py-8">
                {/* Center line (desktop) / left line (mobile) */}
                <div
                  className={`absolute top-0 bottom-0 w-px left-4 lg:left-1/2 lg:-translate-x-1/2 ${isDarkMode
                    ? "bg-gradient-to-b from-indigo-400/60 via-white/15 to-transparent"
                    : "bg-gradient-to-b from-indigo-400/70 via-neutral-300 to-transparent"
                    }`}
                />

                <div className="flex flex-col gap-10 lg:gap-14">
                  {filteredProjects.slice(0, visibleCount).map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                      <div
                        key={item.id}
                        className="timeline-item relative pl-12 lg:pl-0"
                        style={{ animationDelay: `${(index % 4) * 90}ms` }}
                      >
                        {/* Node dot */}
                        <span
                          className={`absolute top-2 left-4 -translate-x-1/2 lg:left-1/2 h-3 w-3 rounded-full border-2 z-10 ${isDarkMode
                            ? "bg-neutral-950 border-indigo-400"
                            : "bg-white border-indigo-500"
                            }`}
                        />

                        {/* Date badge — sits on the line */}
                        <div
                          className={`hidden lg:block absolute top-0 ${isLeft ? "left-[calc(50%+1.25rem)]" : "right-[calc(50%+1.25rem)]"
                            } text-xs font-mono tracking-wide uppercase ${isDarkMode ? "text-indigo-300" : "text-indigo-600"
                            }`}
                        >
                          {formatDate(item.date)}
                        </div>

                        {/* Mobile date badge */}
                        <div
                          className={`lg:hidden mb-1 text-xs font-mono tracking-wide uppercase ${isDarkMode ? "text-indigo-300" : "text-indigo-600"
                            }`}
                        >
                          {formatDate(item.date)}
                        </div>

                        {/* Card, offset to alternating side on desktop */}
                        <div
                          className={` mr-10 lg:w-[calc(50%-2.5rem)] ${isLeft ? "lg:mr-auto lg:pr-0" : "lg:ml-auto lg:pl-10"
                            }`}
                        >
                          <BigProjectCard
                            title={item.title}
                            img={item.imgUrl}
                            des={item.description}
                            SUrl={item.source}
                            PUrl={item.URL}
                            Stack={item.teck}
                            category={item.category}
                            dt={item.date}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Projects */}
            {!loading && !error && filteredProjects.length === 0 && (
              <p className={`text-center py-10 ${isDarkMode ? "text-neutral-400" : "text-neutral-500"}`}>
                No projects found.
              </p>
            )}
          </div>

          {/* Load More */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="text-center pb-20">
              {!allLoaded ? (
                <Button onClick={handleLoadMore}>Load More</Button>
              ) : (
                <p className="underline text-neutral-400 italic px-2 sm:px-6 lg:px-0">
                  No more{" "}
                  {activeFilter === "all" ? "projects" : activeFilterLabel.toLowerCase()}{" "}
                  projects to show.
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Projects;