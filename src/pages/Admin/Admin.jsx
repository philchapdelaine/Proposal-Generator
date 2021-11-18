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
import Axios from 'axios';
import ResumeThumbnail from "../../components/resume_thumbnail/ResumeThumbnail";
import { setProposals as setProposalsRedux } from "../../redux/actions/proposal-actions";
import { useDispatch } from 'react-redux'

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

const handleDelete = () => {
  // TODO-JC: confirm delete proposal dialog
};

function Admin() {
  const [proposals, setProposals] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickEdit = () => {
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

  useEffect(() => {
    const getProposals = async () => {
      // TODO-JC: use user's id once that is implemented
      let response = await Axios.get('/api/user/0/proposal');
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
                  <Typography>{proposal.proposalID}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex">
                    {proposal.resumes?.map((resume, id) => {
                      return (
                        <ResumeThumbnail name={resume.name} key={id} notClickable />
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
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ marginRight: 10 }}
                      onClick={handleClickEdit}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" onClick={() => exportProposal(proposal)}>Export</Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

export default Admin;
