import React from 'react';
import ReadingPane from "../../components/reading_pane/ReadingPane";
import ResumeThumbnail from '../../components/resume_thumbnail/ResumeThumbnail';
import NavigatorBar from '../../components/navigator_bar/NavigatorBar';
import "./Proposal.css";
import TextField from "@material-ui/core/TextField";

const dummyResumes = [{
    "name": "first last"
},
{
    "name": "first last"
},
{
    "name": "first last"
}
];

const resumes = [];

function Proposal(){
    for (const resume of dummyResumes) {
        resumes.push(
            <ResumeThumbnail name={resume["name"]} addable={true}></ResumeThumbnail>
        )
    }
    return (
        <div className="proposal-page">
            <NavigatorBar></NavigatorBar>
            <div className="proposal-center-pane"> 

            <div className="proposal-center-header"> 
                <div className="title"> Proposal Name </div>
                <TextField 
                    variant="outlined"
                    size="small"
                    margin="normal"
                    label="Search resumes"
                ></TextField>
            </div>
            <div className="resume-thumbnails"> {resumes} </div>

            </div> 
            <ReadingPane></ReadingPane>
        </div>
    )
}

export default Proposal;