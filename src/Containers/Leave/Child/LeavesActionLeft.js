import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TocIcon from '@mui/icons-material/Toc';
import {  Input, Tooltip, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from "@mui/icons-material/Groups";
import CategoryIcon from '@mui/icons-material/Category';
import { AreaChartOutlined } from '@ant-design/icons';

const { Search } = Input;

const LeavesActionLeft = (props) => {
  useEffect(() => {
    // if (props.viewType === "table") {
    //   props.getRecords(props.orgId);
    // }
  }, [props.viewType]);
  return (
    <div class=" flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.tileView" defaultMessage="Tile View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "tile" ? "#f279ab" : "#4bc076" }}>
            <GridViewIcon />
            </Avatar>
          </span>
      
      </Tooltip>

      {/* <Tooltip
        title={<FormattedMessage id="app.tableView" defaultMessage="Table View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
              <GroupsIcon />
          </span>
      
      </Tooltip> */}
      <Tooltip
        title={<FormattedMessage id="app.cardView" defaultMessage="Card View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
              <TocIcon />
              </Avatar>
          </span>
      
      </Tooltip>
     
      <Tooltip
        title="Category"
      >
       
          <span
            onClick={() => props.setLeavesViewType("list")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "list" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
             <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
            <CategoryIcon  
            // icon={solid('users')}
             />
             </Avatar>
          </span>
    
      </Tooltip>

      <Tooltip
        title="Grantt"
      >
       
          <span
            onClick={() => props.setLeavesViewType("grant")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "grant" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            <Avatar style={{ background: props.viewType === "grant" ? "#f279ab" : "#4bc076" }}>
            <AreaChartOutlined  
            // icon={solid('users')}
             />
             </Avatar>
          </span>
    
      </Tooltip>

      {props.user.leaveFullListInd === true && (
      <Tooltip
        title="All"
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
          <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
            <ListAltIcon  
            // icon={solid('users')}
             />
             </Avatar>  
          </span>
    
      </Tooltip>
       )}
    </div>
  );
};

const mapStateToProps = ({ auth, employee }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeavesActionLeft)
);
