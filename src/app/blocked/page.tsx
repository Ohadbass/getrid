import Image from "next/image";

export default function BlockedPage() {
  return (
    <div
      dir="rtl"
      className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 px-6"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <Image
          src="/logo.svg"
          alt="Swagos"
          width={160}
          height={40}
          priority
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Swagos זמין כרגע בישראל בלבד
          </h1>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            אנחנו עובדים על הרחבת השירות. אם יש לך עניין שנעדכן אותך כשנגיע
            למדינה שלך — נשמח לשמוע.
          </p>
        </div>

        <a
          href="mailto:hello@swagos.io"
          className="inline-flex items-center justify-center rounded-full bg-[#2bbcb0] px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#25a89e]"
        >
          hello@swagos.io
        </a>
      </div>
    </div>
  );
}
