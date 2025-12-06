'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- CONFIG --
const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'services', label: 'Services' },
  { id: 'connect', label: 'Connect' },
];

const DESKTOP_NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Connect', href: '/#connect' },
];

// --- ICONS ---
const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0.5C5.648 0.5 0.5 5.648 0.5 12c0 5.086 3.292 9.386 7.868 10.907.575.106.786-.25.786-.556 0-.274-.01-1.002-.015-1.966-3.2.695-3.878-1.542-3.878-1.542-.523-1.33-1.276-1.685-1.276-1.685-1.043-.713.079-.699.079-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.693 1.25 3.35.957.104-.743.402-1.25.73-1.538-2.553-.29-5.236-1.276-5.236-5.68 0-1.255.45-2.282 1.184-3.086-.119-.29-.513-1.458.112-3.04 0 0 .966-.309 3.168 1.18.918-.255 1.902-.383 2.88-.388.978.005 1.962.133 2.882.388 2.2-1.489 3.165-1.18 3.165-1.18.626 1.582.233 2.75.114 3.04.737.804 1.183 1.831 1.183 3.086 0 4.415-2.688 5.387-5.25 5.672.413.355.78 1.057.78 2.133 0 1.54-.014 2.78-.014 3.158 0 .309.208.668.792.554C20.21 21.382 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5z"
    />
  </svg>
);

export default function ProjectHeader() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Reusing the Profile Card UI
  const DrawerProfile = () => (
    <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-5 shadow-md shadow-black/40">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-900">
        <Image
          src="/ishan.jpg"
          alt="Ishan Gupta"
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-lg font-semibold text-slate-100">Ishan Gupta</p>
        <p className="text-xs text-slate-400">Full-Stack &amp; Mobile Dev</p>
      </div>
      <div className="mt-3 flex gap-3">
        <a
          href="https://github.com/CoderIshanGupta"
          target="_blank"
          rel="noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          aria-label="GitHub"
        >
          <GithubIcon className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/ishan-gupta-962a07285/"
          target="_blank"
          rel="noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          aria-label="LinkedIn"
        >
          in
        </a>
      </div>
      <a
        href="/ishan-gupta-resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-4 w-full rounded-full border border-cyan-400 px-4 py-1.5 text-center text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-slate-950"
      >
        Resume
      </a>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo / Name */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-cyan-400 transition-opacity hover:opacity-80"
          >
            Ishan Gupta
          </Link>

          {/* Desktop Nav (Simple Top Bar) */}
          <nav className="hidden items-center gap-8 md:flex">
            {DESKTOP_NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-base font-medium text-slate-300 transition-colors hover:text-cyan-400"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.label}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute -bottom-1 left-0 block h-[2px] w-full bg-cyan-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ originX: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}

            <a
              href="/ishan-gupta-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-full border border-cyan-400 px-6 py-2 text-sm font-semibold text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-slate-950"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay (Left Slide-in) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={closeMobileMenu} 
            />
            
            {/* Drawer Content (Left Side) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[280px] h-full bg-slate-950 border-r border-slate-800 p-6 overflow-y-auto flex flex-col gap-6"
            >
              <div className="flex justify-end">
                <button onClick={closeMobileMenu} className="p-2 text-slate-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Profile Card inside Drawer */}
              <DrawerProfile />

              {/* Vertical Nav with Dots (linking to Home Anchors) */}
              <nav>
                <ul className="relative flex flex-col gap-4 pl-4 before:absolute before:left-1.5 before:top-0 before:h-full before:w-px before:bg-slate-800">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`/#${section.id}`}
                        onClick={closeMobileMenu}
                        className="group flex items-center gap-3"
                      >
                        <span className="relative z-10 h-3 w-3 rounded-full border border-slate-600 bg-slate-950 transition-colors group-hover:border-cyan-400" />
                        <span className="text-sm font-medium uppercase tracking-wide text-slate-400 transition-colors group-hover:text-cyan-400">
                          {section.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}