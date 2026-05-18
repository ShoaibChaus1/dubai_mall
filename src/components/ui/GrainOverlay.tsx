'use client';

// GrainOverlay — fixed film-grain noise texture over the entire page
// Matches Sleep Well Creatives' global grain aesthetic
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-[200] select-none"
      style={{
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        animation: 'grainShift 8s steps(2) infinite',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        opacity: 0.18,
      }}
    />
  );
}
