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
import "./ResumeSectorDisplay.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


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
    const dispatch = useDispatch();

    function handleSectorClick(sector, currResume) {
        dispatch({ type: 'SET_CURRENT_SECTOR', currentSector: sector })
        props.onSectorClick(sector, currResume);
    }

    function generateRows(sector, currResume) {
        return (
            <TableRow hover onClick={() => handleSectorClick(sector, currResume)}>
              <TableCell sx={{ width: "13%" }} align="left">
                {sector.name}
              </TableCell>
              <TableCell sx={{ width: "13%" }} align="left">
                {sector.linkedEmail}
              </TableCell>
              <TableCell sx={{ width: "13%" }} align="left">
                {"Proposal # " + sector.proposalNumber}
              </TableCell>
              <TableCell sx={{ width: "13%" }} align="left">
                {sector.division}
              </TableCell>
              <TableCell sx={{ width: "13%" }} align="left">
                {sector.imageLoc}
              </TableCell>
              <TableCell sx={{ width: "33%" }} align="left">
                {sector.description}
              </TableCell>
            </TableRow>
        );
    }


   /* useEffect(() => {
        getFeedback();
    }, []);


    function getFeedback() {
        var uid = useSelector((state) => state.loginReducer.uid);
        var url = `/api/user/${uid}/`
        axios.get(url)
            .then((res) => {
                setResumeOwnerName(res.data.firstName + " " + res.data.lastName);
                setResumeOwnerEmail(res.data.emailAddress);
            })
    }*/

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
                    <Typography className={classes.resumeOwnerInfo} sx={{ width: "33%", flexShrink: 0 }}>
                        {resumeOwnerName || "Name not available"}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        {resumeOwnerEmail || " "}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {resume.sectors.map((sector) => generateRows(sector, resume))}
                </AccordionDetails>
            </Accordion>
        );
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return props.searchedResumes.map(generateAccordian);
}