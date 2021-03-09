import db from "./firebase.config";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  var dateVal = "2021-03-08";

  const fetchData = async () => {
    const response = db
      .collection("User_data")
      .doc(dateVal)
      .collection("Authorised");

    // let dataVal = await response.get().then((val) => {
    //   console.log("val is ", val);
    //   val.forEach((docVal) => {
    //     console.log("id is ", docVal.collection("Authorised").docs[0].data());
    //   });
    // });
    let dataVal = await response.get();

    console.log("DataVal is ", dataVal);

    let data_array = [];

    console.log("DataVal is ", dataVal);

    dataVal &&
      dataVal.docs.forEach((x) => {
        console.log("Render x is ", x);
        data_array = [...data_array, x.data()];
      });

    data_array && setData(data_array);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>Hello World should work</p>
      {data.map((x, i) => {
        return (
          <div key={x.Name}>
            <div>Name: {x.Name}</div>
            <div>
              <img src={x.Image} alt="person-im" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
