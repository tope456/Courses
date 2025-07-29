import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Course = {
  id: number
  title: string
  description: string
  price: number
  duration: string
  branch: string
  technology: string
  program: string
  image_url?: string
  created_at?: string
  updated_at?: string
  link?: string
  tags?: string
}