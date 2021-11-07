// import "./App.css";
import Logo from "./components/logo/logo";
import UserDropdown from "./components/user_dropdown/UserDropdown";

import MenuIcon from "@mui/icons-material/Menu";

import Navigator from "./components/navigator/Navigator";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


function App() {
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn);

  return (
    <div>
      <Router>
        <header className="App-header">
          <Logo />
        </header>
        <div className="mainstage">
          <p>Resume Generator</p>
        </div>
        {isLoggedIn ? <UserDropdown/> : <Redirect to="/login" /> }
        <Navigator/>
      </Router>
    </div>
  );
}

export default App;

// #00569c the blue color
