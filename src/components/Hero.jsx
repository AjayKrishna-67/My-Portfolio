import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { BuildContext, CURSORS } from '@/lib/build';
import { HERO_WORD } from '@/lib/intro';
import { Buildable, CursorSwarm } from './CursorSwarm';
import photo from '../assets/ajay-home.webp';
import { CV_URL, DownloadIcon } from './cv';

// Figures straight from the resume.
const figures = [
  ['4', 'live B2C e-commerce platforms'],
  ['7', 'production integrations I own'],
  ['2', 'years of overall experience in web development'],
];

// The order the cursors place the blocks in, shared round robin.
const ORDER = [
  'portrait',
  'name',
  'stat-1',
  'role',
  'intro',
  'stat-2',
  'actions',
  'stat-3',
  'since',
];

function SwarmBar({ placed, on, onReplay, onToggle }) {
  const share = placed / ORDER.length;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-neutral-200 bg-white/70 py-1.5 pr-1.5 pl-3 text-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
      <span aria-hidden="true" className="flex -space-x-1">
        {CURSORS.map((c) => (
          <span
            key={c.name}
            className="size-3 rounded-full ring-2 ring-white dark:ring-neutral-900"
            style={{ backgroundColor: c.color }}
          />
        ))}
      </span>
      <span className="font-semibold">{CURSORS.length} cursors</span>
      <span className="flex items-center gap-2 text-neutral-600 tabular-nums dark:text-neutral-400">
        {placed}/{ORDER.length} blocks
        <span aria-hidden="true" className="h-1 w-14 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <span
            className="sunset-fill block h-full rounded-full transition-[width] duration-300"
            style={{ width: `${share * 100}%` }}
          />
        </span>
      </span>
      <span className="flex gap-1">
        <button
          type="button"
          onClick={onReplay}
          className="rounded-full px-3 py-1 font-semibold transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          Build again
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={!on}
          className="rounded-full px-3 py-1 text-neutral-600 transition-colors hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          {on ? 'Hide cursors' : 'Show cursors'}
        </button>
      </span>
    </div>
  );
}

// The first page. After the intro, five cursors (each named after a tool the
// stores run on) select every block, read out its size and drop it in place.
function Hero({ ready }) {
  const reduceMotion = useReducedMotion();
  const stage = useRef(null);
  const [placed, setPlaced] = useState(() => new Set());
  const [runId, setRunId] = useState(0);
  const [cursorsOn, setCursorsOn] = useState(true);
  const swarm = !reduceMotion && cursorsOn;

  const shown = useCallback(
    (id) => {
      if (reduceMotion) return true;
      if (!ready) return false;
      return !cursorsOn || placed.has(id);
    },
    [reduceMotion, ready, cursorsOn, placed],
  );

  const place = useCallback((id) => {
    setPlaced((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const replay = () => {
    setPlaced(new Set());
    setCursorsOn(true);
    setRunId((n) => n + 1);
  };

  const toggle = () => {
    if (cursorsOn) setCursorsOn(false);
    else replay();
  };

  return (
    <section
      ref={stage}
      id="home"
      aria-labelledby="hero-name"
      className="relative overflow-x-clip"
    >
      <BuildContext.Provider value={shown}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative z-20 flex flex-wrap items-start justify-between gap-x-6 gap-y-2 pt-2 sm:pr-28 2xl:pr-0">
            <Buildable id="role" className="leading-snug">
              <p className="font-semibold">Full-stack developer</p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Online stores, delivery and apps
              </p>
            </Buildable>
            {/* <Buildable id="place" className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
                <path d="M8 1a5 5 0 0 0-5 5c0 3.6 5 9 5 9s5-5.4 5-9a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              Madurai, Tamil Nadu
            </Buildable> */}
          </div>

          <div className="relative xl:h-[min(68svh,640px)] xl:min-h-[540px]">
            {/* Decorative: the name is the h1 below. */}
            <p
              data-hero-word
              aria-hidden="true"
              className={cn(
                HERO_WORD,
                'pointer-events-none mt-4 text-center select-none xl:absolute xl:inset-x-0 xl:top-0 xl:mt-2',
                !ready && 'opacity-0',
              )}
            >
              AJAY
            </p>

            <Buildable
              id="portrait"
              className="relative z-10 mx-auto -mt-[14vw] w-[min(80vw,420px)] sm:-mt-[12vw] xl:absolute xl:bottom-0 xl:left-1/2 xl:mt-0 xl:h-[90%] xl:w-auto xl:-translate-x-1/2"
            >
              <img
                src={photo}
                alt="Ajay Krishna"
                width="1142"
                height="1377"
                className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
              />
            </Buildable>

            <div className="relative z-20 -mt-4 xl:absolute xl:bottom-8 xl:left-0 xl:mt-0 xl:w-[21rem]">
              <Buildable id="name">
                <p className="text-lg text-neutral-600 dark:text-neutral-400">Hi, I&rsquo;m</p>
                <h1 id="hero-name" className="display text-5xl sm:text-6xl xl:text-[3.25rem]">
                  Ajay Krishna
                </h1>
              </Buildable>
              <Buildable
                id="intro"
                as="p"
                className="mt-4 max-w-[42ch] text-lg text-neutral-600 dark:text-neutral-400"
              >
                I build online stores, from product page to shipped order:
                storefronts, payments, delivery tracking and the apps around
                them.
              </Buildable>
              <Buildable id="actions" className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-4">
                <a
                  href="#work"
                  className="rounded-md bg-neutral-950 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-signal hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-signal"
                >
                  See the work
                </a>
                <a
                  href={CV_URL}
                  download="Ajay_Krishna_CV.pdf"
                  className="inline-flex items-center gap-2 rounded-md border-2 border-neutral-950 px-5 py-2.5 text-lg font-semibold transition-colors hover:bg-signal dark:border-white dark:hover:text-neutral-950"
                >
                  <DownloadIcon />
                  Download CV
                </a>
                <a href="#contact" className="link-fill text-lg">
                  Get in touch
                </a>
              </Buildable>
            </div>

            <ul className="relative z-20 mt-12 grid grid-cols-3 gap-4 xl:absolute xl:right-0 xl:bottom-8 xl:mt-0 xl:w-72 xl:grid-cols-1 xl:gap-0">
              {figures.map(([value, label], n) => (
                <Buildable
                  key={label}
                  id={`stat-${n + 1}`}
                  as="li"
                  className="xl:flex xl:items-center xl:gap-5 xl:border-b xl:border-neutral-300 xl:py-4 xl:last:border-b-0 dark:xl:border-neutral-800"
                >
                  <span className="giant sunset-text block shrink-0 text-6xl tracking-[-0.01em] tabular-nums xl:w-[2.4ch] xl:text-7xl">
                    {value}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-neutral-600 xl:mt-0 dark:text-neutral-400">
                    {label}
                  </span>
                </Buildable>
              ))}
            </ul>
          </div>

          <div className="relative z-20 mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 py-5 xl:mt-0 dark:border-neutral-800">
            {!reduceMotion ? (
              <SwarmBar
                placed={cursorsOn ? placed.size : ORDER.length}
                on={cursorsOn}
                onReplay={replay}
                onToggle={toggle}
              />
            ) : (
              <span />
            )}
            <Buildable id="since" as="p" className="text-neutral-600 dark:text-neutral-400">
              Full-stack developer at AVS EComHub
            </Buildable>
          </div>
        </div>
      </BuildContext.Provider>

      <CursorSwarm
        stageRef={stage}
        order={ORDER}
        runId={runId}
        active={ready && swarm}
        onPlace={place}
      />
    </section>
  );
}

export default Hero;
