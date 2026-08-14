#!/usr/bin/env node
/**
 * בודק שכל מתכון בעברית מתורגם גם לאנגלית.
 * רץ אוטומטית כ-PostToolUse hook אחרי עריכת recipes.js / recipes-en.json.
 * מריצים ידנית: node scripts/check-i18n-parity.cjs
 */
const fs = require('fs')
const path = require('path')

// מצב hook: קורא את payload ה-JSON מ-stdin ומדלג אם הקובץ שנערך לא רלוונטי.
// (אין jq במערכת, לכן הפענוח נעשה כאן ולא ב-shell)
if (process.argv.includes('--hook')) {
  let raw = ''
  try {
    raw = fs.readFileSync(0, 'utf8')
  } catch {
    process.exit(0)
  }
  let file = ''
  try {
    const p = JSON.parse(raw)
    file = p?.tool_input?.file_path || p?.tool_response?.filePath || ''
  } catch {
    process.exit(0) // payload לא צפוי — לא חוסמים
  }
  if (!/(recipes\.js|recipes-en\.json)$/.test(file.replace(/\\/g, '/'))) process.exit(0)
}

const root = path.resolve(__dirname, '..')
const HE_PATH = path.join(root, 'src/data/recipes.js')
const EN_PATH = path.join(root, 'src/i18n/recipes-en.json')

// שדות שחייבים להיות מתורגמים בכל מתכון
const REQUIRED = ['name', 'description', 'ingredients', 'steps', 'difficulty', 'category']

function fail(msg) {
  // exit 2 = blocking error — הפלט חוזר ל-Claude כדי שיתקן
  console.error(msg)
  process.exit(2)
}

let heIds, en
try {
  const heSrc = fs.readFileSync(HE_PATH, 'utf8')
  heIds = [...heSrc.matchAll(/^\s{4}id:\s*(\d+),/gm)].map((m) => m[1])
  en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'))
} catch (e) {
  fail(`בדיקת i18n נכשלה: ${e.message}`)
}

if (heIds.length === 0) fail('בדיקת i18n: לא נמצאו מתכונים ב-recipes.js — כנראה הפורמט השתנה, לעדכן את הסקריפט.')

const missing = heIds.filter((id) => !(id in en))
const orphans = Object.keys(en).filter((id) => !heIds.includes(id))
const incomplete = heIds
  .filter((id) => id in en)
  .map((id) => ({ id, gaps: REQUIRED.filter((f) => !en[id][f]) }))
  .filter((r) => r.gaps.length > 0)

const problems = []
if (missing.length) problems.push(`חסר תרגום אנגלית למתכונים: ${missing.join(', ')}`)
if (incomplete.length)
  problems.push(...incomplete.map((r) => `מתכון ${r.id}: שדות חסרים בתרגום — ${r.gaps.join(', ')}`))
if (orphans.length) problems.push(`תרגום יתום (אין מתכון עברי תואם): ${orphans.join(', ')}`)

if (problems.length) {
  fail(
    `🚨 כלל דובון: כל מתכון חייב תרגום מלא ב-src/i18n/recipes-en.json\n` +
      problems.map((p) => `  - ${p}`).join('\n') +
      `\nלהשלים את התרגום לפני שממשיכים.`
  )
}

console.log(`✅ i18n: ${heIds.length}/${heIds.length} מתכונים מתורגמים`)
