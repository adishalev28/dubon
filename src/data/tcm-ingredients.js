/**
 * TCM Ingredient Database - בסיס נתוני רכיבים לפי רפואה סינית
 *
 * flavor: חמוץ | מר | מתוק | חריף | מלוח
 * nature: לוהט | חם | ניטרלי | קריר | קר
 * organ: איבר מטרה עיקרי
 * movement: מעלה | מוריד | מפזר | אוסף | מעגן | מניע
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

// 20 רכיבי ליבה עם סיווג מלא
export const tcmIngredients = {
  'ginger': {
    he: 'ג\'ינג\'ר (טרי)',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['קיבה', 'ריאות'],
    movement: ['ascending', 'dispersing'],
    antidoteFor: ['cold', 'dampness'],
  },
  'lemon': {
    he: 'לימון',
    flavor: ['sour'],
    nature: 'cool',
    organs: ['כבד', 'כיס מרה'],
    movement: ['collecting'],
    antidoteFor: ['heat', 'fat'],
  },
  'egg': {
    he: 'ביצה',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['כליות', 'לב'],
    movement: ['grounding'],
    antidoteFor: [],
  },
  'sauerkraut': {
    he: 'כרוב כבוש',
    flavor: ['sour', 'salty'],
    nature: 'cool',
    organs: ['קיבה', 'מעי גס'],
    movement: ['descending', 'moving'],
    antidoteFor: ['fat', 'stagnation'],
  },
  'beef': {
    he: 'בשר בקר',
    flavor: ['sweet'],
    nature: 'warm',
    organs: ['טחול', 'קיבה'],
    movement: ['building', 'grounding'],
    antidoteFor: ['deficiency'],
  },
  'cucumber': {
    he: 'מלפפון',
    flavor: ['sweet'],
    nature: 'cool',
    organs: ['קיבה', 'שלפוחית שתן'],
    movement: ['descending'],
    antidoteFor: ['heat', 'dryness'],
  },
  'coffee': {
    he: 'קפה',
    flavor: ['bitter'],
    nature: 'warm',
    organs: ['לב', 'מעי גס'],
    movement: ['descending', 'drying'],
    antidoteFor: ['dampness'],
  },
  'honey': {
    he: 'דבש',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['ריאות', 'טחול'],
    movement: ['moistening'],
    antidoteFor: ['dryness'],
  },
  'mint': {
    he: 'נענע',
    flavor: ['pungent'],
    nature: 'cool',
    organs: ['כבד', 'ריאות'],
    movement: ['ascending', 'dispersing'],
    antidoteFor: ['liver-stagnation', 'heat'],
  },
  'walnut': {
    he: 'אגוז מלך',
    flavor: ['sweet'],
    nature: 'warm',
    organs: ['כליות', 'ריאות'],
    movement: ['collecting', 'grounding'],
    antidoteFor: ['cold', 'kidney-deficiency'],
  },
  'tomato': {
    he: 'עגבניה',
    flavor: ['sour', 'sweet'],
    nature: 'cool',
    organs: ['כבד', 'קיבה'],
    movement: ['descending'],
    antidoteFor: ['heat'],
  },
  'garlic': {
    he: 'שום',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['טחול', 'קיבה', 'ריאות'],
    movement: ['moving'],
    antidoteFor: ['cold', 'phlegm'],
  },
  'cinnamon': {
    he: 'קינמון',
    flavor: ['pungent', 'sweet'],
    nature: 'hot',
    organs: ['לב', 'כליות', 'טחול'],
    movement: ['descending'],
    antidoteFor: ['deep-cold'],
  },
  'parsley': {
    he: 'פטרוזיליה',
    flavor: ['pungent', 'bitter'],
    nature: 'cool',
    organs: ['כבד', 'קיבה'],
    movement: ['moving'],
    antidoteFor: ['edema', 'stagnation'],
  },
  'white-rice': {
    he: 'אורז לבן',
    flavor: ['sweet'],
    nature: 'neutral',
    organs: ['טחול', 'קיבה'],
    movement: ['building'],
    antidoteFor: ['deficiency'],
  },
  'green-tea': {
    he: 'תה ירוק',
    flavor: ['bitter'],
    nature: 'cool',
    organs: ['לב', 'קיבה'],
    movement: ['descending'],
    antidoteFor: ['heat', 'toxins'],
  },
  'onion': {
    he: 'בצל',
    flavor: ['pungent'],
    nature: 'warm',
    organs: ['קיבה', 'ריאות'],
    movement: ['dispersing'],
    antidoteFor: ['cold', 'phlegm'],
  },
  'sea-salt': {
    he: 'מלח ים',
    flavor: ['salty'],
    nature: 'cool',
    organs: ['כליות', 'קיבה'],
    movement: ['descending'],
    antidoteFor: ['hardness'],
  },
  'pear': {
    he: 'אגס',
    flavor: ['sweet', 'sour'],
    nature: 'cool',
    organs: ['ריאות', 'קיבה'],
    movement: ['moistening', 'descending'],
    antidoteFor: ['dryness', 'heat'],
  },
  'black-pepper': {
    he: 'פלפל שחור',
    flavor: ['pungent'],
    nature: 'hot',
    organs: ['קיבה', 'מעי גס'],
    movement: ['moving'],
    antidoteFor: ['deep-cold', 'stagnation'],
  },
}
