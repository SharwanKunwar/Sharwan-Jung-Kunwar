import { useContext, useState, useEffect } from 'react';
import { Container } from '../components/Container';
import { DarkModeContext } from '../context/DarkModeContext.js';
import { Button } from 'antd';
import { ProjectDetails } from '../data/ProjectDetails'
import BigProjectCard from '../components/BigProjectCard';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'full-stack', label: 'Full Stack' },
  { id: 'ui-design', label: 'UI Designs' },
  { id: 'frontend', label: 'Frontend Only' },
];

function Projects() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeFilter, setActiveFilter] = useState('all');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? ProjectDetails
    : ProjectDetails.filter((project) => project.category === activeFilter);
  const allLoaded = visibleCount >= filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(4);
  };

  return (
    <Container>
      <div className='w-full pt-20 sm:pt-24 lg:pt-25 flex flex-col justify-center items-center gap-4'>

        <h1 className={`text-2xl sm:text-3xl font-medium text-start w-full lg:w-[95%] lg:mt-3 ${isDarkMode && "text-white"}`}>
          {filters.find((filter) => filter.id === activeFilter)?.label} Projects
        </h1>

        <div className="w-full lg:w-[95%]">
          <div className="flex flex-wrap gap-2 sm:gap-3 pb-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${isActive
                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm'
                    : isDarkMode
                      ? 'border-white/25 bg-white/5 text-white hover:bg-white/15'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-indigo-400 hover:text-indigo-600'
                    }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:gap-10 py-3">
            {filteredProjects.slice(0, visibleCount).map((item) => (
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
        </div>

        <div className="text-center my-10">
          {!allLoaded ? (
            <Button onClick={handleLoadMore}>Load More</Button>
          ) : (
            <p className='underline text-neutral-400 italic px-2 sm:px-6 lg:px-0'>
              No more {activeFilter === 'all' ? 'projects' : filters.find((filter) => filter.id === activeFilter)?.label.toLowerCase()} projects to show.
            </p>
          )}
        </div>

      </div>
    </Container>
  );
}

export default Projects;
