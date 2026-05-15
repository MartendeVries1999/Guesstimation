import { motion } from 'framer-motion'

const features = [
  { icon: '🧠', label: 'Fermi Questions' },
  { icon: '📊', label: 'Score by closeness' },
  { icon: '↑', label: 'Swipe to advance' },
]

export default function WelcomeScreen({ onStart, totalQuestions }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.15 }}
          className="text-7xl mb-6 select-none"
        >
          🎯
        </motion.div>

        <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent tracking-tight">
          Guesstimation
        </h1>
        <p className="text-gray-400 text-base mb-8">The Consultancy Mental Gym</p>

        <div className="flex justify-center gap-6 mb-10">
          {features.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                {icon}
              </div>
              <span className="text-gray-500 text-xs">{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-gray-300 text-sm leading-relaxed">
            You'll get <span className="text-amber-400 font-semibold">{totalQuestions} estimation challenges</span> —
            the kind that come up in case interviews and strategy meetings. Type your best guess,
            lock it in, and see how close you are. Points are awarded on a{' '}
            <span className="text-amber-400 font-semibold">log scale</span> — being off by 10× costs you 20 points.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-lg py-4 rounded-2xl shadow-lg shadow-amber-400/20 transition-colors"
        >
          Start Estimating →
        </motion.button>

        <p className="text-gray-700 text-xs mt-4">
          Use k / m / b suffixes for large numbers
        </p>
      </motion.div>
    </div>
  )
}
