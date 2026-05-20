import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitScore(playerName, score, maxScore) {
  const { error } = await supabase
    .from('scores')
    .insert({ player_name: playerName, score, max_score: maxScore })
  if (error) throw error
}

export async function getTodayLeaderboard() {
  // Use local midnight so the daily reset matches the user's timezone
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString()

  const { data, error } = await supabase
    .from('scores')
    .select('player_name, score, max_score, created_at')
    .gte('created_at', startOfDay)
    .lt('created_at', startOfTomorrow)
    .order('score', { ascending: false })
    .limit(10)
  if (error) throw error
  return data
}

export async function getAllTimeLeaderboard() {
  const { data, error } = await supabase
    .from('scores')
    .select('player_name, score, max_score, created_at')
    .order('score', { ascending: false })
    .limit(10)
  if (error) throw error
  return data
}
