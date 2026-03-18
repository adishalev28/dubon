import { Clock, Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NutritionPills from './NutritionPills'
import useAppStore from '../../store/useAppStore'

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
          <NutritionPills calories={recipe.calories} protein={recipe.protein} fat={recipe.fat} />
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
          onClick={() => toggleFavorite(recipe.id)}
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
        <NutritionPills calories={recipe.calories} protein={recipe.protein} fat={recipe.fat} />
      </div>
    </div>
  )
}
