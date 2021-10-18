import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import "./SectorList.css";

class SectorList extends Component {

  constructor(props) {
    super(props);
    this.state = {sectors: []}
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }

  onItemClickHandler(sector) {
    this.props.selectSector(sector.id);
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
            sector.id === this.props.sectorId
              ? "active user-sector-item"
              : "user-sector-item"
          }
          key={i}
        >
          <div className="sector-name">
            <p>{sector.name}</p>
          </div>

          <div className="sector-type">
            <p>{sector.type}</p>
          </div>

          <div className = 'delete-button'>
            <Button variant="outlined" color="error" onClick={() =>
                {this.deleteSector(sector)}}>Delete</Button>
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
          <div className="sector-type-header">
            <p>Type</p>
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
  selectSector: PropTypes.func
};

export default SectorList;