import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const DetailTab = lazy(() => import("./Tab/DetailTab"));
class LeaveDetailRight extends Component {
    render() {
        return (
            <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                <DetailTab userDetails={this.props.userDetails} />
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => ({
    userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaveDetailRight);
