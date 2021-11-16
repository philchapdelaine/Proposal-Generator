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
          <div className="sector-name">
            <p>{sector.name}</p>
          </div>

          <div className="sector-division">
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
          <div className="sector-name-header">
            <p>Name</p>
          </div>
          <div className="sector-division-header">
            <p>Division</p>
          </div>
        </div>
        {this.props.sectors &&
          this.renderSectors()}
      </div>
    );
  }
}

SectorList.propTypes = {
  sectorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fetchSectors: PropTypes.func,
  deleteSector: PropTypes.func,
  sectors: PropTypes.any,
  selectSector: PropTypes.func
};

export default SectorList;