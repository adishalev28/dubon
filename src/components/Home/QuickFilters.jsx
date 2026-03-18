import { quickFilters } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'

export default function QuickFilters() {
  const { activeFilters, toggleFilter } = useAppStore()

  return (
    <div className="px-4 mt-4">
      <div className="flex gap-2 flex-wrap">
        {quickFilters.map((filter) => {
          const isActive = activeFilters.includes(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-olive-600 text-white'
                    : 'bg-white text-olive-800 border border-olive-100 hover:border-olive-400'
                }
              `}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
