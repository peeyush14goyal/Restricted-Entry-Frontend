import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Sidebar from "react-sidebar";
import bg from "./assets/bg4.png";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
  headu: {
    // borderLeft: "3px solid white",
    color:"#939396 !important",
  },
}));

const Header = ({ name }) => {
  let history = useHistory();
  const [, removeCookie] = useCookies();
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSetSidebarOpen = (open) => {
    setToggle(open);
  };

  const logout = () => {
    console.log("Logout");
    removeCookie("user", { maxAge: 0 });
    removeCookie("password", { maxAge: 0 });
  };

  const classes = useStyles();
  return (
    <div className="home__Title">
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <div>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <PersonIcon /> <p className="gap">{name}</p>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link
                  to="/change_password"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Change Credentials
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Sidebar
        sidebar={
          <div>
            <NavLink
              to="/home"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <img src={bg} alt="menu-img" width="100%"></img>
            </NavLink>
            <div className="heading container-fluid">
              <NavLink
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                  className: "row"
                }}
                activeClassName={classes.headu}
              >
                <div className = "col-12">Home</div>
              </NavLink>
            </div>
            <div className="heading container-fluid">
              <NavLink
                to="/filterbydate"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                  className: "row"
                }}
                activeClassName={classes.headu}
              >
                <div className = "col-12">Filter By Date</div>
              </NavLink>
            </div>
            <div className="heading container-fluid">
              <NavLink
                to="/users"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                  className: "row"
                }}
                activeClassName={classes.headu}
              >
                <div className = "col-12">All Users Statistics</div>
              </NavLink>
            </div>
            <div className="heading container-fluid">
              <NavLink
                to="/filterbyuserid"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10%",
                  className: "row"
                }}
                activeClassName={classes.headu}
              >
                <div className = "col-12">Filter By User Id</div>
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
