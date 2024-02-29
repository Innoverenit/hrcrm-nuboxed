import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge } from "antd";
import { FormattedMessage } from "react-intl";
import GridViewIcon from '@mui/icons-material/GridView';


const ProductionActionLeft = (props) => {

  // useEffect(()=>{
  //   props.getCountries();
  // })
  
 
  return (
    <div class=" flex items-center">
      {/* <Tooltip
        title={<FormattedMessage id="app.tileView" defaultMessage="Tile View" />}
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
            <GridViewIcon />
          </span>
          </Badge> 
      </Tooltip> */}
        
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionLeft)
);
