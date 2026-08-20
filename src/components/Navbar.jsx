import React, { useRef, useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext.js';
import { Button, Input, Modal } from 'antd';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(() => window.innerWidth >= 768);
  const [hovered, setHovered] = useState(null);
  const [hoverRect, setHoverRect] = useState({ width: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const navRefs = useRef([]);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [openFriend, setOpenFriend] = useState(false);
  const [broCode, setBroCode] = useState("");
  const navigate = useNavigate();

  /* =========================
     🔥 Natural Haptic Engine
  ========================== */
  const vibrate = (pattern) => {
    if (!navigator.vibrate) return;
    navigator.vibrate(pattern);
  };

  const haptic = {
    tap: () => vibrate(15),                  // micro tap
    soft: () => vibrate(30),                 // light tap
    openMenu: () => vibrate(35),
    closeMenu: () => vibrate(20),
    success: () => vibrate([30, 20, 80]),
    error: () => vibrate([80, 40, 120]),
  };

  const navItems = [
    { title: 'Home', url: '/home' },
    { title: 'Projects', url: '/projects' },
    { title: 'Contact', url: '/contactPage' },
    { title: 'MySelf', url: '/mySelf' },
  ];

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleBreakpointChange = (event) => setIsMdScreen(event.matches);

    setIsMdScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleBreakpointChange);
    return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  /* Disable background scroll */
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleMouseEnter = (index) => {
    const rect = navRefs.current[index].getBoundingClientRect();
    setHoverRect({ width: rect.width, left: navRefs.current[index].offsetLeft });
    setHovered(index);
  };

  const handleLogoClick = () => {
    haptic.soft();
    setOpenFriend(true);
  };

  const closeMobileMenu = () => {
    haptic.closeMenu();
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && open) closeMobileMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const checkCode = () => {
    haptic.tap();

    const passCode = "#include<07>";

    if (passCode === broCode) {
      haptic.success();
      navigate("/music");
      setBroCode("");
      setOpenFriend(false);
    } else {
      haptic.error();
      alert(`Bro code is not matched !! \n Contact Admin to explore`);
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-2 z-100 flex justify-center md:max-w-6xl md:mx-auto">
        <motion.nav
          animate={{
            boxShadow: scrolled
              ? isDarkMode
                ? '0px 4px 10px rgba(255,255,255,0.3)'
                : '0px 4px 10px rgba(0,0,0,0.3)'
              : 'none',
            borderRadius: scrolled ? 100 : 0,
            y: scrolled ? 10 : 0,
            width: scrolled ? (isMdScreen ? '85%' : '90%') : '100%',


          }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="w-full flex items-center justify-between px-3 py-2 backdrop-blur-2xl"
        >
          {/* Logo */}
          <motion.img
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 3600 }}
            src="/icons/logo.gif"
            alt="Antigravity Logo"
            onClick={handleLogoClick}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogoClick() }}
            role="button"
            tabIndex={0}
            aria-label="Open secret menu"
            className="h-12 w-12 rounded-full bg-blue-200 p-0.5 object-cover mastShadow cursor-pointer focus-visible:outline-indigo-400"
          />

          <div className="flex gap-3 items-center">

            {/* Mobile Menu --------------------------*/}
            <div className="md:hidden flex items-center">
              <button
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => {
                  haptic.openMenu();
                  setOpen(true);
                }}
                className="grid h-11 w-11 place-items-center rounded-full border border-neutral-900/15 bg-white/50 shadow-sm backdrop-blur-xl focus-visible:outline-indigo-400 dark:border-white/20 dark:bg-neutral-900/50"
              >
                <Menu className={`h-6 w-6 ${isDarkMode ? "text-white" : "text-neutral-900"}`} />
              </button>
            </div>

            {/* Desktop Nav */}
            <div
              className="relative md:flex space-x-6 items-center hidden"
              onMouseLeave={() => setHovered(null)}
            >
              {hovered !== null && (
                <motion.div
                  layout
                  className={`absolute top-0 h-full rounded-md z-0 ${isDarkMode ? "bg-neutral-400" : "bg-slate-300"}`}
                  initial={false}
                  animate={{ width: hoverRect.width, left: hoverRect.left }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {navItems.map((item, index) => (
                <Link
                  key={index}
                  ref={(el) => (navRefs.current[index] = el)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={haptic.tap}
                  to={item.url}
                  className={`relative px-2 py-2 text-sm z-10 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => {
                haptic.tap();
                toggleDarkMode();
              }}
              className={`rounded-full w-10 h-10 mastBlueShadow hidden md:flex justify-center items-center focus-visible:outline-indigo-400 ${isDarkMode && "mastOrangeShadow"}`}
            >
              {isDarkMode ? <FaSun color='gold' size={20} /> : <FaMoon color='black' size={20} />}
            </button>

          </div>
        </motion.nav>



        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] flex items-start justify-center bg-white/75 px-4 pt-5 backdrop-blur-xl dark:bg-neutral-950/80 md:hidden"
              onClick={closeMobileMenu}
            >
              <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                className="w-full max-w-sm overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/90 p-3 shadow-2xl dark:border-white/15 dark:bg-neutral-900/95"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-white">Menu</span>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Toggle dark mode"
                      onClick={() => {
                        haptic.tap();
                        toggleDarkMode();
                      }}
                      className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 focus-visible:outline-indigo-400 dark:bg-white/10"
                    >
                      {isDarkMode ? <FaSun color="gold" size={20} /> : <FaMoon color="black" size={18} />}
                    </button>
                    <button
                      aria-label="Close menu"
                      onClick={closeMobileMenu}
                      className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-900 focus-visible:outline-indigo-400 dark:bg-white/10 dark:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <nav className="mt-4" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.url}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.06 }}
                      >
                        <Link
                          to={item.url}
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between rounded-2xl border border-neutral-900/10 bg-neutral-50 px-5 py-4 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        >
                          {item.title}
                          <ChevronRight className="h-5 w-5 opacity-60" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>









        {/* Secret Modal */}
        <Modal
          open={openFriend}
          onCancel={() => {
            haptic.tap();
            setOpenFriend(false);
          }}
          footer={null}
        >
          <h1 className='text-lg font-medium mb-2'>Private Zone</h1>
          <Input
            value={broCode}
            onChange={(e) => setBroCode(e.target.value)}
            placeholder='Enter Bro code'
          />
          <Button onClick={checkCode} className='mt-2'>
            Check
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default Navbar;
