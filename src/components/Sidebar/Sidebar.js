import React from "react";
import Sidebar from "react-sidebar";
import { FaListUl } from "react-icons/fa";
import "./Sidebar.css";
import bg2 from "./assets/bg3.png";
import Menu from "@material-ui/icons/Menu";
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
      <Sidebar
        sidebar={
          <div>
            <img src = {bg2}></img>
            <div className = "heading">Filter By Date</div>
            <div className = "heading">Filter By User Id</div>
          </div>
      }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "#302d40" , color: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          <Menu />
        </button>
      </Sidebar>
    );
  }
}
 
export default App;