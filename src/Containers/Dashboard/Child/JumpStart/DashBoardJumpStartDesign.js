import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";

function DashBoardJumpStartDesign(props) {

  return (
    <FlexContainer flexDirection="row" style={{ width: "100%" }}>
      <FlexContainer style={{ width: "100%" }}>
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
      </FlexContainer>
      <mt-3 />
    </FlexContainer>
  );
}
const mapStateToProps = ({ billings, auth }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashBoardJumpStartDesign)
);
