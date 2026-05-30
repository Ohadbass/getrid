import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRole";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseServiceRoleClient();
    const { data, error } = await supabase
      .from("geo_allowed_countries")
      .select("code")
      .eq("enabled", true);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }

    const codes = (data ?? []).map((row) =>
      String(row.code).toUpperCase(),
    );

    return NextResponse.json(
      { codes },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
