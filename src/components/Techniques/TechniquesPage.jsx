import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Flame, ArrowRight } from 'lucide-react'

const techniques = [
  {
    id: 'salmon',
    title: 'צליית סלמון',
    emoji: '🐟',
    video: '/צלייה של סלמון.mp4',
    color: 'from-orange-400 to-rose-400',
    tips: [
      'לחמם את המחבת היטב לפני הנחת הדג',
      'להניח את הסלמון עם העור כלפי מטה',
      'לא להזיז את הדג — לתת לו להיצלות לבד',
      'להפוך רק כשהדג משתחרר בקלות מהמחבת',
      'לצלות 70% מהצד הראשון ו-30% מהצד השני',
    ],
  },
  {
    id: 'chicken',
    title: 'צליית חזה עוף',
    emoji: '🍗',
    video: '/צלייה של עוף על מחבת נירוסטה.mp4',
    color: 'from-amber-400 to-orange-400',
    tips: [
      'לשטח את חזה העוף לעובי אחיד לפני הצלייה',
      'לחמם מחבת נירוסטה על חום גבוה',
      'למרוח שמן על העוף, לא על המחבת',
      'לצלות בלי להזיז עד שמשתחרר לבד',
      'לתת לעוף לנוח 5 דקות אחרי הצלייה',
    ],
  },
  {
    id: 'steak',
    title: 'צליית סטייק',
    emoji: '🥩',
    video: '/צלייה של סטייק על מחבת נירוסטה.mp4',
    color: 'from-red-400 to-rose-500',
    tips: [
      'להוציא את הסטייק מהמקרר 30 דקות מראש',
      'לנגב היטב עם מגבת נייר — יובש = קראסט',
      'למלוח רק לפני הצלייה',
      'לחמם את המחבת עד שעולה ממנה עשן קל',
      'להפוך פעם אחת בלבד',
      'לתת לנוח לפחות 5 דקות לפני חיתוך',
    ],
  },
]

function TechniqueCard({ technique }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-olive-50 overflow-hidden">
      {/* Video */}
      <div className="relative">
        <video
          className="w-full aspect-video object-cover bg-black"
          controls
          preload="metadata"
          poster=""
          playsInline
        >
          <source src={technique.video} type="video/mp4" />
          הדפדפן שלך לא תומך בהצגת סרטון
        </video>
        {/* Title overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${technique.color} p-3`}>
          <h3 className="text-white font-bold text-lg flex items-center gap-2 justify-end">
            {technique.title} {technique.emoji}
          </h3>
        </div>
      </div>

      {/* Tips section */}
      <div className="p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm font-bold text-olive-600"
        >
          <span className="flex items-center gap-1">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={16} className="text-warm-orange-400" />
            {technique.tips.length} טיפים לצלייה מושלמת
          </span>
        </button>

        {expanded && (
          <ul className="mt-3 space-y-2 text-right">
            {technique.tips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-cream-800 leading-relaxed"
              >
                <span className="flex-1">{tip}</span>
                <span className="shrink-0 w-5 h-5 rounded-full bg-warm-orange-100 text-warm-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function TechniquesPage() {
  const navigate = useNavigate()

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-warm-orange-400 to-warm-orange-600 text-white px-6 pt-14 pb-10">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-right">
            <h1 className="text-2xl font-bold">טכניקות בישול</h1>
            <p className="text-warm-orange-100 text-sm mt-1">צלייה על מחבת נירוסטה 🔥</p>
          </div>
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Intro */}
      <div className="px-4 -mt-5">
        <div className="bg-white rounded-2xl shadow-sm border border-olive-50 p-4 mb-4">
          <p className="text-sm text-cream-700 text-right leading-relaxed">
            מחבת נירוסטה היא הכלי הכי טוב לצלייה. כשמחממים אותה נכון,
            שום דבר לא נדבק. הסוד: <strong>סבלנות וחום גבוה</strong>.
            צפו בסרטונים ולמדו את הטכניקה.
          </p>
        </div>

        {/* Technique cards */}
        <div className="space-y-4">
          {techniques.map(tech => (
            <TechniqueCard key={tech.id} technique={tech} />
          ))}
        </div>

        {/* General tips */}
        <div className="mt-6 bg-olive-50 rounded-2xl p-4 border border-olive-100">
          <h3 className="text-sm font-bold text-olive-700 text-right mb-3 flex items-center gap-1.5 justify-end">
            💡 כללי זהב למחבת נירוסטה
          </h3>
          <ul className="space-y-2 text-right">
            {[
              'תמיד לחמם את המחבת לפני הוספת שמן',
              'בדיקת מוכנות: טיפת מים צריכה "לרקוד" על המחבת',
              'להשתמש בשמן עם נקודת עשן גבוהה (אבוקדו, חמניות)',
              'לא להעמיס — לתת מרווח בין החתיכות',
              'אם נדבק — עוד לא מוכן! לחכות עד שמשתחרר לבד',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-olive-700">
                <span className="flex-1">{tip}</span>
                <span className="text-olive-400">•</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
