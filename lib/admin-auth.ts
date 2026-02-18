import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get admin user session
export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("auth_token", token)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

// Verify admin authentication
export async function verifyAdminAuth() {
  const session = await getAdminSession()
  return !!session
}
