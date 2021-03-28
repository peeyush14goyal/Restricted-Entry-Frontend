import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getOneUserData } from "../data/API";
import Header from "../components/Header/Header";
import OneUser from "../components/OneUser/OneUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./admin.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: "white",
  },
  txtColor: {
    color: "white",
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const FilterByUserId = () => {
  const classes = useStyles();

  const [selectedUserId, setSelectedUserId] = useState();

  const [data, setData] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [initialRender, setRender] = useState(true);
  const [dataNotFound, setNotFound] = useState(false);

  const fetchData = async () => {
    const data_array = await getOneUserData(selectedUserId);
    data_array && setData([data_array]);
    if (data_array === undefined || data_array.length === 0) {
      setNotFound(true);
    } else {
      setLoaded(true);
      setRender(false);
    }
  };

  const handleUserIdChange = (UserId) => {
    setSelectedUserId(UserId);
    setNotFound(false);
  };

  const getDetails = (e) => {
    setLoaded(false);
    e.preventDefault();
    if (selectedUserId && selectedUserId.length > 0) {
      fetchData();
    }
  };

  return (
    <div>
      <Header name="ADMIN" />
      <div className="filterByUserId">
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={(e) => getDetails(e)}
        >
          <TextField
            id="UserId"
            label="User Id"
            type="text"
            value={selectedUserId}
            onChange={(e) => handleUserIdChange(e.currentTarget.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: {
                txtColor: classes.txtColor,
              },
            }}
          />
          <button type="submit" className="buttonComp submitBtn">
            Submit
          </button>
        </form>
      </div>

      {data && data.length > 0 && isLoaded ? (
        <>
          <div className="row">
            <OneUser data={data} />
          </div>
        </>
      ) : (
        <div>
          {!initialRender && !dataNotFound && (
            <div className={classes.progress + " progressDiv"}>
              <CircularProgress color="secondary" />
            </div>
          )}
          {dataNotFound && (
            <div className="noDataFound">
              <h1>No Data Available for {selectedUserId}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByUserId;
