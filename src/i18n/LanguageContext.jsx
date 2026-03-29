import { createContext, useContext, useState, useCallback } from 'react'
import he from './he.json'
import en from './en.json'

const translations = { he, en }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('dubon_lang') || 'he'
  })

  const toggleLanguage = useCallback(() => {
    setLang(prev => {
      const next = prev === 'he' ? 'en' : 'he'
      localStorage.setItem('dubon_lang', next)
      document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr'
      document.documentElement.lang = next
      return next
    })
  }, [])

  const t = useCallback((key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }, [lang])

  const isRTL = lang === 'he'
  const isEnglish = lang === 'en'

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, isRTL, isEnglish }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
