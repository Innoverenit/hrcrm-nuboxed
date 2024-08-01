
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
const MileagePendingStatusCard = lazy(() => import("./MileagePendingStatusCard"))
const MileageApprovedStatusCard = lazy(() => import("./MileageApprovedStatusCard"))
const MileageRejectedStatusCard = lazy(() => import("./MileageRejectedStatusCard"))

function MileageStatusCard(props) {
 
    return (
      <>
      <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <MileagePendingStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <MileageApprovedStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <MileageRejectedStatusCard/>
        </div>
       </div>    
      </>
    );
  }

  const mapStateToProps = ({ auth, mileage }) => ({
    userId: auth.userDetails.userId,
    MileageDat: mileage.MileageDat,
    fetchingMileageByUserId: mileage.fetchingMileageByUserId,
    fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
    mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getMileageByUserId,
        deleteMileageVoucher,
        handleMileageVoucherIdDrwer
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(MileageStatusCard);

