import React from "react";
import "./NavigatorBar.css";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";

function NavigatorBar() {
  return (
    <div className="nav-bar">
      <button className="nav-button"> Resume </button>
      <button className="nav-button"> Create Resume Proposal </button>
      <div className="recently-viewed">
        <RecentlyViewed />
      </div>
      {/* <div className="search-sector"> Search sector componenet (placeholder) </div> */}
    </div>
  );
}

export default NavigatorBar;
