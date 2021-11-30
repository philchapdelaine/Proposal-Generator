import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SectorSearch.css";
import Button from '@mui/material/Button';

class SectorSearch extends Component {
  constructor(props) {
      super(props);
      this.state = {searchTerm: ""};
    }

  updateSearchTerm = (event) => {
    this.setState({searchTerm: event.target.value});
  };

  componentDidUpdate() {
    if (!open) {
      this.setState({searchTerm: ""});
    }
  }

  addSector(sectorname, sectordivision, propNumber, imageloc, sectordescription) {
    this.props.addSector(sectorname, sectordivision, propNumber, imageloc, sectordescription);
  }

  renderSectors() {
    return this.props.sectors.map((sector, i) => {
      return (
        <li
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

          <div className="sector-proposalNumber">
            <p>{sector.proposalNumber}</p>
          </div>

          <div className="sector-division">
            <p>{sector.division}</p>
          </div>

          <div className = 'addButton'>
            <Button variant="outlined" onClick={() =>
                {this.addSector(sector.name, sector.division, sector.proposalNumber, sector.imageLoc, sector.description)}}>Add</Button>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
    <div>
      <div className="sector-search-container">
        <form onSubmit={(e) => {e.preventDefault()
        this.props.searchSectors(this.state.searchTerm)}}>
          <input
            onChange={this.updateSearchTerm}
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className = "search-list-container">
      {this.props.sectors &&
          this.renderSectors()}  
      </div>
    </div>

    );
  }
}

SectorSearch.propTypes = {
  sectorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sectors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  searchSectors: PropTypes.func,
  addSector: PropTypes.func,
  open: PropTypes.bool,
};

export default SectorSearch;