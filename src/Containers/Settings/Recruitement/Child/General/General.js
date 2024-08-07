import React, { useEffect, lazy, useState } from "react";
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
import { Button, } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
const Notifications = lazy(() => import("../General/Notifications"));


const { Option } = Select;
const GeneralSchema = Yup.object().shape({
  criticlDateRange: Yup.number()
    .typeError("Input must be a number!")
});
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
          trnsfrEvthngToErpInd:props.requirementDuration.trnsfrEvthngToErpInd,
          trnsfrToErpQtionWinInd:props.requirementDuration.trnsfrToErpQtionWinInd,
          piInd:props.requirementDuration.piInd,
          autoCiInd:props.requirementDuration.autoCiInd,
          partNoInd:props.requirementDuration.partNoInd,
          inniInspectInd:props.requirementDuration.inniInspectInd,
          typeInd: props.requirementDuration.typeInd,
          repairOrdInd: props.requirementDuration.repairOrdInd,
          qcInd: props.requirementDuration.qcInd,
          
          
          proInd: props.requirementDuration.proInd,
          
          repairProcessInd: props.requirementDuration.repairProcessInd,
          criticlDateRange:props.requirementDuration.criticlDateRange,
          processInd: props.requirementDuration.processInd,
          // fifoInd: props.requirementDuration.fifoInd,

        }}
        validationSchema={GeneralSchema}
        onSubmit={(values) => {
          console.log(values)
        
          props.updateRequirement(
            {
              ...values,
              
              timePeriod: values.timePeriod === "Not Applicable" ? "0" : values.timePeriod,
              oppTimePeriod: values.oppTimePeriod === "Not Applicable" ? "0" : values.oppTimePeriod,
            },
            props.orgId
          );
        }}
      >
        {({ values }) => (
          <MainWrapper style={{  width: "",overflow:"auto"  }}>
            <div class=" flex flex-row   ">
            <div class=" h-h86 overflow-auto overflow-x-hidden">

              <Form className="form-background">

                <div class=" flex justify-between w-[31rem] "

                >
                  <div class=" mt-[0.625em] ml-[1em]"
                  >

                    <div class=" flex justify-between w-[74%] "

                    >
                     <div class=" text-sm  ml-2 ">Drop Open Orders (in months)</div>
  
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
                        <div class=" text-sm  ml-2 ">Drop Open Opportunities (in months)</div>
      
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
                       <div class=" text-sm  ml-2 ">Send Job Anniversary Email</div>
                      <div>
  
    <div>
                        <Field
                          name="jobAniEmailInd"
                          component={SwitchComponent}
                          data={values.jobAniEmailInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                    
                      </div>
                    </div>
                    <div class=" flex justify-between w-[74%] mt-4"

                    >
                       <div class=" text-sm  ml-2 ">Send BirthDay Email</div>
                      <div>

                        <Field
                          name="birthdayEmailInd"
                          component={SwitchComponent}
                          data={values.birthdayEmailInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />


                      </div>
                    </div>
                  
                    <div class=" flex flex-col justify-between w-[74%] mt-4"

                    >

                      <div class=" flex flex-row mt-2">
                      <div class=" text-sm  ml-2 font-bold">Production</div>
                       
                      </div>

                      {props.user.productionInd === true ? (
   <>
   <div class=" flex flex-row justify-between mt-2 ml-4">
   <div class=" text-sm  ml-2 ">Process</div>
   <div>
   <Field
     name="processInd"
     component={SwitchComponent}
     data={values.processInd}
     checkedChildren={"Discrete"}
     unCheckedChildren={"Continuous"}
     width={"7em"}
   />
   </div>
 </div>
 <div class=" flex flex-row justify-between mt-2 ml-4">
 <div class=" text-sm  ml-2 ">Make To</div>
 <div>
   <Field
     name="typeInd"
     component={SwitchComponent}
     data={values.typeInd}
     checkedChildren={"Order"}
     unCheckedChildren={"Stock"}
     width={"7em"}
   />
     </div>
 </div>

 <div class=" flex flex-row justify-between mt-2 ml-4">
 <div class=" text-sm  ml-2 ">Show Orders To Investor</div>
 <div>
   <Field
      name="proInd"
     component={SwitchComponent}
     data={values.proInd}
     checkedChildren={"Yes"}
     unCheckedChildren={"No"}
     width={"7em"}
   />
     </div>
 </div>

</>
) : (
  <div className="mt-4 ml-4 text-red-500">
    Production module is Switched off. Switch it on to Access Features.
  </div>
)}

                  

<div class=" flex flex-row mt-2">
                      <div class=" text-sm  ml-2 font-bold">Inventory</div>
                      </div>
                      <div class=" flex flex-row justify-between mt-2">
                      <div class=" text-sm  ml-2 ">Inception</div>
                      <div>
                        <Field
                          name="inniInspectInd"
                          component={SwitchComponent}
                          data={values.inniInspectInd}
                          checkedChildren={"Manual"}
                          unCheckedChildren={"Automatic"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                     

                      {/* {props.user.orderManagementInd === true &&
                        <>
                            <div class=" flex flex-row justify-between mt-2 ml-4">
                            <div class=" text-sm  ml-2 ">Consumption</div>
                            <div>
                            <Field
                              name="fifoInd"
                              component={SwitchComponent}
                              data={values.fifoInd}
                              checkedChildren={"LIFO"}
                              unCheckedChildren={"FIFO"}
                              width={"7em"}
                            />
                            </div>
                          </div>
                       
                      
                        </>
                      }  */}

                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 font-bold ">Repair</div>
                      </div>

                      <div class=" flex flex-row justify-between mt-2">
                      <div class=" text-sm  ml-2 ">Generate Part Number</div>
                      <div>
                        <Field
                          name="partNoInd"
                          component={SwitchComponent}
                          data={values.partNoInd}
                          checkedChildren={"Manual"}
                          unCheckedChildren={"Automatic"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                      <div class=" flex flex-row justify-between mt-2">
                          <div class=" text-sm  ml-2 ">Show Orders To Investor</div>
                          <div>
                            <Field
                               name="repairOrdInd"
                              component={SwitchComponent}
                              data={values.repairOrdInd}
                              checkedChildren={"Yes"}
                              unCheckedChildren={"No"}
                              width={"7em"}
                            />
                              </div>
                          </div>
                          <div class=" flex flex-row justify-between mt-2">
                          <div class=" text-sm  ml-2 ">QC</div>
                          <div>
                            <Field
                               name="qcInd"
                              component={SwitchComponent}
                              data={values.qcInd}
                              checkedChildren={"Yes"}
                              unCheckedChildren={"No"}
                              width={"7em"}
                            />
                              </div>
                          </div>
                          <div class=" flex flex-row justify-between mt-2">
                          <div class=" text-sm  ml-2 ">Process</div>
                          <div>
                            <Field
                               name="repairProcessInd"
                              component={SwitchComponent}
                              data={values.repairProcessInd}
                              checkedChildren={"Yes"}
                              unCheckedChildren={"No"}
                              width={"7em"}
                            />
                              </div>
                          </div>
                          <div class=" flex flex-row justify-between mt-2">
                          <div class=" text-sm  ml-2 ">Critical Date Range</div>
                          <div>
                          <Field
                            isRequired
                            name="criticlDateRange"                          
                            type="Numeric"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                              </div>
                          </div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 font-bold ">CRM</div>
                      </div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 ">Transfer Prospect to ERP On Quotation win 
</div>
                      <div>
                        <Field
                          name="trnsfrToErpQtionWinInd"
                          component={SwitchComponent}
                          data={values.trnsfrToErpQtionWinInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 ">Transfer All Prospect Info to Erp</div>
                      <div>
                        <Field
                          name="trnsfrEvthngToErpInd"
                          component={SwitchComponent}
                          data={values.trnsfrEvthngToErpInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                      </div>

                      <div class=" text-sm  ml-2 font-bold ">INVOICE</div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 ">Proforma Invoice (PI) needed 
</div>
                      <div>
                        <Field
                          name="piInd"
                          component={SwitchComponent}
                          data={values.piInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 ">Invoice can be cancelled 
</div>
                      <div>
                        <Field
                          name="trnsfrToErpQtionWinInd"
                          component={SwitchComponent}
                          data={values.trnsfrToErpQtionWinInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                      <div class=" flex flex-row justify-between mt-3">
                      <div class=" text-sm  ml-2 ">Auto generate Commercial Invoice 
</div>
                      <div>
                        <Field
                          name="autoCiInd"
                          component={SwitchComponent}
                          data={values.autoCiInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          width={"7em"}
                        />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="mt-4">
                  Updated on{" "}
                  {dayjs(props.requirementDuration.creationDate).format("ll")} by{" "}
                  {props.requirementDuration.ownerName}
                </div>

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
              <Notifications />
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
      updateRequirement,
      getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(General);
