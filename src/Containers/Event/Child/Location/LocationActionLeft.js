import React, { useEffect } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import { Badge, Tooltip,Avatar } from "antd";
import {getLocationRecords} from "./LocationAction";

const LocationActionLeft = (props) => {
  useEffect(() => {
    if (props.viewType === "card") {
      props.getLocationRecords(props.orgId);
    }
  }, [props.viewType]);
    return (
        <div class=" flex items-center" >
          <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="List View" />}
      >
         <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        >
          <span class=" mr-2 cursor-pointer"
            onClick={() => props.setLocationViewType("card")}
            style={{
          
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <TocIcon className="text-white" />
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
          <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setLocationViewType("map")}
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "map" ? "#f279ab" : "#4bc076" }}>
            <LanguageIcon  
            // icon={solid('users')}
             />
             </Avatar>
          </span>
          </Badge>
      </Tooltip>
        </div>
    )
}
const mapStateToProps = ({ auth,location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordData:location.recordData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocationRecords
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationActionLeft)
);


