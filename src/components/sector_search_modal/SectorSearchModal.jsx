import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SectorSearch from "../../components/sector_search/SectorSearch";
import "./SectorSearchModal.css";

var samplesectors = [
  {id: '0', name: 'Sample0', type: 'Type0', content: 'something0'}, 
  {id: '1', name: 'Sample', type: 'Type1', content: 'something'}, 
  {id: '2', name: 'New Sector', type: 'Experience', content: 'abdgbsbshd asdkbkdsb'},
  {id: '3', name: 'New Sector1', type: 'Experience2', content: 'content1'}
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
      this.state = {open: false}
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
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
                    <SectorSearch sectors = {samplesectors} addSector = {(sector) => {this.props.addSector(sector)}}/>
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