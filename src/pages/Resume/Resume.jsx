import React from "react";
import ReadingPane from "../../components/reading_pane/ReadingPane";
import "./Resume.css";

function Resume() {
  return (
    <div className="resume">
      <div className="resume-content"> Resume content</div>
      <ReadingPane></ReadingPane>
    </div>
  );
}

export default Resume;
