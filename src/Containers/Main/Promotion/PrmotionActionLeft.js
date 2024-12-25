import React, { useEffect } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Badge, Tooltip,Avatar } from "antd";
//import {getLocationRecords,getLocationDeletedCount} from "./LocationAction";

const PrmotionActionLeft = (props) => {
//   useEffect(() => {
//     if (props.viewType === "card") {
//       props.getLocationRecords(props.orgId);
//     }
//     else if (props.viewType === "delete") {
//       props.getLocationDeletedCount(props.orgId);
//     }
//   }, [props.viewType]);
    return (
        <div class=" flex  items-center" >
          <Tooltip
        title="Card View"
      >
         {/* <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        > */}
          <span class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setPromotionViewType("card")}
            style={{
          
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355" }}>
  
             <LanguageIcon  className="text-white !text-icon"/>
            </Avatar>
          </span>
          {/* </Badge> */}
      </Tooltip>


        </div>
    )
}
const mapStateToProps = ({ auth,location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordData:location.recordData,
  locationDeletedCount:location.locationDeletedCount,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getLocationRecords,
    //   getLocationDeletedCount
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PrmotionActionLeft)



