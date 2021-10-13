import React from "react";
import "./NavigatorBar.css";

function NavigatorBar(){
    return (
        <div className="nav-bar" >
            <button className="nav-button"> Resume </button>
            <button className="nav-button"> Create Resume Proposal </button>
            <div className="recently-viewed"> Recently viewed component (placeholder) </div>
            <div className="search-sector"> Search sector componenet (placeholder) </div>
        </div>
        
    )
}

export default NavigatorBar;