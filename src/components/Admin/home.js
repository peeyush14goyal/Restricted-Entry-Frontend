import React, { useState, useEffect } from "react";
import db from "../../firebase.config";
import "./admin.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image } from "reactstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 450,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

let AdminHome = () => {
  const [data, setData] = useState([]);

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchData = async () => {
    const response = db.collection("User_Data");

    let dataVal = await response.get();

    let data_array = [];

    dataVal &&
      dataVal.docs.forEach((x) => {
        data_array = [...data_array, x.data()];
      });

    data_array && setData(data_array);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ backgroundColor: "grey" }}>
      <div className="home__Title">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Dashboard
            </Typography>
            <Button color="inherit">
              <PersonIcon /> <p className="gap">Admin</p>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="row">
        <div className="col-10 offset-1">
          {data.map((x, i) => {
            console.log(x.Time);
            return (
              <div
                key={x.User_ID}
                className="home__userDetailsBack col-8 offset-2 mt-5 mb-5"
              >
                <Accordion
                  expanded={expanded === `panel${i + 1}`}
                  onChange={handleChange(`panel${i + 1}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      {x.Name}
                    </Typography>
                    <Typography
                      className={classes.secondaryHeading}
                    ></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={x.Image}
                          alt="person-im"
                          className="home__userImg"
                        />
                      </div>

                      <div className="col-8">
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="right">
                                  Check-In
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Check-Out
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {x.Time.map((time, i) => {
                                if (i % 2 === 0) {
                                  return (
                                    <StyledTableRow key={time.substr(0, 10)}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {time.substr(0, 10)}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {time.substr(11)}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {x.Time[i + 1].substr(11)}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                }
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
