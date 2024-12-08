import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { elipsize } from "../../../Helpers/Function/Functions";
const  OrderPlanGroupCard = lazy(() =>import("../Child/OrderPlanGroupCard"));

class OrderPlanColumn extends Component {
  render() {
    const { order, index, history } = this.props;
    return (
   
        <div >
   <Suspense fallback={<BundleLoader />}>
            <OrderPlanGroupCard
              primaryTitle={`${elipsize(order.contactPersonName, 60)}`} 
              secondaryTitle={`${order.distributorName} `}
            offerValue={order.payableOfferPrice}
            newOrderNo={order.newOrderNo}
            deliveryDate={order.deliveryDate}
            orderCurrencyName={order.orderCurrencyName}
             
            /></Suspense>
             
            </div>
          
         
    );
  }
}
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        //  StatusRecruit,
        //  lostStatusRecruit,
        //  deleteOpportunityData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanColumn); ;
