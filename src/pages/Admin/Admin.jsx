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
import {
  setProposalIndex,
  setProposals as setProposalsRedux,
} from "../../redux/actions/proposal-actions";
import { useDispatch } from "react-redux";
import ConfirmModal from "../../components/confirmModal/confirmModal";
import { useSelector } from "react-redux";

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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = (id) => {
    setIdToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/user/${uid}/proposal/${idToDelete}`);
    setModalOpen(false);
  };

  useEffect(() => {
    const getProposals = async () => {
      let response = await axios.get(`/api/user/${uid}/proposal`);
      if (response.data) {
        setProposals(response.data);
        dispatch(setProposalsRedux(response.data));
      }
    };

    getProposals();
  }, []);

  return (
    <div className="admin-page">
      <NavigatorBar />
      <div className="admin-main">
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
                    <Button variant="contained">Export</Button>
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
