import { NextRequest, NextResponse } from "next/server";
import { checkPermission } from "./lib/auth";
import x_axios from "./lib/axios";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/signup/confirm") {
    try {
      const url = req.nextUrl;
      const email = url.searchParams.get("email");
      const token = url.searchParams.get("token");

      if (!email || !token) {
        return NextResponse.redirect(
          new URL("/signup/confirm/failed", req.url)
        );
      }

      await x_axios.post("/auth/signup/confirm", { email, token });

      return NextResponse.redirect(new URL("/signup/confirm/success", req.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/signup/confirm/failed", req.url));
    }
  }

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  try {
    const apiResponse = await fetch(`${process.env.API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (apiResponse.ok) {
      if (!pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      const response = NextResponse.next();

      const data = await apiResponse.json();

      if (data?.data?.profile) {
        response.headers.set("x-profile", JSON.stringify(data.data.profile));
      }

      if (
        pathname === "/dashboard/users" &&
        !checkPermission(["manage-users"], data.data.profile)
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return response;
    } else {
      req.cookies.delete("jwt");
      req.cookies.delete("profile");

      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/recovery", "/signup/confirm"],
};
