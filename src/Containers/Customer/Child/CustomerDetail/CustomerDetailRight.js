import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CustomerDetailTab = lazy(() => import("./CustomerTab/CustomerDetailTab"));

class CustomerDetailRight extends Component {
  render() {
    console.log(this.props.customer);
    return (
      <div class=" w-full">
        <CustomerDetailTab customer={this.props.customer}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
       translatedMenuItems={this.props.translatedMenuItems}
        />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailRight);
