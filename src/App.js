import React from "react";
import AdminLogin from "./Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminHome from "./Pages/Home";
import { useCookies } from "react-cookie";
import FilterByDate from "./Pages/FilterByDate";

function App() {
  const [cookies] = useCookies();

  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          {cookies.user && cookies.password ? (
            <AdminHome />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/filterbydate">
          {cookies.user && cookies.password ? (
            <FilterByDate />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        <Route exact path="/">
          {cookies.user && cookies.password ? (
            <Redirect to="/home" />
          ) : (
            <AdminLogin />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
