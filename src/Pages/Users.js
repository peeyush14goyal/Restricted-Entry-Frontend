import React, { useState, useEffect } from "react";
import "./admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnChart from "../components/Chart/ColumnChart";
import Header from "../components/Header/Header";
import Accordions from "../components/Accordion/Accordion";
import { getChartValues, getUserData, verifyAdmin } from "../data/API";

// Home page for admin
let Users = () => {
  const [data, setData] = useState([]);

  // get data from firestore
  const fetchData = async () => {
    const data_array = await getUserData();
    console.log("Data Array is ", data_array);
    data_array && setData(data_array);
  };

  useEffect(() => {
    fetchData();
    verifyAdmin("admin", "admin");
  }, []);

  return (
    <div>
      <Header name="ADMIN" />

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
    </div>
  );
};

export default Users;
