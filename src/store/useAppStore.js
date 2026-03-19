import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // Onboarding
  hasCompletedOnboarding: !!localStorage.getItem('nourish_onboarding_done'),
  onboardingAnswers: JSON.parse(localStorage.getItem('nourish_onboarding_answers') || 'null'),

  setOnboardingComplete: (answers) => {
    localStorage.setItem('nourish_onboarding_done', 'true')
    if (answers) {
      localStorage.setItem('nourish_onboarding_answers', JSON.stringify(answers))
    }
    set({ hasCompletedOnboarding: true, onboardingAnswers: answers })
  },

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Filters
  activeFilters: [],
  toggleFilter: (filterId) => {
    const current = get().activeFilters
    const next = current.includes(filterId)
      ? current.filter((f) => f !== filterId)
      : [...current, filterId]
    set({ activeFilters: next })
  },

  // Meal category filter
  activeMealCategory: null,
  setMealCategory: (category) => {
    const current = get().activeMealCategory
    set({ activeMealCategory: current === category ? null : category })
  },

  // Favorites
  favorites: JSON.parse(localStorage.getItem('nourish_favorites') || '[]'),
  toggleFavorite: (recipeId) => {
    const current = get().favorites
    const next = current.includes(recipeId)
      ? current.filter((id) => id !== recipeId)
      : [...current, recipeId]
    localStorage.setItem('nourish_favorites', JSON.stringify(next))
    set({ favorites: next })
  },

  // Ingredient Checklist
  checkedIngredients: JSON.parse(localStorage.getItem('nourish_checked_ingredients') || '{}'),
  toggleIngredientCheck: (recipeId, ingredientIndex) => {
    const current = get().checkedIngredients
    const recipeChecked = current[recipeId] || []
    const next = recipeChecked.includes(ingredientIndex)
      ? recipeChecked.filter((i) => i !== ingredientIndex)
      : [...recipeChecked, ingredientIndex]
    const updated = { ...current, [recipeId]: next }
    localStorage.setItem('nourish_checked_ingredients', JSON.stringify(updated))
    set({ checkedIngredients: updated })
  },
}))

export default useAppStore
