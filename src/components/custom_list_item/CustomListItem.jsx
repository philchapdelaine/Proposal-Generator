import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';

let initialResumes = [
    {
        "ID": 10,
        "Name": "John Smith",
        "Sectors": [
            {
                "ID": 1,
                "Title": "Experience"
            },
            {
                "ID": 2,
                "Title": "Projects"
            },
            {
                "ID": 3,
                "Title": "Education"
            }
        ]
    },
    {
        "ID": 11,
        "Name": "Steve Jobs",
        "Sectors": [
            {
                "ID": 1,
                "Title": "Experience"
            },
            {
                "ID": 2,
                "Title": "Projects"
            },
            {
                "ID": 3,
                "Title": "Education"
            }
        ]
    },
    {
        "ID": 12,
        "Name": "Michael Chung",
        "Sectors": [
            {
                "ID": 1,
                "Title": "Experience"
            },
            {
                "ID": 2,
                "Title": "Projects"
            },
            {
                "ID": 3,
                "Title": "Education"
            }
        ]
    }
];

export default class CustomListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openItemID: null,
            resumes: initialResumes,
            proposals : [],
            loading: false // will be true when axios request is running
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteResume = this.handleDeleteResume.bind(this);
        this.handleDeleteSector = this.handleDeleteSector.bind(this);
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/user/2/proposal', {
        }).then((response) => {
            console.log(response);
            this.setState({ proposals: response.data });
            console.log(response);
            const resumes = response.data[0].resumes;
            console.log(resumes);
            // this.setState({ resumes: response[0].resumes });
        }, (error) => {
            console.log(error);
        })
    }

    handleClick(id) {
        // const newResumeClicked = this.state.openItemID !== id;
        // if (newResumeClicked) {
        //   this.setState({ openItemId : id });
        // } else {
        //   this.setState({ openItemId : null });
        // }

        this.setState({ openItemID: id })

    }

    handleDeleteResume(id) {
        this.setState(prevState => ({
            resumes: prevState.resumes.filter(resume => resume.ID !== id)
        }));
    } y

    handleDeleteSector(resumeId, sectorId) {
        const resumeToDelete = this.state.resumes.find(resumebyId => resumebyId.ID === resumeId);
        resumeToDelete.Sectors.filter(sector => sector.ID !== sectorId)
        this.setState(prevState => ({
            resumes: prevState.resumes.filter(sector => sector.ID !== sectorId)
        }));
    }

    handleSubmit() {
        if (this.state.resumes !== []) {
            this.setState({ loading: true })
            axios.post('http://localhost:5000/api/user/2/proposal', {
                resumes: this.state.resumes
            }).then((response) => {
                console.log(response);
                this.setState({ loading: false })
            }, (error) => {
                console.log(error);
            });
        }
    }

  render() {
     return (
      <div>
      <List>
      {this.state.resumes.map((resume, i) => (
      <div>
      <ListItem button key={resume.ID} onClick={() => this.handleClick(resume.ID)}>
        <ListItemText primary={resume.Name} />
        {this.state.openItemID === resume.ID ? <ExpandLess/> : <ExpandMore/>}
            <IconButton edge="end" onClick={() => this.handleDeleteResume(resume.ID)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
        <Collapse
                key={i}
                in={this.state.openItemID === resume.ID}
                timeout='auto'
                unmountOnExit
              >
              <List component='li' disablePadding key={resume.ID}>
                {resume.Sectors.map((sector, j) => {
                  return (
                    <ListItem button key={sector.ID}>
                      <ListItemText key={j} primary={sector.Title} />
                      <IconButton edge="end" >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
    <Divider />
    </div>
      ))}
    </List>
    </div>
     );
    }
  }