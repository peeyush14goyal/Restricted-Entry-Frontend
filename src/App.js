import React, { useEffect, useState } from "react";
import AdminLogin from "./Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import FilterByDate from "./Pages/FilterByDate";
import SearchUser from "./Pages/SearchUser";
import ChangePassword from "./Pages/ChangePassword";
import FilterByUserId from "./Pages/FilterByUserId";
import Home from "./Pages/Home";
import Users from "./Pages/Users";

function App() {
  const [cookies] = useCookies();

  return (
    <Router>
      {cookies.user &&
      cookies.user.length > 0 &&
      cookies.password &&
      cookies.password.length > 0 ? (
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>

          <Route exact path="/filterbydate">
            <FilterByDate />
          </Route>
          <Route exact path="/searchuser">
            <SearchUser />
          </Route>

          <Route exact path="/change_password">
            <ChangePassword />
          </Route>

          <Route exact path="/filterbyuserid">
            <FilterByUserId />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      ) : (
        <>
          <Redirect to="/" />

          <Route exact path="/">
            <AdminLogin />
          </Route>
        </>
      )}
    </Router>
  );
}

export default App;
