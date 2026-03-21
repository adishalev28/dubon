import { useNavigate } from 'react-router-dom'
import { recipes } from '../../data/recipes'

export default function OurDishes() {
  const navigate = useNavigate()

  return (
    <div className="mt-8 px-4">
      <h2 className="text-lg font-bold text-olive-800 mb-3">המטבחים שלנו</h2>

      <div className="grid grid-cols-2 gap-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-medium text-olive-800 mt-2 line-clamp-1">{recipe.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
