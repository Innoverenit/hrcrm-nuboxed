import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { JumpStartBox } from "../../../Components/UI/Elements";

function BillingJumpStartBox(props) {

  const Actual = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.finalBillableAmount;
    return acc;
  }, 0);
  var actualAmount = `${Number(Actual).toFixed(2)}`;
 console.log("test",actualAmount)

  const Projected = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.actualBillableAmount;
    return acc;
  }, 0);

  var projectedAmount = `${Number(Projected).toFixed(2)}`;

  const Deviation = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.deviationBillableAmount;
    return acc;
  }, 0);
  console.log("deviations",Deviation)
  var deviationAmount = `${Number(Deviation).toFixed(2)}`;

  const billableCurr =
    props.billingByDesignation.length &&
    props.billingByDesignation[0].billableCurency;
  return (
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[100%]">
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[100%] ">
        <JumpStartBox
          noProgress
          title="Actual Amount"
           bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={Actual.toFixed(2) }
        />

        <JumpStartBox
          noProgress
          title=" Projected Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={` ${projectedAmount || ""}`}
        />

        <JumpStartBox
          noProgress
          title=" Deviation Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={` ${deviationAmount || ""}`}
        />
        <JumpStartBox
          noProgress
          title="Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
        />
      </div>
      <mt-2 />
    </div>
  );
}
const mapStateToProps = ({ billings, auth }) => ({
  billingByDesignation: billings.billingByDesignation,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingJumpStartBox)
);
