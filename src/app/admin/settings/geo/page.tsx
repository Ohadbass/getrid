import { GeoCountriesAdminClient } from "@/components/admin/GeoCountriesAdminClient";
import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRole";

export const dynamic = "force-dynamic";

export default async function GeoSettingsPage() {
  await requireAdmin();

  const supabase = getSupabaseServiceRoleClient();
  const { data: rows, error } = await supabase
    .from("geo_allowed_countries")
    .select("code, name, enabled");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <GeoCountriesAdminClient
      initialRows={(rows ?? []).map((row) => ({
        code: String(row.code).toUpperCase(),
        name: String(row.name),
        enabled: Boolean(row.enabled),
      }))}
    />
  );
}
