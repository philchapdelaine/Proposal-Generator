import React, { useState } from "react";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Link, Redirect } from "react-router-dom";

import ConfirmModal from "../../components/confirmModal/confirmModal";

import "./Signup.css";

import isEmail from "validator/lib/isEmail";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Employee");

  const [open, setOpen] = useState(false);


  const [signinSuccess, setSigninSuccess] = useState(false);


  const [alertSignupFail, setAlertSignupFail] = useState(false);
  const [signupFailMsg, setSignupFailMsg] = useState("");
  const [signupFailSeverity, setSignupFailSeverity] = useState("error");

  const dispatch = useDispatch();

  const handleValidator = () => {
    setvalidator({...validator_init_state, })
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  function validated() {
    return (
      password === password2 &&
      emailAddressFormatValidator() &&
      password.length > 7 &&
      firstName !== "" &&
      lastName !== ""
    );
  }

  function emailAddressFormatValidator() {
    // https://help.xmatters.com/ondemand/trial/valid_email_format.htm
    // https://www.npmjs.com/package/validator
    return isEmail(username);
  }

  const register = async () => {
    await axios
      .post(`/api/authenticate/register/`, {
        FirstName: firstName,
        LastName: lastName,
        EmailAddress: username,
        Password: password,
        RoleType: role,
      })
      .then((res) => {
        if (res.status === 200) {
          setSigninSuccess(true);
          setTimeout(function () {
            dispatch({
              type: "SUCCESSFUL_LOGIN",
              payload: res.data,
            });
        }, 5000);
          // window.location = "/login";
        } else {
          alert(res);
        }
      })
      .catch((err) => {
        setAlertSignupFail(true);
        console.log(err);
        if (err.response.status === 400) {
          setSignupFailSeverity("error");
          setSignupFailMsg("Try another username")
        } else if (err.response.status == 404) {
          setSignupFailSeverity("error");
          setSignupFailMsg("Error " + err.response.status + ". Server is down")
        } else {
          setSignupFailMsg(err.message)
        }
      });
  };

  const handleSubmit = () => {
    if (!validated()) {
      setAlertSignupFail(true)
      if (!isEmail(username)) {
        setSignupFailMsg("Check username format")
        setSignupFailSeverity("warning")
      } else if (password.length < 8) {
        setSignupFailMsg("Passwords must be minimum of 8 characters")
        setSignupFailSeverity("warning")
      } else if (password !== password2) {
        setSignupFailMsg("Check both passwords are identical")
        setSignupFailSeverity("warning")
      } else if (firstName === "") {
        setSignupFailMsg("Please enter your first name")
        setSignupFailSeverity("warning")
      } else if (lastName === "") {
        setSignupFailMsg("Please enter your last name")
        setSignupFailSeverity("warning")
      }
    } else {
      register();
    }
  };

  return (
    <div className="Signup">
      <span className="title"> Sign Up </span> <br />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
      >
        <TextField
          required
          label="Username (email)"
          error={!isEmail(username)}
          helperText={
            emailAddressFormatValidator()
              ? ""
              : "Username must be a valid email format"
          }
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
        <br />
        <Checkbox
          name="role"
          checked={role !== "Employee"}
          onChange={() =>
            role === "Employee"
              ? setRole("Project Administrator")
              : setRole("Employee")
          }
        />
        <span className="admin-checkbox-text">Admin</span>
        <div className="SignupBtnGrp">
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
            Exit
          </Button>
        </div>
      </Box>
      {/* TODO */}
      <ConfirmModal
        confirmTitle="Quit signing up?"
        confirmMsg="All information will need to be re-typed if you quit now."
        handleClose={handleClose}
        open={open}
        handleProceed={
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined" className="LoginBtn">
              Quit
            </Button>
          </Link>
        }
      ></ConfirmModal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertSignupFail}
        onClose={() => setAlertSignupFail(false)}
        // key={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
      >
        <MuiAlert onClose={() => setAlertSignupFail(false)} severity={signupFailSeverity} sx={{ width: '100%' }} variant="filled">
          {signupFailMsg}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={signinSuccess }
        onClose={() => setSigninSuccess(false)}
        // key={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
      >
        <MuiAlert onClose={() => setSigninSuccess(false)} severity="success" sx={{ width: '100%' }} variant="filled">
        Sign up Successful! Signing in . . .
        </MuiAlert>
      </Snackbar>

    </div>
  );
}

export default Signup;
