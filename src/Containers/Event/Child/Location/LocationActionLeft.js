import React, { useEffect } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Badge, Tooltip,Avatar } from "antd";
import {getLocationRecords,getLocationDeletedCount} from "./LocationAction";

const LocationActionLeft = (props) => {
  useEffect(() => {
    if (props.viewType === "card") {
      props.getLocationRecords(props.orgId);
    }
    else if (props.viewType === "delete") {
      props.getLocationDeletedCount(props.orgId);
    }
  }, [props.viewType]);
    return (
        <div class=" flex  items-center" >
          <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="All" />}
      >
         <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setLocationViewType("card")}
            style={{
          
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
  
            <div className="text-white ">ALL</div>
            </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.mapView" defaultMessage="Map View" />}
      >
           <Badge
          size="small"
          // count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 cursor-pointer text-[1rem]"
            onClick={() => props.setLocationViewType("map")}
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "map" ? "#f279ab" : "#4bc076" }}>
            <LanguageIcon  className="text-white !text-icon"
            // icon={solid('users')}
             />
             </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <Tooltip title="Inactive">
                <Badge size="small"
                        count={(props.viewType === "delete" && props.locationDeletedCount.locCount) || 0}
                        overflowCount={999}
                    >
                        <span class="  mr-1 md:mr-2 text-sm cursor-pointer"
                            onClick={() => props.setLocationViewType("delete")}
                            style={{
                                color: props.viewType === "delete" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#4bc076" }}>
                                <DeleteOutlined className="text-white !text-icon " /></Avatar>

                        </span>
                    </Badge>
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
      getLocationRecords,
      getLocationDeletedCount
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationActionLeft)
);


