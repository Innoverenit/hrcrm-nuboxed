import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
  getPresentNotifications,
  updateNotifcation
} from "../NotificationAction";
import { List, Button, Spin } from "antd";

class PresentNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewAll: false,
      itemsToShow: 6,
      expanded: false
    };
  }
  showMore = () => {
    this.state.itemsToShow === 6
      ? this.setState({
        itemsToShow: this.props.presentNotifications.length,
        expanded: true
      })
      : this.setState({ itemsToShow: 6, expanded: false });
  };
  componentDidMount = () => {
    const { user, getPresentNotifications } = this.props;
    console.log("]______++++++++++", user);
    if (user && user.userId) {
      console.log("]______++++++++++");
      getPresentNotifications(user.userId);
      setTimeout(getPresentNotifications(user.userId), 30000);
    }
  };
  componentWillReceiveProps(nextProps) {
    const { user, getPresentNotifications } = nextProps;
    console.log("getPresentNotifications]______++++++++++");
    if (user.userId !== this.props.user.userId) {
      console.log("]______++++++++++");
      getPresentNotifications(user.userId);
      setTimeout(getPresentNotifications(user.userId), 30000);
    }
  }
  handleCallback(status, data) {
    if (status === "success") {
      ////debugger;
      const { presentNotifications, getPastNotifications } = this.props;
      console.log("getPastNotifications]______++++++++++");
      for (let i = 0; i <= presentNotifications.length; i++) {
        ////debugger;
        if (presentNotifications[i].notificationId === data.notificationId) {
          ////debugger;
          presentNotifications[i] = data;
        }
      }
    }
  }
  handleClick = item => {
    const Id = item.notificationId;
    // alert("item.notificationId");
    this.props.updateNotifcation(Id, item,this.handleCallback);
  };

  render() {
    return (
      <div>
        {this.props.fetchingPresentNotifications ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
            <List
              style={{ height: 400, overflow: "auto" }}
              dataSource={this.props.presentNotifications.slice(
                0,
                this.state.itemsToShow
              )}
              size="small"
              bordered
              renderItem={item => (
                <List.Item
                  key={item.id}
                  style={{
                    backgroundColor:
                      item.notificationReadInd === true ? "White" : "#40A9FF",
                    cursor:
                      item.notificationReadInd === true ? "default" : "pointer"
                  }}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                      <h4
                        style={{
                          color:
                            item.notificationReadInd === true ? "grey" : "white"
                        }}
                      >
                        {item.notificationMessage}
                      </h4>
                    }
                    description={
                      <h4
                        style={{
                          color:
                            item.notificationReadInd === true ? "grey" : "white"
                        }}
                      >
                        {dayjs(item.notificationDate).format("LLL")}
                      </h4>
                    }
                    onClick={
                      item.notificationReadInd === false
                        ? () => this.handleClick(item)
                        : null
                    }
                  />
                  {/* <div>Content</div> */}
                </List.Item>
              )}
            ></List>
          )}
        {this.props.presentNotifications &&
          this.props.presentNotifications.length > this.state.itemsToShow && (
            <Button style={{ marginTop: "1.25em" }} onClick={this.showMore}>
              {this.state.expanded ? (
                <span>Show less</span>
              ) : (
                  <span>Show more</span>
                )}
            </Button>
          )}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, notification }) => ({
  user: auth.userDetails,
  fetchingPresentNotifications: notification.fetchingPresentNotifications,
  presentNotifications: notification.presentNotifications
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPresentNotifications,
      updateNotifcation
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentNotification);
