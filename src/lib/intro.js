// The poster name on the first page. The intro sets its word in exactly
// these classes so it can fly onto the hero's copy without resizing.
export const HERO_WORD = 'giant sunset-text text-[38vw] sm:text-[clamp(7rem,29vw,24rem)]';

export const SEEN = 'intro-seen';

// Once per browser session, and never for people who ask for less motion or
// who arrive on a link to a section further down.
export function shouldPlayIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.location.hash) return false;
    return sessionStorage.getItem(SEEN) !== '1';
  } catch {
    return false;
  }
}

