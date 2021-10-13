import React from "react";
import "./ResumeThumbnail.css";



function ResumeThumbnail(props){
    const isAddable = props.addable;
    const name = props.name;
    return (     
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