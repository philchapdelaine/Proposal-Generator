import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';
import { Tooltip, tooltipClasses, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

const maxLengthRecentlyViewed = 6;

function CreateProposal() {
  const [isSearch, setSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("");
  const [clickedSector, setClickedSector] = useState("");
  const [recentlyViewedResumes, setRecentlyViewedResumes] = useState([]);
  const [searchedResumes, setResumes] = useState([]);
  const [searchedModfiedSectors, setModfiedSectors] = useState([]);
  const [searchedTemplateSectors, setTemplateSectors] = useState([]);
  const uid = useSelector((state) => state.loginReducer.uid);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '4px solid black',
    },
  }));


  const handleSubmit = (buttonPressEvt = null) => {
    if (!buttonPressEvt) {
      setSearch(true);
    } else if ( buttonPressEvt.key === "Enter") {
      setSearch(true);
    }
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
    if (searchWord === null || searchWord === "") {
      const url = `/api/search/resume/all/userid/${uid}`
      axios.get(url)
      .then((res) => {
        setResumes(res.data.resumes);
        setModfiedSectors(res.data.modifiedSectors)
        setTemplateSectors(res.data.templateSectors);
        setSearch(false);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      const url = `/api/search/resume/${searchWord}/userid/${uid}`
      axios.get(url)
      .then((res) => {
        setResumes(res.data.resumes);
        setModfiedSectors(res.data.modifiedSectors)
        setTemplateSectors(res.data.templateSectors);
        setSearch(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }

  const getFeedback2 = () => {
    const url = `/api/search/resume/all/userid/${uid}`
    axios.get(url)
      .then((res) => {
        setResumes(res.data.resumes);
        setModfiedSectors(res.data.modifiedSectors)
        setTemplateSectors(res.data.templateSectors);
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
            <HtmlTooltip 
              title={
                <div>
                  Search employee resumes below to find and add sectors to your proposal.
                  <Typography><b>Admin Modified Sectors</b></Typography>
                  Easily find and reuse edited sectors that were previously modified by a Project Admin.
                  <Typography><b>Template Sectors</b></Typography>
                  Existing template sectors to customize.
                </div>
                }
              followCursor>
              <HelpIcon fontSize="medium" sx= {{ marginLeft: "10px" }}></HelpIcon>
            </HtmlTooltip>
          </div>
          <div className="cp-search-bar">
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              label="Search resumes"
              helperText="Search by name, email, proposal #, sector type, or division"
              onChange={(event) => setSearchWord(event.target.value)}
              onKeyDown={(e) => handleSubmit(e)}
            />
            <Button
              variant="contained"
              style={{ 
                height: "35px", 
                color: "white", 
                backgroundColor: "#1565c0", 
                marginLeft: "10px",
                marginTop: "10px"
                }}
              onClick={() => handleSubmit()}
            >
              Search
            </Button>
            <HtmlTooltip 
              title={
                <div>
                  To filter sectors by category, use the search format <em>“category:keyword”</em>. <br/> e.g. <em>division:water</em>
                </div>
              }
              followCursor>
              <HelpIcon sx= {{ marginTop: "15px", marginLeft: "10px" }}></HelpIcon>
            </HtmlTooltip>
          </div>
        </div>
        <div className="search-results"> Search results: </div> <br />
        {searchedResumes.length !== 0
          ? <ResumeSectorDisplay
            onSectorClick={updateDisplayedSector}
            searchedResumes={searchedResumes}
            searchedModifiedSectors={searchedModfiedSectors}
            searchedTemplateSectors={searchedTemplateSectors}
          ></ResumeSectorDisplay>
          : <div className="no-search-results"> No search results </div>}
      </div>
      <ReadingPane displayedSector={clickedSector}></ReadingPane>
    </div>
  );
}

export default CreateProposal;
