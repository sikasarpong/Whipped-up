import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useAuthContext } from './hooks/useAuthContext';

// page component
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector';
import './App.css'

function App() {
  const { authIsReady, user } = useAuthContext()


  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path={"/search"}>
              <Search />
            </Route>
            <Route path={"/recipes/:id"}>
              <Recipe />
            </Route>
            <Route path={"/login"}>
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
            <Route path={"/signup"}>
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
              {/* {user && <Redirect to="/" />} */}
            </Route>

          </Switch>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App
