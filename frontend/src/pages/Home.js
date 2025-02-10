import { useEffect, useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

// components
import RecipeDetails from "../components/RecipeDetails"
import RecipeForm from "../components/RecipeForm"
import SearchBar from '../components/SearchBar';
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { recipes, dispatch } = useRecipesContext()
  const { user } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include user token for authorization
          },
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_RECIPE", payload: json });
        } else {
          console.error("Failed to fetch recipes:", json.error);
        }
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user]);

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