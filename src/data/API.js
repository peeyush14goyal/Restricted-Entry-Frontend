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

export const getOneUserData = async (id) => {
  let data;
  const data_array = await getUserData();
  data_array.forEach((x) => {
    if (x.User_ID === id) {
      data = x;
    }
  });
  return data;
};

export const verifyAdmin = async (user, pass) => {
  let response = db.collection("admin").doc("values");
  let dataVal = await response.get();
  let credentials = dataVal.data();
  let check = false;
  let keys = Object.keys(credentials);
  keys.forEach((x) => {
    if (x === user) {
      if (credentials[`${user}`] === pass) {
        check = true;
      }
    }
  });
  return check;
};

export const getAdmin = async () => {
  let response = db.collection("admin").doc("values");
  let dataVal = await response.get();
  let credentials = dataVal.data();
  console.log("Credentials are ", credentials);
  return credentials;
};

export const setCredentials = async (user) => {
  db.collection("admin")
    .doc("values")
    .set({
      username: user.username,
      password: user.password,
    })
    .then(() => {
      console.log("Crdentials Successfully Changed");
    });
};
