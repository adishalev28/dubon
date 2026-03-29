import { Home, LayoutGrid, Activity, Bookmark, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, lang, toggleLanguage } = useLanguage()

  const tabs = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/categories', icon: LayoutGrid, label: t('nav.categories') },
    { path: '/nutrition', icon: Activity, label: t('nav.nutrition') },
    { path: '/favorites', icon: Bookmark, label: t('nav.favorites') },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-olive-50 z-50">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 cursor-pointer transition-colors
                ${isActive ? 'text-olive-600' : 'text-cream-400'}
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="flex flex-col items-center gap-1 px-3 py-1 cursor-pointer transition-colors text-cream-400 hover:text-olive-600"
        >
          <span className="text-lg leading-none">{lang === 'he' ? '🇬🇧' : '🇮🇱'}</span>
          <span className="text-[10px] font-medium">{lang === 'he' ? 'EN' : 'עב'}</span>
        </button>
      </div>
      {/* Safe area bottom */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
