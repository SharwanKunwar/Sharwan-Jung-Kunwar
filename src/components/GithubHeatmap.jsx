import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { DarkModeContext } from "../context/DarkModeContext.js";

function GithubHeatmap({ date }) {
  const { isDarkMode } = React.useContext(DarkModeContext);
  return (
    <>
      <div
        className={`mt-7 md:flex flex-col hidden rounded-2xl border p-4 md:p-5 overflow-hidden ${isDarkMode
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
            {date}
          </span>
        </div>

        <div className="flex justify-center items-center overflow-x-auto pb-2">
          <GitHubCalendar
            username={"SharwanKunwar"}
            year={date}
          />
        </div>
      </div>

    </>
  );
}

export default GithubHeatmap;