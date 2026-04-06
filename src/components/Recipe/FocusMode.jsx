import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function FocusMode({ steps, recipeName, onClose }) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState('next') // for animation direction
  const [animKey, setAnimKey] = useState(0)
  const touchStartRef = useRef(null)
  const total = steps.length

  // ── Text-to-Speech for focus mode ──
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoRead, setAutoRead] = useState(false)

  const { isRTL } = useLanguage()

  const speakStep = (stepIdx) => {
    window.speechSynthesis.cancel()
    const step = steps[stepIdx]
    if (!step) return

    const isEn = !isRTL
    const text = isEn ? `Step ${stepIdx + 1}: ${step.title}. ${step.text}` : `שלב ${stepIdx + 1}: ${step.title}. ${step.text}`
    const u = new SpeechSynthesisUtterance(text)
    const lang = isEn ? 'en-US' : 'he-IL'
    u.lang = lang
    u.rate = 0.9
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(v => v.lang === lang) || voices.find(v => v.lang.startsWith(isEn ? 'en' : 'he'))
    if (voice) u.voice = voice
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  const toggleAutoRead = () => {
    if (autoRead) {
      setAutoRead(false)
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      setAutoRead(true)
      speakStep(currentStep)
    }
  }

  // Auto-read when step changes (if autoRead is on)
  useEffect(() => {
    if (autoRead) speakStep(currentStep)
  }, [currentStep, autoRead])

  // Stop speech on unmount
  useEffect(() => {
    return () => window.speechSynthesis.cancel()
  }, [])

  // Load voices
  useEffect(() => {
    window.speechSynthesis.getVoices()
  }, [])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const goNext = () => {
    if (currentStep >= total - 1) {
      onClose()
      return
    }
    setDirection('next')
    setAnimKey(k => k + 1)
    setCurrentStep(s => s + 1)
  }

  const goPrev = () => {
    if (currentStep <= 0) return
    setDirection('prev')
    setAnimKey(k => k + 1)
    setCurrentStep(s => s - 1)
  }

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartRef.current
    touchStartRef.current = null

    // RTL: swipe right = next, swipe left = prev
    if (diff > 60) goNext()
    else if (diff < -60) goPrev()
  }

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / total) * 100

  return (
    <div className="fixed inset-0 z-[60] bg-cream-50 flex flex-col" dir="rtl">
      {/* Top bar */}
      <div className="flex-shrink-0 px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-cream-600">
            שלב {currentStep + 1} מתוך {total}
          </span>
          <span className="text-xs text-cream-400 truncate max-w-[40%]">{recipeName}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white shadow-sm cursor-pointer active:bg-cream-100"
          >
            <X size={20} className="text-olive-800" />
          </button>
        </div>

        {/* Speaker button — prominent */}
        {'speechSynthesis' in window && (
          <button
            onClick={toggleAutoRead}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl mb-2 cursor-pointer transition-all
              ${autoRead
                ? 'bg-olive-600 text-white shadow-md'
                : 'bg-white border-2 border-olive-200 text-olive-700 hover:border-olive-400'
              }`}
          >
            {autoRead
              ? <><VolumeX size={20} /> <span className="font-bold text-sm">{t('recipe.stopReadingStep')}</span></>
              : <><Volume2 size={20} /> <span className="font-bold text-sm">{t('recipe.readStep')}</span></>
            }
          </button>
        )}

        {/* Progress bar */}
        <div className="h-1 bg-cream-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-olive-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div key={animKey} className="animate-fade-in">
          {/* Step number circle */}
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 rounded-full bg-olive-600 flex items-center justify-center shadow-lg transition-all ${isSpeaking ? 'ring-4 ring-olive-300 ring-opacity-50' : ''}`}>
              <span className="text-white font-bold text-2xl">{isSpeaking ? '🔊' : currentStep + 1}</span>
            </div>
          </div>

          {/* Step title */}
          <h2 className="text-xl font-bold text-olive-800 text-center mb-4">
            {step.title}
          </h2>

          {/* Step text as bullets */}
          <ul className="text-base text-cream-600 leading-loose text-right space-y-3 px-2">
            {step.text.split('.').filter(s => s.trim()).map((sentence, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-olive-600 mt-1 shrink-0">•</span>
                <span>{sentence.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom navigation — above BottomNav safe area */}
      <div className="flex-shrink-0 px-4 pt-3 pb-[max(env(safe-area-inset-bottom,16px),24px)]">
        <div className="flex gap-3">
          {/* Previous button */}
          {currentStep > 0 ? (
            <button
              onClick={goPrev}
              className="flex-1 min-h-[64px] bg-white border-2 border-olive-200 text-olive-800 rounded-2xl flex items-center justify-center gap-2 font-bold text-base cursor-pointer active:bg-olive-50 transition-colors"
            >
              <ChevronRight size={20} />
              הקודם
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {/* Next / Finish button */}
          <button
            onClick={goNext}
            className="flex-1 min-h-[64px] bg-olive-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-base cursor-pointer active:bg-olive-800 transition-colors shadow-lg"
          >
            {currentStep < total - 1 ? (
              <>
                הבא
                <ChevronLeft size={20} />
              </>
            ) : (
              '✅ סיימתי!'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
