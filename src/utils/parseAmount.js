/**
 * מנוע פענוח והכפלת כמויות מרכיבים בעברית
 * תומך בפורמטים: "500 גרם", "3 כפות", "1-2 יחידות", "400 מ"ל"
 * כמויות לא-מספריות ("לפי הטעם") מוחזרות כ-{ parseable: false }
 */

// שברים יפים ליופי התצוגה
const FRACTION_MAP = [
  { value: 0.25, display: '¼' },
  { value: 1 / 3, display: '⅓' },
  { value: 0.5, display: '½' },
  { value: 2 / 3, display: '⅔' },
  { value: 0.75, display: '¾' },
]

/**
 * ממיר מספר לתצוגה עם שברים יפים
 * 2.5 → "2½", 0.333 → "⅓", 3.0 → "3"
 */
function formatNumber(num) {
  if (num <= 0) return '0'

  const whole = Math.floor(num)
  const frac = num - whole
  const TOLERANCE = 0.05

  // מספר שלם
  if (frac < TOLERANCE) return String(whole)

  // חיפוש שבר מתאים
  for (const { value, display } of FRACTION_MAP) {
    if (Math.abs(frac - value) < TOLERANCE) {
      return whole > 0 ? `${whole}${display}` : display
    }
  }

  // עיגול לעשירית
  return num.toFixed(1).replace(/\.0$/, '')
}

/**
 * מפענח מחרוזת כמות בעברית
 * @param {string} amountStr - כמות כטקסט, למשל "500 גרם"
 * @returns {{ parseable: boolean, value?: number, unit?: string }}
 */
export function parseAmount(amountStr) {
  if (!amountStr || typeof amountStr !== 'string') {
    return { parseable: false }
  }

  const trimmed = amountStr.trim()
  if (!trimmed) return { parseable: false }

  // רגקס: מספר (או טווח כמו 3-4) ואחריו יחידה
  const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s+(.+)$/)

  if (!match) return { parseable: false }

  const low = parseFloat(match[1])
  const high = match[2] ? parseFloat(match[2]) : null
  const unit = match[3]

  // טווח → ממוצע
  const value = high ? (low + high) / 2 : low

  return { parseable: true, value, unit, low, high }
}

/**
 * מכפיל כמות לפי מכפיל (multiplier)
 * @param {string} amountStr - כמות מקורית כטקסט
 * @param {number} multiplier - מכפיל (למשל 2 = כפול)
 * @returns {string} - כמות מוכפלת כטקסט, או המקור אם לא ניתן לפענח
 */
export function scaleAmount(amountStr, multiplier) {
  if (multiplier === 1) return amountStr

  const parsed = parseAmount(amountStr)
  if (!parsed.parseable) return amountStr

  // אם יש טווח מקורי, מכפילים את שני הקצוות
  if (parsed.high) {
    const newLow = parsed.low * multiplier
    const newHigh = parsed.high * multiplier
    const fmtLow = formatNumber(newLow)
    const fmtHigh = formatNumber(newHigh)
    return `${fmtLow}-${fmtHigh} ${parsed.unit}`
  }

  const newValue = parsed.value * multiplier
  return `${formatNumber(newValue)} ${parsed.unit}`
}
