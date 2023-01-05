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
      redirect: null,
      success: false,
      nameUpdated: false,
      nameDisabled: false,
      loading: false, // will be true when axios request is running
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteSector = this.handleDeleteSector.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.axiosPut = this.axiosPut.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.action = this.action.bind(this);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  componentDidMount() {
    if (this.props.proposals[this.props.currentProposalIndex] === undefined) {
        this.setState({ nameDisabled: true });
    }
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
              this.props.deleteSector(sectorID, this.state.currentProposal.proposalId, this.props.currentProposalName);
              this.setState({ loading: false });
          })
          .catch((error) => {
              console.log(error);
          });
  }

    async handleSubmit() {
        console.log(this.props.currentProposalName);
        if (this.state.currentProposal !== undefined) {
            await this.axiosPut();
            this.setState({ success: true });
        }
    }

    async axiosPut() {
        this.setState({ success: true });
        this.setState({ loading: true });
        const config = { headers: { "Content-Type": "application/json" } };
        this.state.currentProposal.proposalName = this.props.currentProposalName;
        let url = `/api/user/${this.props.userID}/proposal/${this.state.currentProposal.proposalID}`;
        const res = await axios
            .put(url, this.state.currentProposal, config)
            .then((response) => {
                console.log(response);
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
        if (this.props.proposals[this.props.currentProposalIndex] !== undefined) {
            this.props.updateName(event.target.value);
        }
    }

    handleClose(event, reason) {
        this.setState({ success: false });
    };

    action() {
            <React.Fragment>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleClose}
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
                Name: <input autoFocus type="text" onChange={this.handleTextChange.bind(this)} value={this.props.currentProposalName} disabled={this.state.nameDisabled}></input>
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
                <ButtonGroup variant="contained" size="large">
                    <Button className="save-button" onClick={() => this.handleBack()}>Exit</Button>
                    <Button className="save-button" onClick={() => this.handleSubmit()}>Save</Button>
                </ButtonGroup>
            </div>
            <Snackbar
                open={this.state.success}
                autoHideDuration={2000}
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
    currentProposalName: state.proposalReducer.currentProposalName,
    userID: state.loginReducer.uid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSector: (sectorID, proposalId, proposalName) => {
      dispatch({
        type: "DELETE_SECTOR",
        sectorID: sectorID,
        proposalId: proposalId,
        proposalName: proposalName
      });
      },
    updateName: (proposalName) => {
      dispatch({
        type: "UPDATE_NAME",
        proposalName: proposalName
      });
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);
