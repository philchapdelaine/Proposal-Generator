import { List } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Collapse, Divider, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";

const ExpandSections = (props) => {
  const [openItemIDs, setOpenItemIDs] = useState([]);

  let result;

  const handleExpand = (id) => {
    if (openItemIDs.includes(id)) {
      const newIDs = openItemIDs.filter((thisID) => thisID !== id);
      setOpenItemIDs(newIDs);
    } else {
      setOpenItemIDs([...openItemIDs, id]);
    }
  };

  result = props.resumes.map((sector, i) => {

    var showImgPreview = false;
    if (sector.imageLoc) {
      const isValidImgURL = sector.imageLoc.match(/\.(jpg|jpeg|gif|png)$/) != null;
      if (isValidImgURL) showImgPreview = true;
    }
  
    return (
      <div>
        <ListItem
          button
          key={sector.sectorID}
          onClick={() => handleExpand(sector.sectorID)}
        >
          <ListItemText
            primary={`${sector.name} for ${sector.linkedEmail}`}
            secondary={`Division: ${sector.division}`}
          />
          {openItemIDs.includes(sector.sectorID) ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <Collapse
          key={i}
          in={openItemIDs.includes(sector.sectorID)}
          timeout="auto"
          unmountOnExit
        >
          <div>
            <List component="li" disablePadding key={sector.sectorID}>
              <ListItem>
                <ListItemText primary={sector.description} />
              </ListItem>
              <ListItem>
                <ListItemText primary={ showImgPreview ? 
                  (<div><img className="image-preview" src={sector.imageLoc}/> <br/> {sector.imageLoc}</div> )
                  : sector.imageLoc} />
              </ListItem>
            </List>
          </div>
        </Collapse>
        <Divider />
      </div>
    );
  });

  return (
    <>
      {result}
    </>
  );

};

export default ExpandSections;
