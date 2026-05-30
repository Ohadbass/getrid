import Link from "next/link";

export default function NewListingPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold text-zinc-900">פריט חדש</h1>
        <p className="leading-relaxed text-zinc-600">
          בקרוב — צילום, זיהוי AI ופרסום תוך שניות.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-green-700 underline-offset-2 hover:underline"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </main>
  );
}
