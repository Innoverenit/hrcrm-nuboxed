import React, { Component } from "react";

import { Switch, Popconfirm, message } from "antd";
// import {
//   addOpportunityStageDisable,
//   //   emailSendInvoice,
//   //   getQuotation,
//   getOpportunityStageData,
//   getOpportunityById,
// } from "../../../OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class StagesSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableInd: false,
    };
  }
  handleCallback = (status) => {
    if (status === "success") {
      message.success("Approved successfully");
    }
  };
  // componentDidMount() {
  //   this.props.getOpportunityStageData(
  //     this.props.opportunityId,
  //     this.props.currentStageId
  //   );
  // }
  onChange = (checked) => {
    this.setState({ disableInd: checked });

    // this.props.addOpportunityStageDisable(
    //   {
    //     opportunityId: this.props.opportunityId,
    //     stageId: this.props.currentStageId,
    //     stageName: this.props.stageName,
    //     userId: this.props.userId,
    //     disableInd: this.props.disableInd === true ? false : true,
    //   },

    //   this.handleStageDiasble
    // );
  };
  handleStageDiasble = (data) => {
    this.setState({ disableInd: !this.state.disableInd });
    if (data === "success") {
      this.props.getOpportunityById(this.props.opportunityId);
    }
  };
  render() {
    const { currentStageId } = this.props;
    return (
      <div>
        <Popconfirm
          //title="Do you wish to proceed?"
          title={<FormattedMessage
            id="app.doyouwishtoproceed?"
            defaultMessage="Doyou wish to proceed?"
          />}
          onConfirm={this.onChange}
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ marginLeft: "2.1875em" }}
            checked={
              this.props.disableInd === true ? true : this.state.disableInd
            }
            checkedChildren="Disabled"
            unCheckedChildren="Disable"
          />
        </Popconfirm>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, auth }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  userId: auth.userDetails.userId,
  // opportunitiesStage: opportunity.opportunitiesStage,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addOpportunityStageDisable,
      // getOpportunityStageData,
      // getOpportunityById,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StagesSwitch);
