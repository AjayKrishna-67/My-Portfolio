import { FloatingNav } from '@/components/ui/floating-navbar';
import ThemeLamp from './ThemeLamp';

const sections = [
  { name: 'Work', link: '#work' },
  { name: 'Build', link: '#build' },
  { name: 'Experience', link: '#experience' },
  { name: 'Contact', link: '#contact' },
];

function Header() {
  return (
    <>
      <ThemeLamp />

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 py-6 pr-20 pl-6 sm:pr-28 2xl:pr-6">
        <a href="#home" className="hidden items-center gap-3 leading-tight sm:flex">
          <span
            aria-hidden="true"
            className="giant sunset-fill grid size-11 place-items-center rounded-xl pt-1 text-[2rem] text-neutral-950"
          >
            A
          </span>
          <span>
          <span className="display block text-xl">Ajay Krishna</span>
          <span className="block text-sm text-neutral-600 dark:text-neutral-400">
            Full-stack developer
          </span>
          </span>
        </a>
        <nav aria-label="Sections">
          <ul className="flex gap-4 sm:gap-8 sm:text-lg">
            {sections.map((section) => (
              <li key={section.link}>
                <a href={section.link} className="link-fill">
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Reappears as a pill whenever the visitor scrolls back up. */}
      <FloatingNav
        className="top-4"
        navItems={sections.slice(0, 3)}
        cta={sections[3]}
      />
    </>
  );
}

export default Header;
