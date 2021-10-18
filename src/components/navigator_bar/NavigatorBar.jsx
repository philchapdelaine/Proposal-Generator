import React from "react";
import "./NavigatorBar.css";

function NavigatorBar(){
    return (
        <div className="nav-bar" >
            <button className="nav-button"> Resume </button>
            <button className="nav-button"> Admin </button>
            <button className="nav-button"> Create Resume Proposal </button>
            <button className="nav-button"> Create New Sector </button>
            <div className="recently-viewed"> Recently viewed component (placeholder) </div>
        </div>
        
    )
}

export default NavigatorBar;
