import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import Paper from "@material-ui/core/Paper";
import { Tooltip, tooltipClasses, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CustomListItem from "../custom_list_item/CustomListItem";
import EditSectorModal from "../editSectorModal/EditSectorModal";
import "./ReadingPane.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function ReadingPane(props) {
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [displayedSector, setDisplayedSector] = useState("");
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handleChange = (event, newValue) => dispatch({ type: "SET_TAB", tab: newValue });
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.loginReducer.uid);
  const currentSector = useSelector((state) => state.proposalReducer.currentSector);
  let currentTab = useSelector((state) => state.tabReducer);
  let currentProposalIndex = useSelector((state) => state.proposalReducer.currentProposalIndex);
  let reduxProposals = useSelector((state) => state.proposalReducer.proposals);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '4px solid black',
    },
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  function handleAddSector() {
    let isEmpty = Object.keys(currentSector).length === 0;
    let proposalNotCreated = currentProposalIndex === -1;
    if (!isEmpty) {
      // case where sector is added to a non-existent proposal
      if (proposalNotCreated) {
        // build a fresh proposal
        const date = new Date();
        let newProposal = {
          proposalName: "Untitled New Proposal",
          resumes: [],
          proposalModifiedDate: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
          };
        // build a new sector with no sectorID
        let newSector = (({ description, division, empty, edited, imageLoc, linkedEmail, name, proposalNumber }) => (
            { description, division, empty: false, imageLoc, edited, linkedEmail, name, proposalNumber}))(currentSector);
        // add to new proposal
        newProposal.resumes.push(newSector);
        const config = { headers: { "Content-Type": "application/json" } };
        let url = `/api/user/${uid}/proposal/`;
        axios
          .post(url, newProposal, config)
          .then((response) => {
            console.log(response);
            dispatch({
              type: "ADD_SECTOR_NEW_PROPOSAL",
              newProposal: response.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
          // case where sector is added to existing proposal
          let duplicateSector = reduxProposals[currentProposalIndex].resumes.some(sector => sector.name === currentSector.name) &&
              reduxProposals[currentProposalIndex].resumes.some(sector => sector.linkedEmail === currentSector.linkedEmail) &&
              reduxProposals[currentProposalIndex].resumes.some(sector => sector.division === currentSector.division) &&
              reduxProposals[currentProposalIndex].resumes.some(sector => sector.description === currentSector.description);
          if (duplicateSector) {
              setWarning(true);
          } else {
              const config = { headers: { "Content-Type": "application/json" } };
              let currentProposalID = reduxProposals[currentProposalIndex].proposalID;
              let url = `/api/user/${uid}/proposal/${currentProposalID}`;
              let newSector = (({ description, division, empty, edited, imageLoc, linkedEmail, name, proposalNumber }) => (
                { description, division, empty: false, imageLoc, edited, linkedEmail, name, proposalNumber}))(currentSector);
              reduxProposals[currentProposalIndex].resumes.push(newSector);
              console.log(reduxProposals[currentProposalIndex]);
              axios
                  .put(url, reduxProposals[currentProposalIndex], config)
                  .then((response) => {
                      console.log(response.data);
                      dispatch({
                          type: "ADD_SECTOR",
                          newProposal: response.data,
                          proposalID: reduxProposals[currentProposalIndex].proposalID
                      });
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          }
      }
        dispatch({ type: "SET_TAB", tab: 1 });
    }
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
        return;
    }
    setWarning(false);
  };

  const action = (
      <React.Fragment>
          <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
          >
              <CloseIcon fontSize="small" />
          </IconButton>
      </React.Fragment>
    );

  function sectorFieldDisplay(title, content) {
    if (!content) return null;
    return (
      <div className="reading-pane-title">
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
    );
  }

  return (
    <div className="reading-pane">
    <Paper elevation={6} >
        <Box p={1}
        sx={{
            padding: "0px"
          }}
          >
      <div className="reading-pane-header">
        Reading Pane 
        <HtmlTooltip 
          title={
            <div>
              <Typography><b>Sector Preview:</b></Typography>
              Preview and edit sectors, then add to the current proposal. <br/>
              <Typography><b>Current Proposal: </b> </Typography>
              View and rename the current proposal draft. Click “SAVE PROPOSAL” to save your changes, then click “EXIT” to return to Your Proposals.
            </div>
          }
          followCursor>
          <HelpIcon sx= {{ marginLeft: "10px" }}></HelpIcon>
        </HtmlTooltip>
      </div>
      <div className="preview">
        <Tabs
          TabIndicatorProps={{ style: { background: "#00569c" } }}
          value={currentTab}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Sector Preview" index={0} />
          <Tab label="Current Proposal" index={1} />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <div>
            <h1 className="reading-pane-tip">
              {currentSector.name || "Click a sector to preview"}
            </h1>
            {sectorFieldDisplay("Email", currentSector.linkedEmail)}
            {sectorFieldDisplay("Image Location", currentSector.imageLoc)}
            {sectorFieldDisplay("Division", currentSector.division)}
            {sectorFieldDisplay("Description", currentSector.description)}
          </div>

          {currentSector.name ? 
          <div className="button-group-container">
            <ButtonGroup className="button-group" variant="contained" size="large">
              <Button onClick={openModal}>Edit Sector</Button>
              <Button onClick={() => handleAddSector()}>Add Sector</Button>
            </ButtonGroup>
          </div> : undefined}
        </TabPanel>
        <EditSectorModal
          open={open}
          onClose={closeModal}
          sector={currentSector}
        ></EditSectorModal>

        <Snackbar
            open={warning}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Sector already exists in this proposal"
            action={action}
        >
        </Snackbar>

        <TabPanel value={currentTab} index={1}>
          <div className="reading-pane-title">
           Your Proposal
          </div>
          <div>
            <CustomListItem />
          </div>
        </TabPanel>
      </div>
      </Box>
      </Paper>
    </div>
  );
}

export default ReadingPane;
