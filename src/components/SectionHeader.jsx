const SectionHeader = ({ eyebrow, title, description, isDarkMode }) => {
    return (
        <div className="mb-8">
            {eyebrow && (
                <p
                    className={`text-xs font-semibold tracking-widest uppercase mb-2 ${isDarkMode ? "text-neutral-400" : "text-neutral-500"
                        }`}
                >
                    {eyebrow}
                </p>
            )}

            <h2
                className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"
                    }`}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={`text-sm md:text-base max-w-xl ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;