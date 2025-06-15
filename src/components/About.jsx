import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import js from '../assets/js.png';
import React from '../assets/React.png';
import redux from '../assets/redux.png';
import Tailwind from '../assets/Tailwindcss.png';
import Node from '../assets/Node.png';
import Python from '../assets/python.png';
import django from '../assets/django.png';
import mysql from '../assets/mysql.png';

const frameworks = [
  { name: 'HTML', logo: HTML },
  { name: 'CSS', logo: CSS },
  { name: 'JavaScript', logo: js },
  { name: 'React js', logo: React },
  { name: 'Redux', logo: redux },
  { name: 'Tailwind CSS', logo: Tailwind },
  { name: 'Node js', logo: Node },
  { name: 'Python', logo: Python },
  { name: 'Django', logo: django },
  { name: 'MySQL', logo: mysql },
];

function Slider() {
  const extendedFrameworks = [...frameworks, ...frameworks];

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div
        className="flex animate-slide"
        style={{
          width: `${extendedFrameworks.length * 10}%`,
        }}
      >
        {extendedFrameworks.map((framework, index) => (
          <div
            key={`${framework.name}-${index}`}
            className="w-10 flex justify-center items-center p-4"
            style={{ flex: `0 0 ${100 / frameworks.length}%` }}
          >
            <div className="flex space-x-4">
              <img
                src={framework.logo}
                alt={framework.name}
                className="w-10 h-10"
              />
              <h3 className="text-xl mt-1 font-semibold text-white">{framework.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <>
      <div className="min-h-screen bg-gray-800 flex flex-col justify-center p-5">
        <div className="text-white text-center">
          <h2 className="text-5xl text-white font-extrabold text-center relative inline-block mb-5">
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B8CFCE] animate-scale-in-out"></span>
          </h2>
        </div>
        <div className="w-full mb-10">
          <h2 className="text-3xl text-white font-bold relative inline-block mb-5">
            Technical Specs
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B8CFCE] animate-scale-in-out"></span>
          </h2>
          <Slider />
          <p className="text-xl font-semibold text-white w-[85%] mt-3">
            Motivated and detail-oriented software developer with a passion for full-stack development. 
            Skilled in creating and enhancing websites to improve functionality and user experience. 
            Eager to apply my knowledge of web technologies and contribute to innovative projects in a dynamic team environment. 
            Seeking an opportunity to grow professionally while delivering high-quality solutions that align with organizational objectives.
          </p>
        </div>
        <div className="text-white">
          <h2 className="text-3xl text-white font-bold relative inline-block mb-5">
            A Brief History
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B8CFCE] animate-scale-in-out"></span>
          </h2>
          <p className="text-xl font-semibold text-white w-[85%] mt-6">
            I graduated from PSNA College of Engineering and Technology, located in Dindigul, with a degree in Electrical and Electronics Engineering. 
            During my final year, I developed an interest in web technologies and enrolled in a course at Edex IT-Solutions in Madurai. 
            My passion for programming and cutting-edge computer technologies has led me to find my true professional calling in programming.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;