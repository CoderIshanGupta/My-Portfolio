import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProjectHeader from '@/components/ProjectHeader';

export const metadata: Metadata = {
  title: 'Canteen & Cafeteria Management – Case Study',
  description:
    'Flutter & Firebase-based canteen and cafeteria management app by Ishan Gupta, enabling menu browsing, ordering, and real-time order tracking.',
};

export default function CanteenCafeteriaProjectPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <ProjectHeader />

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Case Study
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
              Canteen &amp; Cafeteria Management
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              Mobile app · Flutter · Firebase
            </p>
          </div>

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

        {/* Hero + meta */}
        <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 md:h-auto">
            <Image
              src="/projects/canteen.png"
              alt="Canteen & Cafeteria Management App"
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
                <p className="mt-1 text-sm text-slate-200">Aug 2024 – Oct 2024</p>
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
                    'Cloud Functions',
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
                  href="#"
                  className="mt-1 block text-sm text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-100">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              The Canteen &amp; Cafeteria Management app streamlines how students and staff
              interact with the campus canteen. Instead of standing in long queues or
              filling out manual slips, users can browse the daily menu, place orders,
              track preparation status and view order history directly from their phones.
              The backend is powered by Firebase, allowing real-time updates for both
              customers and the kitchen staff.
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-100">Key Features</h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-slate-300">
                <li>Daily and weekly menu browsing with item categories and prices.</li>
                <li>Real-time ordering system with order status (Pending, In progress, Ready).</li>
                <li>Role-based views for students, staff, and kitchen/admins.</li>
                <li>Order history and quick re-order for frequently purchased items.</li>
                <li>Configurable canteen timings and automatic &quot;closed&quot; state.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-100">
                Technical Highlights
              </h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-slate-300">
                <li>
                  Implemented Firestore real-time listeners so that order status updates
                  instantly on user devices and kitchen dashboard.
                </li>
                <li>
                  Designed a structured Firestore schema for menus, orders, and user roles
                  to keep reads/writes efficient.
                </li>
                <li>
                  Used Firebase Cloud Functions to automatically update statistics such as
                  daily sales and item popularity.
                </li>
                <li>
                  Implemented basic form validation and error handling for unreliable
                  network conditions.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-100">
              Challenges &amp; Solutions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                <h3 className="mb-2 font-semibold text-slate-200">
                  Handling Peak-Time Concurrency
                </h3>
                <p className="text-sm text-slate-400">
                  During peak hours, many users might place orders at the same time, which
                  could lead to inconsistent stock counts or duplicate orders.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Used Firestore transactions and batched writes for critical
                  operations (like decrementing stock and creating an order), ensuring
                  atomic updates even when multiple requests hit simultaneously.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                <h3 className="mb-2 font-semibold text-slate-200">
                  Keeping the Kitchen View in Sync
                </h3>
                <p className="text-sm text-slate-400">
                  Kitchen staff needed a live view of incoming orders without constantly
                  refreshing or missing updates during busy windows.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Implemented Firestore real-time listeners in the kitchen panel
                  and added filters (Pending, In Progress, Ready) so new orders and status
                  changes appear instantly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}