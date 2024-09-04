// import React, { useState,useEffect } from 'react';
// import { Switch, Space, Popconfirm, message } from 'antd';
// import axios from 'axios';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";


// import { getPaymentFinance,addPaymentData } from "../../../SettingsAction";


// const PaymentSwitches = (props) => {
//   const initialState = props.paymentFinance.reduce((acc, item) => {
//     acc[item.paymentMode.toLowerCase().replace(/\s+/g, '')] = item.liveInd;
//     return acc;
//   }, {});


//   const [paymentMethods, setPaymentMethods] = useState(initialState);


//   useEffect(()=> {
//     props.getPaymentFinance(props.orgId);
// },[]);




// const confirmChange = async (method, checked) => {
//   const item = props.paymentFinance.find(
//     (item) => item.paymentMode.toLowerCase().replace(/\s+/g, '') === method
//   );

//   const newPaymentMethods = {
//     ...paymentMethods,
//     [method]: checked,
//   };
//   setPaymentMethods(newPaymentMethods);
//   // await apiCall(item, checked);
//   console.log(`paymentTypeId: ${item.paymentTypeId}, liveInd: ${checked}`);
//   console.log(newPaymentMethods);
// };
//   return (
//     <Space direction="vertical">
//       {Object.keys(paymentMethods).map((method) => (
//         <div key={method}>
//           <Popconfirm
//             title={`Are you sure you want to ${
//               paymentMethods[method] ? 'disable' : 'enable'
//             } ${method}?`}
//             onConfirm={() => confirmChange(method, !paymentMethods[method])}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Switch
//               checked={paymentMethods[method]}
//               onClick={(checked, event) => event.preventDefault()}
//             />
//             {method.replace(/([A-Z])/g, ' $1').trim()}
//           </Popconfirm>
//         </div>
//       ))}
//     </Space>
//   );
// };


// const mapStateToProps = ({ settings,auth }) => ({
//     //fetchingCurrencyConversion: settings.fetchingCurrencyConversion,
//     userId: auth.userDetails.userId,
//     orgId:auth.userDetails.organizationId,
//     paymentFinance:settings.paymentFinance,
//     // conversionCurrencies:settings.conversionCurrencies
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getPaymentFinance,
//             addPaymentData
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(PaymentSwitches);



// import React, { useState, useEffect } from 'react';
// import { Switch, Space, Popconfirm, message } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getPaymentFinance, addPaymentData } from "../../../SettingsAction";

// const PaymentSwitches = (props) => {
//   const [paymentMethods, setPaymentMethods] = useState({});

//   useEffect(() => {
//     props.getPaymentFinance(props.orgId);
//   }, []);

//   useEffect(() => {
//     if (Array.isArray(props.paymentFinance)) {
//       const initialState = props.paymentFinance.reduce((acc, item) => {
//         acc[item.paymentMode] = item.liveInd;
//         return acc;
//       }, {});
//       setPaymentMethods(initialState);
//     }
//   }, [props.paymentFinance]);

//   const confirmChange = async (method, checked) => {
//     const item = props.paymentFinance.find(
//       (item) => item.paymentMode === method
//     );

//     const newPaymentMethods = {
//       ...paymentMethods,
//       [method]: checked,
//     };
//     setPaymentMethods(newPaymentMethods);
//     // await apiCall(item, checked);
//     console.log(`paymentTypeId: ${item.paymentTypeId}, liveInd: ${checked}`);
//     // console.log(newPaymentMethods);
//     props.addPaymentData(item.paymentTypeId,checked)
//   };

//   return (
//     <Space direction="vertical">
//       {Object.keys(paymentMethods).map((method) => (
//         <div key={method}>
//            {method}
//           <Popconfirm
//             title={`Are you sure you want to ${
//               paymentMethods[method] ? 'disable' : 'enable'
//             } ${method}?`}
//             onConfirm={() => confirmChange(method, !paymentMethods[method])}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Switch
//              checkedChildren="Yes"
//                         unCheckedChildren="No"
//               checked={paymentMethods[method]}
//               onClick={(checked, event) => event.preventDefault()}
//             />
           
