import React from "react";
import "./ResumeThumbnail.css";



function ResumeThumbnail(props){
    const isAddable = props.addable;
    const isNotClickable = props.notClickable;
    const name = props.name;
    return (
        <div>
        {!isNotClickable ? 
            <div 
                className="resume-thumbnail" 
                onClick={() => displayInReadingPane()}
            >
                <div className="rt-img"> </div>
                <div className="rt-text-section">
                    <div className="name"> {name} </div>
                    <div className="rt-plus" onClick={() => hideThumbnail()}> {isAddable ? '+' : ""} </div>
                </div>
            </div>
        : <div 
        className="resume-thumbnail" 
    >
        <div className="rt-img"> </div>
        <div className="rt-text-section">
            <div className="name"> {name} </div>
            <div className="rt-plus" > {isAddable ? '+' : ""} </div>
        </div>
    </div>
        
        } 
        </div>
        
    )
    
}

function displayInReadingPane() {
    const readingPane = document.getElementsByClassName('reading-pane');
    const readingPanePreview = readingPane[0].lastChild;
    readingPanePreview.innerText = "display resume specific content here!";
}

function hideThumbnail() {
    // TODO
}
export default ResumeThumbnail;