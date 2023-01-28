// styles
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useTheme } from "../hooks/useTheme";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// import styles from "./Navbar.module.css";
import "./Navbar.css";


export default function Navbar() {
    const { logout } = useLogout()
    const {color} = useTheme()


    return (
        <div className="navbar" style={{background: color}}>
            <nav>
                <Link to="/" className="brand">
                    <h1>Whipped Up</h1>
                </Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link onClick={logout}>Logout</Link>
                <Link to="/create">Create Recipe</Link>

            </nav>
        </div>
    )
}


