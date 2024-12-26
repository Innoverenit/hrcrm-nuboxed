import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { JumpStartBox } from "../../../../Components/UI/Elements";

function DashBoardJumpStartDesign(props) {

  return (
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full">
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
        <JumpStartBox
          noProgress
          title="Actual Amount"
           bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
        //   currencyType={billableCurr}
        //   value={Actual.toFixed(2) }
        />

        <JumpStartBox
          noProgress
          title=" Projected Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
        //   currencyType={billableCurr}
        //   value={` ${projectedAmount || ""}`}
        />

        <JumpStartBox
          noProgress
          title=" Deviation Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
        //   currencyType={billableCurr}
        //   value={` ${deviationAmount || ""}`}
        />
        <JumpStartBox
          noProgress
          title="Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
        //   currencyType={billableCurr}
        />
      </div>
      <mt-3 />
    </div>
  );
}
const mapStateToProps = ({ billings, auth }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardJumpStartDesign)

