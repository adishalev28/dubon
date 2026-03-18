export default function NutritionPills({ calories, protein, fat }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <span className="text-xs bg-warm-orange-50 text-warm-orange-600 px-2 py-1 rounded-full font-medium">
        {calories} קק״ל
      </span>
      <span className="text-xs bg-olive-50 text-olive-600 px-2 py-1 rounded-full font-medium">
        {protein}g חלבון
      </span>
      <span className="text-xs bg-cream-100 text-cream-600 px-2 py-1 rounded-full font-medium">
        {fat}g שומן
      </span>
    </div>
  )
}
