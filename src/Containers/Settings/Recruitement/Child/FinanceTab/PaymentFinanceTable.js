import React, { useState,useEffect } from 'react';
import { Switch, Space, Popconfirm, message } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { getPaymentFinance,addPaymentData } from "../../../SettingsAction";


const PaymentSwitches = (props) => {
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: false,
    razorpay: false,
    cash: false,
    check: false,
  });


  useEffect(()=> {
    props.getPaymentFinance(props.orgId);
},[]);

//   const apiCall = async (method, checked) => {
//     try {
//       // Replace with your API endpoint and request payload
//       const response = await axios.post('/api/payment-method', {
//         method,
//         enabled: checked,
//       });
//       message.success(`${method} has been ${checked ? 'enabled' : 'disabled'}`);
//       console.log(response.data);
//     } catch (error) {
//       message.error(`Failed to update ${method}`);
//       console.error(error);
//     }
//   };

  const confirmChange = async (method, checked) => {
    const newPaymentMethods = {
      ...paymentMethods,
      [method]: checked,
    };
    setPaymentMethods(newPaymentMethods);
    props.addPaymentData()
    // await apiCall(method, checked);
    console.log(newPaymentMethods);
  };

  return (
    <Space direction="vertical">
      <div>
        <Popconfirm
          title={`Are you sure you want to ${paymentMethods.stripe ? 'disable' : 'enable'} Stripe?`}
          onConfirm={() => confirmChange('stripe', !paymentMethods.stripe)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={paymentMethods.stripe}
            onClick={(checked, event) => event.preventDefault()}
          />
          Stripe
        </Popconfirm>
      </div>
      <div>
        <Popconfirm
          title={`Are you sure you want to ${paymentMethods.razorpay ? 'disable' : 'enable'} RazorPay?`}
          onConfirm={() => confirmChange('razorpay', !paymentMethods.razorpay)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={paymentMethods.razorpay}
            onClick={(checked, event) => event.preventDefault()}
          />
          RazorPay
        </Popconfirm>
      </div>
      <div>
        <Popconfirm
          title={`Are you sure you want to ${paymentMethods.cash ? 'disable' : 'enable'} Pay by Cash?`}
          onConfirm={() => confirmChange('cash', !paymentMethods.cash)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={paymentMethods.cash}
            onClick={(checked, event) => event.preventDefault()}
          />
          Pay by Cash
        </Popconfirm>
      </div>
      <div>
        <Popconfirm
          title={`Are you sure you want to ${paymentMethods.check ? 'disable' : 'enable'} Pay by Check?`}
          onConfirm={() => confirmChange('check', !paymentMethods.check)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={paymentMethods.check}
            onClick={(checked, event) => event.preventDefault()}
          />
          Pay by Check
        </Popconfirm>
      </div>
    </Space>
  );
};


const mapStateToProps = ({ settings,auth }) => ({
    //fetchingCurrencyConversion: settings.fetchingCurrencyConversion,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    paymentFinance:settings.paymentFinance,
    // conversionCurrencies:settings.conversionCurrencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPaymentFinance,
            addPaymentData
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentSwitches);


