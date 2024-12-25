
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
const MileageStatusTypeCard =lazy(()=>import("./MileageStatusTypeCard"));

function MileageStatusCard(props) {
 
    return (
      <>
      <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <MileageStatusTypeCard statusType={"Pending"}/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <MileageStatusTypeCard statusType={"Approved"}/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <MileageStatusTypeCard statusType={"Rejected"}/>
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

