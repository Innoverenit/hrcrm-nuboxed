// import React, { useEffect, lazy, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import axios from "axios";
// import { message } from "antd";
// import { Formik, Form, Field } from "formik";
// import {
//   Select,
// } from "../../../../../Components/UI/Elements";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
// import { FormattedMessage } from "react-intl";
// import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
// import { Button, } from "antd";
// import {
//   updateRequirement,
//   getRequirementsDuration,
// } from "../../../../Settings/SettingsAction";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import Identifier from "./Identifier";
// import { base_url } from "../../../../../Config/Auth";
// const Notifications = lazy(() => import("../General/Notifications"));
// const { Option } = Select;
// const GeneralSchema = Yup.object().shape({
//   criticlDateRange: Yup.number()
//     .typeError("Input must be a number!")
// });
// function General(props) {
//   const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
//   const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

//   const handleAnniversay = (checked) => {
//     setAnniversary(checked);
//   };
//   const handleBirthday = (checked) => {
//     setBirthday(checked);
//   };
//   useEffect(() => {
//     props.getRequirementsDuration(props.orgId);
//   }, []);


//   return (
//     <>
//       <Formik
//         enableReinitialize
//         initialValues={{
//           // jobAniEmailInd:props.requirementDuration.jobAniEmailInd,
//           timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
//           oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
//           userId: props.userId,
//           orgId: props.organizationId,
//           jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
//           birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
//           trnsfrEvthngToErpInd:props.requirementDuration.trnsfrEvthngToErpInd,
//           trnsfrToErpQtionWinInd:props.requirementDuration.trnsfrToErpQtionWinInd,
//           piInd:props.requirementDuration.piInd,
//           autoCiInd:props.requirementDuration.autoCiInd,
//           b2bProcureInd:props.requirementDuration.b2bProcureInd,
//           b2bRepairInd:props.requirementDuration.b2bRepairInd,
//           b2bProductionInd:props.requirementDuration.b2bProductionInd,
//           b2cProcureInd:props.requirementDuration.b2cProcureInd,
//           b2cRepairInd:props.requirementDuration.b2cRepairInd,
//           b2cProductionInd:props.requirementDuration.b2cProductionInd,
//           leadsToCustInd:props.requirementDuration.leadsToCustInd,
//           partNoInd:props.requirementDuration.partNoInd,
//           inniInspectInd:props.requirementDuration.inniInspectInd,
//           typeInd: props.requirementDuration.typeInd,
//           repairOrdInd: props.requirementDuration.repairOrdInd,
//           qcInd: props.requirementDuration.qcInd,
//           b2bCheckInvenOrdInd: props.requirementDuration.b2bCheckInvenOrdInd,
//           b2cCheckInvenOrdInd: props.requirementDuration.b2cCheckInvenOrdInd,
//           shipInvoicePayImentnd: props.requirementDuration.shipInvoicePayImentnd,
//           amcInd: props.requirementDuration.amcInd,
          
//           proInd: props.requirementDuration.proInd,
          
//           repairProcessInd: props.requirementDuration.repairProcessInd,
//           criticlDateRange:props.requirementDuration.criticlDateRange,
//           processInd: props.requirementDuration.processInd,

//         }}
//         validationSchema={GeneralSchema}
//         onSubmit={(values) => {
//           console.log(values)
        
//           props.updateRequirement(
//             {
//               ...values,
              
//               timePeriod: values.timePeriod === "Not Applicable" ? "0" : values.timePeriod,
//               oppTimePeriod: values.oppTimePeriod === "Not Applicable" ? "0" : values.oppTimePeriod,
//             },
//             props.orgId
//           );
//         }}
//       >
//         {({ values }) => (
//            <div class="mr-5 ml-5 overflow-auto" style={{ scrollbarWidth:"thin"  }}>
//             <div class=" flex    ">
//             <div class=" h-h86 overflow-auto overflow-x-hidden">
//               <Form className="form-background">
//                 <div class=" flex justify-between w-full p-3 ">             
//                   <div>              
//                     <div class=" flex justify-between ">                    
//                      <div class=" text-xs  ">Drop Open Orders (in months)</div>
//                       <div>
//                         <Field                     
//                           name="timePeriod"
//                           component={SelectComponent}
//                           options={["1", "2", "3", "4", "5", "Not Applicable"]}                          
//                         />
//                       </div>
//                     </div>

