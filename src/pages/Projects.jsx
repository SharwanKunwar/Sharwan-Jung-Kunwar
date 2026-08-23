
import { useContext, useEffect, useState } from "react";
import { Button } from "antd";

import { Container } from "../components/Container";
import { DarkModeContext } from "../context/DarkModeContext.js";
import BigProjectCard from "../components/BigProjectCard";

const API_URL = "https://project-api-umber.vercel.app/api/projectDetails";

const filters = [
  { id: "all", label: "All" },
  { id: "full-stack", label: "Full Stack" },
  { id: "ui-design", label: "UI Designs Only" },
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
      : projects.filter(
        (project) => project.category === activeFilter
      );

  // Check whether all projects are visible
  const allLoaded = visibleCount >= filteredProjects.length;

  // Load 4 more projects
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Change filter
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setVisibleCount(4);
  };

  const activeFilterLabel =
    filters.find((filter) => filter.id === activeFilter)?.label || "All";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
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

      <Container>
        <div className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-25 flex flex-col justify-center items-center gap-4">

          {/* Page Heading */}
          <h1
            className={`text-2xl sm:text-3xl px-3 font-medium text-start w-full lg:w-[95%] lg:mt-3 ${isDarkMode ? "text-white" : ""
              }`}
          >
            {activeFilterLabel} Projects
          </h1>

          <div className="w-full lg:w-[95%]">

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pb-2 px-3">
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
              <div
                className={`py-10 text-center ${isDarkMode ? "text-white" : "text-neutral-600"
                  }`}
              >
                Loading projects...
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="py-10 text-center text-red-500">
                {error}
              </div>
            )}

            {/* Projects */}
            {!loading && !error && (
              <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:gap-10 py-3">
                {filteredProjects
                  .slice(0, visibleCount)
                  .map((item) => (
                    <BigProjectCard
                      key={item.id}
                      title={item.title}
                      img={item.imgUrl}
                      des={item.description}
                      SUrl={item.source}
                      PUrl={item.URL}
                      Stack={item.teck}
                      category={item.category}
                      dt={item.date}
                    />
                  ))}
              </div>
            )}

            {/* No Projects */}
            {!loading && !error && filteredProjects.length === 0 && (
              <p
                className={`text-center py-10 ${isDarkMode
                  ? "text-neutral-400"
                  : "text-neutral-500"
                  }`}
              >
                No projects found.
              </p>
            )}
          </div>

          {/* Load More */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="text-center my-10">
              {!allLoaded ? (
                <Button onClick={handleLoadMore}>
                  Load More
                </Button>
              ) : (
                <p className="underline text-neutral-400 italic px-2 sm:px-6 lg:px-0">
                  No more{" "}
                  {activeFilter === "all"
                    ? "projects"
                    : activeFilterLabel.toLowerCase()}{" "}
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

