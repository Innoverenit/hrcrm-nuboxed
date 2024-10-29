import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List, Avatar, Spin, Button } from "antd";
import dayjs from "dayjs";
import { getPastNotifications, updateNotifcation } from "../NotificationAction";

class PastNotification extends Component {
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
        itemsToShow: this.props.pastNotifications.length,
        expanded: true
      })
      : this.setState({ itemsToShow: 6, expanded: false });
  };
  componentDidMount() {
    const { user, getPastNotifications } = this.props;
    console.log("]______++++++++++", user);
    if (user && user.userId) {
      console.log("]______++++++++++");
      getPastNotifications(user.userId);
      setTimeout(getPastNotifications(user.userId), 30000);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { user, getPastNotifications } = nextProps;
    console.log("getPastNotifications]______++++++++++");
    if (user.userId !== this.props.user.userId) {
      console.log("]______++++++++++");
      getPastNotifications(user.userId);
      setTimeout(getPastNotifications(user.userId), 30000);
    }
  }
  handleCallback(status, data) {
    if (status === "success") {
      //////debugger;
      const { pastNotifications, getPastNotifications } = this.props;
      console.log("getPastNotifications]______++++++++++");
      for (let i = 0; i <= pastNotifications.length; i++) {
        //////debugger;
        if (pastNotifications[i].notificationId === data.notificationId) {
          ////debugger;
          pastNotifications[i] = data;
        }
      }
    }
  }
  handleClick = item => {
    const Id = item.notificationId;
    // alert("item.notificationId");
    this.props.updateNotifcation(Id, item, this.handleCallback);
  };
  render() {
    console.log(this.props.pastNotifications);

    return (
      <div>
        {this.props.fetchingPastNotifications ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
            <List
              style={{
                height: 400,
                overflow: "auto",
                border: "none"
                //   backgroundColor: this.state.color
              }}
              size="small"
              bordered
              dataSource={this.props.pastNotifications.slice(
                0,
                this.state.itemsToShow
              )}
              renderItem={item => (
                <List.Item
                  key={item.notificationId}
                  style={{
                    backgroundColor:
                      item.notificationReadInd === true ? "white" : "#40A9FF",
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
                        {dayjs(item.notificationDate).format("MMM DD")}
                      </h4>
                    }
                    onClick={
                      item.notificationReadInd === false
                        ? () => this.handleClick(item)
                        : null
                    }
                  />
                </List.Item>
              )}
            />
          )}
        {this.props.pastNotifications &&
          this.props.pastNotifications.length > this.state.itemsToShow && (
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
  fetchingPastNotifications: notification.fetchingPastNotifications,
  pastNotifications: notification.pastNotifications
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPastNotifications,
      updateNotifcation
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastNotification);
