import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import "./RecentlyViewed.css";
import Axios from 'axios';

export default class RecentlyViewed extends React.Component {
  constructor(props) {
    super(props);
    this.updateClickedSector = this.updateClickedSector.bind(this);
  };

  updateClickedSector(sector) {
    this.props.onSectorClick(sector);
  };

  render() {
    const recentlyViewed = this.props.resumes;
     return (
      <div>
        <div className="recently_viewed_title">
            <h3>Recently Viewed</h3>
         </div>
        <List component='nav'>
          {recentlyViewed.map(resume => {
            return (
              <ViewedItem key={resume.resumeID} doc={resume} onSectorUpdate={this.updateClickedSector}/>
            );
          })}
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
        resumeOwnerName: "Name not available"
      };
      this.handleClick = this.handleClick.bind(this);
      this.updateClickedSector = this.updateClickedSector.bind(this);
    }

    handleClick() {
      console.log("Handle Clicked....");
       this.setState(prevState => ({
         open: !prevState.open
       }));
    }

    updateClickedSector(sector) {
      this.props.onSectorUpdate(sector);
    }

    componentDidMount() {
      // this.props.doc.resumeID is NULL
      Axios.get('/api/user/1/')
      .then((res) => {
        this.setState({
          resumeOwnerName: res.data.firstName + " " + res.data.lastName   
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }

  render() {
    const resume = this.props.doc;
    return (
      <div>
        <ListItem button key={resume.resumeID} onClick={this.handleClick}>
          <ListItemText primary={this.state.resumeOwnerName}/>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        <Collapse
          key={resume.resumeID}
          in={this.state.open}
          timeout='auto'
          unmountOnExit
        >
        <List component='li' disablePadding key={resume.resumeID}>
          {resume.sectors.map(sector => {
            return (
              <ListItem button key={sector.sectorID} value={sector} onClick={()=> this.updateClickedSector(sector)}>
                <ListItemText key={sector.sectorID} primary={sector.name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
      </div>
      )
    }
}