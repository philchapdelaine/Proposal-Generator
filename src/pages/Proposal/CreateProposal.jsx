import React, { useState } from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";


// dummy data; this will actually come from the search api
const recentlyViewedSample = [
  {
    "resumeID": 1,
    "sectors": [
        {
            "sectorID": 1,
            "name": "Experience",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Water",
            "imageLoc": "blah/blah",
            "description": "I'm the best so I don't need to have any experience"
        },
        {
            "sectorID": 2,
            "name": "Projects",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Air",
            "imageLoc": null,
            "description": "I'm the best so I don't need to have any projects"
        }
    ]
  },
  {
    "resumeID": 2,
    "sectors": [
        {
            "sectorID": 1,
            "name": "Experience",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Water",
            "imageLoc": "blah/blah",
            "description": "I'm the best so I don't need to have any experience"
        },
        {
            "sectorID": 2,
            "name": "Projects",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Air",
            "imageLoc": null,
            "description": "I'm the best so I don't need to have any projects"
        }
    ]
  },
]

function CreateProposal() {
  return (
    <div className="create-proposal">
      <NavigatorBar isCreateProposal={true} recentlyViewed={recentlyViewedSample}></NavigatorBar>
      <div className="cp-center-pane">
        <div className="cp-center-header">
          <div className="title"> Create Proposal </div>
          <TextField
            variant="outlined"
            size="small"
            margin="normal"
            label="Search resumes"
          ></TextField>
        </div>
        <div className="search-results"> Search results: </div>
        <ResumeSectorDisplay></ResumeSectorDisplay>
      </div>
      <ReadingPane></ReadingPane>
    </div>
  );
}

export default CreateProposal;
