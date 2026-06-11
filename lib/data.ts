export const MONTH_LABEL = "26년 6월";

export type Mood = {
  id: string;
  e: string;
  label: string;
  accent: string;
  grad: string;
  calCoef: number;
  calBase: number;
  inverse: boolean;
  idxName: string;
};

export type Snack = {
  id: number;
  name: string;
  price: number;
  kcal: number;
  img: string;
  active: boolean;
};

export type Story = {
  id: number;
  text: string;
  time: string;
};

export type Post = {
  id: number;
  cat: string;
  text: string;
  likes: number;
  time: string;
};

export type LoungeCat = {
  id: string;
  e: string;
  label: string;
};

export type Banner = {
  emoji?: string;
  title: string;
  body: string;
  tag?: string;
};

export const MOODS: Mood[] = [
  { id: "tired",   e: "😮‍💨", label: "야근각",   accent: "#4F6EF7", grad: "linear-gradient(135deg,#EEF1FE,#F8F9FF)", calCoef: 0.30, calBase: 0,  inverse: false, idxName: "에너지" },
  { id: "scolded", e: "😤",   label: "혼났어",   accent: "#F25C5C", grad: "linear-gradient(135deg,#FEF0F0,#FFF8F8)", calCoef: 0.28, calBase: 5,  inverse: false, idxName: "위로" },
  { id: "friday",  e: "🥳",   label: "불금",     accent: "#F2A33C", grad: "linear-gradient(135deg,#FEF5E8,#FFFBF4)", calCoef: 0.25, calBase: 10, inverse: false, idxName: "신남" },
  { id: "busy",    e: "🔥",   label: "바쁨",     accent: "#2BB673", grad: "linear-gradient(135deg,#EAF8F1,#F6FCF9)", calCoef: 0.27, calBase: 5,  inverse: false, idxName: "속전" },
  { id: "meeting", e: "😐",   label: "회의지옥", accent: "#8B6FF2", grad: "linear-gradient(135deg,#F2EFFE,#FAF8FF)", calCoef: 0.15, calBase: 0,  inverse: true,  idxName: "조용" },
  { id: "monday",  e: "😑",   label: "월요병",   accent: "#6B7A8F", grad: "linear-gradient(135deg,#F0F2F5,#F9FAFB)", calCoef: 0.22, calBase: 15, inverse: false, idxName: "회복" },
];

