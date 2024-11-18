import React, { Component } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
class ShowOrCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }
  toggleCollapse = () => {
    this.setState(prevState => {
      if (prevState.isCollapsed === true) {
        return { isCollapsed: false };
      } else {
        return { isCollapsed: true };
      }
    });
  };
  render() {
    const { isCollapsed } = this.state;
    return (
      <>
        <a
          className="ant-dropdown-link"
          href="#"
          onClick={this.toggleCollapse}
          style={{ textDecoration: "none", fontSize: 15 }}
        >
          {isCollapsed && <KeyboardArrowDownIcon type="down" className=" !text-icon"/>}
          {isCollapsed && " Show more "}
          {!isCollapsed && <KeyboardArrowUpIcon className=" !text-icon"  type="up"  />}
          {!isCollapsed && " Show less "}
        </a>
        <div style={{ marginTop: 15 }}>
          {this.props.children(isCollapsed, this.toggleCollapse)}
        </div>
      </>
    );
  }
}

export default ShowOrCollapse;
