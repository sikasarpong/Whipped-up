import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase import 
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        // reset error everytime after we try to signup a new user
        setError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user })
                // console.log('user logged in', res.user)
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, login }
}
