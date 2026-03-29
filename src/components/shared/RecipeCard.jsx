import { useState } from 'react'
import { Clock, Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NutritionPills from './NutritionPills'
import useAppStore from '../../store/useAppStore'
import { TCM_FLAVORS, TCM_MOISTURE, PREPARATION_MODIFIERS, TCM_FLAGS } from '../../data/tcm-ingredients'

const NATURE_STYLES = {
  'לוהט': { emoji: '🔥🔥', color: 'text-red-600' },
  'חם': { emoji: '🔥', color: 'text-orange-600' },
  'ניטרלי': { emoji: '⚖️', color: 'text-gray-500' },
  'קריר': { emoji: '❄️', color: 'text-cyan-600' },
  'קר': { emoji: '❄️❄️', color: 'text-blue-600' },
}

function MiniEnergyInfo({ tcm }) {
  if (!tcm) return null
  const nature = NATURE_STYLES[tcm.nature] || NATURE_STYLES['ניטרלי']
  const moisture = tcm.moisture ? TCM_MOISTURE[tcm.moisture] : null
  const prep = tcm.preparation ? PREPARATION_MODIFIERS[tcm.preparation] : null

  return (
    <div className="space-y-1.5 text-right" dir="rtl">
      <div className="flex gap-1.5 flex-wrap">
        <span className={`text-[10px] font-medium ${nature.color}`}>{nature.emoji} {tcm.nature}</span>
        {moisture && <span className={`text-[10px] ${moisture.color}`}>{moisture.emoji} {moisture.he}</span>}
        {prep && <span className="text-[10px] text-warm-brown-600">{prep.emoji} {prep.he}</span>}
      </div>
      <div className="flex gap-1 flex-wrap">
        {tcm.flavors.map(f => {
          const flavor = TCM_FLAVORS[f]
          if (!flavor) return null
          return (
            <span key={f} className={`text-[10px] px-1.5 py-0.5 rounded-full ${flavor.bg} ${flavor.color}`}>
              {flavor.emoji} {flavor.he}
            </span>
          )
        })}
      </div>
      {tcm.organs && (
        <div className="text-[10px] text-gray-400">
          {tcm.organs.join(' · ')}
        </div>
      )}
      {tcm.clinicalFlags && tcm.clinicalFlags.length > 0 && (
        <div className="text-[10px] text-green-600">
          ✅ {tcm.clinicalFlags.map(f => TCM_FLAGS[f]?.he || f).join(' · ')}
        </div>
      )}
      {tcm.caution && tcm.caution.length > 0 && (
        <div className="text-[10px] text-amber-500">
          ⚠️ {tcm.caution.map(f => TCM_FLAGS[f]?.he || f).join(' · ')}
        </div>
      )}
    </div>
  )
}

function InfoToggle({ recipe }) {
  const [mode, setMode] = useState(null) // null | 'western' | 'chinese'

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex gap-1.5 mb-2">
        <button
          onClick={(e) => { e.stopPropagation(); setMode(mode === 'western' ? null : 'western') }}
          className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-colors ${
            mode === 'western'
              ? 'bg-olive-600 text-white border-olive-600'
              : 'bg-olive-50 text-olive-700 border-olive-200 hover:bg-olive-100'
          }`}
        >
          🍽️ תזונה מערבית
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setMode(mode === 'chinese' ? null : 'chinese') }}
          className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-colors ${
            mode === 'chinese'
              ? 'bg-warm-orange-600 text-white border-warm-orange-600'
              : 'bg-warm-orange-50 text-warm-orange-700 border-warm-orange-200 hover:bg-warm-orange-100'
          }`}
        >
          ☯ רפואה סינית
        </button>
      </div>

      {/* Content */}
      {mode === 'western' && (
        <div className="animate-in fade-in duration-200">
          <NutritionPills calories={recipe.calories} protein={recipe.protein} fat={recipe.fat} />
        </div>
      )}
      {mode === 'chinese' && recipe.tcm && (
        <div className="animate-in fade-in duration-200">
          <MiniEnergyInfo tcm={recipe.tcm} />
        </div>
      )}
    </div>
  )
}

export default function RecipeCard({ recipe, variant = 'compact' }) {
  const { favorites, toggleFavorite } = useAppStore()
  const isFavorite = favorites.includes(recipe.id)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`)
  }

  if (variant === 'compact') {
    return (
      <div onClick={handleClick} className="flex-shrink-0 w-56 bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform">
        {/* Image */}
        <div className="relative h-[130px]">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Time badge */}
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-olive-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Clock size={12} />
            {recipe.time} דק׳
          </span>
          {/* Favorite */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(recipe.id)
            }}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full cursor-pointer"
          >
            <Bookmark
              size={16}
              className={isFavorite ? 'fill-warm-orange-600 text-warm-orange-600' : 'text-cream-400'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-olive-800 text-sm mb-1 line-clamp-1">{recipe.name}</h3>
          <p className="text-xs text-cream-600 mb-2">
            {recipe.difficulty} · {recipe.category}
          </p>
          <InfoToggle recipe={recipe} />
        </div>
      </div>
    )
  }

  // Full variant for results screen
  return (
    <div onClick={handleClick} className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform">
      <div className="relative h-[180px]">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-olive-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
          <Clock size={14} />
          {recipe.time} דק׳
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(recipe.id)
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full cursor-pointer"
        >
          <Bookmark
            size={18}
            className={isFavorite ? 'fill-warm-orange-600 text-warm-orange-600' : 'text-cream-400'}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-olive-800 text-lg mb-1">{recipe.name}</h3>
        <p className="text-sm text-cream-600 mb-2">
          {recipe.difficulty} · {recipe.category}
        </p>
        <p className="text-sm text-cream-400 mb-3">{recipe.description}</p>
        <InfoToggle recipe={recipe} />
      </div>
    </div>
  )
}
