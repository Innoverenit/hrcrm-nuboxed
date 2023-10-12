import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ContactInvestDetailTab = lazy(() => import("./ContactInvestDetailTab/ContactInvestDetailTab"));

class ContactInvestDetailsRight extends Component {
  render() {
    return (
      <div class=" w-full">
        <ContactInvestDetailTab contactInVestDetail={this.props.contactInVestDetail} />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInvestDetailsRight);
