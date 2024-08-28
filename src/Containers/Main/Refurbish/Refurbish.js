import React, { lazy, Suspense } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setProductionViewType } from "./RefurbishAction";
import { BundleLoader } from '../../../Components/Placeholder';
const RefurbishHeader = lazy(() => import('./RefurbishHeader'));
const RefurbishMainTable = lazy(() => import('./RefurbishMainTable'));
const OrderPhoneTab = lazy(() => import('./OrderPhoneTab'));

const Refurbish = (props) => {

  return (
    <div>
       <Suspense fallback={<BundleLoader />}>
      <RefurbishHeader
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        setProductionViewType={props.setProductionViewType}
        viewType={props.viewType}
      />
     
        {props.viewType === "list" ? (
          <OrderPhoneTab 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}/>
        ) : props.viewType === "all" ?
          (
            <RefurbishMainTable 
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}/>
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

