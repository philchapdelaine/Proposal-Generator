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
  const [password2, setPassword2] = useState("");
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
        error={password != password2}
        label="Retype password"
        variant="outlined"
        helperText={password != password2 ? "Passwords must match" : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        value={password2}
        onChange={(event) => setPassword2(event.target.value)}
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

const handleSubmit = () => {
  // if validated() {
  //   alert("Sign up under construction")
  // }
  // else {
  //   alert("one field is incorrect")
  // }
};

function validated() {
  // doubleCheckPW() && usernameTaken();
  return;
}

function doubleCheckPW(password1, password2) {
  return password1 === password2;
}

function usernameTaken(username) {
  return false; // just placeholding
}

export default Signup;
