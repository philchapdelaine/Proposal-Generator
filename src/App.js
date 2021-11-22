import "./App.css";
import Logo from "./components/logo/logo";
import UserDropdown from "./components/user_dropdown/UserDropdown";

import MenuIcon from "@mui/icons-material/Menu";

// import Navigator from "./components/navigator/Navigator";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import React from "react";

import Login from "./pages/Login/Login";
import CreateSector from "./pages/Sector/CreateSector";
import Resume from "./pages/Resume/Resume";
import Proposal from "./pages/Proposal/Proposal";
import CreateProposal from "./pages/Proposal/CreateProposal";
import Signup from "./pages/Signup/Signup";
import Admin from "./pages/Admin/Admin";

/* TODO: redirect to login if the user is not logged in.
 */

function App() {
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn);
  const imadmin = useSelector((state) => state.loginReducer["admin"]);

  const loggedinRedirects = () => {
    if (isLoggedIn) {
      if (imadmin) {
        // return <Redirect to="/admin" />;
        return <Admin/>;
      } else {
        // return <Redirect to="/resume" />;
        return <Resume/>;
      }
    } else {
      return <Login />;
    }
  };

  return (
    <div>
      <Router>
        <header className="app-header">
          <Logo />
          <span className="resume-generator">Resume Generator</span>
          {isLoggedIn ? <UserDropdown /> : <Redirect to="/login" />}
          {/* {isLoggedIn ? <UserDropdown /> : null} */}
        </header>
        <br />
        {isLoggedIn ? (
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/admin" component={Admin}/>
              <Route path="/resume" component={Resume}/>
              <Route path="/sector" component={CreateSector}/>
              <Route path="/create-proposal" component={CreateProposal}/>
              <Route path="/">{loggedinRedirects}</Route>
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/">{loggedinRedirects}</Route>
            </Switch>
          )}
      </Router>
    </div>
  );
}

export default App;

// #00569c the blue color
