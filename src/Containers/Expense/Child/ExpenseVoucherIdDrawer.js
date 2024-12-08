import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getExpenseById,} from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
const ExpenseDrawerCard=lazy(()=>import("./ExpenseDrawerCard"));

const ExpenseVoucherIdDrawer = (props) => {
  const { expenseVoucherIdDrawer, handleExpenseVoucherIdDrawer,voucherId,particularRowData, ...formProps } = props;
  console.log(props.particularRowData)
  return (
    <>
      <StyledDrawer
        title={`Voucher ID: ${props.particularRowData.voucherId}`}
         width="75%"
        visible={expenseVoucherIdDrawer}
        //  maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          handleExpenseVoucherIdDrawer(false);
          props.getExpenseById("0",props.userId)

        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseDrawerCard voucherId={voucherId} particularRowData={particularRowData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseVoucherIdDrawer);


