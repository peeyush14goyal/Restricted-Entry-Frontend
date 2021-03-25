import React, { useState, useEffect } from "react";
import { getLineChart } from "../data/API";
import LineChart from "../components/Chart/LineChart";
import Header from "../components/Header/Header";
import "./home.css";

let Home = () => {
  const [lineChart, setLine] = useState([]);
  const lineChartData = async () => {
    const data_val = await getLineChart();
    data_val && setLine(data_val);
  };

  useEffect(() => {
    lineChartData();
  }, []);
  return (
    <div className="homeData">
      <Header name="ADMIN" />
      <div className="summaryData">
        <div>
          <div className="totalData">
            Total Users <div>15</div>
          </div>
          <div className="totalData">
            Total Visits <div>20</div>
          </div>
        </div>
        <div>
          {lineChart && lineChart.length > 0 && (
            <LineChart values={lineChart} />
          )}
        </div>
      </div>
      <div>Today's Statistics</div>
    </div>
  );
};

export default Home;
