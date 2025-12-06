'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectHeader from '@/components/ProjectHeader';

const sectionReveal = {
  hidden: { opacity: 0.35, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

type Project = {
  title: string;
  slug: string;
  description: string;
  tech: string;
  category: string;
  image: string;
};

const projects: Project[] = [
  {
    title: 'Attendance Management System',
    slug: 'attendance-management-system',
    description:
      'Flutter-based app for attendance tracking with real-time sync and role-based access.',
    tech: 'Flutter · Firebase',
    category: 'Mobile App',
    image: '/projects/attendance.png',
  },
  {
    title: 'Blogging Application',
    slug: 'blogging-application',
    description:
      'Flutter-based blog app enabling users to create, edit, and share posts with images.',
    tech: 'Flutter · Firebase',
    category: 'Mobile App',
    image: '/projects/blogging.png',
  },
  {
    title: 'Canteen & Cafeteria Management',
    slug: 'canteen-cafeteria-management',
    description:
      'Flutter app to manage canteen/cafeteria items, orders and user interaction.',
    tech: 'Flutter · Firebase',
    category: 'Mobile App',
    image: '/projects/canteen.png',
  },
  {
    title: 'Inventory Management App',
    slug: 'inventory-management-app',
    description:
      'Inventory management system built with FlutterFlow to track items and stock.',
    tech: 'FlutterFlow · Firebase',
    category: 'Mobile App',
    image: '/projects/inventory.png',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <ProjectHeader />

      <div className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-cyan-400">Projects</h1>
            <p className="mt-2 text-sm text-slate-300">
              A collection of my mobile apps, AI/ML experiments, and other code.
            </p>
          </div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-sm shadow-black/40 transition-colors hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/15"
              >
                <Link
                  href={
                    project.slug.startsWith('#') ? '#' : `/projects/${project.slug}`
                  }
                  className="flex h-full flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-slate-300">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs font-medium text-slate-500">
                      {project.tech}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}