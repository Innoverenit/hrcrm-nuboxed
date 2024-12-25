import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Tooltip,  } from "antd";
import { bindActionCreators } from "redux";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { BundleLoader } from "../../Components/Placeholder";
import { handlenotificationdrawer } from "./NotificationAction";
import Notificationdrawermodal from "./Notificationdrawermodal";

  function NotificationPopover(props) {

    return (
      <>
      <div>
      <Tooltip title="Notifications">
         <CircleNotificationsIcon type="bell" className="!text-2xl cursor-pointer text-[#1890ff]"
         onClick={() => {
          props.handlenotificationdrawer(true);
         
        }} 
           />

      </Tooltip>
      </div>
      <Suspense fallback={<BundleLoader />}>
      <Notificationdrawermodal
      Notificationdrawermodal={props.Notificationdrawermodal}
       handlenotificationdrawer={props.handlenotificationdrawer}
      />
      </Suspense>
    </>
    
    )
}
const mapStateToProps = ({ notification }) => ({
  Notificationdrawermodal: notification.Notificationdrawermodal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlenotificationdrawer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPopover);
