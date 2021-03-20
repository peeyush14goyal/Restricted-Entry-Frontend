import React, { useState, useEffect } from "react";
import db from "../firebase.config";
import "./admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByDate from "./FilterByDate";
import ColumnChart from "../components/Chart/ColumnChart";
import Header from "../components/Header/Header";
import Accordions from "../components/Accordion/Accordion";

// Home page for admin
let AdminHome = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [chartVal, setChartVal] = useState();

  let values = [];

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
    if (values.length > 0) {
      setChartVal(values);
    }

    // config for chart

    setLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header name="ADMIN" />
      {loaded && <ColumnChart values={chartVal} />}
      <div className="row">
        <Accordions data={data} />
      </div>
      {/* <FilterByDate /> */}
    </div>
  );
};

export default AdminHome;
