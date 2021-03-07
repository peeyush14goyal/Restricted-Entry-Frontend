import db from "./firebase.config";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = db.collection("User_data");
    let dataVal = await response.get();

    console.log("Dataval is ", dataVal.docs);

    dataVal &&
      dataVal.docs.forEach((x) => {
        setData([...data, x.data()]);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>Hello World should work</p>
      {data.map((x, i) => {
        console.log("X is ", data);
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
