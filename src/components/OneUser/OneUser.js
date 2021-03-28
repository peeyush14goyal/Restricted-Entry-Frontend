import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CheckShowTable from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    backgroundColor: "#302d40",
    color: "white",
    boxShadow: "0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    backgroundColor: "#2e2b3e",
    color: "white",
  },
  root1: {
    maxWidth: 600,
    minHeight: 200,
    backgroundColor: "#302d40",
    color: "white",
    backgroundColor: "#2e2b3e",
    color: "white",
  },
  media: {
    height: 200,
    flex: 1,
    width: "90%",
    margin: "5%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  grey: {
<<<<<<< HEAD
    color: "rgb(157, 148, 173)",
=======
    color: "#dbd6f8",
  },
  grey1: {
    color: "#dbd6f8",
    fontSize: "20px",
    marginTop: "15px",
>>>>>>> 016ac5dc4b2f2598e5d20a09285c5def51ef6478
  },
}));

export default function OneUser({ data }) {
  const classes = useStyles();

  return (
    <div className="container mt-4 justify-content-center">
      {data.map((x, i) => {
        return (
          <div>
            <div className="row">
              <div className="col-7 offset-3 mb-5">
                <Card className={classes.root}>
                  <div className="row align-items-center">
                    <div className="col-5">
                      <Card className={classes.root1}>
                        <CardMedia
                          className={classes.media}
                          image={x.Image}
                          title={x.Name}
                        />
                      </Card>
                    </div>
                    <div className="col-6">
                      <Card className={classes.root1}>
                        <CardContent className={classes.content}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {x.Name}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="p"
                            className={classes.grey}
                          >
                            {x.User_ID}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="p"
<<<<<<< HEAD
                            className={classes.grey}
=======
                            className={classes.grey1}
>>>>>>> 016ac5dc4b2f2598e5d20a09285c5def51ef6478
                          >
                            {x.Time.length / 2 > 10
                              ? x.Time.length / 2 + " visits"
                              : x.Time.length / 2 + " visit"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col-11 offset-1">
                <CheckShowTable data={x} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
