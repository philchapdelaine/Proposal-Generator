import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Button from "@material-ui/core/Button";

import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import CreateSector from "../../pages/Sector/CreateSector";
import Resume from "../../pages/Resume/Resume";
import Proposal from "../../pages/Proposal/Proposal";
import CreateProposal from "../../pages/Proposal/CreateProposal";
import Signup from "../../pages/Signup/Signup";
import Admin from "../../pages/Admin/Admin";

import "./Navigator.css";

import { useSelector, useDispatch } from "react-redux";

/* TODO: redirect to login if the user is not logged in.
 */

function Navigator() {
  const loggedin = useSelector((state) => state.loginReducer["loggedIn"]);
  const imadmin = useSelector((state) => state.loginReducer["admin"]);

  const loginRedirects = () => {
    if (loggedin) {
      if (imadmin) {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/resume" />;
      }
    } else {
      return <Login />;
    }
  };
  return (
    <div>
      <Router>
        <div>
          <nav>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Btn btnName="Login" />
            </Link>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <Btn btnName="Admin" />
            </Link>
            <Link to="/resume" style={{ textDecoration: "none" }}>
              <Btn btnName="Resume" />
            </Link>
            <Link to="/sector" style={{ textDecoration: "none" }}>
              <Btn btnName="Sector" />
            </Link>
            <Link to="/create-proposal" style={{ textDecoration: "none" }}>
              <Btn btnName="Create Proposal" />
            </Link>
          </nav>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/resume">
              <Resume />
            </Route>
            <Route path="/sector">
              <CreateSector />
            </Route>
            <Route path="/create-proposal">
              <CreateProposal />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">{loginRedirects}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

// https://v5.reactrouter.com/web/example/auth-workflow

const Btn = (props) => {
  return (
    <Button variant="contained" className="navBtn">
      {props.btnName}
    </Button>
  );
};

export default Navigator;
