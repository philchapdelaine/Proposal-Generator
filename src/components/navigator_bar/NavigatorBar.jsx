import React from "react";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";
import "./NavigatorBar.css";
import { useSelector } from "react-redux";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function NavigatorBar(props) {
  const isAdmin = useSelector((state) => state.loginReducer.admin);

  return (
    <div className="nav-bar">
      <nav>
        <Link to="/resume" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Resume </button>
        </Link>
        {isAdmin ? (
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Admin </button>
        </Link>
        ) : null}
        {isAdmin ? (
        <Link to="/create-proposal" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Create Resume Proposal </button>
        </Link>
        ) : null}
        {isAdmin ? (
        <Link to="/sector" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Create New Sector </button>
        </Link>
        ) : null}
      </nav>
      <div className="recently-viewed">
        {" "}
        {props.isCreateProposal ? <RecentlyViewed onSectorClick={props.onSectorClick} resumes={props.recentlyViewed}>{props.recentlyViewed}</RecentlyViewed> : null }
      </div>
    </div>
  );
}

export default NavigatorBar;
