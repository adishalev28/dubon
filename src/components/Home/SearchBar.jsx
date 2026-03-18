import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

export default function SearchBar() {
  const { setSearchQuery } = useAppStore()
  const [localQuery, setLocalQuery] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)
    return () => clearTimeout(timerRef.current)
  }, [localQuery, setSearchQuery])

  return (
    <div className="px-4 -mt-5 relative z-10">
      <div className="bg-white rounded-2xl shadow-md flex items-center gap-3 px-4 py-3">
        <Search size={20} className="text-cream-400 flex-shrink-0" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="חיפוש לפי מתכון, רכיב או קטגוריה..."
          className="flex-1 text-olive-800 placeholder:text-cream-400 outline-none bg-transparent text-sm"
        />
      </div>
    </div>
  )
}
