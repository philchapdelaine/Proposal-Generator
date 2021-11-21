import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import { useHistory } from "react-router-dom";
import "./Admin.css";
import axios from "axios";
import ResumeThumbnail from "../../components/resume_thumbnail/ResumeThumbnail";
import AddIcon from '@mui/icons-material/Add';

import {
  setProposalIndex,
  setProposals as setProposalsRedux,
} from "../../redux/actions/proposal-actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/confirmModal/confirmModal";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

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

  function exportProposal(proposal) {
    // src: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    const blob = new Blob([JSON.stringify(proposal, undefined, 2)], { type: "text/json" });
    const a = document.createElement("a");
    a.download = proposal.name + ".txt";
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

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="admin-page">
      <NavigatorBar />
      <div className="admin-main">
        <div className="admin-buttons-container">
          <Link to="/create-proposal" style={{ textDecoration: "none" }}>
            <Button className="admin-button" color="primary" variant="outlined"> New Proposal <AddIcon/></Button>
          </Link>{" "}
          <Link to="/sector" style={{ textDecoration: "none" }}>
            <Button className="admin-button" color="primary" variant="outlined"> New Sector <AddIcon/></Button>
          </Link>
        </div>
        <Box>
          <Typography variant="h4" margin={3}>
            Your proposals
          </Typography>
          {proposals.map((proposal, id) => {
            return (
              <Accordion key={id} style={style}>
                <AccordionSummary>
                  <Typography>{proposal.proposalName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex">
                    {proposal.resumes?.map((resume, id) => {
                      return (
                        <ResumeThumbnail
                          name={resume.name}
                          key={id}
                          notClickable
                        />
                      );
                    })}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ marginTop: 15 }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      style={{ marginRight: 10 }}
                      onClick={() => handleOpenModal(id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ marginRight: 10 }}
                      onClick={() => handleClickEdit(id)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" onClick={() => exportProposal(proposal)}>Export</Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
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
