import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Tooltip,
  tooltipClasses
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
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

function Admin() {
  const [proposals, setProposals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.loginReducer.uid);


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

  function escapeXml(unsafe) {
    // src: https://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function formatSectorInfo(sector) {
  var sectorInfo = '';
  sectorInfo += "Type: " + sector.name;
  sectorInfo += "\nProposal Number: " + sector.proposalNumber;
  sectorInfo += "\nDivision: " + sector.division;
  sectorInfo += "\nLast Modified: " + sector.modifiedDate;
  sectorInfo += "\nLinked Email: " + sector.linkedEmail;
  sectorInfo += "\nImage Location: " + sector.imageLoc;
  sectorInfo += "\nDescription: " + sector.description + "\n";
  return sectorInfo;
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
            xml += formatSectorInfo(sector);
            xml += "</" + "sector" + ">\n";
          }
          xml += "</resume-" + username + ">\n";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        if (typeof obj[prop] === 'string' || obj[prop] instanceof String) {
          xml += escapeXml(obj[prop]);
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
    a.download = proposal.proposalName + ".xml";
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

  function searchProposals() {
    console.log("proposal search api call goes here, you can use the" + searchTerm);
  }

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
          <Link to="/create-proposal" style={{ textDecoration: "none", marginRight: "5px" }}>
                      <Button className="admin-button" color="primary" variant="outlined" onClick={() => createNewProposal()}> New Proposal <AddIcon/></Button>
          </Link>
          <Link to="/sector" style={{ textDecoration: "none" }}>
            <Button className="admin-button" color="primary" variant="outlined"> New Sector <AddIcon/></Button>
          </Link>
          <HtmlTooltip 
              title={
                <div>
                  <Typography><b>New Proposal</b></Typography>
                  Build a new proposal using the Proposal Editor to search current employee resumes.
                  <Typography><b>New Sector</b></Typography>
                  Create a sector template for employees to use and customize in their own resumes.
                </div>
                }
              followCursor>
              <HelpIcon fontSize="small" sx= {{ marginLeft: "10px" }}></HelpIcon>
            </HtmlTooltip>
        </div>
        <Box>
          <Box display="flex" flexDirection="row">
            <div className = "admin-header">Your Proposals</div>
            <Box width={15} />
            <div className = "admin-hint">Expand to delete, edit, and export proposals</div> 
          </Box>
          <div className="proposal-search">
            <form onSubmit={(e) => {e.preventDefault() 
                searchProposals()}} className="proposal-search">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="proposal-search-bar"
                placeholder="Search your proposals"
              />
              <Button 
                className="admin-search-button"
                onClick={searchProposals}
              >Search</Button>
            </form>
          </div>
          { proposals.length !== 0 
            ? (proposals.map((proposal, id) => {
            return (
              <Accordion key={id} style={style}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: '65%', flexShrink: 0, fontWeight:"300"}} variant="h6">{proposal.proposalName}</Typography>
                  <Typography sx={{ color: "text.secondary", marginTop: "5px" }}  fontFamily='"Roboto" "Helvetica" "Arial" "sans-serif"'>Last modified: {proposal.proposalModifiedDate}</Typography>
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
                    <HtmlTooltip 
                      title="Go to the Proposal Editor page to add, delete, and modify sectors in your proposal." 
                      followCursor>
                      <Button
                        variant="outlined"
                        style={{ marginRight: 10 }}
                        onClick={() => handleClickEdit(id)}
                      >
                        Edit
                      </Button>
                    </HtmlTooltip>
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
