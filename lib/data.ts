export type Mood = {
  id: string;
  emoji: string;
  label: string;
  description: string;
};

export type Snack = {
  id: string;
  name: string;
  emoji: string;
  brand: string;
  description: string;
  moodIds: string[];
  votes: number;
};

export type FeedPost = {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  tag?: string;
};

export const moods: Mood[] = [
  {
    id: "sweet",
    emoji: "🍫",
    label: "당충전",
    description: "회의 끝나고 멍할 때",
  },
  {
    id: "salty",
    emoji: "🧂",
    label: "짭짤한 거",
    description: "스트레스 받았을 때",
  },
  {
    id: "spicy",
    emoji: "🌶️",
    label: "매콤한 거",
    description: "월요일 점심 후",
  },
  {
    id: "healthy",
    emoji: "🥗",
    label: "건강하게",
    description: "오늘은 좀 챙겨야지",
  },
  {
    id: "hearty",
    emoji: "🍜",
    label: "든든하게",
    description: "야근 확정인 날",
  },
  {
    id: "caffeine",
    emoji: "☕",
    label: "카페인",
    description: "눈이 안 떠질 때",
  },
];

export const snacks: Snack[] = [
  {
    id: "chocopie",
    name: "초코파이",
    emoji: "🥮",
    brand: "오리온",
    description: "탕비실 상비템. 어느 회사든 있다는 그것.",
    moodIds: ["sweet", "hearty"],
    votes: 1284,
  },
  {
    id: "custard",
    name: "카스타드",
    emoji: "🧁",
    brand: "롯데",
    description: "한 입에 부드러운 위로.",
    moodIds: ["sweet"],
    votes: 921,
  },
  {
    id: "pepero",
    name: "빼빼로",
    emoji: "🍫",
    brand: "롯데",
    description: "동료한테 슬쩍 나눠주기 좋은 사이즈.",
    moodIds: ["sweet"],
    votes: 845,
  },
  {
    id: "saewookkang",
    name: "새우깡",
    emoji: "🍤",
    brand: "농심",
    description: "손이 가요 손이 가. 멈출 수가 없다.",
    moodIds: ["salty"],
    votes: 1542,
  },
  {
    id: "pocachip",
    name: "포카칩",
    emoji: "🥔",
    brand: "오리온",
    description: "오리지널이 진리. 사워크림은 거들 뿐.",
    moodIds: ["salty"],
    votes: 1133,
  },
  {
    id: "kkobukchip",
    name: "꼬북칩",
    emoji: "🐢",
    brand: "오리온",
    description: "네 겹 식감의 미친 바삭함.",
    moodIds: ["salty"],
    votes: 988,
  },
  {
    id: "buldak",
    name: "불닭볶음면 컵",
    emoji: "🔥",
    brand: "삼양",
    description: "콧등에 땀 맺힐 각오 됐다면.",
    moodIds: ["spicy", "hearty"],
    votes: 1670,
  },
  {
    id: "spicysaewoo",
    name: "매운 새우깡",
    emoji: "🌶️",
    brand: "농심",
    description: "기존 새우깡에 매콤 한 스푼.",
    moodIds: ["spicy"],
    votes: 612,
  },
  {
    id: "maracup",
    name: "마라샹궈 컵",
    emoji: "🥵",
    brand: "수입",
    description: "이걸 먹은 오후엔 미팅 잡지 마세요.",
    moodIds: ["spicy"],
    votes: 503,
  },
  {
    id: "granola",
    name: "그래놀라바",
    emoji: "🌾",
    brand: "켈로그",
    description: "오늘만큼은 건강한 척.",
    moodIds: ["healthy"],
    votes: 421,
  },
  {
    id: "nuts",
    name: "하루 견과",
    emoji: "🥜",
    brand: "마켓오",
    description: "한 봉지 = 죄책감 0g.",
    moodIds: ["healthy"],
    votes: 387,
  },
  {
    id: "ricecake",
    name: "현미 떡뻥",
    emoji: "🍙",
    brand: "닥터로빈",
    description: "공기 같은 가벼움.",
    moodIds: ["healthy"],
    votes: 215,
  },
  {
    id: "cupramen",
    name: "신라면 컵",
    emoji: "🍜",
    brand: "농심",
    description: "야근의 가장 친한 친구.",
    moodIds: ["hearty", "spicy"],
    votes: 1820,
  },
  {
    id: "hotdog",
    name: "통가슴살 핫도그",
    emoji: "🌭",
    brand: "CJ",
    description: "전자레인지 1분 30초의 마법.",
    moodIds: ["hearty"],
    votes: 734,
  },
  {
    id: "americano",
    name: "캔 아메리카노",
    emoji: "☕",
    brand: "스타벅스",
    description: "오후 3시의 영혼 충전.",
    moodIds: ["caffeine"],
    votes: 1456,
  },
  {
    id: "bacchus",
    name: "박카스",
    emoji: "🧪",
    brand: "동아",
    description: "어제 회식했다면 정답.",
    moodIds: ["caffeine"],
    votes: 678,
  },
  {
    id: "redbull",
    name: "레드불",
    emoji: "🐂",
    brand: "Red Bull",
    description: "마감 3시간 남았을 때 마지막 카드.",
    moodIds: ["caffeine"],
    votes: 891,
  },
];

