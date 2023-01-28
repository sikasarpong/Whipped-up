import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'


export default function RecipeList({ recipes }) {
    // const handleClick = async(id) => {
    //     console.log(id)
    // }
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className="card">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Whip this </Link>
                </div>
            ))}
        </div>
    )
}




