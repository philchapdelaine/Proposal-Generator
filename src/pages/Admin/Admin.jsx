import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Delete } from "@mui/icons-material";
import confirmModal from "../../components/confirmModal/confirmModal";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import { useHistory } from "react-router-dom";
import "./Admin.css";

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
    // TODO-JC: get user's proposals from DB
    setProposals([{ name: "Proposal 1" }, { name: "Proposal 2" }]);
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
                  <Typography>{proposal.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex">
                    <Box sx={sampleStyle}>Sample Resumes Here</Box>
                    <Box sx={sampleStyle}>Sample Resumes Here</Box>
                    <Box sx={sampleStyle}>Sample Resumes Here</Box>
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
