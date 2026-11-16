// A small Verlet rope for the lamp's pull cord. Coordinates are CSS pixels
// relative to the point where the cord leaves the lamp (0, 0); +y is down.
// Point 0 is fixed there, the last point is the bead.

const SEGMENTS = 12;
const ITERATIONS = 24;
const STEP = 1 / 120; // fixed simulation step, seconds
const MAX_STEPS = 8; // never catch up more than this per frame
const GRAVITY = 2400; // px/s², gives a swing of roughly 0.9s on a 52px cord
const BEAD_WEIGHT = 0.35; // inverse mass of the bead next to a cord point
const MAX_SPEED = 22; // px per step, so a hard fling cannot explode
const RETRACT = 0.86; // how fast a stretched cord winds back in, per step

export function createRope(length) {
  const pts = [];
  for (let i = 0; i <= SEGMENTS; i += 1) {
    const y = (length * i) / SEGMENTS;
    pts.push({ x: 0, y, px: 0, py: y });
  }
  return { pts, rest: length, length, pin: null, from: null };
}

const bead = (rope) => rope.pts[rope.pts.length - 1];

// Where the bead may go for a wanted spot: anywhere within the cord's length,
// and beyond it the cord feeds out with growing resistance up to `stretch`.
export function limitPull(rope, x, y, { stretch, rise }) {
  const ty = Math.max(y, -rise);
  const d = Math.hypot(x, ty);
  if (d <= rope.rest || d === 0) return { x, y: ty, pull: 0 };
  const reach =
    rope.rest + stretch * (1 - Math.exp(-(d - rope.rest) / stretch));
  return { x: (x * reach) / d, y: (ty * reach) / d, pull: reach - rope.rest };
}

// Hold the bead at a spot (the pointer, or a scripted tug).
export function holdBead(rope, x, y) {
  if (!rope.pin) {
    const b = bead(rope);
    rope.from = { x: b.x, y: b.y };
  }
  rope.pin = { x, y };
}

export function releaseBead(rope) {
  rope.pin = null;
  rope.from = null;
}

function step(rope, pin, keep) {
  const { pts } = rope;
  const last = pts.length - 1;
  const g = GRAVITY * STEP * STEP;

  for (let i = 1; i <= last; i += 1) {
    const p = pts[i];
    if (i === last && pin) {
      p.px = p.x;
      p.py = p.y;
      p.x = pin.x;
      p.y = pin.y;
      continue;
    }
    let vx = (p.x - p.px) * keep;
    let vy = (p.y - p.py) * keep;
    const speed = Math.hypot(vx, vy);
    if (speed > MAX_SPEED) {
      vx *= MAX_SPEED / speed;
      vy *= MAX_SPEED / speed;
    }
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + g;
  }

  // Held taut past its length, the cord feeds out of the lamp; let go, it
  // winds back in.
  if (pin) rope.length = Math.max(rope.rest, Math.hypot(pin.x, pin.y));
  else rope.length = rope.rest + (rope.length - rope.rest) * RETRACT;

  const seg = rope.length / SEGMENTS;
  for (let k = 0; k < ITERATIONS; k += 1) {
    for (let i = 0; i < last; i += 1) {
      const a = pts[i];
      const b = pts[i + 1];
      const wa = i === 0 ? 0 : 1;
      const wb = i + 1 === last ? (pin ? 0 : BEAD_WEIGHT) : 1;
      const w = wa + wb;
      if (w === 0) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1e-6;
      const f = (d - seg) / d / w;
      a.x += dx * f * wa;
      a.y += dy * f * wa;
      b.x -= dx * f * wb;
      b.y -= dy * f * wb;
    }
  }
}

// Advance by `seconds` of wall time. `keep` is the share of velocity kept per
// step (damping). A held bead moves smoothly from where it was last frame to
// where it is wanted now, so letting go carries the hand's real speed.
export function simulate(rope, seconds, keep) {
  const steps = Math.min(MAX_STEPS, Math.max(1, Math.round(seconds / STEP)));
  for (let s = 1; s <= steps; s += 1) {
    let pin = null;
    if (rope.pin) {
      const t = s / steps;
      const from = rope.from || rope.pin;
      pin = {
        x: from.x + (rope.pin.x - from.x) * t,
        y: from.y + (rope.pin.y - from.y) * t,
      };
    }
    step(rope, pin, keep);
  }
  if (rope.pin) rope.from = { ...rope.pin };
}

// True once the cord has hung still for a moment (a single still step at the
// end of a swing does not count).
export function isSettled(rope) {
  const still =
    !rope.pin &&
    Math.abs(rope.length - rope.rest) < 0.05 &&
    rope.pts.every(
      (p) => Math.abs(p.x) < 0.5 && Math.hypot(p.x - p.px, p.y - p.py) < 0.04,
    );
  rope.still = still ? (rope.still || 0) + 1 : 0;
  return rope.still > 12;
}

export function snapToRest(rope) {
  const seg = rope.rest / SEGMENTS;
  rope.length = rope.rest;
  rope.pts.forEach((p, i) => {
    p.x = 0;
    p.px = 0;
    p.y = seg * i;
    p.py = seg * i;
  });
}

const n = (v) => Math.round(v * 100) / 100;

// A smooth curve through the points: quadratic curves between midpoints.
export function ropePath(rope) {
  const { pts } = rope;
  const last = pts.length - 1;
  let d = `M${n(pts[0].x)} ${n(pts[0].y)}`;
  for (let i = 1; i < last; i += 1) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += `Q${n(pts[i].x)} ${n(pts[i].y)} ${n(mx)} ${n(my)}`;
  }
  return `${d}L${n(pts[last].x)} ${n(pts[last].y)}`;
}

// The bead's position and the angle it hangs at, following the cord's end.
export function beadPose(rope) {
  const { pts } = rope;
  const b = pts[pts.length - 1];
  const a = pts[pts.length - 3];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const angle = Math.hypot(dx, dy) < 0.5 ? 0 : Math.atan2(-dx, dy);
  return { x: b.x, y: b.y, angle };
}
