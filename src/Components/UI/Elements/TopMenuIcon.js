
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Icon, Tooltip, Popover } from 'antd';
import NotificationTab from './NotificationTab';

class NotificationPopover extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
    }
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
                    <Badge count={this.props.notificationCount} >
                        <Icon type="bell"
                            style={{ color: "#1890ff" }} />
                    </Badge>
                </Popover>
            </Tooltip>
        )
    }
}
const mapStateToProps = ({ notification }) => ({
    notificationCount: notification.presentNotifications.results && notification.presentNotifications.results.length
})

export default connect(mapStateToProps)(NotificationPopover);