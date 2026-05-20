import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-sm mx-auto px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          <Link to="/" className="text-amber-400 text-sm mb-8 block hover:text-amber-300 transition-colors">
            ← Back to game
          </Link>

          <h1 className="text-2xl font-extrabold text-white mb-1">Privacy Policy</h1>
          <p className="text-gray-600 text-xs mb-8">Last updated: May 2026</p>

          <div className="space-y-7 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold mb-2">What we collect</h2>
              <p>When you play Guesstimation we may collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
                <li>Anonymous usage data via Google Analytics (pages visited, session duration, device type, approximate location based on IP)</li>
                <li>Your chosen display name and score, only if you voluntarily submit to the leaderboard</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">Cookies</h2>
              <p>
                Google Analytics uses cookies to distinguish visitors and measure usage. These cookies do not identify you personally. You can opt out at any time using{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline"
                >
                  Google's opt-out tool
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">Leaderboard</h2>
              <p>
                If you submit a score, your chosen display name and score are stored in our database and shown publicly on the daily leaderboard. Please do not use your real name or any personal information as your display name. Scores are not permanently retained.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">Third-party services</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                <li>
                  Google Analytics —{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  Supabase (database) —{' '}
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">
                    Supabase Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">Your rights (GDPR)</h2>
              <p>
                If you are located in the EU, you have the right to access, correct, or request deletion of your data. Since leaderboard submissions contain only a display name and score with no account or email attached, contact us directly to request removal.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold mb-2">Contact</h2>
              <p>
                Questions about this policy?{' '}
                <a href="mailto:martenpimjan@live.nl" className="text-amber-400 underline">
                  martenpimjan@live.nl
                </a>
              </p>
            </section>

          </div>

          <Link
            to="/"
            className="mt-10 block w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-base py-4 rounded-2xl text-center transition-colors"
          >
            Back to game
          </Link>

        </motion.div>
      </div>
    </div>
  )
}
