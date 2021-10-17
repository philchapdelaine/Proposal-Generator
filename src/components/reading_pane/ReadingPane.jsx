import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import "./ReadingPane.css";

function ReadingPane(){
    const [selectedTab, setSelectedTab] = React.useState(0);
    
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

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };


    return (
        <div className="reading-pane" >
        <div className="reading-pane-header"> Reading Pane </div>
        <div className="preview">
            <Tabs TabIndicatorProps={{style: {background:'#5F9EA0'}}} value={selectedTab} onChange={handleChange} centered>
                <Tab label="Sector Preview" index={0} />
                <Tab label="Proposal Draft" index={1} />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <div>
                    <h1>Sector Preview</h1>
                </div>
                <div className="sector-preview">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
                <div className="button-group">
                    <ButtonGroup variant="contained" size="large">
                        <Button>Edit Sector</Button>
                        <Button>Add Sector</Button>
                    </ButtonGroup>
                </div>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <div>
                    <h1>Proposal Draft</h1>
                </div>
                <div>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Sectors Added to Proposal 
                        </ListSubheader>
                        }
                    >
                        <ListItemButton>
                        <ListItemText primary="Employee 1" />
                        </ListItemButton>
                        <ListItemButton>
                        <ListItemText primary="Employee 1" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Employee 3" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Experience" />
                            </ListItemButton>
                        </List>
                        </Collapse>
                    </List>
                </div>
            </TabPanel>
        </div>
        </div>
        
    )
}

export default ReadingPane;