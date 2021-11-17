import React, { useEffect, useState, useCallback } from "react";
import "./Login.css";

import NavigatorBar from "../../components/navigator_bar/NavigatorBar";

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
  const loggedin = useSelector((state) => state.loginReducer.loggedIn);
  return (
    <div style={{ display: "flex" }}>
      {loggedin ? <NavigatorBar /> : null}
      <div className="Login">
        <Logo />
        <br />
        <br />
        {loggedin ? <Logout /> : <LoginBox />}
      </div>
    </div>
  );
}

function LoginBox() {
  // const [username, setUsername] = useState("");
  const username = useSelector((state) => state.loginReducer.username);
  const [password, setPassword] = useState("");

  const uid = useSelector((state) => state.loginReducer.uid);

  const dispatch = useDispatch();

  // help: https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios
  const authUser = async () => {
    const resp = await axios
      .post(
        `/api/authenticate/login/`,
        {
          emailAddress: username,
          password: password,
        }
        // {
        //   auth: {
        //     username: username,
        //     password: password,
        //   },
        // }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "SUCCESSFUL_LOGIN",
            payload: res.data["applicationUserId"],
          });
        } else {
          alert("Incorrect Username or Password");
        }
      })
      .catch((error) => {
        alert(error);
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
          // onChange={(event) => setUsername(event.target.value)}
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
          {/* https://serverless-stack.com/chapters/add-the-session-to-the-state.html */}
          {/* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */}
          {/* https://www.bezkoder.com/react-redux-jwt-auth/ */}
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
