import Maker from "./components/pages/Maker"
import Header from "./components/principal/Header"
import Portfolio from "./components/pages/Portfolio"
import { BrowserRouter as Router,Switch , Route } from "react-router-dom"
import Home from "./components/pages/Home"
import MakerHome from "./components/pages/MakerHome"
export default function App(){
  return(
    <Router>
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/projects">
              <Maker/>
            </Route>
            <Route path="/Sites">
              <MakerHome/>
            </Route>
            <Route path="/Portfolio">
              <Portfolio/>
            </Route>
          </Switch>
    </Router>
  )
}