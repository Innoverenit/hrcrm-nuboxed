// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Tooltip, Switch, Select, message } from "antd";
// import { Formik, Form, Field, FieldArray, FastField } from "formik";
// import { Radio } from "antd";
// import * as Yup from "yup";
// import { updateSuscription } from "../SubscriptionAction";
// import dayjs from "dayjs";
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

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import { Card, Col, Row, Layout } from 'antd';
import { getLeadSubscriptionData } from "../../LeadsAction";
import dayjs from "dayjs";
import { FaFreeCodeCamp, FaRocket, FaBriefcase, FaBuilding } from 'react-icons/fa';
const { Header, Content, Footer } = Layout;
function LeadsSubscriptionForm(props) {
  const data = [
    {
      callInd: true,
      noOfcalls: 5,
      perMonthValue: 300,
      publishInd: false,
      subscriptionName: 'Silver'
    },
    {
      callInd: true,
      noOfcalls: 6,
      perMonthValue: 700,
      publishInd: false,
      subscriptionName: 'Diamond'
    }
  ];
   const [workType, setWorkType] = useState("1");
  // const [selectedType, setSelectedType] = useState("1");
  //const [selectedType, setSelectedType] = useState(props.rowData.subscriptionType);
  const subscriptionPlans = [
    
    { 
      type: "1", 
      title: "Starter", 
      price: "9.99", 
      features: ["Starter features"], 
      description: "Ideal for individuals and small teams", 
      icon: <FaRocket /> 
    },
    { 
      type: "2", 
      title: "Professional", 
      price: "29.99", 
      features: ["Professional features"], 
      description: "Advanced features for professionals and businesses", 
      icon: <FaBriefcase /> 
    },
    { 
      type: "3", 
      title: "Enterprise", 
      price: "50.49", 
      features: ["All features"], 
      description: "Tailored solutions for large enterprises", 
      icon: <FaBuilding /> 
    },
    { 
      type: "4", 
      title: "Custom", 
      price: "Contact us", 
      features: ["All features","Custom solutions"], 
      description: "Get started with All features Customised", 
      icon: <FaFreeCodeCamp /> 
    },
  ];
  const handleCardClick = (type) => {
    setWorkType(type);
  };
  // const handleCardClick = (type) => {
  //   setSelectedType(selectedType === type ? null : type);
  // };
  useEffect(() => {
   props.getLeadSubscriptionData(props.orgId)
  }, []);

  const { updateSuscription, updatingSuscrption } = props;
// console.log(props.rowData.subscriptionType)
  return (
    <>
      <Layout className="layout">
   
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        <Row gutter={16}>
          {props.subscriptionLeadsData.map((subscription, index) => (
            <Col span={8} key={index}>
              <Card
                title={subscription.subscriptionName}
                bordered={false}
                style={{ margin: '10px' }}
                hoverable
              >
                <p>Per Month Value: ${subscription.perMonthValue}</p>
                {subscription.callInd && (
                  <p>Calls: {subscription.noOfcalls}</p>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  
  </Layout>
    </>
  );
}

const mapStateToProps = ({ auth,leads, subscription }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  subscriptionLeadsData:leads.subscriptionLeadsData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  updatingSuscrption: subscription.updatingSuscrption,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   updateSuscription,
    getLeadSubscriptionData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsSubscriptionForm);