export function getTopSnackByMood(moodId: string): Snack | undefined {
  return snacks
    .filter((snack) => snack.moodIds.includes(moodId))
    .sort((a, b) => b.votes - a.votes)[0];
}

export function getMoodById(id: string): Mood | undefined {
  return moods.find((mood) => mood.id === id);
}

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    nickname: "퇴근하고싶은두더지",
    avatar: "🦫",
    content:
      "오늘 사수가 마들렌 한 박스 사옴. 월요일 아침에 이런 거 하면 진짜 반칙이지... 잠 좀 깰 뻔.",
    createdAt: "방금 전",
    likes: 42,
    comments: 7,
    tag: "탕비실템",
  },
  {
    id: "p2",
    nickname: "맵찔이탈출중",
    avatar: "🐥",
    content:
      "탕비실에 불닭볶음면 누가 자꾸 끓이는데 휴게실까지 매운내가 옴ㅋㅋㅋ 범인 잡으면 신라면으로 바꾸자고 협상할거임.",
    createdAt: "12분 전",
    likes: 128,
    comments: 23,
    tag: "사건사고",
  },
  {
    id: "p3",
    nickname: "당떨어진과장",
    avatar: "🐻",
    content:
      "회의 3시간 연속 한 다음 먹는 초코파이가 진짜 인생 초코파이임. 평소엔 그냥 그런데 그 순간엔 미슐랭.",
    createdAt: "1시간 전",
    likes: 256,
    comments: 14,
    tag: "꿀팁",
  },
  {
    id: "p4",
    nickname: "야근의신",
    avatar: "🦉",
    content:
      "새벽 2시에 사무실에서 신라면 컵 끓여 먹는 거 너무 슬프지만 너무 맛있는 거 어쩔.",
    createdAt: "3시간 전",
    likes: 412,
    comments: 56,
    tag: "야근",
  },
  {
    id: "p5",
    nickname: "다이어트는내일부터",
    avatar: "🐹",
    content:
      "그래놀라바 사놓고 옆에 있는 초코파이만 먹는 중. 내일은 진짜 먹을게요 그래놀라바씨.",
    createdAt: "어제",
    likes: 88,
    comments: 11,
    tag: "다이어트",
  },
  {
    id: "p6",
    nickname: "탕비실지박령",
    avatar: "👻",
    content:
      "우리 회사 탕비실 박카스 채워 넣는 속도가 소비 속도를 못 따라감. 누구냐 너...",
    createdAt: "어제",
    likes: 167,
    comments: 31,
    tag: "사건사고",
  },
];
