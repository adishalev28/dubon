/**
 * TCM Ingredient Database - בסיס נתוני רכיבים לפי רפואה סינית
 *
 * flavor: חמוץ | מר | מתוק | חריף | מלוח
 * nature: לוהט | חם | ניטרלי | קריר | קר
 * organ: איבר מטרה עיקרי
 * movement: מעלה | מוריד | מפזר | אוסף | מעגן | מניע
 * moisture: drying | moisturizing | damp-forming
 * clinicalFlags: wind | damp | heat | cold | phlegm | stagnation | deficiency
 */

export const TCM_FLAVORS = {
  sour: { he: 'חמוץ', emoji: '🍋', color: 'text-green-600', bg: 'bg-green-50', element: 'עץ' },
  bitter: { he: 'מר', emoji: '🌿', color: 'text-red-700', bg: 'bg-red-50', element: 'אש' },
  sweet: { he: 'מתוק', emoji: '🍯', color: 'text-yellow-600', bg: 'bg-yellow-50', element: 'אדמה' },
  pungent: { he: 'חריף', emoji: '🌶️', color: 'text-orange-600', bg: 'bg-orange-50', element: 'מתכת' },
  salty: { he: 'מלוח', emoji: '🧂', color: 'text-blue-600', bg: 'bg-blue-50', element: 'מים' },
}

export const TCM_NATURES = {
  hot: { he: 'לוהט', emoji: '🔥🔥', color: 'text-red-600', level: 5 },
  warm: { he: 'חם', emoji: '🔥', color: 'text-orange-500', level: 4 },
  neutral: { he: 'ניטרלי', emoji: '⚖️', color: 'text-gray-500', level: 3 },
  cool: { he: 'קריר', emoji: '❄️', color: 'text-cyan-500', level: 2 },
  cold: { he: 'קר', emoji: '❄️❄️', color: 'text-blue-600', level: 1 },
}

export const TCM_MOVEMENTS = {
  ascending: { he: 'מעלה', emoji: '⬆️' },
  descending: { he: 'מוריד', emoji: '⬇️' },
  dispersing: { he: 'מפזר', emoji: '💨' },
  collecting: { he: 'אוסף', emoji: '🎯' },
  grounding: { he: 'מעגן', emoji: '⚓' },
  moving: { he: 'מניע', emoji: '🔄' },
  building: { he: 'בונה', emoji: '🧱' },
  moistening: { he: 'מלחלח', emoji: '💧' },
  drying: { he: 'מייבש', emoji: '🏜️' },
}

