import { useState ,useEffect} from "react"
import { useAuthContext } from "./useAuthContext"

// firebase import 
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword,  updateProfile } from "firebase/auth"


export const useSignup = () => {
    // create state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    // create a signup func inside this hook to use in other components
    const signup = async (email, password, displayName) => {
        // reset error everytime after we try to signup a new user
        setError(null)
        setIsPending(true)

        try {
            // signup
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            await updateProfile(auth.currentUser,{ displayName:displayName })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signup, error, isPending }
}


    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((res) => {

    //             dispatch({ type: 'LOGIN', payload: res.user })
    //             // console.log('user signed up', res.user)
    //             res.user.updateProfile({ displayName:displayName })
    //         })
    //         .catch((err) => {
    //             setError(err.message)
    //         })
    // }

//     return {signup, error }
// }