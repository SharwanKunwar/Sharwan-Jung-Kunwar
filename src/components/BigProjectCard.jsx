import { motion } from "motion/react";
import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext.js";

function BigProjectCard(props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);

  const pillButtonClasses =
    "bg-white/30 backdrop-blur-2xl text-white rounded-lg font-medium px-2.5 py-1 lg:px-3.5 text-xs sm:text-sm transition-colors hover:bg-white/40";

  const ctaButtonClasses =
    "w-full border border-white/30 text-white font-medium py-1.5 rounded-lg hover:bg-indigo-600 bg-indigo-400 transition-colors text-center block text-sm";

  return (
    <motion.div
      initial={{ y: 5, filter: "blur(1px)" }}
      whileInView={{ y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className="relative inline-block w-full"
    >
      <div
        className={`relative rounded-lg border p-3 sm:p-4 transition-colors overflow-hidden ${isDarkMode
          ? "border-white/15 hover:border-blue-400"
          : "border-neutral-200 hover:border-blue-500"
          }`}
      >
        <img
          src={props.img}
          alt="ProjectImg"
          className="rounded-md bg-linear-to-br from-indigo-400 to-green-400 via-pink-400 mastShadow min-h-36 sm:min-h-44 lg:min-h-40 xl:min-h-44 object-cover overflow-hidden w-full"
        />
        <div className="flex justify-between items-baseline gap-2">
          <h1
            className={`mt-2 text-sm sm:text-base font-medium text-neutral-400 truncate ${isDarkMode ? "text-white" : ""
              }`}
          >
            {props.title}
          </h1>
          <h1
            className={`mt-2 text-xs sm:text-sm font-medium text-neutral-400 shrink-0 ${isDarkMode ? "text-white" : ""
              }`}
          >
            {props.dt}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          whileTap={{ opacity: 1 }}
          onClick={() => setShowOverlay((prev) => !prev)}
          transition={{ duration: 0.3 }}
          className="bg-black/40 backdrop-blur-2xl absolute inset-0 rounded-lg flex flex-col justify-center items-start text-white p-2 overflow-y-auto"
        >
          <div className="md:hidden w-full">
            <h1 className="text-lg sm:text-xl font-medium mb-1.5">{props.title}</h1>
            <p className="text-neutral-100 text-sm font-medium line-clamp-3">{props.des}</p>
            <div className="w-full mt-3 flex gap-2 flex-wrap">
              {props.Stack.map((item, index) => (
                <button key={index} type="button" className={pillButtonClasses}>
                  {item}
                </button>
              ))}
            </div>
            <div className="w-full flex justify-center items-center gap-3 mt-4">
              <a target="_blank" rel="noopener noreferrer" href={props.SUrl} className="w-6/12">
                <span className={ctaButtonClasses}>Source Code</span>
              </a>
              <a target="_blank" rel="noopener noreferrer" href={props.PUrl} className="w-6/12">
                <span className={ctaButtonClasses}>Live Preview</span>
              </a>
            </div>
          </div>

          <div className="hidden w-full h-full md:flex">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.5 }}
              className="backdrop-blur-sm w-full h-full flex flex-col justify-center rounded-2xl border border-white/30 shadow-sm p-4 lg:p-5"
            >
              <h1 className="text-xl lg:text-2xl xl:text-3xl text-shadow-sm font-medium mb-2">
                {props.title}
              </h1>

              <p className="text-neutral-200 text-sm font-medium line-clamp-4">{props.des}</p>

              <div className="w-full mt-4 flex gap-2 flex-wrap">
                {props.Stack.map((item, index) => (
                  <button key={index} type="button" className={pillButtonClasses}>
                    {item}
                  </button>
                ))}
              </div>

              <div className="w-full flex justify-center items-center gap-3 mt-5">
                <a target="_blank" rel="noopener noreferrer" href={props.SUrl} className="w-6/12">
                  <span className={ctaButtonClasses}>Source Code</span>
                </a>
                <a target="_blank" rel="noopener noreferrer" href={props.PUrl} className="w-6/12">
                  <span className={ctaButtonClasses}>Live Preview</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BigProjectCard;