/**
 * TCM Antidote Engine - מנוע נוגדנים
 * מתרגם מצבים אנרגטיים להמלצות תזונתיות
 */

// 10 תרחישי נוגדנים
export const antidoteScenarios = [
  {
    id: 'heavy-fatty',
    trigger: 'ארוחה שומנית/כבדה',
    triggerExamples: ['המבורגר', 'סטייק', 'עראיס', 'שניצל'],
    imbalance: 'חום + לחות',
    imbalanceEn: 'heat + dampness',
    requiredFlavors: ['sour', 'bitter'],
    antidote: 'לימון + מרורות (רוקולה/חסה)',
    quickFix: 'כוס מים עם חצי לימון',
    explanation: 'פירוק שומנים והנעת כבד',
    emoji: '🍔',
  },
  {
    id: 'dairy-sugar',
    trigger: 'כבדות ולחות (מוצרי חלב/סוכר)',
    triggerExamples: ['פסטה שמנת', 'גלידה', 'עוגה', 'שוקולד'],
    imbalance: 'ליחה (Phlegm)',
    imbalanceEn: 'phlegm + dampness',
    requiredFlavors: ['pungent'],
    antidote: 'ג\'ינג\'ר + הל + קינמון',
    quickFix: 'חליטת ג\'ינג\'ר חם',
    explanation: 'ייבוש לחות וחימום הטחול',
    emoji: '🧁',
  },
  {
    id: 'excess-heat',
    trigger: 'עודף חום / אלכוהול',
    triggerExamples: ['בירה', 'יין', 'אלכוהול', 'אוכל חריף מאוד'],
    imbalance: 'חום רעיל',
    imbalanceEn: 'toxic heat',
    requiredFlavors: ['bitter', 'sweet'],
    antidote: 'תה ירוק + אגס',
    quickFix: 'תה ירוק או פלח אגס',
    explanation: 'ניקוי חום ולחלוח נוזלים',
    emoji: '🍺',
  },
  {
    id: 'qi-stagnation-gas',
    trigger: 'תקיעות צ\'י / גזים (קטניות)',
    triggerExamples: ['חומוס', 'פלאפל', 'עדשים', 'שעועית'],
    imbalance: 'תקיעות צ\'י',
    imbalanceEn: 'qi stagnation',
    requiredFlavors: ['pungent'],
    antidote: 'כמון + שומר + נענע',
    quickFix: 'חליטת נענע או לעיסת שומר',
    explanation: 'הנעה ארומטית של צ\'י',
    emoji: '🫘',
  },
  {
    id: 'phlegm-throat',
    trigger: 'ליחה בגרון (בצקים/קמח)',
    triggerExamples: ['לחם לבן', 'פיצה', 'בורקס', 'מאפים'],
    imbalance: 'ליחה',
    imbalanceEn: 'phlegm',
    requiredFlavors: ['pungent'],
    antidote: 'צנון/צנונית + שום',
    quickFix: 'צנון חי עם מעט מלח',
    explanation: 'התמרת ליחה ופיזור',
    emoji: '🥖',
  },
  {
    id: 'internal-cold',
    trigger: 'קור פנימי / חולשת יאנג',
    triggerExamples: ['מרגיש קר', 'ידיים קרות', 'עייפות בבוקר'],
    imbalance: 'קור פנימי',
    imbalanceEn: 'internal cold',
    requiredFlavors: ['pungent', 'sweet'],
    antidote: 'קינמון + אגוזי מלך',
    quickFix: 'חליטת קינמון עם דבש',
    explanation: 'חימום מרכז וחיזוק כליות',
    emoji: '🥶',
  },
  {
    id: 'dizziness',
    trigger: 'חוסר שיווי משקל / סחרחורת',
    triggerExamples: ['סחרחורת', 'ראש קל', 'חוסר ריכוז'],
    imbalance: 'רוח פנימית / חוסר עגינה',
    imbalanceEn: 'internal wind',
    requiredFlavors: ['sweet'],
    antidote: 'אבוקדו + בטטה + שומשום',
    quickFix: 'אבוקדו על טוסט עם שומשום',
    explanation: 'עגינה (Grounding) ומניעת רוח',
    emoji: '😵',
  },
  {
    id: 'liver-stagnation',
    trigger: 'מתח / סטגנציה של כבד',
    triggerExamples: ['מתח', 'עצבנות', 'לחץ', 'כעס'],
    imbalance: 'סטגנציית כבד',
    imbalanceEn: 'liver qi stagnation',
    requiredFlavors: ['sour', 'pungent'],
    antidote: 'סלרי + קליפת לימון',
    quickFix: 'מים חמים עם פרוסת לימון',
    explanation: 'החלקת הצ\'י וניקוי חום עדין',
    emoji: '😤',
  },
  {
    id: 'dryness',
    trigger: 'יובש (שיעול יבש/עור יבש)',
    triggerExamples: ['עור יבש', 'שיעול יבש', 'גרון יבש'],
    imbalance: 'חוסר יין',
    imbalanceEn: 'yin deficiency',
    requiredFlavors: ['sweet', 'sour'],
    antidote: 'דבש + אגס',
    quickFix: 'אגס מבושל עם דבש',
    explanation: 'הזנת נוזלים (Yin)',
    emoji: '🏜️',
  },
  {
    id: 'water-retention',
    trigger: 'נפיחות (אחרי מלח/אוכל מעובד)',
    triggerExamples: ['נפיחות', 'אצירת מים', 'אוכל מעובד'],
    imbalance: 'עודף נוזלים',
    imbalanceEn: 'water retention',
    requiredFlavors: ['pungent', 'bitter'],
    antidote: 'פטרוזיליה + מלפפון',
    quickFix: 'מים עם מלפפון ופטרוזיליה',
    explanation: 'ניקוז נוזלים עודפים (משתן)',
    emoji: '💧',
  },
]

