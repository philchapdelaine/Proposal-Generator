import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CustomListItem from "../custom_list_item/CustomListItem";
import EditSectorModal from "../editSectorModal/EditSectorModal";
import "./ReadingPane.css";

function ReadingPane() {
  const [selectedTab, setSelectedTab] = useState(0);
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  {
    /* TODO--Actually add sector*/
  }
  function addSector() {
    return <div></div>;
  }

  return (
    <div className="reading-pane">
      <div className="reading-pane-header"> Reading Pane </div>
      <div className="preview">
        <Tabs
          TabIndicatorProps={{ style: { background: "#5F9EA0" } }}
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Sector Preview" index={0} />
          <Tab label="Proposal Draft" index={1} />
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          <div>
            <h1 className="reading-pane-title">Experience</h1>
          </div>
          <div className="sector-preview">
            <TextField
              id="outlined-basic"
              label="John Smith's experince goes here."
              variant="outlined"
              placeholder="User can edit this sector's contents."
              multiline
              rows={10}
              rowsMax={10}
              margin="normal"
              fullWidth
            />
          </div>
          <div className="button-group">
            <ButtonGroup variant="contained" size="large">
              <Button onClick={openModal}>Edit Sector</Button>
              <Button onClick={addSector()}>Add Sector</Button>
            </ButtonGroup>
          </div>
        </TabPanel>
        <EditSectorModal open={open} onClose={closeModal} sectorName={"Sector 1"}></EditSectorModal>

        <TabPanel value={selectedTab} index={1}>
          <div>
            <h1 className="reading-pane-title">Proposal Draft</h1>
          </div>
          <div>
            <CustomListItem />
          </div>
          <div className="button-group">
            <ButtonGroup variant="contained" size="large">
              <Button>Submit Proposal</Button>
            </ButtonGroup>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

export default ReadingPane;
