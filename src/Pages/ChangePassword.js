import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./admin.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { getAdmin, setCredentials, verifyAdmin } from "../data/API";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  txtColor: {
    color: "white",
  },
  bgColor: {
    backgroundColor: "#302d40",
  },
}));

// Login Page for Admin
let ChangePassword = () => {
  let history = useHistory();
  let [user, setUser] = useState();
  let [pass, setPass] = useState();
  const [, setCookie] = useCookies();

  const classes = useStyles();

  //   useEffect(() => {
  //     let getCredentials = async () => {
  //       let values = await getAdmin();
  //       setUser(values);
  //     };
  //     getCredentials();
  //   });

  const changeCredentials = (e) => {
    e.preventDefault();
    let values = {
      username: user,
      password: pass,
    };
    setCredentials(values);
  };

  return (
    <div>
      <div>
        <div className="home__Title">
          <AppBar position="static" className={classes.bgColor}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Welcome to Secure Management
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
      <div className="loginPage">
        <form
          className="credential"
          onSubmit={changeCredentials}
          autoComplete="off"
        >
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
              className={classes.root}
              InputLabelProps={{
                classes: {
                  txtColor: classes.txtColor,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.root,
                  txtColor: classes.txtColor,
                },
              }}
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
              className={classes.root}
              InputLabelProps={{
                classes: {
                  txtColor: classes.txtColor,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.root,
                  txtColor: classes.txtColor,
                },
              }}
            />
          </div>
          <div className="CPbuttonDiv">
            <button type="submit" className="CPbuttonComp">
              <div className="lockIcon">
                <LockOpenIcon />
              </div>
              <div>Change Credentials</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ChangePassword);
