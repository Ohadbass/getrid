import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 pb-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            getrid
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600">
            מוכרים הכל תוך שניות
          </p>
        </div>

        <Link
          href="/new"
          className="flex h-14 w-full max-w-xs items-center justify-center rounded-2xl bg-green-600 px-8 text-lg font-semibold text-white shadow-sm transition-colors active:bg-green-700"
        >
          צלם ומכור
        </Link>
      </div>
    </main>
  );
}
