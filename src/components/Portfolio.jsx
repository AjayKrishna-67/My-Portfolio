import { useCallback, useState } from 'react';
import Header from './Header';
import Intro from './Intro';
import { shouldPlayIntro } from '@/lib/intro';
import Hero from './Hero';
import Areas from './Areas';
import Work from './Work';
import Toolkit from './Toolkit';
import Build from './Build';
import Experience from './Experience';
import Contact, { GITHUB_URL, LINKEDIN_URL } from './Contact';

function Portfolio() {
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());
  const endIntro = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <Intro onDone={endIntro} />}
      <Header />
      <main>
        <Hero ready={introDone} />
        <Areas />
        <Work />
        <Build />
        <Toolkit />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-neutral-600 dark:text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Ajay Krishna</p>
          <div className="flex gap-6">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="link-fill">
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="link-fill">
              LinkedIn
            </a>
            <a href="#home" className="link-fill">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Portfolio;
