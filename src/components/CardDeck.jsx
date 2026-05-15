import { motion, AnimatePresence } from 'framer-motion'
import QuestionCard from './QuestionCard'

export default function CardDeck({ prompt, currentIndex, total, onAnswer, onNext }) {
  const progress = (currentIndex / total) * 100

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-gray-600 text-sm">
            Question <span className="text-gray-400 font-medium">{currentIndex + 1}</span> of {total}
          </span>
          <span className="text-amber-500 font-semibold text-sm tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
            initial={{ width: `${(currentIndex / total) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -56, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <QuestionCard prompt={prompt} onAnswer={onAnswer} onNext={onNext} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
