import { ACTIVE_AD, DEFAULT_BANNER } from "@/lib/data";

export function AdBanner() {
  const ad = ACTIVE_AD ?? DEFAULT_BANNER;
  const isDefault = !ACTIVE_AD;

  return (
    <div
      className="press relative mt-3 flex cursor-pointer items-center gap-3.5 overflow-hidden rounded-[18px] px-4 py-[15px] shadow-[0_4px_16px_rgba(23,25,35,0.12)]"
      style={{
        background: isDefault
          ? "linear-gradient(110deg,#191A1E 0%,#2E3038 60%,#3D3F4A 100%)"
          : "#FFFFFF",
      }}
    >
      <span
        className="absolute right-2.5 top-2 rounded-[5px] border px-1.5 py-[1.5px] text-[8.5px] font-extrabold tracking-[0.5px]"
        style={{
          color: isDefault ? "rgba(255,255,255,0.4)" : "#B0B1BA",
          borderColor: isDefault ? "rgba(255,255,255,0.25)" : "#ECECF1",
        }}
      >
        AD
      </span>

      <div
        className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[15px] text-[27px]"
        style={{ background: "linear-gradient(135deg,#FFE9A8,#FFD3DB)" }}
      >
        {ad.emoji ?? "📣"}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className="mb-0.5 text-[9.5px] font-bold"
          style={{ color: isDefault ? "#FFD93D" : "#8A8B94" }}
        >
          {ad.tag ?? "광고"}
        </div>
        <div
          className="text-[14.5px] font-extrabold tracking-[-0.3px]"
          style={{ color: isDefault ? "#FFFFFF" : "#191A1E" }}
        >
          {ad.title}
        </div>
        <div
          className="mt-0.5 text-[11px] font-medium"
          style={{ color: isDefault ? "rgba(255,255,255,0.65)" : "#8A8B94" }}
        >
          {ad.body}
        </div>
      </div>
    </div>
  );
}
