import React, { Component,lazy } from "react";
import { Menu, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../Config/Auth";
import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem
} from "../../Components/UI/Antd";
import { ApplicationWrapper, MainWrapper } from "../../Components/UI/Layout";
import { logout } from "../Auth/AuthAction";
import { FormattedMessage } from "react-intl";
const Theme = lazy(() => import("../Settings/Theme/Theme"));


const ProfileMenu = ({ logout, history }) => (
  <ApplicationWrapper>
    <MainWrapper>
      <StyledMenu>
        <StyledMenuItem  key="0" >
          <a href="#" onClick={() => history.push("/profile")}>
            <FormattedMessage
              id="app.profile"
              defaultMessage="Profile"
            />
            {/* Profile */}
          </a>
        </StyledMenuItem>
        {/* <StyledMenuItem
          key="1"
          style={{
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <a href="#" onClick={() => history.push("/setting")}>
            Setting
          </a>
        </StyledMenuItem> */}
        {/* <StyledMenuItem key="2">
          <a href="#" onClick={() => history.push("/Permissions")}>
            Permission
          </a>
        </StyledMenuItem> */}
        <StyledMenuItem key="3">
          <a href="#" onClick={() => history.push("/change-password")}>
            <FormattedMessage
              id="app.changepassword"
              defaultMessage="Change Password"
            />
            {/* Change Password */}
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="4">
          <a onClick={() => logout(history)}>Logout</a>
        </StyledMenuItem>
        <Menu.Divider />
      </StyledMenu>
      {/* <ServerCheckbox /> */}
      {/* <Theme /> */}
    </MainWrapper>
  </ApplicationWrapper>
);
class ProfileDropdown extends Component {
  render() {
    const {
      userDetails: { fullName, imageId }
    } = this.props;
    return (
      <StyledDropdown
        overlay={
          <ProfileMenu
            logout={this.props.logout}
            history={this.props.history}
          />
        }
      >
        {imageId ? (
          <img
            src={`${base_url}/image/${imageId}`}
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        ) : (
            <Avatar
              style={{ backgroundColor: "#1890ff", verticalAlign: "middle", color: "white" }}
              size="large"
            >
              {fullName && fullName.split("")[0].toUpperCase()}
            </Avatar>
          )}
      </StyledDropdown>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown)
);
