// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Tooltip, Switch, Select, message } from "antd";
// import { Formik, Form, Field, FieldArray, FastField } from "formik";
// import { Radio } from "antd";
// import * as Yup from "yup";
// import { updateSuscription } from "../SubscriptionAction";
// const { Option } = Select;



// function SuscriptionForm(props) {


//   const [workType, setWorkType] = useState("1");

//   const radioClick = (c) => {
//     setWorkType(c);
//   };

//   useEffect(() => {
//     const { } = props;
   
//   }, []);


//   const {
    
//   } = props;


//   const { updateSuscription, updatingSuscrption } = props;

//   return (
//     <>
//       <Formik
//         initialValues={{
         
//             subscriptionType: workType,
//             organizationId:props.orgId,
//             SubscriptionEndDate:props.rowData.SubscriptionEndDate

          
//         }}
//        // validationSchema={EmployeeSchema}
//         onSubmit={(values, { resetForm }) => {
         
//             updateSuscription({
//               ...values,
//               organizationId:props.orgId,
//               subscriptionType: workType,
//               SubscriptionEndDate:props.rowData.SubscriptionEndDate
//             }, 
//           props.orgId
//           );
         
         
//           resetForm();
//         }}
//       >
//         {({
//           errors,
//           touched,
//           isSubmitting,
//           setFieldValue,
//           setFieldTouched,
//           values,
//           ...rest
//         }) => (
//           <div class=" h-[32rem]  max-sm:h-[30rem]">
//             <Form className="form-background">
//               <div class="flex justify-between  pr-2 max-sm:flex-col">
//                 <div class="  max-sm:w-wk ">
                  
//                   <div class=" mt-3">
//                     <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
//                         Subscription
//                     </div>

//                     <Radio.Group
//                       name="radiogroup"
//                       defaultValue={workType}
//                     >
//                       <Radio
//                         style={{ marginLeft: "0.5rem" }}
//                         value={"1"}
//                         onChange={() => radioClick("1")}
//                       >
//                         Free
//                       </Radio>
                     
//                         <Radio
//                           style={{ marginLeft: "0.5rem" }}
//                           value={"2"}
//                           onChange={() => radioClick("2")}
//                         >
//                           Starter
//                         </Radio>
                     
//                       <Radio
//                         style={{ marginLeft: "0.5rem" }}
//                         value={"3"}
//                         onChange={() => radioClick("3")}
//                       >
//                         Professional
//                       </Radio>
//                       <Radio
//                         style={{ marginLeft: "0.5rem" }}
//                         value={"4"}
//                         onChange={() => radioClick("4")}
//                       >
//                         Enterprise
//                       </Radio>

//                     </Radio.Group>
//                   </div>
                 


                 
                  
//                 </div>
//               </div>

//               <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
//                 <Button
//                   htmlType="submit"
//                   type="primary"
//                   loading={updatingSuscrption}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         )}
//       </Formik>
//     </>
//   );

// }
// const mapStateToProps = ({ auth, subscription }) => ({
//   userDetails: auth.userDetails,
//   user: auth.userDetails,
//   organizationId: auth.userDetails.organizationId,
//   orgId: auth.userDetails.organizationId,
//   updatingSuscrption: subscription.updatingSuscrption,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({
//     updateSuscription
//   }, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(SuscriptionForm);

// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button } from "antd";
// import { Formik, Form } from "formik";
// import { Card, Col, Row, Layout } from 'antd';
// import { getLeadSubscriptionData,addSubscriptionData ,getSubscriptionCompare} from "../../LeadsAction";
// import dayjs from "dayjs";
// import { FaFreeCodeCamp, FaRocket, FaBriefcase, FaBuilding } from 'react-icons/fa';
// const { Header, Content, Footer } = Layout;
// function LeadsSubscriptionForm(props) {
//   const data = [
//     {
//       callInd: true,
//       noOfcalls: 5,
//       perMonthValue: 300,
//       publishInd: false,
//       subscriptionName: 'Silver'
//     },
//     {
//       callInd: true,
//       noOfcalls: 6,
//       perMonthValue: 700,
//       publishInd: false,
//       subscriptionName: 'Diamond'
//     }
//   ];
//    const [workType, setWorkType] = useState("1");
//    const [highlightedIndex, setHighlightedIndex] = useState(null);
//    const [clickedIndex, setClickedIndex] = useState(null);
  
  
//   useEffect(() => {
//    props.getLeadSubscriptionData(props.orgId)
//    props.getSubscriptionCompare(props.item.leadsId)
//   }, []);

//   useEffect(() => {
//     const index = props.subscriptionLeadsData.findIndex(sub => sub.subscriptionId === props.compareSubscription.subscriptionId);
//     if (index !== -1) {
//       setHighlightedIndex(index);
//     }
//   }, []);
//   const handleClick = (subscription, index) => {
//     console.log(subscription);
//     setClickedIndex(index);
//     let data={
//       leadsId: props.item.leadsId,
//       paymentId: "",
//       paymentInd: true,
//       subscriptionId: subscription.subscriptionId,
//       validationFrom: "",
//       validationTo: ""
//     }
//     props.addSubscriptionData(data)
//   };

