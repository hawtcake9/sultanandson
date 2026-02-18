import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_token")

    return NextResponse.redirect(new URL("/login", request.url), {
      status: 302,
    })
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 })
  }
}
