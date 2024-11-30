import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { getMileageByUserId } from "../MileageAction";
const MileageDrawerCard=lazy(()=>import("./MileageDrawerCard"));

const MileageVoucherIdDrawer = (props) => {
  const { mileageVoucherIdDrawer, handleMileageVoucherIdDrwer,voucherId, ...formProps } = props;
  return (
    
    <>
      <StyledDrawer
        title={`Mileage: ${voucherId}`}
        width="70%"
        visible={mileageVoucherIdDrawer}
        onClose={() => {
          handleMileageVoucherIdDrwer(false);
          props.getMileageByUserId("0",props.userId)
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageDrawerCard voucherId={voucherId}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageVoucherIdDrawer);


