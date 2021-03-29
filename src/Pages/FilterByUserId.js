import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header/Header";
import OneUser from "../components/OneUser/OneUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./admin.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getUserData, getOneUserData } from "../data/API";
import FR1 from "./assets/FR1.gif";

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
  formControl: {
    marginTop: "2.5%",
    marginLeft: "42%",
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterByUserId = () => {
  const classes = useStyles();

  const [selectedUserId, setSelectedUserId] = useState();

  const [data, setData] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [initialRender, setRender] = useState(true);
  const [dataNotFound, setNotFound] = useState(false);
  const [listUsers, setList] = useState([]);

  const fetchData = async (UserId) => {
    const data_array = await getOneUserData(UserId);
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
    fetchData(UserId);
  };

  const getDetails = (e) => {
    setLoaded(false);
    e.preventDefault();
    if (selectedUserId && selectedUserId.length > 0) {
      fetchData();
    }
  };

  useEffect(() => {
    const listofUsers = async () => {
      const response = await getUserData();
      setList(response);
    };
    listofUsers();
  }, []);

  return (
    <div>
      <Header name="ADMIN" />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedUserId}
          onChange={(e) => handleUserIdChange(e.target.value)}
          label="User"
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

      {/* <SearchUser /> */}

      {!isLoaded && !dataNotFound && (
        <div className="gifImg">
          <img src={FR1} alt="Face Recognition" className="faceImg" />
        </div>
      )}

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
