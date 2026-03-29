import { useMemo } from 'react'
import { useLanguage } from './LanguageContext'
import recipesEn from './recipes-en.json'

/**
 * Returns a translated version of a recipe.
 * In Hebrew mode - returns the original recipe unchanged.
 * In English mode - merges English translations on top of the original.
 */
export function useTranslatedRecipe(recipe) {
  const { lang } = useLanguage()

  return useMemo(() => {
    if (!recipe || lang === 'he') return recipe

    const en = recipesEn[String(recipe.id)]
    if (!en) return recipe // No translation available, return original

    return {
      ...recipe,
      name: en.name || recipe.name,
      description: en.description || recipe.description,
      intro: en.intro || recipe.intro,
      ingredients: en.ingredients || recipe.ingredients,
      detailedIngredients: en.detailedIngredients || recipe.detailedIngredients,
      steps: en.steps || recipe.steps,
      proTip: en.proTip || recipe.proTip,
      difficulty: en.difficulty || recipe.difficulty,
      category: en.category || recipe.category,
      servings: en.servings || recipe.servings,
    }
  }, [recipe, lang])
}

/**
 * Returns an array of translated recipes.
 */
export function useTranslatedRecipes(recipes) {
  const { lang } = useLanguage()

  return useMemo(() => {
    if (lang === 'he') return recipes

    return recipes.map(recipe => {
      const en = recipesEn[String(recipe.id)]
      if (!en) return recipe

      return {
        ...recipe,
        name: en.name || recipe.name,
        description: en.description || recipe.description,
        difficulty: en.difficulty || recipe.difficulty,
        category: en.category || recipe.category,
        servings: en.servings || recipe.servings,
      }
    })
  }, [recipes, lang])
}
