import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Logo from "./components/logo/logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <div className="mainstage">
        <p>Resume Generator</p>
      </div>
      <Login />
      <Home />
    </div>
  );
}

export default App;

// #00569c the blue color
