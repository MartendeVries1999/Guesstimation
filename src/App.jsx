import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import CardDeck from './components/CardDeck'
import ResultsScreen from './components/ResultsScreen'
import PrivacyPage from './components/PrivacyPage'
import CookieBanner from './components/CookieBanner'
import { prompts } from './data/prompts'

const QUESTIONS_PER_ROUND = 10

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function Game() {
  const [phase, setPhase] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [gamePrompts, setGamePrompts] = useState([])

  const handleStart = () => {
    setGamePrompts(pickRandom(prompts, QUESTIONS_PER_ROUND))
    setPhase('playing')
  }

  const handleAnswer = (promptId, guess, score) => {
    setAnswers((prev) => [...prev, { promptId, guess, score }])
  }

  const handleNext = () => {
    if (currentIndex >= gamePrompts.length - 1) {
      setPhase('results')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handleRestart = () => {
    setPhase('welcome')
    setCurrentIndex(0)
    setAnswers([])
    setGamePrompts([])
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen onStart={handleStart} totalQuestions={QUESTIONS_PER_ROUND} />
          </motion.div>
        )}
        {phase === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardDeck
              prompt={gamePrompts[currentIndex]}
              currentIndex={currentIndex}
              total={gamePrompts.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </motion.div>
        )}
        {phase === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen answers={answers} prompts={gamePrompts} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <CookieBanner />
    </>
  )
}
