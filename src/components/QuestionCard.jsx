import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseNumber, calculateScore, formatNumber, getScoreInfo } from '../utils/scoring'

const CATEGORY_STYLES = {
  Aviation:     { badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',    dot: 'bg-blue-400' },
  Architecture: { badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30', dot: 'bg-purple-400' },
  'Food & Drink': { badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30', dot: 'bg-orange-400' },
  Technology:   { badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  'Human Body': { badge: 'bg-pink-500/15 text-pink-300 border-pink-500/30',    dot: 'bg-pink-400' },
  Space:        { badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30', dot: 'bg-indigo-400' },
  Physics:      { badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',    dot: 'bg-cyan-400' },
  Economy:      { badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', dot: 'bg-amber-400' },
  Geography:    { badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',    dot: 'bg-teal-400' },
}

const DEFAULT_STYLE = { badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', dot: 'bg-amber-400' }

export default function QuestionCard({ prompt, onAnswer, onNext }) {
  const [phase, setPhase] = useState('question')
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [score, setScore] = useState(null)
  const [parsedGuess, setParsedGuess] = useState(null)
  const inputRef = useRef(null)

  const style = CATEGORY_STYLES[prompt.category] ?? DEFAULT_STYLE

  const handleSubmit = () => {
    const num = parseNumber(inputValue)
    if (!num || num <= 0) {
      setError('Enter a positive number — try "10k" or "2.5m"')
      inputRef.current?.focus()
      return
    }
    setError('')
    const s = calculateScore(num, prompt.answer)
    setParsedGuess(num)
    setScore(s)
    onAnswer(prompt.id, num, s)
    setPhase('reveal')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const scoreInfo = score !== null ? getScoreInfo(score) : null

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
         style={{ background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)' }}>

      {/* Category */}
      <div className="px-6 pt-6 pb-3">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${style.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {prompt.category}
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-5">
        <h2 className="text-xl font-bold text-white leading-snug">{prompt.question}</h2>
      </div>

      <div className="h-px bg-white/5 mx-6" />

      {/* Dynamic area */}
      <AnimatePresence mode="wait">
        {phase === 'question' ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-6"
          >
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-3">
              Your estimate
            </label>

            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 10k, 2.5m, 8b"
              autoFocus
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-lg font-mono focus:outline-none focus:border-amber-400/60 focus:bg-white/8 transition-all"
            />

            {error ? (
              <p className="text-red-400 text-xs mt-2">{error}</p>
            ) : (
              <p className="text-gray-700 text-xs mt-2">k = thousands · m = millions · b = billions</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="mt-5 w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-base py-4 rounded-2xl transition-colors shadow-lg shadow-amber-400/20"
            >
              Lock In My Guess →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-6"
          >
            {/* Score row */}
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className={`w-20 h-20 shrink-0 rounded-2xl border-2 flex flex-col items-center justify-center ${scoreInfo.bgClass}`}
              >
                <span className={`text-2xl font-extrabold leading-none ${scoreInfo.colorClass}`}>{score}</span>
                <span className="text-gray-600 text-xs mt-0.5">pts</span>
              </motion.div>
              <div>
                <div className={`text-lg font-bold ${scoreInfo.colorClass}`}>
                  {scoreInfo.emoji} {scoreInfo.label}
                </div>
                <div className="text-gray-500 text-sm">out of 100 points</div>
              </div>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-gray-600 text-xs mb-1">Your guess</div>
                <div className="text-white font-bold text-xl">{formatNumber(parsedGuess)}</div>
                <div className="text-gray-600 text-xs">{prompt.unit}</div>
              </div>
              <div className="bg-amber-400/8 rounded-xl p-3 border border-amber-400/25">
                <div className="text-amber-500/70 text-xs mb-1">Actual answer</div>
                <div className="text-amber-400 font-bold text-xl">{formatNumber(prompt.answer)}</div>
                <div className="text-amber-500/50 text-xs">{prompt.unit}</div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-white/4 rounded-xl p-4 mb-5 border border-white/8">
              <p className="text-gray-400 text-sm leading-relaxed">{prompt.explanation}</p>
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="w-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold text-base py-4 rounded-2xl transition-all"
            >
              Next Question ↑
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