// Moisture Impact - השפעת לחות
export const TCM_MOISTURE = {
  drying: { he: 'מייבש', emoji: '🏜️', color: 'text-amber-600', bg: 'bg-amber-50' },
  moisturizing: { he: 'מלחלח', emoji: '💧', color: 'text-sky-600', bg: 'bg-sky-50' },
  'damp-forming': { he: 'מייצר לחות', emoji: '💦', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  neutral: { he: 'ניטרלי', emoji: '⚖️', color: 'text-gray-500', bg: 'bg-gray-50' },
}

// Clinical Flags - תגיות קליניות
export const TCM_FLAGS = {
  wind: { he: 'רוח', emoji: '🌀', warning: 'לא מומלץ בסחרחורת' },
  damp: { he: 'לחות', emoji: '💦', warning: 'עלול להחמיר כבדות' },
  heat: { he: 'חום', emoji: '🔥', warning: 'עלול להחמיר דלקתיות' },
  cold: { he: 'קור', emoji: '❄️', warning: 'עלול להחמיר קור פנימי' },
  phlegm: { he: 'ליחה', emoji: '🫧', warning: 'עלול לייצר ליחה' },
  stagnation: { he: 'סטגנציה', emoji: '🚫', warning: 'עלול לגרום לתקיעות' },
  deficiency: { he: 'חסר', emoji: '⬇️', warning: 'לא מספיק מזין' },
}

/**
 * Preparation Modifiers - איך שיטת הבישול משנה את האנרגיה
 * natureShift: כמה להוסיף/להוריד מציון הטמפרטורה (1-5)
 * moistureShift: איך משתנה השפעת הלחות
 */
export const PREPARATION_MODIFIERS = {
  raw: {
    he: 'נא / חי',
    emoji: '🥗',
    natureShift: -1,      // מקרר
    moistureEffect: 'moisturizing',
    note: 'שומר על אנזימים, מקרר את הגוף',
  },
  steamed: {
    he: 'מאודה',
    emoji: '♨️',
    natureShift: 0,       // ניטרלי
    moistureEffect: 'moisturizing',
    note: 'שיטה מאזנת, שומרת על לחות',
  },
  stir_fried: {
    he: 'מוקפץ',
    emoji: '🍳',
    natureShift: +1,      // מחמם קצת
    moistureEffect: 'drying',
    note: 'חימום מהיר, מייבש קלות',
  },
  deep_fried: {
    he: 'מטוגן עמוק',
    emoji: '🫕',
    natureShift: +2,      // מחמם מאוד
    moistureEffect: 'damp-forming',
    note: 'יוצר חום ולחות, עומס על כיס מרה',
  },
  grilled: {
    he: 'צלוי / גריל',
    emoji: '🔥',
    natureShift: +2,      // מחמם מאוד
    moistureEffect: 'drying',
    note: 'חום ישיר, מייבש, מחמם',
  },
  long_cooked: {
    he: 'בישול ארוך',
    emoji: '🍲',
    natureShift: +1,      // מחמם
    moistureEffect: 'moisturizing',
    note: 'מחמם ומזין, בונה צ\'י',
  },
  baked: {
    he: 'אפוי',
    emoji: '🍞',
    natureShift: +1,      // מחמם
    moistureEffect: 'drying',
    note: 'מייבש, מחמם בעדינות',
  },
  fermented: {
    he: 'מותסס',
    emoji: '🫙',
    natureShift: 0,       // ניטרלי
    moistureEffect: 'drying',
    note: 'מפרק לחות, תומך בעיכול',
  },
}

// 20 רכיבי ליבה עם סיווג מלא
export const tcmIngredients = {
  'ginger': {
    he: 'ג\'ינג\'ר (טרי)',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['קיבה', 'ריאות'],
    movement: ['ascending', 'dispersing'],
    moisture: 'drying',
    clinicalFlags: ['cold', 'damp', 'phlegm'],
    antidoteFor: ['cold', 'dampness'],
  },
  'lemon': {
    he: 'לימון',
    flavor: ['sour'],
    nature: 'cool',
    organs: ['כבד', 'כיס מרה'],
    movement: ['collecting'],
    moisture: 'drying',
    clinicalFlags: ['heat', 'stagnation'],
    antidoteFor: ['heat', 'fat'],
  },
  'egg': {
    he: 'ביצה',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['כליות', 'לב'],
    movement: ['grounding'],
    moisture: 'moisturizing',
    clinicalFlags: ['deficiency'],
    antidoteFor: [],
  },
  'sauerkraut': {
    he: 'כרוב כבוש',
    flavor: ['sour', 'salty'],
    nature: 'cool',
    organs: ['קיבה', 'מעי גס'],
    movement: ['descending', 'moving'],
    moisture: 'drying',
    clinicalFlags: ['damp', 'stagnation'],
    antidoteFor: ['fat', 'stagnation'],
  },
  'beef': {
    he: 'בשר בקר',
    flavor: ['sweet'],
    nature: 'warm',
    organs: ['טחול', 'קיבה'],
    movement: ['building', 'grounding'],
    moisture: 'damp-forming',
    clinicalFlags: ['deficiency'],
    caution: ['heat', 'damp'],
    antidoteFor: ['deficiency'],
  },
  'cucumber': {
    he: 'מלפפון',
    flavor: ['sweet'],
    nature: 'cool',
    organs: ['קיבה', 'שלפוחית שתן'],
    movement: ['descending'],
    moisture: 'moisturizing',
    clinicalFlags: ['heat'],
    antidoteFor: ['heat', 'dryness'],
  },
  'coffee': {
    he: 'קפה',
    flavor: ['bitter'],
    nature: 'warm',
    organs: ['לב', 'מעי גס'],
    movement: ['descending', 'drying'],
    moisture: 'drying',
    clinicalFlags: ['damp'],
    caution: ['heat', 'wind'],
    antidoteFor: ['dampness'],
  },
  'honey': {
    he: 'דבש',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['ריאות', 'טחול'],
    movement: ['moistening'],
    moisture: 'moisturizing',
    clinicalFlags: ['deficiency'],
    caution: ['damp', 'phlegm'],
    antidoteFor: ['dryness'],
  },
  'mint': {
    he: 'נענע',
    flavor: ['pungent'],
    nature: 'cool',
    organs: ['כבד', 'ריאות'],
    movement: ['ascending', 'dispersing'],
    moisture: 'drying',
    clinicalFlags: ['heat', 'stagnation'],
    antidoteFor: ['liver-stagnation', 'heat'],
  },
  'walnut': {
    he: 'אגוז מלך',
    flavor: ['sweet'],
    nature: 'warm',
    organs: ['כליות', 'ריאות'],
    movement: ['collecting', 'grounding'],
    moisture: 'moisturizing',
    clinicalFlags: ['cold', 'deficiency'],
    antidoteFor: ['cold', 'kidney-deficiency'],
  },
  'tomato': {
    he: 'עגבניה',
    flavor: ['sour', 'sweet'],
    nature: 'cool',
    organs: ['כבד', 'קיבה'],
    movement: ['descending'],
    moisture: 'moisturizing',
    clinicalFlags: ['heat'],
    caution: ['cold'],
    antidoteFor: ['heat'],
  },
  'garlic': {
    he: 'שום',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['טחול', 'קיבה', 'ריאות'],
    movement: ['moving'],
    moisture: 'drying',
    clinicalFlags: ['cold', 'phlegm', 'stagnation'],
    caution: ['heat'],
    antidoteFor: ['cold', 'phlegm'],
  },
  'cinnamon': {
    he: 'קינמון',
    flavor: ['pungent', 'sweet'],
    nature: 'hot',
    organs: ['לב', 'כליות', 'טחול'],
    movement: ['descending'],
    moisture: 'drying',
    clinicalFlags: ['cold'],
    caution: ['heat'],
    antidoteFor: ['deep-cold'],
  },
  'parsley': {
    he: 'פטרוזיליה',
    flavor: ['pungent', 'bitter'],
    nature: 'cool',
    organs: ['כבד', 'קיבה'],
    movement: ['moving'],
    moisture: 'drying',
    clinicalFlags: ['damp', 'stagnation'],
    antidoteFor: ['edema', 'stagnation'],
  },
  'white-rice': {
    he: 'אורז לבן',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['טחול', 'קיבה'],
    movement: ['building'],
    moisture: 'neutral',
    clinicalFlags: ['deficiency'],
    caution: ['damp'],
    antidoteFor: ['deficiency'],
  },
  'green-tea': {
    he: 'תה ירוק',
    flavor: ['bitter'],
    nature: 'cool',
    organs: ['לב', 'קיבה'],
    movement: ['descending'],
    moisture: 'drying',
    clinicalFlags: ['heat', 'damp'],
    caution: ['cold', 'deficiency'],
    antidoteFor: ['heat', 'toxins'],
  },
  'onion': {
    he: 'בצל',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['קיבה', 'ריאות'],
    movement: ['dispersing'],
    moisture: 'drying',
    clinicalFlags: ['cold', 'phlegm'],
    antidoteFor: ['cold', 'phlegm'],
  },
  'sea-salt': {
    he: 'מלח ים',
    flavor: ['salty'],
    nature: 'cool',
    organs: ['כליות', 'קיבה'],
    movement: ['descending'],
    moisture: 'moisturizing',
    clinicalFlags: [],
    caution: ['damp'],
    antidoteFor: ['hardness'],
  },
  'pear': {
    he: 'אגס',
    flavor: ['sweet', 'sour'],
    nature: 'cool',
    organs: ['ריאות', 'קיבה'],
    movement: ['moistening', 'descending'],
    moisture: 'moisturizing',
    clinicalFlags: ['heat'],
    caution: ['cold', 'damp'],
    antidoteFor: ['dryness', 'heat'],
  },
  'black-pepper': {
    he: 'פלפל שחור',
    flavor: ['pungent'],
    nature: 'hot',
    organs: ['קיבה', 'מעי גס'],
    movement: ['moving'],
    moisture: 'drying',
    clinicalFlags: ['cold', 'stagnation'],
    caution: ['heat'],
    antidoteFor: ['deep-cold', 'stagnation'],
  },
}
