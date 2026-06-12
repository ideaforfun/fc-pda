const KEY = "tangbisil:user_token";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `u_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * 익명 user_token (브리프 §3 vote_logs / post_likes 의 user_token).
 * 클라이언트에서만 호출. 첫 호출 시 localStorage에 생성/저장.
 */
export function getUserToken(): string {
  if (typeof window === "undefined") return "";
  let t = window.localStorage.getItem(KEY);
  if (!t) {
    t = uuid();
    window.localStorage.setItem(KEY, t);
  }
  return t;
}
