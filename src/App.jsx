import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import useAppStore from './store/useAppStore'
import WelcomeScreen from './components/Onboarding/WelcomeScreen'
import QuizFlow from './components/Onboarding/QuizFlow'
import ResultsScreen from './components/Onboarding/ResultsScreen'
import HeroSection from './components/Home/HeroSection'
import SearchBar from './components/Home/SearchBar'
import MealCategories from './components/Home/MealCategories'
import RecommendedRecipes from './components/Home/RecommendedRecipes'
import QuickFilters from './components/Home/QuickFilters'
import BottomNav from './components/Layout/BottomNav'
import RecipePage from './components/Recipe/RecipePage'
import TechniquesPage from './components/Techniques/TechniquesPage'

function TechniquesBanner() {
  const navigate = useNavigate()
  return (
    <div className="px-4 mt-4">
      <button
        onClick={() => navigate('/techniques')}
        className="w-full bg-gradient-to-l from-warm-orange-400 to-warm-orange-600 text-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="text-right flex-1">
          <div className="font-bold text-sm">🔥 טכניקות בישול</div>
          <div className="text-white/80 text-xs mt-0.5">צלייה על מחבת נירוסטה — סלמון, עוף, סטייק</div>
        </div>
        <div className="text-3xl">🍳</div>
      </button>
    </div>
  )
}

function HomePage() {
  return (
    <div className="pb-20">
      <HeroSection />
      <SearchBar />
      <MealCategories />
      <QuickFilters />
      <RecommendedRecipes />
      <TechniquesBanner />
    </div>
  )
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-screen pb-20">
      <p className="text-cream-600 text-lg">{title} — בקרוב</p>
    </div>
  )
}

export default function App() {
  const { hasCompletedOnboarding, setOnboardingComplete } = useAppStore()
  const [onboardingStep, setOnboardingStep] = useState('welcome') // welcome | quiz | results
  const [quizAnswers, setQuizAnswers] = useState(null)

  // Onboarding flow
  if (!hasCompletedOnboarding) {
    if (onboardingStep === 'welcome') {
      return (
        <WelcomeScreen
          onQuickHelp={() => setOnboardingStep('quiz')}
          onFreeBrowse={() => setOnboardingComplete(null)}
        />
      )
    }
    if (onboardingStep === 'quiz') {
      return (
        <QuizFlow
          onComplete={(answers) => {
            setQuizAnswers(answers)
            setOnboardingStep('results')
          }}
          onBack={() => setOnboardingStep('welcome')}
        />
      )
    }
    if (onboardingStep === 'results') {
      return (
        <ResultsScreen
          answers={quizAnswers}
          onGoHome={() => setOnboardingComplete(quizAnswers)}
        />
      )
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-cream-50 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/techniques" element={<TechniquesPage />} />
        <Route path="/categories" element={<PlaceholderPage title="קטגוריות" />} />
        <Route path="/nutrition" element={<PlaceholderPage title="מעקב תזונה" />} />
        <Route path="/favorites" element={<PlaceholderPage title="מועדפים" />} />
        <Route path="/profile" element={<PlaceholderPage title="פרופיל" />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
