import React, { Component } from "react";
import { Switch, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { sponsorSwitch } from "../../../../OpportunityAction";
import { StyledModal } from "../../../../../../Components/UI/Antd";
// import { handleSponsorModal } from "../../../../OpportunityAction";
import SelectSponsorForm from "./SelectSponsorForm";

class RecruitmentSwitchSponsor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponser: false,
    };
  }
  handleCallback = (status) => {
    if (status === "success") {
      message.success("Sponsor Approved successfully");
      // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
    }
  };

  onChange = (checked) => {
    this.setState({ sponser: !this.state.sponser });
    const data = this.state.sponser;
    console.log("callFunction");
    // this.props.sponsorSwitch(
    //   this.props.profileId,
    //   this.props.opportunityId,
    //   this.props.recruitmentId,
    //   this.props.sponserId,
    //   this.props.candidateId,
    //   this.handleCallback
    // );
  };

  render() {
    return (
      <div>
        <Popconfirm
          title="Do you wish to proceed?"
          onConfirm={
            this.props.sponserId
              ? this.onChange
              : () =>
                this.props.handleError(
                  this.props.recruitmentId,
                  this.props.profileId
                )
          }
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            checked={this.props.sponserInd ? true : this.state.sponser}
            disabled={!this.props.approveInd || this.props.sponserInd}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
  // addSponsorModal: opportunity.addSponsorModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // sponsorSwitch,
      // handleSponsorModal,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitmentSwitchSponsor);
