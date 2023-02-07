import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

// styles
import "./Recipe.css";

export default function Recipe() {
    const { id } = useParams()
    const { mode } = useTheme()


    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(db, 'recipes', id)
        // const docSnap = await
        getDoc(ref).then((doc) => {
            if (doc.exists()) {
                // setIsPending(false)
                setRecipe(doc.data())
            } else {
                // setIsPending(false)
                setError(`Could not find that recipe`)
            }
        })

    }, [id])


    return <div className={`recipe ${mode}`}>
        {error && <p className="error">{error}</p>}
        {recipe && (
            <>
                <h2 className="page-title">{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} minutes to cook.</p>
                <ul>
                    {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
                <p className="method">{recipe.method}</p>
            </>
        )}

    </div>;
}
