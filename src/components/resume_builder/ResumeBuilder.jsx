import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ResumeBuilder.css";
import SectorList from "../../components/sector_list/SectorList";
import SectorSearchModal from "../sector_search_modal/SectorSearchModal";

class ResumeBuilder extends Component {

  constructor(props) {
    super(props);
    if (this.props.sectors === undefined) {
      this.state = {sectors: []};
    } else {
      this.state = {sectors: this.props.sectors};
    }
  }

  deleteSector(sector) {
    this.props.deleteSector(sector);
  }

  addSector(sectorname, sectordivision, filetype, imageloc, sectordescription) {
    this.props.addSector(sectorname, sectordivision, filetype, imageloc, sectordescription);
  }

  selectSector(sectorid) {
    this.props.selectSector(sectorid);
  }

  render() {
    return (
        <div>
          <div>
            <SectorSearchModal addSector = {(sectorname, sectordivision, filetype, imageloc, sectordescription) => 
              {this.addSector(sectorname, sectordivision, filetype, imageloc, sectordescription)}}></SectorSearchModal>
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