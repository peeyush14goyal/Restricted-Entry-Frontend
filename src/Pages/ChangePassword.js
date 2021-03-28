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
import Header from "../components/Header/Header";
import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

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

  const [pos, setPos] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = pos;

  const handleClick = (newState) => () => {
    setPos({ open: true, ...newState });
  };

  const handleClose = () => {
    setPos({ ...pos, open: false });
  };

  const classes = useStyles();
  const changeCredentials = (e) => {
    e.preventDefault();
    let values = {
      username: user,
      password: pass,
    };
    setCredentials(values);
    handleClick({ vertical: "top", horizontal: "center" });
  };

  return (
    <div>
      <div>
        <div className="home__Title">
          <Header name="ADMIN" />
        </div>
        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="Credentials Changed Sucessfully"
          key={vertical + horizontal}
        /> */}
        {/* <Snackbar
          open={pos.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar> */}
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
