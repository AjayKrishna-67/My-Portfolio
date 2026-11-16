// The tab icon: the "A" tile from the header. The sunset gradient turns
// slowly around the tile and the A blinks twice every few seconds, like the
// intro. public/favicon.svg is the still version, used until this runs and
// for people who ask for less motion.
const A = 'M7 27 13 5h6l6 22h-4.5l-1.1-4.5h-6.8L11.5 27H7Zm6.6-8.5h4.8L16 9.2l-2.4 9.3Z';
const STOPS = ['#ffd100', '#ff8a00', '#ff3d81', '#ff8a00', '#ffd100'];
const FPS = 12;
const TURN_S = 6; // one full turn of the gradient
const BLINK_EVERY_S = 5;

export function animateFavicon() {
  const link = document.querySelector('link[rel="icon"]');
  if (!link) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx || typeof ctx.createConicGradient !== 'function') return;

  const letter = new Path2D(A);
  const tile = new Path2D();
  tile.roundRect(0, 0, 32, 32, 7);
  link.type = 'image/png';
  const start = performance.now();

  const draw = () => {
    const t = (performance.now() - start) / 1000;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, 32, 32);

    const sweep = ctx.createConicGradient(((t / TURN_S) % 1) * Math.PI * 2, 16, 16);
    STOPS.forEach((color, i) => sweep.addColorStop(i / (STOPS.length - 1), color));
    ctx.fillStyle = sweep;
    ctx.fill(tile);

    // Two quick blinks at the start of each cycle.
    const phase = t % BLINK_EVERY_S;
    const hidden = phase < 1 && Math.floor(phase / 0.25) % 2 === 1;
    if (!hidden) {
      ctx.fillStyle = '#0a0a0a';
      ctx.fill(letter, 'evenodd');
    }
    link.href = canvas.toDataURL('image/png');
  };

  draw();
  setInterval(draw, 1000 / FPS);
}
