import { useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { animate, motion, useMotionValue } from 'motion/react';
import { setTheme, useTheme } from '@/lib/theme';
import {
  beadPose,
  createRope,
  holdBead,
  isSettled,
  limitPull,
  releaseBead,
  ropePath,
  simulate,
  snapToRest,
} from './lampRope';

// Named so the lint rule for unused imports can see it used in JSX.
const MotionLamp = motion.div;

const CORD = 52; // resting cord length, px
const PULL = 24; // stretch past the resting length that clicks the switch
const STRETCH = 64; // the most the cord can be pulled out, with growing resistance
const RISE = 46; // how far above the cord's exit the bead may be lifted
const MOVED = 4; // pointer travel (screen px) that makes a press a drag

// Share of velocity kept per 1/120s step: about a two second settle, or almost
// none with reduced motion so the cord just drops back into place.
const KEEP = 0.976;
const KEEP_STILL = 0.9;

// Rotate a vector, and the shortest turn from one angle to another.
const rotate = (x, y, a) => ({
  x: x * Math.cos(a) - y * Math.sin(a),
  y: x * Math.sin(a) + y * Math.cos(a),
});
const turn = (from, to) => Math.atan2(Math.sin(to - from), Math.cos(to - from));

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A pendant lamp with a pull cord. The cord is a simulated rope: grab the bead
// and move it anywhere; pull it taut and let go (or press it) to switch between
// light and dark, and the new theme spreads out from the bulb.
function ThemeLamp() {
  const lit = useTheme() === 'light';
  const bulb = useRef(null);
  const frame = useRef(null);
  const line = useRef(null);
  const handle = useRef(null);
  const sway = useMotionValue(0);
  // Everything the animation loop needs; mutated in place, never rendered.
  const sim = useRef(null);

  const draw = (ease = true) => {
    const s = sim.current;
    line.current?.setAttribute('d', ropePath(s.rope));
    const el = handle.current;
    if (!el) return;
    const { x, y, angle } = beadPose(s.rope);
    // Loose, the bead dangles along the cord's end. Held, it stays upright in
    // the hand until the cord pulls it taut, then leans along the pull.
    let target = angle;
    if (s.rope.pin) {
      const reach = Math.hypot(x, y) / CORD;
      target =
        Math.min(Math.max((reach - 0.75) / 0.25, 0), 1) * Math.atan2(-x, y);
    }
    s.angle = ease ? s.angle + turn(s.angle, target) * 0.3 : target;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${s.angle}rad) translateX(-50%)`;
    el.toggleAttribute('data-armed', s.armed);
  };

  const tick = (now) => {
    const s = sim.current;
    const dt = Math.min((now - s.last) / 1000, 0.05);
    s.last = now;
    if (s.tug) {
      s.tug.t += dt;
      const k = Math.min(s.tug.t / s.tug.dur, 1);
      holdBead(s.rope, 0, CORD + s.tug.depth * Math.sin((k * Math.PI) / 2));
      if (k >= 1) {
        releaseBead(s.rope);
        s.tug = null;
      }
    }
    simulate(s.rope, dt, reducedMotion() ? KEEP_STILL : KEEP);
    if (!s.drag && !s.tug && isSettled(s.rope)) {
      snapToRest(s.rope);
      draw(false);
      s.raf = 0;
      return;
    }
    draw();
    s.raf = requestAnimationFrame(tick);
  };

  // Run the loop only while the cord is moving.
  const wake = () => {
    const s = sim.current;
    if (s.raf) return;
    s.last = performance.now();
    s.raf = requestAnimationFrame(tick);
  };

  const tug = (depth) => {
    sim.current.tug = { t: 0, dur: 0.12, depth };
    wake();
  };

  if (!sim.current) {
    sim.current = {
      rope: createRope(CORD),
      raf: 0,
      last: 0,
      drag: null,
      tug: null,
      armed: false,
      angle: 0,
      skipClick: false,
    };
  }

  useLayoutEffect(() => {
    draw(false);
    const s = sim.current;
    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, []);

  // One small tug after load, so the cord reads as something to pull.
  useEffect(() => {
    if (reducedMotion()) return;
    const hint = setTimeout(() => {
      const s = sim.current;
      if (!s.drag && !s.raf) tug(12);
    }, 2000);
    return () => clearTimeout(hint);
    // tug only touches refs, so the first render's copy is as good as any.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flip = () => {
    const next = lit ? 'dark' : 'light';
    const still = reducedMotion();
    // The tug leaves the lamp swinging for a moment.
    if (!still) animate(sway, [0, 5, -4, 2.5, -1, 0], { duration: 1.3 });
    if (!document.startViewTransition || still) {
      setTheme(next);
      return;
    }

    const box = bulb.current.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const top = box.top + box.height / 2;
    const reach = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(top, window.innerHeight - top),
    );

    document
      .startViewTransition(() => flushSync(() => setTheme(next)))
      .ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${top}px)`,
              `circle(${reach}px at ${x}px ${top}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {});
  };

  // Pointer position in the cord's own coordinates. The screen matrix includes
  // the lamp's sway and the phone scale, so the bead stays under the finger.
  const toCord = (e) => {
    const m = frame.current?.getScreenCTM();
    if (!m) return null;
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const at = toCord(e);
    if (!at) return;
    e.preventDefault(); // no text selection while dragging with a mouse
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = sim.current;
    const { x, y } = beadPose(s.rope);
    // Where the bead was grabbed, in the bead's own frame, so the spot under
    // the finger stays under it as the bead turns.
    const grab = rotate(at.x - x, at.y - y, -s.angle);
    s.tug = null;
    s.drag = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      moved: false,
      grab,
    };
    holdBead(s.rope, x, y);
    wake();
  };

  const onPointerMove = (e) => {
    const s = sim.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    const at = toCord(e);
    if (!at) return;
    if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > MOVED) d.moved = true;
    const off = rotate(d.grab.x, d.grab.y, s.angle);
    const to = limitPull(s.rope, at.x - off.x, at.y - off.y, {
      stretch: STRETCH,
      rise: RISE,
    });
    s.armed = d.moved && to.pull >= PULL;
    holdBead(s.rope, to.x, to.y);
    wake();
  };

  const letGo = (e, cancelled) => {
    const s = sim.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    s.drag = null;
    const click = !cancelled && s.armed;
    s.armed = false;
    releaseBead(s.rope);
    wake();
    if (d.moved) {
      // The click that follows a drag must not flip it a second time.
      s.skipClick = true;
      setTimeout(() => {
        s.skipClick = false;
      }, 0);
    }
    if (click) flip();
  };

  return (
    <>
      {/* Light falling from the lamp while it is on. Anchored to the page edge
          and centred on the bulb, so it never widens the page. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 -z-10 size-64 bg-[radial-gradient(circle_at_calc(100%-38px)_46px,rgba(255,209,0,0.36),transparent_62%)] transition-opacity duration-500 sm:bg-[radial-gradient(circle_at_calc(100%-48px)_62px,rgba(255,209,0,0.36),transparent_62%)] 2xl:fixed 2xl:bg-[radial-gradient(circle_at_calc(100%-72px)_62px,rgba(255,209,0,0.36),transparent_62%)] ${
          lit ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Clips the dragged cord at the page's side edges (and only there), so
          pulling it off screen never widens the page. Below 2xl only: at 2xl
          the lamp is fixed and cannot add scroll. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-x-clip">
        <MotionLamp
          className="pointer-events-none absolute top-0 right-2 z-40 h-44 w-20 origin-top max-sm:origin-top-right max-sm:scale-75 2xl:fixed 2xl:right-8"
          style={{ rotate: sway }}
        >
          {/* Ceiling wire, shade and bulb */}
          <span className="absolute top-0 left-1/2 h-6 w-px bg-neutral-400 dark:bg-neutral-600" />
          <svg
            viewBox="0 0 64 32"
            aria-hidden="true"
            className="absolute top-6 left-1/2 h-8 w-16 -translate-x-1/2"
          >
            <path
              d="M2 32C2 13 15 2 32 2s30 11 30 30Z"
              className="fill-neutral-900 dark:fill-neutral-300"
            />
            <path
              d="M10 27C12 15 20 8 32 8"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-neutral-600 dark:stroke-neutral-100"
            />
          </svg>
          <span
            ref={bulb}
            className={`absolute top-[52px] left-1/2 size-5 -translate-x-1/2 rounded-full transition-[background-color,box-shadow] duration-300 ${
              lit
                ? 'bg-signal shadow-[0_0_28px_12px_rgba(255,209,0,0.6)]'
                : 'bg-neutral-700'
            }`}
          />

          {/* Pull cord: a 1px box at the cord's exit whose user space is the
            rope's, drawn past its edges. */}
          <svg
            ref={frame}
            aria-hidden="true"
            className="pointer-events-none absolute top-[58px] left-[calc(50%+22px)] size-px overflow-visible"
          >
            <path
              ref={line}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-neutral-500 dark:stroke-neutral-400"
            />
          </svg>
          <button
            ref={handle}
            type="button"
            aria-label={lit ? 'Switch to dark mode' : 'Switch to light mode'}
            title="Pull the cord to switch the lights"
            className="group pointer-events-auto absolute top-[58px] left-[calc(50%+22px)] flex size-10 origin-top-left cursor-grab touch-none flex-col items-center rounded-full select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 active:cursor-grabbing dark:focus-visible:outline-neutral-100"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(e) => letGo(e, false)}
            onPointerCancel={(e) => letGo(e, true)}
            onLostPointerCapture={(e) => letGo(e, true)}
            onClick={() => {
              if (sim.current.skipClick) return;
              tug(16);
              flip();
            }}
          >
            {/* Knot, then a turned bead to hold */}
            <span className="size-1.5 rounded-full bg-neutral-500 dark:bg-neutral-400" />
            <span className="h-5 w-3 rounded-full bg-neutral-900 ring-2 ring-neutral-50 transition-transform duration-150 group-data-armed:scale-110 dark:bg-neutral-200 dark:ring-neutral-950" />
          </button>
        </MotionLamp>
      </div>
    </>
  );
}

export default ThemeLamp;
