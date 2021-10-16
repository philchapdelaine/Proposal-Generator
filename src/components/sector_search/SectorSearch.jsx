import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SectorSearch.css";
import Button from '@mui/material/Button';

class SectorSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ""};
      }

  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  addSector(sector) {
    this.props.addSector(sector);
  }

  renderSectors() {
    return this.props.sectors.map((sector, i) => {
      return (
        <li
          className={
            sector.id === this.props.sectorId
              ? "active user-sector-item"
              : "user-sector-item"
          }
          key={i}
        >

          <div className="sector-type">
            <p>{sector.type}</p>
          </div>

          <div className = 'addButton'>
            <Button variant="outlined" onClick={() =>
                {this.addSector(sector)}}>Add</Button>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
    <div>
      <div className="sector-search-container">
        <form
          onSubmit={() => {
          }}
        >
          <input
            onChange={this.updateSearchTerm}
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
      <div>
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
};

export default SectorSearch;