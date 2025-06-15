import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Ajay from '../assets/AJAY.jpg';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
        <img
          src={Ajay}
          alt="Ajay Krishna"
          className="w-32 h-32 md:w-40 md:h-43 rounded-full mx-auto mb-6 object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-typewriter">
          Hi, I'm <span className="animate-shine">Ajay Krishna</span>
        </h1>
         <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
          I'm a passionate Full Stack Developer dedicated to crafting modern, scalable web applications. With a focus on clean code, performance optimization, and seamless user experiences, I deliver end-to-end solutions that drive impact and innovation.
        </p>
        <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
          <a
            href="#contact"
            className="inline-block border text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
    </>
  );
}

export default Home;