//   const { updateSuscription, updatingSuscrption } = props;
// // console.log(props.rowData.subscriptionType)
//   return (
//     <>
//       <Layout className="layout">
   
//     <Content style={{ padding: '0 50px' }}>
//       <div className="site-layout-content">
//         <Row gutter={16}>
//           {props.subscriptionLeadsData.map((subscription, index) => (
//             <Col span={8} key={index}>
//               <Card
//                 title={subscription.subscriptionName}
//                 bordered={false}
//                 style={{
//                   margin: '10px',
//                   border: clickedIndex === index 
//                           ? '2px solid #1890ff' 
//                           : highlightedIndex === index 
//                           ? '2px solid #52c41a' // Initial highlight color
//                           : '1px solid #f0f0f0'
//                 }}
//                 hoverable
               
//                 onClick={() => handleClick(subscription, index)}
//               >
//                 <p>Per Month Value: ${subscription.perMonthValue}</p>
//                 {subscription.callInd && (
//                   <p>Calls: {subscription.noOfcalls}</p>
//                 )}
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </Content>
  
//   </Layout>
//     </>
//   );
// }

// const mapStateToProps = ({ auth,leads, subscription }) => ({
//   userDetails: auth.userDetails,
//   user: auth.userDetails,
//   subscriptionLeadsData:leads.subscriptionLeadsData,
//   organizationId: auth.userDetails.organizationId,
//   orgId: auth.userDetails.organizationId,
//   compareSubscription:subscription.compareSubscription,
//   updatingSuscrption: subscription.updatingSuscrption,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//     //   updateSuscription,
//     getLeadSubscriptionData,
//     addSubscriptionData,
//     getSubscriptionCompare
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(LeadsSubscriptionForm);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Col, Row, Layout } from 'antd';
import { getLeadSubscriptionData, addSubscriptionData, getSubscriptionCompare } from "../../LeadsAction";

const { Header, Content, Footer } = Layout;

function LeadsSubscriptionForm(props) {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  console.log("Component Rendered");
  console.log(props.item)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        await props.getLeadSubscriptionData(props.orgId);
        await props.getSubscriptionCompare(props.item.leadsId);
        console.log("Data fetched successfully");
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.orgId, props.item.leadsId]);

  useEffect(() => {
    console.log("Checking if data is loaded", { isDataLoaded, subscriptionLeadsData: props.subscriptionLeadsData, compareSubscription: props.compareSubscription });

    if (isDataLoaded && props.subscriptionLeadsData && props.compareSubscription) {
      const index = props.subscriptionLeadsData.findIndex(
        (sub) => sub.subscriptionId === props.compareSubscription.subscriptionId
      );

      console.log("Highlighted Index:", index);

      if (index !== -1) {
        setHighlightedIndex(index);
      } else {
        console.log("No matching subscriptionId found");
      }
    } else {
      console.log("Data not loaded yet or missing data");
    }
  }, [isDataLoaded, props.subscriptionLeadsData, props.compareSubscription]);

  const handleClick = (subscription, index) => {
    if (highlightedIndex !== index) { // Disable click if highlighted
      console.log("Card Clicked:", subscription);
      setClickedIndex(index);
      let data = {
        leadsId: props.item.leadsId,
        amount:subscription.perMonthValue,
        name:props.item.name,
        phone:props.item.phoneNumber,
        currency:"INR",
        email:props.item.email,
        // paymentId: "",
        userId:props.userId,
        orgId:props.orgId
        // paymentInd: true,
        // subscriptionId: subscription.subscriptionId,
        // validationFrom: "",
        // validationTo: ""
      };
      props.addSubscriptionData(data);
    }
  };
console.log(props.compareSubscription)
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row gutter={16}>
            {props.subscriptionLeadsData.map((subscription, index) => (
              <Col span={8} key={index}>
                <Card
                  title={subscription.subscriptionName}
                  bordered={false}
                  style={{
                    margin: '10px',
                    border: clickedIndex === index 
                      ? '2px solid #1890ff' 
                      : highlightedIndex === index 
                      ? '2px solid #52c41a' // Initial highlight color
                      : '1px solid #f0f0f0',
                    transition: 'border 0.3s ease', // Smooth transition
                    //opacity: highlightedIndex === index ? 0.5 : 1
                  }}
                  hoverable
                  onClick={() => handleClick(subscription, index)}
                >
                  <p>Per Month Value: ₹{subscription.perMonthValue}</p>
                  {subscription.callInd && (
                    <p>Calls: {subscription.noOfcalls}</p>
                  )}
{subscription.ruleDto.map((item, index) => (
  <p key={index}>{item.ruleType}: {item.ruleValue}</p>
))}
<p style={{fontWeight:"bolder"}}>10% discount on additional services</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
     
    </Layout>
  );
}

const mapStateToProps = ({ auth, leads, subscription }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  subscriptionLeadsData: leads.subscriptionLeadsData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  compareSubscription: leads.compareSubscription,
  updatingSuscrption: subscription.updatingSuscrption,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeadSubscriptionData,
      addSubscriptionData,
      getSubscriptionCompare
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsSubscriptionForm);






