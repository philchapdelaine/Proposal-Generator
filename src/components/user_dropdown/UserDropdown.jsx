import React from "react";
import "./UserDropdown.css";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


function UserDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.loginReducer.username);
  const isAdmin = useSelector((state) => state.loginReducer.admin);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <div className="user-dropdown">
      <React.Fragment>
        <Box className="logout-box">
          <IconButton onClick={handleClick} size="small" >
            <PersonIcon className="logout-icon" fontSize="medium" />
            <span>
              {username}
              {isAdmin ? <div className="admin-tag"> Admin </div> : null}
            </span>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              pl: 3,
              pr: 3,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: 10,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>

              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>

  );
}

export default UserDropdown;