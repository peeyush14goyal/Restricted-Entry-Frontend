import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "react-sidebar";
import bg from "./assets/bg4.png";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },

  bgColor: {
    backgroundColor: "#302d40",
  },
  headu1: {
    borderLeft: "3px solid white",
    padding: "10%",
  },
  head2: {
    textDecoration: "none",
    padding: "10%",
  },
  headu2: {
    borderLeft: "3px solid white",
    padding: "10%",
  },
}));

const Header = ({ name }) => {
  const [toggle, setToggle] = useState(false);
  const onSetSidebarOpen = (open) => {
    setToggle(open);
  };
  const classes = useStyles();
  return (
    <div className="home__Title">
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit">
            <PersonIcon /> <p className="gap">{name}</p>
          </Button>
        </Toolbar>
      </AppBar>

      <Sidebar
        sidebar={
          <div>
            <img src={bg} alt="menu-btn"></img>
            <div className="heading1">
              <NavLink
                to="/filterbydate"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                }}
                activeClassName={classes.headu1}
              >
                Filter By Date
              </NavLink>
            </div>
            <div className="heading2">
              <NavLink
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                }}
                activeClassName={classes.headu2}
              >
                Filter By User Id
              </NavLink>
            </div>
          </div>
        }
        open={toggle}
        onSetOpen={() => onSetSidebarOpen()}
        styles={{
          root: { maxWidth: "40%" },
          sidebar: { background: "#302d40", color: "white" },
        }}
      >
        <button onClick={() => onSetSidebarOpen(true)} className="menubutton">
          <MenuIcon />
        </button>
      </Sidebar>
    </div>
  );
};

export default Header;
