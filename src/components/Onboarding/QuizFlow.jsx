import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const questions = [
  {
    id: 'meal',
    title: 'לאיזו ארוחה?',
    type: 'single',
    options: [
      { value: 'breakfast', label: 'ארוחת בוקר' },
      { value: 'lunch', label: 'ארוחת צהריים' },
      { value: 'dinner', label: 'ארוחת ערב' },
      { value: 'snack', label: 'נשנוש / ביניים' },
    ],
  },
  {
    id: 'mood',
    title: 'מה מצב הרוח?',
    type: 'multi',
    options: [
      { value: 'קל ובריא', label: 'משהו קל ובריא' },
      { value: 'אוכל נוחות', label: 'אוכל נוחות (comfort)' },
      { value: 'מהיר', label: 'מהיר עד 20 דק׳' },
      { value: 'מרשים לאורחים', label: 'מרשים לאורחים' },
      { value: 'עשיר בחלבון', label: 'עשיר בחלבון' },
      { value: 'טבעוני', label: 'טבעוני' },
      { value: 'ללא גלוטן', label: 'ללא גלוטן' },
      { value: 'מתוק', label: 'מתוק' },
    ],
  },
  {
    id: 'time',
    title: 'כמה זמן יש?',
    type: 'single',
    options: [
      { value: 15, label: 'עד 15 דקות — מהיר במיוחד' },
      { value: 30, label: '15-30 דקות — סביר' },
      { value: 60, label: '30-60 דקות — יש לי זמן' },
      { value: 120, label: 'שעה+ — פרויקט בישול' },
    ],
  },
]

export default function QuizFlow({ onComplete, onBack }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ meal: null, mood: [], time: null })

  const current = questions[step]
  const isLastStep = step === questions.length - 1

  const canContinue =
    current.type === 'single'
      ? answers[current.id] !== null
      : answers[current.id].length > 0

  function handleSelect(value) {
    if (current.type === 'single') {
      setAnswers((prev) => ({ ...prev, [current.id]: value }))
    } else {
      setAnswers((prev) => {
        const arr = prev[current.id]
        const next = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value]
        return { ...prev, [current.id]: next }
      })
    }
  }

  function handleContinue() {
    if (isLastStep) {
      onComplete(answers)
    } else {
      setStep((s) => s + 1)
    }
  }

  function handleBack() {
    if (step === 0) {
      onBack()
    } else {
      setStep((s) => s - 1)
    }
  }

  const isSelected = (value) =>
    current.type === 'single'
      ? answers[current.id] === value
      : answers[current.id].includes(value)

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col px-6 py-8">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i <= step ? 'bg-olive-600' : 'bg-olive-100'
            }`}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 text-cream-600 mb-6 self-start cursor-pointer"
      >
        <ArrowRight size={18} />
        חזרה
      </button>

      {/* Question */}
      <div key={step} className="animate-fade-in flex-1">
        <h2 className="text-2xl font-bold text-olive-800 mb-6">{current.title}</h2>

        <div className={current.type === 'multi' ? 'flex flex-wrap gap-3' : 'space-y-3'}>
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`
                ${current.type === 'multi' ? 'px-4 py-2 rounded-full text-sm' : 'w-full text-right px-5 py-4 rounded-2xl text-base'}
                border-2 transition-all font-medium cursor-pointer
                ${
                  isSelected(opt.value)
                    ? 'bg-olive-600 text-white border-olive-600'
                    : 'bg-white text-olive-800 border-olive-100 hover:border-olive-400'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`
          w-full py-4 rounded-2xl text-lg font-medium mt-8 transition-all flex items-center justify-center gap-2 cursor-pointer
          ${canContinue ? 'bg-olive-600 text-white hover:bg-olive-800' : 'bg-olive-100 text-olive-400 opacity-40 cursor-not-allowed'}
        `}
      >
        {isLastStep ? 'הראה לי מתכונים' : 'המשך'}
        <ArrowLeft size={20} />
      </button>
    </div>
  )
}
