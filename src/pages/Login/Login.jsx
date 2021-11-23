import React, { useEffect, useState, useCallback } from "react";
import "./Login.css";

import NavigatorBar from "../../components/navigator_bar/NavigatorBar";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Logo from "../../components/logo/logo";
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
  const loggedin = useSelector((state) => state.loginReducer.loggedIn);
  const imadmin = useSelector((state) => state.loginReducer["admin"]);
  return (
    <div style={{ display: "flex" }}>
      {loggedin ? <NavigatorBar /> : null}
      <div className="Login">
        <Logo />
        <br />
        <br />
        {loggedin ? (imadmin ? <Redirect to="/admin"/> : <Redirect to="/resume"/>): <LoginBox /> }
      </div>
    </div>
  );
}

function LoginBox() {
  const username = useSelector((state) => state.loginReducer.username);
  const [password, setPassword] = useState("");

  const uid = useSelector((state) => state.loginReducer.uid);

  const dispatch = useDispatch();

  // help: https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios
  const authUser = async () => {
    const resp = await axios
      .post(`/api/authenticate/login/`, {
        emailAddress: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "SUCCESSFUL_LOGIN",
            payload: res.data,
          });
        } else {
          alert("Incorrect Username or Password");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("Error " + err.response.status + ". Server is down");
        } else if (err.response.status === 500) {
          // alert("Error " + err.staus + ". Wrong Username or Password");
          alert("Incorrect Username or Password");
        } else {
          alert(err);
        }
      });
  };

  const handleSubmit = () => {
    authUser();
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
          onChange={(event) =>
            dispatch({
              type: "TRY_LOGIN",
              payload: { username: event.target.value },
            })
          }
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

function Welcome() {
  // TODO
  return (
    <div>
      <div>Welcome to Associated Engineering Resume Generator</div>
      <div>
        To your left is the navigator. 
      </div>
      <div>
        To your top right is the account management.{" "}
      </div>
    </div>
  );
}

export default Login;
