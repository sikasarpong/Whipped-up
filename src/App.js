import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

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
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
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
            <Login />
          </Route>
          <Route path={"/signup"}>
            <Signup />
          </Route>

        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App
