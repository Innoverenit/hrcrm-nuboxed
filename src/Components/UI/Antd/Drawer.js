import Drawer from "antd/lib/drawer";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper {
        background-color: ${props =>
        props.theme.applicationBackground} !important;
        color: ${props => props.theme.color};
        margin-top:6rem;
        border: none !important;
        width:60% !important;
    }
    .ant-drawer-content {
        background-color: ${props =>
        props.theme.applicationBackground} !important;
        color: ${props => props.theme.color};
    }
    .ant-drawer-wrapper-body{
      // overflow:hidden !important;
    }
    .ant-drawer-body {
       // background-color: ${props => props.theme.applicationBackground} !important;
       background-color: #FDFDFD; 
    //    color: ${props => props.theme.color};
       color:#444444;
        padding: 0.5rem;
        border: none !important;
    }
    .ant-drawer-header {
        background-image: linear-gradient(-90deg,#0e4c7fe0,#94d0e4);
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        box-shadow: 0 0.75em 0.375em -0.375em rgb(46,44,44);
        border-bottom:0.0625em solid  #aaa;
      
      
        
    }
    .ant-drawer-title {
        color: white;
        font-family:poppins;
       
    }
    .anticon {
   
    color: darkgrey;
   font-type:bold;
    }
    .ant-drawer-header-title {
        display: flex;
        flex: 1 1;
        min-width: 0;
        min-height: 0;
        flex-direction: row-reverse;
        height: 8px;
    }
 

`;
export default StyledDrawer;
