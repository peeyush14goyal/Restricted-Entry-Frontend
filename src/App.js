import React from "react";
import AdminLogin from "./components/Admin/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminHome from "./components/Admin/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <AdminHome />
        </Route>

        <Route exact path="/">
          <AdminLogin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
