import React from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import ResumeThumbnail from "../../components/resume_thumbnail/ResumeThumbnail";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import ResumeSectorDisplay from "../../components/resume_sector_display/ResumeSectorDisplay";
import "./CreateProposal.css";
import TextField from "@material-ui/core/TextField";

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
  for (const resume of dummyResumes) {
    resumes.push(
      <ResumeThumbnail name={resume["name"]} addable={true}></ResumeThumbnail>
    );
  }
  return (
    <div className="create-proposal">
      {/* <NavigatorBar></NavigatorBar> */}
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
        <div> Search results: </div>
        <div className="resume-thumbnails"> {resumes} </div>
        <ResumeSectorDisplay></ResumeSectorDisplay>
      </div>
      <ReadingPane></ReadingPane>
    </div>
  );
}

export default CreateProposal;
