import React from "react";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";
import "./NavigatorBar.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function NavigatorBar() {
  return (
    <div className="nav-bar">
      <nav>
        <Link to="/resume" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Resume </button>
        </Link>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Admin </button>
        </Link>
        <Link to="/create-proposal" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Create Resume Proposal </button>
        </Link>
        <Link to="/sector" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Create New Sector </button>
        </Link>
      </nav>
      <div className="recently-viewed">
        {" "}
        <RecentlyViewed />{" "}
      </div>
    </div>
  );
}

export default NavigatorBar;