//                     <div class=" flex justify-between ] mt-2">           
//                         <div class=" text-xs  ">Drop Open Opportunities (in months)</div>    
//                       <div>
//                         <Field
//                           name="oppTimePeriod"                   
//                           component={SelectComponent}
//                           options={["1", "2", "3", "4", "5", "Not Applicable"]}                   
//                         />
//                       </div>
//                     </div>
//                     <div class=" flex justify-between   mt-2">                
//                        <div class=" text-xs  ">Send Job Anniversary Email</div>
//                       <div>
//     <div>
//                        <Field
//                           name="jobAniEmailInd"
//                           component={SwitchComponent}
//                           data={values.jobAniEmailInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>                   
//                       </div>
//                     </div>

//                     <div class=" flex justify-between   mt-2">                 
//                        <div class=" text-xs  ">Send BirthDay Email</div>
//                       <div>
//                         <Field
//                           name="birthdayEmailInd"
//                           component={SwitchComponent}
//                           data={values.birthdayEmailInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                       </div>
//                     </div>               
//                     <div class=" flex flex-col justify-between   mt-2">                
//                       <div class=" flex  mt-2">
//                       <div class=" text-xs  font-bold">Production</div>                      
//                       </div>
//                       {props.user.productionInd === true ? (
//    <>
//    <div class=" flex  justify-between mt-2 ">
//    <div class=" text-xs  ">Process</div>
//    <div>
//    <Field
//      name="processInd"
//      component={SwitchComponent}
//      data={values.processInd}
//      checkedChildren={"Discrete"}
//      unCheckedChildren={"Continuous"}
//      width={"7em"}
//    />
//    </div>
//  </div>
//  <div class=" flex  justify-between mt-2 ">
//  <div class=" text-xs  ">Make To</div>
//  <div>
//    <Field
//      name="typeInd"
//      component={SwitchComponent}
//      data={values.typeInd}
//      checkedChildren={"Order"}
//      unCheckedChildren={"Stock"}
//      width={"7em"}
//    />
//      </div>
//  </div>

//  <div class=" flex  justify-between mt-2">
//  <div class=" text-xs  ">Show Orders To Investor</div>
//  <div>
//    <Field
//       name="proInd"
//      component={SwitchComponent}
//      data={values.proInd}
//      checkedChildren={"Yes"}
//      unCheckedChildren={"No"}
//      width={"7em"}
//    />
//      </div>
//  </div>
//  <div class=" flex  justify-between mt-2 ">
//  <div class=" text-xs  ">AMC</div>
//  <div>
//    <Field
//       name="amcInd"
//      component={SwitchComponent}
//      data={values.amcInd}
//      checkedChildren={"Yes"}
//      unCheckedChildren={"No"}
//      width={"7em"}
//    />
//      </div>
//  </div>
// </>
//  ) : (
//   <div className="mt-4 ml-4 text-red-500">
//     Production module is Switched off. Switch it on to Access Features.
//   </div>
// )}                 
// <div class=" flex  mt-2">
//                       <div class=" text-xs  font-bold">Inventory</div>
//                       </div>
//                       <div class=" flex  justify-between mt-2">
//                       <div class=" text-xs  ">Inception</div>
//                       <div>
//                         <Field
//                           name="inniInspectInd"
//                           component={SwitchComponent}
//                           data={values.inniInspectInd}
//                           checkedChildren={"Manual"}
//                           unCheckedChildren={"Automatic"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>                

//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  font-bold ">Repair</div>
//                       </div>

