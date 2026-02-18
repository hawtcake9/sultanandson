import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ktlwgobzvwktsrhjnpfr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bHdnb2J6dndrdHNyaGpucGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Nzc4ODMsImV4cCI6MjA4NjU1Mzg4M30.OXQyqjHBiWEzyi4Vkf3M1Xg2kdA_gmefdG4yjPs5onc"

export const supabase = createClient(supabaseUrl, supabaseKey)
