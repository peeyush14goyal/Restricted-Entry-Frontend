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

let Home = () => {
  const [lineChart, setLine] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [visits, setVisits] = useState(0);
  const [data, setData] = useState();
  const [pieChart, setPie] = useState();

  const lineChartData = async () => {
    const data_val = await getLineChart();
    data_val && setLine(data_val);
  };

  const set_user_count = async () => {
    const val = await getUserCount();
    val && setUserCount(val);
  };

  const set_visit_count = async () => {
    const val = await getVisits();
    val && setVisits(val);
  };

  const fetchData = async () => {
    const data_array = await getDateTime("2021-03-25");
    data_array && setData(data_array);

    if (data && data.length > 0 && userCount > 0) {
      setPie([
        { y: data_array.length, label: "Logged In" },
        { y: userCount - data_array.length, label: "Not Logged In" },
      ]);
    }
  };

  useEffect(() => {
    lineChartData();
    set_user_count();
    set_visit_count();
    fetchData();
  }, []);
  return (
    <div className="homeData">
      <Header name="ADMIN" />
      <div className="summaryData">
        <div>
          <div className="totalData">
            Total Users <div>{userCount}</div>
          </div>
          <div className="totalData">
            Total Visits <div>{visits}</div>
          </div>
        </div>
        <div>
          {lineChart && lineChart.length > 0 && (
            <LineChart values={lineChart} />
          )}
        </div>
      </div>
      <div>
        <div>Today's Statistics</div>
        <div>
          <div>{pieChart && <PieChart values={pieChart} />}</div>
          <div>{data && <Accordions data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
