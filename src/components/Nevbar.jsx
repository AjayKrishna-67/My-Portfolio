import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nevbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`bg-gray-900 p-5 text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-full flex justify-between items-center py-1">
          <div className="flex items-center"></div>
          <div className="flex space-x-6">
            <a
              href="#home"
              className="text-xl hover:text-blue-400 transition duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-xl hover:text-blue-400 transition duration-300"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-xl hover:text-blue-400 transition duration-300"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xl hover:text-blue-400 transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nevbar;