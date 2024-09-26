




// import React, { useState, useEffect } from 'react';
// import { Switch, Space, Popconfirm } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getPaymentFinance, addPaymentData } from "../../../SettingsAction";



// const PaymentSwitches = (props) => {
//   const [paymentMethods, setPaymentMethods] = useState(props.paymentFinance);

//   useEffect(() => {
//     props.getPaymentFinance(props.orgId);
//   }, []);

//   useEffect(() => {
//     if (props.paymentFinance) {
//       setPaymentMethods({
//         creditInd: props.paymentFinance.creditInd,
//         elecFormTransInd: props.paymentFinance.elecFormTransInd,
//         payByCashInd: props.paymentFinance.payByCashInd,
//         payByCheckInd: props.paymentFinance.payByCheckInd,
//         razorpayInd: props.paymentFinance.razorpayInd,
//         stripeInd: props.paymentFinance.stripeInd,
//       });
//     }
//   }, [props.paymentFinance]);

//   const confirmChange = async (method, checked) => {
//     const newPaymentMethods = {
//       ...paymentMethods,
//       [method]: checked,
//     };
//     setPaymentMethods(newPaymentMethods);
//     const data={
//       creditInd: newPaymentMethods.creditInd,
//       elecFormTransInd: newPaymentMethods.elecFormTransInd,
//       payByCashInd: newPaymentMethods.payByCashInd,
//       payByCheckInd: newPaymentMethods.payByCheckInd,
//       razorpayInd: newPaymentMethods.razorpayInd,
//       stripeInd: newPaymentMethods.stripeInd,
//     }

//     console.log(`paymentMode: ${method}, liveInd: ${checked}`);
//     props.addPaymentData(data);
//   };

//   return (
//     <Space direction="vertical">
//       <div>
//         Credit
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.creditInd ? 'disable' : 'enable'
//           } Credit?`}
//           onConfirm={() => confirmChange('creditInd', !paymentMethods.creditInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.creditInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>

//       <div>
//         Electronic Transfer
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.elecFormTransInd ? 'disable' : 'enable'
//           } Electronic Form Transfer?`}
//           onConfirm={() => confirmChange('elecFormTransInd', !paymentMethods.elecFormTransInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.elecFormTransInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>

//       <div>
//         Pay by Cash
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.payByCashInd ? 'disable' : 'enable'
//           } Pay by Cash?`}
//           onConfirm={() => confirmChange('payByCashInd', !paymentMethods.payByCashInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.payByCashInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>

//       <div>
//         Pay by Check
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.payByCheckInd ? 'disable' : 'enable'
//           } Pay by Check?`}
//           onConfirm={() => confirmChange('payByCheckInd', !paymentMethods.payByCheckInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.payByCheckInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>

//       <div>
//         Razorpay
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.razorpayInd ? 'disable' : 'enable'
//           } Razorpay?`}
//           onConfirm={() => confirmChange('razorpayInd', !paymentMethods.razorpayInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.razorpayInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>

//       <div>
//         Stripe
//         <Popconfirm
//           title={`Are you sure you want to ${
//             paymentMethods.stripeInd ? 'disable' : 'enable'
//           } Stripe?`}
//           onConfirm={() => confirmChange('stripeInd', !paymentMethods.stripeInd)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//             checked={paymentMethods.stripeInd}
//             onClick={(checked, event) => event.preventDefault()}
//           />
//         </Popconfirm>
//       </div>
//     </Space>
//   );
// };

// const mapStateToProps = ({ settings, auth }) => ({
//   userId: auth.userDetails.userId,
//   orgId: auth.userDetails.organizationId,
//   paymentFinance: settings.paymentFinance 
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
import { Switch, Space, Popconfirm, Input, Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentFinance, addPaymentData ,addPaymentApi} from "../../../SettingsAction";

const PaymentSwitches = (props) => {
  const [paymentMethods, setPaymentMethods] = useState(props.paymentFinance);
  const [inputValues, setInputValues] = useState({
    razorpay: '',
    stripe: '',
  });

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
    
    const data = {
      creditInd: newPaymentMethods.creditInd,
      elecFormTransInd: newPaymentMethods.elecFormTransInd,
      payByCashInd: newPaymentMethods.payByCashInd,
      payByCheckInd: newPaymentMethods.payByCheckInd,
      razorpayInd: newPaymentMethods.razorpayInd,
      stripeInd: newPaymentMethods.stripeInd,
    };

    console.log(`paymentMode: ${method}, liveInd: ${checked}`);
    props.addPaymentData(data);
  };

  const handleInputChange = (e, method) => {
    setInputValues({
      ...inputValues,
      [method]: e.target.value,
    });
  };

  const handleSubmit = (method) => {
    console.log(`${method} value: ${inputValues[method]}`);
    let data={
      apiKey:inputValues[method],
      orgId:props.orgId,
      type:method,
      userId:props.userId,
    }
    props.addPaymentApi(data)
    // You can also handle submitting this value to the server here if needed.
  };

  return (
    <>
    <div className="border-4 border-black ">
    <div className="flex w-wk border-b-4 border-black  p-2">
    <div className="text-lg font-semibold w-1/2 flex justify-center">B2B</div>
    <div className="text-lg font-semibold w-1/2 flex justify-center">B2C</div>
  </div>
  <div className="flex">
   
    <div className="w-1/2 p-4">
    <Space direction="vertical">
    <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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
        {paymentMethods.razorpayInd && (
          <div style={{ marginTop: '8px' }}>
            <Input
              placeholder="Enter Razorpay value"
              value={inputValues.razorpay}
              onChange={(e) => handleInputChange(e, 'razorpay')}
            />
            <Button type="primary" onClick={() => handleSubmit('razorpay')} style={{ marginTop: '8px' }}>
              Submit
            </Button>
          </div>
        )}
      </div>

      <div className='flex justify-between'>
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
        {paymentMethods.stripeInd && (
          <div style={{ marginTop: '8px' }}>
            <Input
              placeholder="Enter Stripe value"
              style={{width:"59em"}}
              value={inputValues.stripe}
              onChange={(e) => handleInputChange(e, 'stripe')}
            />
            <Button type="primary" onClick={() => handleSubmit('stripe')} style={{ marginTop: '8px' }}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </Space>
    </div>
    <div className="border-2 border-black"></div>
    <div className="w-1/2 p-4">
    <Space direction="vertical">
      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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

      <div className='flex justify-between'>
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
        {paymentMethods.razorpayInd && (
          <div style={{ marginTop: '8px' }}>
            <Input
              placeholder="Enter Razorpay value"
              value={inputValues.razorpay}
              onChange={(e) => handleInputChange(e, 'razorpay')}
            />
            <Button type="primary" onClick={() => handleSubmit('razorpay')} style={{ marginTop: '8px' }}>
              Submit
            </Button>
          </div>
        )}
      </div>

      <div className='flex justify-between'>
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
        {paymentMethods.stripeInd && (
          <div style={{ marginTop: '8px' }}>
            <Input
              placeholder="Enter Stripe value"
              style={{width:"59em"}}
              value={inputValues.stripe}
              onChange={(e) => handleInputChange(e, 'stripe')}
            />
            <Button type="primary" onClick={() => handleSubmit('stripe')} style={{ marginTop: '8px' }}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </Space>
    </div>
    </div>
    </div>
    </>
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
      addPaymentApi
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSwitches);






