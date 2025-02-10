import { useEffect, useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

// components
import RecipeDetails from "../components/RecipeDetails"
import RecipeForm from "../components/RecipeForm"
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { recipes, dispatch } = useRecipesContext()

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_RECIPES', payload: json })
      }
    }

    fetchRecipes()
  }, [dispatch])

  const filteredItems = recipes
    ? recipes.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="home">
      <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="workouts">
        {filteredItems.map(recipe => (
          <RecipeDetails recipe={recipe} key={recipe._id} />
        ))}
      </div>
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home