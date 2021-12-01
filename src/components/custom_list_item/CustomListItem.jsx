import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import "./CustomListItem.css";

import axios from "axios";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

class CustomListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openItemIDs: [],
      currentProposal: this.props.proposals[this.props.currentProposalIndex],
      proposals: this.props.proposals,
      proposalName: this.props.proposals[this.props.currentProposalIndex] === undefined ? "Untitled New Proposal" : this.props.proposals[this.props.currentProposalIndex].proposalName,
      redirect: null,
      success: false,
      loading: false, // will be true when axios request is running
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteSector = this.handleDeleteSector.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.axiosPut = this.axiosPut.bind(this);
  }

  componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state, callback) => {
          return;
      };
  }

  handleClick(id) {
    if (this.state.openItemIDs.includes(id)) {
      const newIDs = this.state.openItemIDs.filter((thisID) => thisID !== id);
      this.setState({ openItemIDs: newIDs });
    } else {
      this.setState({ openItemIDs: [...this.state.openItemIDs, id] });
    }
  }

  handleDeleteSector(sectorID) {
      this.setState({ loading: true });
      let url = `/api/user/${this.props.userID}/proposal/${this.state.currentProposal.proposalID}/sector/${sectorID}`;
      axios
          .delete(url)
          .then((response) => {
              console.log(response);
              this.props.deleteSector(sectorID, this.state.currentProposal.proposalId);
              this.setState({ loading: false });
          })
          .catch((error) => {
              console.log(error);
          });
  }

    handleSubmit() {
        if (this.state.currentProposal !== undefined) {
            this.axiosPut();
            this.setState({ success: true });
        }
    }

    axiosPut() {
        this.setState({ loading: true });
        const config = { headers: { "Content-Type": "application/json" } };
        this.state.currentProposal.proposalName = this.state.proposalName;
        let url = `/api/user/${this.props.userID}/proposal/${this.state.currentProposal.proposalID}`;
        axios
            .put(url, this.state.currentProposal, config)
            .then((response) => {
                console.log(response);
                this.props.updateProposal(this.state.currentProposal);
                this.setState({ loading: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleBack() {
        this.setState({ redirect: "/admin" });
    }

    handleTextChange(event) {
        this.setState({
            proposalName: event.target.value
        })
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setWarning(false);
    };

    action() {
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
    };

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <div className="proposal-name-form">
            <form>
                Proposal Name: <input type="text" onChange={this.handleTextChange.bind(this)} value={this.state.proposalName}></input>
           </form>
        </div>
        <List>
          {this.state.currentProposal === undefined ? (
            <div></div>
          ) : (
            this.state.currentProposal.resumes.map((sector, i) => (
              <div>
                <ListItem
                  button
                  key={sector.sectorID}
                  onClick={() => this.handleClick(sector.sectorID)}
                >
                  <ListItemText
                    primary={`${sector.name} for ${sector.linkedEmail}`}
                    secondary={`Division : ${sector.division}`}
                  />
                  {this.state.openItemIDs.includes(sector.sectorID) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                  <IconButton
                    edge="end"
                    onClick={() => this.handleDeleteSector(sector.sectorID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Collapse
                  key={i+sector.sectorID}
                  in={this.state.openItemIDs.includes(sector.sectorID)}
                  timeout="auto"
                  unmountOnExit
                >
                  <div>
                    <List component="li" disablePadding key={sector.sectorID}>
                      <ListItem>
                        <ListItemText primary={sector.description} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={sector.imageLoc} />
                      </ListItem>
                    </List>
                  </div>
                </Collapse>
                <Divider />
              </div>
            ))
          )}
        </List>
            <div className="button-container">
                <ButtonGroup variant="contained" size="large" >
                    <Button className="save-button" onClick={() => this.handleBack()}>Exit</Button>
                    <Button className="save-button" onClick={() => this.handleSubmit()}>Save Proposal</Button>
                </ButtonGroup>
            </div>
            <Snackbar
                open={this.state.success}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message="Proposal Successfully Saved"
                action={this.action}
            >
            </Snackbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    proposals: state.proposalReducer.proposals,
    currentProposalIndex: state.proposalReducer.currentProposalIndex,
    userID: state.loginReducer.uid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSector: (sectorID, proposalId) => {
      dispatch({
        type: "DELETE_SECTOR",
        sectorID: sectorID,
        proposalId: proposalId,
      });
    },
    updateProposal: (newProposal) => {
      dispatch({
        type: "UPDATE_PROPOSAL",
        newProposal: newProposal
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);
