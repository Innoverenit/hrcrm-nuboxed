import React, { lazy, Suspense } from 'react'
import RefurbishHeader from './RefurbishHeader'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setProductionViewType } from "./RefurbishAction";
import { BundleLoader } from '../../../Components/Placeholder';
const RefurbishMainTable = lazy(() => import('./RefurbishMainTable'));
const OrderPhoneTab = lazy(() => import('./OrderPhoneTab'));

const Refurbish = (props) => {

  return (
    <div>
      <RefurbishHeader
        setProductionViewType={props.setProductionViewType}
        viewType={props.viewType}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "list" ? (
          <OrderPhoneTab />
        ) : props.viewType === "all" ?
          (
            <RefurbishMainTable />
          ) : null}
      </Suspense>

    </div>
  )
}
const mapStateToProps = ({ refurbish, auth }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  shiftId: refurbish.shiftsData.shiftId,
  shiftsData: refurbish.shiftsData,
  viewType: refurbish.viewType
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProductionViewType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Refurbish);

