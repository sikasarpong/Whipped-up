import React from 'react'
import RecipeList from '../../components/RecipeList'

// import firebase
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import "./Home.css";



export default function Home() {
    const { user } = useAuthContext()
    const { documents: recipes, error } = useCollection(
        'recipes',
        // 'null',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    )

    return (
        <div>
            {error && <p>{error}</p>}
            {recipes && <RecipeList recipes={recipes} />}

        </div>
    )
}

