import React, { useState, useEffect } from "react";
import db from "../firebase.config";
import "./admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByDate from "./FilterByDate";
import ColumnChart from "../components/Chart/ColumnChart";
import Header from "../components/Header/Header";
import Accordions from "../components/Accordion/Accordion";
import Sidebar from "../components/Sidebar/Sidebar";
import { getChartValues, getUserData } from "../data/API";

// Home page for admin
let AdminHome = () => {
  const [data, setData] = useState([]);

  // get data from firestore
  const fetchData = async () => {
    const data_array = await getUserData();
    data_array && setData(data_array);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header name="ADMIN" />
      <Sidebar />
      {data && data.length > 0 ? (
        <>
          <ColumnChart values={getChartValues(data)} />
          <div className="row">
            <Accordions data={data} />
          </div>
        </>
      ) : (
        <div></div>
      )}
      {/* <FilterByDate /> */}
    </div>
  );
};

export default AdminHome;
