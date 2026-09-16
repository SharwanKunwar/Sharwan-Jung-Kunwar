import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    MessageCircle,
    Send,
    CheckCircle2,
    XCircle,
    Copy,
    Check,
    Facebook,
    Linkedin,
    Github,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const ContactPage = ({ isDarkMode }) => {
    const formRef = useRef();

    const [contactMethod, setContactMethod] = useState("email");
    const [status, setStatus] = useState("idle");
    const [copied, setCopied] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // =====================================================
    // CONFIGURATION
    // =====================================================

    const WHATSAPP_NUMBER = "9779763290022";
    const DIRECT_EMAIL = "you@example.com"; // swap for your real address
    const MESSAGE_LIMIT = 500;

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

        if (name === "message" && value.length > MESSAGE_LIMIT) return;

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
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 4000);
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            });
    };

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();

        const text = `Hi, I'm ${formData.name} (${formData.email}).\n\n${formData.message}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(DIRECT_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard blocked — silently ignore, button still shows the address
        }
    };

    // =====================================================
    // STYLES
    // =====================================================

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border ${isDarkMode
        ? "bg-white/5 border-white/10 text-white placeholder-neutral-600 focus:border-white/30 focus:bg-white/[0.07]"
        : "bg-black/5 border-black/10 text-black placeholder-neutral-400 focus:border-black/30 focus:bg-black/[0.03]"
        }`;

    const labelClass = `block text-xs font-medium mb-2 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
        }`;

    const socialClass = `group relative h-9 w-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1 ${isDarkMode
        ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white hover:text-black"
        : "bg-black/5 border-black/10 text-neutral-700 hover:bg-black hover:text-white"
        }`;

    const tooltipClass = `pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"
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
                className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 ${isDarkMode
                    ? "bg-black/20 border-white/10"
                    : "bg-white/40 border-black/10"
                    }`}
            >
                {/* Decorative glow */}
                <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl ${isDarkMode ? "bg-white/[0.04]" : "bg-black/[0.03]"
                        }`}
                />

                {/* =====================================================
            AVAILABILITY + TOGGLE ROW
        ====================================================== */}

                <div className="relative flex items-center justify-between flex-wrap gap-4 mb-6">
                    {/* METHOD TOGGLE — sliding pill via layoutId */}
                    <div
                        className={`relative inline-flex p-1 rounded-xl border ${isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-black/5 border-black/10"
                            }`}
                    >
                        {["email", "whatsapp"].map((method) => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => {
                                    setContactMethod(method);
                                    setStatus("idle");
                                }}
                                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${contactMethod === method
                                    ? isDarkMode
                                        ? "text-black"
                                        : "text-white"
                                    : isDarkMode
                                        ? "text-neutral-400 hover:text-white"
                                        : "text-neutral-500 hover:text-black"
                                    }`}
                            >
                                {contactMethod === method && (
                                    <motion.span
                                        layoutId="contact-toggle-pill"
                                        className={`absolute inset-0 -z-10 rounded-lg ${isDarkMode ? "bg-white" : "bg-black"
                                            }`}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {method === "email" ? (
                                    <Mail size={15} />
                                ) : (
                                    <MessageCircle size={15} />
                                )}
                                {method === "email" ? "Email" : "WhatsApp"}
                            </button>
                        ))}
                    </div>

                    {/* AVAILABILITY BADGE */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span
                            className={`text-xs font-medium ${isDarkMode ? "text-neutral-400" : "text-neutral-600"
                                }`}
                        >
                            Usually replies within 24h
                        </span>
                    </div>
                </div>

                {/* =====================================================
            FORMS
        ====================================================== */}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={contactMethod}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <form
                            ref={contactMethod === "email" ? formRef : undefined}
                            onSubmit={
                                contactMethod === "email"
                                    ? handleEmailSubmit
                                    : handleWhatsAppSubmit
                            }
                            className="space-y-5"
                        >
                            {/* NAME + EMAIL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="message" className="!mb-0 block text-xs font-medium">
                                        <span className={isDarkMode ? "text-neutral-400" : "text-neutral-600"}>
                                            Message
                                        </span>
                                    </label>
                                    <span
                                        className={`text-[11px] tabular-nums ${formData.message.length > MESSAGE_LIMIT * 0.9
                                            ? "text-amber-500"
                                            : isDarkMode
                                                ? "text-neutral-600"
                                                : "text-neutral-400"
                                            }`}
                                    >
                                        {formData.message.length}/{MESSAGE_LIMIT}
                                    </span>
                                </div>
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

                            {/* SUBMIT ROW */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode
                                        ? "bg-white text-black hover:bg-neutral-200"
                                        : "bg-black text-white hover:bg-neutral-800"
                                        }`}
                                >
                                    {status === "sending" ? (
                                        <>
                                            <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            Sending...
                                        </>
                                    ) : contactMethod === "email" ? (
                                        <>
                                            <Send size={15} />
                                            Send Message
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle size={15} />
                                            Open in WhatsApp
                                        </>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-center gap-1.5 text-sm text-green-500 font-medium"
                                        >
                                            <CheckCircle2 size={16} />
                                            Message sent! I'll get back to you soon.
                                        </motion.span>
                                    )}
                                    {status === "error" && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-center gap-1.5 text-sm text-red-500 font-medium"
                                        >
                                            <XCircle size={16} />
                                            Something went wrong. Please try again.
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>

                {/* =====================================================
            FOOTER: DIRECT EMAIL + SOCIALS
        ====================================================== */}

                <div
                    className={`relative mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${isDarkMode ? "border-white/10" : "border-black/10"
                        }`}
                >
                    {/* Click-to-copy direct email */}
                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`flex items-center gap-2 text-xs font-medium transition-colors ${isDarkMode
                            ? "text-neutral-500 hover:text-white"
                            : "text-neutral-500 hover:text-black"
                            }`}
                    >
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        {copied ? "Copied!" : DIRECT_EMAIL}
                    </button>

                    <div className="flex items-center gap-3">
                        <a
                            href={SOCIALS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className={socialClass}
                        >
                            <Facebook size={15} />
                            <span className={tooltipClass}>Facebook</span>
                        </a>
                        <a
                            href={SOCIALS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className={socialClass}
                        >
                            <Linkedin size={15} />
                            <span className={tooltipClass}>LinkedIn</span>
                        </a>

                        <a
                            href={SOCIALS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className={socialClass}
                        >
                            <Github size={15} />
                            <span className={tooltipClass}>GitHub</span>
                        </a>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default ContactPage;