import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';



// styles
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, login } = useLogin()


    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        // console.log(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <label htmlFor=""><span>Email:</span>
                <input
                    type="email"
                    // attaching onChange handlers
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label htmlFor=""><span>Password:</span>
                <input type="password"
                    // attaching onChange handlers
                    onChange={(e) => setPassword(e.target.value)}
                    // value shld also br updated to match the state if it changes
                    value={password}
                />
            </label>
            <button className="btn">Login</button>
            {error && <p>{error}</p>}
        </form>
    )
}
