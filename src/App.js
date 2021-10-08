import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./assets/ae-300x132.jpg";
// import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" />
      </header>
      <div className="mainstage">
        <p>Resume Generator</p>
      </div>
      <Login></Login>
      <Home></Home>
    </div>
  );
}

export default App;

// #00569c the blue color
