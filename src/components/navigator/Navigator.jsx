import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import Sector from "../../pages/Sector/Sector";
import Resume from "../../pages/Resume/Resume";
import Proposal from "../../pages/Proposal/Proposal";

function Navigator() {
  return (
    <div>
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

export default Navigator;
