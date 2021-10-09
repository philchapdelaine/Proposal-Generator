import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Logo from "./components/logo/logo";
import Sector from "./pages/Sector/Sector";
import Resume from "./pages/Resume/Resume";
import Proposal from "./pages/Proposal/Proposal";

import Button from "@material-ui/core/Button";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  return (
    <div>
      <header className="App-header">
        <Logo />
      </header>
      <div className="mainstage">
        <p>Resume Generator</p>
      </div>
      <Router>
        <div>
          <nav>
            <Button vairant="contained" color="primary">
              <Link to="/">Home</Link>
            </Button>
            <Button color="primary">
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/resume">Resume</Link>
            </Button>
            <Button>
              <Link to="/sector">Sector</Link>
            </Button>
            <Button>
              <Link to="/proposal">Proposal</Link>
            </Button>
          </nav>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/resume">
              <Resume />
            </Route>
            <Route path="/sector">
              <Sector />
            </Route>
            <Route path="/proposal">
              <Proposal />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

// #00569c the blue color