//                       <div class=" flex  justify-between mt-2">
//                       <div class=" text-xs  ">Generate Part Number</div>
//                       <div>
//                         <Field
//                           name="partNoInd"
//                           component={SwitchComponent}
//                           data={values.partNoInd}
//                           checkedChildren={"Manual"}
//                           unCheckedChildren={"Automatic"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-2">
//                       <div class=" text-xs  ">Leads To Customer</div>
//                       <div>
//                         <Field
//                           name="leadsToCustInd"
//                           component={SwitchComponent}
//                           data={values.leadsToCustInd}
//                           checkedChildren={"yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-2">
//                           <div class=" text-xs  ">Show Orders To Investor</div>
//                           <div>
//                             <Field
//                                name="repairOrdInd"
//                               component={SwitchComponent}
//                               data={values.repairOrdInd}
//                               checkedChildren={"Yes"}
//                               unCheckedChildren={"No"}
//                               width={"7em"}
//                             />
//                               </div>
//                           </div>
//                           <div class=" flex  justify-between mt-2">
//                           <div class=" text-xs  ">QC</div>
//                           <div>
//                             <Field
//                                name="qcInd"
//                               component={SwitchComponent}
//                               data={values.qcInd}
//                               checkedChildren={"Yes"}
//                               unCheckedChildren={"No"}
//                               width={"7em"}
//                             />
//                               </div>
//                           </div>
//                           <div class=" flex  justify-between mt-2">
//                           <div class=" text-xs  ">Process</div>
//                           <div>
//                             <Field
//                                name="repairProcessInd"
//                               component={SwitchComponent}
//                               data={values.repairProcessInd}
//                               checkedChildren={"Yes"}
//                               unCheckedChildren={"No"}
//                               width={"7em"}
//                             />
//                               </div>
//                           </div>
//                           <div class=" flex  justify-between mt-2">
//                           <div class=" text-xs  ">Critical Date Range</div>
//                           <div>
//                           <Field
//                             isRequired
//                             name="criticlDateRange"                          
//                             type="Numeric"
//                             width={"100%"}
//                             isColumn
//                             component={InputComponent}
//                             inlineLabel
//                           />
//                               </div>
//                           </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  font-bold ">CRM</div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Transfer Prospect to ERP On Quotation win 
// </div>
//                       <div>
//                         <Field
//                           name="trnsfrToErpQtionWinInd"
//                           component={SwitchComponent}
//                           data={values.trnsfrToErpQtionWinInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Transfer All Prospect Info to Erp</div>
//                       <div>
//                         <Field
//                           name="trnsfrEvthngToErpInd"
//                           component={SwitchComponent}
//                           data={values.trnsfrEvthngToErpInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>

