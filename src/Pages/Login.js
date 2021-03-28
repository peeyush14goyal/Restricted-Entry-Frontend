import React, { useState } from "react";
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
import { verifyAdmin } from "../data/API";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
let AdminLogin = () => {
  let history = useHistory();
  let [user, setUser] = useState();
  let [pass, setPass] = useState();
  const [, setCookie] = useCookies();
  const [pos, setPos] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [errorPos, setErrorPos] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = pos;

  const handleClick = (newState) => {
    setPos({ open: true, ...newState });
  };

  const handleClose = () => {
    setPos({ ...pos, open: false });
  };

  const handleErrorClick = (newState) => {
    setErrorPos({ open: true, ...newState });
  };

  const handleErrorClose = () => {
    setErrorPos({ ...errorPos, open: false });
  };

  const classes = useStyles();

  // After Login check the credentials of user
  let checkCredentials = (e) => {
    e.preventDefault();
    verifyAdmin(user, pass).then((res) => {
      if (res === true) {
        handleClick({ vertical: "top", horizontal: "center" });
        setTimeout(() => {
          history.push("/home");
          setCookie("user", "101", { maxAge: 3600 });
          setCookie("password", "101", { maxAge: 3600 });
        }, 1000);
      } else {
        handleErrorClick({ vertical: "top", horizontal: "center" });
        setTimeout(() => window.location.reload(), 2000);
      }
    });
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success">
          Login Successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorPos.open}
        autoHideDuration={5000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleErrorClose} severity="error">
          User Not Found! Retry
        </Alert>
      </Snackbar>
      <div className="loginPage">
        <form
          className="credential"
          onSubmit={checkCredentials}
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
              onChange={(e) => setUser(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
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
          <div className="buttonDiv">
            <button type="submit" className="buttonComp">
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

export default withStyles(useStyles)(AdminLogin);
