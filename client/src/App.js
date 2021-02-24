import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import CreateUser from "./Components/CreateUser";
import ListUsers from "./Components/ListUsers";

function App() {
  return (
    <Fragment>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/" class="font-weight-bold">
                List Of Users
              </Link>
            </li>
            <li>
              <Link to="/CreateUser" class="font-weight-bold">
                Add User
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <ListUsers />
            </Route>
            <Route exact path="/CreateUser">
              <CreateUser />
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
