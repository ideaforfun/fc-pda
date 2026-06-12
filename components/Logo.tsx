const TILES = [
  { ch: "탕", bg: "#FFE9A8", rot: -5 },
  { ch: "비", bg: "#FFD3DB", rot: 3 },
  { ch: "실", bg: "#CDE6FF", rot: -2 },
] as const;

type Props = {
  size?: number;
};

export function Logo({ size = 1 }: Props) {
  return (
    <div className="flex items-center" style={{ gap: 4 * size }}>
      {TILES.map((t, i) => (
        <span
          key={t.ch}
          className="inline-flex items-center justify-center font-display leading-none animate-tile-wobble"
          style={{
            width: 34 * size,
            height: 34 * size,
            background: t.bg,
            borderRadius: 10 * size,
            transform: `rotate(${t.rot}deg)`,
            fontSize: 20 * size,
            color: "#191A1E",
            boxShadow: "0 2px 6px rgba(23, 25, 35, 0.10)",
            animationDelay: `${i * 0.12}s`,
          }}
        >
          {t.ch}
        </span>
      ))}
      <span
        className="inline-block animate-cookie-bounce"
        style={{ fontSize: 20 * size, marginLeft: 2 * size }}
      >
        🍪
      </span>
    </div>
  );
}
