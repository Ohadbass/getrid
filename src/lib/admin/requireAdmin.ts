import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const ADMIN_ROLES = new Set(["admin", "system_admin"]);

export async function requireAdmin() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile?.role || !ADMIN_ROLES.has(profile.role)) {
    redirect("/");
  }

  return { user, role: profile.role as string };
}
