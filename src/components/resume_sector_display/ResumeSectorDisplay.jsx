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
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ResumeSectorDisplay(props) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const [displayColour, setDisplayColour] = useState("blue");
  const useStyles = makeStyles(() => ({
    accordionColour: {
      backgroundColor: displayColour
    }
  }));
  const classes = useStyles();

  function handleSectorClick(sector, currResume) {
    sector.edited = false;
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
                {"Proposal # " + (sector.proposalNumber || " not available")}
        </TableCell>
        <TableCell sx={{ width: "13%" }} align="left">
                {sector.division || "Division not available"}
        </TableCell>
        {<TableCell sx={{ width: "13%" }} align="left">
                {sector.imageLoc? <CheckIcon></CheckIcon>: <CancelIcon></CancelIcon>}
        </TableCell>}
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
          className={classes.accordionColour}
          expandIcon={<ExpandMoreIcon className="rsd-expand-icon" />}
          aria-controls={"panel" + resume.resumeID + " bh-content"}
          id={"panel" + resume.resumeID + "bh-header"}
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}
        >
          <ResumeOwnerDisplay setColour={setDisplayColour} ownerID={resume.resumeID}></ResumeOwnerDisplay>
        </AccordionSummary>
        <AccordionDetails>
          {/* {resume.sectors.map((sector) => generateRows(sector, resume))} */
          
          <Table aria-label="simple table" style={{'height': '300px', 'overflow':'scroll', 'display': 'block'}}>
        <TableHead>
          <TableRow fontWeight="fontWeightBold">
            <TableCell fontWeight="fontWeightBold">Type</TableCell>
            <TableCell>Proposal Number</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Image Location</TableCell>
            <TableCell>Description </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {resume.sectors.map((sector) => generateRows(sector, resume.resumeID < 0 ? null: resume))}
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

  return props.searchedResumes.filter(resume => resume.sectors.length > 0).map(generateAccordian);
}

export function ResumeOwnerDisplay(props) {
  const [resumeOwnerName, setResumeOwnerName] = useState("");
  const [resumeOwnerEmail, setResumeOwnerEmail] = useState("");
  const useStyles = makeStyles(() => ({
    resumeOwnerInfo: {
      marginLeft: "15px",
      marginRight: "10px"
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    switch(props.ownerID) 
    {
      case -1:
        setResumeOwnerName("Template Sectors");
        props.setColour("#bad3e8");
        break;
      case -2:
        setResumeOwnerName("Admin Modified Sectors");
        props.setColour("#94b6d1");
        break;
      default:
        axios
            .get("/api/user/" + props.ownerID + "/")
            .then((res) => {
              setResumeOwnerName(res.data.firstName + " " + res.data.lastName);
              setResumeOwnerEmail(res.data.emailAddress);
              props.setColour("white");
            })
            .catch((err) => {
              console.log(err);
            });
        break;
    }

      // if (props.ownerID != -1) {
      //     axios
      //       .get("/api/user/" + props.ownerID + "/")
      //       .then((res) => {
      //         setResumeOwnerName(res.data.firstName + " " + res.data.lastName);
      //         setResumeOwnerEmail(res.data.emailAddress);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      // } else {
      //   setResumeOwnerName("Template Sectors");
      // }
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