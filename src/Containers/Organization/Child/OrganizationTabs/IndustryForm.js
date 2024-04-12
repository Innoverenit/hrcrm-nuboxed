import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../Components/UI/Elements";
import { SwitchComponent } from "../../../../Components/Forms/Formik/SwitchComponent";
import { MainWrapper, } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Button, } from "antd";
// import {
//   updateRequirement,
//   getRequirementsDuration,
// } from "../../../../Settings/SettingsAction";
import moment from "moment";


const { Option } = Select;
function IndustryForm(props) {
  const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
  const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

  const handleAnniversay = (checked) => {
    setAnniversary(checked);
  };
  const handleBirthday = (checked) => {
    setBirthday(checked);
  };
//   useEffect(() => {
//     props.getRequirementsDuration(props.orgId);
//   }, []);


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
          trnsfrEvthngToErpInd:props.requirementDuration.trnsfrEvthngToErpInd,
          trnsfrToErpQtionWinInd:props.requirementDuration.trnsfrToErpQtionWinInd,
          partNoInd:props.requirementDuration.partNoInd,
          typeInd: props.requirementDuration.typeInd,
          repairOrdInd: props.requirementDuration.repairOrdInd,
          qcInd: props.requirementDuration.qcInd,
          
          
          proInd: props.requirementDuration.proInd,
          
          repairProcessInd: props.requirementDuration.repairProcessInd,
          processInd: props.requirementDuration.processInd,
          fifoInd: props.requirementDuration.fifoInd,

        }}
        // onSubmit={(values) => {
        //   console.log(values)
        
        //   props.updateRequirement(
        //     {
        //       ...values,
              
        //       timePeriod: values.timePeriod === "Not Applicable" ? "0" : values.timePeriod,
        //       oppTimePeriod: values.oppTimePeriod === "Not Applicable" ? "0" : values.oppTimePeriod,
        //     },
        //     props.orgId
        //   );
        // }}
      >
        {({ values }) => (
          <MainWrapper style={{  width: "",overflow:"auto"  }}>
            <div class=" flex flex-row   ">
            <div class=" h-h86 overflow-auto overflow-x-hidden">

              <Form className="form-background">

                <div class=" flex justify-between w-[61rem] "

                >
                  <div class=" mt-[0.625em] ml-[1em]"
                  >
                    <div class=" flex flex-col justify-between w-full mt-4"

                    >

                      {/* <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 font-bold ">Repair</div>
                      </div> */}

                      <div class=" flex flex-row justify-between w-[13rem] mt-2">
                      <div class=" text-sm  ml-2 ">Real Estate</div>
                      <div>
                        <Field
                          name="partNoInd"
                          component={SwitchComponent}
                          data={values.partNoInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"4rem"}
                        />
                        </div>
                      </div>
                      <div class=" flex flex-row justify-between w-[13rem] mt-2">
                          <div class=" text-sm  ml-2 ">Retail</div>
                          <div>
                            <Field
                               name="repairOrdInd"
                              component={SwitchComponent}
                              data={values.repairOrdInd}
                              checkedChildren={"Yes"}
                              unCheckedChildren={"No"}
                              width={"4rem"}
                            />
                              </div>
                          </div>
                          <div class=" flex flex-row justify-between w-[13rem] mt-2">
                          <div class=" text-sm  ml-2 ">Manufacture</div>
                          <div>
                            <Field
                               name="qcInd"
                              component={SwitchComponent}
                              data={values.qcInd}
                              checkedChildren={"Yes"}
                              unCheckedChildren={"No"}
                              width={"4rem"}
                            />
                              </div>
                          </div>
                        
             
                    
                    </div>

                  </div>

                </div>
                {/* <div class="mt-4">
                  Updated on{" "}
                  {moment(props.requirementDuration.creationDate).format("ll")} by{" "}
                  {props.requirementDuration.ownerName}
                </div> */}

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
              </div>
           
            </div>
          </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  updateRequirement: settings.updateRequirement,
  updateRequirementError: settings.updateRequirementError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   updateRequirement,
    //   getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndustryForm);
