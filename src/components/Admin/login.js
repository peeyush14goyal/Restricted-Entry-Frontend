import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TextField from "@material-ui/core/TextField";
import "./admin.css";

let AdminLogin = () => {
  let history = useHistory();
  let [user, setUser] = useState();
  let [pass, setPass] = useState();

  let checkCredentials = () => {
    if (user === "admin" && pass === "admin") {
      // <Redirect to="/home" />;
      history.push("/home");
    } else {
      //<Redirect to="/" />;
      history.push("/");
    }
  };
  return (
    <div className="loginPage">
      <p>Welcome</p>
      <form className="credential" onSubmit={checkCredentials}>
        <div>
          <TextField
            id="outlined-search"
            required
            label="Username"
            type="search"
            variant="outlined"
            inputProps={{ style: { fontSize: 25 } }}
            value={user}
            onBlur={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-search"
            required
            label="Password"
            type="password"
            variant="outlined"
            inputProps={{ style: { fontSize: 25 } }}
            value={pass}
            onBlur={(e) => setPass(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">
            <div className="lockIcon">
              <LockOpenIcon />
            </div>
            <div>Login</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
