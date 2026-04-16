# CLAUDE.md — Dubon (דובון)

## מה זה
אפליקציית מתכונים ותזונה בעברית (RTL). חיפוש, פילטרים, קטגוריות, אונבורדינג קוויז. PWA, מובייל-first.

## Tech Stack
React 19 + Vite 8 | Tailwind 4 (`@tailwindcss/vite`, לא CDN) | Zustand 5 | Fuse.js 7 | React Router 7 | Lucide React | JavaScript (אין TS) | Vercel (`adishalev28/dubon`)

## Commands
```bash
npm run dev      # Dev server
npm run build    # Production build
```

## מבנה
```
src/
  App.jsx                    # Root: onboarding + routes
  main.jsx                   # Entry (React + BrowserRouter)
  index.css                  # Tailwind + custom colors + RTL
  store/useAppStore.js       # Zustand (onboarding, search, filters, favorites)
  data/recipes.js            # כל המתכונים
  components/
    Onboarding/  WelcomeScreen / QuizFlow / ResultsScreen
    Home/        HeroSection / SearchBar / MealCategories / QuickFilters / RecommendedRecipes
    Recipe/      RecipePage
    Layout/      BottomNav
    shared/      RecipeCard / NutritionPills
```

## צבעים (`src/index.css` @theme)

| Token | Value | Shades |
|-------|-------|--------|
| olive | `#6B7F4A` | 50-800 |
| warm-orange | `#C4883A` | 50-800 |
| cream | `#F5EFE0` | 50-800 |
| warm-brown | `#9B7B4A` | 50-800 |

## App Flow
1. **Onboarding** (פעם אחת, `localStorage`): Welcome → Quiz (3 שאלות) → Results → Home
2. **Home:** Hero, Search, MealCategories, QuickFilters, Recipes, BottomNav
3. **Recipe:** `/recipe/:id` — וידאו, מרכיבים, שלבים עם כמויות inline, טיפים

## Recipe Data Structure
```js
{ id, name, image, video?, time, difficulty, category, meal,
  tags[], calories, protein, fat, description, ingredients[],
  moods[], servings?, intro?, detailedIngredients?: [{name,amount,note}],
  steps?: [{title,text}], proTip? }
```

## כללים
- RTL + עברית בלבד בכל ה-UI
- אין TypeScript
- **כמויות מרכיבים משובצות בתוך שלבי ההכנה** (לא בנפרד)
- Zustand keys ב-localStorage: prefix `nourish_`
- תמונות Unsplash (דמו) — להחליף לפרודקשן
- ערכים תזונתיים = דמו בלבד
