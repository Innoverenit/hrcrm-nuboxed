import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Tooltip, Badge,Avatar } from "antd";

import GridViewIcon from '@mui/icons-material/GridView';


const SubscriptionActionLeft = (props) => {

  // useEffect(()=>{
  //   props.getCountries();
  // })
  
 
  return (
    <div class=" flex items-center">
      <Tooltip
        title="Tile View"
      > 
       <Badge
          size="small"
        //   count={
        //     (props.viewType === "tile" &&
        //       props.employeerecordData.EmployeeListByLiveInd) ||
        //     0
        //   }
        //   overflowCount={999}
        >
      <span
            class=" mr-2 text-sm cursor-pointer"
            // onClick={() => props.setEmployeeViewType("tile")}
            // style={{
            //   color: props.viewType === "tile" && "#1890ff",
            // }}
          >
            <Avatar 
            style={{ background: props.viewType === "tile" ? "#f279ab" : "#28a355" }}
            >
            <GridViewIcon className="text-white"/>
            </Avatar>

          </span>
          </Badge> 
      </Tooltip>
        
    </div>
  );
};

const mapStateToProps = ({ auth  }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionActionLeft)
