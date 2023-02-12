import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";


// import styles from "./Navbar.css";
import "./Navbar.css";
import Searchbar from "./Searchbar";


export default function Navbar() {
    const { logout } = useLogout()
    const { color } = useTheme()
    const { user } = useAuthContext()


    return (
        <nav className="navbar" style={{ background: color }}>
            <ul className="remBullet">
                <li>
                    <Link to="/" className="brand">
                        <h1>Whipped Up</h1>
                    </Link>
                </li>

                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
                <Searchbar />
                <li><Link to="/create">Create Recipe</Link></li>
            </ul>

        </nav>
    )
}


