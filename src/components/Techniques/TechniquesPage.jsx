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
      'תיבול: מלח על העור רק שניות לפני הצלייה — המתנה מוציאה נוזלים ופוגעת בפריכות',
      'טריק מחבת קרה: להניח את הסלמון עם העור למטה במחבת קרה, להוסיף שמן, ורק אז להדליק אש נמוכה',
      'החימום האיטי גורם לשומן שמתחת לעור לעבור "רינדור" — מיצוי שהופך את העור לפריך במיוחד',
      'חוק 90/10: צולים 90% מהזמן על צד העור, לא הופכים עד שהעור משתחרר מעצמו',
      'הדג יידבק למחבת בהתחלה — זה בסדר! ההידבקות יוצרת את המעטפת הזהובה. כשמוכן, הוא ישתחרר לבד',
      'בדיקת מוכנות: לנער בעדינות את המחבת — אם הסלמון זז בחופשיות, הוא מוכן',
      'לסיום: להפוך לצד השני לזמן קצר מאוד רק כדי "לסגור", ולהגיש עם העור כלפי מעלה כדי לשמור על הפריכות',
    ],
  },
  {
    id: 'chicken',
    title: 'צליית כרעי עוף',
    emoji: '🍗',
    video: '/צלייה של עוף על מחבת נירוסטה.mp4',
    color: 'from-amber-400 to-orange-400',
    tips: [
      'הכנה: להשתמש בכרע עוף עם עור, להסיר את העצם המרכזית — חותכים לאורך קו השומן ומחלצים לנתח שטוח',
      'תיבול: מלח בלבד לפני הצלייה — תבלינים כמו פפריקה או עשבי תיבול נשרפים על נירוסטה ונותנים טעם מר',
      'מחבת קרה: להניח עוף עם העור למטה במחבת קרה עם שמן, להדליק אש נמוכה — הרינדור האיטי הופך את העור לקריספי כמו צ׳יפס',
      'חוק 90/10: צולים 90% מהזמן על צד העור — העור מגן על הבשר ושומר עליו עסיסי',
      'שימון (Basting): כשהשומן מצטבר במחבת, ליצוק אותו בכף מעל הצד הבשרי — בישול אחיד וטעם עשיר',
      'העוף יידבק בהתחלה — סבלנות! לנער את המחבת, כשהעור מוכן הוא ישתחרר לבד',
      'סיום: להפוך לצד הבשר ל-30 שניות בלבד, להגיש עם העור למעלה כדי לשמור על הפריכות',
      'טיפ בונוס: המשקעים במחבת (ה-Fond) הם ריכוז טעם — בסיס מצוין לרוטב',
    ],
  },
  {
    id: 'steak',
    title: 'צליית סטייק',
    emoji: '🥩',
    video: '/צלייה של סטייק על מחבת נירוסטה.mp4',
    color: 'from-red-400 to-rose-500',
    tips: [
      'ייבוש קריטי: לנגב את הסטייק עם נייר סופג מכל הצדדים — לחות היא האויב של הצריבה (Searing). בלי ייבוש תקבלו אידוי במקום מעטפת שחומה',
      'טמפרטורת חדר: להוציא מהמקרר 30-45 דקות מראש על רשת — סטייק קר יוריד את חום המחבת ויתבשל לא אחיד',
      'בדיקת "כדור הכספית": לחמם מחבת על יבש (בלי שמן!), לטפטף מים — אם הטיפות רוקדות כמו כדורי כספית, המחבת מוכנה (אפקט ליידנפרוסט)',
      'צלייה: להוסיף שמן עם נקודת עישון גבוהה ומיד את הסטייק. מלח ופלפל בשפע',
      'שימון (Basting): לקראת הסוף להוסיף חמאה, שום מעוך וענף טימין/רוזמרין — ליצוק את החמאה המומסת על הסטייק בכף ללא הפסקה',
      'הידבקות: הסטייק יידבק בהתחלה — לא להזיז! כשנוצרת הצריבה המושלמת, הוא ישתחרר לבד',
      'מנוחה חובה: 5-10 דקות לפני חיתוך — מאפשר לנוזלים להתפזר חזרה בנתח. חיתוך מיידי = בשר יבש',
    ],
  },
]

function TechniqueCard({ technique }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-olive-50 overflow-hidden">
      {/* Title bar */}
      <div className={`bg-gradient-to-l ${technique.color} px-4 py-2.5`}>
        <h3 className="text-white font-bold text-lg flex items-center gap-2 justify-end">
          {technique.title} {technique.emoji}
        </h3>
      </div>
      {/* Video */}
      <div>
        <video
          className="w-full aspect-video object-cover bg-black"
          controls
          preload="metadata"
          playsInline
        >
          <source src={technique.video} type="video/mp4" />
          הדפדפן שלך לא תומך בהצגת סרטון
        </video>
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
              'שתי שיטות: מחבת קרה עם שמן (סלמון, עוף) — רינדור איטי לעור פריך | מחבת לוהטת (סטייק) — צריבה חזקה למעטפת שחומה',
              'בדיקת כדור הכספית: טיפות מים שרוקדות על המחבת = טמפרטורה מושלמת לסטייק',
              'להשתמש בשמן עם נקודת עשן גבוהה (אבוקדו, חמניות)',
              'לא להעמיס — לתת מרווח בין החתיכות',
              'אם נדבק — עוד לא מוכן! ההידבקות יוצרת את המעטפת הזהובה, כשמוכן ישתחרר לבד',
              'מנוחה אחרי צלייה: תמיד להגיש עם העור/הצד הפריך כלפי מעלה כדי לשמור על הקריספיות',
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
