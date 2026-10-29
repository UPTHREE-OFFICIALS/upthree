import { NextResponse } from "next/server";

// Hardcoded credentials for the admin demo login.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Ravavi@2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body ?? {};

    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    // Username is fixed to "admin" and cannot be changed by the user.
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Password is hardcoded for the demo.
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    return NextResponse.json({ message: "Signed in successfully." });
  } catch {
    return NextResponse.json({ error: "Could not process the request." }, { status: 500 });
  }
}
