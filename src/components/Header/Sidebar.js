import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import "./Sidebar.css";
import bg2 from "./assets/bg3.png";
import Menu from "@material-ui/icons/Menu";

const SideBar = ({ onSetSidebarOpen, toggle }) => {
  return (
    <div>
      {console.log("rendered")}
      <Sidebar
        sidebar={
          <div>
            <img src={bg2} alt="menu-btn"></img>
            <div className="heading">Filter By Date</div>
            <div className="heading">Filter By User Id</div>
          </div>
        }
        open={toggle}
        onSetOpen={() => onSetSidebarOpen()}
        styles={{ sidebar: { background: "#302d40", color: "white" } }}
      ></Sidebar>
    </div>
  );
};

export default SideBar;
