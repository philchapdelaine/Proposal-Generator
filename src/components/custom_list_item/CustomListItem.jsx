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

import "../reading_pane/ReadingPane.css";

import axios from "axios";

import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

class CustomListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openItemID: null,
      currentProposal: this.props.proposals[this.props.currentProposalIndex],
      proposals: this.props.proposals,
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
    this.setState({ openItemID: id });
  }

  handleDeleteSector(sectorID) {
    this.props.deleteSector(sectorID, this.state.currentProposal.proposalId);
  }

  handleSubmit() {
    this.setState({ loading: true });
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(this.state.currentProposal);
      let url = `/api/user/${this.props.userID}/proposal/${this.state.currentProposal.proposalID}`;
    axios
      .put(url, this.state.currentProposal, config)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
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
                  {this.state.openItemID === sector.sectorID ? (
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
                  in={this.state.openItemID === sector.sectorID}
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
        <div className="button-group">
          <ButtonGroup variant="contained" size="large">
            <Link to="/admin">
              <Button onClick={() => this.handleSubmit()}>Save Proposal</Button>
            </Link>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);
