import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Logo from "./components/logo/logo";
import Sector from "./pages/Sector/Sector";
import Resume from "./pages/Resume/Resume";
import Proposal from "./pages/Proposal/Proposal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <div className="mainstage">
        <p>Resume Generator</p>
      </div>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
      <Sector/>
      <Proposal />
    </div>
  );
}

export default App;

// #00569c the blue color
