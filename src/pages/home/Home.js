import React from 'react'
import { useEffect, useState } from 'react'
import RecipeList from '../../components/RecipeList'
import { db } from '../../firebase/config'
import { collection,getDocs } from 'firebase/firestore'

// styles
import "./Home.css";



export default function Home() {
    const [data, setRecipes] = useState(null)

    useEffect(() => {
        const ref = collection(db, 'recipes')

        getDocs(ref)
        .then((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({id: doc.id, ...doc.data()})
            })
            setRecipes(results)
        })
    }, [])


    return (
        <div>
            {data && <RecipeList recipes={data} />}

            </div>
    )
}

