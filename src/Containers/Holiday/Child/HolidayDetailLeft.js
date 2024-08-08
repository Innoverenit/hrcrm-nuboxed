import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const OverviewCard=lazy(()=>import("./OverviewCard"));
const StatusCard=lazy(()=>import("./StatusCard"));
class HolidayDetailLeft extends Component {
    render() {
        
        return (
            <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-[100%] mr-auto ">
                <OverviewCard
                // user={userDetails}
                />
                {/* <ProfileAboutCard user={userDetails} /> */}
                <StatusCard
                // user={userDetails}
                />
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => ({
    // userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HolidayDetailLeft);
