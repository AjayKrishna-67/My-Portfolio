import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
    title: '' 
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    emailjs
      .sendForm('service_o7cc5vj', 'template_vt0ifp8', form.current, 'GPLTnskmZk-yw7y2M')
      .then(
        (result) => {
          console.log('Success:', result.text);
          setStatus('Message sent successfully!');
          setFormData({ user_name: '', user_email: '', message: '', title: '' });
        },
        (error) => {
          console.error('Error:', error.text);
          setStatus(`Error: ${error.text}`);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-8 text-center">
         <h2 className="text-5xl font-extrabold relative inline-block text-white">Contact
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B8CFCE] animate-scale-in-out"></span>
        </h2>
        <form ref={form} onSubmit={sendEmail} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user_name" className="sr-only">Name</label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300  text-white focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="user_email" className="sr-only">Email address</label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300  text-white focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.user_email}
                onChange={handleChange}
              />
            </div>
             <div>
              <label htmlFor="title" className="sr-only">Subject</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300  text-white focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Subject"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300  text-white focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              className="mt-2 font-bold text-xl w-[30%] relative group cursor-pointer inline-block z-10"
            >
              <span className="relative text-white z-10 hover:text-black p-3">Submit</span>
              <span className="absolute left-0 bottom-0 w-full bg-white transition-all duration-300 h-0.5 rounded group-hover:h-[23px]  group-hover:z-0 z-[-1]"></span>
            </button>
          </div>
        </form>
        {status && (
          <p className={`text-center text-sm ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;