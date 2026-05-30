"use server";

import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin/requireAdmin";
import { ISO_COUNTRIES } from "@/lib/countries/isoCountries";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRole";

export async function saveGeoAllowedCountries(
  codes: string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const { user } = await requireAdmin();

    const normalized = [
      ...new Set(
        codes
          .map((c) => c.trim().toUpperCase())
          .filter((c) => /^[A-Z]{2}$/.test(c)),
      ),
    ];
    const enabledSet = new Set(normalized);
    const knownCodes = new Set(ISO_COUNTRIES.map((c) => c.code));

    const rows = ISO_COUNTRIES.filter((c) => knownCodes.has(c.code)).map(
      (country) => ({
        code: country.code,
        name: country.name,
        enabled: enabledSet.has(country.code),
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      }),
    );

    const supabase = getSupabaseServiceRoleClient();
    const { error } = await supabase
      .from("geo_allowed_countries")
      .upsert(rows, { onConflict: "code" });

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidateTag("geo-allowed-countries", { expire: 0 });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}
