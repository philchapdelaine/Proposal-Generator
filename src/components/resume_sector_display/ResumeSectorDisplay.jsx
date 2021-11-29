import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import "./ResumeSectorDisplay.css";
import axios from "axios";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(() => ({
  resumeOwnerInfo: {
    marginLeft: "15px",
    marginRight: "10px"
  },
}));


export default function ResumeSectorDisplay(props) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  function handleSectorClick(sector, currResume) {
    dispatch({ type: 'SET_CURRENT_SECTOR', currentSector: sector });
    dispatch({ type: "SET_TAB", tab: 0 });
    window.scrollTo(0, 0);
    props.onSectorClick(sector, currResume);
  }

  function generateRows(sector, currResume) {
    return (
      <TableRow hover onClick={() => handleSectorClick(sector, currResume)}>
        <TableCell sx={{ width: "13%" }} align="left">
                {sector.name || "Name not available"}
        </TableCell>
        <TableCell sx={{ width: "13%" }} align="left">
                {sector.linkedEmail || "Email not available"}
        </TableCell>
        <TableCell sx={{ width: "13%" }} align="left">
                {"Proposal # " + (sector.proposalNumber || " not available")}
        </TableCell>
        <TableCell sx={{ width: "13%" }} align="left">
                {sector.division || "Division not available"}
        </TableCell>
        <TableCell sx={{ width: "13%" }} align="left">
                {sector.imageLoc || "Image Location not available"}
        </TableCell>
        <TableCell sx={{ width: "33%" }} align="left">
                {sector.description || "Description not available"}
        </TableCell>
      </TableRow>
    );
  }

  function generateAccordian(resume) {
    return (
      <Accordion
        expanded={expanded === "panel" + resume.resumeID}
        onChange={handleChange("panel" + resume.resumeID)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="rsd-expand-icon" />}
          aria-controls={"panel" + resume.resumeID + " bh-content"}
          id={"panel" + resume.resumeID + "bh-header"}
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <ResumeOwnerDisplay ownerID={resume.resumeID}></ResumeOwnerDisplay>
        </AccordionSummary>
        <AccordionDetails>
          {/* {resume.sectors.map((sector) => generateRows(sector, resume))} */
          
          <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{'height': '300px', 'overflow':'scroll', 'display': 'block'}}>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Proposal Number</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Image Location</TableCell>
            <TableCell>Description </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {resume.sectors.map((sector) => generateRows(sector, resume))}
        </TableBody>
      </Table>
          
          }
        </AccordionDetails>
      </Accordion>
    );
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return props.searchedResumes.map(generateAccordian);
}

export function ResumeOwnerDisplay(props) {
  const [resumeOwnerName, setResumeOwnerName] = useState("");
  const [resumeOwnerEmail, setResumeOwnerEmail] = useState("");
  const classes = useStyles();

  useEffect(() => {
      if (props.ownerID != -1) {
          axios
            .get("/api/user/" + props.ownerID + "/")
            .then((res) => {
              setResumeOwnerName(res.data.firstName + " " + res.data.lastName);
              setResumeOwnerEmail(res.data.emailAddress);
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        setResumeOwnerName("Template Sectors");
      }
  })
  return (
    <>
      <Typography className={classes.resumeOwnerInfo} sx={{ width: "33%", flexShrink: 0 }}>
        {resumeOwnerName || "Name not available"}
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        {resumeOwnerEmail || " "}
      </Typography>
    </>
  )
}