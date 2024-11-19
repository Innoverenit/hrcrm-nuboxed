import React, { Component } from "react";
import { Menu,  } from "antd";

import { withRouter } from "react-router-dom";
import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem,
} from "../../Components/UI/Antd";
import SettingsIcon from '@mui/icons-material/Settings';
import { MainWrapper} from "../../Components/UI/Layout";
let path = window.location.href.split("/")[3];
const SettingsMenu = ({ history, pathName, recruitmentInd }) => (
  <div class=" p-1 bg-light-gray ">
    <MainWrapper>
      <StyledMenu>

        <StyledMenuItem key="1">
          <a
            href="#"
            style={{
              color:
                pathName === "/recruite" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => history.push("/recruite")}
          >
          Configure
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="2">
          <a
            href="#"
            style={{
              color:
                pathName === "/categoryTab" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => history.push("/categoryTab")}
          >
            Category
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="3">
          <a
            href="#"
            style={{
              color:
                pathName === "/organization"
                  ? "#1890ff"
                  : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => history.push("/organization")}
          >
           
      Organization
          </a>
        </StyledMenuItem>
        {/* <StyledMenuItem key="0">
          <a
            href="#"
            style={{
              color: pathName === "/rules" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => history.push("/rules")}
          >
          
      
          </a>
        </StyledMenuItem> */}

        {/* <StyledMenuItem key="1">
          <a
            href="#"
            style={{
              color:
                pathName === "/template" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => history.push("/template")}
          >
           
          </a>
        </StyledMenuItem>  */}
    

        {/* <StyledMenuItem key="8">
            <a
              href="#"
              style={{
                color:
                  pathName === "/library" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
              }}
              onClick={() => history.push("/library")}
            >
              Library
            </a>
          </StyledMenuItem> */}

        <Menu.Divider />
      </StyledMenu>
    </MainWrapper>
  </div>
);
class SettingsDropdown extends Component {
  render() {
    const params = this.props;
    const pathName = this.props.location.pathname;
    console.log(this.props.recriutmentInd);
    return (
      <StyledDropdown
        overlay={
          <SettingsMenu
            history={this.props.history}
            pathName={pathName}
            recruitmentInd={this.props.recriutmentInd}
          />
        }
      >
        <a href="#" style={{ marginRight: 4 }}>
          <div class=" flex items-center" >
            <SettingsIcon className="!text-icon cursor-pointer text-[blue] "
              type="setting"
              style={{
                color:
                  pathName === "/opportunity-stage" ||
                    pathName === "/opportunity-source" ||
                    pathName === "/organization" ||
                    pathName === "/rules" ||
                    // pathName === "/library" ||
                    pathName === "/recruite" 
                    
                    ? "#1890ff"
                    : "#1890ff",
              }}
            />
          </div>
        </a>
      </StyledDropdown>
    );
  }
}

export default withRouter(SettingsDropdown);
