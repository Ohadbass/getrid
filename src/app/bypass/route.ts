import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const secret = process.env.GEO_BYPASS_SECRET;

  if (!secret || key !== secret) {
    return new Response("Not found", { status: 404 });
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("geo_bypass", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
