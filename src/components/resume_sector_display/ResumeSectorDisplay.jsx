import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function ResumeSectorDisplay() {
  const [expanded, setExpanded] = useState(false);

  const sector = [
    ["Utlity Consultant", "test", "test", "test", "test"],
    ["Education", "test", "test", "test", "test"],
    ["Projects", "test", "test", "test", "test"],
  ];

  const user = [1, 2, 3];

  function generateRows(row) {
    return (
      <TableRow>
        <TableCell sx={{ width: "23%" }} align="left">
          {row[0]}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {row[1]}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {row[2]}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {row[3]}
        </TableCell>
        <TableCell sx={{ width: "23%" }} align="left">
          {row[4]}
        </TableCell>
      </TableRow>
    );
  }

  function generateAccordian(user) {
    return (
      <Accordion
        expanded={expanded === "panel" + user}
        onChange={handleChange("panel" + user)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel" + user + " bh-content"}
          id={"panel" + user + "bh-header"}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>John Doe</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            johndoe@example.com
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{sector.map(generateRows)}</AccordionDetails>
      </Accordion>
    );
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return user.map(generateAccordian);
}
