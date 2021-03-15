import React, { useState, useEffect } from "react";
import db from "../../firebase.config";
import "./admin.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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
import CanvasJSReact from "../../canvasJs/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet1", [
  //colorSet Array
  "#7524d8",
  "#36aeed",
  "#eb98cc",
]);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#7761ea",
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
  primaryHeading: {
    width: "90%",
    margin: "0 auto",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "white",
  },
  shadowCss: {
    boxShadow: "0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    backgroundColor: "#2e2b3e",
    color: "white",
  },
  spaceLeft: {
    marginLeft: "50%",
  },
  bgColor: {
    backgroundColor: "#302d40",
  },
  txtColor: {
    color: "white",
  },
}));

// Home page for admin
let AdminHome = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [options, setOptions] = useState({ data: [] });
  let values = [];

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  // Accordion automatic close
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // get data from firestore
  const fetchData = async () => {
    const response = db.collection("User_Data");

    let dataVal = await response.get();

    let data_array = [];

    dataVal &&
      dataVal.docs.forEach((x) => {
        data_array = [...data_array, x.data()];
      });

    data_array && setData(data_array);

    data_array.forEach((x, i) => {
      values = [...values, { label: x.Name, y: x.Time.length / 2 }];
    });

    // config for chart
    setOptions({
      backgroundColor: "#2e2b3e",

      colorSet: "customColorSet1",
      axisX: {
        labelFontColor: "white",
      },
      axisY: {
        labelFontColor: "white",
      },
      title: {
        text: "CheckIn - CheckOut",
        fontColor: "white",
        fontFamily: "Arial",
      },
      data: [
        {
          type: "column",
          dataPoints: values,
        },
      ],
    });
    setLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let d = new Date();
  let month = d.getMonth();
  let year = d.getFullYear();
  return (
    <div>
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
              <PersonIcon /> <p className="gap">Admin</p>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      {loaded && options.data.length > 0 && (
        <div className="row">
          <div className="col-6 text-center mt-4 offset-3">
            <CanvasJSChart options={options} />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-10 offset-1">
          {data.map((x, i) => {
            return (
              <div key={x.User_ID} className="col-8 offset-2 mt-4 mb-4">
                <Accordion
                  expanded={expanded === `panel${i + 1}`}
                  onChange={handleChange(`panel${i + 1}`)}
                  className={classes.shadowCss}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.txtColor} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.primaryHeading}
                  >
                    <Typography className={classes.heading}>
                      {x.Name}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {x.User_ID}
                    </Typography>
                    <Typography className={classes.spaceLeft}>
                      {x.Time.length / 2 > 1
                        ? x.Time.length / 2 + " days"
                        : x.Time.length / 2 + " day"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="row">
                      <div className="col-4 home__userImgDiv">
                        <img
                          src={x.Image}
                          alt="person-im"
                          className="home__userImg"
                        />
                      </div>

                      <div className="col-8">
                        <div className="registerTitle">
                          <text className="registerColor">Registered On:</text>{" "}
                          <b>{x.Date}</b>
                        </div>
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
                                        {x.Time[i + 1]
                                          ? x.Time[i + 1].substr(11)
                                          : "Not Checked out yet"}
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
