import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  bgColor: {
    backgroundColor: "#302d40",
  },
}));

const Header = ({ name }) => {
  const classes = useStyles();
  return (
    <div className="home__Title">
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit">
            <PersonIcon /> <p className="gap">{name}</p>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
