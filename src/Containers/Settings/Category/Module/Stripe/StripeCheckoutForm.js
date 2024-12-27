import React, {useState,useEffect} from "react";
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
// import {sendPaymentInfo} from "../../LeadsAction";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const stripePromise = loadStripe('pk_test_51MHMyeLUPUCPutTHmfURN9aHilVqsmPDU8gQIt2nndD3iRrOwAobmFh567r34xIjzqSRexw6muNUuPGgYxBOZv1J00WHxEDkln');

function StripeCheckoutForm(props) {
  // useEffect(() => {
  //   const multiplyTotal=total*100;
  //   let data = {
  //     amount:multiplyTotal,
  //     requirementId:requirementId,
  //     serviceId:props.serviceId,
  //     currency:"EUR",
  //   };
  //   props.sendPaymentInfo(data);
  // }, []);
  // const total=props.setEditingLeadsCard.costPerLeadViewDTO.total
  //    console.log("samnt",total)
  // const options={clientSecret:props.paymentDetails.clientSecret}
  // const requirementId=props.setEditingLeadsCard.requirementId
  
  // useEffect(() => {
  //   const loadStripeScript = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://js.stripe.com/v3/';
  //     script.async = true;
  //     script.onload = () => {
  //       console.log('Stripe script loaded successfully!');
  //       const stripe = window.Stripe('your-public-key');
  //     };
  //     document.body.appendChild(script);
  //   };

  //   loadStripeScript();
  //   return () => {
  //     const script = document.querySelector('script[src="https://js.stripe.com/v3/"]');
  //     if (script) {
  //       document.body.removeChild(script);
  //     }
  //   };
  // }, []);
  
  return (
    <>
   {/* {props.paymentDetails.clientSecret &&  */}
    <Elements stripe={stripePromise} 
    // options={options}
    >
      <ElementsConsumer>
      {({ stripe, elements }) => (
      <CheckoutForm
      stripe={stripe}
      elements={elements}
       handleStripeModal={props.handleStripeModal}
      //  total={total}
      //  ConfirmedPayment={props.ConfirmedPayment}
      //  serviceId={props.serviceId}
      //  stripePaymentId={props.stripePaymentId}
      //  requirementId={requirementId}
      //  setEditingLeadsCard={props.setEditingLeadsCard}
       />
       )}
       </ElementsConsumer>
    </Elements>
   {/* } */}
   </>
  );
};

const mapStateToProps = ({ leads,auth }) => ({
  // paymentDetails: leads.paymentDetails,
  // ConfirmedPayment: leads.ConfirmedPayment,
  // serviceId:auth.serviceDetails.serviceId,
  // showLeadsAllTable:leads.showLeadsAllTable,
  // setEditingLeadsCard:leads.setEditingLeadsCard,
  // stripePaymentId:leads.paymentDetails.stripePaymentId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // sendPaymentInfo
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutForm)
