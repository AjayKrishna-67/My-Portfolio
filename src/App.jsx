import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/__Ajay_Krishna__" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;