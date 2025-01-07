// import React, { Component,lazy } from "react";
// import { Menu, Avatar } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { useNavigate } from "react-router-dom";

// import { base_url } from "../../Config/Auth";
// import {
//   StyledDropdown,
//   StyledMenu,
//   StyledMenuItem
// } from "../../Components/UI/Antd";
// import {MainWrapper } from "../../Components/UI/Layout";
// import { logout } from "../Auth/AuthAction";

// import GroupsIcon from '@mui/icons-material/Groups';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LockResetIcon from '@mui/icons-material/LockReset';
// const Theme = lazy(() => import("../Settings/Theme/Theme"));


// const ProfileMenu = ({ logout, history,navigate }) => (
  
//   <div class=" p-1 bg-light-gray ">
//     <MainWrapper>
//       <StyledMenu>
//         <StyledMenuItem  key="0" >
//           <a href="#" onClick={() => 
//             // history.push("/profile")}
//             navigate("/profile")}
//             >
          
//            <GroupsIcon className=" !text-icon"/> Profile
//           </a>
//         </StyledMenuItem>
//         <StyledMenuItem key="3">
//           <a href="#" onClick={() => 
//             // history.push("/change-password")}
//             navigate("/change-password")}
//             >
       
//           <LockResetIcon className=" !text-icon"/> Change Password
//           </a>
//         </StyledMenuItem>
//         <StyledMenuItem key="4">
//           <a onClick={() => logout(navigate)}><LogoutIcon className=" !text-icon"/>Logout</a>
//         </StyledMenuItem>
//         <Menu.Divider />
//       </StyledMenu>
  
//       {/* <Theme /> */}
//     </MainWrapper>
//   </div>
// );
// class ProfileDropdown extends Component {
//   render() {
//     const {
//       userDetails: { fullName, imageId },
//       navigate
//     } = this.props;
//     return (
//       <StyledDropdown
//         overlay={
//           <ProfileMenu
//             logout={this.props.logout}
//             history={this.props.history}
//             navigate={navigate}
//           />
//         }
//       >
//         {imageId ? (
//           <img
//             src={`${base_url}/image/${imageId}`}
//             style={{ width: 32, height: 32, borderRadius: "50%" }}
//           />
//         ) : (
//             <Avatar className=" !text-icon align-middle text-white bg-[#1890ff]"
              
//             >
//               {fullName && fullName.split("")[0].toUpperCase()}
//             </Avatar>
//           )}
//       </StyledDropdown>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => ({
//   userDetails: auth.userDetails
// });
// const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown)


import React, { Component, lazy } from "react";
import { Menu, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

import { base_url } from "../../Config/Auth";
import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem,
} from "../../Components/UI/Antd";
import { MainWrapper } from "../../Components/UI/Layout";
import { logout } from "../Auth/AuthAction";

import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
const Theme = lazy(() => import("../Settings/Theme/Theme"));

const ProfileMenu = ({ logout, navigate }) => (
  <div className="p-1 bg-light-gray">
    <MainWrapper>
      <StyledMenu>
        <StyledMenuItem key="0">
          <a
            href="#"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <GroupsIcon className="!text-icon" /> Profile
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="3">
          <a
            href="#"
            onClick={() => {
              navigate("/change-password");
            }}
          >
            <LockResetIcon className="!text-icon" /> Change Password
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="4">
          <a onClick={() => logout(navigate)}>
            <LogoutIcon className="!text-icon" />
            Logout
          </a>
        </StyledMenuItem>

        <StyledMenuItem key="5">
          <a 
           href="#"
         onClick={() => {
          navigate("/permissions");
        }}
          >
            <LogoutIcon className="!text-icon" />
            Permission
          </a>
        </StyledMenuItem>
        <Menu.Divider />
      </StyledMenu>
    </MainWrapper>
  </div>
);

class ProfileDropdown extends Component {
  render() {
    const {
      userDetails: { fullName, imageId },
      navigate,
    } = this.props;

    return (
      <StyledDropdown
        overlay={
          <ProfileMenu
            logout={this.props.logout}
            navigate={navigate}
          />
        }
      >
        {imageId ? (
          <img
            src={`${base_url}/image/${imageId}`}
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        ) : (
          <Avatar className="!text-icon align-middle text-white bg-[#1890ff]">
            {fullName && fullName.split("")[0].toUpperCase()}
          </Avatar>
        )}
      </StyledDropdown>
    );
  }
}

// Wrapper to inject navigate
const ProfileDropdownWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ProfileDropdown {...props} navigate={navigate} />;
};

const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDropdownWithNavigate);


