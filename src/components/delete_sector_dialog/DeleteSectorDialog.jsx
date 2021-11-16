import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class DeleteSectorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }

    handleClickOpen() {
        this.setState({open: true})
    };

    handleClickClose() {
        this.setState({open: false})
    };

    deleteSector() {
        this.props.deleteSector();
        this.setState({open: false})
    }

    render() {
        return (
            <div>
            <Button variant="outlined" color = "error" onClick={() => {this.handleClickOpen()}}>
                Delete
            </Button>
            <Dialog
                open={this.state.open}
                onClose={() => {this.handleClickClose()}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete Sector?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {this.handleClickClose()}}>Cancel</Button>
                <Button onClick={() => {this.deleteSector()}} autoFocus>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

DeleteSectorDialog.propTypes = {
    deleteSector: PropTypes.func
  };

export default DeleteSectorDialog;