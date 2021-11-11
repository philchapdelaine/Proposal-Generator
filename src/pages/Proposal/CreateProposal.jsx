import React, { useState, useEffect } from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import ResumeThumbnail from "../../components/resume_thumbnail/ResumeThumbnail";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const dummyResumes = [
  {
    name: "first last",
  },
  {
    name: "first last",
  },
  {
    name: "first last",
  },
];

const resumes = [];

function CreateProposal() {
  const [resumes, setResumes] = useState([]);
  const [searchWord, setSearchWord] = useState("");

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

  return (
    <div className="create-proposal">
      <NavigatorBar />
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
        <ResumeSectorDisplay />
      </div>
      <ReadingPane />
    </div>
  );
}

export default CreateProposal;
