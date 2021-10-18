import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ResumeBuilder.css";
import SectorList from "../../components/sector_list/SectorList";
import SectorSearchModal from "../sector_search_modal/SectorSearchModal";

class ResumeBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {sectors: this.props.sectors};
  }

  deleteSector(sector) {
    this.props.deleteSector(sector);
  }

  addSector(sector) {
    this.props.addSector(sector);
  }

  selectSector(sectorid) {
    this.props.selectSector(sectorid);
  }

  render() {
    return (
        <div>
          <div>
            <SectorSearchModal addSector = {(sector) => {this.addSector(sector)}}></SectorSearchModal>
          </div>
          <SectorList 
          sectors = {this.state.sectors} 
          deleteSector = {(sector) => {this.deleteSector(sector)}} 
          selectSector = {(sectorid) => {this.selectSector(sectorid)}}></SectorList>
        </div>
    );
  }
}

ResumeBuilder.propTypes = {
  sectors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSectors: PropTypes.func,
  deleteSector: PropTypes.func,
  addSector: PropTypes.func,
  selectSector: PropTypes.func
};

export default ResumeBuilder;