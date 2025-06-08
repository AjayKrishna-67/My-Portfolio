import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const welcomes = [
    { language: 'English', text: 'Welcome' },
    { language: 'Tamil', text: 'வணக்கம்' },
    { language: 'Hindi', text: 'स्वागत है' },
    { language: 'Spanish', text: 'Bienvenido' },
    { language: 'French', text: 'Bienvenue' },
    { language: 'German', text: 'Willkommen' },
    { language: 'Japanese', text: 'ようこそ' },
  ];

  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCurrentWelcomeIndex((prevIndex) => 
        (prevIndex + 1) % welcomes.length
      );
    }, 300);

    const navigationTimer = setTimeout(() => {
      navigate('/__Ajay_Krishna__');
    }, 2000);

    return () => {
      clearInterval(cycleInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigate, welcomes.length]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-5xl font-bold text-white mb-4 animate-pulse">
        {welcomes[currentWelcomeIndex].text}
      </div>
    </div>
  );
}

export default Landing;