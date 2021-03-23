import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getDateTime } from "../data/API";
import ColumnChart from "../components/Chart/ColumnChart";
import Header from "../components/Header/Header";
import Accordions from "../components/Accordion/Accordion";
import { getChartValues } from "../data/API";
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

const FilterByDate = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date("2014-08-18"));

  const [data, setData] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [initialRender, setRender] = useState(true);
  const [dataNotFound, setNotFound] = useState(false);

  const fetchData = async () => {
    const data_array = await getDateTime(selectedDate);
    data_array && setData(data_array);
    if (data_array === undefined || data_array.length === 0) {
      setNotFound(true);
    } else {
      setLoaded(true);
      setRender(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNotFound(false);
  };

  const getDetails = (e) => {
    setLoaded(false);
    e.preventDefault();
    if (selectedDate && selectedDate.length > 0) {
      fetchData();
    }
  };

  return (
    <div>
      <Header name="ADMIN" />
      <div className="filterByDate">
        <form
          className={classes.container}
          noValidate
          onSubmit={(e) => getDetails(e)}
        >
          <TextField
            id="date"
            label="Choose Date"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.currentTarget.value)}
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
          <ColumnChart values={getChartValues(data)} />
          <div className="row">
            <Accordions data={data} />
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
              <h1>No Data Available for {selectedDate}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByDate;
