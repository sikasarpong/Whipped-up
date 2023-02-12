import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
// import { useEffect } from 'react'
import RecipeList from '../../components/RecipeList'
// import { useCollection } from '../../hooks/useCollection'
// import { onSnapshot } from 'firebase/firestore'


// styles
import './Search.css'
// import { useParams } from 'react-router-dom'

export default function Search () {
    // const ref = collection(db, 'recipes');

    // const q = query(ref, where("cookingTime", "<=", 'q'))
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const url = 'http://localhost:3000/recipes?q=' + query
    const { error, isPending,data } = useFetch(url)
    // const { documents: recipes } = useCollection(
    //     'recipes')




    return (
        <div>
            <h2 className="page-title">Recipes including "{query}" </h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}