# CLAUDE.md — Dubon (דובון) Recipe App

## Overview

Dubon is a Hebrew (RTL) recipe and nutrition Progressive Web App. It helps users discover recipes through an onboarding quiz, search, filters, and meal categories. The UI is mobile-first, minimalist, and entirely in Hebrew.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin, NOT CDN)
- **State:** Zustand 5 (single store at `src/store/useAppStore.js`, persists to `localStorage`)
- **Search:** Fuse.js 7 (fuzzy search with 300ms debounce)
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **Deployment:** Vercel (repo: `adishalev28/dubon`)
- **PWA:** Service Worker for offline support and auto-updates
- **Language:** JavaScript only — no TypeScript

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
  App.jsx                          # Root: onboarding flow + route definitions
  main.jsx                         # Entry point (React + BrowserRouter)
  index.css                        # Tailwind import + custom color theme + global RTL
  store/
    useAppStore.js                 # Zustand store (onboarding, search, filters, favorites)
  data/
    recipes.js                     # All recipe data (temporary demo data)
  components/
    Onboarding/
      WelcomeScreen.jsx            # Landing screen with quiz or free-browse options
      QuizFlow.jsx                 # 3-question quiz (mood/time/preferences)
      ResultsScreen.jsx            # Personalized results after quiz
    Home/
      HeroSection.jsx              # Hero banner with logo
      SearchBar.jsx                # Fuse.js fuzzy search (debounce 300ms)
      MealCategories.jsx           # Breakfast / Lunch / Dinner / Snack filters
      QuickFilters.jsx             # Tag-based mood/diet quick filters
      RecommendedRecipes.jsx       # Recipe grid (filtered by search + filters + meal)
    Recipe/
      RecipePage.jsx               # Full recipe detail (video, ingredients, steps, tips)
    Layout/
      BottomNav.jsx                # Fixed bottom navigation bar
    shared/
      RecipeCard.jsx               # Reusable recipe card component
      NutritionPills.jsx           # Calorie / protein / fat display pills
```

## Color Palette

Defined as CSS custom properties in `src/index.css` using Tailwind `@theme`:

| Token           | Primary Value | Tailwind Class Prefix |
|-----------------|---------------|-----------------------|
| Olive           | `#6B7F4A`    | `olive-*`             |
| Warm Orange     | `#C4883A`    | `warm-orange-*`       |
| Cream           | `#F5EFE0`    | `cream-*`             |
| Warm Brown      | `#9B7B4A`    | `warm-brown-*`        |

Each color has shades: 50, 100, 400, 600, 800.

## Design Style

Minimalist Modern: generous white space, system sans-serif font stack, large food photography, soft earthy tones. Mobile-first with `max-w-lg mx-auto` container.

## App Flow

1. **Onboarding** (shown once, state persisted in `localStorage`):
   - Welcome screen -> Quiz (3 questions) -> Personalized results -> Home
   - Users can skip directly to Home with "free browse"
2. **Home page:** Hero, SearchBar, MealCategories, QuickFilters, RecommendedRecipes, BottomNav
3. **Recipe page:** `/recipe/:id` — full detail with optional video, detailed ingredients, step-by-step instructions with quantities embedded inline, pro tips
4. **Placeholder pages:** Categories, Nutrition tracking, Favorites, Profile (routes exist, content TBD)

## Recipe Data Structure

Each recipe object in `src/data/recipes.js`:

```
{
  id: number,
  name: string,                     // Hebrew name
  image: string,                    // URL (Unsplash or local path)
  video?: string,                   // Optional local video path
  time: number,                     // Minutes
  difficulty: string,               // 'קל' | 'בינוני' | 'מורכב'
  category: string,                 // 'בוקר' | 'צהריים' | 'ערב' | 'חטיף'
  meal: string,                     // 'breakfast' | 'lunch' | 'dinner' | 'snack'
  tags: string[],                   // Hebrew tags for quick filters
  calories: number,
  protein: number,
  fat: number,
  description: string,              // Short Hebrew description
  ingredients: string[],            // Simple ingredient list
  moods: string[],                  // Mood/vibe tags for filtering
  servings?: string,                // e.g. '4-5 מנות'
  intro?: string,                   // Long intro paragraph
  detailedIngredients?: [           // Rich ingredient objects
    { name, amount, note }
  ],
  steps?: [                         // Step-by-step instructions
    { title, text }                 // Quantities are embedded in step text
  ],
  proTip?: string                   // Chef pro tip
}
```

## Important Rules

- **RTL everywhere.** `direction: rtl` is set on `<body>`. All layouts, text, and UI must respect RTL.
- **Hebrew only.** All user-facing text is in Hebrew.
- **No TypeScript.** The project uses plain JavaScript (`.jsx` files).
- **Nutritional values are demo-only.** Current calorie/protein/fat numbers are approximate. Production requires a real API (e.g., USDA FoodData Central).
- **Images are from Unsplash** (or local files). Replace with licensed/owned images for production.
- **Quantities belong in step text.** Ingredient amounts are embedded directly in the preparation step descriptions, not referenced separately.
- **Zustand store keys** in `localStorage` are prefixed with `nourish_` (legacy project name).

## Roadmap

- Full recipe page improvements (sharing, print view, serving scaler)
- Categories page (browsable by meal/tag)
- Nutrition tracking dashboard
- Favorites page with saved recipes
- Profile page with quiz re-take and preferences
- Real API integration for nutritional data
