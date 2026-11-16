import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { earlierProjects, projects } from '@/data/projects';

// Named so the lint rule for unused imports can see it used in JSX.
const MotionScreen = motion.div;

// What fills the frame: the screenshot, or a title panel when there is none.
function Screen({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        className="size-full object-cover object-top"
      />
    );
  }
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-white p-10 text-center dark:bg-neutral-950">
      <p className="display text-4xl">{project.title}</p>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Internal app, so there is no public screenshot.
      </p>
    </div>
  );
}

function Work() {
  // The frame keeps the outgoing screen underneath while the new one flips in.
  const [frame, setFrame] = useState({ current: 0, previous: 0 });
  const items = useRef([]);

  // The project crossing the middle of the viewport owns the frame.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const next = Number(entry.target.dataset.index);
          setFrame((state) =>
            state.current === next
              ? state
              : { current: next, previous: state.current },
          );
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const shown = projects[frame.current];

  return (
    <section
      id="work"
      className="border-t border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:pt-32">
        <h2 className="display text-5xl sm:text-6xl">Work</h2>
        <p className="mt-6 max-w-[52ch] text-xl text-neutral-600 dark:text-neutral-400">
          Online stores, the delivery app that serves them, and a company
          site.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl px-6 pb-12 lg:grid-cols-12 lg:gap-12 lg:pb-0">
        <ul className="lg:col-span-5">
          {projects.map((project, index) => (
            <li
              key={project.id}
              id={project.id}
              ref={(element) => {
                items.current[index] = element;
              }}
              data-index={index}
              className={`scroll-mt-8 border-t border-neutral-300 py-12 dark:border-neutral-800 first:border-t-0 lg:flex lg:min-h-[90vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-16 lg:transition-opacity lg:duration-300 motion-reduce:transition-none ${
                index === frame.current ? '' : 'lg:opacity-40'
              }`}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  width={1600}
                  height={838}
                  className="mb-8 h-auto w-full rounded-lg border border-neutral-300 lg:hidden dark:border-neutral-800"
                />
              )}
              <h3 className="display text-3xl sm:text-4xl">{project.title}</h3>
              {project.period && (
                <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">{project.period}</p>
              )}
              <p className="mt-5 max-w-[48ch] text-xl">{project.summary}</p>

              {project.built && (
                <ul className="mt-6 max-w-[52ch] list-disc space-y-2 pl-5 text-lg text-neutral-700 marker:text-neutral-400 dark:text-neutral-300 dark:marker:text-signal">
                  {project.built.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}

              {project.stack && (
                <p className="mt-6 max-w-[52ch] text-lg">
                  <span className="text-neutral-600 dark:text-neutral-400">Built with </span>
                  {project.stack}
                </p>
              )}

              {project.url && (
                <p className="mt-6 text-lg">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-fill"
                  >
                    Visit {project.domain}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop: one frame stays put; each project flips its screen into it. */}
        <div className="hidden lg:col-span-7 lg:block" aria-hidden="true">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="w-full overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-xl shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none">
              <p className="border-b border-neutral-200 px-4 py-2 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                {shown.domain ?? shown.title}
              </p>
              <div className="relative aspect-1600/838" style={{ perspective: 1400 }}>
                <div className="absolute inset-0">
                  <Screen project={projects[frame.previous]} />
                </div>
                <MotionScreen
                  key={frame.current}
                  className="absolute inset-0 origin-top"
                  initial={{ rotateX: -88, opacity: 0.4 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Screen project={shown} />
                </MotionScreen>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 lg:pt-8 lg:pb-32">
        <h3 className="display text-2xl sm:text-3xl">Earlier, on my own</h3>
        <ul className="mt-8 grid gap-x-12 border-t border-neutral-300 md:grid-cols-2 dark:border-neutral-800">
          {earlierProjects.map((project) => (
            <li
              key={project.title}
              className="border-b border-neutral-300 py-8 md:border-b-0 dark:border-neutral-800"
            >
              <h4 className="text-xl font-bold">{project.title}</h4>
              {project.period && (
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">{project.period}</p>
              )}
              <p className="mt-3 max-w-[52ch] text-lg text-neutral-700 dark:text-neutral-300">
                {project.summary}
              </p>
              <p className="mt-3 text-lg">
                <span className="text-neutral-600 dark:text-neutral-400">Built with </span>
                {project.stack}
              </p>
              {project.url && (
                <p className="mt-4 text-lg">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-fill"
                  >
                    Visit {project.domain}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Work;
