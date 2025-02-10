import { useRecipesContext } from '../hooks/useRecipesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RecipeDetails = ({ recipe }) => {
    const { dispatch } = useRecipesContext();
    const { user } = useAuthContext()

    const handleClick = async () => {

        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:4000/api/recipes/${recipe._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_RECIPE', payload: json });
        }
    };

    return (
        <div className="workout-details">
            <h4>{recipe.name}</h4>
            <p><strong>Ingredients: </strong>{recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions: </strong>{recipe.instructions}</p>
            <p><strong>Prep Time: </strong>{recipe.prepTime} minutes</p>
            <p><strong>Difficulty: </strong>{recipe.difficulty}</p>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }} />}
            <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick} style={{ cursor: "pointer", color: "red" }}>delete</span>
        </div>
    );
};

export default RecipeDetails;