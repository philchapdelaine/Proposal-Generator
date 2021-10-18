import React from "react";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";
import "./NavigatorBar.css";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";

function NavigatorBar(){
    return (
        <div className="nav-bar" >
            <button className="nav-button"> Resume </button>
            <button className="nav-button"> Admin </button>
            <button className="nav-button"> Create Resume Proposal </button>
            <button className="nav-button"> Create New Sector </button>
            <div className="recently-viewed"> <RecentlyViewed /> </div>
        </div>
        
    )
}

export default NavigatorBar;
