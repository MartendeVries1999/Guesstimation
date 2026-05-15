import { motion } from 'framer-motion'
import { formatNumber, getFinalRank, getScoreInfo } from '../utils/scoring'
import { prompts } from '../data/prompts'

export default function ResultsScreen({ answers, onRestart }) {
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
  const maxScore = answers.length * 100
  const pct = Math.round((totalScore / maxScore) * 100)
  const rank = getFinalRank(totalScore, answers.length)

  const best = answers.reduce((a, b) => (a.score > b.score ? a : b), answers[0])
  const worst = answers.reduce((a, b) => (a.score < b.score ? a : b), answers[0])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-sm mx-auto px-5 py-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="text-6xl mb-4 select-none"
          >
            {rank.icon}
          </motion.div>
          <h1 className="text-3xl font-extrabold text-white mb-1">{rank.rank}</h1>
          <p className="text-gray-400 text-sm">{rank.desc}</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-400/8 border border-amber-400/25 rounded-3xl p-6 text-center mb-5"
        >
          <div className="text-6xl font-extrabold text-amber-400 leading-none mb-1">
            {totalScore}
          </div>
          <div className="text-gray-500 text-sm mb-4">out of {maxScore} points</div>
          <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-amber-500/70 text-sm">
            Grade <span className="font-bold text-amber-400">{rank.grade}</span> · {pct}% accuracy
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          {[
            { label: 'Best question', answer: best, emoji: '⭐' },
            { label: 'Hardest miss', answer: worst, emoji: '💡' },
          ].map(({ label, answer, emoji }) => {
            const p = prompts.find((q) => q.id === answer.promptId)
            return (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-xs text-gray-500 mb-1">{emoji} {label}</div>
                <div className={`text-2xl font-extrabold mb-0.5 ${getScoreInfo(answer.score).colorClass}`}>
                  {answer.score}
                </div>
                <div className="text-gray-500 text-xs leading-tight line-clamp-2">{p?.question}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <h2 className="text-gray-600 text-xs uppercase tracking-wider mb-3">All questions</h2>
          <div className="space-y-2">
            {answers.map((answer) => {
              const p = prompts.find((q) => q.id === answer.promptId)
              const info = getScoreInfo(answer.score)
              return (
                <div
                  key={answer.promptId}
                  className="flex items-center gap-3 bg-white/4 rounded-xl px-3 py-2.5 border border-white/8"
                >
                  <span className={`text-sm font-bold w-9 text-center shrink-0 rounded-lg py-1 ${info.colorClass} bg-white/5`}>
                    {answer.score}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-300 text-xs truncate">{p?.question}</div>
                    <div className="flex gap-1.5 mt-0.5 text-xs text-gray-600">
                      <span>You: {formatNumber(answer.guess)} {p?.unit}</span>
                      <span>·</span>
                      <span className="text-amber-500/60">Ans: {formatNumber(p?.answer)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-lg py-4 rounded-2xl shadow-lg shadow-amber-400/20 transition-colors"
        >
          Play Again 🎯
        </motion.button>
      </div>
    </div>
  )
}
