import db from "../firebase.config";

export const getDateTime = async (date) => {
  let data_array = [];
  const response = db.collection("DateTime").doc(date).collection("Authorised");

  let dataVal = await response.get();
  dataVal &&
    dataVal.docs.forEach((x) => {
      data_array = [...data_array, x.data()];
    });
  return data_array;
};

export const getUserData = async () => {
  const response = db.collection("User_Data");

  let dataVal = await response.get();

  let data_array = [];

  dataVal &&
    dataVal.docs.forEach((x) => {
      data_array = [...data_array, x.data()];
    });
  return data_array;
};

export const getChartValues = (data_array) => {
  let values = [];
  data_array.forEach((x, i) => {
    values = [...values, { label: x.Name, y: x.Time.length / 2 }];
  });
  return values;
};
