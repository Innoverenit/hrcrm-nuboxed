import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const EmployeeDetailTab = lazy(() =>
  import("./EmployeeTab/EmployeeDetailTab")
);

class EmployeeDetailRight extends Component {
  render() {
    return (
      <div class="w-full">
        <EmployeeDetailTab singleEmployee={this.props.singleEmployee}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}/>
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetailRight);
