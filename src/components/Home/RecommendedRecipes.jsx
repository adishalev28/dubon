import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { recipes, quickFilters } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'
import RecipeCard from '../shared/RecipeCard'
import { useLanguage } from '../../i18n/LanguageContext'
import { useTranslatedRecipes } from '../../i18n/useTranslatedRecipe'

const fuse = new Fuse(recipes, {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'ingredients', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'tags', weight: 1 },
    { name: 'category', weight: 0.5 },
  ],
  threshold: 0.25,
  ignoreLocation: true,
})

export default function RecommendedRecipes() {
  const { searchQuery, activeFilters, activeMealCategory, recipeViews } = useAppStore()
  const { t, isRTL } = useLanguage()

  const filtered = useMemo(() => {
    let result = searchQuery
      ? fuse.search(searchQuery).map((r) => r.item)
      : [...recipes]

    // Meal category filter
    if (activeMealCategory) {
      result = result.filter((r) => r.meal === activeMealCategory || (r.meals && r.meals.includes(activeMealCategory)))
    }

    // Quick filters (AND logic)
    for (const filterId of activeFilters) {
      const filter = quickFilters.find((f) => f.id === filterId)
      if (!filter) continue
      if (filter.type === 'time') {
        result = result.filter((r) => r.time <= filter.value)
      } else if (filter.type === 'calories') {
        result = result.filter((r) => r.calories <= filter.value)
      } else {
        result = result.filter((r) => r.tags.includes(filter.tag))
      }
    }

    // Without a search, most-opened recipes first (stable sort keeps original order on ties)
    if (!searchQuery) {
      result = [...result].sort((a, b) => (recipeViews[b.id] || 0) - (recipeViews[a.id] || 0))
    }

    return result
  }, [searchQuery, activeFilters, activeMealCategory, recipeViews])

  const translatedFiltered = useTranslatedRecipes(filtered)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-olive-800 px-4 mb-3">
        {searchQuery || activeFilters.length > 0 || activeMealCategory
          ? `${filtered.length} ${t('home.results')}`
          : t('home.recommended')}
      </h2>

      {filtered.length === 0 ? (
        <p className="text-cream-600 text-center py-8 px-4">{t('home.noResults')}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 pb-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          {translatedFiltered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
