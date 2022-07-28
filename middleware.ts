import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const jwtSecret = process.env.SECRET;

export const config = {
  matcher: [
    "/",
    "/show/add",
    "/show/detail/:id",
    "/show/edit/:id",
    "/login",
    "/signup",
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const notPriv =
    url.pathname.includes("/login") || url.pathname.includes("/signup");

  let jwtValid = true;

  const jwtToken = req.cookies.get("token");
  try {
    const { payload: jwtData } = await jose.jwtVerify(
      jwtToken!,
      new TextEncoder().encode(jwtSecret)
    );
  } catch (error) {
    console.error(error);
    jwtValid = false;
  }

  console.log(jwtToken, notPriv, jwtValid);

  if (!notPriv && !jwtValid) {
    url.pathname = "/login";
  } else if (notPriv && jwtValid) {
    url.pathname = "/";
  } else {
    return NextResponse.next();
  }
  const response = NextResponse.redirect(url);

  response.cookies.delete("token");

  return response;
}
