// import "./App.css";
import Logo from "./components/logo/logo";
import Button from "@material-ui/core/Button";
import MenuIcon from "@mui/icons-material/Menu";

import Navigator from "./components/navigator/Navigator";

function App() {
  return (
    <div>
      <header className="App-header">
        <Logo />
      </header>
      <div className="mainstage">
        <p>Resume Generator</p>
      </div>
      <Navigator />
    </div>
  );
}

export default App;

// #00569c the blue color
