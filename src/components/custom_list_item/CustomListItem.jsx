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

import { connect } from 'react-redux';

class CustomListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openItemID: null,
            currentProposal: this.props.proposals[this.props.currentProposalIndex],
            proposals: this.props.proposals,
            loading: false // will be true when axios request is running
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteSector = this.handleDeleteSector.bind(this);
    }

    //     componentDidMount = () => {
    //       axios.get('http://localhost:5000/api/user/2/proposal', {
    //       }).then((response) => {
    //           console.log(response);
    //           this.setState({ proposals: response.data });
    //           console.log(response);
    //           const resumes = response.data[0].resumes;
    //           console.log(resumes);
    //           // this.setState({ resumes: response[0].resumes });
    //       }, (error) => {
    //           console.log(error);
    //       })
    //   }

    handleClick(id) {
        // const oldResumeClicked = this.state.openItemID === id;
        // console.log(newResumeClicked)
        // if (oldResumeClicked) {
        //   this.setState({ openItemId : 0 });
        //   console.log(this.state.openItemID)
        // }
        // } else {
        //   this.setState({ openItemId : null });
        // }
        this.setState({ openItemID: id })
    }

    handleDeleteSector(sectorID) {
        this.props.deleteSector(sectorID, this.state.currentProposal.proposalId);
    }

    handleSubmit() {
        this.setState({ loading: true })
        axios.post('http://localhost:5000/api/user/2/proposal', {
            resumes: this.state.currentProposal.resumes
        }).then((response) => {
            console.log(response);
            this.setState({ loading: false })
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
        <div>
        <List>
            {this.state.currentProposal === undefined ? <div></div> : this.state.currentProposal.resumes.map((sector, i) => (
        <div>
        <ListItem button key={sector.sectorID} onClick={() => this.handleClick(sector.sectorID)}>
            <ListItemText primary={`${sector.name} for ${sector.linkedEmail}`} secondary={`Division : ${sector.division}`}/>
            {this.state.openItemID === sector.sectorID ? <ExpandLess/> : <ExpandMore/>}
                <IconButton edge="end" onClick={() => this.handleDeleteSector(sector.sectorID)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Collapse
                    key={i}
                    in={this.state.openItemID === sector.sectorID}
                    timeout='auto'
                    unmountOnExit
                >
                <List component='li' disablePadding key={sector.sectorID}>
                    <ListItem>
                        <ListItemText primary={sector.description} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={sector.imageLoc} />
                    </ListItem>
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

function mapStateToProps(state) {
    return {
        proposals: state.proposalReducer.proposals,
        currentProposalIndex: state.proposalReducer.currentProposalIndex
    }
};


function mapDispatchToProps(dispatch) {
    return {
        deleteSector: (sectorID, proposalId) => { dispatch({type: 'DELETE_SECTOR', sectorID: sectorID, proposalId: proposalId}) }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);
