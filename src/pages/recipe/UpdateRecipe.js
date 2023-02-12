import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'



// styles
import "./Recipe.css";

export default function UpdateRecipe({recipe, toEditTitle, toEditMethod }) {

    const [title, setNewTile] = useState(toEditTitle)
    const [method, setMethod] = useState(toEditMethod)




    const { mode } = useTheme()
    const { id } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const docRef = doc(db, 'recipes', id)
        try {
            await updateDoc(docRef, {
                title: title,
                method: method
            })
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div className={`recipe ${mode}`}>
            <div className="create">
                <form className="update-recipe" onSubmit={handleSubmit}>
                    <label>
                        <span>Title:</span>
                        <input
                            type="text"
                            onChange={(e) => setNewTile(e.target.value)}
                            value={title}
                        />
                    </label>
                    <label>
                        <span>Recipe Method:</span>
                        <textarea
                            onChange={(e) => setMethod(e.target.value)}
                            value={method}
                            required
                        />
                    </label>
                    <button className="btn">Update Recipe</button>
                </form>
            </div>
        </div>

    )
}