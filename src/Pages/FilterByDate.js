import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getDateTime } from "../data/API";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getDetails = (e) => {
    e.preventDefault();
    getDateTime(selectedDate);
  };

  return (
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
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
