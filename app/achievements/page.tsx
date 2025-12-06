import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectHeader from '@/components/ProjectHeader';

type Achievement = {
  title: string;
  org: string;
  year: string;
  type: string;
  description: string;
};

type Certification = {
  issuer: string;
  title: string;
  date: string;
  url: string;
  category: string;
  highlight: string;
};

export const metadata: Metadata = {
  title: 'Achievements & Certifications',
  description:
    'Achievements, activities, and certifications of Ishan Gupta, including hackathons, leadership roles, and technical credentials.',
};

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

const certifications: Certification[] = [
  {
    issuer: 'Oracle',
    title: 'Generative AI Professional',
    date: 'Oct 2025',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DAA53B9D323D269A8BDE774666712D28C14E3407E086504E3BCCED43882A7B15',
    category: 'AI & ML',
    highlight: 'Covers foundations of generative AI, LLMs and applied use‑cases.',
  },
  {
    issuer: 'Oracle',
    title: 'DevOps Professional',
    date: 'Oct 2025',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D4D54D364D292302A4E5970BC83CC22F2F1D8D535EFD4BE029837234A7661544',
    category: 'DevOps',
    highlight: 'Focus on CI/CD, automation and modern DevOps practices.',
  },
  {
    issuer: 'Oracle',
    title: 'Data Science Professional',
    date: 'Oct 2025',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D4D54D364D292302A4E5970BC83CC22F54B8EFF13CB316E396D603CB29FE6490',
    category: 'Data & Analytics',
    highlight: 'Practical data analysis, modeling and interpretation skills.',
  },
  {
    issuer: 'ISC2',
    title: 'Certified in CyberSecurity',
    date: '11 Feb 2025',
    url: 'https://isc2.obrizum.io/org/cc/certificate/bcbf27b0-29e5-4a35-95a7-96208d992c6b',
    category: 'Security',
    highlight: 'Security fundamentals, threats, controls and best practices.',
  },
  {
    issuer: 'freeCodeCamp',
    title: 'Scientific Computing with Python Developer',
    date: '23 Dec 2024',
    url: 'https://www.freecodecamp.org/certification/fcce430f79f-bb21-41df-9af9-ebda67078d98/scientific-computing-with-python-v7',
    category: 'Python & Computing',
    highlight: 'Python, NumPy, data handling and algorithmic problem-solving.',
  },
  {
    issuer: 'Cyfrin',
    title: 'Blockchain Basics',
    date: '19 Aug 2025',
    url: 'https://profiles.cyfrin.io/u/ishangupta/achievements/blockchain-basics',
    category: 'Blockchain',
    highlight: 'Foundations of blockchain, smart contracts and web3 concepts.',
  },
  {
    issuer: 'HackerRank',
    title: 'Python',
    date: '24 Dec 2024',
    url: 'https://www.hackerrank.com/certificates/39c72b421349',
    category: 'Programming & DSA',
    highlight: 'Python programming proficiency validated via online assessment.',
  },
  {
    issuer: 'HackerRank',
    title: 'Java',
    date: '24 Dec 2024',
    url: 'https://www.hackerrank.com/certificates/97ea652cdf67',
    category: 'Programming & DSA',
    highlight: 'Core Java, OOP concepts and problem-solving skills.',
  },
  {
    issuer: 'HackerRank',
    title: 'SQL Advanced',
    date: '4 Jan 2025',
    url: 'https://www.hackerrank.com/certificates/ceb052d96ccd',
    category: 'Programming & DSA',
    highlight: 'Complex queries, joins, aggregations and database concepts.',
  },
  {
    issuer: 'HackerRank',
    title: 'Problem Solving (Intermediate)',
    date: '9 Jan 2025',
    url: 'https://www.hackerrank.com/certificates/9d41d23302ca',
    category: 'Programming & DSA',
    highlight: 'Data structures, algorithms and intermediate DSA challenges.',
  },
  {
    issuer: 'Google Cloud',
    title: 'Google Cloud Skill Boost Certifications',
    date: '2025',
    url: 'https://www.skills.google/public_profiles/e0c5efae-32a7-4fbd-b53f-1e6b6ce2f04f',
    category: 'Cloud',
    highlight: 'Hands‑on labs across core Google Cloud services and workloads.',
  },
];

// Color-coding for achievement types
const achievementTypeStyles: Record<string, string> = {
  Hackathon: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
  Leadership: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  Community: 'border-sky-400/40 bg-sky-500/10 text-sky-200',
  Cloud: 'border-indigo-400/40 bg-indigo-500/10 text-indigo-200',
  Speaking: 'border-pink-400/40 bg-pink-500/10 text-pink-200',
};

// Issuer color accents (pill)
const certIssuerStyles: Record<string, string> = {
  Oracle: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-200',
  ISC2: 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-200',
  freeCodeCamp: 'bg-gradient-to-r from-lime-500/20 to-lime-600/20 text-lime-200',
  Cyfrin: 'bg-gradient-to-r from-violet-500/20 to-violet-600/20 text-violet-200',
  HackerRank: 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-200',
  'Google Cloud': 'bg-gradient-to-r from-sky-500/20 to-sky-600/20 text-sky-200',
};

