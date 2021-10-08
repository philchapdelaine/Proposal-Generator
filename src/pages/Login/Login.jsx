import React from "react";
import "./Login.css";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Login() {
  return (
    <div className="Login">
      Login
      <LoginBox />
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
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
