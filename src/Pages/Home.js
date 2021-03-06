import React, { useState, useEffect } from "react";
import {
  getLineChart,
  getUserCount,
  getVisits,
  getDateTime,
} from "../data/API";
import LineChart from "../components/Chart/LineChart";
import Header from "../components/Header/Header";
import Accordions from "../components/Accordion/Accordion";
import "./home.css";
import PieChart from "../components/Chart/PieChart";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root1: {
    maxWidth: 250,
    textAlign: "center",
    minHeight: 150,
    // backgroundColor: "#302d40",
    color: "white",
    boxShadow: "0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
    backgroundColor: "#2e2b3e",
    color: "white",
  },
}));

let Home = () => {
  const [lineChart, setLine] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [visits, setVisits] = useState(0);
  const [data, setData] = useState();
  const [pieChart, setPie] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const classes = useStyles();

  const lineChartData = async () => {
    const data_val = await getLineChart();
    data_val && setLine(data_val);
  };

  const set_visit_count = async () => {
    const val = await getVisits();
    val && setVisits(val);
  };

  const fetchData = async () => {
    const d = new Date().toISOString();
    const data_array = await getDateTime(d.substr(0, 10));
    const val = await getUserCount();
    val && setUserCount(val);
    let loggedIn = 0;
    let loggedOut = 0;
    data_array.forEach((x) => {
      if (x.Time.length % 2 === 0) {
        loggedOut++;
      } else {
        loggedIn++;
      }
    });
    data_array && setData(data_array);

    data_array &&
      data_array.length > 0 &&
      setPie([
        { y: loggedIn, label: "Logged In" },
        { y: loggedOut, label: "Logged Out" },
      ]);

    if (data_array && data_array.length === 0) {
      setLoaded(false);
    }
  };

  useEffect(() => {
    lineChartData();
    set_visit_count();
    fetchData();
  }, []);
  return (
    <div className="homeData">
      <Header name="ADMIN" />
      <div className="summaryData">
        <div>
          <div className="totalData">
            <Card className={classes.root1}>
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  Total Users
                </Typography>

                <Typography gutterBottom variant="h2" component="h2">
                  <CountUp end={userCount} duration={1.5} />
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="totalData">
            <Card className={classes.root1}>
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  Total Visits
                </Typography>
                <Typography gutterBottom variant="h2" component="h2">
                  <CountUp end={visits} duration={1.5} decimals={1} />
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          {lineChart && lineChart.length > 0 && (
            <LineChart values={lineChart} />
          )}
        </div>
      </div>

      <div className="homeSection2">
        <div className="todayStats">Today's Statistics</div>
        {isLoaded ? (
          <div className="homeSection2__display">
            <div>
              {pieChart && pieChart.length > 0 && (
                <PieChart values={pieChart} />
              )}
            </div>
            <div></div>
            <div className="accordianHome">
              {data && <Accordions data={data} />}
            </div>
          </div>
        ) : (
          <div className="noDataFoundToday">
            <h1>No Data Available for today</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
