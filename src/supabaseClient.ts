import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nlqzyujnlcmfrqobioyi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scXp5dWpubGNtZnJxb2Jpb3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzkxMDEsImV4cCI6MjA3ODIxNTEwMX0.FIMRu1cVfyKZhjTAY6YnsQXGQ8Rr_kvNho4HeCl0bXw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)