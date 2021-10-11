import React, { useState } from "react";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Signup">
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
      <br />
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
      <br />
      <TextField
        required
        label="Retype password"
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
        <Button
          variant="contained"
          color="primary"
          className="LoginBtn"
          // onClick={() => handleSubmit()}
        >
          Finish Registration
        </Button>
      </div>
    </div>
  );
}

function doubleCheckPW(password1, password2) {
  return password1 === password2;
}

function usernameTaken(username) {
  return false; // just placeholding
}

export default Signup;
