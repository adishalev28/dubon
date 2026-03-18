import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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

function HomePage() {
  return (
    <div className="pb-20">
      <HeroSection />
      <SearchBar />
      <MealCategories />
      <QuickFilters />
      <RecommendedRecipes />
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
        <Route path="/categories" element={<PlaceholderPage title="קטגוריות" />} />
        <Route path="/nutrition" element={<PlaceholderPage title="מעקב תזונה" />} />
        <Route path="/favorites" element={<PlaceholderPage title="מועדפים" />} />
        <Route path="/profile" element={<PlaceholderPage title="פרופיל" />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
