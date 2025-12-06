import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProjectHeader from '@/components/ProjectHeader';

export const metadata: Metadata = {
  title: 'Inventory Management App – Case Study',
  description:
    'Inventory management app built with FlutterFlow & Firebase by Ishan Gupta, featuring dashboards, low-code development, and stock analytics.',
};

export default function InventoryProjectPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <ProjectHeader />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Case Study
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
              Inventory Management App
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              Low-Code Dev · FlutterFlow · Firebase
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

        <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 md:h-auto">
            <Image
              src="/projects/inventory.png"
              alt="Inventory Management App"
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
                <p className="mt-1 text-sm text-slate-200">Nov 2024 – Dec 2024</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tech Stack
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['FlutterFlow', 'Firebase', 'Low-Code', 'Data Analytics'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100"
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
                  href="https://app.flutterflow.io/preview/inventory-management-60s3n0?SignUp"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                >
                  Live Preview ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-12">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-100">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              Built using FlutterFlow, this application simplifies inventory tracking for
              small businesses. It allows users to add items, monitor stock levels,
              categorize products, and view usage trends via a visual dashboard. The goal
              was to create a functional MVP rapidly without sacrificing UI quality, using
              a low-code approach backed by Firebase.
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-100">Key Features</h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-slate-300">
                <li>Visual dashboard for at-a-glance stock overview.</li>
                <li>Add/Edit/Delete inventory items with images and categories.</li>
                <li>Low-stock alerts and notifications to prevent stock-outs.</li>
                <li>Basic data visualization for usage and stock trends over time.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-100">
                Technical Highlights
              </h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-slate-300">
                <li>
                  Leveraged FlutterFlow&apos;s visual builder to rapidly prototype and
                  iterate on UI without writing boilerplate code.
                </li>
                <li>
                  Structured collections in Firebase to support filtering, searching and
                  aggregating items efficiently.
                </li>
                <li>
                  Used FlutterFlow&apos;s custom actions and Firebase queries to implement
                  business rules like &quot;low stock&quot; thresholds and soft deletes.
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
                  Data Structure in a Low-Code Environment
                </h3>
                <p className="text-sm text-slate-400">
                  Designing a scalable database schema inside a low-code tool was tricky,
                  especially for relationships like categories, suppliers and stock logs.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Planned the schema on paper first, then used Firebase
                  collections and sub-collections in FlutterFlow to handle relational data
                  and keep reads/writes efficient.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}