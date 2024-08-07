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



import React, { useState, useEffect } from 'react';
import { Switch, Space, Popconfirm, message } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentFinance, addPaymentData } from "../../../SettingsAction";

const PaymentSwitches = (props) => {
  const [paymentMethods, setPaymentMethods] = useState({});

  useEffect(() => {
    props.getPaymentFinance(props.orgId);
  }, []);

  useEffect(() => {
    if (Array.isArray(props.paymentFinance)) {
      const initialState = props.paymentFinance.reduce((acc, item) => {
        acc[item.paymentMode] = item.liveInd;
        return acc;
      }, {});
      setPaymentMethods(initialState);
    }
  }, [props.paymentFinance]);

  const confirmChange = async (method, checked) => {
    const item = props.paymentFinance.find(
      (item) => item.paymentMode === method
    );

    const newPaymentMethods = {
      ...paymentMethods,
      [method]: checked,
    };
    setPaymentMethods(newPaymentMethods);
    // await apiCall(item, checked);
    console.log(`paymentTypeId: ${item.paymentTypeId}, liveInd: ${checked}`);
    // console.log(newPaymentMethods);
    props.addPaymentData(item.paymentTypeId,checked)
  };

  return (
    <Space direction="vertical">
      {Object.keys(paymentMethods).map((method) => (
        <div key={method}>
           {method}
          <Popconfirm
            title={`Are you sure you want to ${
              paymentMethods[method] ? 'disable' : 'enable'
            } ${method}?`}
            onConfirm={() => confirmChange(method, !paymentMethods[method])}
            okText="Yes"
            cancelText="No"
          >
            <Switch
             checkedChildren="Yes"
                        unCheckedChildren="No"
              checked={paymentMethods[method]}
              onClick={(checked, event) => event.preventDefault()}
            />
           
          </Popconfirm>
        </div>
      ))}
    </Space>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  paymentFinance: settings.paymentFinance , // Ensure paymentFinance is an array
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



