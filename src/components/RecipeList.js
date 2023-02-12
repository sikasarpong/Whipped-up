import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'


// styles
import './RecipeList.css'


export default function RecipeList({ recipes,  }) {
    const { mode } = useTheme()




    if (recipes.length === 0) {
        return <div className='error'>No recipes available...</div>
    }


    const handleClick = async (id) => {
        const recipeDocRef = doc(db, 'recipes', id)
        try {
            await deleteDoc(recipeDocRef)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} minutes to make.</p>
                    <div>{recipe.method}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Whip this </Link>
                    <button className="remove" onClick={() => handleClick(recipe.id)}>Remove</button>

                </div>
            ))}
        </div>
    )
}




