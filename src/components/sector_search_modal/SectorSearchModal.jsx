import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SectorSearch from "../../components/sector_search/SectorSearch";
import axios from "axios";
import "./SectorSearchModal.css";

var samplesectors = [
  {
    sectorID: 3,
    name: "Experience",
    linkedEmail: "mc@ae.com",
    fileType: "txt",
    division: "Water",
    imageLoc: "blah/blah",
    description: "I'm the best so I don't need to have any experience"
},
{
    sectorID: 4,
    name: "Projects",
    linkedEmail: "mc@ae.com",
    fileType: "txt",
    division: "Air",
    imageLoc: null,
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

class SectorSearchModal extends Component {

    constructor(props) {
      super(props);
      this.state = {open: false, sectors: []}
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
      // resume = samplesectors
      const url = "localhost:5000/api/user/sector"
      axios.get(url)
        .then((res) => {
          this.setState({sectors: res});
        })
    }

    openModal() {
        this.setState({open: true})
    }

    closeModal() {
        this.setState({open: false})
    }
  
    render() {
      return (
        <div className = "search-button">
            <Button variant="contained" onClick={this.openModal}>Add Sector</Button>
            <Modal
            open={this.state.open}
            onClose={this.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Sector
                    </Typography>
                    <SectorSearch sectors = {this.state.sectors} addSector = {(sectorname, sectordivision, filetype, imageloc, sectordescription) => 
                      {this.props.addSector(sectorname, sectordivision, filetype, imageloc, sectordescription)}}/>
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