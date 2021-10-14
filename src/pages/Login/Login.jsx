import React, { useState } from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import { useSelector, useDispatch } from "react-redux";

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

  // const selector = useSeletor()
  const dispatch = useDispatch();

  const validated = () => {
    // TODO
    return username === "username" && password === "password";
  };
  const handleSubmit = () => {
    // TODO
    // if not validated, tell user
    // for now just give under construction alert
    if (validated()) {
      dispatch({ type: "SUCCESSFUL_LOGIN" });
      alert("Under Construction, but welcome," + username);
    } else {
      alert("Incorrect Username or Password");
    }
  };

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
        <Button
          variant="contained"
          color="primary"
          className="LoginBtn"
          onClick={() => handleSubmit()}
        >
          Sign-in
        </Button>{" "}
        {/* https://serverless-stack.com/chapters/add-the-session-to-the-state.html */}
        <Link to="/signup">
          <Button color="primary" variant="outlined" className="LoginBtn">
            Sign-Up
          </Button>
        </Link>
      </div>
    </div>
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
