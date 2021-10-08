import React from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";

import Logo from "../../components/logo/logo";

function Login() {
  return (
    <div className="Login">
      <Logo />
      <br />
      Login
      <LoginBox />
      <Button color="primary" variant="outlined" className="Login_Buttons">
        Sign-Up
      </Button>
    </div>
  );
}

function LoginBox() {
  return (
    <form>
      <label>
        Username:
        <AccountCircleIcon />
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Password:
        <LockIcon />
        <input type="password" name="password" />
      </label>
      <br />
      {/* <input type="submit" value="Submit" />{" "} */}
      <Button variant="contained" color="primary" className="Login_Buttons">
        Submit
      </Button>
    </form>
  );
}

export default Login;
