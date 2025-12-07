import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProjectHeader from '@/components/ProjectHeader';

export const metadata: Metadata = {
  title: 'Attendance Management System – Case Study',
  description:
    'Flutter & Firebase-based attendance management system by Ishan Gupta with role-based access and real-time synchronization.',
};

export default function AttendanceManagementPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <ProjectHeader />

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Responsive Header Layout */}
        {/* Mobile: Flex Col (Back Link First) */}
        {/* Desktop: Flex Row (Back Link Second/Right) */}
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Title Section - Order 2 on Mobile, Order 1 on Desktop */}
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Case Study
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
              Attendance Management System
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              Mobile app · Flutter · Firebase
            </p>
          </div>

          {/* Back Link - Order 1 on Mobile (Top), Order 2 on Desktop (Right) */}
          <div className="order-1 md:order-2 md:mt-1">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Back to projects
            </Link>
          </div>
        </header>

        {/* Hero image + meta */}
        <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 md:h-auto">
            <Image
              src="/projects/attendance.png"
              alt="Attendance Management System"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Timeline
                </h2>
                <p className="mt-1 text-sm text-slate-200">May 2024 – Jul 2024</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tech Stack
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    'Flutter',
                    'Dart',
                    'Firebase Firestore',
                    'Firebase Auth',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Links
                </h2>
                <a
                  href="https://github.com/CoderIshanGupta/Attendance-Management-System"
                  className="mt-1 block text-sm text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              The Attendance Management System is a comprehensive mobile solution
              designed to replace manual attendance registers. It offers a streamlined
              interface for students to view their status and for teachers/admins to mark
              and manage attendance in real-time. The app leverages Firebase for instant
              data synchronization across devices.
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                <li>Role-based login (Student, Teacher, Admin).</li>
                <li>Real-time attendance marking with instant database updates.</li>
                <li>Dashboard for visualizing attendance percentages.</li>
                <li>Secure authentication and route protection.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                Technical Highlights
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                <li>Optimized Firestore queries to reduce read costs.</li>
                <li>Implemented custom state management for form handling.</li>
                <li>Designed a responsive UI adaptable to different screen sizes.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Challenges &amp; Solutions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                <h3 className="font-semibold text-slate-200 mb-2">
                  Real-time Data Consistency
                </h3>
                <p className="text-sm text-slate-400">
                  Keeping the UI in sync when multiple teachers updated records
                  simultaneously was causing jitters.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Utilized Firestore Streams (StreamBuilder) to listen to changes
                  and update the UI atomically.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                <h3 className="font-semibold text-slate-200 mb-2">Role Management</h3>
                <p className="text-sm text-slate-400">
                  Ensuring students couldn&apos;t access admin features via navigation
                  loopholes.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Implemented robust middleware logic and protected routes based
                  on user claims in Firebase Auth.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}