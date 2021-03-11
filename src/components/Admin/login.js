import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TextField from "@material-ui/core/TextField";
import "./admin.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
}));

let AdminLogin = () => {
  let history = useHistory();
  let [user, setUser] = useState();
  let [pass, setPass] = useState();

  const classes = useStyles();

  let checkCredentials = () => {
    if (user === "admin" && pass === "admin") {
      // <Redirect to="/home" />;
      history.push("/home");
    } else {
      //<Redirect to="/" />;
      history.push("/");
    }
  };
  return (
    <div>
      <div>
        <div className="home__Title">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Welcome to Secure Management
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
      <div className="loginPage">
        <form className="credential" onSubmit={checkCredentials}>
          <div>
            <TextField
              id="outlined-search"
              required
              label="Username"
              type="search"
              variant="outlined"
              inputProps={{ style: { fontSize: 25 } }}
              value={user}
              onBlur={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-search"
              required
              label="Password"
              type="password"
              variant="outlined"
              inputProps={{ style: { fontSize: 25 } }}
              value={pass}
              onBlur={(e) => setPass(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">
              <div className="lockIcon">
                <LockOpenIcon />
              </div>
              <div>Login</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
