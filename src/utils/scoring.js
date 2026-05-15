export function parseNumber(input) {
  if (!input) return null
  const cleaned = input.toString().replace(/[,\s]/g, '').toLowerCase()
  const multipliers = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 }
  const suffix = cleaned.slice(-1)
  if (multipliers[suffix]) {
    const num = parseFloat(cleaned.slice(0, -1))
    return isNaN(num) ? null : num * multipliers[suffix]
  }
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

export function calculateScore(guess, answer) {
  if (!guess || guess <= 0 || answer <= 0) return 0
  const logError = Math.abs(Math.log10(guess / answer))
  return Math.max(0, Math.round(100 - 20 * logError))
}

export function formatNumber(num) {
  if (!num && num !== 0) return '?'
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1e4) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toLocaleString()
}

export function getScoreInfo(score) {
  if (score >= 90) return { label: 'Spot on!', emoji: '🎯', colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/10 border-emerald-500/40' }
  if (score >= 70) return { label: 'Very close!', emoji: '✅', colorClass: 'text-green-400', bgClass: 'bg-green-500/10 border-green-500/40' }
  if (score >= 50) return { label: 'In the ballpark', emoji: '👍', colorClass: 'text-yellow-400', bgClass: 'bg-yellow-500/10 border-yellow-500/40' }
  if (score >= 30) return { label: 'Off the mark', emoji: '😬', colorClass: 'text-orange-400', bgClass: 'bg-orange-500/10 border-orange-500/40' }
  return { label: 'Way off!', emoji: '💥', colorClass: 'text-red-400', bgClass: 'bg-red-500/10 border-red-500/40' }
}

export function getFinalRank(totalScore, numQuestions) {
  const avg = totalScore / numQuestions
  if (avg >= 80) return { rank: 'Fermi Expert', icon: '🎯', grade: 'A', desc: 'You think like a McKinsey partner.' }
  if (avg >= 60) return { rank: 'Sharp Analyst', icon: '📊', grade: 'B', desc: 'Strong order-of-magnitude thinking.' }
  if (avg >= 40) return { rank: 'Decent Estimator', icon: '🔍', grade: 'C', desc: 'You have the instinct, refine the calibration.' }
  if (avg >= 20) return { rank: 'Wild Guesser', icon: '🎲', grade: 'D', desc: 'Some practice will sharpen your intuition.' }
  return { rank: 'Back to Business School', icon: '📚', grade: 'F', desc: 'Start with the basics — you\'ll get there.' }
}
