import { Sparkles, Compass } from 'lucide-react'

export default function WelcomeScreen({ onQuickHelp, onFreeBrowse }) {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-6">
      <div className="animate-fade-in text-center max-w-sm">
        {/* Logo */}
        <img src="/dubon-logo.jpg" alt="דובון" className="w-40 h-40 mx-auto mb-4 rounded-full shadow-lg" />
        <h1 className="text-5xl font-bold text-olive-600 mb-2 tracking-tight">
          דובון
        </h1>
        <p className="text-cream-600 text-lg mb-12">מתכונים שמזינים את הגוף והנשמה</p>

        {/* Options */}
        <div className="space-y-4">
          <button
            onClick={onQuickHelp}
            className="w-full bg-olive-600 text-white rounded-2xl py-4 px-6 flex items-center gap-3 justify-center text-lg font-medium hover:bg-olive-800 transition-colors cursor-pointer"
          >
            <Sparkles size={22} />
            עזרה מהירה
          </button>
          <p className="text-sm text-cream-400">שאלון קצר של 3 שאלות להמלצות מותאמות</p>

          <button
            onClick={onFreeBrowse}
            className="w-full bg-white border-2 border-olive-100 text-olive-600 rounded-2xl py-4 px-6 flex items-center gap-3 justify-center text-lg font-medium hover:bg-olive-50 transition-colors cursor-pointer"
          >
            <Compass size={22} />
            גלילה חופשית
          </button>
          <p className="text-sm text-cream-400">קפיצה ישירה לחיפוש עצמאי</p>
        </div>
      </div>
    </div>
  )
}
