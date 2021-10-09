import React, { useState } from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

function Login() {
  return (
    <div className="Login">
      <Logo />
      <br />
      <br />
      <LoginBox />
    </div>
  );
}

const handleSubmit = () => {
  // TODO
  return;
};

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <TextField
        required
        label="Username"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        required
        label="Password"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      <div className="LoginBtnGrp">
        <Button variant="contained" color="primary" className="LoginBtn">
          Sign-in
        </Button>{" "}
        <Button color="primary" variant="outlined" className="LoginBtn">
          Sign-Up
        </Button>
      </div>
    </div>
  );
}

export default Login;
