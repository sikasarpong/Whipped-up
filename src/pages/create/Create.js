import { useState,  useRef } from 'react'
import { db } from '../../firebase/config'
// import { auth } from '../../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'


// styles
import "./Create.css";


export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)


    const recipesCollectionRef = collection(db, "recipes")
    
    const history = useHistory()

    const { user } = useAuthContext()

    const { postData  } = useFetch('http://localhost:3000/recipes', 'POST')

    const handleSubmit = async (e) => {
        e.preventDefault()
        postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    
        try {
            await addDoc(recipesCollectionRef, {
                title,
                ingredients,
                method,
                cookingTime,
                uid: user.uid,
                createdAt: serverTimestamp()
            })

            // redirect the user when we get data response
            history.push('/')
        } catch (err) {
            console.log(err)
        }

        setTitle('')
        setMethod('')
        setNewIngredient([])
        setCookingTime('')
    }

    const handleIngredient = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }


    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                    </div>
                    <button onClick={handleIngredient} className="btn">add</button>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className="btn">Submit</button>
            </form>
        </div>
    )
}




