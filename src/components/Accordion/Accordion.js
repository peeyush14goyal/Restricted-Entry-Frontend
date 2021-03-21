import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@material-ui/core/Typography";
import CheckTable from "../Table/CheckTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  primaryHeading: {
    width: "100%",
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
  txtColor: {
    color: "white",
  },
}));

const Accordions = ({ data }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  // Accordion automatic close
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
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
                <Typography className={classes.heading}>{x.Name}</Typography>
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
                      alt="NOT AVAILABLE"
                      className="home__userImg"
                    />
                  </div>

                  <div className="col-8">
                    <div className="registerTitle">
                      <text className="registerColor">Registered On:</text>{" "}
                      <b>{x.Date}</b>
                    </div>
                    <CheckTable data={x} />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default Accordions;
