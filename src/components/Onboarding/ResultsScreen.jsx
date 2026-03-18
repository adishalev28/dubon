import { ArrowRight } from 'lucide-react'
import { recipes } from '../../data/recipes'
import RecipeCard from '../shared/RecipeCard'

export default function ResultsScreen({ answers, onGoHome }) {
  const filtered = recipes.filter((recipe) => {
    // Filter by meal type
    if (answers.meal && recipe.meal !== answers.meal) return false

    // Filter by time
    if (answers.time && recipe.time > answers.time) return false

    // Filter by mood — match at least one
    if (answers.mood && answers.mood.length > 0) {
      const hasMatch = answers.mood.some((m) => recipe.moods.includes(m))
      if (!hasMatch) return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-cream-50 px-6 py-8">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-olive-800 mb-2">
          מצאנו {filtered.length} מתכונים עבורך
        </h2>
        <p className="text-cream-600 mb-6">מבוסס על ההעדפות שלך</p>

        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} variant="full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-cream-600 text-lg mb-4">
              לא נמצאו מתכונים מתאימים — נסה לשנות את ההעדפות
            </p>
          </div>
        )}

        <button
          onClick={onGoHome}
          className="w-full py-4 rounded-2xl text-lg font-medium mt-8 bg-olive-600 text-white hover:bg-olive-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowRight size={20} />
          לדף הבית
        </button>
      </div>
    </div>
  )
}
