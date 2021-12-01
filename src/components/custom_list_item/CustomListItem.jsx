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
      loading: false, // will be true when axios request is running
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteSector = this.handleDeleteSector.bind(this);
  }

  handleClick(id) {
    // const oldResumeClicked = this.state.openItemID === id;
    // console.log(newResumeClicked)
    // if (oldResumeClicked) {
    //   this.setState({ openItemId : 0 });
    //   console.log(this.state.openItemID)
    // }
    // } else {
    //   this.setState({ openItemId : null });
    // }
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
      console.log(this.state.currentProposal);
      axios
          .delete(url)
          .then((response) => {
              console.log(response);
              this.props.deleteSector(sectorID, this.state.currentProposal.proposalId);
              this.setState({ loading: false, proposalSavedMessage: true });
              setTimeout(this.setState({ proposalSavedMessage: false }), 3000);
          })
          .catch((error) => {
              console.log(error);
          });
  }

    handleSubmit() {
        if (this.state.currentProposal !== undefined) {
            this.setState({ loading: true });
            const config = { headers: { "Content-Type": "application/json" } };
            this.state.currentProposal.proposalName = this.state.proposalName;
            let url = `/api/user/${this.props.userID}/proposal/${this.state.currentProposal.proposalID}`;
            console.log(this.state.currentProposal)
            axios
              .put(url, this.state.currentProposal, config)
              .then((response) => {
                console.log(response);
                this.props.updateProposal(this.state.currentProposal);
                this.setState({ loading: false, proposalSavedMessage: true });
                setTimeout(this.setState({ proposalSavedMessage: false }), 3000);
              })
              .catch((error) => {
                console.log(error);
              });
            this.setState({ redirect: "/admin" });
        }
  }

  handleTextChange(event) {
      this.setState({
          proposalName: event.target.value
      })
  }

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
                  key={i}
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
                    <Button className="save-button" onClick={() => this.handleSubmit()}>Save Proposal</Button>
                </ButtonGroup>
            </div>
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
