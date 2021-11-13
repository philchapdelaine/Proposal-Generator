import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function ResumeSectorDisplay(props) {
  const [expanded, setExpanded] = useState(false);

  function handleSectorClick(sector, currResume) {
    props.onSectorClick(sector, currResume);
  }

  function generateRows(sector, currResume) {
    
    return (
      <TableRow onClick={() => handleSectorClick(sector, currResume)} >
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
    // todo: get user info (name, email) based on resume id
    return (
      <Accordion
        expanded={expanded === "panel" + resume.resumeID}
        onChange={handleChange("panel" + resume.resumeID)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel" + resume.resumeID + " bh-content"}
          id={"panel" + resume.resumeID + "bh-header"}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>John Doe</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            johndoe@example.com
          </Typography>
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
