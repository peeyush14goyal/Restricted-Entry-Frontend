import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "react-sidebar";
import bg2 from "./assets/bg3.png";
import "./Sidebar.css";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  title: {
    flexGrow: 1,
  },

  bgColor: {
    backgroundColor: "#302d40",
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
          <div onClick={() => setToggle(true)} className="sideBarDiv">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
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
            <img src={bg2} alt="menu-btn"></img>
            <div className="heading">Filter By Date</div>
            <div className="heading">Filter By User Id</div>
          </div>
        }
        open={toggle}
        onSetOpen={() => onSetSidebarOpen()}
        styles={{ sidebar: { background: "#302d40", color: "white" } }}
      ></Sidebar>
    </div>
  );
};

export default Header;
