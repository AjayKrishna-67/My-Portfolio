import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { projects } from '@/data/projects';
import { useMediaQuery } from '@/lib/use-media-query';

// Named so the lint rule for unused imports can see them used in JSX.
const MotionDiv = motion.div;
const MotionLink = motion.a;

const DEPTH = 80; // px between one screen and the next

// Only projects with a screenshot can stand on the stage.
const screens = projects.filter((project) => project.image).slice(0, 5);
const SPRING = { stiffness: 90, damping: 18 };

// The project screens standing in 3D space. The stage turns a few degrees
// toward the pointer; each screen is a link to its write-up further down.
function StoreStage() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [18, 32]), SPRING);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, 4]), SPRING);

  const follow = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  };

  const settle = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const last = screens.length - 1;

  return (
    <div
      onPointerMove={follow}
      onPointerLeave={settle}
      className="relative mx-auto aspect-5/4 w-full max-w-2xl"
      style={{ perspective: 1600 }}
    >
      <MotionDiv
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {screens.map((project, index) => {
          const z = -index * DEPTH;
          return (
            <MotionLink
              key={project.id}
              href={`#${project.id}`}
              aria-label={`${project.title}: read about this project`}
              className="absolute block w-[76%] overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-2xl shadow-neutral-900/25 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-black/60"
              style={{
                left: `${(index * 24) / last}%`,
                top: `${((last - index) * 48) / last}%`,
              }}
              // Arrive from the back of the stage, furthest screen first.
              initial={{ opacity: 0, z: z - 500 }}
              animate={{ opacity: 1, z }}
              whileHover={{ z: z + 70 }}
              transition={{
                duration: 0.8,
                delay: 0.1 + (last - index) * 0.1,
                ease: [0.2, 0.8, 0.2, 1],
                z: { type: 'spring', stiffness: 140, damping: 20 },
              }}
            >
              <span className="block border-b border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                {project.domain ?? project.title}
              </span>
              <img
                src={project.image}
                alt=""
                width={1600}
                height={838}
                className="block h-auto w-full"
              />
            </MotionLink>
          );
        })}
      </MotionDiv>
    </div>
  );
}

export default StoreStage;
