import { useContext, useEffect, useRef } from 'react';
import { animate } from 'motion/react';
import { cn } from '@/lib/utils';
import { BuildContext, CURSORS } from '@/lib/build';


// A block of the first page that a cursor places. Until it is placed it is
// invisible but keeps its size, so the cursors can measure it.
export function Buildable({ id, as = 'div', className, children, ...rest }) {
  const Tag = as;
  const shown = useContext(BuildContext)?.(id) ?? true;
  return (
    <Tag
      data-build={id}
      className={cn(
        'transition-[opacity,filter,scale] duration-500 ease-out',
        !shown && 'scale-[0.97] opacity-0 blur-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const MOVE = [0.45, 0, 0.2, 1];
const sleep = (ms, run) =>
  new Promise((done) => {
    const t = setTimeout(done, ms);
    run.timers.add(t);
  });

// Where a block sits inside the stage, in the stage's own pixels.
function measure(stage, id) {
  const el = stage.querySelector(`[data-build="${id}"]`);
  if (!el) return null;
  const s = stage.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return null;
  return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
}

// Cursors fly in from the stage edges, each from its own side.
function entry(i, w, h) {
  const spots = [
    [-60, h * 0.2],
    [w + 60, h * 0.15],
    [w * 0.3, h + 60],
    [-60, h * 0.8],
    [w + 60, h * 0.75],
  ];
  return spots[i % spots.length];
}

// The layer the cursors draw on. `order` lists block ids in the order they
// are placed; `runId` changes to start a new build. Cursors share the work
// round robin, then drift around and now and then inspect a block.
export function CursorSwarm({ stageRef, order, runId, active, onPlace, onDone }) {
  const cursorEls = useRef([]);
  const boxEls = useRef([]);
  const labelEls = useRef([]);
  // Latest callbacks, read by the running build without restarting it.
  const calls = useRef({ onPlace, onDone });
  useEffect(() => {
    calls.current = { onPlace, onDone };
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!active || !stage) return;
    const run = { stopped: false, controls: new Set(), timers: new Set() };
    const go = (el, to, opts) => {
      const c = animate(el, to, opts);
      run.controls.add(c);
      return c.then(() => run.controls.delete(c));
    };

    // Box properties go through motion only, so its idea of the current
    // values never goes stale between selections.
    const fades = [];
    const box = (i, r) => {
      fades[i]?.stop();
      animate(boxEls.current[i], { x: r.x, y: r.y, width: 0, height: 0, opacity: 1 }, { duration: 0 });
    };

    // Drag a selection box across a block, reading out its size as it grows.
    const select = async (i, r) => {
      const cursor = cursorEls.current[i];
      await go(cursor, { x: r.x, y: r.y }, { duration: 0.5, ease: MOVE });
      if (run.stopped) return false;
      box(i, r);
      const label = labelEls.current[i];
      await Promise.all([
        go(cursor, { x: r.x + r.w, y: r.y + r.h }, { duration: 0.45, ease: 'easeInOut' }),
        // Explicit start: the box must grow from nothing, not from its last size.
        go(boxEls.current[i], { width: [0, r.w], height: [0, r.h] }, { duration: 0.45, ease: 'easeInOut' }),
        go(0, 1, {
          duration: 0.45,
          ease: 'easeInOut',
          onUpdate: (v) => {
            label.textContent = `${Math.round(r.w * v)} × ${Math.round(r.h * v)}`;
          },
        }),
      ]);
      return !run.stopped;
    };

    const release = (i, delay = 0) => {
      fades[i] = animate(boxEls.current[i], { opacity: 0 }, { duration: 0.3, delay });
      run.controls.add(fades[i]);
    };

    const build = async (i, ids) => {
      await sleep(i * 140, run);
      for (const id of ids) {
        if (run.stopped) return;
        const r = measure(stage, id);
        if (!r) {
          calls.current.onPlace(id);
          continue;
        }
        if (!(await select(i, r))) return;
        calls.current.onPlace(id);
        await sleep(160, run);
        release(i);
      }
    };

    // After the build: drift, and sometimes select a block again.
    const idle = async (i) => {
      await sleep(600 + i * 450, run);
      while (!run.stopped) {
        const { width: w, height: h } = stage.getBoundingClientRect();
        const pick = order[Math.floor(Math.random() * order.length)];
        const r = Math.random() < 0.35 ? measure(stage, pick) : null;
        if (r) {
          if (!(await select(i, r))) return;
          release(i, 0.9);
        } else {
          await go(
            cursorEls.current[i],
            { x: w * (0.08 + Math.random() * 0.84), y: h * (0.1 + Math.random() * 0.8) },
            { duration: 1.6 + Math.random() * 1.2, ease: 'easeInOut' },
          );
        }
        await sleep(1800 + Math.random() * 2600, run);
      }
    };

    (async () => {
      const { width: w, height: h } = stage.getBoundingClientRect();
      CURSORS.forEach((_, i) => {
        const [x, y] = entry(i, w, h);
        // Through motion, so later x/y animations start from here.
        animate(cursorEls.current[i], { x, y }, { duration: 0 });
        animate(boxEls.current[i], { opacity: 0 }, { duration: 0 });
      });
      const queues = CURSORS.map(() => []);
      order.forEach((id, n) => queues[n % CURSORS.length].push(id));
      await Promise.all(queues.map((ids, i) => build(i, ids)));
      if (run.stopped) return;
      calls.current.onDone?.();
      CURSORS.forEach((_, i) => idle(i));
    })();

    return () => {
      run.stopped = true;
      run.timers.forEach(clearTimeout);
      run.controls.forEach((c) => c.stop());
    };
    // `order` is fixed for the page; a new runId restarts the build.
  }, [active, runId, stageRef, order]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {CURSORS.map((c, i) => (
        <div key={c.name}>
          <div
            ref={(el) => {
              boxEls.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-[3px] border-[1.5px] opacity-0"
            style={{ borderColor: c.color, backgroundColor: `${c.color}14` }}
          >
            <span
              ref={(el) => {
                labelEls.current[i] = el;
              }}
              className="absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded px-1.5 py-0.5 text-[11px] font-semibold whitespace-nowrap text-neutral-950 tabular-nums"
              style={{ backgroundColor: c.color }}
            />
          </div>
          <div
            ref={(el) => {
              cursorEls.current[i] = el;
            }}
            className="absolute top-0 left-0"
            style={{ transform: 'translate(-80px, -80px)' }}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" className="drop-shadow-md">
              <path
                d="M2 2l15.5 7.2-6.6 1.9-3 6.6L2 2z"
                fill={c.color}
                stroke="#0a0a0a"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="absolute top-5 left-4 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-neutral-950 shadow-sm"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
