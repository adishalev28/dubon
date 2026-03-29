import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { recipes, quickFilters } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'
import RecipeCard from '../shared/RecipeCard'

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
  const { searchQuery, activeFilters, activeMealCategory } = useAppStore()

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

    return result
  }, [searchQuery, activeFilters, activeMealCategory])

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-olive-800 px-4 mb-3">
        {searchQuery || activeFilters.length > 0 || activeMealCategory
          ? `${filtered.length} תוצאות`
          : 'מומלצים עבורך'}
      </h2>

      {filtered.length === 0 ? (
        <p className="text-cream-600 text-center py-8 px-4">לא נמצאו מתכונים מתאימים</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide" style={{ direction: 'rtl' }}>
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
