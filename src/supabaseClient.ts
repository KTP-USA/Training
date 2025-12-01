import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fjqbbgziphqfbvxuggkk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcWJiZ3ppcGhxZmJ2eHVnZ2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MzM0MTIsImV4cCI6MjA4MDEwOTQxMn0.Gs5TDmqDWSvG0Fc0UNAoeZHrTh3jBaD05OfRv82wc_Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)