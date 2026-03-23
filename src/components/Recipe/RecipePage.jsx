import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, ChefHat, Users, Bookmark, Lightbulb, Play, Minus, Plus, Check, CookingPot, Pencil, ExternalLink } from 'lucide-react'
import { recipes } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'
import NutritionPills from '../shared/NutritionPills'
import { useState, useRef } from 'react'
import { scaleAmount, parseAmount } from '../../utils/parseAmount'
import FocusMode from './FocusMode'

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = recipes.find(r => r.id === Number(id))
  const { favorites, toggleFavorite, checkedIngredients, toggleIngredientCheck, recipeNotes, setRecipeNote } = useAppStore()
  const [noteText, setNoteText] = useState('')
  const [noteEditing, setNoteEditing] = useState(false)
  const isFavorite = recipe ? favorites.includes(recipe.id) : false
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  const [servingCount, setServingCount] = useState(recipe?.baseServings || 1)
  const [focusModeOpen, setFocusModeOpen] = useState(false)

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-cream-600 text-lg">המתכון לא נמצא</p>
      </div>
    )
  }

  const hasDetailedContent = recipe.steps && recipe.steps.length > 0
  const hasVideo = !!recipe.video
  const hasDetailedIngredients = !!recipe.detailedIngredients
  const hasScaler = hasDetailedIngredients && recipe.baseServings
  const multiplier = hasScaler ? servingCount / recipe.baseServings : 1
  const recipeChecked = checkedIngredients[recipe.id] || []

  const isSeparator = (ing) => ing.name.includes('──')

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
      <div className="flex items-center justify-center gap-3 px-4 mt-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
          <Clock size={16} className="text-warm-orange-600" />
          <span className="text-sm font-medium text-olive-800">{recipe.time} דק׳</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
          <ChefHat size={16} className="text-warm-orange-600" />
          <span className="text-sm font-medium text-olive-800">{recipe.difficulty}</span>
        </div>

        {/* Serving Scaler */}
        {hasScaler ? (
          <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1.5 shadow-sm">
            <button
              onClick={() => setServingCount(prev => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-full bg-olive-50 flex items-center justify-center cursor-pointer active:bg-olive-100 transition-colors"
            >
              <Minus size={14} className="text-olive-600" />
            </button>
            <div className="flex items-center gap-1 px-1">
              <Users size={14} className="text-warm-orange-600" />
              <span className="text-sm font-bold text-olive-800 min-w-[20px] text-center">{servingCount}</span>
              <span className="text-xs text-cream-600">{servingCount === 1 ? 'מנה' : 'מנות'}</span>
            </div>
            <button
              onClick={() => setServingCount(prev => Math.min(20, prev + 1))}
              className="w-7 h-7 rounded-full bg-olive-50 flex items-center justify-center cursor-pointer active:bg-olive-100 transition-colors"
            >
              <Plus size={14} className="text-olive-600" />
            </button>
          </div>
        ) : recipe.servings ? (
          <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-2 shadow-sm">
            <Users size={16} className="text-warm-orange-600" />
            <span className="text-sm font-medium text-olive-800">{recipe.servings}</span>
          </div>
        ) : null}
      </div>

      {/* Nutrition */}
      <div className="flex justify-center mt-3">
        <NutritionPills calories={recipe.calories} protein={recipe.protein} fat={recipe.fat} />
      </div>

      {/* External Link (TikTok etc.) */}
      {recipe.link && (
        <div className="mx-4 mt-4">
          <a
            href={recipe.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-warm-brown-50 text-warm-brown-600 rounded-xl py-3 px-4 text-sm font-medium border border-warm-brown-100"
          >
            <Play size={16} fill="currentColor" />
            צפייה בסרטון המתכון
            <ExternalLink size={14} />
          </a>
        </div>
      )}

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

      {/* Detailed Ingredients with Checkboxes + Scaling */}
      {hasDetailedIngredients ? (
        <div className="mx-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-olive-800 text-base">🧾 מרכיבים</h2>
            {multiplier !== 1 && (
              <span className="text-xs text-warm-orange-600 bg-warm-orange-50 px-2 py-1 rounded-full">
                ×{multiplier.toFixed(1).replace(/\.0$/, '')}
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {recipe.detailedIngredients.map((ing, i) => {
              const separator = isSeparator(ing)
              const isChecked = recipeChecked.includes(i)
              const scaledAmount = hasScaler && !separator ? scaleAmount(ing.amount, multiplier) : ing.amount
              const amountParseable = ing.amount ? parseAmount(ing.amount).parseable : false

              if (separator) {
                return (
                  <div key={i} className="bg-cream-50 px-3 py-2 border-b border-cream-100">
                    <span className="text-xs font-bold text-cream-600">{ing.name}</span>
                  </div>
                )
              }

              return (
                <div
                  key={i}
                  className={`p-3 ${i !== recipe.detailedIngredients.length - 1 ? 'border-b border-cream-100' : ''}`}
                >
                  <div className="flex items-start gap-2">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleIngredientCheck(recipe.id, i)}
                      className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-olive-600 border-olive-600'
                          : 'border-cream-400 bg-white'
                      }`}
                    >
                      {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                    </button>

                    {/* Content */}
                    <div className={`flex-1 flex items-start justify-between gap-2 transition-opacity ${isChecked ? 'opacity-40' : ''}`}>
                      <div className="flex-1">
                        <span className={`font-medium text-olive-800 text-sm ${isChecked ? 'line-through' : ''}`}>
                          {ing.name}
                        </span>
                        {ing.note && (
                          <p className="text-xs text-cream-400 mt-0.5">{ing.note}</p>
                        )}
                      </div>
                      <span className={`text-sm font-medium whitespace-nowrap ${
                        isChecked ? 'text-cream-400 line-through' :
                        (hasScaler && !amountParseable && ing.amount) ? 'text-cream-400' :
                        'text-warm-orange-600'
                      }`}>
                        {scaledAmount}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-olive-800 text-base">👨‍🍳 שלבי הכנה</h2>
            <button
              onClick={() => setFocusModeOpen(true)}
              className="flex items-center gap-1.5 bg-olive-600 text-white px-3 py-2 rounded-xl text-xs font-medium shadow-sm cursor-pointer active:bg-olive-800 transition-colors"
            >
              <CookingPot size={14} />
              מצב בישול
            </button>
          </div>
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

      {/* Personal Notes */}
      <div className="mx-4 mt-6 mb-24 bg-olive-50 rounded-2xl p-4 border border-olive-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Pencil size={20} className="text-olive-600" />
            <h3 className="font-bold text-olive-600">ההערות שלי</h3>
          </div>
          {!noteEditing && (
            <button
              onClick={() => {
                setNoteText(recipeNotes[recipe.id] || '')
                setNoteEditing(true)
              }}
              className="text-xs text-olive-600 bg-white px-3 py-1.5 rounded-full border border-olive-100"
            >
              {recipeNotes[recipe.id] ? 'עריכה' : '+ הוספה'}
            </button>
          )}
        </div>
        {noteEditing ? (
          <div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="הוסיפו הערות אישיות למתכון... למשל: פחות מלח, יותר מים לפתיתים"
              className="w-full border border-cream-100 rounded-xl p-3 text-sm text-warm-brown-600 resize-none focus:outline-none focus:border-olive-400 placeholder:text-warm-brown-400"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                onClick={() => setNoteEditing(false)}
                className="text-xs text-warm-brown-400 px-3 py-1.5 rounded-full"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  setRecipeNote(recipe.id, noteText)
                  setNoteEditing(false)
                }}
                className="text-xs text-white bg-olive-600 px-4 py-1.5 rounded-full"
              >
                שמירה
              </button>
            </div>
          </div>
        ) : recipeNotes[recipe.id] ? (
          <p className="text-sm text-warm-brown-600 leading-relaxed whitespace-pre-wrap">{recipeNotes[recipe.id]}</p>
        ) : (
          <p className="text-sm text-warm-brown-400 italic">אין הערות עדיין</p>
        )}
      </div>

      {/* Focus Mode Overlay */}
      {focusModeOpen && hasDetailedContent && (
        <FocusMode
          steps={recipe.steps}
          recipeName={recipe.name}
          onClose={() => setFocusModeOpen(false)}
        />
      )}
    </div>
  )
}
