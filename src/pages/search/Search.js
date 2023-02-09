// import { useFetch } from '../../hooks/useFetch'
// import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useCollection } from '../../hooks/useCollection'
// import {where,query,collection } from 'firebase/firestore'
// import { db } from '../../firebase/config'
// import {term}from '../../components/Searchbar'


// styles
import './Search.css'

export default function Search() {
    // const ref = collection(db, 'recipes');

    // const q = query(ref, where("cookingTime", "<=", {term}))
    // const queryString = useLocation().search
    // const queryParams = new URLSearchParams(queryString)
    // const query = queryParams.get('q')

    // const url = 'http://localhost:3000/recipes?q=' + query
    // const { error, isPending, data } = useFetch(url)
    const {documents: recipes,error,isPending} = useCollection(
        'recipes',
        ['cookingTime','<=','q']
        )

    return (
        <div>
            <h2 className="page-title">Recipes including</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}