//           </Popconfirm>
//         </div>
//       ))}
//     </Space>
//   );
// };

// const mapStateToProps = ({ settings, auth }) => ({
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
//   paymentFinance: settings.paymentFinance , // Ensure paymentFinance is an array
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getPaymentFinance,
//       addPaymentData,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(PaymentSwitches);




import React, { useState, useEffect } from 'react';
import { Switch, Space, Popconfirm } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentFinance, addPaymentData } from "../../../SettingsAction";

// Define the initialData structure as the fallback
const initialData = {
  creditInd: false,
  elecFormTransInd: false,
  payByCashInd: false,
  payByCheckInd: false,
  razorpayInd: false,
  stripeInd: false,
};

const PaymentSwitches = (props) => {
  const [paymentMethods, setPaymentMethods] = useState(props.paymentFinance);

  useEffect(() => {
    props.getPaymentFinance(props.orgId);
  }, []);

  useEffect(() => {
    if (props.paymentFinance) {
      setPaymentMethods({
        creditInd: props.paymentFinance.creditInd,
        elecFormTransInd: props.paymentFinance.elecFormTransInd,
        payByCashInd: props.paymentFinance.payByCashInd,
        payByCheckInd: props.paymentFinance.payByCheckInd,
        razorpayInd: props.paymentFinance.razorpayInd,
        stripeInd: props.paymentFinance.stripeInd,
      });
    }
  }, [props.paymentFinance]);

  const confirmChange = async (method, checked) => {
    const newPaymentMethods = {
      ...paymentMethods,
      [method]: checked,
    };
    setPaymentMethods(newPaymentMethods);
    const data={
      creditInd: newPaymentMethods.creditInd,
      elecFormTransInd: newPaymentMethods.elecFormTransInd,
      payByCashInd: newPaymentMethods.payByCashInd,
      payByCheckInd: newPaymentMethods.payByCheckInd,
      razorpayInd: newPaymentMethods.razorpayInd,
      stripeInd: newPaymentMethods.stripeInd,
    }

    console.log(`paymentMode: ${method}, liveInd: ${checked}`);
    props.addPaymentData(data);
  };

  return (
    <Space direction="vertical">
      <div>
        Credit
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.creditInd ? 'disable' : 'enable'
          } Credit?`}
          onConfirm={() => confirmChange('creditInd', !paymentMethods.creditInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.creditInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>

      <div>
        Electronic Transfer
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.elecFormTransInd ? 'disable' : 'enable'
          } Electronic Form Transfer?`}
          onConfirm={() => confirmChange('elecFormTransInd', !paymentMethods.elecFormTransInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.elecFormTransInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>

      <div>
        Pay by Cash
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.payByCashInd ? 'disable' : 'enable'
          } Pay by Cash?`}
          onConfirm={() => confirmChange('payByCashInd', !paymentMethods.payByCashInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.payByCashInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>

      <div>
        Pay by Check
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.payByCheckInd ? 'disable' : 'enable'
          } Pay by Check?`}
          onConfirm={() => confirmChange('payByCheckInd', !paymentMethods.payByCheckInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.payByCheckInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>

      <div>
        Razorpay
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.razorpayInd ? 'disable' : 'enable'
          } Razorpay?`}
          onConfirm={() => confirmChange('razorpayInd', !paymentMethods.razorpayInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.razorpayInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>

      <div>
        Stripe
        <Popconfirm
          title={`Are you sure you want to ${
            paymentMethods.stripeInd ? 'disable' : 'enable'
          } Stripe?`}
          onConfirm={() => confirmChange('stripeInd', !paymentMethods.stripeInd)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={paymentMethods.stripeInd}
            onClick={(checked, event) => event.preventDefault()}
          />
        </Popconfirm>
      </div>
    </Space>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  paymentFinance: settings.paymentFinance 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPaymentFinance,
      addPaymentData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSwitches);





