import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import "./Stripe.scss";
import {  message } from "antd";
import {
  handleStripeModal,
} from "../ModuleAction";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class CheckoutForm extends React.Component {

  // componentDidMount() {
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
  // }

  // componentWillUnmount() {
 
  //   const script = document.querySelector('script[src="https://js.stripe.com/v3/"]');
  //   if (script) {
  //     document.body.removeChild(script);
  //   }
  // }
  
  handleSubmit = async (event) => {

    event.preventDefault();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
       return_url: `http://localhost:3000/stripePaymentLoading/${this.props.amount}/${this.props.paymentId}/${this.props.stripePaymentId}/${this.props.setEditingLeadsCard.requirementId}`
        //  return_url: `http://home.offertedeals.com/stripePaymentLoading/${this.props.amount}/${this.props.paymentId}/${this.props.stripePaymentId}/${this.props.setEditingLeadsCard.requirementId}`
        
      },
    });

    if (result.error) {
      message.error(result.error.message)
      this.props.handleStripeModal(false)
      console.log(result.error.message);
    } else {
      
    }
  };
  
  render() {
    const total=this.props.setEditingLeadsCard.costPerLeadViewDTO.total
    const {stripe}=this.props;
    return (
        <form onSubmit={this.handleSubmit}> 
        <PaymentElement/>
        <button
          type="submit"
          disabled={!stripe}
          className="StripePayButton"
        >
          Pay {`${total} ${"EUR"}`}
        </button>
      </form>
    )
 }
};
const mapStateToProps = ({ leads }) => ({
  addStripeModal: leads.addStripeModal,
  paymentId: leads.paymentDetails.paymentId,
  amount:leads.paymentDetails.amount,
  stripePaymentId:leads.paymentDetails.stripePaymentId,
  stripePaymentInd:leads.paymentDetails.stripePaymentInd,
  setEditingLeadsCard:leads.setEditingLeadsCard,
  showLeadsAllTable:leads.showLeadsAllTable,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleStripeModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
