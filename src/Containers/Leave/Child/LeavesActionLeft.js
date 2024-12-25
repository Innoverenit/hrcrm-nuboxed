import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Input, Tooltip, Avatar } from "antd";

import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

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
        title="My Leaves"
      >  <span
        class=" mr-1 text-sm cursor-pointer"
        onClick={() => props.setLeavesViewType("tile")}
        style={{
          color: props.viewType === "tile" && "#1890ff",
        }}
      >
          <Avatar style={{ background: props.viewType === "tile" ? "#f279ab" : "#28a355" }}>
            <GridViewIcon className='text-white !text-icon' />
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
          <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#28a355" }}>
            <CategoryIcon className='text-white !text-icon'
            // icon={solid('users')}
            />
          </Avatar>
        </span>

      </Tooltip>

      <Tooltip
        title="Gantt View"
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
          <Avatar style={{ background: props.viewType === "grant" ? "#f279ab" : "#28a355" }}>
            <DonutSmallIcon className='text-white !text-icon'
            // icon={solid('users')}
            />
          </Avatar>
        </span>
      </Tooltip>

      {props.user.leaveFullListInd === true && (
        <Tooltip
          title="All"
        >

          <span class=" mr-1 cursor-pointer !text-icon "
            onClick={() => props.setExpenseViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
              cursor: 'pointer',
            }}
          >
            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355" }}>
            ALL

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
export default connect(mapStateToProps, mapDispatchToProps)(LeavesActionLeft)

