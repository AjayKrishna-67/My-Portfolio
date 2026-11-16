import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { AsciiArt } from '@/components/ui/ascii-art';
import { useTheme } from '@/lib/theme';
import portrait from '../assets/ajay-contact.webp';
// The same photo on white, for the ASCII pass: its ramp reads white as empty.
import asciiSource from '../assets/ajay-contact-ascii.jpg';

// Named so the lint rule for unused imports can see them used in JSX.
const MotionImage = motion.img;
const MotionScan = motion.span;
const MotionLayer = motion.div;

const ASCII_HOLD_MS = 2200; // how long the ASCII version shows before the photo
const REVEAL = { duration: 1.4, ease: [0.65, 0, 0.35, 1] };

// Shaped like the photo (640 × 773), so the ASCII grid, drawn with "fill",
// keeps the figure's proportions.
const frameClass =
  'relative aspect-[640/773] w-full max-w-[17rem] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-lg dark:border-neutral-800 dark:bg-neutral-900';

// The portrait draws itself in ASCII when it scrolls into view, then the real
// photo wipes in over it from top to bottom, led by a scan line.
function Portrait() {
  const dark = useTheme() === 'dark';
  const reduceMotion = useReducedMotion();
  const frame = useRef(null);
  const inView = useInView(frame, { once: true, amount: 0.5 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setTimeout(() => setRevealed(true), ASCII_HOLD_MS);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  // Reduced motion: no drawing, no wipe, just the photo.
  if (reduceMotion) {
    return (
      <div className={frameClass}>
        <img
          src={portrait}
          alt="Ajay Krishna"
          width="640"
          height="773"
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div ref={frame} className={frameClass}>
      {/* The photo has no backdrop, so the ASCII layer fades away once the
          photo has wiped in; otherwise its characters ring the figure. */}
      <MotionLayer
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.6, delay: revealed ? REVEAL.duration : 0 }}
      >
        <AsciiArt
          key={dark ? 'dark' : 'light'}
          src={asciiSource}
          resolution={100}
          inverted
          objectFit="fill"
          color={dark ? '#a3a3a3' : '#262626'}
          animationStyle="fade"
          animationDuration={1.5}
          className="size-full"
        />
      </MotionLayer>

      <MotionImage
        src={portrait}
        alt="Ajay Krishna"
        width="640"
        height="773"
        className="absolute inset-0 size-full object-cover"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{
          clipPath: revealed ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        }}
        transition={REVEAL}
      />

      <MotionScan
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-1 -translate-y-1/2 bg-signal shadow-[0_0_18px_4px_rgba(255,209,0,0.55)]"
        initial={{ top: '0%', opacity: 0 }}
        animate={
          revealed
            ? { top: '100%', opacity: [0, 1, 1, 0] }
            : { top: '0%', opacity: 0 }
        }
        transition={REVEAL}
      />
    </div>
  );
}

export default Portrait;
