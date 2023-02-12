import React from 'react'
import RecipeList from '../../components/RecipeList'

// import firebase
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import "./Home.css";



export default function Home() {
    const { user } = useAuthContext()
    const { documents: recipes } = useCollection(
        'recipes',
        ['uid', '==', user.uid],
        ["createdAt", "desc"]
    )

    return (
        <div>
            {recipes && <RecipeList recipes={recipes} />}

        </div>
    )
}

