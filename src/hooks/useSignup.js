import { useState } from "react"


// firebase import 
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth"


export const useSignup = () => {
    // creaate state
    const [error, setError] = useState(null)

    // create a signup func inside this hook to use in other components
    const signup = (email, password) => {
        // reset error everytime after we try to signup a new user
        setError(null)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user signed up', res.user)
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, signup }
}