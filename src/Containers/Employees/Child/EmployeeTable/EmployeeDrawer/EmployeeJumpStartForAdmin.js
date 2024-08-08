import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../../Components/Common";

class EmployeeJumpStartForAdmin extends Component {
  render() {
    return (
      <div class=" flex flex-col">
 
 <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
          <JumpStartBox
            title={<FormattedMessage
              id="app.createdon"
              defaultMessage="Created on"
            />}
            noProgress
            stringValue
            bgColor="#005075"
          />
          <CurrencySymbol />

          <JumpStartBox
            noProgress
            stringValue
            title={<FormattedMessage
              id="app.level"
              defaultMessage="Level"
            />}
            bgColor="#0093d7"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contact, account, settings }) => ({
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeJumpStartForAdmin);
