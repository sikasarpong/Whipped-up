import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'

import RecipeList from '../../components/RecipeList'


// styles
import './Search.css'


export default function Search() {
    // const ref = collection(db, 'recipes');

    // const q = query(ref, where("cookingTime", "<=", 'q'))
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const url = 'http://localhost:3000/recipes?q=' + query
    const { error, isPending, data } = useFetch(url)
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