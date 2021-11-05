import React, { useState } from "react";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";

import ConfirmModal from "../../components/confirmModal/confirmModal";

import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  function validated() {
    return password === password2 && usernameUnique("") && password.length > 7;
  }

  function usernameUnique(un) {
    return true; // just placeholding
  }

  function emailAddressFormatValidator() {
    // https://help.xmatters.com/ondemand/trial/valid_email_format.htm
    return true; // just placeholding
  }

  function register() {
    axios
      .post("https://localhost:5000/api/autheticate/register", {
        FirstName: firstName,
        LastName: lastName,
        EmailAddress: email,
      })
      .then();
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
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
      >
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
          error={password.length < 8}
          label="Password"
          variant="outlined"
          helperText={
            password.length < 8 ? "Passwords must be at least 8 characters" : ""
          }
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
        <br />
        <TextField
          required
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          required
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          required
          label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="LoginBtnGrp">
          <Button
            variant="contained"
            color="primary"
            className="SignUpBtn"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>{" "}
          <Button
            variant="outlined"
            color="secondary"
            className="CancelBtn"
            onClick={() => {
              handleOpen();
            }}
          >
            Cancel
          </Button>
        </div>
      </Box>
      {/* TODO */}
      <ConfirmModal
        confirmTitle="Quit signing up?"
        confirmMsg="All information will need to be re-typed if you quit now."
        handleClose={handleClose}
        open={open}
      ></ConfirmModal>
    </div>
  );
}

export default Signup;
