import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeader from "../components/SectionHeader";

const ContactPage = ({ isDarkMode }) => {
    const formRef = useRef();

    const [contactMethod, setContactMethod] = useState("email");
    const [status, setStatus] = useState("idle");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // =====================================================
    // CONFIGURATION
    // =====================================================

    const WHATSAPP_NUMBER = "9779763290022";

    const SOCIALS = {
        facebook: "https://facebook.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        github: "https://github.com/SharwanKunwar",
    };

    // =====================================================
    // FORM HANDLERS
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();

        setStatus("sending");

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setStatus("success");

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });

                setTimeout(() => {
                    setStatus("idle");
                }, 4000);
            })
            .catch((error) => {
                console.error("EmailJS error:", error);

                setStatus("error");

                setTimeout(() => {
                    setStatus("idle");
                }, 4000);
            });
    };

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();

        const text = `Hi, I'm ${formData.name} (${formData.email}).

${formData.message}`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            text
        )}`;

        window.open(url, "_blank");
    };

    // =====================================================
    // STYLES
    // =====================================================

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border ${isDarkMode
            ? "bg-white/5 border-white/10 text-white placeholder-neutral-600 focus:border-white/30"
            : "bg-black/5 border-black/10 text-black placeholder-neutral-400 focus:border-black/30"
        }`;

    const labelClass = `block text-xs font-medium mb-2 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
        }`;

    const buttonClass = `flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isDarkMode
            ? "bg-white text-black hover:bg-neutral-200"
            : "bg-black text-white hover:bg-neutral-800"
        }`;

    const socialClass = `h-9 w-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1 ${isDarkMode
            ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white hover:text-black"
            : "bg-black/5 border-black/10 text-neutral-700 hover:bg-black hover:text-white"
        }`;

    return (
        <section className="mb-16">
            {/* =====================================================
          HEADER
      ====================================================== */}

            <SectionHeader
                eyebrow="Get In Touch"
                title="Contact Me"
                description="Have a project, question, or just want to say hi? My inbox is open."
                isDarkMode={isDarkMode}
            />

            {/* =====================================================
          CONTACT CARD
      ====================================================== */}

            <div
                className={`rounded-2xl border p-6 md:p-8 ${isDarkMode
                        ? "bg-black/20 border-white/10"
                        : "bg-white/40 border-black/10"
                    }`}
            >
                {/* =====================================================
            CONTACT METHOD TOGGLE
        ====================================================== */}

                <div
                    className={`inline-flex p-1 rounded-xl mb-6 border ${isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-black/5 border-black/10"
                        }`}
                >
                    {/* EMAIL BUTTON */}

                    <button
                        type="button"
                        onClick={() => {
                            setContactMethod("email");
                            setStatus("idle");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${contactMethod === "email"
                                ? isDarkMode
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                : isDarkMode
                                    ? "text-neutral-400 hover:text-white"
                                    : "text-neutral-500 hover:text-black"
                            }`}
                    >
                        {/* Email Icon */}

                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>

                        Email
                    </button>

                    {/* WHATSAPP BUTTON */}

                    <button
                        type="button"
                        onClick={() => {
                            setContactMethod("whatsapp");
                            setStatus("idle");
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${contactMethod === "whatsapp"
                                ? isDarkMode
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                : isDarkMode
                                    ? "text-neutral-400 hover:text-white"
                                    : "text-neutral-500 hover:text-black"
                            }`}
                    >
                        {/* WhatsApp Icon */}

                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.24-1.37a9.9 9.9 0 004.8 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.96 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.75-.16 1.43z" />
                        </svg>

                        WhatsApp
                    </button>
                </div>

                {/* =====================================================
            EMAIL FORM
        ====================================================== */}

                {contactMethod === "email" && (
                    <form
                        ref={formRef}
                        onSubmit={handleEmailSubmit}
                        className="space-y-5"
                    >
                        {/* NAME + EMAIL */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* NAME */}

                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={inputClass}
                                />
                            </div>

                            {/* EMAIL */}

                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    Your Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* MESSAGE */}

                        <div>
                            <label htmlFor="message" className={labelClass}>
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project or just say hello..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* SUBMIT */}

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode
                                        ? "bg-white text-black hover:bg-neutral-200"
                                        : "bg-black text-white hover:bg-neutral-800"
                                    }`}
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>

                            {/* SUCCESS */}

                            {status === "success" && (
                                <span className="text-sm text-green-500 font-medium">
                                    Message sent! I'll get back to you soon.
                                </span>
                            )}

                            {/* ERROR */}

                            {status === "error" && (
                                <span className="text-sm text-red-500 font-medium">
                                    Something went wrong. Please try again.
                                </span>
                            )}
                        </div>
                    </form>
                )}

                {/* =====================================================
            WHATSAPP FORM
        ====================================================== */}

                {contactMethod === "whatsapp" && (
                    <form
                        onSubmit={handleWhatsAppSubmit}
                        className="space-y-5"
                    >
                        {/* NAME + EMAIL */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* NAME */}

                            <div>
                                <label htmlFor="wa-name" className={labelClass}>
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    id="wa-name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={inputClass}
                                />
                            </div>

                            {/* EMAIL */}

                            <div>
                                <label htmlFor="wa-email" className={labelClass}>
                                    Your Email
                                </label>

                                <input
                                    type="email"
                                    id="wa-email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* MESSAGE */}

                        <div>
                            <label htmlFor="wa-message" className={labelClass}>
                                Message
                            </label>

                            <textarea
                                id="wa-message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project or just say hello..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* WHATSAPP BUTTON */}

                        <button
                            type="submit"
                            className={buttonClass}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.24-1.37a9.9 9.9 0 004.8 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.96 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.75-.16 1.43z" />
                            </svg>

                            Open in WhatsApp
                        </button>
                    </form>
                )}

                {/* =====================================================
            SOCIAL LINKS
        ====================================================== */}

                <div
                    className={`mt-8 pt-6 border-t flex items-center gap-4 ${isDarkMode
                            ? "border-white/10"
                            : "border-black/10"
                        }`}
                >
                    <span
                        className={`text-xs font-medium ${isDarkMode
                                ? "text-neutral-500"
                                : "text-neutral-500"
                            }`}
                    >
                        Find me on
                    </span>

                    <div className="flex items-center gap-3">
                        {/* FACEBOOK */}

                        <a
                            href={SOCIALS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className={socialClass}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
                            </svg>
                        </a>

                        {/* LINKEDIN */}

                        <a
                            href={SOCIALS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className={socialClass}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 11.02-4.13 2.07 2.07 0 01-.02 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
                            </svg>
                        </a>

                        {/* GITHUB */}

                        <a
                            href={SOCIALS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className={socialClass}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .28.18.61.69.5A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;