/**
 * חוקי האיזון של 5 הטעמים
 */
export const balancingRules = {
  // חוק הניגודיות - טעמים מאזנים
  opposites: {
    pungent: 'sour',    // חריף (חם) ↔ חמוץ (מקרר)
    bitter: 'sweet',     // מר (מוריד) ↔ מתוק (בונה)
    salty: 'sweet',      // מלוח (מוריד) ↔ מתוק (בונה)
  },

  // חוק העונה - טעמים מומלצים
  seasons: {
    spring: { preferred: ['sour'], avoid: ['pungent'], he: 'אביב' },
    summer: { preferred: ['bitter'], avoid: ['salty'], he: 'קיץ' },
    lateSummer: { preferred: ['sweet'], avoid: ['sour'], he: 'סוף קיץ' },
    autumn: { preferred: ['pungent'], avoid: ['bitter'], he: 'סתיו' },
    winter: { preferred: ['salty', 'pungent'], avoid: ['bitter'], he: 'חורף' },
  },

  // חוק המרקם והתנועה
  movementBalance: {
    grounding: ['moving', 'ascending'],  // כבד צריך מניע
    ascending: ['descending'],            // עולה צריך יורד
    collecting: ['dispersing'],           // אוסף צריך מפזר
  },
}

/**
 * מחשב את הפרופיל האנרגטי של מנה
 * @param {string[]} ingredientKeys - מפתחות מ-tcmIngredients
 * @returns {object} פרופיל עם ציוני טעם, טבע ממוצע, והמלצות
 */
export function calculateMealProfile(ingredientKeys, ingredients) {
  const flavorScores = { sour: 0, bitter: 0, sweet: 0, pungent: 0, salty: 0 }
  let natureSum = 0
  let count = 0
  const organs = new Set()
  const movements = new Set()

  for (const key of ingredientKeys) {
    const ing = ingredients[key]
    if (!ing) continue

    // ספור טעמים
    for (const f of ing.flavor) {
      flavorScores[f] = (flavorScores[f] || 0) + 1
    }

    // חשב טבע ממוצע
    const natureLevel = { hot: 5, warm: 4, neutral: 3, cool: 2, cold: 1 }
    natureSum += natureLevel[ing.nature] || 3
    count++

    // אסוף איברים ותנועות
    ing.organs.forEach(o => organs.add(o))
    ing.movement.forEach(m => movements.add(m))
  }

  const avgNature = count > 0 ? natureSum / count : 3
  let natureLabel = 'ניטרלי'
  if (avgNature >= 4.5) natureLabel = 'לוהט'
  else if (avgNature >= 3.5) natureLabel = 'חם'
  else if (avgNature >= 2.5) natureLabel = 'ניטרלי'
  else if (avgNature >= 1.5) natureLabel = 'קריר'
  else natureLabel = 'קר'

  // מצא טעם דומיננטי
  const dominant = Object.entries(flavorScores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0)

  // בדוק חוסרים
  const missing = Object.entries(flavorScores)
    .filter(([, v]) => v === 0)
    .map(([k]) => k)

  return {
    flavorScores,
    dominantFlavor: dominant[0]?.[0] || 'sweet',
    missingFlavors: missing,
    nature: natureLabel,
    natureScore: avgNature,
    organs: Array.from(organs),
    movements: Array.from(movements),
  }
}
