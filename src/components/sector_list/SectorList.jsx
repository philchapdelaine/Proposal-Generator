import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import "./SectorList.css";
import DeleteSectorDialog from "../delete_sector_dialog/DeleteSectorDialog";

class SectorList extends Component {

  constructor(props) {
    super(props);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }

  onItemClickHandler(sector) {
    this.props.selectSector(sector.sectorID);
  }

  deleteSector(sector) {
    this.props.deleteSector(sector);
  }

  renderSectors() {
    return this.props.sectors.map((sector, i) => {
      return (
        <li
          onClick={() => {this.onItemClickHandler(sector)}}
          className={
            sector.sectorID === this.props.sectorId
              ? "active user-sector-item"
              : "user-sector-item"
          }
          key={i}
        >
          <div className="sector-property">
            <p>{sector.name}</p>
          </div>
          <div className="sector-property">
            <p>{sector.proposalNumber}</p>
          </div>

          <div className="sector-property">
            <p>{sector.division}</p>
          </div>

          <div className = 'delete-button'>
            <DeleteSectorDialog deleteSector = {() => {this.deleteSector(sector)}}></DeleteSectorDialog>
          </div>
        </li>
      );
    });
  }


  render() {
    return (
      <div>
        <div className="sector-header-container">
          <div className="sector-property-header">
            <p>Name</p>
          </div>
          <div className="sector-property-header">
            <p>Proposal #</p>
          </div>
          <div className="sector-property-header">
            <p>Division</p>
          </div>
        </div>
        <div className = "list-container">
        {this.props.sectors &&
          this.renderSectors()}
          </div>
      </div>
    );
  }
}

SectorList.propTypes = {
  sectorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sectors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSectors: PropTypes.func,
  deleteSector: PropTypes.func,
  selectSector: PropTypes.func
};

export default SectorList;