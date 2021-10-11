import React from "react";
import "./ReadingPane.css";

function ReadingPane(){
    return (
        <div className="reading-pane" >
            <div className="reading-pane-header"> 
                Reading Pane 
            </div>
            <div className="edit-bar">
                <button className="edit-bar-button"> Edit Sector </button>
                <button className="edit-bar-button"> Properties </button>
                <button className="edit-bar-button"> Help </button>

            </div>
            <div className="preview">
                content preview goes here
            </div>
        </div>
        
    )
}

export default ReadingPane;