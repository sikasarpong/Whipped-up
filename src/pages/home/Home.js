import React from 'react'
// import { useState } from 'react'
import RecipeList from '../../components/RecipeList'
import { db } from '../../firebase/config'
import {  doc, deleteDoc } from 'firebase/firestore'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import "./Home.css";



export default function Home() {
    const {user} = useAuthContext()
    const {documents: recipes} = useCollection(
        'recipes',
        ['uid','==',user.uid]
        )

    const removeRecipe = async id => {
        const ref = doc(db, "recipes", id)
        await deleteDoc(ref)

        doc(prevData => {
            const updatedData = prevData.filter( recipe => recipe.id !== id)
            return updatedData
        })
    }

    // useEffect(() => {
    //     const ref = collection(db, 'recipes')

    //     getDocs(ref)
    //         .then((snapshot) => {
    //             let results = []
    //             snapshot.docs.forEach(doc => {
    //                 results.push({ id: doc.id, ...doc.data() })
    //             })
    //             setRecipes(results)
    //         })
    // }, [])




    return (
        <div>
            {recipes && <RecipeList removeRecipe={removeRecipe} recipes={recipes} />}

        </div>
    )
}

