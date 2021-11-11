import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default class CustomListItem extends React.Component {
  render() {
    const docs = data.documents;  //this coming from a json file, please see below for the sample json
     return (
      <div>
        <List component='nav' aria-labelledby='nested-list-subheader'>
          {docs.map(doc => {
            return (
              <CustomizedListItem key={doc.id} doc={doc} />
            );
          })}
        </List>     
      </div>
    );
  }
}

 class CustomizedListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
       this.setState(prevState => ({
         open: !prevState.open
       }));
    }

  render(){
  const { doc } = this.props;
  return (
    <div>
      <ListItem button key={doc.Id} onClick={this.handleClick}>
        <ListItemText primary={doc.Name} />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
            <IconButton edge="end">
                <DeleteIcon />
            </IconButton>
        </ListItem>
      <Collapse
        key={doc.Sheets.Id}
        in={this.state.open}
        timeout='auto'
        unmountOnExit
      >
      <List component='li' disablePadding key={doc.Id}>
        {doc.Sheets.map(sheet => {
          return (
            <ListItem button key={sheet.Id}>
              <ListItemIcon>
                {/* <InsertDriveFileTwoToneIcon /> */}
              </ListItemIcon>
              <ListItemText key={sheet.Id} primary={sheet.Title} />
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
    <Divider />
    </div>
    )
  }
}

const data = {
  "documents": [
    {
      "Id": 1,
      "Name": "John Smith",
      "Sheets": [
        {
          "Id": 1,
          "Title": "Experience"
        },
        {
          "Id": 2,
          "Title": "Projects"
        },
        {
          "Id": 3,
          "Title": "Education"
        }
      ]
    },
    {
      "Id": 1,
      "Name": "Steve Jobs",
      "Sheets": [
        {
          "Id": 1,
          "Title": "Previous Roles"
        },
        {
          "Id": 2,
          "Title": "Projects"
        }
      ]
    }
  ]
}
