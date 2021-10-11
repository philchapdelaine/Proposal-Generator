import React from 'react';
import ReadingPane from "../../components/reading_pane/ReadingPane";
import "./Proposal.css";
import TextField from "@material-ui/core/TextField";

function Proposal(){
    return (
        <div className="proposal-page">
            <div className="center-pane"> 

            <div className="center-header"> 
                <div className="title">Your Proposal</div>
                <TextField 
                    variant="outlined"
                    size="small"
                    margin="normal"
                    label="Search resumes"
                ></TextField>
            </div>
            <div className="resume-thumbnails">
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>
                <div className="sample-thumbnail"> thumbnails go here </div>

                {/* TODO: A for loop will go here to display all the resumes in the proposal */}
                {/* TODO: make a new component for resume thumbnails */}

            </div>

            </div> 
            <ReadingPane></ReadingPane>
        </div>
    )
}

export default Proposal;