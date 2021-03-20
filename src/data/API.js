import db from "../firebase.config";
import React from "react";

export const getDateTime = async (date) => {
  let data_array = [];
  const response = db.collection("DateTime").doc(date).collection("Authorised");
  console.log("response is ", response);

  let dataVal = await response.get();
  dataVal &&
    dataVal.docs.forEach((x) => {
      data_array = [...data_array, x.data()];
    });

  console.log("Data array is ", data_array);
};
