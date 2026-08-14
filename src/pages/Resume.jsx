import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { DarkModeContext } from '../context/DarkModeContext.js'

function Resume() {
  const { isDarkMode } = useContext(DarkModeContext)

  const experiences = [
    {
      date: 'Aug, 2026 — Current',
      title: 'Backend Development',
      stack: ['Java', 'Spring Boot', 'Hibernate', 'PostgreSQL'],
      description:
        'I started with Java, then moved to Spring Boot for REST APIs. I learned Hibernate, JPA, and PostgreSQL, along with backend architecture, validation, authentication, JWT, and API integration.',
      points: [
        'Building REST APIs with Spring Boot',
        'Working with JPA, Hibernate, and PostgreSQL',
        'Designing Controller, Service, and Repository architecture',
        'Implementing authentication, validation, and JWT',
      ],
      current: true,
    },
    {
      date: 'July, 2025',
      title: 'Frontend Development',
      stack: ['JavaScript', 'ReactJS', 'Next.js', 'Tailwind CSS'],
      description:
        'I began my frontend journey with HTML, CSS, and JavaScript, building simple static pages. Later, I explored React and Next.js, which transformed the way I build modern web interfaces.',
      points: [
        'Built responsive interfaces with React and Next.js',
        'Styled applications using Tailwind CSS',
        'Added smooth animations with Framer Motion',
        'Implemented interactive navigation and modern UI patterns',
      ],
    },
    {
      date: 'Before 2025',
      title: 'Exploring Programming',
      stack: ['C', 'Java', 'DSA', 'Problem Solving'],
      description:
        'I started by learning programming fundamentals with C and Java. This stage helped me develop problem-solving skills, understand core programming concepts, and build a strong foundation for software development.',
      points: [
        'Practiced programming fundamentals and OOP',
        'Worked with data structures and algorithms',
        'Built small management systems and utilities',
        'Developed problem-solving and logical thinking skills',
      ],
    },
  ]

  const education = [
    {
      date: '2081 — 2084',
      title: 'RR Campus [TU]',
      subtitle: "Bachelor's Student — BCA",
      description:
        'Currently pursuing a Bachelor of Computer Applications, focusing on academic growth, programming, hands-on projects, coding events, and continuous technical development.',
    },
    {
      date: '2076 — 2078',
      title: 'DLMSS — KAILALI',
      subtitle: 'High School Diploma — +2',
      description:
        'Graduated with a strong academic foundation while participating in extracurricular activities and developing an early interest in technology and programming.',
    },
  ]

  return (
    <section
      aria-labelledby="resume-heading"
      className={`w-full py-10 md:py-16 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-neutral-900'
        }`}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="max-w-5xl mx-auto px-5 md:px-8">

        <motion.div
          initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p
            className={`text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-3 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}
          >
            My Journey
          </p>

          <h2
            id="resume-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Resume
          </h2>

          <p
            className={`mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}
          >
            A timeline of my journey from programming fundamentals
            to frontend and backend development.
          </p>
        </motion.div>

        {/* =====================================================
            WORK EXPERIENCE
        ====================================================== */}

        <div className="mb-20">

          <motion.div
            initial={{ y: 15, opacity: 0, filter: 'blur(5px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p
              className={`text-xs tracking-[0.25em] uppercase font-semibold mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}
            >
              Experience
            </p>

            <h3 className="text-2xl md:text-3xl font-bold">
              Work Experience
            </h3>

            <p
              className={`mt-2 text-sm ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}
            >
              From learning the fundamentals to building complete applications.
            </p>
          </motion.div>

          <div className="relative">

            {/* Timeline line */}
            <div
              className={`absolute left-[9px] md:left-[11px] top-2 bottom-2 w-px ${isDarkMode ? 'bg-white/10' : 'bg-black/10'
                }`}
            />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience.title}
                  initial={{
                    y: 50,
                    opacity: 0,
                    filter: 'blur(4px)',
                  }}
                  whileInView={{
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative pl-9 md:pl-12"
                >

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[19px] h-[19px] rounded-full border-4 ${experience.current
                      ? isDarkMode
                        ? 'bg-indigo-500 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                        : 'bg-indigo-600 border-indigo-100 shadow-[0_0_20px_rgba(79,70,229,0.25)]'
                      : isDarkMode
                        ? 'bg-neutral-800 border-neutral-600'
                        : 'bg-white border-neutral-300'
                      }`}
                  />

                  <div
                    className={`rounded-2xl border p-5 md:p-7 transition-all duration-300 ${isDarkMode
                      ? 'border-white/10 bg-white/[0.025] hover:bg-white/[0.045] hover:border-white/15'
                      : 'border-black/[0.08] bg-black/[0.015] hover:bg-black/[0.025] hover:border-black/15'
                      }`}
                  >

                    {/* Date + Current */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold tracking-wide ${isDarkMode
                          ? 'text-indigo-400'
                          : 'text-indigo-600'
                          }`}
                      >
                        {experience.date}
                      </span>

                      {experience.current && (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${isDarkMode
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-400/20'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}
                        >
                          Current
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl md:text-2xl font-bold">
                      {experience.title}
                    </h4>

                    {/* Technology badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.stack.map((technology) => (
                        <span
                          key={technology}
                          className={`px-3 py-1.5 rounded-full text-xs border ${isDarkMode
                            ? 'border-white/10 bg-white/5 text-neutral-300'
                            : 'border-black/10 bg-black/[0.03] text-neutral-600'
                            }`}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Story */}
                    <p
                      className={`mt-5 text-sm leading-7 max-w-3xl ${isDarkMode
                        ? 'text-neutral-400'
                        : 'text-neutral-600'
                        }`}
                    >
                      {experience.description}
                    </p>

                    {/* Focus */}
                    <div className="mt-6">
                      <p
                        className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDarkMode
                          ? 'text-neutral-300'
                          : 'text-neutral-700'
                          }`}
                      >
                        What I focused on
                      </p>

                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {experience.points.map((point) => (
                          <li
                            key={point}
                            className={`flex items-start gap-2 text-sm ${isDarkMode
                              ? 'text-neutral-400'
                              : 'text-neutral-600'
                              }`}
                          >
                            <span
                              className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isDarkMode
                                ? 'bg-indigo-400'
                                : 'bg-indigo-600'
                                }`}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            EDUCATION
        ====================================================== */}

        <div>

          <motion.div
            initial={{ y: 15, opacity: 0, filter: 'blur(5px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p
              className={`text-xs tracking-[0.25em] uppercase font-semibold mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}
            >
              Academic Journey
            </p>

            <h3 className="text-2xl md:text-3xl font-bold">
              Education
            </h3>

            <p
              className={`mt-2 text-sm ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}
            >
              The academic foundation behind my technical journey.
            </p>
          </motion.div>

          <div className="relative">

            {/* Timeline line */}
            <div
              className={`absolute left-[9px] md:left-[11px] top-2 bottom-2 w-px ${isDarkMode ? 'bg-white/10' : 'bg-black/10'
                }`}
            />

            <div className="space-y-10">
              {education.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{
                    y: 50,
                    opacity: 0,
                    filter: 'blur(4px)',
                  }}
                  whileInView={{
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative pl-9 md:pl-12"
                >

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[19px] h-[19px] rounded-full border-4 ${isDarkMode
                      ? 'bg-neutral-800 border-neutral-600'
                      : 'bg-white border-neutral-300'
                      }`}
                  />

                  <div
                    className={`rounded-2xl border p-5 md:p-7 transition-all duration-300 ${isDarkMode
                      ? 'border-white/10 bg-white/[0.025] hover:bg-white/[0.045]'
                      : 'border-black/[0.08] bg-black/[0.015] hover:bg-black/[0.025]'
                      }`}
                  >

                    <p
                      className={`text-xs font-semibold tracking-wide ${isDarkMode
                        ? 'text-indigo-400'
                        : 'text-indigo-600'
                        }`}
                    >
                      {item.date}
                    </p>

                    <h4 className="text-xl md:text-2xl font-bold mt-2">
                      {item.title}
                    </h4>

                    <p
                      className={`text-sm font-medium mt-1 ${isDarkMode
                        ? 'text-neutral-300'
                        : 'text-neutral-700'
                        }`}
                    >
                      {item.subtitle}
                    </p>

                    <p
                      className={`mt-4 text-sm leading-7 max-w-3xl ${isDarkMode
                        ? 'text-neutral-400'
                        : 'text-neutral-600'
                        }`}
                    >
                      {item.description}
                    </p>

                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Resume