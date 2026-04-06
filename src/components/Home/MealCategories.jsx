import { Sun, Salad, Moon, Cookie, CakeSlice, Droplets, Beaker } from 'lucide-react'
import { mealCategories } from '../../data/recipes'
import useAppStore from '../../store/useAppStore'
import { useLanguage } from '../../i18n/LanguageContext'

const iconMap = { Sun, Salad, Moon, Cookie, CakeSlice, Droplets, Beaker }

const labelKeyMap = {
  breakfast: 'meals.breakfast',
  lunch: 'meals.lunch',
  dinner: 'meals.dinner',
  snack: 'meals.snack',
  dessert: 'meals.dessert',
  dip: 'meals.dip',
  ferment: 'meals.ferment',
}

export default function MealCategories() {
  const { activeMealCategory, setMealCategory } = useAppStore()
  const { t } = useLanguage()

  return (
    <div className="px-4 mt-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {mealCategories.map((cat) => {
          const Icon = iconMap[cat.icon]
          const isActive = activeMealCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setMealCategory(cat.id)}
              className={`shrink-0 flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl transition-all cursor-pointer
                ${isActive ? 'bg-olive-600 text-white shadow-md' : `${cat.bgColor} text-olive-800 hover:shadow-sm`}
              `}
            >
              <Icon size={24} />
              <span className="text-xs font-medium whitespace-nowrap">{t(labelKeyMap[cat.id]) || cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