//                       <div class=" text-xs mt-3 font-bold ">Invoice</div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Proforma Invoice (PI) needed 
// </div>
//                       <div>
//                         <Field
//                           name="piInd"
//                           component={SwitchComponent}
//                           data={values.piInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Invoice can be cancelled 
// </div>
//                       <div>
//                         <Field
//                           name="trnsfrToErpQtionWinInd"
//                           component={SwitchComponent}
//                           data={values.trnsfrToErpQtionWinInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Auto generate Commercial Invoice 
// </div>
//                       <div>
//                         <Field
//                           name="autoCiInd"
//                           component={SwitchComponent}
//                           data={values.autoCiInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       {props.user.ecomInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2b Procure 
// </div>
//                       <div>
//                         <Field
//                           name="b2bProcureInd"
//                           component={SwitchComponent}
//                           data={values.b2bProcureInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       )}
//                       {props.user.repairInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2b Reapir
// </div>
//                       <div>
//                         <Field
//                           name="b2bRepairInd"
//                           component={SwitchComponent}
//                           data={values.b2bRepairInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       )}
//                       {props.user.productionInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2b Production
// </div>
//                       <div>
//                         <Field
//                           name="b2bProductionInd"
//                           component={SwitchComponent}
//                           data={values.b2bProductionInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
// )}
//  {props.user.ecomInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2c Procure
// </div>
//                       <div>
//                         <Field
//                           name="b2cProcureInd"
//                           component={SwitchComponent}
//                           data={values.b2cProcureInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//  )}
//                       {props.user.repairInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2c Reapir
// </div>
//                       <div>
//                         <Field
//                           name="b2cRepairInd"
//                           component={SwitchComponent}
//                           data={values.b2cRepairInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       )}
//                       {props.user.productionInd  && (
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2c Production
// </div>
//                       <div>
//                         <Field
//                           name="b2cProductionInd"
//                           component={SwitchComponent}
//                           data={values.b2cProductionInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       )}
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2b Inventory Order
// </div>
//                       <div>
//                         <Field
//                           name="b2bCheckInvenOrdInd"
//                           component={SwitchComponent}
//                           data={values.b2bCheckInvenOrdInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">B2c Inventory Order
// </div>
//                       <div>
//                         <Field
//                           name="b2cCheckInvenOrdInd"
//                           component={SwitchComponent}
//                           data={values.b2cCheckInvenOrdInd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                       <div class=" flex  justify-between mt-3">
//                       <div class=" text-xs  ">Ship Invoice Payment
// </div>
//                       <div>
//                         <Field
//                           name="shipInvoicePayImentnd"
//                           component={SwitchComponent}
//                           data={values.shipInvoicePayImentnd}
//                           checkedChildren={"Yes"}
//                           unCheckedChildren={"No"}
//                           width={"7em"}
//                         />
//                         </div>
//                       </div>
//                     </div>

//                   </div>

//                 </div>
//                 <div class="mt-4">
//                   Updated on{" "}
//                   {dayjs(props.requirementDuration.creationDate).format("ll")} by{" "}
//                   {props.requirementDuration.ownerName}
//                 </div>

//                 <div class=" flex justify-end mt-[1.25em]" >
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     Loading={props.updateRequirement}
//                   >
//                     <FormattedMessage id="app.update" defaultMessage="Update" />
//                     {/* Update */}
//                   </Button>
//                 </div>
//               </Form>
//               </div>
//               <div className="flex flex-col">
//               <Notifications />
//               <Identifier/>
//               </div>
//             </div>
//           </div>
//         )}
//       </Formik>
//     </>
//   );
// }

// const mapStateToProps = ({ settings, auth }) => ({
//   userId: auth.userDetails.userId,
//   user: auth.userDetails,
//   requirementDuration: settings.requirementDuration,
//   orgId: auth.userDetails.organizationId,
//   updateRequirement: settings.updateRequirement,
//   updateRequirementError: settings.updateRequirementError,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       updateRequirement,
//       getRequirementsDuration,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(General);



