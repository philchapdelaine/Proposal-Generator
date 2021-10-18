import React, { useState } from "react";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import confirmModal from "../../components/confirmModal/confirmModal";

import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function validated() {
    return password === password2 && usernameUnique("");
  }

  function usernameUnique(un) {
    return true; // just placeholding
  }

  const handleSubmit = () => {
    if (validated()) {
      alert("Sign up under construction");
    } else {
      alert("one field is incorrect");
    }
  };

  return (
    <div className="Signup">
      REGISTRATION <br />
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
          className="SignUpBtn"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="CancelBtn"
          onClick={() => confirmModal("Check this out")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default Signup;
