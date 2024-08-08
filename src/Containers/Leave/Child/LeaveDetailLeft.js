import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StatusCard from "./StatusCard";

class LeaveDetailLeft extends Component {
  render() {
    const { leaveFetching } = this.props;
    return (
      <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-[100%] mr-auto ">
        <StatusCard leaveFetching={leaveFetching} />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveDetailLeft);
