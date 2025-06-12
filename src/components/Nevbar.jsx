import React from 'react';
import { Link } from 'react-router-dom';

function Nevbar() {
  return (
    <>
    <nav className="bg-gray-900 p-5 text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">

        </div>
        <div className="flex space-x-6">
            <Link
            to="/projects"
            className="text-xl hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
            <Link
            to="/projects"
            className="text-xl hover:text-blue-400 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-xl hover:text-blue-400 transition duration-300"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-xl hover:text-blue-400 transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
   </>
  );
}

export default Nevbar;