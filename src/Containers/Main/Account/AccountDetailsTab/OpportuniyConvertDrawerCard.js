import React, {Component,useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { Link,withRouter } from "react-router-dom";
import { Radio, Input, Space, message,Button } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import stripe from "../../Assests/Images/Stripe-Emblem.png";
// import Razorpay from "../../../../../Assests/Images/razorpay.png";
// import pay from "../../../../../../../../Assests/Images/cashShake.svg";
import axios from 'axios';

const OpportuniyConvertDrawerCard = ({ userId,stripeNo, invencartItem, addiNVEStripeModal, handleInventoryStripeModal, codInventoryOrder, getInventoryCartItems, addingCODinventory }) => {
  const [value, setValue] = useState(1);
  const history = useHistory();

  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const [checkNo, setcheckNo] = useState("");

  const handlecashByCheck = (e) => {
    setcheckNo(e.target.value);
  };

  const handleInputChange = (e) => {
    setcheckNo(e.target.value);
  };
 

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleAddPlaceOrder = (status) => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
      amount: 0,
      quotationId:null,
      type: "Cod",
      orderProcess:"checkout",
    };
    // codInventoryOrder(data);
  };
  const handleEFTOrder = () => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
    //   amount: invencartItem.cartSummary.grandTotal ? invencartItem.cartSummary.grandTotal : 0,
    //   quotationId: invencartItem.orderPhoneId ? invencartItem.orderPhoneId:null,
      type: "EFT",
      orderProcess:"checkout",
    };
    // codInventoryOrder(data);
  };

  const handleCreditOrder = () => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
    //   amount: invencartItem.cartSummary.grandTotal ? invencartItem.cartSummary.grandTotal : 0,
    //   quotationId: invencartItem.orderPhoneId ? invencartItem.orderPhoneId:null,
      type: "Credit",
      orderProcess:"checkout",
    };
    // codInventoryOrder(data);
  };
  return (
    <>
      <br />
      <Radio.Group onChange={onChange} value={value}>
     
          <Radio value={"EFT"}>
          <div className="flex justify-between mt-2"> 
            <div>
          <h3> Electronics Fund Transfer (EFT) - </h3> send remittance to sales@1Di.ca
          </div>
            <div className="flex justify-center ml-2 mr-2">
            {value === "EFT" && (
            <Button
                 type="primary"
                 onClick={() => handleEFTOrder()}
                 loading={addingCODinventory}
              >
                Checkout
              </Button>)}
            </div>
        </div>
              </Radio>
 
       
          <Radio value={"Cash on Delivery"}>
          <div className="flex items-center">
          <img className="w-[4.25rem]"  alt="pay"  />
              {value === "Cash on Delivery" && (
              <Button
              type="primary"
              onClick={() => handleAddPlaceOrder()}
              loading={addingCODinventory}
            >
                Checkout
              </Button>
                     )}
            </div>
 
            <div>
              <h3>pay in cash or pay in per at the time of delivery</h3>
            </div>
         
          </Radio>

          
 
         <div class="flex justify-between items-center mt-2" >
          
          <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
      <Radio value="pay by check">
        <div className=" flex font-semibold mt-2">      
          Pay by Check
          {paymentMethod === "pay by check" && (
            <div className="flex justify-center ml-2 mr-2">
              {/* <Input
                className="rounded border-black w-48"
                type="text"
                value={checkNo}
                onChange={handleInputChange}
                //onBlur={handlePayByBlur}
                placeholder="Enter check No"
              /> */}
               <Button type="primary" 
            //    onClick={handlePayByBlur} 
               style={{marginLeft:"1rem"}}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </Radio>
      
    </Radio.Group>
        </div>


        <div className="flex justify-between mt-2">
          <Radio value={"Creditors"}>
            <div className="flex justify-between mt-2"> 
            <div>
            <h3>Credit - Net 30 </h3>
          </div>
            <div className="flex justify-center ml-2 mr-2">
            {value === "Creditors" && (
            <Button
            type="primary"
            onClick={() => handleCreditOrder()}
            loading={addingCODinventory}
         >
           Checkout
         </Button>)}
            </div>
        </div>
          </Radio>
          </div>

        <br />
        <br />
      </Radio.Group>


    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   codInventoryOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportuniyConvertDrawerCard);


