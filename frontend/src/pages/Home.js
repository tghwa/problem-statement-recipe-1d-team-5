import { useEffect } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

// components
import RecipeDetails from "../components/RecipeDetails"
// import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { recipes, dispatch } = useRecipesContext()

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPES', payload: json})
      }
    }

    fetchRecipes()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {recipes && recipes.map(recipe => (
          <RecipeDetails workout={recipe} key={recipe._id} />
        ))}
      </div>
      {/* <WorkoutForm /> */}
    </div>
  )
}

export default Home