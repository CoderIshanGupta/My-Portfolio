// app/page.tsx
'use client';

import { useEffect, useState, FormEvent } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'services', label: 'Services' },
  { id: 'connect', label: 'Connect' },
] as const;

const TITLES = [
  'Software Developer',
  'Full-Stack Developer',
  'Mobile App Developer',
  'MERN Stack Developer',
];

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

const LeetCodeIcon = (props: any) => (
  <Image
    src="/logos/leetcode.png" // or "/logos/leetcode.svg" if you use SVG
    alt="LeetCode"
    width={16}
    height={16}
    className={props.className}
  />
);

/* Hero variants */
const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/* Section reveal – original style, faster duration */
const sectionReveal = {
  hidden: { opacity: 0.25, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

type Certification = {
  issuer: string;
  title: string;
  date: string;
  url: string;
};

type Achievement = {
  title: string;
  org: string;
  year: string;
  type: string;
  description: string;
};

const Typewriter = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTitle = TITLES[titleIndex];
  const displayTitle = currentTitle.slice(0, charIndex);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentTitle.length, titleIndex]);

  return (
    <span className="text-lg sm:text-2xl font-semibold text-cyan-400 min-h-[32px] block">
      {displayTitle}
      <span className="ml-1 inline-block h-5 w-[2px] align-middle bg-cyan-400 animate-pulse" />
    </span>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // NEW: toast + submitting state
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const yHeroBgLeft = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yHeroBgRight = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const handleSpy = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleSpy);
    handleSpy();
    return () => window.removeEventListener('scroll', handleSpy);
  }, []);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Contact form submit – calls /api/contact and shows toast
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setToast({
          type: 'error',
          message: 'Failed to send message. Please try again later.',
        });
        setIsSubmitting(false);
        return;
      }

      setToast({
        type: 'success',
        message:
          'Message sent! I have received your message and emailed you a copy for your reference.',
      });
      form.reset();
      setIsSubmitting(false);
    } catch (error) {
      console.error('Contact form submit error:', error);
      setToast({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
      setIsSubmitting(false);
    }
  };

  const SidebarProfile = () => (
    <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-5 shadow-md shadow-black/40">
      <div className="relative h-24 w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-900">
        <Image
          src="/ishan.jpg"
          alt="Ishan Gupta"
          width={112}
          height={112}
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
        <a
          href="https://leetcode.com/u/CoderIshanGupta/"
          target="_blank"
          rel="noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          aria-label="LeetCode"
        >
          <LeetCodeIcon className="h-4 w-4" />
        </a>
      </div>
      <a
        href="/ishan-gupta-resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-4 w-full rounded-full border border-cyan-400 px-4 py-2 text-center text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-slate-950"
      >
        Resume
      </a>
    </div>
  );

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="pt-2">
      <ul className="relative flex flex-col gap-4 pl-4 before:absolute before:left-1.5 before:top-0 before:h-full before:w-px before:bg-slate-800">
        {SECTIONS.map((section) => {
          const active = activeSection === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={onItemClick}
                className="group flex items-center gap-3"
              >
                <span
                  className={
                    'relative z-10 h-3 w-3 rounded-full border transition-all duration-300 ' +
                    (active
                      ? 'border-cyan-400 bg-cyan-400'
                      : 'border-slate-600 bg-slate-950 group-hover:border-cyan-400')
                  }
                />
                <span
                  className={
                    'text-xs font-medium uppercase tracking-wide transition-colors duration-300 ' +
                    (active
                      ? 'text-cyan-400'
                      : 'text-slate-400 group-hover:text-cyan-400')
                  }
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const headerClassName =
    'sticky top-0 z-30 border-b backdrop-blur transition-colors lg:hidden ' +
    (isScrolled
      ? 'bg-slate-950/95 border-slate-800 shadow-sm shadow-black/40'
      : 'bg-slate-950/70 border-slate-900');

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const certifications: Certification[] = [
    { issuer: 'Oracle', title: 'Generative AI Professional', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DAA53B9D323D269A8BDE774666712D28C14E3407E086504E3BCCED43882A7B15' },
    { issuer: 'Oracle', title: 'DevOps Professional', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D4D54D364D292302A4E5970BC83CC22F2F1D8D535EFD4BE029837234A7661544' },
    { issuer: 'Oracle', title: 'Data Science Professional', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D4D54D364D292302A4E5970BC83CC22F54B8EFF13CB316E396D603CB29FE6490' },
    { issuer: 'ISC2', title: 'Certified in CyberSecurity', date: '11 Feb 2025', url: '#' },
    {
      issuer: 'freeCodeCamp',
      title: 'Scientific Computing with Python Developer',
      date: '23 Dec 2024',
      url: '#',
    },
    { issuer: 'Cyfrin', title: 'Blockchain Basics', date: '19 Aug 2025', url: '#' },
    { issuer: 'HackerRank', title: 'Python', date: '24 Dec 2024', url: '#' },
    { issuer: 'HackerRank', title: 'Java', date: '24 Dec 2024', url: '#' },
    { issuer: 'HackerRank', title: 'SQL Advanced', date: '4 Jan 2025', url: '#' },
    {
      issuer: 'HackerRank',
      title: 'Problem Solving (Intermediate)',
      date: '9 Jan 2025',
      url: '#',
    },
    {
      issuer: 'Google Cloud',
      title: 'Google Cloud Skill Boost Certifications',
      date: '2025',
      url: '#',
    },
  ];

  const achievements: Achievement[] = [
    {
      title: '2nd Place – Hackentine Hackathon',
      org: 'Coding Ninjas x Hack2Skill',
      year: '2024',
      type: 'Hackathon',
      description:
        'Built and pitched a project that secured 2nd position among competing teams.',
    },
    {
      title: 'Chief Technical Lead',
      org: 'Coding Ninjas KIIT Chapter',
      year: '2024–2025',
      type: 'Leadership',
      description:
        'Leading technical initiatives, mentoring peers and organizing coding events.',
    },
    {
      title: 'Flutter Domain Member',
      org: 'GDG KIIT',
      year: '2024–2025',
      type: 'Community',
      description:
        'Active in the Flutter domain, collaborating on mobile dev initiatives and events.',
    },
    {
      title: 'Legend Level – Cloud Arcade',
      org: 'Google Cloud Arcade Facilitator Program',
      year: '2025',
      type: 'Cloud',
      description:
        'Reached Legend Level (85+ points) by completing hands-on Google Cloud labs and quests.',
    },
    {
      title: 'Speaker – Google Cloud Study Jam 2025',
      org: 'Google Cloud / GDG KIIT',
      year: '2025',
      type: 'Speaking',
      description:
        'Delivered a session as part of the Google Cloud Study Jam, sharing cloud concepts and demos.',
    },
  ];

  const topAchievements = achievements.slice(0, 3);
  const topCerts = certifications.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Toast popup */}
      {/* Toast popup – centered box */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={
                'max-w-md w-full rounded-2xl border px-5 py-4 shadow-xl shadow-black/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 ' +
                (toast.type === 'success'
                  ? 'border-emerald-500/60'
                  : 'border-rose-500/60')
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={
                    'mt-1 h-2.5 w-2.5 rounded-full ' +
                    (toast.type === 'success' ? 'bg-emerald-400' : 'bg-rose-400')
                  }
                />
                <div className="flex-1 text-sm text-slate-100">
                  {toast.message}
                </div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="ml-2 text-xs text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE header */}
      <header className={headerClassName}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            onClick={() => window.scrollTo(0, 0)}
            className="text-2xl font-bold tracking-wide text-cyan-400"
          >
            Ishan Gupta
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[280px] h-full bg-slate-950 border-r border-slate-800 p-5 overflow-y-auto flex flex-col gap-2"
            >
              <button
                onClick={closeMobileMenu}
                className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white z-10"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="mt-8">
                <SidebarProfile />
              </div>
              <div className="pt-2">
                <SidebarNav onItemClick={closeMobileMenu} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-6xl gap-12 items-start">
          {/* Left sidebar (desktop only) */}
          <aside className="hidden w-64 shrink-0 lg:block self-start sticky top-8">
            <div className="flex flex-col gap-6 pb-4">
              <SidebarProfile />
              <SidebarNav />
            </div>
          </aside>

          {/* Main sections */}
          <div className="flex-1 space-y-24 min-w-0">
            {/* Hero */}
            <motion.section
              id="home"
              className="relative min-h-[60vh] scroll-mt-24 overflow-hidden rounded-3xl border border-slate-900 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/80 px-6 py-10 sm:px-10"
              variants={heroContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.div
                className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
                style={{ y: yHeroBgLeft }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                className="pointer-events-none absolute right-0 top-32 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
                style={{ y: yHeroBgRight }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              />

              <div className="relative flex flex-col-reverse gap-8 md:flex-row md:items-center">
                <div className="flex-1 space-y-6">
                  <motion.div variants={heroItem}>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                      Hello, I&apos;m
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                      Ishan Gupta
                    </h1>
                  </motion.div>

                  <div className="relative h-8 sm:h-9 overflow-hidden">
                    <Typewriter />
                  </div>

                  <motion.p
                    variants={heroItem}
                    className="max-w-xl text-lg text-slate-300 leading-relaxed"
                  >
                    I engineer scalable web and mobile solutions. From pixel-perfect UIs to
                    robust backends, I turn complex requirements into seamless digital
                    experiences, focusing on performance, security, and clean architecture.
                  </motion.p>

                  <motion.div variants={heroItem} className="flex flex-wrap gap-3">
                    <a
                      href="#projects"
                      className="rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-transform transition-colors hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      View Work
                    </a>
                    <a
                      href="#connect"
                      className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-400"
                    >
                      Let&apos;s Connect
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  variants={heroItem}
                  className="flex justify-center md:justify-end md:flex-1"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
                    className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60"
                  >
                    <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-2xl" />
                    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/50">
                      <Image
                        src="/ishan.jpg"
                        alt="Ishan Gupta"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* About */}
            <section id="about" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-9 w-1 rounded-full bg-cyan-500/80" />
                  <div className="rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                    <h2 className="text-2xl font-semibold text-cyan-400">About</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      A short snapshot of who I am
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-sm shadow-black/30">
                    <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-4">
                      The Story
                    </h3>
                    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                      <p>
                        I&apos;m a developer aiming for SDE, full-stack and mobile roles in
                        dynamic, innovative teams. My journey started with C and Java, but I
                        quickly fell in love with building tangible products using Flutter,
                        React Native, and modern web stacks.
                      </p>
                      <p>
                        I&apos;ve integrated backends with Firebase and SQL databases, and
                        I&apos;m currently exploring system design and cloud architectures. I
                        focus on writing clean, efficient code that scales.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-center">
                      <span className="text-3xl font-bold text-cyan-400">2+</span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Years Coding
                      </span>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-center">
                      <span className="text-3xl font-bold text-cyan-400">10+</span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Projects
                      </span>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-center">
                      <span className="text-3xl font-bold text-cyan-400">300+</span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        DSA Solved
                      </span>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-center">
                      <span className="text-3xl font-bold text-cyan-400">2nd</span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Hackathon Rank
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Skills */}
            <section id="skills" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold text-cyan-400">Skills</h2>
                  <p className="text-sm text-slate-400">
                    A quick overview of the languages, frameworks and tools I work with across
                    web, mobile, databases and security.
                  </p>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Programming Languages */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Programming Languages
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['C', 'Java', 'Python', 'Dart', 'Kotlin', 'SAP ABAP'].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Web Development */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Web Development
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        'HTML',
                        'CSS',
                        'JavaScript',
                        'TypeScript',
                        'React',
                        'Next.js',
                        'Bootstrap',
                        'Tailwind CSS',
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* App Development */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        App Development
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Flutter', 'React Native', 'Kotlin'].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend & APIs */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Backend &amp; APIs
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        'Node.js',
                        'Express.js',
                        'REST APIs',
                        'JWT Auth',
                        'Postman',
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Databases */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Databases
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Tools & Workflow */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Tools &amp; Workflow
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Git', 'GitHub', 'Linux', 'VS Code', 'Figma'].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Security */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                        Security Tools &amp; Techniques
                      </h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 'Steganography'].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm shadow-black/40"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Experience + Education */}
            <section id="experience" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.1 }}
              >
                {/* Experience header */}
                <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold text-cyan-400">Experience</h2>
                  <p className="text-sm text-slate-400">
                    Internships and roles where I&apos;ve applied my skills to real-world
                    projects.
                  </p>
                </div>

                {/* Experience timeline */}
                <div className="mt-6 space-y-6">
                  {/* BlueStock */}
                  <div className="relative pl-6">
                    <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                    <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                      <div className="flex items-start sm:items-stretch gap-4">
                        <div className="relative w-16 h-16 sm:w-40 sm:h-auto shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 sm:block">
                          <Image
                            src="/logos/bluestock.png"
                            alt="BlueStock Fintech"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-base md:text-lg font-bold text-slate-100">
                            BlueStock Fintech
                          </h3>
                          <div className="space-y-3">
                            <div className="rounded-xl bg-slate-900/70 p-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-medium text-slate-100">
                                  SDE Intern
                                </p>
                                <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-slate-300">
                                  Jun 2025 – Jul 2025
                                </span>
                              </div>
                              <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-slate-300">
                                <li>
                                  <span className="font-semibold text-slate-200">
                                    Stack:
                                  </span>{' '}
                                  React, Node.js, PostgreSQL, MongoDB, REST APIs, Git.
                                </li>
                                <li>
                                  Contributed to internal dashboards and tools used by the
                                  product team, improving visibility into platform activity.
                                </li>
                                <li>
                                  Refactored existing modules and followed code review and
                                  version control practices to keep the codebase maintainable.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* CodeClause */}
                  <div className="relative pl-6">
                    <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                    <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                      <div className="flex items-start sm:items-stretch gap-4">
                        <div className="relative w-16 h-16 sm:w-40 sm:h-auto shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 sm:block">
                          <Image
                            src="/logos/codeclause.png"
                            alt="CodeClause"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-base md:text-lg font-bold text-slate-100">
                            CodeClause
                          </h3>
                          <div className="space-y-3">
                            <div className="rounded-xl bg-slate-900/70 p-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-medium text-slate-100">
                                  AI Intern
                                </p>
                                <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-slate-300">
                                  May 2025 – Jun 2025
                                </span>
                              </div>
                              <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-slate-300">
                                <li>
                                  <span className="font-semibold text-slate-200">
                                    Stack:
                                  </span>{' '}
                                  Python, Pandas, scikit-learn, Jupyter, Git.
                                </li>
                                <li>
                                  Prototyped and evaluated machine learning models on
                                  structured datasets to solve classification and prediction
                                  problems.
                                </li>
                                <li>
                                  Helped package models into reusable modules and integrate
                                  them into existing applications via simple APIs.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* Oasis Infobyte */}
                  <div className="relative pl-6">
                    <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                    <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                      <div className="flex items-start sm:items-stretch gap-4">
                        <div className="relative w-16 h-16 sm:w-40 sm:h-auto shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 sm:block">
                          <Image
                            src="/logos/oasis.png"
                            alt="Oasis Infobyte"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-base md:text-lg font-bold text-slate-100">
                            Oasis Infobyte
                          </h3>
                          <div className="space-y-3">
                            <div className="rounded-xl bg-slate-900/70 p-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-medium text-slate-100">
                                  Android Developer Intern
                                </p>
                                <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-slate-300">
                                  Apr 2025 – May 2025
                                </span>
                              </div>
                              <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-slate-300">
                                <li>
                                  <span className="font-semibold text-slate-200">
                                    Stack:
                                  </span>{' '}
                                  Kotlin, Android Studio, XML layouts, Retrofit, Firebase.
                                </li>
                                <li>
                                  Developed and refined UI screens, navigation flows and forms
                                  for Android applications following material design patterns.
                                </li>
                                <li>
                                  Integrated REST APIs and handled loading, error and empty
                                  states to improve user experience.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* Zidio */}
                  <div className="relative pl-6">
                    <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                    <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                      <div className="flex items-start sm:items-stretch gap-4">
                        <div className="relative w-16 h-16 sm:w-40 sm:h-auto shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 sm:block">
                          <Image
                            src="/logos/zidio.png"
                            alt="Zidio Development"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-base md:text-lg font-bold text-slate-100">
                            Zidio Development
                          </h3>
                          <div className="space-y-3">
                            <div className="rounded-xl bg-slate-900/70 p-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-medium text-slate-100">
                                  Application Developer Intern
                                </p>
                                <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-slate-300">
                                  Jun 2024 – Aug 2024
                                </span>
                              </div>
                              <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-slate-300">
                                <li>
                                  <span className="font-semibold text-slate-200">
                                    Stack:
                                  </span>{' '}
                                  Flutter, Dart, Firebase, REST APIs, Git.
                                </li>
                                <li>
                                  Contributed to building reusable UI components and screens
                                  for client-facing applications.
                                </li>
                                <li>
                                  Integrated backend endpoints and worked on state management
                                  and navigation flows within existing Flutter projects.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-10 border-t border-slate-800/70 pt-6">
                  <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                    <h3 className="text-2xl font-semibold text-cyan-400">Education</h3>
                    <p className="text-sm text-slate-400">
                      Academic background and key milestones.
                    </p>
                  </div>

                  <div className="mt-4 space-y-6">
                    {/* College */}
                    <div className="relative pl-6">
                      <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                      <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                      <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                        <div className="md:hidden flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-slate-100">
                              B.Tech in CSE
                            </h3>
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-cyan-400 whitespace-nowrap">
                              CGPA: 8.5
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <p className="text-xs text-slate-400">KIIT University</p>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              (till 4th sem)
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">2023 – 2027</p>
                        </div>

                        <div className="hidden md:flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-100">
                              B.Tech in CSE
                            </h3>
                            <div className="text-right">
                              <span className="block rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-cyan-400">
                                CGPA: 8.2
                              </span>
                              <span className="block mt-1 text-[10px] text-slate-500">
                                (till 4th sem)
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 -mt-2">KIIT University</p>
                          <p className="text-xs text-slate-500 mt-0.5">2023 – 2027</p>
                        </div>
                      </article>
                    </div>

                    {/* 12th */}
                    <div className="relative pl-6">
                      <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                      <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                      <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                        <div className="md:hidden flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-slate-100">
                              Class 12
                            </h3>
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-cyan-400 whitespace-nowrap">
                              Percentage: 85%
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <p className="text-xs text-slate-400">St. Luke's Senior Secondary School</p>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Mar 2022 – Mar 2023
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-100">
                              Class 12
                            </h3>
                            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-cyan-400">
                              Percentage: 85%
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 -mt-1">St. Luke's Senior Secondary School</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Mar 2022 – Mar 2023
                          </p>
                        </div>
                      </article>
                    </div>

                    {/* 10th */}
                    <div className="relative pl-6">
                      <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                      <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                      <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                        <div className="md:hidden flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-slate-100">
                              Class 10
                            </h3>
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-cyan-400 whitespace-nowrap">
                              Percentage: 95%
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <p className="text-xs text-slate-400">St. Luke's Senior Secondary School</p>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Feb 2020 – Mar 2021
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-100">
                              Class 10
                            </h3>
                            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-cyan-400">
                              Percentage: 95%
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 -mt-1">St. Luke's Senior Secondary School</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Feb 2020 – Mar 2021
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Projects */}
            <section id="projects" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold text-cyan-400">
                    Featured Projects
                  </h2>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <motion.article
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-sm shadow-black/40 transition-colors hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/15"
                  >
                    <a
                      href="/projects/attendance-management-system"
                      className="flex h-full flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/projects/attendance.png"
                          alt="Attendance Management System"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
                          {['Flutter', 'Firebase', 'Mobile App'].map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-slate-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-semibold text-slate-100">
                          Attendance Management System
                        </h3>
                        <p className="mt-2 text-sm text-slate-300">
                          Flutter app for attendance tracking with role-based access and
                          real-time sync for students, employees and admins.
                        </p>
                        <p className="mt-3 text-xs font-medium text-cyan-400">
                          View case study →
                        </p>
                      </div>
                    </a>
                  </motion.article>

                  <motion.article
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-sm shadow-black/40 transition-colors hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/15"
                  >
                    <a
                      href="/projects/blogging-application"
                      className="flex h-full flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/projects/blogging.png"
                          alt="Blogging Application"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
                          {['Flutter', 'Firebase', 'Rich Text', 'Images'].map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-slate-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-semibold text-slate-100">
                          Blogging Application
                        </h3>
                        <p className="mt-2 text-sm text-slate-300">
                          Blog platform where users can create, edit and share posts with
                          rich text and images, secured by Firebase Auth.
                        </p>
                        <p className="mt-3 text-xs font-medium text-cyan-400">
                          View case study →
                        </p>
                      </div>
                    </a>
                  </motion.article>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="/projects"
                    className="group inline-flex items-center rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-400 hover:bg-slate-900/50"
                  >
                    <span>View all projects</span>
                    <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold text-cyan-400">
                    Achievements &amp; Certifications
                  </h2>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {topAchievements.map((item) => (
                      <article
                        key={item.title + item.org}
                        className="relative rounded-2xl border border-slate-800 bg-slate-950/50 p-4 shadow-sm shadow-black/40"
                      >
                        <div className="absolute left-0 top-4 h-8 w-0.5 rounded-full bg-cyan-500/80" />
                        <div className="ml-3">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-semibold text-slate-100">
                                {item.title}
                              </h3>
                              <p className="text-xs text-slate-400">
                                {item.org} · {item.year}
                              </p>
                            </div>
                            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                              {item.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-300">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {topCerts.map((cert) => (
                      <a
                        key={cert.issuer + cert.title}
                        href={cert.url}
                        target={cert.url === '#' ? '_self' : '_blank'}
                        rel={cert.url === '#' ? undefined : 'noreferrer'}
                        className="block rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-left shadow-sm shadow-black/30 transition-transform transition-colors hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {cert.issuer}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">
                          {cert.title}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">{cert.date}</p>
                        {cert.url === '#' && (
                          <p className="mt-2 text-[11px] text-slate-500">
                            (Add verification URL here)
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <a
                    href="/achievements"
                    className="group inline-flex items-center rounded-full border border-slate-600 px-5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-400"
                  >
                    <span>View all achievements &amp; certifications</span>
                    <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Services */}
            <section id="services" className="scroll-mt-24">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold text-cyan-400">Services</h2>
                  <p className="text-sm text-slate-400">
                    I&apos;m available for freelance work and collaborations on web and mobile
                    projects.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100">Quality Code</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Clean, maintainable, and scalable solutions.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100">On Time</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Reliable delivery and regular updates.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      Clear Comms
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Transparent communication throughout.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/30 transition-colors hover:border-cyan-500/50">
                    <h3 className="text-sm font-semibold text-slate-100">
                      Web Application Development
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Building responsive, performant web applications using modern stacks
                      (React, Tailwind, REST/JSON APIs).
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/30 transition-colors hover:border-cyan-500/50">
                    <h3 className="text-sm font-semibold text-slate-100">
                      Mobile App Development
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Cross-platform mobile apps with Flutter and React Native, integrated
                      with Firebase or REST APIs.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/30 transition-colors hover:border-cyan-500/50">
                    <h3 className="text-sm font-semibold text-slate-100">
                      Backend &amp; Integration
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Designing and integrating backends with SQL databases, Firebase, and
                      secure authentication flows.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/30 transition-colors hover:border-cyan-500/50">
                    <h3 className="text-sm font-semibold text-slate-100">
                      Mentoring &amp; Technical Guidance
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Helping peers with project structure, best practices and understanding
                      trade-offs in technology choices.
                    </p>
                  </article>
                </div>
              </motion.div>
            </section>

            {/* Connect */}
            <section id="connect" className="scroll-mt-24 pb-2">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.35 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-9 w-1 rounded-full bg-cyan-500/80" />
                    <div className="rounded-2xl border border-slate-600/30 bg-slate-900/5 px-4 py-2 backdrop-blur-xl">
                      <h2 className="text-2xl font-semibold text-cyan-400">Connect</h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Let&apos;s build something together
                      </p>
                    </div>
                  </div>
                  <div className="hidden rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-medium text-green-400 sm:block">
                    ● Available for work
                  </div>
                </div>
                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-5 py-6 shadow-md shadow-black/40">
                    <div>
                      <p className="text-sm text-slate-300">
                        I&apos;m open to SDE, full-stack and mobile developer roles, along
                        with internships and impactful project collaborations.
                      </p>
                      <p className="mt-4 text-sm text-slate-300">
                        Got an idea? Need a developer? Or just want to say hi? Fill out the
                        form or reach out directly.
                      </p>
                      <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                          Direct Channels
                        </p>
                        <div className="space-y-3 text-sm text-slate-300">
                          <a
                            href="mailto:guptaishan2609@gmail.com?subject=Collaboration%20Opportunity"
                            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 transition-colors hover:border-cyan-400 hover:bg-slate-900"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-cyan-400">
                              @
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-400">Email</p>
                              <p className="text-sm font-semibold text-slate-200">
                                guptaishan2609@gmail.com
                              </p>
                            </div>
                          </a>
                          <a
                            href="https://www.linkedin.com/in/ishan-gupta-962a07285/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 transition-colors hover:border-cyan-400 hover:bg-slate-900"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-cyan-400">
                              in
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-400">LinkedIn</p>
                              <p className="text-sm font-semibold text-slate-200">
                                Connect on LinkedIn
                              </p>
                            </div>
                          </a>
                          <a
                            href="https://github.com/CoderIshanGupta"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 transition-colors hover:border-cyan-400 hover:bg-slate-900"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-cyan-400">
                              <GithubIcon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-400">GitHub</p>
                              <p className="text-sm font-semibold text-slate-200">
                                CoderIshanGupta
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800/50">
                      <p className="text-xs text-slate-500">
                        Response time:{' '}
                        <span className="text-cyan-400">Within 24 hours</span>
                      </p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-6 shadow-inner shadow-slate-950">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl" />
                    <h3 className="mb-4 text-lg font-semibold text-slate-100">
                      Send a Message
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold uppercase tracking-wide text-slate-400"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400 focus:bg-slate-900/80"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-xs font-semibold uppercase tracking-wide text-slate-400"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400 focus:bg-slate-900/80"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="text-xs font-semibold uppercase tracking-wide text-slate-400"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400 focus:bg-slate-900/80"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="text-xs font-semibold uppercase tracking-wide text-slate-400"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell me about your project..."
                          required
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400 focus:bg-slate-900/80"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={
                          'mt-2 w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:from-cyan-400 hover:to-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 ' +
                          (isSubmitting ? 'opacity-70 cursor-not-allowed' : '')
                        }
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-slate-800 pt-4 pb-8 text-center">
          <div className="mb-6 flex justify-center gap-6">
            <a
              href="mailto:guptaishan2609@gmail.com"
              className="text-slate-400 transition-colors hover:text-cyan-400"
              aria-label="Email"
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
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ishan-gupta-962a07285/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition-colors hover:text-cyan-400"
              aria-label="LinkedIn"
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/CoderIshanGupta"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition-colors hover:text-cyan-400"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>
          <p className="text-base text-slate-400">
            &copy; {new Date().getFullYear()} Ishan Gupta. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Crafted with ❤️ by Ishan Gupta.
          </p>
        </footer>
      </div>
    </main>
  );
}