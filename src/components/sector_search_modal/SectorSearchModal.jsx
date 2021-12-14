import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SectorSearch from "../../components/sector_search/SectorSearch";
import axios from "axios";
import { IconButton } from "@mui/material";
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@mui/icons-material/Add';
import "./SectorSearchModal.css";

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
    name: "Role",
    linkedEmail: "mc@ae.com",
    proposalNumber: 1,
    empty: true,
    division: "Civil",
    imageLoc: "",
    description: "I'm the best so I don't need to have any projects"
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// Toggles noAPI mode, which uses sample data and doesn't call the API.
var noAPI = false;

class SectorSearchModal extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false, sectors: [] }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (noAPI) {
      this.setState({ sectors: samplesectors });
    } else {
      const url = `/api/sector/empty`
      axios.get(url)
        .then((res) => {
          this.setState({ sectors: res.data });
        })
    }
  }

  openModal() {
    this.setState({ open: true })
  }

  closeModal() {
    this.setState({ open: false })
  }

  searchSector(searchterm) {
    console.log(searchterm)
    if (searchterm === "") {
      const url = `/api/sector/empty`
      axios.get(url)
        .then((res) => {
          this.setState({ sectors: res.data });
        })
    } else {
      const url = `/api/search/sector/${searchterm}`
      axios.get(url)
        .then((res) => {
          this.setState({ sectors: res.data });
        })
    }
  }

  render() {
    return (
      <div className="search-button">
        <Button variant="contained" onClick={this.openModal}>Add Sector <AddIcon /></Button>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton aria-label="Close" className="close-button" onClick={this.closeModal}>
              <CloseIcon />
            </IconButton>
            <div className="ssm-title">
              <Typography id="modal-modal-title" variant="h5" component="h2">
                <b>Add Sector</b>
              </Typography>
              Search template sectors to add to your resume. These templates can be customized after they're added.
            </div>
            <SectorSearch sectors={this.state.sectors} addSector=
              {(sectorname, sectordivision, propNumber, imageloc, sectordescription) => { this.props.addSector(sectorname, sectordivision, propNumber, imageloc, sectordescription) }}
              searchSectors={(searchterm) => { this.searchSector(searchterm) }}
              open={this.state.open} />
          </Box>
        </Modal>
      </div>
    );
  }
}

SectorSearchModal.propTypes = {
  addSector: PropTypes.func,
};

export default SectorSearchModal;