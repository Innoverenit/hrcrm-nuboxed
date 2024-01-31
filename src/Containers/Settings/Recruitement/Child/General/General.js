import React, { useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { MainWrapper, } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button,  } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import moment from "moment";
const Notifications = lazy(() => import("../General/Notifications"));


const { Option } = Select;
function General(props) {
  const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
  const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

  const handleAnniversay = (checked) => {
    setAnniversary(checked);
  };
  const handleBirthday = (checked) => {
    setBirthday(checked);
  };
  useEffect(() => {
    props.getRequirementsDuration(props.orgId);
  }, []);


  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // jobAniEmailInd:props.requirementDuration.jobAniEmailInd,
          timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
          oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
          jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
          birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
          inspectionRequiredInd: props.requirementDuration.inspectionRequiredInd,
        }}
        onSubmit={(values) => {
          console.log(values)
          // if (values.timePeriod === "0") {
          //   values.timePeriod = "Not Applicable";
          // }
          // if (values.orderTimePeriod === "0") {
          //   values.orderTimePeriod = "Not Applicable";
          // }
          props.updateRequirement(
            {
              ...values,
              // jobAniEmailInd:  anniversary ? true : false,
              // birthdayEmailInd:  birthday ? true : false,
              timePeriod: values.timePeriod === "Not Applicable" ? "0" : values.timePeriod,
              oppTimePeriod: values.oppTimePeriod === "Not Applicable" ? "0" : values.oppTimePeriod,
            },
            props.orgId
          );
        }}
      >
        {({ values }) => (
          <MainWrapper style={{ height: "525px", width: "", overflow: "auto" }}>
                <div class=" flex flex-row ">
            <Form className="form-background">
          
            <div class=" flex justify-between w-[31rem]"
             
             >
            <div class=" mt-[0.625em] ml-[1em]"
                >

<div class=" flex justify-between w-[74%] "
               
               >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Drop Open Orders (in months)</p>
                    <div>
                      <Field
                        style={{ width: "10rem" }}
                        name="timePeriod"

                        component={SelectComponent}
                        options={["1", "2", "3", "4", "5", "Not Applicable"]}
                        isColumn
                      //  inlineLabel
                      />
                    </div>
                  </div>
                
                  <div class=" flex justify-between w-[74%] mt-4"
                 
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Drop Open Opportunities (in months)</p>
                    <div>
                      <Field
                        name="oppTimePeriod"
                        style={{ width: "10rem" }}
                        component={SelectComponent}
                        options={["1", "2", "3", "4", "5", "Not Applicable"]}
                        isColumn
                      // inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between w-[74%] mt-4"
                 
                 >
                    <p style={{ minWidth: "-webkit-fill-available" }}> Send Job Anniversary Email</p>
                    <div>
    {/* <Popconfirm
      title="Do you wish to change the status?"
      onConfirm={() => handleAnniversay(!anniversary)}
      okText="Yes"
      cancelText="No"
    > */}
   <Field
                        name="jobAniEmailInd"
                        component={SwitchComponent}
                        data={values.jobAniEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
    {/* </Popconfirm> */}
  </div>
                  </div>
                  <div class=" flex justify-between w-[74%] mt-4"
                 
                 >
                    <p style={{ minWidth: "-webkit-fill-available" }}> Send BirthDay Email</p>
                    <div>

                    <Field
                        name="birthdayEmailInd"
                        component={SwitchComponent}
                        data={values.birthdayEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
 
  
  </div>
                  </div>
                  <div class=" font-bold text-base mt-4"> Process </div>
                  <div class=" flex flex-col justify-between w-[74%] mt-4"
                 
                 >
            
                    <div class=" flex flex-row">
                    <p style={{ minWidth: "-webkit-fill-available" }}> Production</p>
                      <Field
                        name="inspectionRequiredInd"
                        component={SwitchComponent}
                        data={values.inspectionRequiredInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
                    </div>
              
                    <div class=" flex flex-row mt-2">
                    <p style={{ minWidth: "-webkit-fill-available" }}>Repair</p>
                      <Field
                        // name="inspectionRequiredInd"
                        component={SwitchComponent}
                        // data={values.inspectionRequiredInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
                    </div>
                  </div>
            
                </div>

              </div>
              <h4 class="mt-4">
                Updated on{" "}
                {moment(props.requirementDuration.creationDate).format("ll")} by{" "}
                {props.requirementDuration.ownerName}
              </h4>
           
              <div class=" flex justify-end mt-[1.25em]" >
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRequirement}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
         
           
            </Form>
            <Notifications />
            </div>
          </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  updateRequirement: settings.updateRequirement,
  updateRequirementError: settings.updateRequirementError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateRequirement,
      getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(General);
