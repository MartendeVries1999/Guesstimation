import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-sm mx-auto bg-gray-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl shadow-black/40">
        <p className="flex-1 text-gray-400 text-xs leading-relaxed">
          We use cookies for analytics. See our{' '}
          <Link to="/privacy" className="text-amber-400 underline">Privacy Policy</Link>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
