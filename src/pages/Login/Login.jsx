import React, { useState } from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function Login() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const loggedin = useSelector((state) => state.loginReducer.loggedIn);
  return (
    <div className="Login">
      <Logo />
      <br />
      <br />
      {loggedin ? <Logout /> : <LoginBox />}
    </div>
  );
}

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [trueUN, setTrueUN] = useState(false);

  // const selector = useSeletor()
  const dispatch = useDispatch();

  function getUser(userID) {
    // placeholder
    axios.get(`http://localhost:5000/api/user/${userID}`).then((res) => {
      const data = res.data;
      console.log(data);
      setTrueUN(data["emailAddress"] === username);
      setFirstName(data["firstName"]);
      setLastName(data["lastName"]);
    });
    console.log(trueUN);
    return trueUN;
  }

  const validated = () => {
    // TODO
    // return username === "username"  && password === "password";
    return getUser(1) && password === "password";
  };
  const handleSubmit = () => {
    // TODO
    // if not validated, tell user
    // for now just give under construction alert
    if (validated()) {
      dispatch({ type: "SUCCESSFUL_LOGIN" });
      alert("Under Construction, but welcome," + firstName + lastName);
    } else {
      alert("Incorrect Username or Password");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "30ch" },
      }}
    >
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
          <Button
            variant="contained"
            color="primary"
            className="LoginBtn"
            onClick={() => handleSubmit()}
          >
            Sign-in
          </Button>{" "}
          {/* https://serverless-stack.com/chapters/add-the-session-to-the-state.html */}
          {/* {/* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */}{" "}
          */}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined" className="LoginBtn">
              Sign-Up
            </Button>
          </Link>
        </div>
      </div>
    </Box>
  );
}

function Logout() {
  // const loggedin = useSelector((state) => state.loginReducer.loggedIn);
  const dispatch = useDispatch();
  // TODO
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch({ type: "LOG_OUT" })}
      >
        {/* need a confirmation modal for the logout dispatch fn */}
        LogOut
      </Button>
    </div>
  );
}

export default Login;
