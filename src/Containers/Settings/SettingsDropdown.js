import React, { Component } from "react";
import { Menu,  } from "antd";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem,
} from "../../Components/UI/Antd";
import {
 SettingOutlined
} from '@ant-design/icons';
import {
  ApplicationWrapper,
  MainWrapper,
} from "../../Components/UI/Layout";
let path = window.location.href.split("/")[3];
const SettingsMenu = ({ history, pathName, recruitmentInd }) => (
  <ApplicationWrapper>
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
            <FormattedMessage
              id="app.configure"
              defaultMessage="Configure"
            />
      {/* RecruitPro */}
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
            <FormattedMessage
              id="app.category"
              defaultMessage="Category"
            />
      {/* Category */}
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
            <FormattedMessage
              id="app.organization"
              defaultMessage="Organization"
            />
      {/* Organization */}
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
            <FormattedMessage
              id="app.rules"
              defaultMessage="Rules"
            />
      
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
            <FormattedMessage
              id="app.templates"
              defaultMessage="Templates"
            />
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
  </ApplicationWrapper>
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
        <a href="#" style={{ height: 56, marginRight: 10 }}>
          <div class=" flex items-center h-full" >
            <SettingOutlined className="!text-4 cursor-pointer text-[blue] "
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
