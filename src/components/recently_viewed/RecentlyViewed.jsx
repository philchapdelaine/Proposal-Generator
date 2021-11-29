import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import "./RecentlyViewed.css";
import axios from "axios";

const mapDispatchToProps = (dispatch) => {
  return {
    handleSectorClick: (sector) => dispatch({type: 'SET_CURRENT_SECTOR', currentSector: sector})
  }
}

class RecentlyViewed extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const recentlyViewed = this.props.resumes;
    return (
      <div className="recently-viewed">
        <div className="recently_viewed_title">
          <h2>Recently Viewed</h2>
        </div>
        <List component="nav">
          { recentlyViewed.length !== 0
          ? (recentlyViewed.map((resume) => {
            return (
              <ViewedItem
                key={resume.resumeID}
                doc={resume}
                onSectorUpdate={(sector) => this.props.handleSectorClick(sector)}
              />
              );
            }))
          : <div className="no-recently-viewed"> No sectors viewed yet! </div>
        }
        </List>
      </div>
    );
  }
}

class ViewedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      resumeOwnerName: "Name not available",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Handle Clicked....");
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  componentDidMount() {
    axios
      .get("/api/user/" + this.props.doc.resumeID + "/")
      .then((res) => {
        this.setState({
          resumeOwnerName: res.data.firstName + " " + res.data.lastName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const resume = this.props.doc;
    return (
      <div>
        <ListItem button key={resume.resumeID} onClick={this.handleClick}>
          <ListItemText primary={this.state.resumeOwnerName} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          key={resume.resumeID}
          in={this.state.open}
          timeout="auto"
          unmountOnExit
        >
          <List component="li" disablePadding key={resume.resumeID}>
            {resume.sectors.map((sector) => {
              return (
                <ListItem
                  button
                  key={sector.sectorID}
                  value={sector}
                  onClick={() => this.props.onSectorUpdate(sector)}
                >
                  <ListItemText key={sector.sectorID} primary={sector.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        <Divider />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(RecentlyViewed);