import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Switch, Popconfirm, message } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import Identifier from "./Identifier";
const Notifications = lazy(() => import("../General/Notifications"));
const { Option } = Select;
const GeneralSchema = Yup.object().shape({
  criticlDateRange: Yup.number()
    .typeError("Input must be a number!")
});
function General(props) {
  const [formValues, setFormValues] = useState({
    timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
    oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
    jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
    birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
    trnsfrEvthngToErpInd: props.requirementDuration.trnsfrEvthngToErpInd,
    trnsfrToErpQtionWinInd: props.requirementDuration.trnsfrToErpQtionWinInd,
    piInd: props.requirementDuration.piInd,
    autoCiInd: props.requirementDuration.autoCiInd,
    b2bProcureInd: props.requirementDuration.b2bProcureInd,
    b2bRepairInd: props.requirementDuration.b2bRepairInd,
    b2bProductionInd: props.requirementDuration.b2bProductionInd,
    b2cProcureInd: props.requirementDuration.b2cProcureInd,
    b2cRepairInd: props.requirementDuration.b2cRepairInd,
    b2cProductionInd: props.requirementDuration.b2cProductionInd,
    leadsToCustInd: props.requirementDuration.leadsToCustInd,
    partNoInd: props.requirementDuration.partNoInd,
    inniInspectInd: props.requirementDuration.inniInspectInd,
    typeInd: props.requirementDuration.typeInd,
    repairOrdInd: props.requirementDuration.repairOrdInd,
    qcInd: props.requirementDuration.qcInd,
    b2bCheckInvenOrdInd: props.requirementDuration.b2bCheckInvenOrdInd,
    b2cCheckInvenOrdInd: props.requirementDuration.b2cCheckInvenOrdInd,
    shipInvoicePayImentnd: props.requirementDuration.shipInvoicePayImentnd,
    amcInd: props.requirementDuration.amcInd,
    proInd: props.requirementDuration.proInd,
    repairProcessInd: props.requirementDuration.repairProcessInd,
    criticlDateRange: props.requirementDuration.criticlDateRange,
    processInd: props.requirementDuration.processInd,
    userId: props.userId,
    orgId: props.orgId,
  });
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
  useEffect(() => {
    if (props.requirementDuration) {
      setFormValues({
        timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
    oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
    jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
    birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
    trnsfrEvthngToErpInd: props.requirementDuration.trnsfrEvthngToErpInd,
    trnsfrToErpQtionWinInd: props.requirementDuration.trnsfrToErpQtionWinInd,
    piInd: props.requirementDuration.piInd,
    autoCiInd: props.requirementDuration.autoCiInd,
    b2bProcureInd: props.requirementDuration.b2bProcureInd,
    b2bRepairInd: props.requirementDuration.b2bRepairInd,
    b2bProductionInd: props.requirementDuration.b2bProductionInd,
    b2cProcureInd: props.requirementDuration.b2cProcureInd,
    b2cRepairInd: props.requirementDuration.b2cRepairInd,
    b2cProductionInd: props.requirementDuration.b2cProductionInd,
    leadsToCustInd: props.requirementDuration.leadsToCustInd,
    partNoInd: props.requirementDuration.partNoInd,
    inniInspectInd: props.requirementDuration.inniInspectInd,
    typeInd: props.requirementDuration.typeInd,
    repairOrdInd: props.requirementDuration.repairOrdInd,
    qcInd: props.requirementDuration.qcInd,
    b2bCheckInvenOrdInd: props.requirementDuration.b2bCheckInvenOrdInd,
    b2cCheckInvenOrdInd: props.requirementDuration.b2cCheckInvenOrdInd,
    shipInvoicePayImentnd: props.requirementDuration.shipInvoicePayImentnd,
    amcInd: props.requirementDuration.amcInd,
    proInd: props.requirementDuration.proInd,
    repairProcessInd: props.requirementDuration.repairProcessInd,
    criticlDateRange: props.requirementDuration.criticlDateRange || "",
    processInd: props.requirementDuration.processInd,
    userId: props.userId,
    orgId: props.orgId,
      });
    }
  }, [props.requirementDuration]);
  const handleToggleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
  };
  const handleDropdownChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    console.log("Updated form values:", updatedValues); // Debugging
    setFormValues(updatedValues);
    // handleConfirm(name);
     props.updateRequirement(updatedValues, props.orgId);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    handleConfirm(name, value);
  };

  const handleConfirm = (name) => {
    const payload = {
      ...formValues,
      timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
          oppTimePeriod: formValues.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
          userId: props.userId,
          orgId: props.orgId,
          jobAniEmailInd: formValues.jobAniEmailInd,
          birthdayEmailInd: formValues.birthdayEmailInd,
          trnsfrEvthngToErpInd:formValues.trnsfrEvthngToErpInd,
          trnsfrToErpQtionWinInd:formValues.trnsfrToErpQtionWinInd,
          piInd:formValues.piInd,
          autoCiInd:formValues.autoCiInd,
          b2bProcureInd:formValues.b2bProcureInd,
          b2bRepairInd:formValues.b2bRepairInd,
          b2bProductionInd:formValues.b2bProductionInd,
          b2cProcureInd:formValues.b2cProcureInd,
          b2cRepairInd:formValues.b2cRepairInd,
          b2cProductionInd:formValues.b2cProductionInd,
          leadsToCustInd:formValues.leadsToCustInd,
          partNoInd:formValues.partNoInd,
          inniInspectInd:formValues.inniInspectInd,
          typeInd: formValues.typeInd,
          repairOrdInd: formValues.repairOrdInd,
          qcInd: formValues.qcInd,
          b2bCheckInvenOrdInd: formValues.b2bCheckInvenOrdInd,
          b2cCheckInvenOrdInd: formValues.b2cCheckInvenOrdInd,
          shipInvoicePayImentnd: formValues.shipInvoicePayImentnd,
          amcInd: formValues.amcInd,
          
          proInd: formValues.proInd,
          
          repairProcessInd: formValues.repairProcessInd,
          criticlDateRange:formValues.criticlDateRange,
          processInd: formValues.processInd,

    };

    props.updateRequirement(payload, props.orgId);

    message.success(`${name} updated successfully.`);
  };
  return (
    <>
 
           <div class="mr-5 ml-5 overflow-auto" style={{ scrollbarWidth:"thin"  }}>
            <div class=" flex    ">
            <div class=" h-h86 overflow-auto overflow-x-hidden">
              
                <div class=" flex justify-between w-full p-3 ">             
                  <div>              
                    <div class=" flex justify-between ">                    
                     <div class=" text-xs  ">Drop Open Orders (in months)</div>
                     <div>
                     <Select
  value={formValues.timePeriod}
  onChange={(value) => handleDropdownChange("timePeriod", value)}
>
  <Option value="1">1</Option>
  <Option value="2">2</Option>
  <Option value="3">3</Option>
  <Option value="4">4</Option>
  <Option value="5">5</Option>
  <Option value="Not Applicable">Not Applicable</Option>
</Select>
                  </div>
                    </div>

                    <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Drop Open Opportunities (in months)</div>    
                      <div>
                      <Select
  value={formValues.oppTimePeriod}
  onChange={(value) => handleDropdownChange("oppTimePeriod", value)}
>
  <Option value="1">1</Option>
  <Option value="2">2</Option>
  <Option value="3">3</Option>
  <Option value="4">4</Option>
  <Option value="5">5</Option>
  <Option value="Not Applicable">Not Applicable</Option>
</Select>
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                       <div class=" text-xs  ">Send Job Anniversary Email</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Anniversary Email")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.jobAniEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("jobAniEmailInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                     
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Send BirthDay Email</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("BirthDay Email")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.birthdayEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("birthdayEmailInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex  mt-2">
                      <div class=" text-xs  font-bold">Production</div>                      
                      </div>
                    {props.user.productionInd === true ? (
   <> 
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Process</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Process")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.processInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("processInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Make To</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Make To")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.typeInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("typeInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Show Orders To Investor</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Show Orders To Investor")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.proInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("proInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">AMC</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("AMC")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.amcInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("amcInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    Production module is Switched off. Switch it on to Access Features.
  </div>
)}   
<div class=" flex  mt-2">
                      <div class=" text-xs  font-bold">Inventory</div>
                      </div>
<div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Inception</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Inception")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.inniInspectInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("inniInspectInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex  justify-between mt-3">
                      <div class=" text-xs  font-bold ">Repair</div>
                      </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Generate Part Number</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Generate Part Number")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.partNoInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("partNoInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Leads To Customer</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Leads To Customer")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.leadsToCustInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("leadsToCustInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Show Orders To Investor</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Show Orders To Investor")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.repairOrdInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("repairOrdInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">QC</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("QC")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.qcInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("qcInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Process</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Process")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.repairProcessInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("repairProcessInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                  <div className="text-xs">Critical Date Range</div>
                  <div>
                  <input
                      type="number"
                      name="criticlDateRange"
                      value={formValues.criticlDateRange}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                          <div class=" flex  justify-between mt-3">
                      <div class=" text-xs  font-bold ">CRM</div>
                      </div>
                      <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Transfer Prospect to ERP On Quotation win</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Transfer Prospect to ERP On Quotation win")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrToErpQtionWinInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrToErpQtionWinInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Transfer All Prospect Info to Erp</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Transfer All Prospect Info to Erp")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrEvthngToErpInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrEvthngToErpInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" text-xs mt-3 font-bold ">Invoice</div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Proforma Invoice (PI) needed</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Proforma Invoice (PI) needed")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.piInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("piInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Invoice can be cancelled</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Invoice can be cancelled")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrToErpQtionWinInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrToErpQtionWinInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Auto generate Commercial Invoice</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Auto generate Commercial Invoice")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.autoCiInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("autoCiInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    {props.user.ecomInd  && (
                      <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">B2b Procure </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("B2b Procure ")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.b2bProcureInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("b2bProcureInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
)}
{props.user.repairInd  && (
   <div class=" flex justify-between   mt-2">                
   <div class=" text-xs  ">B2b Reapir</div>
     <div>
     <div>
   <Popconfirm
     title="Are you sure to change ?"
     onConfirm={() => handleConfirm("B2b Reapir")}
     okText="Yes"
     cancelText="No"
   >
     <Switch
       checked={formValues.b2bRepairInd}
       checkedChildren={"Yes"}
       unCheckedChildren={"No"}
       onChange={(checked) => handleToggleChange("b2bRepairInd", checked)}
     />
   </Popconfirm>
 </div>

     </div>
   </div>
)}
 {props.user.productionInd  && (
  <div class=" flex justify-between   mt-2">                
  <div class=" text-xs  ">B2b Production</div>
    <div>
    <div>
  <Popconfirm
    title="Are you sure to change ?"
    onConfirm={() => handleConfirm("B2b Production")}
    okText="Yes"
    cancelText="No"
  >
    <Switch
      checked={formValues.b2bProductionInd}
      checkedChildren={"Yes"}
      unCheckedChildren={"No"}
      onChange={(checked) => handleToggleChange("b2bProductionInd", checked)}
    />
  </Popconfirm>
</div>

    </div>
  </div>
)}
 {props.user.ecomInd  && (
  <div class=" flex justify-between   mt-2">                
  <div class=" text-xs  ">B2c Procure</div>
    <div>
    <div>
  <Popconfirm
    title="Are you sure to change ?"
    onConfirm={() => handleConfirm("B2c Procure")}
    okText="Yes"
    cancelText="No"
  >
    <Switch
      checked={formValues.b2cProcureInd}
      checkedChildren={"Yes"}
      unCheckedChildren={"No"}
      onChange={(checked) => handleToggleChange("b2cProcureInd", checked)}
    />
  </Popconfirm>
</div>

    </div>
  </div>
)}
  {props.user.repairInd  && (
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2c Reapir</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2c Reapir")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2cRepairInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2cRepairInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 
)}
{props.user.productionInd  && (
 <div class=" flex justify-between   mt-2">                
 <div class=" text-xs  ">B2c Production</div>
   <div>
   <div>
 <Popconfirm
   title="Are you sure to change ?"
   onConfirm={() => handleConfirm("B2c Production")}
   okText="Yes"
   cancelText="No"
 >
   <Switch
     checked={formValues.b2cProductionInd}
     checkedChildren={"Yes"}
     unCheckedChildren={"No"}
     onChange={(checked) => handleToggleChange("b2cProductionInd", checked)}
   />
 </Popconfirm>
</div>

   </div>
 </div> 
)}
 <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2b Inventory Order</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2b Inventory Order")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2bCheckInvenOrdInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2bCheckInvenOrdInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2c Inventory Order</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2c Inventory Order")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2cCheckInvenOrdInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2cCheckInvenOrdInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">Ship Invoice Payment</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("Ship Invoice Payment")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.shipInvoicePayImentnd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("shipInvoicePayImentnd", checked)}
      />
    </Popconfirm>
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

               
             
              </div>
              <div className="flex flex-col">
              <Notifications />
              <Identifier/>
              </div>
            </div>
          </div>
      
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
