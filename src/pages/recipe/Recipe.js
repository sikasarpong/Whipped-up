import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { db } from '../../firebase/config'
import { doc,  onSnapshot, updateDoc } from 'firebase/firestore';

import UpdateRecipe from './UpdateRecipe'

// styles
import "./Recipe.css";

export default function Recipe() {
    const { id } = useParams()
    const { mode } = useTheme()
    const [open, setOpen] = useState({ edit: false })

    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(null)

    const handleRecipe = async id => {

        const ref = doc(db, "recipes", id)
        await updateDoc(ref)

        doc(prevData => {
            const updatedData = prevData.filter(recipe => recipe.id !== id)
            return updatedData
        })
    }

    useEffect(() => {
        const ref = doc(db, 'recipes', id)
        // const docSnap = await
        const unsub = onSnapshot(ref,(doc) => {
            if (doc.exists()) {
                // setIsPending(false)
                setRecipe(doc.data())
            } else {
                // setIsPending(false)
                setError(`Could not find that recipe`)
            }
        })
        return () => unsub()

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
                <button className='recipe__editButton' onClick={() => setOpen({ ...open, edit: true })}>Edit</button>
                {open.edit &&
                    <UpdateRecipe
                        toEditTitle={recipe.title}
                        toEditMethod={recipe.method}
                        handleRecipe={handleRecipe}
                    />
                }
            </>
        )}

    </div>;
}
