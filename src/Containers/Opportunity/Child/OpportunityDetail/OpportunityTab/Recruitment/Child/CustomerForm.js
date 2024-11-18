import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import {
  getProcessForRecruit,
  getProcessStagesForRecruit,
} from "../../../../../../Settings/SettingsAction"; 
import {
  addRecruit,
  getContactListByOpportunityId,
  getRecruiterName,
  getRecruitByOpportunityId
  
} from "../../../../../OpportunityAction";
import {getAllPartnerListByUserId} from "../../../../../../Partner/PartnerAction"
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";


const OpportunitySchema = Yup.object().shape({
  // requirementName: Yup.string().required("Please provide Requirement"),
  number: Yup.string().required("Please provide Number"),
  recruitmentProcessId: Yup.string().required("Select Workflow!"),
});

function CustomerForm(props) {
  const [typeData1, setTypeData1] = useState(true);
  const [typeData, setTypeData] = useState(true);
  function handleType(checked) {
    setTypeData(checked);
  }
  function handleWhiteBlue(checked) {
    setTypeData1(checked);
  }
  const{
    user:{userId},
  }=props;
  console.log(props.opportunityId);
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

  const Sponsor = props.contactListByOpportunityId.map((item) => {
    return {
      label: `${item.firstName || ""}  ${item.middleName ||
        ""} ${item.lastName || ""}`,
      value: item.contactId,
    };
  });

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
  //   props.getCurrency();
  //   props.getAllProcessStagesForRecruit();
    props.getContactListByOpportunityId(props.opportunityId);
    props.getRecruiterName();
    props.getAllPartnerListByUserId(props.userId);
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
          roleTypeId:"",
          workpreference:"Remote",
          departmentId:"",
          number: "",
          jobOrder:"",
          location:"",
          experience:"",
          partnerId:[],
          sponserId: undefined,
           userId: props.userId,
           recruitersId:[],
         
          description: "",
           avilableDate: props.avilableDate || dayjs(),
           endDate:props.endDate || dayjs(),
          billing: "",
           currency: props.user.currency,
          recruitmentProcessId: undefined,
          // stageId: undefined,
          opportunityId: props.opportunityId,
          // recruiterId:"",
          type: typeData ? "Permanent" : "Contractor",
          category:typeData1?"White":"Blue",
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
          let newavilableDate = dayjs(values.avilableDate).format("YYYY-MM-DD");
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

          var minutes =
            +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
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
              opportunityId: props.opportunityId,
              type: typeData ? "Permanent" : "Contractor",
              category:typeData1?"White":"Blue",
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
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                  width: "45%",
                  }}
                >
           <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  
                    <div style={{ width: "47%" ,}}>
                    <Field
                        name="requirementName"
                        label="Name"
                        width={"100%"}
                        // isRequired
                        isColumn
                        inlineLabel
                        component={InputComponent}
                        
                      />                 
                    
                    </div>
                  </div>
                                  
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                    <Field
                        name="experience"
                         label="Experience (in Years)"
                     
                        isColumn
                        width={"100%"}
                        inlineLabel                       
                      component={InputComponent}
                      // options={Array.isArray(Sponsor) ? Sponsor : []}
                      />
                    </div>
                    <div style={{ width: "47%" ,}}>
                    <Field
                        name="location"
                        label="Location"
                      
                        width={"100%"}
                        // isRequired
                        isColumn
                        inlineLabel
                        component={InputComponent}
                       
                      />
                  
                    
                    </div>
                  </div>
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "100%" }}>
                      <Field
                        // isRequired
                        // type="email"
                        name="workpreference"
                        label="Work Preference"
                          
                        className="field"
                        isColumn
                        width={"100%"}
                        component={SelectComponent}
                        options={[
                          "Remote",
                          "Hybrid",
                          "Office"
                        ]}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-3"/>                  
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "47%" ,}}>
                    <Field
                        name="sponserId"
                         label="Customer Contact"

                        isColumn
                        width={"100%"}
                        inlineLabel
                        
                      component={SelectComponent}
                      options={Array.isArray(Sponsor) ? Sponsor : []}
                      />
                      </div>
                      <div style={{ width: "47%" }}>
                      <Field
                        name="partnerId"
                        // isColumnWithoutNoCreate
                        label="Vendor"
                         
                        placeholder="Select"
                        width={"100%"}
                         component={SelectComponent}
                        options={Array.isArray(partnerNameOption) ? partnerNameOption : []}
                      
                      />
                    </div>
                      </div>
                      <div class=" mt-3" />
                      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="departmentId"
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
                        selectType="roleType"
                        label="Role"
                         
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
                      />
                    </div>
                  </div>  
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "100%" ,}}>
                  <Field
                    name="recruitersId"
                    //  selectType="contactList"
                    // isColumnWithoutNoCreate
                    // label="Contact"
                    label="Recruiter"
                     
                  // mode
                    placeholder="Select"
                    width={"100%"}
                   component={SelectComponent}
                    options={Array.isArray(recruiterNameOption) ? recruiterNameOption : []}
                     
                  />
                  </div>
                   
                   
                      </div>
                      <div class=" mt-3" />

                      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      {" "}
                      <Field
                        name="number"
                        label="# Positions"
                       
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}
                       
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <div class=" text-xs font-bold font-poppins text-black">Type </div>
                      <br/>
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
                  </div>                
               
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "47%" }}>
                  <Field
                    name="recruitmentProcessId"
                    label="Workflow"
                   
                    isRequired
                    isColumn
                    style={{
                      flexBasis: "80%",
                      width: "100%",

                      // marginTop: "0.25em",
                    }}
                    // component={InputComponent}
                  component={SelectComponent}
                  options={Array.isArray(processOption) ? processOption : []}
                  />
                  </div>
                  <div style={{ width: "47%", }}>
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                  <div style={{ width: "45%" }}>
                      {" "}
                      <Field
                        name="billing"
                        label={typeData?"Salary":"Rate/hr"}
                       
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}
                       
                      />
                    </div>
                    <div style={{ width: "52%"}}>
                    <Field
                        name="currency"
                        isColumnWithoutNoCreate
                    
                        label="Currency"
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                      
                      />
                    </div>
                    
                    </div>
                    </div>
                    </div>
                  
                 
                    <div class=" mt-3" />
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      {" "}
                      <Field
                        name="avilableDate"
                        label="Start Date"
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.avilableDate}
                        inlineLabel
                       
                        disabledDate={(currentDate) => {
                          if (values.avilableDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.avilableDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                    <div style={{ width: "47%", }}>
                      {" "}
                      <Field
                        name="endDate"
                        label="End Date"
                     
                   // isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.endDate}
                        inlineLabel
                        
                        disabledDate={(currentDate) => {
                          if (values.endDate) {
                            if (
                              
                              dayjs(currentDate).isAfter(
                                dayjs(values.endDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                  
                  </div>
                  <div class=" mt-3" style={{marginTop:"1.25em"}}/>
                  <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                 
                 <div class=" text-xs font-bold font-poppins ml-0" >Category</div>
                 &nbsp;&nbsp;
                 <Switch
                   style={{
                      width: "5em",
                      marginLeft:"7px"  }}
                    checked={typeData1}
                     onChange={handleWhiteBlue}
                   // disabled={this.state.availability}
                   checkedChildren="White"
                   unCheckedChildren="Blue"
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
           <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "101%" }}>
                    <Field
                    name="description"
                    label="Description"
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      height: "27em",
                      // marginLeft: "2.5em",
                      // marginTop: "0.25em",
                    }}
                  />
                </div>
                </div>
               
              </div>
              </div>
              <div class=" mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.linkingRecruitToOpportunity}
                >
                
                  Create
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
  opportunity,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({
  recruitProcess: settings.recruitProcess,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  recruitProcessStages: settings.recruitProcessStages,
  // allProcessStagesForRecruit: settings.allProcessStagesForRecruit,
  organizationId: auth.userDetails.organizationId,
  opportunityId: opportunity.opportunity.opportunityId,
  currencies:auth.currencies,
  linkingRecruitToOpportunity: opportunity.linkingRecruitToOpportunity,
  contactListByOpportunityId: opportunity.contactListByOpportunityId,
  recruiterName:opportunity.recruiterName,
  allpartnerByUserId:partner.allpartnerByUserId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForRecruit,
      getAllPartnerListByUserId,
      getProcessStagesForRecruit,
      getRecruitByOpportunityId,
      // getAllProcessStagesForRecruit,
      addRecruit,
      // getCurrency,
      getContactListByOpportunityId,
      getRecruiterName
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