export const SNACKS: Snack[] = [
  { id: 1,  name: "허니버터칩",  price: 1800, kcal: 300, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", active: true },
  { id: 2,  name: "몽쉘",        price: 2800, kcal: 340, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop", active: true },
  { id: 3,  name: "꼬깔콘",      price: 1400, kcal: 290, img: "https://images.unsplash.com/photo-1600478383064-3c0b84bd1afd?w=300&h=300&fit=crop", active: true },
  { id: 4,  name: "빠다코코낫",  price: 1500, kcal: 220, img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", active: true },
  { id: 5,  name: "오예스",      price: 2400, kcal: 360, img: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=300&h=300&fit=crop", active: true },
  { id: 6,  name: "죠리퐁",      price: 1200, kcal: 250, img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop", active: true },
  { id: 7,  name: "아몬드 믹스", price: 2200, kcal: 180, img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&h=300&fit=crop", active: true },
  { id: 8,  name: "비스킷",      price: 1600, kcal: 200, img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", active: true },
  { id: 9,  name: "초코바",      price: 1300, kcal: 280, img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop", active: true },
  { id: 10, name: "양갱",        price: 1100, kcal: 160, img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop", active: true },
];

export const INIT_VOTES: Record<number, Record<string, number>> = {
  1:  { tired: 241, scolded: 88,  friday: 312, busy: 198, meeting: 120, monday: 167 },
  2:  { tired: 134, scolded: 289, friday: 145, busy: 98,  meeting: 87,  monday: 234 },
  3:  { tired: 167, scolded: 98,  friday: 267, busy: 134, meeting: 110, monday: 89  },
  4:  { tired: 112, scolded: 65,  friday: 88,  busy: 76,  meeting: 234, monday: 198 },
  5:  { tired: 145, scolded: 312, friday: 167, busy: 223, meeting: 78,  monday: 145 },
  6:  { tired: 98,  scolded: 45,  friday: 120, busy: 67,  meeting: 155, monday: 188 },
  7:  { tired: 76,  scolded: 34,  friday: 55,  busy: 88,  meeting: 198, monday: 67  },
  8:  { tired: 55,  scolded: 67,  friday: 43,  busy: 54,  meeting: 87,  monday: 112 },
  9:  { tired: 88,  scolded: 123, friday: 98,  busy: 145, meeting: 45,  monday: 78  },
  10: { tired: 34,  scolded: 89,  friday: 67,  busy: 43,  meeting: 134, monday: 56  },
};

export const INIT_STORIES: Record<number, Story[]> = {
  1: [
    { id: 11, text: "야근하다가 이거 한 봉지 까면 세상이 달라짐", time: "2시간 전" },
    { id: 12, text: "단짠의 정석. 탕비실에 들어오면 하루만에 사라짐", time: "어제" },
  ],
  2: [
    { id: 21, text: "혼난 날엔 무조건 몽쉘. 초코가 마음을 감싸줌", time: "3시간 전" },
  ],
  5: [
    { id: 51, text: "오예스파 vs 몽쉘파 논쟁 종결: 둘 다 사면 됨", time: "어제" },
    { id: 52, text: "전자레인지 10초 돌려 먹어보세요. 인생 바뀜", time: "이틀 전" },
    { id: 53, text: "바쁠 때 한 입에 먹기 좋아서 책상 서랍에 상비 중", time: "3일 전" },
  ],
  10: [
    { id: 101, text: "양갱 무시하다가 회의지옥 날 먹고 팬 됐습니다", time: "어제" },
  ],
};

export const ACTIVE_AD: Banner | null = null;

export const DEFAULT_BANNER: Banner = {
  emoji: "🍪",
  title: "오늘 기분, 간식이 알아요",
  body: "기분 따라 뽑고 · 투표하고 · 우리 회사 간식 랭킹 완성!",
  tag: "탕비실 소개",
};

export const LOUNGE_CATS: LoungeCat[] = [
  { id: "newbie",  e: "🐣", label: "신입 질문" },
  { id: "culture", e: "🏢", label: "회사 문화" },
  { id: "tip",     e: "💡", label: "꿀팁" },
  { id: "daily",   e: "☕", label: "일상" },
];

export const INIT_POSTS: Post[] = [
  { id: 1, cat: "tip",     text: "경력으로 왔는데 꿀팁: 탕비실에서 마주친 분들께 간식 추천 물어보면 어색함이 순삭됩니다", likes: 103, time: "2시간 전" },
  { id: 2, cat: "newbie",  text: "점심 따로 먹어도 이상한 거 아니죠? 가끔 혼자 충전하고 싶을 때가 있어서요", likes: 91, time: "어제" },
  { id: 3, cat: "newbie",  text: "입사 첫 주인데 탕비실 간식 그냥 막 먹어도 되는 건가요...? 눈치 보여서 아직 한 개도 못 먹음", likes: 84, time: "23분 전" },
  { id: 4, cat: "culture", text: "우리 회사는 금요일마다 4시에 다같이 간식 타임 하는데 이런 문화 다른 곳도 있나요?", likes: 67, time: "1시간 전" },
  { id: 5, cat: "daily",   text: "오늘 탕비실에 신상 들어옴!! 다들 3시에 모이는 거 실화냐 ㅋㅋㅋ", likes: 55, time: "3시간 전" },
];

export function calcIndex(kcal: number, moodId: string): number {
  const m = MOODS.find((x) => x.id === moodId);
  if (!m) return 0;
  const raw = m.inverse ? 100 - kcal * m.calCoef : kcal * m.calCoef + m.calBase;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function randomMood(): Mood {
  return MOODS[Math.floor(Math.random() * MOODS.length)];
}

export function getMoodById(id: string): Mood | undefined {
  return MOODS.find((m) => m.id === id);
}

export function getSnackById(id: number): Snack | undefined {
  return SNACKS.find((s) => s.id === id);
}

export function getLoungeCat(id: string): LoungeCat | undefined {
  return LOUNGE_CATS.find((c) => c.id === id);
}
