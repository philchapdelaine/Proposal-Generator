import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import RecentlyViewed from "../../components/recently_viewed/RecentlyViewed";
import "./NavigatorBar.css";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function NavigatorBar(props) {
  // delete this isAdmin and replace with the other one after testing
  // const isAdmin = true;
  const isAdmin = useSelector((state) => state.loginReducer.admin);
  const dispatch = useDispatch();

  function handleCreateProposal() {
    // set to the as of yet uncreated proposal index flag of -1,
    // which will be changed when proposal is actually created and has an index
    dispatch({ type: "SET_PROPOSAL_INDEX", currentProposalIndex: -1 });
  }

  return (
    <div className="nav-bar">
    <Paper elevation={6} >
        <Box p={1}
        sx={{
            padding: "0px"
          }}
          >
      <nav className= {props.isCreateProposal ? "nav-buttons-hide-container" : "" }>
      <Link to="/admin" style={{ textDecoration: "none" }}>
        <button className="nav-button"> Home </button>
      </Link>  
      <Link to="/resume" style={{ textDecoration: "none" }}>
          <button className="nav-button"> Resume </button>
        </Link>
        {/*isAdmin ? (
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <button className="nav-button"> Admin </button>
          </Link>
        ) : null*/}
      </nav>
      <div>
        {" "}
        {props.isCreateProposal ? (
          <RecentlyViewed
            onSectorClick={props.onSectorClick}
            resumes={props.recentlyViewed}
            className="recently-viewed"
          >
            {props.recentlyViewed}
          </RecentlyViewed>
        ) : null}
      </div>
      </Box>
      </Paper>
    </div>
  );
}

export default NavigatorBar;
