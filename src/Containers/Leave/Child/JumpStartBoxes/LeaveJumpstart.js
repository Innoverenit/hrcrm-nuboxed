import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, } from "../../../../Components/UI/Elements";

class LeaveJumpstart extends React.Component {
  render() {
    const {
      leaveFetching: {
        leaveBalance,
        totalAppliedLeaves,
        totalLeaves,
        totalPendingLeaves,
        
      },
    } = this.props;
     console.log(leaveBalance);
    return (
      <div class=" flex flex-col w-full items-center" >
            <div class=" flex w-full flex-row justify-center   md: max-sm:ml-0 max-sm:justify-between max-sm:flex-col">
{/* <div class="flex w-wk"> */}
                {/* <div class="md:w-[35%] max-sm:w-wk"> */}
                <JumpStartBox
                bgColor="linear-gradient(270deg,#F15753,orange)"
                // bgColor="#005075"
                title="Annual Leaves"
                stringValue
                noProgress
                value={totalLeaves}
                />
                {/* </div> */}

                {/* <div class="md:w-[35%] max-sm:w-wk"> */}
                <JumpStartBox
                bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                // bgColor="#0073a8"
                stringValue
                noProgress
                title="Leaves Applied"
                value={totalAppliedLeaves}
                />
                {/* </div> */}
                {/* </div> */}
                {/* <div class="flex w-wk"> */}
                {/* <div class="md:w-[35%] max-sm:w-wk"> */}
                <JumpStartBox
                bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                // bgColor="#0093d7"
                // title="Pending"
                title="Approved"
                stringValue
                noProgress
                 value={"Data Not Available"}
                />
                {/* </div> */}

                {/* <div class="md:w-[35%] max-sm:w-wk"> */}
                <JumpStartBox
                bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                // bgColor="#24b9fe"
                title="Leave Balance"
                stringValue
                noProgress
                value={leaveBalance}
                />
                </div>
                </div>
            // </div>
        // </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveJumpstart);
