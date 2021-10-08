import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="Login">
      Login
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
