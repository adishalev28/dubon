import { Sun, Salad, Moon, Cookie, Droplets } from 'lucide-react'
import { mealCategories } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'

const iconMap = { Sun, Salad, Moon, Cookie, Droplets }

export default function MealCategories() {
  const { activeMealCategory, setMealCategory } = useAppStore()

  return (
    <div className="px-4 mt-6">
      <div className="flex gap-2">
        {mealCategories.map((cat) => {
          const Icon = iconMap[cat.icon]
          const isActive = activeMealCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setMealCategory(cat.id)}
              className={`flex-1 min-w-0 flex flex-col items-center gap-2 py-3 rounded-2xl transition-all cursor-pointer
                ${isActive ? 'bg-olive-600 text-white shadow-md' : `${cat.bgColor} text-olive-800 hover:shadow-sm`}
              `}
            >
              <Icon size={22} />
              <span className="text-[11px] font-medium">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
