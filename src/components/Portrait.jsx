import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';
// The same cut-out as the first page, shown here only as dots.
import portrait from '../assets/ajay-home.webp';

// Named so the lint rule for unused imports can see it used in JSX.
const MotionFrame = motion.div;

const WIDTH = 300;
const HEIGHT = 362; // the photo's 1142 × 1377 at WIDTH

// The portrait as a field of light dots on a dark card, in both themes, so
// the grey skin tones of the black-and-white photo stay readable. Pointing
// at it makes the dots swirl around the pointer; they settle when it leaves.
function Portrait() {
  const reduceMotion = useReducedMotion();
  const frame = useRef(null);
  const inView = useInView(frame, { once: true, amount: 0.3 });

  return (
    <MotionFrame
      ref={frame}
      role="img"
      aria-label="Ajay Krishna"
      className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-lg"
      style={{ width: WIDTH, height: HEIGHT, maxWidth: '100%' }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {inView && (
          <PixelatedCanvas
            src={portrait}
            width={WIDTH}
            height={HEIGHT}
            cellSize={3}
            dotScale={0.9}
            shape="square"
            backgroundColor=""
            dropoutStrength={0.15}
            interactive={!reduceMotion}
            distortionStrength={3}
            distortionRadius={80}
            distortionMode="swirl"
            followSpeed={0.2}
            jitterStrength={4}
            jitterSpeed={4}
            sampleAverage
            tintColor="#FFFFFF"
            tintStrength={0.2}
            maxFps={30}
          />
        )}
      </div>
    </MotionFrame>
  );
}

export default Portrait;
