import "./Resume.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ResumeBuilder from "../../components/resume_builder/ResumeBuilder";
import NavigatorBar from "../../components/navigator_bar/NavigatorBar";
import SectorEditor from "../../components/sector_editor/SectorEditor";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { connect } from "react-redux"; // redux

var samplesectors = [
      {
          sectorID: 1,
          name: "Experience",
          linkedEmail: "mc@ae.com",
          proposalNumber: 1,
          empty: true,
          division: "Water",
          imageLoc: "blah/blah",
          description: "I'm the best so I don't need to have any experience"
      },
      {
          sectorID: 2,
          name: "Projects",
          linkedEmail: "mc@ae.com",
          proposalNumber: 1,
          empty: true,
          division: "Air",
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

// Toggles noAPI mode, which uses sample data and doesn't call the API.
var noAPI = false;

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = { currsector: undefined, sectors: resume, snacktext: "Success!"};
  }

  componentDidMount() {
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
      division: sectordivision,
      imageLoc: imageloc,
      description: sectordescription,
    }

    if (noAPI) {
      resume.push(newsector);
      this.setState({ sectors: resume });
      this.setState({snacktext: "Added " + sectorname})
      this.openSnackbar()
    } else {
      const url = `/api/user/${this.props.userID}/resume/sector`
      axios.post(url, newsector).then((res) => {
        this.handleUpdate()
        this.setState({snacktext: "Added Sector"})
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
      this.openSnackbar()
    } else {
      const url = `/api/user/${this.props.userID}/resume/sector/${sector.sectorID}`
      axios.delete(url).then((res) => {
        this.handleUpdate()
        this.setState({snacktext: "Deleted Sector"})
        this.openSnackbar()
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
        this.setState({snacktext: "Saved Sector"})
        this.openSnackbar()
      })
    }
    console.log("Saved" + sectorid);
  }

  openSnackbar(text) {
    openSnack(text);
  }

  render() {
    return (
      <div className="page">
        <div className="nav-bar">
          <NavigatorBar></NavigatorBar>
        </div>
        <div className = "resume-page">
          <div className = "resume-builder">
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
                {this.saveSector(sectorid, sectorname, sectorcontent, sectordivision, sectorimageLoc, sectorProposalNum)}}></SectorEditor>
              
              :  <div className="no-sector-text">No Sector Selected</div>        
              }
            </div>
          </div>
        </div>
        <SuccessSnackbar text = {this.state.snacktext}></SuccessSnackbar>
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function openSnack(){
  this.setState({open: false}, () => {
    this.setState({open: true});
  });
}

class SuccessSnackbar extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false, text: "Success!"};
    openSnack = openSnack.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
  }

  closeSnack(reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false})
  }


  render() {
    return (
        <Snackbar open={this.state.open} autoHideDuration={1200} onClose={(e, r) => {this.closeSnack(r)}}>
        <Alert onClose={this.closeSnack} severity="success" sx={{ width: '100%' }}>
            {this.props.text}
        </Alert>
        </Snackbar>
      );
  }
}

SuccessSnackbar.proptypes = {
    text: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
