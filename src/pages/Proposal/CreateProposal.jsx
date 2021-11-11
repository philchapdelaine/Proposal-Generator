import React, { useState, useEffect } from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";


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
            "sectorID": 3,
            "name": "Experience",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Water",
            "imageLoc": "blah/blah",
            "description": "I'm the best so I don't need to have any experience"
        },
        {
            "sectorID": 4,
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
  const [resumes, setResumes] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [clickedSector, setClickedSector] = useState("");
  const [recentlyViewedResumes, setRecentlyViewedResumes] = useState([]);

  const getResults = async () => {
    await axios
      .get(`/api/user/1/`)
      .then((res) => {})
      .catch((err) => {});
  };

  function resumePush() {
    for (const resume of dummyResumes) {
      resumes.push(
        <ResumeThumbnail name={resume["name"]} addable={true}></ResumeThumbnail>
      );
    }
  }

  const handleSubmit = () => {
    if (searchWord !== "") {
      axios
        .get(`/api/user/1/resume`)
        .then((res) => {})
        .catch((err) => {});
    }
  };
  // updates clicked sector from search results AND from RecentlyViewed
  function updateClickedSector(sector, addToRecentlyViewed = false) {
    setClickedSector(sector);
    // todo: check for duplicates, add to recentlyViewedResumes
  }

  return (
    <div className="create-proposal">
      <NavigatorBar 
        isCreateProposal={true}
        recentlyViewed={recentlyViewedSample}
        onSectorClick={updateClickedSector}
      >
      </NavigatorBar>
      <div className="cp-center-pane">
        <div className="cp-center-header">
          <div className="title"> Create Proposal </div>
          <TextField
            variant="outlined"
            size="small"
            margin="normal"
            label="Search resumes"
            onChange={(event) => setSearchWord(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="LoginBtn"
            onClick={() => handleSubmit()}
          >
            Search
          </Button>
        </div>
        <div className="search-results"> Search results: </div>
        <ResumeSectorDisplay
          displayedResumes={recentlyViewedSample}
          onSectorClick={updateClickedSector}
        ></ResumeSectorDisplay>
      </div>
      <ReadingPane displayedSector={clickedSector}></ReadingPane>
    </div>
  );
}

export default CreateProposal;
