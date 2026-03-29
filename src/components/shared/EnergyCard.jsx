import { TCM_FLAVORS, TCM_NATURES } from '../../data/tcm-ingredients'

const NATURE_STYLES = {
  'לוהט': { emoji: '🔥🔥', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'חם': { emoji: '🔥', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'ניטרלי': { emoji: '⚖️', bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  'קריר': { emoji: '❄️', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'קר': { emoji: '❄️❄️', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
}

const SEASON_EMOJI = {
  'אביב': '🌸',
  'קיץ': '☀️',
  'סוף קיץ': '🌾',
  'סתיו': '🍂',
  'חורף': '❄️',
}

/**
 * כרטיס אנרגטי לפי רפואה סינית
 * מוצג בדף המתכון ליד הערכים התזונתיים
 */
export default function EnergyCard({ tcm }) {
  if (!tcm) return null

  const natureStyle = NATURE_STYLES[tcm.nature] || NATURE_STYLES['ניטרלי']

  return (
    <div className="bg-white rounded-2xl border border-olive-100 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 justify-end">
        <h3 className="text-sm font-bold text-olive-800">☯ פרופיל אנרגטי</h3>
      </div>

      {/* Nature + Season row */}
      <div className="flex gap-2 justify-end flex-wrap">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${natureStyle.bg} ${natureStyle.text} ${natureStyle.border}`}>
          {natureStyle.emoji} {tcm.nature}
        </span>
        {tcm.season && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-olive-50 text-olive-700 border border-olive-200">
            {SEASON_EMOJI[tcm.season] || '🌿'} {tcm.season}
          </span>
        )}
      </div>

      {/* Flavors */}
      <div className="flex gap-1.5 justify-end flex-wrap">
        {tcm.flavors.map(f => {
          const flavor = TCM_FLAVORS[f]
          if (!flavor) return null
          return (
            <span
              key={f}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${flavor.bg} ${flavor.color} border border-opacity-30`}
            >
              {flavor.emoji} {flavor.he}
              <span className="opacity-50 text-[10px]">({flavor.element})</span>
            </span>
          )
        })}
      </div>

      {/* Target organs */}
      {tcm.organs && tcm.organs.length > 0 && (
        <div className="text-xs text-gray-500 text-right">
          <span className="font-medium">איבר מטרה:</span>{' '}
          {tcm.organs.join(' · ')}
        </div>
      )}
    </div>
  )
}
