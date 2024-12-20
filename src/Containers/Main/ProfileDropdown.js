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
import {MainWrapper } from "../../Components/UI/Layout";
import { logout } from "../Auth/AuthAction";
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
const Theme = lazy(() => import("../Settings/Theme/Theme"));


const ProfileMenu = ({ logout, history }) => (
  <div class=" p-1 bg-light-gray ">
    <MainWrapper>
      <StyledMenu>
        <StyledMenuItem  key="0" >
          <a href="#" onClick={() => history.push("/profile")}>
          
           <GroupsIcon className=" !text-icon"/> Profile
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="3">
          <a href="#" onClick={() => history.push("/change-password")}>
       
          <LockResetIcon className=" !text-icon"/> Change Password
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="4">
          <a onClick={() => logout(history)}><LogoutIcon className=" !text-icon"/>Logout</a>
        </StyledMenuItem>
        <Menu.Divider />
      </StyledMenu>
  
      {/* <Theme /> */}
    </MainWrapper>
  </div>
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
            <Avatar className=" !text-icon align-middle text-white bg-[#1890ff]"
              
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
