import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

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
  const [isSearch, setSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("");
  const [clickedSector, setClickedSector] = useState("");
  const [recentlyViewedResumes, setRecentlyViewedResumes] = useState([]);
  const [searchedResumes, setSearchedResumes] = useState([]);
  const [searchedProposals, setsearchedProposals] = useState([]);
  const uid = useSelector((state) => state.loginReducer.uid);

  const handleSubmit = () => {
    setSearch(true)
  };


  useEffect(() => {
    getFeedback2();
  }, []);

  useEffect(() => {
    if (isSearch) {
      getFeedback();
    }
  }, [isSearch]);


  const getFeedback = () => {
    const url = `/api/search/resume/${searchWord}/userid/0`
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setSearchedResumes(res.data);
        setSearch(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getFeedback2 = () => {
    const url = `/api/search/resume/all/userid/${uid}`
    axios.get(url)
      .then((res) => {
        setSearchedResumes(res.data);
      })
      .catch((err) => {
        console.log(err);
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
          <ArrowBackIcon 
            fontSize="large"
            htmlColor="#00569c"
            sx={{ 
              display: "inline-flex", 
              float: "left", 
              justifyContent: "flex-start", 
              marginLeft: "15px",
              marginTop: "15px"
              }}> 
          </ArrowBackIcon>
        </Link>
        <div className="cp-center-header">
          <div className="title">
            Proposal Editor
          </div>
          <div className="cp-search-bar">
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              label="Search resumes"
              onChange={(event) => setSearchWord(event.target.value)}
            />
            <Button
              variant="contained"
              style={{ height: "35px", color: "white", backgroundColor: "#1565c0", marginLeft: "10px"}}
              onClick={() => handleSubmit()}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="search-results"> Search results: </div> <br />
        {searchedResumes.length !== 0
          ? <ResumeSectorDisplay
            onSectorClick={updateDisplayedSector}
            searchedResumes={searchedResumes}
            searchedProposals={searchedProposals}
          ></ResumeSectorDisplay>
          : <div className="no-search-results"> No search results </div>}
      </div>
      <ReadingPane displayedSector={clickedSector}></ReadingPane>
    </div>
  );
}

export default CreateProposal;