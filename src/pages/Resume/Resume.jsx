import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import SectorEditor from "../../components/sector_editor/SectorEditor";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { connect } from "react-redux"; // redux

var samplesectors = [
      {
          sectorID: 1,
          name: "Experience",
          linkedEmail: "mc@ae.com",
          proposalNumber: 1,
          empty: false,
          division: "Water",
          modifiedDate: "05/03/2012",
          imageLoc: "blah/blah",
          description: "I'm the best so I don't need to have any experience"
      },
      {
          sectorID: 2,
          name: "Role",
          linkedEmail: "mc@ae.com",
          proposalNumber: 1,
          empty: false,
          division: "Civil",
          modifiedDate: "05/03/2012",
          imageLoc: "",
          description: "I'm the best so I don't need to have any projects"
      }
  ]


var sampleuser = {
  applicationUserId: 1,
  firstName: "Michael",
  lastName: "Chung",
  emailAddress: "mc@ae.com",
}

var resume = []; 

var index = 3;

var newDate = "00/00/0000"

// Toggles noAPI mode, which uses sample data and doesn't call the API.
var noAPI = false;

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { currsector: undefined, sectors: resume, snacktext: "Success!", snackbarKey: 0, snackbarOpen: false};
  }

  componentDidMount() {
    var today = new Date();
    newDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    if (noAPI) {
      resume = samplesectors
      this.setState({sectors: resume});
    } else {
      const url = `/api/user/${this.props.userID}/resume`
      axios.get(url)
        .then((res) => {
          resume = res.data.sectors;
          this.setState({ sectors: resume })
        })
    }
  }

  handleUpdate() {
    if (noAPI) {
      this.setState({ sectors: resume });
    } else {
      const url = `/api/user/${this.props.userID}/resume`
      axios.get(url)
        .then((res) => {
          resume = res.data.sectors;
          this.setState({ sectors: resume });
        })
    }
  }

  componentDidUpdate() {
    console.log(this.state.sectors);
  }

  selectSector(newID) {
    this.setState({ currsector: resume.find((e) => e.sectorID === newID) });
  }

  addSector(sectorname, sectordivision, propNumber, imageloc, sectordescription) {
    var newsector = {          
      name: sectorname,
      linkedEmail: this.props.email,
      empty: false,
      proposalNumber: propNumber,
      modifiedDate: newDate,
      division: sectordivision,
      imageLoc: imageloc,
      description: sectordescription,
    }

    if (noAPI) {
      newsector.sectorID = index++;
      resume.push(newsector);
      this.setState({ sectors: resume });
      this.setState({snacktext: "Added " + sectorname})
      this.openSnackbar()
    } else {
      const url = `/api/user/${this.props.userID}/resume/sector`
      axios.post(url, newsector).then((res) => {
        this.handleUpdate()
        this.setState((prevState, props) => ({
          snacktext: "Added Sector",
          snackbarKey: prevState.snackbarKey + 1
        })); 
        this.openSnackbar()
      })
    }
    console.log("Added " + newsector.name);
  }

  deleteSector(sector) {
    if (noAPI) {
      resume.splice(resume.findIndex((e) => e.sectorID === sector.sectorID), 1);
      this.setState({ sectors: resume });
      this.setState({snacktext: "Deleted " + sector.name})
      if (sector.sectorID == this.state.currsector.sectorID) {
        this.setState({currsector: undefined});
      }
      this.openSnackbar()
    } else {
      const url = `/api/user/${this.props.userID}/resume/sector/${sector.sectorID}`
      axios.delete(url).then((res) => {
        this.handleUpdate()
        this.setState((prevState, props) => ({
          snacktext: "Deleted Sector",
          snackbarKey: prevState.snackbarKey + 1
        })); 
        this.openSnackbar()
        if (sector.sectorID == this.state.currsector.sectorID) {
          this.setState({currsector: undefined});
        }
      })
    }
    console.log("Deleted " + sector.name);
  }

  saveSector(sectorid, sectorname, sectorcontent, sectordivision, sectorimageLoc, sectorProposalNum) {
    var oldsector = resume[resume.findIndex(e => e.sectorID === sectorid)]
    oldsector.name = sectorname;
    oldsector.description = sectorcontent;
    oldsector.division = sectordivision;
    oldsector.imageLoc = sectorimageLoc;
    oldsector.modifiedDate = newDate;
    oldsector.proposalNumber = sectorProposalNum;
    if (noAPI) {
      resume.splice(resume.findIndex(e => e.sectorID === sectorid), 1, oldsector);
      this.setState({ sectors: resume });
      this.setState({snacktext: "Saved " + sectorname})
      this.openSnackbar()
    } else {
      const url = `/api/sector/${oldsector.sectorID}`
      axios.put(url, oldsector).then((res) => {
        this.handleUpdate()
        this.setState((prevState, props) => ({
          snacktext: "Saved Sector",
          snackbarKey: prevState.snackbarKey + 1
        })); 
        this.openSnackbar()
      })
    }
    console.log("Saved" + sectorid);
  }

  openSnackbar() {
    this.setState({snackbarOpen: true})
  }

  render() {
    return (
      <div className="page">
        <div className="nav-bar">
          <NavigatorBar></NavigatorBar>
        </div>
        <div className = "resume-page">
          <div className = "resume-builder">
          <Box display="flex" flexDirection="row">
            <div className = "resume-header">Resume</div> 
            <Box width={15} />
            <div className = "admin-hint">This is your personal resume page, <br/> 
            where you can add or edit template sectors</div> 
          </Box>
            <ResumeBuilder sectors = {this.state.sectors}
            addSector = {(sectorname, sectordivision, propNumber, imageloc, sectordescription) => 
              {this.addSector(sectorname, sectordivision, propNumber, imageloc, sectordescription)}}
            deleteSector = {(sector) => {this.deleteSector(sector)}}
            selectSector = {(sectorid) => {this.selectSector(sectorid)}}></ResumeBuilder>
          </div>
          <div className="sector-editor">
            <div className = "sector-editor-header">Sector Editor</div>           
            <div>
            {this.state.currsector
              ? <SectorEditor sector = {this.state.currsector} 
              saveSector = {(sectorid, sectorname, sectorcontent, sectordivision, sectorimageLoc, sectorProposalNum) => 
                {this.saveSector(sectorid, sectorname, sectorcontent, sectordivision, sectorimageLoc, sectorProposalNum)}}
                key = {this.state.currsector.sectorID}></SectorEditor>
              
              :  <div className="no-sector-text">No Sector Selected</div>        
              }
            </div>
          </div>
        </div>

        <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={this.state.snackbarOpen}
        onClose={() => this.setState({snackbarOpen :false})}
        // key={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1200}
      >
        <MuiAlert onClose={() => this.setState({snackbarOpen: false})} severity={"success"} sx={{ width: '100%' }} variant="filled">
          {this.state.snacktext}
        </MuiAlert>
      </Snackbar>
      
      </div>
    );
  }
}

Resume.propTypes = {};

function mapStateToProps(state) {
  return {
    userID: state.loginReducer.uid,
    email: state.loginReducer.username,
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

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
