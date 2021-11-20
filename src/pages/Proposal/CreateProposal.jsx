import React, { useState, useEffect } from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Resume from "../Resume/Resume";


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
            "name": "Education",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Water",
            "imageLoc": "blah/blah",
            "description": "I'm the best so I don't need to have any experience"
        },
        {
            "sectorID": 4,
            "name": "Skills",
            "linkedEmail": "mc@ae.com",
            "fileType": "txt",
            "division": "Air",
            "imageLoc": null,
            "description": "I'm the best so I don't need to have any projects"
        }
    ]
  },
]

const maxLengthRecentlyViewed = 6;

function CreateProposal() {
  const [isSearch, setSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [clickedSector, setClickedSector] = useState("");
  const [recentlyViewedResumes, setRecentlyViewedResumes] = useState([]);
  const [searchedResumes, setSearchedResumes] = useState([]);

  var tests = [];

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
        setSearch(true)
    };


    useEffect(() => {
        if (isSearch) {
            getFeedback();
        }
    }, [isSearch]);


    const getFeedback = () => {
        const url = `/api/search/${searchWord}/smartsearch`
            axios.get(url)
                .then((res) => {
                    setSearchedResumes(res.data);
                    setSearch(false);
                })
    }


  function addToRecentlyViewed(resume) {
    const isMaxLengthReached = recentlyViewedResumes.length > maxLengthRecentlyViewed;

    for (let i = 0; i < recentlyViewedResumes.length; i++) {
      if (resume.resumeID == recentlyViewedResumes[i].resumeID) {
        recentlyViewedResumes.splice(i, 1);
      }
    }
    setRecentlyViewedResumes([resume].concat(recentlyViewedResumes));
    if (isMaxLengthReached) recentlyViewedResumes.pop();
  }

  function updateDisplayedSector(sector, searchedResume = null) {
    setClickedSector(sector);
    if (searchedResume) addToRecentlyViewed(searchedResume);
  }

  return (
    <div className="create-proposal">
      <NavigatorBar 
        isCreateProposal={true}
        recentlyViewed={recentlyViewedResumes}
        onSectorClick={updateDisplayedSector}
      >
      </NavigatorBar>
      <div className="cp-center-pane">
      <Link to="/admin">
        <Button variant="contained" color="primary" style={{ marginLeft: "10px" }}> Back </Button>
      </Link>
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
        <div className="search-results"> Search results: </div> <br/>
              <ResumeSectorDisplay
                  searchWord={searchWord}
                  onSectorClick={updateDisplayedSector}
                  isSearch={isSearch}
                  switchSearch={handleSubmit}
                  searchedResumes={searchedResumes}
        ></ResumeSectorDisplay>
      </div>
      <ReadingPane displayedSector={clickedSector}></ReadingPane>
    </div>
  );
}

export default CreateProposal;