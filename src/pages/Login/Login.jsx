import React from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

function Login() {
  return (
    <div className="Login">
      <Logo />
      <br />
      Login
      <LoginBox />
    </div>
  );
}

function LoginBox() {
  return (
    <div>
      <TextField label="Username" variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
      >
      </TextField>
      <TextField label="Password" variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      >
      </TextField>
      <div>
        <Button variant="contained" color="primary" className="LoginBtn">
          Submit
        </Button>
        <Button color="primary" variant="outlined" className="LoginBtn">
          Sign-Up
        </Button>
      </div>
    </div>
  );
}

export default Login;
