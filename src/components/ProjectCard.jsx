import React from 'react';
import { Button } from 'antd';
import { motion } from 'motion/react';
import { useState, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext.js';

function ProjectCard(props) {
    const [showOverlay, setShowOverlay] = useState(false);
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative inline-block w-full ${isDarkMode ? 'rounded-xl' : 'rounded-sm'}`}
        >
            <div
                className={`relative rounded-lg border p-3 sm:p-4 transition-colors overflow-hidden ${isDarkMode
                    ? 'bg-gray-700 border-white/15 hover:border-blue-400'
                    : 'bg-neutral-50 border-neutral-200 hover:border-blue-500'
                    }`}
            >
                <img
                    loading="lazy"
                    src={props.img}
                    alt={props.title ? `${props.title} project preview` : 'Project preview'}
                    className="rounded-md bg-linear-to-br from-indigo-400 to-green-400 via-pink-400 mastShadow aspect-4/2 object-cover overflow-hidden w-full"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showOverlay ? 1 : 0 }}
                    whileTap={{ opacity: 1 }}
                    onClick={() => setShowOverlay((prev) => !prev)}
                    transition={{ duration: 0.3 }}
                    className="bg-black/30 backdrop-blur-2xl absolute inset-0 rounded-lg flex flex-col justify-center items-start text-white p-4 sm:p-5 overflow-y-auto"
                >
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2">{props.title}</h1>
                    <p className="text-neutral-100 text-sm font-medium line-clamp-3">{props.des}</p>

                    <div className="w-full mt-3 lg:mt-5 flex gap-2 flex-wrap">
                        {props.Stack.map((item, index) => (
                            <Button
                                key={index}
                                size="small"
                                className="bg-white/30! backdrop-blur-2xl! text-white! rounded-full! font-medium! lg:px-4!"
                            >
                                {item}
                            </Button>
                        ))}
                    </div>

                    <div className="w-full flex justify-center items-center gap-3 mt-4 lg:mt-5">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={props.SUrl}
                            className="w-6/12"
                            aria-label={`View source code for ${props.title}`}
                        >
                            <Button className="w-full border border-white/30 text-white font-medium py-1 rounded-full hover:bg-indigo-600 bg-indigo-400 transition-colors duration-300">
                                Source Code
                            </Button>
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={props.PUrl}
                            className="w-6/12"
                            aria-label={`View live preview for ${props.title}`}
                        >
                            <Button className="w-full border text-white font-medium border-white/30 py-1 rounded-full hover:bg-indigo-600 bg-indigo-400 transition-colors duration-300">
                                Live Preview
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div >
        </motion.div >
    );
}

export default ProjectCard;