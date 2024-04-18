import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import OrderPlanGroupCard from "../Child/OrderPlanGroupCard";
import { elipsize } from "../../../Helpers/Function/Functions";


class OrderPlanColumn extends Component {
  render() {
    const { order, index, history } = this.props;
    return (
   
        <div
         
        >
  
            <OrderPlanGroupCard
            //   isDragging={snapshot.isDragging}
              //opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(order.contactPersonName, 60)}`} 
              secondaryTitle={`${order.distributorName} `}
            //   currencyType={opportunity.currency}
            //   customerName={opportunity.customer}
            //   contactName={opportunity.contactName}
            //   user={this.props.user}
            offerValue={order.payableOfferPrice}
            newOrderNo={order.newOrderNo}
            deliveryDate={order.deliveryDate}
            orderCurrencyName={order.orderCurrencyName}
             
            />
             
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
