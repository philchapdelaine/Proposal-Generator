import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  setProposalIndex,
  setProposals as setProposalsRedux,
} from "../../redux/actions/proposal-actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/confirmModal/confirmModal";
import ExpandSections from "../../components/expand_sections/ExpandSections";

const style = {
  width: "75%",
  p: 1,
  margin: "10px",
};

const sampleStyle = {
  width: "100px",
  height: "150px",
  bgcolor: "grey",
  marginLeft: "10px",
  marginRight: "10px",
  marginTop: "10px",
};

function Admin() {
  const [proposals, setProposals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.loginReducer.uid);

  const handleClickEdit = (index) => {
    dispatch(setProposalIndex(index));
    history.push("/create-proposal");
  };

  function sortSectors(sectorArray) {
    var sortedResumes = {};
    for (const sector of sectorArray) {
      const existingResume = sortedResumes[sector.linkedEmail] || [];
      sortedResumes[sector.linkedEmail] = existingResume.concat([sector]);
    }
    return sortedResumes;
  }

  function OBJtoXML(obj) {
    // adapted from: https://stackoverflow.com/questions/48788722/json-to-xml-using-javascript
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (prop == "resumes") {
        const resumes = sortSectors(obj.resumes);

        for (var linkedEmail in resumes) {
          const username = linkedEmail.replace(/@.*$/,"");
          xml += "\n";
          xml += "<resume-" + username + "> ";

          for (var sector of resumes[linkedEmail]) {
            xml += "\n<" + "sector" + ">\n";
            xml += OBJtoXML(new Object(sector));
            xml += "</" + "sector" + ">\n";
          }
          xml += "</resume-" + username + ">\n";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        if (prop == "imageLoc") { // temporary check in lieu of filetype validation
          xml += obj[prop].replace(/[<>&'"]/g, '');
        } else {
          xml += obj[prop];
        }
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">\n";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml;
  }

  function exportProposal(proposal) {
    // src: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    const blob = new Blob(["<proposal>\n" + OBJtoXML(proposal) + "\n</proposal>"], { type: "text/xml" })
    const a = document.createElement("a");
    a.download = proposal.name + ".xml";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/json", a.download, a.href];

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    a.dispatchEvent(evt);
    a.remove()
  }
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = (id) => {
    setIdToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/user/${uid}/proposal/${idToDelete}`);
    await getProposals();
    setModalOpen(false);
  };

  const getProposals = async () => {
    let response = await axios.get(`/api/user/${uid}/proposal`);
    if (response.data) {
      setProposals(response.data);
      dispatch(setProposalsRedux(response.data));
    }
  };

  const createNewProposal = () => {
      dispatch(setProposalIndex(-1));
  }

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="admin-page">
      <NavigatorBar />
      <div className="admin-main">
        <div className="admin-buttons-container">
          <Link to="/create-proposal" style={{ textDecoration: "none" }}>
                      <Button className="admin-button" color="primary" variant="outlined" onClick={() => createNewProposal()}> New Proposal <AddIcon/></Button>
          </Link>{" "}
          <Link to="/sector" style={{ textDecoration: "none" }}>
            <Button className="admin-button" color="primary" variant="outlined"> New Sector <AddIcon/></Button>
          </Link>
        </div>
        <Box>
          <Box display="flex" flexDirection="row">
            <div className = "admin-header">Your Proposals</div>
            <Box width={15} />
            <div className = "admin-hint">Expand to delete, edit, and export proposals</div> 
          </Box>
          { proposals.length !== 0 
            ? (proposals.map((proposal, id) => {
            return (
              <Accordion key={id} style={style}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{proposal.proposalName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ExpandSections resumes={proposal.resumes} />
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ marginTop: 15 }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      style={{ marginRight: 10 }}
                      onClick={() => handleOpenModal(proposal.proposalID)}
                    >
                      Delete
                    </Button>
                    <Tooltip 
                      title="Go to Create Proposal page to edit your proposal in the Reading Pane." 
                      followCursor>
                      <Button
                        variant="outlined"
                        style={{ marginRight: 10 }}
                        onClick={() => handleClickEdit(id)}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Button variant="contained" onClick={() => exportProposal(proposal)}>Export</Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }))
          : <div className="no-proposals-msg"> No proposals to show. </div>}
          {modalOpen ? (
            <ConfirmModal
              confirmTitle="Are you sure you would like to delete this proposal?"
              confirmMsg="This action cannot be reversed."
              handleClose={handleCloseModal}
              open={modalOpen}
              handleProceed={
                <Button
                  color="primary"
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              }
            />
          ) : undefined}
        </Box>
      </div>
    </div>
  );
}

export default Admin;
