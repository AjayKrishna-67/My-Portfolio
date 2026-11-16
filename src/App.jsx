import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Portfolio from './components/Portfolio';

// Aceternity's reference demos, reachable at /demo while developing only.
const Demo = import.meta.env.DEV ? lazy(() => import('./components/Demo')) : null;

function App() {
  return (
    // "user": people who ask for reduced motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {/* The old address, kept so links already shared keep working. */}
          <Route path="/__Ajay_Krishna__" element={<Portfolio />} />
          {Demo && (
            <Route
              path="/demo"
              element={
                <Suspense fallback={null}>
                  <Demo />
                </Suspense>
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
