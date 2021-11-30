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
          key={i}>
          <div className="sector-name">
            {sector.name}
          </div>
          <div className="sector-property">
            {sector.proposalNumber}
          </div>
          <div className="sector-division">
            {sector.division}
          </div>
          <div className="sector-desc">
            {sector.description}
          </div>
          <div className="sector-date">
            {sector.modifiedDate}
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
            Type
          </div>
          <div className="sector-property-header">
            P#
          </div>
          <div className="sector-division-header">
            Division
          </div>
          <div className="sector-desc-header">
            Description
          </div>
          <div className="sector-date-header">
            Modified
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