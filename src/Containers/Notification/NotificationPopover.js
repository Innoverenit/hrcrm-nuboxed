import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Tooltip,  } from "antd";
import { bindActionCreators } from "redux";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { BundleLoader } from "../../Components/Placeholder";
import { handlenotificationdrawer } from "./NotificationAction";
import Notificationdrawermodal from "./Notificationdrawermodal";

  function NotificationPopover(props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     visible: false
  //   };
  //   this.handleVisibleChange = this.handleVisibleChange.bind(this);
  // }

  // handleVisibleChange = visible => {
  //   this.setState({ visible });
  // };
  // render() {
    return (
      <>
      <div>
      <Tooltip title="Notifications">
         <CircleNotificationsIcon type="bell" className="!text-icon cursor-pointer text-[#1890ff]"
         onClick={() => {
          props.handlenotificationdrawer(true);
         
        }} 
           />
        {/* <Popover
          content={
            <div>
              <NotificationTab />
            </div>
          }
          trigger="click"
          placement="bottomRight"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Badge
            count={this.props.notificationCount}
            style={{ fontSize: 8, boxSizing: 8 }}
          >
            <CircleNotificationsIcon type="bell" className="!text-icon cursor-pointer text-[#1890ff]" 
            onClick={() => this.props.handlenotificationdrawer(true)}/>
          </Badge>
        </Popover> */}
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
  // notificationCount:
  //   notification.presentNotifications &&
  //   notification.presentNotifications.length
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
