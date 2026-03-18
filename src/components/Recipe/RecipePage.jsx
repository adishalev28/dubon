import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, ChefHat, Users, Bookmark, Lightbulb, Play } from 'lucide-react'
import { recipes } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'
import NutritionPills from '../shared/NutritionPills'
import { useState, useRef } from 'react'

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = recipes.find(r => r.id === Number(id))
  const { favorites, toggleFavorite } = useAppStore()
  const isFavorite = recipe ? favorites.includes(recipe.id) : false
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-cream-600 text-lg">המתכון לא נמצא</p>
      </div>
    )
  }

  const hasDetailedContent = recipe.steps && recipe.steps.length > 0
  const hasVideo = !!recipe.video

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-cream-50 min-h-screen pb-8">
      {/* Header with back button */}
      <div className="sticky top-0 z-20 bg-cream-50/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="p-2 rounded-full bg-white shadow-sm cursor-pointer"
          >
            <Bookmark
              size={20}
              className={isFavorite ? 'fill-warm-orange-600 text-warm-orange-600' : 'text-cream-400'}
            />
          </button>
          <h1 className="font-bold text-olive-800 text-lg">{recipe.name}</h1>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-sm cursor-pointer"
          >
            <ArrowRight size={20} className="text-olive-800" />
          </button>
        </div>
      </div>

      {/* Video or Image */}
      <div className="relative mx-4 rounded-2xl overflow-hidden shadow-md">
        {hasVideo ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={recipe.video}
              poster={recipe.image}
              className="w-full h-[220px] object-cover"
              controls={isPlaying}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play size={28} className="text-olive-600 mr-[-3px]" fill="currentColor" />
                </div>
              </button>
            )}
          </div>
        ) : (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-[220px] object-cover"
          />
        )}
      </div>

      {/* Quick info badges */}
      <div className="flex items-center justify-center gap-4 px-4 mt-4">
        <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
          <Clock size={16} className="text-warm-orange-600" />
          <span className="text-sm font-medium text-olive-800">{recipe.time} דק׳</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
          <ChefHat size={16} className="text-warm-orange-600" />
          <span className="text-sm font-medium text-olive-800">{recipe.difficulty}</span>
        </div>
        {recipe.servings && (
          <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
            <Users size={16} className="text-warm-orange-600" />
            <span className="text-sm font-medium text-olive-800">{recipe.servings}</span>
          </div>
        )}
      </div>

      {/* Nutrition */}
      <div className="flex justify-center mt-3">
        <NutritionPills calories={recipe.calories} protein={recipe.protein} fat={recipe.fat} />
      </div>

      {/* Description / Intro */}
      <div className="mx-4 mt-5 bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-sm text-cream-600 leading-relaxed">
          {recipe.intro || recipe.description}
        </p>
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 mt-3">
          {recipe.tags.map(tag => (
            <span key={tag} className="bg-olive-50 text-olive-600 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Detailed Ingredients */}
      {recipe.detailedIngredients ? (
        <div className="mx-4 mt-5">
          <h2 className="font-bold text-olive-800 text-base mb-3">🧾 מרכיבים</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {recipe.detailedIngredients.map((ing, i) => (
              <div
                key={i}
                className={`p-3 ${i !== recipe.detailedIngredients.length - 1 ? 'border-b border-cream-100' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="font-medium text-olive-800 text-sm">{ing.name}</span>
                    {ing.note && (
                      <p className="text-xs text-cream-400 mt-0.5">{ing.note}</p>
                    )}
                  </div>
                  <span className="text-sm text-warm-orange-600 font-medium whitespace-nowrap">
                    {ing.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Simple ingredients list */
        <div className="mx-4 mt-5">
          <h2 className="font-bold text-olive-800 text-base mb-3">🧾 מרכיבים</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map(ing => (
                <span key={ing} className="bg-cream-100 text-cream-600 text-sm px-3 py-1.5 rounded-full">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      {hasDetailedContent && (
        <div className="mx-4 mt-5">
          <h2 className="font-bold text-olive-800 text-base mb-3">👨‍🍳 שלבי הכנה</h2>
          <div className="space-y-3">
            {recipe.steps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-olive-50 flex items-center justify-center">
                    <span className="text-olive-600 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-olive-800 text-sm mb-1">{step.title}</h3>
                    <p className="text-sm text-cream-600 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tip */}
      {recipe.proTip && (
        <div className="mx-4 mt-5 bg-warm-orange-50 rounded-2xl p-4 border border-warm-orange-100">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-warm-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-warm-orange-600 text-sm mb-1">טיפ של מקצוענים</h3>
              <p className="text-sm text-warm-brown-600 leading-relaxed">{recipe.proTip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
