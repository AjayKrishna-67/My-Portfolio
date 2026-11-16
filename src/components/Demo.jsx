import AsciiArtDemo from './ascii-art-demo';
import TextFlippingBoardDemo from './text-flipping-board-demo';

// Dev-only page: the two Aceternity demos exactly as shipped, for comparing
// against the source at https://ui.aceternity.com.
function Demo() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="display text-4xl">Component demos</h1>
      <h2 className="mt-12 text-xl font-semibold">Text flipping board</h2>
      <TextFlippingBoardDemo />
      <h2 className="mt-12 mb-8 text-xl font-semibold">ASCII art</h2>
      <AsciiArtDemo />
    </main>
  );
}

export default Demo;
