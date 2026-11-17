import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Portfolio from './components/Portfolio';

function App() {
  return (
    // "user": people who ask for reduced motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {/* The old address, kept so links already shared keep working. */}
          <Route path="/__Ajay_Krishna__" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
