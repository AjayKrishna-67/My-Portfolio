import React from 'react';
import quickserve from '../assets/quickserve.png';
import Defence from '../assets/DefenceAndAnalytics.png';
import Assetmanagement from '../assets/AssetManagement.png';
import periyanachi from '../assets/periyanachi.png';

function Projects() {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <div>
        <div className='text-center'>
        <h2 className='text-5xl text-white font-extrabold text-center relative inline-block'>
          Projects
           <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B8CFCE] animate-scale-in-out"></span>
        </h2>
        </div>
        <div>
          <div className='flex'>
          <div className='mt-10 w-[65%] bg-red-500 pl-0 py-15 pr-30 rounded hover:scale-95 duration-300 ease-in-out '>
          <a  href="https://quickserve.info/" target="_blank">
          <img src={quickserve} className='w-full'/>
          </a>
          </div>
          <div className='text-white absolute ml-[800px] '>
            <h2 className='text-3xl font-semibold mt-22 '>Quick Serve</h2>
            <p className='mr-10 mt-5 text-lg'>This is a service-based web application where I developed user and admin panels using React, Node.js, and SQL. The user panel enables customers to browse services, place orders, and manage accounts seamlessly.
               The admin panel offers tools for managing users, service requests, and operations. Built for scalability, it leverages React for a dynamic frontend, Node.js for robust backend logic, and SQL for efficient data management, ensuring a responsive user experience.</p>
            <a
              href="https://quickserve.info/"
              target="_blank"
              className="mt-10 font-bold text-xl relative group cursor-pointer inline-block z-10"
            >
              <span className="relative z-10 hover:text-black p-2">Live Link</span>
              <span className="absolute left-0 bottom-0 w-full bg-white transition-all duration-300 h-0.5 rounded group-hover:h-[23px]  group-hover:z-0 z-[-1]"></span>
            </a>
          </div>
          </div>
        </div>
      </div>
      <div>
         <div>
          <div className='flex mt-15'>
          <div className='text-white w-[40%] ml-5 absolute  z-10 '>
            <h2 className='text-3xl font-semibold mt-22 '>Defence And Analytics</h2>
            <p className='mr-10 mt-5 text-lg'>This is a static single-page website developed using React.js and deployed successfully.
               The project includes one integrated API to fetch and display dynamic content. It showcases a clean user interface, responsive design, and efficient front-end architecture tailored for presenting defence-related analytics or services.</p>
            <a
              href="https://flutterflirtdefenceanalytics.com/"
              target="_blank"
              className="mt-10 font-bold text-xl relative group cursor-pointer inline-block z-10"
            >
              <span className="relative z-10 hover:text-black p-2">Live Link</span>
              <span className="absolute left-0 bottom-0 w-full bg-white transition-all duration-300 h-0.5 rounded group-hover:h-[23px]  group-hover:z-0 z-[-1]"></span>
            </a>
          </div>
          <div className='bg-[#7F8CAA] pl-30 w-[65%] py-15 rounded hover:scale-95 duration-300 ease-in-out ml-auto'>
          <a  href="https://flutterflirtdefenceanalytics.com/" target="_blank">
          <img src={Defence} className='w-full'/>
          </a>
          </div>
          </div>
        </div>
        </div>
        <div>
        <div>
          <div className='flex mt-15'>
          <div className=' w-[65%] bg-red-500 pl-0 py-15 pr-30 rounded hover:scale-95 duration-300 ease-in-out '>
          <a  href="https://assetmanagement.flutterflirt.com/" target="_blank">
          <img src={Assetmanagement} className='w-full'/>
          </a>
          </div>
          <div className='text-white absolute ml-[800px] '>
            <h2 className='text-3xl font-semibold mt-20 '>Asset Management</h2>
            <p className='mr-10 mt-5 text-lg'>In the Asset Management project, I was responsible for developing the user-side interface, where I focused on both UI design and implementing key functionalities for a smooth user experience.</p>
            <a
              href="https://assetmanagement.flutterflirt.com/"
              target="_blank"
              className="mt-10 font-bold text-xl relative group cursor-pointer inline-block z-10"
            >
              <span className="relative z-10 hover:text-black p-2">Live Link</span>
              <span className="absolute left-0 bottom-0 w-full bg-white transition-all duration-300 h-0.5 rounded group-hover:h-[23px]  group-hover:z-0 z-[-1]"></span>
            </a>
          </div>
          </div>
        </div>
              <div>
         <div>
          <div className='flex mt-15'>
          <div className='text-white w-[40%] ml-5 absolute  z-10 '>
            <h2 className='text-3xl font-semibold mt-22 '>Periyanachi HiTech Solutions</h2>
            <p className='mr-10 mt-5 text-lg'>I completed the project using HTML, CSS, and JavaScript for the UI and functionality, and integrated EmailJS for email features.</p>
            <a
              href="https://www.periyanachisolutions.com/"
              target="_blank"
              className="mt-10 font-bold text-xl relative group cursor-pointer inline-block z-10"
            >
              <span className="relative z-10 hover:text-black p-2">Live Link</span>
              <span className="absolute left-0 bottom-0 w-full bg-white transition-all duration-300 h-0.5 rounded group-hover:h-[23px]  group-hover:z-0 z-[-1]"></span>
            </a>
          </div>
          <div className='bg-[#7F8CAA] pl-30 w-[65%] py-15 rounded hover:scale-95 duration-300 ease-in-out ml-auto'>
          <a  href="https://www.periyanachisolutions.com/" target="_blank">
          <img src={periyanachi} className='w-full'/>
          </a>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;