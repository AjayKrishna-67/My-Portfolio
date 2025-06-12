import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/__Ajay_Krishna__" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;