// import React, { Component } from "react";
// import { Menu,  } from "antd";
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

// import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
// import ToggleOnIcon from '@mui/icons-material/ToggleOn';
// import {
//   StyledDropdown,
//   StyledMenu,
//   StyledMenuItem,
// } from "../../Components/UI/Antd";
// import SettingsIcon from '@mui/icons-material/Settings';
// import { MainWrapper} from "../../Components/UI/Layout";
// let path = window.location.href.split("/")[3];
// const SettingsMenu = ({ history, pathName, recruitmentInd }) => (
//   <div class=" p-1 bg-light-gray ">
//     <MainWrapper>
//       <StyledMenu>

//         <StyledMenuItem key="1">
//           <a
//             href="#"
//             style={{
//               color:
//                 pathName === "/recruite" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
//             }}
//             onClick={() => history.push("/recruite")}
//           >
//           <ToggleOnIcon className="!text-icon  text-[#7D3C98]"/> Configure
//           </a>
//         </StyledMenuItem>
//         <StyledMenuItem key="2">
//           <a
//             href="#"
//             style={{
//               color:
//                 pathName === "/categoryTab" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
//             }}
//             onClick={() => history.push("/categoryTab")}
//           >
//          <FormatListNumberedIcon className='!text-icon    text-[#42858c]' />   Category
//           </a>
//         </StyledMenuItem>
//         <StyledMenuItem key="3">
//           <a
//             href="#"
//             style={{
//               color:
//                 pathName === "/organization"
//                   ? "#1890ff"
//                   : "rgba(0, 0, 0, 0.65)",
//             }}
//             onClick={() => history.push("/organization")}
//           >
           
//            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> Organization
//           </a>
//         </StyledMenuItem>
      

//         <Menu.Divider />
//       </StyledMenu>
//     </MainWrapper>
//   </div>
// );
// class SettingsDropdown extends Component {
//   render() {
//     const params = this.props;
//     const pathName = this.props.location.pathname;
//     console.log(this.props.recriutmentInd);
//     return (
//       <StyledDropdown
//         overlay={
//           <SettingsMenu
//             history={this.props.history}
//             pathName={pathName}
//             recruitmentInd={this.props.recriutmentInd}
//           />
//         }
//       >
//         <a href="#" style={{ marginRight: 4 }}>
//           <div class=" flex items-center" >
//             <SettingsIcon className="!text-2xl cursor-pointer text-[blue] "
//               type="setting"
//               style={{
//                 color:
//                   pathName === "/opportunity-stage" ||
//                     pathName === "/opportunity-source" ||
//                     pathName === "/organization" ||
//                     pathName === "/rules" ||
//                     pathName === "/recruite" 
                    
//                     ? "#1890ff"
//                     : "#1890ff",
//               }}
//             />
//           </div>
//         </a>
//       </StyledDropdown>
//     );
//   }
// }

// export default (SettingsDropdown);
import React from "react";
import { Menu } from "antd";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, useNavigate } from "react-router-dom";

import {
  StyledDropdown,
  StyledMenu,
  StyledMenuItem,
} from "../../Components/UI/Antd";
import { MainWrapper } from "../../Components/UI/Layout";

const SettingsMenu = ({ navigate, pathName }) => (
  <div className="p-1 bg-light-gray">
    <MainWrapper>
      <StyledMenu>
        <StyledMenuItem key="1">
          <a
            href="#"
            style={{
              color:
                pathName === "/recruite" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => navigate("/recruite")}
          >
            <ToggleOnIcon className="!text-icon text-[#7D3C98]" /> Configure
          </a>
        </StyledMenuItem>
        <StyledMenuItem key="2">
          <a
            href="#"
            style={{
              color:
                pathName === "/categoryTab" ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
            }}
            onClick={() => navigate("/categoryTab")}
          >
            <FormatListNumberedIcon className="!text-icon text-[#42858c]" />{" "}
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
            onClick={() => navigate("/organization")}
          >
            <WifiCalling3Icon className="!text-icon text-[#4f5d75]" />{" "}
            Organization
          </a>
        </StyledMenuItem>

        <Menu.Divider />
      </StyledMenu>
    </MainWrapper>
  </div>
);

const SettingsDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <StyledDropdown
      overlay={<SettingsMenu navigate={navigate} pathName={pathName} />}
    >
      <a href="#" style={{ marginRight: 4 }}>
        <div className="flex items-center">
          <SettingsIcon
            className="!text-2xl cursor-pointer text-[blue]"
            style={{
              color:
                pathName === "/opportunity-stage" ||
                pathName === "/opportunity-source" ||
                pathName === "/organization" ||
                pathName === "/rules" ||
                pathName === "/recruite"
                  ? "#1890ff"
                  : "#1890ff",
            }}
          />
        </div>
      </a>
    </StyledDropdown>
  );
};

export default SettingsDropdown;