// Category styles
const certCategoryStyles: Record<string, string> = {
  'AI & ML': 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200',
  DevOps: 'border-orange-400/40 bg-orange-500/10 text-orange-200',
  'Data & Analytics': 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200',
  Security: 'border-red-400/40 bg-red-500/10 text-red-200',
  'Python & Computing': 'border-lime-400/40 bg-lime-500/10 text-lime-200',
  Blockchain: 'border-violet-400/40 bg-violet-500/10 text-violet-200',
  'Programming & DSA': 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  Cloud: 'border-sky-400/40 bg-sky-500/10 text-sky-200',
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top header / nav – same as projects pages */}
      <ProjectHeader />

      <div className="relative px-4 py-10 overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-64 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative mx-auto max-w-5xl space-y-10">
          {/* Intro */}
          <section className="space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>Profile Highlights</span>
                </div>
                <h1 className="mt-3 text-3xl font-bold text-cyan-400 sm:text-4xl">
                  Achievements &amp; Certifications
                </h1>
                <p className="mt-1 text-sm text-slate-400 max-w-xl">
                  A consolidated view of hackathons, leadership, community work and
                  technical credentials that reflect my journey as a developer.
                </p>
              </div>
              <Link
                href="/"
                className="text-sm text-slate-400 underline underline-offset-2 hover:text-cyan-400"
              >
                ← Back to home
              </Link>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Total Achievements
                </p>
                <p className="mt-1 text-2xl font-semibold text-cyan-400">
                  {achievements.length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Hackathons, leadership &amp; talks
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Certifications
                </p>
                <p className="mt-1 text-2xl font-semibold text-cyan-400">
                  {certifications.length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Cloud, AI, security &amp; more
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Experience Timeline
                </p>
                <p className="mt-1 text-2xl font-semibold text-cyan-400">
                  Since 2024
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ongoing learning &amp; contributions
                </p>
              </div>
            </div>
          </section>

          {/* Achievements timeline */}
          <section className="space-y-4">
            <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-700/60 bg-slate-900/40 px-4 py-2 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-100">
                Achievements &amp; Activities
              </h2>
              <p className="text-xs text-slate-400">
                Hackathons, leadership roles, community involvement and speaking
                engagements.
              </p>
            </div>

            <div className="mt-2 space-y-4">
              {achievements.map((item) => {
                const badgeStyle =
                  achievementTypeStyles[item.type] ??
                  'border-slate-600 bg-slate-900 text-slate-300';

                return (
                  <div key={item.title + item.org} className="relative pl-6">
                    <div className="absolute left-1 top-0 h-full w-px bg-slate-800" />
                    <div className="absolute left-1 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-400 shadow shadow-cyan-500/40" />
                    <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/80 via-slate-950 to-slate-900/80 p-4 shadow-sm shadow-black/40">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {item.org} · {item.year}
                          </p>
                        </div>
                        <span
                          className={
                            'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ' +
                            badgeStyle
                          }
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.description}
                      </p>
                    </article>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Certifications grid */}
          <section className="space-y-3 pb-4">
            <div className="inline-flex flex-col gap-1 rounded-2xl border border-slate-700/60 bg-slate-900/40 px-4 py-2 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-100">Certifications</h2>
              <p className="text-xs text-slate-400">
                Cloud, AI, data, security and programming credentials from recognized
                platforms.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Click any card to view or verify the certificate once the official
              verification links are added.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => {
                const issuerStyle =
                  certIssuerStyles[cert.issuer] ??
                  'bg-slate-900/50 text-slate-200';

                const categoryStyle =
                  certCategoryStyles[cert.category] ??
                  'border-slate-600 bg-slate-900 text-slate-200';

                const isPlaceholder = cert.url === '#';

                return (
                  <a
                    key={cert.issuer + cert.title}
                    href={cert.url}
                    target={isPlaceholder ? '_self' : '_blank'}
                    rel={isPlaceholder ? undefined : 'noreferrer'}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-left shadow-sm shadow-black/30 transition-transform transition-colors hover:-translate-y-0.5 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-slate-900/40 via-slate-950/80 to-slate-900/60 opacity-90" />
                    <div className="relative flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p
                            className={
                              'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ' +
                              issuerStyle
                            }
                          >
                            {cert.issuer}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-100">
                            {cert.title}
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-300">
                          {cert.date}
                        </span>
                      </div>

                      {/* New highlight line inside the card */}
                      <p className="mt-1 text-[11px] text-slate-300">
                        {cert.highlight}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p
                          className={
                            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ' +
                            categoryStyle
                          }
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          {cert.category}
                        </p>
                        {!isPlaceholder ? (
                          <span className="text-[11px] text-slate-400 group-hover:text-cyan-300 inline-flex items-center gap-1">
                            View credential
                            <span className="text-xs">↗</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">
                            URL coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}