import React from "react";
import AdminLogin from "./components/Admin/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminHome from "./components/Admin/home";
import { useCookies } from "react-cookie";

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
