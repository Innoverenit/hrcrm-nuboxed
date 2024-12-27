import React, {Component,useState,useEffect} from "react";

import { Radio,Button } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {codInventoryOrder} from "../AccountAction";


const OpportuniyConvertDrawerCard = ({ props,userId,setopenConvertModal,stripeNo,particularRowItem, invencartItem, addiNVEStripeModal, handleInventoryStripeModal, codInventoryOrder, getInventoryCartItems, addingCODinventory }) => {
  const [value, setValue] = useState(1);
 

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
      amount: particularRowItem.paymentAmount ? particularRowItem.paymentAmount : 0,
      quotationId: particularRowItem.quotationId ,
      type: "Cash on Delivery",
      orderProcess:"checkout",
    };
    codInventoryOrder(data);
    setopenConvertModal(false);
  };
  const handleEFTOrder = () => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
      amount: particularRowItem.paymentAmount ? particularRowItem.paymentAmount : 0,
       quotationId: particularRowItem.quotationId ,
      type: "EFT",
      orderProcess:"checkout",
    };
     codInventoryOrder(data);
     setopenConvertModal(false)
  };

  const handleCreditOrder = () => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
      amount: particularRowItem.paymentAmount ? particularRowItem.paymentAmount : 0,
       quotationId: particularRowItem.quotationId ,
      type: "Credit",
      orderProcess:"checkout",
    };
     codInventoryOrder(data);
     setopenConvertModal(false);
  };
  const handlePaybyOrder = () => {
    // history.push("/shopName/invOrdersuccess");
    let data = {
      amount: particularRowItem.paymentAmount ? particularRowItem.paymentAmount : 0,
       quotationId: particularRowItem.quotationId ,
      type: "PayByCheqe",
      orderProcess:"checkout",
    };
     codInventoryOrder(data);
    setopenConvertModal(false);
  };
  console.log(particularRowItem)
  return (
    <>
     
      <Radio.Group onChange={onChange} value={value}>
      <div className="flex flex-col">
          <Radio value={"EFT"}>
          <div className="flex justify-between mt-2"> 
            <div className="flex">
          <label> Electronics Fund Transfer (EFT) - </label> send remittance 
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
          <div>
              <h3>Pay in cash or pay at the time of delivery</h3>
            </div>
          {/* <img className="w-[4.25rem]"  alt="pay"  /> */}
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
 
          
         
          </Radio>
          {/* <Radio.Group onChange={handlePaymentChange} value={paymentMethod}> */}
      <Radio value="pay by check">
        <div className=" flex font-semibold mt-2">      
          Pay by Check
          {/* {paymentMethod === "pay by check" && ( */}
            <div className="flex justify-center ml-2 mr-2">
              {/* <Input
                className="rounded border-black w-48"
                type="text"
                value={checkNo}
                onChange={handleInputChange}
                //onBlur={handlePayByBlur}
                placeholder="Enter check No"
              /> */}
               {/* <Button type="primary" 
            //    onClick={handlePayByBlur} 
               style={{marginLeft:"1rem"}}>
                Checkout
              </Button> */}
              {value === "pay by check" && (
              <Button
              type="primary"
              onClick={() => handlePaybyOrder()}
              loading={addingCODinventory}
            >
                Checkout
              </Button>
              )} 
            </div>
          {/* )} */}
        </div>
      </Radio>
      
    {/* </Radio.Group> */}
          
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
      </Radio.Group>
   

    </>
  );
};

const mapStateToProps = ({ auth,distributor }) => ({
  userId: auth.userDetails.userId,
  addingCODinventory:distributor.addingCODinventory
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       codInventoryOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportuniyConvertDrawerCard);


