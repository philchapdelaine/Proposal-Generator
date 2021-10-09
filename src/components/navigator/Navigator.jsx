import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import Sector from "../../pages/Sector/Sector";
import Resume from "../../pages/Resume/Resume";
import Proposal from "../../pages/Proposal/Proposal";

import "./Navigator.css";

function Navigator() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <Link to="/">
              <Btn btnName="Home" />
            </Link>
            <Link to="/login">
              <Btn btnName="Login" />
            </Link>
            <Link to="/resume">
              <Btn btnName="Resume" />
            </Link>
            <Link to="/sector">
              <Btn btnName="Sector" />
            </Link>
            <Link to="/proposal">
              <Btn btnName="Proposal" />
            </Link>
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

const Btn = (props) => {
  return (
    <Button variant="contained" className="navBtn">
      {props.btnName}
    </Button>
  );
};

export default Navigator;
