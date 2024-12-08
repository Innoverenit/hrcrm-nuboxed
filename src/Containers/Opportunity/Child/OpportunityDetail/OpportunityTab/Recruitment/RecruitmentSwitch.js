import React, { Component } from "react";
import { Switch, Popconfirm, message } from "antd";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
// import { candidateSwitch } from "../../../../OpportunityAction";

class RecruitmentSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: false,
    };
  }
  handleCallback = (status) => {
    if (status === "success") {
      message.success("Candidate Offered successfully");
      // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
    }
  };

  onChange = (checked) => {
    this.setState({ candidate: !this.state.candidate });
    const data = this.state.candidate;
    console.log("callFunction");
    // this.props.candidateSwitch(
    //   this.props.profileId,
    //   this.props.opportunityId,
    //   this.props.recruitmentId,
    //   this.props.contactId,
    //   this.handleCallback
    // );
  };
  handleError = () => {
    message.error("Select Candidate");
    // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
  };
  render() {
    return (
      <div>
        <Popconfirm
          title="Do you wish to proceed?"
          onConfirm={this.props.contactId ? this.onChange : this.handleError}
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            checked={this.props.candidateInd ? true : this.state.candidate}
            disabled={!this.props.approveInd || this.props.candidateInd}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // candidateSwitch,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentSwitch);
