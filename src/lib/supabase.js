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
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('scores')
    .select('player_name, score, max_score, created_at')
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`)
    .order('score', { ascending: false })
    .limit(10)
  if (error) throw error
  return data
}
