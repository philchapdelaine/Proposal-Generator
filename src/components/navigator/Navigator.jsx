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
import Sector from "../../pages/Sector/Sector";
import Resume from "../../pages/Resume/Resume";
import Proposal from "../../pages/Proposal/Proposal";
import CreateProposal from "../../pages/Proposal/CreateProposal";
import Signup from "../../pages/Signup/Signup";
import Admin from "../../pages/Admin/Admin";

import "./Navigator.css";

/* TODO: redirect to login if the user is not logged in.
 */

function Navigator() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Btn btnName="Home" />
            </Link>
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
            <Link to="/proposal" style={{ textDecoration: "none" }}>
              <Btn btnName="Proposal" />
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
              <Sector />
            </Route>
            <Route path="/proposal">
              <Proposal />
            </Route>
            <Route path="/create-proposal">
              <CreateProposal />
            </Route>
            <Route path="/signup">
              <Signup />
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

const Btn = (props) => {
  return (
    <Button variant="contained" className="navBtn">
      {props.btnName}
    </Button>
  );
};

export default Navigator;
