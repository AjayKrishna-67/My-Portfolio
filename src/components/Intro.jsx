import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { HERO_WORD, SEEN } from '@/lib/intro';

// Named so the lint rule for unused imports can see them used in JSX.
const MotionSpan = motion.span;

const REST = ['J', 'A', 'Y'];
const BLINK_MS = 1300; // the A blinks alone this long
const TYPE_MS = 170; // then each letter after it
const HOLD_MS = 380; // the full word rests before it flies

// A blinks, J-A-Y types in after it, and the word flies onto the big name on
// the first page while the dark veil lifts. Any key or click skips it.
function Intro({ onDone }) {
  const [typed, setTyped] = useState(0);
  const [caret, setCaret] = useState(false);
  const veil = useRef(null);
  const word = useRef(null);
  const ended = useRef(false);

  const finish = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    try {
      sessionStorage.setItem(SEEN, '1');
    } catch {
      // Private mode: the intro may play again next time, which is fine.
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const timers = [];
    const flights = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    at(BLINK_MS, () => setCaret(true));
    REST.forEach((_, n) => at(BLINK_MS + 120 + TYPE_MS * n, () => setTyped(n + 1)));
    const fly = BLINK_MS + 120 + TYPE_MS * REST.length + HOLD_MS;
    at(fly, () => {
      setCaret(false);
      const el = word.current;
      const target = document.querySelector('[data-hero-word]');
      if (!el || !target) return finish();
      const a = el.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const move = animate(
        el,
        {
          x: b.left + b.width / 2 - (a.left + a.width / 2),
          y: b.top + b.height / 2 - (a.top + a.height / 2),
          scale: b.height / a.height,
        },
        { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
      );
      flights.push(move, animate(veil.current, { opacity: 0 }, { duration: 0.75, delay: 0.2 }));
      move.then(finish);
    });

    window.addEventListener('keydown', finish);
    return () => {
      timers.forEach(clearTimeout);
      flights.forEach((f) => f.stop());
      window.removeEventListener('keydown', finish);
      root.style.overflow = '';
    };
  }, [finish]);

  return (
    <div className="fixed inset-0 z-[60] cursor-pointer" onClick={finish}>
      <div ref={veil} className="absolute inset-0 bg-neutral-950">
        <p className="absolute inset-x-0 bottom-8 text-center text-sm text-neutral-500">
          <span className="sr-only">Ajay Krishna. </span>Press any key to skip
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={word} className="relative">
          <MotionSpan layout="position" className={cn(HERO_WORD, 'relative flex')}>
            <MotionSpan
              className="block"
              animate={{ opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1] }}
              transition={{ duration: BLINK_MS / 1000, ease: 'linear' }}
            >
              A
            </MotionSpan>
            {REST.slice(0, typed).map((letter, n) => (
              <MotionSpan
                key={n}
                className="block"
                initial={{ opacity: 0, y: '18%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {letter}
              </MotionSpan>
            ))}
            {caret && (
              <MotionSpan
                aria-hidden="true"
                className="sunset-fill absolute top-[6%] left-full ml-[0.06em] h-[88%] w-[0.07em] rounded-full"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear', times: [0, 0.5, 1] }}
              />
            )}
          </MotionSpan>
        </div>
      </div>
    </div>
  );
}

export default Intro;
