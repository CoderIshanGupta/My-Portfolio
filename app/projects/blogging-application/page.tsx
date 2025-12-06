import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProjectHeader from '@/components/ProjectHeader';

export const metadata: Metadata = {
  title: 'Blogging Application – Case Study',
  description:
    'Mobile blogging app built with Flutter & Firebase by Ishan Gupta, featuring rich-text editing, image uploads, and secure authentication.',
};

export default function BloggingApplicationPage() {
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
              Blogging Application
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

        <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 md:h-auto">
            <Image
              src="/projects/blogging.png"
              alt="Blogging App"
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
                <p className="mt-1 text-sm text-slate-200">Jul 2024 – Sep 2024</p>
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
                    'Rich Text',
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

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              A content-focused mobile application that empowers users to write, format,
              and share stories on the go. The app focuses on a distraction-free writing
              experience with a rich-text editor and seamless image embedding, backed by a
              robust cloud database.
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                <li>WYSIWYG Rich Text Editor.</li>
                <li>Image uploads via Firebase Storage.</li>
                <li>User profiles and post history.</li>
                <li>Feed with sorting and filtering options.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                Technical Highlights
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                <li>Implemented lazy loading for the infinite scroll feed.</li>
                <li>Compressed images client-side before upload to save bandwidth.</li>
                <li>Used Firestore security rules for data protection.</li>
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
                  Handling Rich Text
                </h3>
                <p className="text-sm text-slate-400">
                  Parsing and rendering complex HTML/Markdown style text in Flutter was
                  inconsistent across devices.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Utilized the `flutter_quill` package and customized the delta
                  format parser for consistent rendering.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
                <h3 className="font-semibold text-slate-200 mb-2">
                  Image Upload Latency
                </h3>
                <p className="text-sm text-slate-400">
                  High-res images were taking too long to upload and causing UI freezes.
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan-400">
                  Solution: Moved upload logic to a background isolate and implemented
                  client-side compression.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}