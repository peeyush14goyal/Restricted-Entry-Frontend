import React, { useState, useEffect } from "react";
import { getOneUserData, getUserData } from "../data/API";
import Header from "../components/Header/Header";
import "./admin.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchUser = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [listUsers, setList] = useState([]);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    const listofUsers = async () => {
      const response = await getUserData();
      setList(response);
    };
    listofUsers();
  }, []);

  // Add UI for showing user details
  return (
    <div>
      <Header name="ADMIN" />
      <div className="searchUser">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={user}
            onChange={handleChange}
            label="Age"
          >
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((x) => (
                <MenuItem
                  value={x.User_ID}
                >{`${x.User_ID} - ${x.Name}`}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SearchUser;
