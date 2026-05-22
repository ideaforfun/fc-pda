export type TangiMood = "happy" | "wink" | "passed-out";

type Props = {
  size?: number;
  mood?: TangiMood;
  className?: string;
};

const eyePaths: Record<TangiMood, { left: string; right: string }> = {
  happy: { left: "M-3 0 Q0 -3 3 0", right: "M-3 0 Q0 -3 3 0" },
  wink: { left: "M-3 0 Q0 -3 3 0", right: "M-3 -1 L3 -1" },
  "passed-out": { left: "M0 -3 L0 3", right: "M0 -3 L0 3" },
};

export function TangiMascot({
  size = 80,
  mood = "happy",
  className,
}: Props) {
  const eyes = eyePaths[mood];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="탕이 마스코트"
    >
      <ellipse cx="50" cy="92" rx="28" ry="3" fill="rgba(0,0,0,0.15)" />
      <circle cx="50" cy="50" r="36" fill="#FFE066" stroke="#3D2914" strokeWidth="3" />
      <circle cx="32" cy="58" r="5" fill="#FFB6C1" opacity="0.7" />
      <circle cx="68" cy="58" r="5" fill="#FFB6C1" opacity="0.7" />
      <g transform="translate(38 48)">
        <path
          d={eyes.left}
          stroke="#3D2914"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(62 48)">
        <path
          d={eyes.right}
          stroke="#3D2914"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M 44 64 Q 50 70 56 64"
        stroke="#3D2914"
        strokeWidth="2.5"
        fill="#FFB6C1"
        strokeLinecap="round"
      />
      <path d="M 50 14 Q 47 8 50 6 Q 53 8 50 14" fill="#3D2914" />
    </svg>
  );
}
