export type Mood = {
  id: string;
  emoji: string;
  label: string;
  btn: string;
  color: string;
};

export type Snack = {
  id: number;
  name: string;
  color: string;
  emoji: string;
  votes: Record<string, number>;
};

export type Confession = {
  id: number;
  mood: string;
  text: string;
  likes: number;
  time: string;
};

export const MOODS: Mood[] = [
  { id: "tired",   emoji: "😮‍💨", label: "야근",     btn: "A1", color: "#FFD93D" },
  { id: "scolded", emoji: "😤",   label: "혼남",     btn: "A2", color: "#FF6B6B" },
  { id: "friday",  emoji: "🥳",   label: "금요일",   btn: "A3", color: "#FFA94D" },
  { id: "busy",    emoji: "🔥",   label: "바쁨",     btn: "B1", color: "#51CF66" },
  { id: "meeting", emoji: "😐",   label: "회의지옥", btn: "B2", color: "#9775FA" },
  { id: "monday",  emoji: "😑",   label: "월요병",   btn: "B3", color: "#74C0FC" },
];

export const SNACKS: Snack[] = [
  {
    id: 1,
    name: "허니버터칩",
    color: "#FFE5A0",
    emoji: "🟡",
    votes: { tired: 241, scolded: 88, friday: 312, busy: 198, meeting: 120, monday: 167 },
  },
  {
    id: 2,
    name: "몽쉘",
    color: "#8B4513",
    emoji: "🟫",
    votes: { tired: 134, scolded: 289, friday: 145, busy: 98, meeting: 87, monday: 234 },
  },
  {
    id: 3,
    name: "꼬깔콘",
    color: "#FFB347",
    emoji: "🟧",
    votes: { tired: 167, scolded: 98, friday: 267, busy: 134, meeting: 110, monday: 89 },
  },
  {
    id: 4,
    name: "빠다코코낫",
    color: "#FFF8DC",
    emoji: "⚪",
    votes: { tired: 112, scolded: 65, friday: 88, busy: 76, meeting: 234, monday: 198 },
  },
  {
    id: 5,
    name: "오예스",
    color: "#5C3317",
    emoji: "🟤",
    votes: { tired: 145, scolded: 312, friday: 167, busy: 223, meeting: 78, monday: 145 },
  },
];

export const CONFESSIONS: Confession[] = [
  {
    id: 1,
    mood: "scolded",
    text: "팀장한테 꼬여서 혼남. 오예스 3개 먹고 살았음",
    likes: 47,
    time: "18분 전",
  },
  {
    id: 2,
    mood: "friday",
    text: "드디어 금요일! 허니버터칩 한 봉지 죄책감 없음",
    likes: 89,
    time: "1시간 전",
  },
  {
    id: 3,
    mood: "tired",
    text: "야근 3일째. 죠리퐁이 저를 살려주고 있어요",
    likes: 62,
    time: "2시간 전",
  },
];

export function getMoodById(id: string): Mood | undefined {
  return MOODS.find((m) => m.id === id);
}

export function getRankedSnacks(moodId: string): Snack[] {
  return [...SNACKS].sort(
    (a, b) => (b.votes[moodId] ?? 0) - (a.votes[moodId] ?? 0),
  );
}
