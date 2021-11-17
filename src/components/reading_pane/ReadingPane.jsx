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
import { useSelector, useDispatch } from "react-redux";

function ReadingPane(props) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [displayedSector, setDisplayedSector] = useState("");
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const currentSector = useSelector((state) => state.proposalReducer.currentSector);
    const dispatch = useDispatch();
    
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

    function handleAddSector() {
        let isEmpty = Object.keys(currentSector).length === 0
        if (!isEmpty) {
            setSelectedTab(1);
            dispatch({ type: 'ADD_SECTOR', proposalId: 0 });
        }
    }

    function sectorFieldDisplay(title, content) {
        if (!content) return null;
        return (
            <div className="reading-pane-title">
                <h3>{title}</h3>
                <div>{content}</div>
            </div>
        )
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
                        <h1 className="reading-pane-title">{currentSector.name || "Click a sector to preview..."}</h1>
                        {sectorFieldDisplay("Email", currentSector.linkedEmail)}
                        {sectorFieldDisplay("Image Location", currentSector.imageLoc)}
                        {sectorFieldDisplay("Division", currentSector.division)}
                        {sectorFieldDisplay("Description", currentSector.description)}
                    </div>

                    <div className="button-group">
                        <ButtonGroup variant="contained" size="large">
                            <Button onClick={openModal}>Edit Sector</Button>
                            <Button onClick={() => handleAddSector()}>Add Sector</Button>
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
                            <Button>Save Proposal</Button>
                        </ButtonGroup>
                    </div>
                </TabPanel>
            </div>
        </div>
    );
}

export default ReadingPane;