import { NextResponse, type NextRequest } from "next/server";

function isGeoExemptPath(pathname: string): boolean {
  if (pathname.includes(".")) return true;
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname === "/blocked" || pathname.startsWith("/blocked/")) return true;
  if (pathname === "/bypass" || pathname.startsWith("/bypass/")) return true;
  if (pathname.startsWith("/api/webhooks/")) return true;
  if (pathname.startsWith("/api/inngest")) return true;
  if (pathname.startsWith("/api/cron")) return true;
  if (pathname.startsWith("/api/internal/")) return true;
  if (pathname.startsWith("/api/admin/security-reports/upload")) return true;
  if (pathname.startsWith("/api/onboarding/")) return true;
  return false;
}

async function getAllowedCountryCodes(request: NextRequest): Promise<string[]> {
  const url = new URL("/api/internal/geo-allowed-countries", request.url);
  const res = await fetch(url, {
    next: { revalidate: 60, tags: ["geo-allowed-countries"] },
  });

  if (!res.ok) {
    return [];
  }

  const body = (await res.json()) as { codes?: string[] };
  return (body.codes ?? []).map((c) => c.toUpperCase());
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isGeoExemptPath(pathname)) {
    const countryHeader = request.headers.get("x-vercel-ip-country");

    if (countryHeader) {
      const bypassSecret = process.env.GEO_BYPASS_SECRET;
      const bypassCookie = request.cookies.get("geo_bypass")?.value;
      const hasBypass =
        Boolean(bypassSecret) && bypassCookie === bypassSecret;

      if (!hasBypass) {
        const country = countryHeader.toUpperCase();
        const allowedCodes = await getAllowedCountryCodes(request);

        if (!allowedCodes.includes(country)) {
          const blockedUrl = new URL("/blocked", request.url);
          blockedUrl.searchParams.set("from", pathname);
          return NextResponse.redirect(blockedUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
