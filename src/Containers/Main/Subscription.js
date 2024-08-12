import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Popconfirm } from "antd";
import SubscriptionConfirmationContent from "./SubscriptionConfirmationContent";
// import {
//   updateOrganizationDetails,
//   updateSubscriptionType,
// } from "../Auth/AuthAction";
import dayjs from "dayjs";

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.userType === "ADMIN",
      // changeType: this.props.organization.subscriptionType,
    };
  }

  handleChooseSubscription = (type) => {
    this.setState({ isEditing: true, changeType: type });
  };
  handleCancel = () => {
    this.setState({
      isEditing: false,
      changeType: this.props.organization.subscriptionType,
    });
  };
  handleSubscriptionChange = (type) => {
    const { organization, updateOrganizationDetails } = this.props;

    // if (this.props.organization.subscriptionType === "FREE") {
    //   this.setState({ isEditing: false }, () => {
    //     updateOrganizationDetails(
    //       organization.organizationId,
    //       { subscriptionType: type },
    //       () => this.callback(type)
    //     );
    //   });
    // } else if (this.props.organization.subscriptionType === "STARTER") {
    //   this.setState({ isEditing: false }, () => {
    //     if (type === "FREE") {
    //       message.error(` Contact Korero Support team`);
    //     } else {
    //       updateOrganizationDetails(
    //         organization.organizationId,
    //         { subscriptionType: type },
    //         () => this.callback(type)
    //       );
    //     }
    //   });
    // } else if (type === "STARTER" && organization.differnceDays <= 30) {
    //   message.error(
    //     ` You cannot change subscription before ${dayjs(
    //       organization.subscriptionEndDate1
    //     ).format("lll")} `
    //   );
    // } else if (type === "PROFESSIONAL" && organization.differnceDays <= 30) {
    //   message.error(
    //     ` You cannot change subscription before ${dayjs(
    //       organization.subscriptionEndDate1
    //     ).format("lll")} `
    //   );
    // } else if (type === "FREE") {
    //   message.error(` Contact Korero Support team`);
    // } else {
    //   this.setState({ isEditing: false }, () => {
    //     updateOrganizationDetails(
    //       organization.organizationId,
    //       { subscriptionType: type },
    //       () => this.callback(type)
    //     );
    //   });
    // }
  };

  // callback = (type) => console.log(type)
  callback = (type) => this.props.updateSubscriptionType(type);
  render() {
    const { organization, changeType, dept } = this.props;
    console.log(changeType);
    console.log(organization);
    // const days = organization.differnceDays;
    // const SubscriptionEndDate = organiZation.SubscriptionEndDate;
    // console.log(days);
    // const type = organization.subscriptionType;
    const isAdmin = this.props.userType === "ADMIN";
    // const isAdmin = false
    return (
      <div>
         <Popconfirm
            title={
              <div>
                <SubscriptionConfirmationContent
                  handleChooseSubscription={this.handleChooseSubscription}
                  type={this.state.changeType}
                />
              </div>
            }
            // onCancel={this.handleCancel}
            // onVisibleChange={(visible) => {
            //   if (!visible) {
            //     this.setState({
            //       changeType: this.props.organization.subscriptionType,
            //       // isEditing: false
            //     });
            //   }
            // }}
            // onConfirm={() =>
            //   this.handleSubscriptionChange(this.state.changeType)
            // }
          >
        <Tag
             style={{
              backgroundColor: "#ff7158bf",
              color: "white",
              fontFamily:"Poppins",
              // borderColor: "rgb(251, 133, 0)",
              border: "1px solid tomato",
              borderRadius: "5px",
              position: "relative",
              height: "27px",
              textAlign: "center",
              lineHeight: "24px",
              padding: "0px 10px",
              marginLeft: "auto",
              marginRight: "20px",
            }}
        >
         STARTER
        </Tag>
        </Popconfirm>
        {/* {isAdmin ? ( */}
         
          
        {/* ) : (
         
        )} */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  // userType: auth.userDetails.userType,
  // dept: auth.userDetails.department,
  // organization:
  //   auth.userDetails.metaData && auth.userDetails.metaData.organization,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // updateOrganizationDetails,
      // updateSubscriptionType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
