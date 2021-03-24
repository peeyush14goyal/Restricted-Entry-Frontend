import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CheckShowTable from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  root1: {
    maxWidth: 345,
    backgroundColor: "#302d40",
    color: "white",
    boxShadow: "0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    backgroundColor: "#2e2b3e",
    color: "white",
  },
  media: {
    height: 200,
    width: "90%",
    margin: "5%"
  },
  grey: {
      color: "rgb(157, 148, 173)",
  }
}));

export default function OneUser({data}) {
  const classes = useStyles();
  
  return(
    <div className="container mt-4">
        {data.map((x, i) => {
            return (
                    <div className="row align-items-center justify-content-between">
                        <div className="col-3">
                            <Card className={classes.root1}>
                                <CardMedia
                                className={classes.media}
                                image={x.Image}
                                title={x.Name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {x.Name}
                                    </Typography>
                                    <Typography variant="body2" component="p" className={classes.grey}>
                                        {x.User_ID}
                                    </Typography>
                                    <Typography variant="body2" component="p" className={classes.grey}>
                                        {x.Time.length / 2 > 10
                                        ? x.Time.length / 2 + " visits"
                                        : x.Time.length / 2 + " visit"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-12">
                                    <CheckShowTable data={x} />
                                </div>
                            </div>
                        </div>
                    </div>
            );
            })}
    </div>
    );
};