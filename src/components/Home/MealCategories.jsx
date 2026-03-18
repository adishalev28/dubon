import { Sun, Salad, Moon, Cookie } from 'lucide-react'
import { mealCategories } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'

const iconMap = { Sun, Salad, Moon, Cookie }

export default function MealCategories() {
  const { activeMealCategory, setMealCategory } = useAppStore()

  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between gap-3">
        {mealCategories.map((cat) => {
          const Icon = iconMap[cat.icon]
          const isActive = activeMealCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setMealCategory(cat.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all cursor-pointer
                ${isActive ? 'bg-olive-600 text-white shadow-md' : `${cat.bgColor} text-olive-800 hover:shadow-sm`}
              `}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
