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

  const user = [1, 2, 3];

  function handleSectorClick(sector) {
    props.onSectorClick(sector, true);

  }

  function generateRows(sector) {
    
    return (
      <TableRow onClick={() => handleSectorClick(sector)} >
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
        expanded={expanded === "panel" + resume}
        onChange={handleChange("panel" + resume)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel" + resume + " bh-content"}
          id={"panel" + resume + "bh-header"}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>John Doe</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            johndoe@example.com
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{resume.sectors.map(generateRows)}</AccordionDetails>
      </Accordion>
    );
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return props.displayedResumes.map(generateAccordian);
}
