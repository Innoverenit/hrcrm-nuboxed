import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import { updateSuscription } from "../SubscriptionAction";

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkIcon from '@mui/icons-material/Work';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import ApartmentIcon from '@mui/icons-material/Apartment';

function SubscriptionForm(props) {
  
   const [workType, setWorkType] = useState(props.rowData.subscriptionType);
  // const [selectedType, setSelectedType] = useState("1");
  const [selectedType, setSelectedType] = useState(props.rowData.subscriptionType);
  const subscriptionPlans = [
    
    { 
      type: "1", 
      title: "Starter", 
      price: "9.99", 
      features: ["Starter features"], 
      description: "Ideal for individuals and small teams", 
      icon: <RocketLaunchIcon className="!text-icon" /> 
    },
    { 
      type: "2", 
      title: "Professional", 
      price: "29.99", 
      features: ["Professional features"], 
      description: "Advanced features for professionals and businesses", 
      icon: <DeveloperModeIcon className="!text-icon" /> 
    },
    { 
      type: "3", 
      title: "Enterprise", 
      price: "50.49", 
      features: ["All features"], 
      description: "Tailored solutions for large enterprises", 
      icon: <ApartmentIcon className="!text-icon" /> 
    },
    { 
      type: "4", 
      title: "Custom", 
      price: "Contact us", 
      features: ["All features","Custom solutions"], 
      description: "Get started with All features Customised", 
      icon: <WorkIcon className="!text-icon"/> 
    },
  ];
  const handleCardClick = (type) => {
    setWorkType(type);
  };
  // const handleCardClick = (type) => {
  //   setSelectedType(selectedType === type ? null : type);
  // };
  useEffect(() => {
    const {} = props;
  }, []);

  const { updateSuscription, updatingSuscrption } = props;
console.log(props.rowData.subscriptionType)
  return (
    <>
      <Formik
        initialValues={{
          subscriptionType: workType,
        // subscriptionType: selectedType,
          organizationId: props.orgId,
          SubscriptionEndDate: props.rowData.SubscriptionEndDate,
        }}
        onSubmit={(values, { resetForm }) => {
          updateSuscription(
            {
              ...values,
              organizationId: props.orgId,
             subscriptionType: workType,
            // subscriptionType: selectedType,
              SubscriptionEndDate: props.rowData.SubscriptionEndDate,
            },
            props.orgId
          );
          resetForm();
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <div className="h-[32rem] max-sm:h-[30rem]">
            <Form className="form-background">
              <div className="flex justify-between pr-2 max-sm:flex-col">
                <div className="w-wk">
                  <div className="mt-3">
                    <div className="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-base flex flex-col">
                      Subscription
                    </div>
                    <div className=" bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div
                         className={`cursor-pointer flex flex-col h-[20rem] p-6 rounded-3xl shadow-lg transform transition-transform hover:scale-105 ${
                          workType === "1"
                            ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-blue-300"
                            : "border-2 border-transparent bg-white"
                        }`}
                        onClick={() => handleCardClick("1")}
                      >
                         <div className="flex items-center justify-center mb-4 text-4xl text-blue-500">
                         <RocketLaunchIcon className="!text-icon" />
            </div>
                        <div className="text-xl font-semibold text-center text-gray-900">Starter</div>
                        <div className="text-lg font-bold text-center mt-2">€ </div>
                        <div className="text-lg font-bold text-center mt-2">Starter features</div>
                        <div className="text-sm text-gray-600 mt-4">Ideal for individuals and small teams</div>
                      </div>
                      <div
                        className={`cursor-pointer flex flex-col h-[20rem] p-6 rounded-3xl shadow-lg transform transition-transform hover:scale-105 ${
                          workType === "2"
                            ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-blue-300"
                            : "border-2 border-transparent bg-white"
                        }`}
                        onClick={() => handleCardClick("2")}
                      >
                         <div className="flex items-center justify-center mb-4 text-4xl text-blue-500">
                         <DeveloperModeIcon className="!text-icon" /> 
            </div>
                        <div className="text-xl font-semibold text-center text-gray-900">Professional</div>
                        <div className="text-lg font-bold text-center mt-2">€ </div>
                        <div className="text-lg font-bold text-center mt-2">Professional features</div>
                        <div className="text-sm text-gray-600 mt-4">Advanced features for professionals and businesse</div>
                      </div>
                      <div
                       className={`cursor-pointer flex flex-col h-[20rem] p-6 rounded-3xl shadow-lg transform transition-transform hover:scale-105 ${
                          workType === "3"
                            ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-blue-300"
                            : "border-2 border-transparent bg-white"
                        }`}
                        onClick={() => handleCardClick("3")}
                      >
                          <div className="absolute top-[0.25rem] left-[10rem]  bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            Recommended
          </div>
                         <div className="flex items-center justify-center mb-4 text-4xl text-blue-500">
                         <ApartmentIcon className="!text-icon" /> 
            </div>
                        <div className="text-xl font-semibold text-center text-gray-900">Enterprise</div>
                        <div className="text-lg font-bold text-center mt-2">€ </div>
                        <div className="text-lg font-bold text-center mt-2">All features</div>
                        <div className="text-sm text-gray-600 mt-4">Tailored solutions for large enterprises</div>
                      </div>
           
                      <div
                        className={`cursor-pointer flex flex-col h-[20rem] p-6 rounded-3xl shadow-lg transform transition-transform hover:scale-105 ${
                          workType === "4"
                            ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-blue-300"
                            : "border-2 border-transparent bg-white"
                        }`}
                        onClick={() => handleCardClick("4")}
                      >
                          <div className="flex items-center justify-center mb-4 text-4xl text-blue-500">
                          <WorkIcon className="!text-icon"/> 
            </div>
                        <div className="text-xl font-semibold text-center text-gray-900">Custom</div>
                        <div className="text-lg font-bold text-center mt-2">Contact us</div>
                        <div className="text-lg font-bold text-center mt-2">All features Custom solutions</div>
                        <div className="text-sm text-gray-600 mt-4">Get started with Customized features </div>
                      </div>
                    </div>
                    </div>
     {/* <div className=" bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {subscriptionPlans.map(({ type, title, price, features, description, icon }) => (
          <div
            key={type}
            className={`cursor-pointer p-6 rounded-3xl shadow-lg transform transition-transform hover:scale-105 ${
              selectedType === type
                ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-blue-300"
                : "border-2 border-transparent bg-white"
            }`}
            onClick={() => handleCardClick(type)}
          >
            <div className="flex items-center justify-center mb-4 text-4xl text-blue-500">
              {icon}
            </div>
            <div className="text-xl font-semibold text-center text-gray-900">{title}</div>
            <p className="text-lg font-bold text-center mt-2">{price === "Contact us" ? price : `€${price}`}</p>
            <ul className="text-sm text-gray-600 mt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-1">&#8226;</span> {feature}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-4">{description}</p>
          </div>
        ))}
      </div>
    </div> */}

                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={updatingSuscrption}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, subscription }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  updatingSuscrption: subscription.updatingSuscrption,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateSuscription,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm);
