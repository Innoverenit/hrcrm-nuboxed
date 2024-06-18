import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Tooltip, Popover } from "antd";
import NotificationTab from "./NotificationTab";
import {
  BellOutlined

} from '@ant-design/icons';

class NotificationPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <Tooltip title="Notifications">
        <Popover
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
            <BellOutlined type="bell" className="!text-xl cursor-pointer text-[#1890ff] " />
          </Badge>
        </Popover>
      </Tooltip>
    );
  }
}
const mapStateToProps = ({ notification }) => ({
  notificationCount:
    notification.presentNotifications &&
    notification.presentNotifications.length
});

export default connect(mapStateToProps)(NotificationPopover);
