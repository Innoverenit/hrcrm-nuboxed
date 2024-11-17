import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";

import {
  getProcessForRecruit,
  getProcessStagesForRecruit,
} from "../../../../../Settings/SettingsAction";
import {
  addRecruit,
  getContactListByCustomerId,
} from "../../../../CustomerAction";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";

/**
 * yup validation scheme for creating a Customer
 */

const CustomerSchema = Yup.object().shape({
  requirementName: Yup.string().required("Please provide Requirement"),
  number: Yup.string().required("Please provide Number"),
  recruitmentProcessId: Yup.string().required("Select Workflow!"),
});

function RecruitForm(props) {
  const [typeData, setTypeData] = useState(true);
  function handleType(checked) {
    setTypeData(checked);
  }
  console.log(props.customerId);
  const processOption = useMemo(() => {
    debugger;
    if (!props.recruitProcess) return [];
    return (
      props.recruitProcess.length &&
      props.recruitProcess.map((process) => {
        return {
          label: process.recruitmentProcessName || "",
          value: process.recruitmentProcessId,
        };
      })
    );
  }, [props.recruitProcess]);

  // const currency = props.currencies.map((item) => {
  //   return {
  //     label: item.currencyName || "",
  //     value: item.currencyName,
  //   };
  // });
  const Sponsor = props.contactByCustomerId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });

  // function getStagesOptions(filterOptionKey, filterOptionValue) {
  //   const stagesOptions =
  //     props.allProcessStagesForRecruit.length &&
  //     props.allProcessStagesForRecruit
  //       .filter((option) => {
  //         if (
  //           option.processId === filterOptionValue &&
  //           option.probability !== 0 &&
  //           option.probability !== 100
  //         ) {
  //           return option;
  //         }
  //       })
  //       .map((option) => ({
  //         label: option.stageName || "",
  //         value: option.stageId,
  //       }));

  //   return stagesOptions;
  // }
  
  useEffect(() => {
    props.getProcessForRecruit(props.organizationId);
  //   props.getCurrency();
  //   props.getAllProcessStagesForRecruit();
    props.getContactListByCustomerId(props.customerId);
  }, []);
  function handleReset(resetForm) {
    resetForm();
  }
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          requirementName: "",
          number: "",
          sponserId: undefined,
          description: "",
          avilableDate: "",
          billing: "",
          currency: props.user.currency,
          recruitmentProcessId: undefined,
          // stageId: undefined,
          customerId: props.customerId,
          type: typeData ? "Contractor" : "Permanent",
        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });
          props.addRecruit(
            {
              ...values,
              customerId: props.customerId,
              type: typeData ? "Contractor" : "Permanent",
            },
            props.customerId,
            () => handleReset(resetForm)
          );
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
            <Form className="form-background">
              <div  class=" flex justify-between">
                <div class=" h-full w-full"
                >
                <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      <Field
                        name="requirementName"
                        //label="Name"
                        label={<FormattedMessage
                          id="app.requirementName"
                          defaultMessage="Name"
                        />}
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}
                       
                      />
                    </div>
                    <div class=" w-2/4">
                      <Field
                        name="sponserId"
                        //  label="Sponsor"
                        label={<FormattedMessage
                          id="app.sponserId"
                          defaultMessage="Sponsor"
                        />}
                        isColumn                       
                        // component={InputComponent}
                      component={SelectComponent}
                      options={Array.isArray(Sponsor) ? Sponsor : []}
                      
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />

                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      <Field
                        name="number"
                        // label="# Positions"
                        label={<FormattedMessage
                          id="app.number"
                          defaultMessage="# Positions"
                        />}
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}                        
                      />
                    </div>
                    <div class=" w-2/4">
                      <div class=" text-xs font-bold font-poppins text-black">Type </div>
                      <br/>
                    <Switch
                        checked={typeData}
                        onChange={handleType}
                        checkedChildren="Contractor"
                        unCheckedChildren="Permanent"                        
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />

                  <Field
                    name="description"
                    //label="Description"
                    label={<FormattedMessage
                      id="app.description"
                      defaultMessage="Description"
                    />}
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{                     
                      height: "5em",                      
                    }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="recruitmentProcessId"
                  
                    label={<FormattedMessage
                      id="app.recruitmentProcessId"
                      defaultMessage="Workflow"
                    />}
                    isRequired
                    isColumn                   
                  component={SelectComponent}
                  options={Array.isArray(processOption) ? processOption : []}
                  />
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                    <div class=" w-2/6">
                      {" "}
                      <Field
                        name="avilableDate"                       
                        label={<FormattedMessage
                          id="app.avilableDate"
                          defaultMessage="Start Date"
                        />}
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.avilableDate}
                        inlineLabel                       
                      />
                    </div>
                    <div class=" w-1/5">
                      {" "}
                      <Field
                        name="billing"
                        
                        label={<FormattedMessage
                          id="app.billing"
                          defaultMessage="Billing/hour"
                        />}
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}                       
                      />
                    </div>
                    <div class=" w-1/3 mt-4">
                      <Field
                        name="currency"
                        placeholder="Currency"
                        noLabel
                        isRequired
                        selectType="currencyName"
                        defaultValue={{
                          value:props.user.currency,
                        }}
                        component={SearchSelect}
                        flag={values.currency}
                       
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                </div>
              &nbsp;
              <div class=" h-full"
                
                ></div>
              </div>
              <div class=" mt-3" />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.linkingRecruitToCustomer}
                >
                  <FormattedMessage
                    id="app.create"
                    defaultMessage="Create"
                  />
                  {/* Create */}
                </Button>
              </div>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  customer,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({
  recruitProcess: settings.recruitProcess,
  recruitProcessStages: settings.recruitProcessStages,
  // allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  organizationId: auth.userDetails.organizationId,
  customerId: customer.customer.customerId,
  // currencies: customer.currencies,
  user: auth.userDetails,
  linkingRecruitToCustomer: customer.linkingRecruitToCustomer,
  contactByCustomerId: customer.contactByCustomerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForRecruit,
      getProcessStagesForRecruit,
      // getAllProcessStagesForRecruit,
      addRecruit,
      // getCurrency,
      getContactListByCustomerId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitForm);
