type TangiMood = "default" | "excited" | "thinking" | "sleepy";

type Props = {
  size?: number;
  mood?: TangiMood;
  className?: string;
};

const eyeStyles: Record<TangiMood, { left: string; right: string }> = {
  default: { left: "M 38 52 q 2 4 4 0", right: "M 58 52 q 2 4 4 0" },
  excited: { left: "M 36 50 q 4 -6 8 0", right: "M 56 50 q 4 -6 8 0" },
  thinking: { left: "M 38 54 h 6", right: "M 58 54 h 6" },
  sleepy: { left: "M 38 54 q 2 -2 6 0", right: "M 58 54 q 2 -2 6 0" },
};

const mouthByMood: Record<TangiMood, string> = {
  default: "M 44 64 q 6 4 12 0",
  excited: "M 42 62 q 8 10 16 0",
  thinking: "M 46 66 q 4 0 8 -2",
  sleepy: "M 46 66 q 4 2 8 0",
};

export function TangiMascot({
  size = 120,
  mood = "default",
  className,
}: Props) {
  const eyes = eyeStyles[mood];
  const mouth = mouthByMood[mood];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="탕이 마스코트"
      role="img"
    >
      <defs>
        <radialGradient id="tangi-body" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffd9a8" />
          <stop offset="60%" stopColor="#ff9837" />
          <stop offset="100%" stopColor="#f05e06" />
        </radialGradient>
        <radialGradient id="tangi-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff7a9c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ff7a9c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 그림자 */}
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="#000" opacity="0.12" />

      {/* 몸통 (둥근 빵 같은 마시멜로 느낌) */}
      <path
        d="M 20 58
           C 20 36, 38 20, 50 20
           C 62 20, 80 36, 80 58
           C 80 76, 66 86, 50 86
           C 34 86, 20 76, 20 58 Z"
        fill="url(#tangi-body)"
        stroke="#c74608"
        strokeWidth="1.5"
      />

      {/* 머리 위 잎사귀 */}
      <path
        d="M 50 20 q -4 -8 -10 -8 q 4 6 6 12"
        fill="#5fbf6f"
        stroke="#3f8f4f"
        strokeWidth="1"
      />
      <path
        d="M 50 20 q 4 -10 12 -10 q -4 8 -8 14"
        fill="#7fd28e"
        stroke="#3f8f4f"
        strokeWidth="1"
      />

      {/* 볼터치 */}
      <circle cx="30" cy="62" r="6" fill="url(#tangi-cheek)" />
      <circle cx="70" cy="62" r="6" fill="url(#tangi-cheek)" />

      {/* 눈 */}
      <path
        d={eyes.left}
        stroke="#3a1a05"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={eyes.right}
        stroke="#3a1a05"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 반짝이 */}
      {mood === "excited" && (
        <>
          <circle cx="42" cy="48" r="1.2" fill="#fff" />
          <circle cx="62" cy="48" r="1.2" fill="#fff" />
        </>
      )}

      {/* 입 */}
      <path
        d={mouth}
        stroke="#3a1a05"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
