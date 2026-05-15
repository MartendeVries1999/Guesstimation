import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import CardDeck from './components/CardDeck'
import ResultsScreen from './components/ResultsScreen'
import { prompts } from './data/prompts'

export default function App() {
  const [phase, setPhase] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleStart = () => setPhase('playing')

  const handleAnswer = (promptId, guess, score) => {
    setAnswers((prev) => [...prev, { promptId, guess, score }])
  }

  const handleNext = () => {
    if (currentIndex >= prompts.length - 1) {
      setPhase('results')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handleRestart = () => {
    setPhase('welcome')
    setCurrentIndex(0)
    setAnswers([])
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen onStart={handleStart} totalQuestions={prompts.length} />
          </motion.div>
        )}
        {phase === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardDeck
              prompt={prompts[currentIndex]}
              currentIndex={currentIndex}
              total={prompts.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </motion.div>
        )}
        {phase === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen answers={answers} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
