import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
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
          <div className="text-center" >
            <Spin />
          </div>
        ) : (
            <List className=" w-[34vw] h-[78vh] overflow-auto"
              // style={{
              //   height: 400,
              //   overflow: "auto",
              //   border: "none"
              //   //   backgroundColor: this.state.color
              // }}
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
                  onClick={
                    item.notificationReadInd === false
                      ? () => this.handleClick(item)
                      : null
                  }
                >
                  <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                      <h4
                        style={{
                          color:
                            item.notificationReadInd === true ? "grey" : "white"
                        }}
                        onClick={(event) => event.stopPropagation()}
                      >
                           {/* <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm   cursor-pointer" to={`/${item.notificationProcess}/${item.uniqueId}`} title={item.notificationMessage}>
                        {item.notificationMessage}
                        </Link> */}
                        {item.uniqueId ? (
  <Link
    className="overflow-ellipsis whitespace-nowrap text-xs text-[#042E8A] max-sm:text-sm cursor-pointer"
    to={`/${item.notificationProcess}/${item.uniqueId}`}
    title={item.notificationMessage}
  >
    {item.notificationMessage}
  </Link>
) : (
  <span
    className="overflow-ellipsis whitespace-nowrap text-xs text-[#042E8A] max-sm:text-sm cursor-not-allowed"
    title={item.notificationMessage}
  >
    {item.notificationMessage}
  </span>
)}

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
                  
                  />
             
                </List.Item>
              )}
            />
          )}
        {this.props.pastNotifications &&
          this.props.pastNotifications.length > this.state.itemsToShow && (
            <Button type="primary" style={{ marginTop: "1.25em" }} onClick={this.showMore}>
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
