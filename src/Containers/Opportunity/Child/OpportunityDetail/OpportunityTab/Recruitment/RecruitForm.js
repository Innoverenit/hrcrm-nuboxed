import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";

import { Formik, Form, Field, FieldArray } from "formik";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  getTalentRoles,
} from "../../../../../Settings/Category/Role/RoleAction";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import {
  getProcessForRecruit,
  getProcessStagesForRecruit,
} from "../../../../../Settings/SettingsAction";
import {
  getContactListByCustomerId,
} from "../../../../../Customer/CustomerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import {
  addRecruit,
  getContactListByOpportunityId,
  getRecruiterName,
  getRecruitByOpportunityId,
} from "../../../../OpportunityAction";
import { getAllPartnerListByUserId } from "../../../../../Partner/PartnerAction";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  // requirementName: Yup.string().required("Please provide Requirement"),
  number: Yup.string().required("Please provide Number"),
  recruitmentProcessId: Yup.string().required("Select Workflow!"),
});

function RecruitForm(props) {
  const [typeData1, setTypeData1] = useState(true);
  const [typeData, setTypeData] = useState(false);
  const [workTypeData, setWorkTypeData] = useState(false);
  function handleWorkType(checked) {
    setWorkTypeData(checked);
  }
  function handleType(checked) {
    setTypeData(checked);
  }
  function handleWhiteBlue(checked) {
    setTypeData1(checked);
  }
  const {
    user: { userId },
  } = props;
  console.log(props.opportunityId);
  const processOption =
    // if (!props.recruitProcess) return [];

    props.recruitProcess.length &&
    props.recruitProcess
      .filter((item) => {
        // debugger;
        if (item.publishInd === true) {
          return item;
        }
      })
      .map((item) => {
        return {
          label: item.recruitmentProcessName || "",
          value: item.recruitmentProcessId,
        };
      });

  // const currency = props.currencies.map((item) => {
  //   return {
  //     label: item.currencyName || "",
  //     value: item.currencyName,
  //   };
  // });
  const roleNameOption = props.talentRoles.map((item) => {
    return {
        label: `${item.roleType || ""}`,
        value: item.roleTypeId,
    };
});

  const Sponsor = props.contactListByOpportunityId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });

  const ContactData = props.contactByCustomerId.map((item) => {
    return {
      label: `${item.fullName}`,
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

  const partnerNameOption = props.allpartnerByUserId.map((item) => {
    return {
      label: `${item.partnerName || ""}`,
      value: item.partnerId,
    };
  });
  const recruiterNameOption = props.recruiterName.map((item) => {
    return {
      label: `${item.fullName || ""}`,
      value: item.employeeId,
    };
  });

  useEffect(() => {
    props.getProcessForRecruit(props.organizationId);
    props.getContactListByCustomerId(props.opportunity.customerId);
    //   props.getAllProcessStagesForRecruit();
    props.getContactListByOpportunityId(props.opportunityId);
    props.getRecruiterName();
    props.getTalentRoles(props.orgId); 
    props.getAllPartnerListByUserId(props.userId);
  }, []);
  function handleReset(resetForm) {
    resetForm();
  }

  // function handleCallback() {
  //   props.getRecruitByOpportunityId(props.opportunityId);
  // }

  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          requirementName: "",
          role: "",
          workPreference: "Remote",
          department: "",
          number: "",
          jobOrder: "",
          experience: "",
          endDate: "",
          partnerId: [],
          sponserId: undefined,
          userId: props.userId,
          recruitersId: [],

          description: "",
          closeByDate: props.closeByDate || dayjs(),
          avilableDate: props.avilableDate || dayjs(),
          endDate: props.endDate || dayjs().add(1, "years"),
          // endDate:props.endDate || dayjs().add(1,'years'),
          billing: "",
          currency: props.user.currency,
          recruitmentProcessId: undefined,
          // stageId: undefined,
          opportunityId: props.opportunityId,
          // recruiterId:"",
          type: typeData ? "Permanent" : "Contractor",
          category: typeData1 ? "White" : "Blue",
          workType: workTypeData ? "Full Time" : "Part Time",

          address: [
            {
              addressType: "",
              address1: "",
              address2: "",
              town: "",
              street: "",
              city: "",
              postalCode: "",
              // country: this.props.user.countryName,
              latitude: "",
              skills: [],
              longitude: "",
            },
          ],
        }}
        validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });
          let timeZoneFirst = "GMT+05:30";

          let mytimeZone = timeZoneFirst.substring(4, 10);
          console.log(mytimeZone);

          var a = mytimeZone.split(":");
          console.log(a);
          var timeZoneminutes = +a[0] * 60 + +a[1];
          console.log(timeZoneminutes);
          if (!values.endDate) {
            values.endDate = values.startDate;
          }
          let newavilableDate = dayjs(values.avilableDate).format(
            "YYYY-MM-DD"
          );
          console.log(newavilableDate);
          //Time calculation
          let firstStartTime = dayjs(values.startTime).format(
            "HH:mm:ss.SSS[Z]"
          ); // getting start time from form input
          console.log(firstStartTime);

          let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
          console.log(firstStartHours);

          let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
          console.log(timeEndPart);

          var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
          console.log(firstStartTimeSplit);

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          console.log(finalStartTime);

          let newStartTime = `${finalStartTime}${timeEndPart}`;
          console.log(newStartTime);

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          console.log(firstEndTime);
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          console.log(firstEndHours);

          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          console.log(firstEndTimeSplit);
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          console.log(hr);
          let mi = firstEndTimeminutes % 60;
          console.log(hr);
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;
          console.log(finalEndTime);
          console.log(timeEndPart);
          console.log(`${finalEndTime}${timeEndPart}`);
          // var new_date = dayjs(enddate, "DD-MM-YYYY").add(5, 'days');

          let newEndTime = `${finalEndTime}${timeEndPart}`;
          props.addRecruit(
            {
              ...values,
              avilableDate: `${newavilableDate}T00:00:00Z`,
              //  endDate: `${newavilableDate}T00:00:00Z`,
              //endDate:props.endDate || dayjs().add(1,'years'),
              opportunityId: props.opportunityId,
              endDate: `${newEndDate}T00:00:00Z`,
              type: typeData ? "Permanent" : "Contractor",
              category: typeData1 ? "White" : "Blue",
              workType: workTypeData ? "Full Time" : "Part Time",
            },
            props.opportunityId,

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
          <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="jobOrder"
                      //  label="Sponsor"
                      label={
                        <FormattedMessage
                          id="app.joborder"
                          defaultMessage="Job ID"
                        />
                      }
                      isColumn
                      width={"100%"}
                      inlineLabel
                      component={InputComponent}
                      // options={Array.isArray(Sponsor) ? Sponsor : []}
                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="requirementName"
                      //label="Name"
                      label={
                        <FormattedMessage id="app.name" defaultMessage="Name" />
                      }
                      width={"100%"}
                      // isRequired
                      isColumn
                      inlineLabel
                      component={InputComponent}
                    />
                  </div>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    {" "}
                    <Field
                      name="number"
                      // label="# Positions"
                      label={
                        <FormattedMessage
                          id="app.number"
                          defaultMessage="# Positions"
                        />
                      }
                      width={"100%"}
                      isRequired
                      isColumn
                      component={InputComponent}
                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    <div class=" text-xs font-bold font-poppins text-black">Type </div>
                   
                    <Switch
                      checked={typeData}
                      onChange={handleType}
                      checkedChildren="Permanent"
                      unCheckedChildren="Contractor"
                      // style={{
                      //   margin:"0.56em 0px 0px 0.56em",
                      // }}
                    />
                  </div>

                
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    {" "}
                    <Field
                      name="avilableDate"
                      // label="Start Date"
                      label={
                        <FormattedMessage
                          id="app.avilableDate"
                          defaultMessage="Start Date"
                        />
                      }
                      isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.avilableDate}
                      inlineLabel

                      // disabledDate={(currentDate) => {
                      //   if (values.avilableDate) {
                      //     if (
                      //       dayjs(currentDate).isBefore(
                      //         dayjs(values.avilableDate)
                      //       )
                      //     ) {
                      //       return true;
                      //     } else {
                      //       return false;
                      //     }
                      //   }
                      // }}
                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    {" "}
                    <Field
                      name="endDate"
                      // label="Start Date"
                      label={
                        <FormattedMessage
                          id="app.endate"
                          defaultMessage="End Date"
                        />
                      }
                      // isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.endDate || values.startDate}
                      inlineLabel

                      // disabledDate={(currentDate) => {
                      //   if (values.endDate) {
                      //     if (

                      //       dayjs(currentDate).isAfter(
                      //         dayjs(values.endDate)
                      //       )
                      //     ) {
                      //       return true;
                      //     } else {
                      //       return false;
                      //     }
                      //   }
                      // }}
                    />
                  </div>
                </FlexContainer>

                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="experience"
                      //  label="Sponsor"
                      label={
                        <FormattedMessage
                          id="app.joborder"
                          defaultMessage="Experience (in Years)"
                        />
                      }
                      isColumn
                      width={"100%"}
                      inlineLabel
                      component={InputComponent}
                      // options={Array.isArray(Sponsor) ? Sponsor : []}
                    />
                  </div>

                  <div style={{ width: "47%" }}>
                    <Field
                      // isRequired
                      // type="email"
                      name="workPreference"
                      //label="Email"
                      label={
                        <FormattedMessage
                          id="app.workpreference"
                          defaultMessage="Work Preference"
                        />
                      }
                      className="field"
                      isColumn
                      width={"100%"}
                      component={SelectComponent}
                      options={[
                        "Home",
                        "Office-1 Day/Week",
                        "Office-2 Day/Week",
                        "Office-3 Day/Week",
                        "Office-4 Day/Week",
                        "Office"
                      ]}
                      inlineLabel
                    />
                  </div>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="department"
                      selectType="departmentName"
                      isColumnWithoutNoCreate
                      //label="Mobile #"
                      label="Department"
                      isColumn
                      // margintop={"0em"}

                      component={SearchSelect}
                      inlineLabel
                    />
                  </div>
                  <div style={{ width: "47%" }}>
                       <Field
                                                            name="roleTypeId"
                                                            label="Role"
                                                            options={Array.isArray(roleNameOption) ? roleNameOption : []}
                                                            component={SelectComponent}
                                                            value={values.roleTypeId}
                                                            placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        /> 
                    {/* <Field
                      name="role"
                      selectType="roleType"
                      //label="Designation"
                      label={
                        <FormattedMessage id="app.role" defaultMessage="Role" />
                      }
                      isColumnWithoutNoCreate
                      // selectType="designationType"
                      // options={[
                      //   "Board",
                      //   "CXO",
                      //   "Director",
                      //   "Unit Head",
                      //   "Mid Level",
                      //   "Junior",
                      // ]}
                      isColumn
                      component={SearchSelect}
                      // value={values.designationTypeId}
                      inlineLabel
                    /> */}
                  </div>
                </FlexContainer>

                <FlexContainer justifyContent="space-between">
                <div style={{ width: "25%" }}>
                  <div class=" text-xs font-bold font-poppins text-black">Category</div>
                 
                  <Switch
                    checked={typeData1}
                    onChange={handleWhiteBlue}
                    // disabled={this.state.availability}
                    checkedChildren="White"
                    unCheckedChildren="Blue"
                  />
                  </div>

                  <div style={{ width: "47.5%" }}>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "45%" }}>
                        {" "}
                        <Field
                          name="billing"
                          label={typeData ? "Salary" : "Rate/hr"}
                          // label={<FormattedMessage
                          //   id="app.billing"
                          //   defaultMessage="Billing/hour"
                          // />}
                          width={"100%"}
                          isRequired
                          isColumn
                          component={InputComponent}
                        />
                      </div>
                      <div style={{ width: "52%" }}>
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.currency"
                              defaultMessage="Currency"
                            />
                          }
                          width="100%"
                          isColumn
                          selectType="currencyName"
                          value={values.currencyName}
                          isRequired
                          component={SearchSelect}
                          // flag={values.currency}
                          // options={Array.isArray(currency) ? currency : []}
                        />
                      </div>
                    </FlexContainer>
                  </div>

                </FlexContainer>

                <div class=" mt-3" style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                  <Field
                    name="contactId"
                    //selectType="contactList"
                    isColumnWithoutNoCreate
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.customercontact"
                        defaultMessage=" Customer Contact"
                      />
                    }
                    component={SelectComponent}
                    isColumn
                    options={Array.isArray(ContactData) ? ContactData : []}
                    value={values.contactId}
                    // isDisabled={defaultContacts}
                    defaultValue={{
                      label: `${props.fullName || ""} `,
                      value: props.contactId,
                    }}
                    inlineLabel
                  />
                    {/* <Field
                      name="sponserId"
                      //  label="Sponsor"
                      label={
                        <FormattedMessage
                          id="app.customercontact"
                          defaultMessage="Customer Contact"
                        />
                      }
                      isColumn
                      width={"100%"}
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(Sponsor) ? Sponsor : []}
                    /> */}
                  </div>
                  <div style={{ width: "47%" }}>
                  {" "}
                  <Field
                    name="closeByDate"
                    label="Close By"
                    // label={<FormattedMessage
                    //   id="app.avilableDate"
                    //   defaultMessage="Start Date"
                    // />}
                    isRequired
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    //value={values.avilableDate}
                    inlineLabel

                    // disabledDate={(currentDate) => {
                    //   if (values.avilableDate) {
                    //     if (
                    //       dayjs(currentDate).isBefore(
                    //         dayjs(values.avilableDate)
                    //       )
                    //     ) {
                    //       return true;
                    //     } else {
                    //       return false;
                    //     }
                    //   }
                    // }}
                  />
                </div>
                
                </FlexContainer>
                <div class=" mt-3" style={{ marginTop: "1.25em" }} />

                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "100%" }}>
                    <Field
                      name="recruitersId"
                      //  selectType="contactList"
                      // isColumnWithoutNoCreate
                      // label="Contact"
                      label={
                        <FormattedMessage
                          id="app.recruiter"
                          defaultMessage="Recruiter"
                        />
                      }
                      mode
                      placeholder="Select"
                      width={"100%"}
                      component={SelectComponent}
                      options={
                        Array.isArray(recruiterNameOption)
                          ? recruiterNameOption
                          : []
                      }
                    />
                  </div>
                </FlexContainer>
                <div class=" mt-3" />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="recruitmentProcessId"
                      //label="Workflow"
                      label={
                        <FormattedMessage
                          id="app.recruitmentProcessId"
                          defaultMessage="Workflow"
                        />
                      }
                      isRequired
                      isColumn
                      style={{
                        flexBasis: "80%",
                        width: "100%",

                        // marginTop: "0.25em",
                      }}
                      // component={InputComponent}
                      component={SelectComponent}
                      options={
                        Array.isArray(processOption) ? processOption : []
                      }
                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="partnerId"
                      // isColumnWithoutNoCreate
                      //label="Mobile #"
                      label={
                        <FormattedMessage
                          id="app.vendor"
                          defaultMessage="Vendor"
                        />
                      }
                      mode
                      placeholder="Select"
                      width={"100%"}
                      component={SelectComponent}
                      options={
                        Array.isArray(partnerNameOption)
                          ? partnerNameOption
                          : []
                      }
                    />
                  </div>
                </FlexContainer>
                <div style={{ width: "47%" }}>
                    <div class=" text-xs font-bold font-poppins text-black">WorkType </div>
                   
                    <Switch
                      checked={workTypeData}
                      onChange={handleWorkType}
                      checkedChildren="Full Time"
                      unCheckedChildren="Part Time"
                      // style={{
                      //   margin:"0.56em 0px 0px 0.56em",
                      // }}
                    />
                  </div>
              </div>
              &nbsp;
              <div
                style={{
                  height: "100%",
                  width: "47%",
                }}
              >
                <FlexContainer justifyContent="space-between">
                <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class="font-semibold text-xs flex"> Location</div>
                  </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <FieldArray
                      name="address"
                      label="Address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
                  </div>
                </FlexContainer>
                <div class=" mt-3" style={{ marginTop: "1.25em" }} />
                <div style={{ width: "100%" }}>
                  <Field
                    name="description"
                    //label="Description"
                    label={
                      <FormattedMessage
                        id="app.description"
                        defaultMessage="Description"
                      />
                    }
                     width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      // height: "17em",
                      // marginLeft: "2.5em",
                      // marginTop: "0.25em",
                    }}
                  />
                </div>
              </div>
            </div>
            <div class=" mt-3" />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.linkingRecruitToOpportunity}
              >
                <FormattedMessage id="app.create" defaultMessage="Create" />
                {/* Create */}
              </Button>
            </FlexContainer>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  opportunity,
  team,
  role,
  customer,
  contact,
  account,
  settings,
  partner,
}) => ({
  recruitProcess: settings.recruitProcess,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  recruitProcessStages: settings.recruitProcessStages,
  // allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  organizationId: auth.userDetails.organizationId,
  opportunityId: opportunity.opportunity.opportunityId,
  currencies: auth.currencies,
  contactByCustomerId: customer.contactByCustomerId,
  linkingRecruitToOpportunity: opportunity.linkingRecruitToOpportunity,
  contactListByOpportunityId: opportunity.contactListByOpportunityId,
  recruiterName: opportunity.recruiterName,
  talentRoles: role.talentRoles,
  allpartnerByUserId: partner.allpartnerByUserId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForRecruit,
      getContactListByCustomerId,
      getAllPartnerListByUserId,
      getProcessStagesForRecruit,
      getRecruitByOpportunityId,
      getTalentRoles,
      // getAllProcessStagesForRecruit,
      addRecruit,
      // getCurrency,
      getContactListByOpportunityId,
      getRecruiterName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitForm);
