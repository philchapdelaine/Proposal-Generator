import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const useStyles = makeStyles(() => ({
  resumeOwnerInfo: {
    marginLeft: "15px",
    marginRight: "10px"
  },
}));


export default function ResumeSectorDisplay(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [resumeOwnerName, setResumeOwnerName] = useState("");
  const [resumeOwnerEmail, setResumeOwnerEmail] = useState("");

  function handleSectorClick(sector, currResume) {
    props.onSectorClick(sector, currResume);
  }

  function generateRows(sector, currResume) {
    
    return (
      <TableRow hover onClick={() => handleSectorClick(sector, currResume)} >
        <TableCell sx={{ width: "23%" }} align="left">
          {sector.name}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {sector.division}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {sector.description}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {/* TODO: decide which sector properties to display here*/}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {sector[4]}
        </TableCell>
      </TableRow>
    );
  }

  function generateAccordian(resume) {

    useEffect(() => {
      const fetchName = async () => {
        const user = await Axios.get('/api/user/' + resume.resumeID + "/")
        setResumeOwnerName(user.data.firstName + " " + user.data.lastName);
        setResumeOwnerEmail(user.data.emailAddress);
      }
      fetchName();
    }, [])

    return (
      <Accordion
        expanded={expanded === "panel" + resume.resumeID}
        onChange={handleChange("panel" + resume.resumeID)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="rsd-expand-icon"/>}
          aria-controls={"panel" + resume.resumeID + " bh-content"}
          id={"panel" + resume.resumeID + "bh-header"}
          sx={{ width: '100%', display: 'flex',  justifyContent:'space-between'}}
        >
          <Typography className={classes.resumeOwnerInfo} sx={{ flexShrink: 0 }}>{resumeOwnerName || "Name not available"}</Typography>
          <Typography sx={{ color: "text.secondary" }}>{resumeOwnerEmail || " "}</Typography>
        </AccordionSummary>
        <AccordionDetails>{resume.sectors.map((sector) => generateRows(sector, resume))}</AccordionDetails>
      </Accordion>
    );
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return props.displayedResumes.map(generateAccordian);
}
