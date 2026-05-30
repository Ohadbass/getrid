"use client";

import { useMemo, useState, useTransition } from "react";
import { saveGeoAllowedCountries } from "@/app/admin/actions/geoActions";
import { ISO_COUNTRIES } from "@/lib/countries/isoCountries";

type GeoRow = {
  code: string;
  name: string;
  enabled: boolean;
};

type Props = {
  initialRows: GeoRow[];
};

export function GeoCountriesAdminClient({ initialRows }: Props) {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialEnabled = useMemo(() => {
    const fromDb = new Set(
      initialRows.filter((r) => r.enabled).map((r) => r.code.toUpperCase()),
    );
    if (fromDb.size > 0) return fromDb;
    return new Set(["IL"]);
  }, [initialRows]);

  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(initialEnabled);

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ISO_COUNTRIES;
    return ISO_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [search]);

  function toggleCode(code: string) {
    setSelectedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  }

  function handleSave() {
    startTransition(async () => {
      setToast(null);
      const result = await saveGeoAllowedCountries(Array.from(selectedCodes));
      if (result.ok) {
        setToast({
          type: "success",
          message: "Country access updated. Changes propagate within ~60 seconds.",
        });
      } else {
        setToast({ type: "error", message: result.error });
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Country Access</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Toggle which countries can access the site. Saved changes revalidate
          the edge cache within about a minute.
        </p>
      </div>

      <input
        type="search"
        placeholder="Search by country name or code…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none ring-[#2bbcb0] focus:border-[#2bbcb0] focus:ring-2"
      />

      {toast && (
        <div
          role="status"
          className={`rounded-lg px-4 py-3 text-sm ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <ul className="max-h-[600px] overflow-y-auto rounded-xl border border-zinc-200 bg-white">
        {filteredCountries.map((country) => {
          const enabled = selectedCodes.has(country.code);
          return (
            <li
              key={country.code}
              className="flex items-center justify-between gap-4 border-b border-zinc-100 px-4 py-3 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-zinc-900">{country.name}</span>
                <span className="ms-2 text-sm text-zinc-500">{country.code}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => toggleCode(country.code)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  enabled ? "bg-[#2bbcb0]" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 border-t border-zinc-200 bg-zinc-50 py-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="rounded-lg bg-[#2bbcb0] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#25a89e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
