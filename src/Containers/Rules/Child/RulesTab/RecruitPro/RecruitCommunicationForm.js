// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Switch, Checkbox, Button, Popconfirm, message } from "antd";
// import { Formik, Form, Field } from "formik";
// import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";

// import CheckboxGroup from "antd/lib/checkbox/Group";
// import * as Yup from "yup";
// import {
//   getTemplate,
//   addRecruitProForEmail,
//   getRecruitProForEmail,
// } from "../../../../Rules/RulesAction";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
// import { Link } from "react-router-dom";
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";

// const RecruitSchema = Yup.object().shape({
//   template: Yup.string().required("Select Template"),
//   SponsorNoOfTimes: Yup.number()
//     .min(0)
//     .max(4),
//   candidateNoOfTimes: Yup.number()
//     .min(0)
//     .max(4),
// });
// function RecruitCommunicationForm(props) {
//   const [reminderCandidate, setReminderCandidate] = useState(false);
//   function handleReminderCandidate() {
//     setReminderCandidate(!reminderCandidate);
//   }
//   const [reminderSponsor, setReminderSponsor] = useState(false);
//   function handleReminderSponsor() {
//     setReminderSponsor(!reminderSponsor);
//   }

//   useEffect(() => {
//     setReminderCandidate(props.recruitProForEmail.candidateReminderInd);
//   }, [props.recruitProForEmail.candidateReminderInd]);

//   useEffect(() => {
//     setReminderSponsor(props.recruitProForEmail.sponsorReminderInd);
//   }, [props.recruitProForEmail.sponsorReminderInd]);
//   useEffect(() => {
//     props.getTemplate();
//     props.getRecruitProForEmail(props.orgId);
//   }, []);

//   const InternalOption = ["Candidate", "Opportunity Owner", "Admin"];
//   const InternalOption1 = ["Sponsor", "Opportunity Owner", "Admin"];
//   useEffect(() => {
//     setCheckedListForInternal(props.recruitProForEmail.recepient);
//   }, [props.recruitProForEmail.recepient]);

//   useEffect(() => {
//     setCheckedListForInternal1(props.recruitProForEmail.sponserReceiver);
//   }, [props.recruitProForEmail.sponserReceiver]);
//   const data = props.recruitProForEmail && props.recruitProForEmail.recepient;
//   const data1 =
//     props.recruitProForEmail && props.recruitProForEmail.sponserReceiver;

//   const [indeterminateForInternal, setIndeterminateForInternal] = useState(
//     true
//   );
//   const [checkedListForInternal, setCheckedListForInternal] = useState(
//     data || []
//   );
//   const [checkAllForInternal, setCheckAllForInternal] = useState(false);

//   //2nd part
//   const [indeterminateForInternal1, setIndeterminateForInternal1] = useState(
//     true
//   );
//   const [checkedListForInternal1, setCheckedListForInternal1] = useState(
//     data1 || []
//   );
//   const [checkAllForInternal1, setCheckAllForInternal1] = useState(false);
//   //2nd part done
//   function onCheckAllChangeForInternal(e) {
//     setCheckedListForInternal(e.target.checked ? InternalOption : []);
//     setIndeterminateForInternal(false);
//     setCheckAllForInternal(e.target.checked);
//   }

//   function onChangeForInternal(checkedListForInternal) {
//     setCheckedListForInternal(checkedListForInternal);
//     setIndeterminateForInternal(
//       !!checkedListForInternal.length &&
//       checkedListForInternal.length < InternalOption.length
//     );
//     setCheckAllForInternal(
//       checkedListForInternal.length === InternalOption.length
//     );
//   }
//   //2nd part
//   function onCheckAllChangeForInternal1(e) {
//     setCheckedListForInternal1(e.target.checked ? InternalOption1 : []);
//     setIndeterminateForInternal1(false);
//     setCheckAllForInternal1(e.target.checked);
//   }

//   function onChangeForInternal1(checkedListForInternal1) {
//     setCheckedListForInternal1(checkedListForInternal1);
//     setIndeterminateForInternal1(
//       !!checkedListForInternal1.length &&
//       checkedListForInternal1.length < InternalOption1.length
//     );
//     setCheckAllForInternal1(
//       checkedListForInternal1.length === InternalOption1.length
//     );
//   }
//   const templateData =
//     props.template.length &&
//     props.template.map((item) => {
//       return {
//         label: item.type || "",
//         value: item.templateId,
//       };
//     });

//   return (
//     <>
//       <Formik
//         enableReinitialize
//         initialValues={{
//           candidateToggleInd: props.recruitProForEmail.candidateToggleInd
//             ? true
//             : false,
//           orgId: props.orgId,
//           sponsorToggleInd: props.recruitProForEmail.sponsorToggleInd
//             ? true
//             : false,

//           recepient: props.recruitProForEmail.recepient,
//           template: props.recruitProForEmail.template || undefined,
//           approverContactInd:
//             props.recruitProForEmail &&
//             props.recruitProForEmail.approverContactInd,
//           attachmentInd:
//             props.recruitProForEmail && props.recruitProForEmail.attachmentInd,

//           sponserReceiver: props.recruitProForEmail.sponserReceiver,
//           sponserTempId: props.recruitProForEmail.sponserTempId || undefined,
//           sponserAttachmentInd:
//             props.recruitProForEmail &&
//             props.recruitProForEmail.sponserAttachmentInd,
//           sponserApproveInd:
//             props.recruitProForEmail &&
//             props.recruitProForEmail.sponserApproveInd,

//           stageInd: props.recruitProForEmail.stageInd ? true : false,
//           stageTemplateId:
//             props.recruitProForEmail.stageTemplateId || undefined,

//           candidateReminderInd: props.recruitProForEmail.candidateReminderInd
//             ? true
//             : reminderCandidate,
//           candidateFrequency:
//             props.recruitProForEmail.candidateFrequency || undefined,
//           candidateNoOfTimes: props.recruitProForEmail.candidateNoOfTimes || "",
//           sponsorReminderInd: props.recruitProForEmail.sponsorReminderInd
//             ? true
//             : reminderSponsor,
//           sponsorFrequency:
//             props.recruitProForEmail.sponsorFrequency || undefined,
//           SponsorNoOfTimes: props.recruitProForEmail.SponsorNoOfTimes || "",
//         }}
//         validationSchema={RecruitSchema}
//         onSubmit={(values) => { }}
//       >
//         {({ values }) => (
//           <Form className="form-background">
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",

//                 height: "60vh",
//                 overflow: "auto",
//               }}
//             >
//              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[100%]">
//                 <div
//                   style={{
//                     width: "44%",

//                     marginTop: "0.625em",
//                     marginLeft: "1em",
//                   }}
//                 >
//                   <div>
//                     {/* <div class=" text-xs font-bold font-poppins
//                       style={{
//                         flexBasis: "13%",
//                         marginTop: "0.625em",
//                         fontSize: "1em",
//                         fontStyle: "italic",
//                       }}
//                     >
//                       Candidate
//                     </div> */}
                  
//                   </div>
//                   <mt-3 />
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <div style={{ width: "100%", marginTop: "0.625em" }}>
//                       <div class=" text-xs font-bold font-poppins
//                         style={{
//                           flexBasis: "13%",
//                           marginTop: "0.625em",
//                         }}
//                       >
//                         Update at each stage?
//                       </div>
//                     </div>

//                     <div style={{ marginTop: "0.625em" }}>
//                     <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                      <Switch
//                         name="stageInd"
//                         // component={SwitchComponent}
//                         // data={values.stageInd}
//                         checkedChildren={"Yes"}
//                         unCheckedChildren={"No"}
//                         width={"5em"}
//                       />
//                        </Popconfirm>
//                     </div>
//                   </div>

//                   <mt-3 />
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <div style={{ width: "100%", marginTop: "0.625em" }}>
//                       <div class=" text-xs font-bold font-poppins
//                         style={{
//                           flexBasis: "13%",
//                           marginTop: "0.625em",
//                         }}
//                       >
//                         Email Offer?
//                       </div>
//                     </div>
//                     <div style={{ marginTop: "0.625em" }}>
//                     <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                      <Switch
//                         name="candidateToggleInd"
//                         // component={SwitchComponent}
//                         data={values.candidateToggleInd}
//                         checkedChildren={"Yes"}
//                         unCheckedChildren={"No"}
//                         width={"5em"}
//                       />
//                        </Popconfirm>
//                     </div>
//                   </div>
//                   <mt-3 />
//                   {values.candidateToggleInd && (
//                     <>
//                       <div class=" text-xs font-bold font-poppins text-black">To </div>
//                       <div style={{ borderBottom: "0.0625em solid #E9E9E9" }}>
//                         <Checkbox
//                           indeterminate={indeterminateForInternal}
//                           onChange={onCheckAllChangeForInternal}
//                           checked={checkAllForInternal}
//                         >
//                           Check all
//                         </Checkbox>
//                       </div>
//                       <CheckboxGroup
//                         options={InternalOption}
//                         value={checkedListForInternal}
//                         onChange={onChangeForInternal}
//                       />
//                       <mt-3 marginTop="0.5em" />
//                       <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
//                         <span style={{ width: "100%" }}>
//                           <Field
//                             isRequired
//                             label="Template"
//                             star
//                             name="template"
//                             type="text"
//                             placeholder={"Select"}
//                             marginTop={"0.25em"}
//                             options={
//                               Array.isArray(templateData) ? templateData : []
//                             }
//                             component={SelectComponent}

//                             noLable
//                             className="field"
//                             style={{
//                               flexBasis: "80%",
//                               width: "100%",
//                               margintop: "0.25em",
//                             }}
//                           />
//                         </span>
//                       </div>
//                       {!props.template.length && (
//                         <Link to={`/template/${0}`}>
//                           <p style={{ marginTop: "0.3125em" }}>
//                             Click here to create Template
//                           </p>
//                         </Link>
//                       )}
//                       <mt-3 marginTop="0.5em" />
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div style={{ width: "100%", marginTop: "0.625em" }}>
//                           <div class=" text-xs font-bold font-poppins
//                             style={{
//                               flexBasis: "13%",
//                               marginTop: "0.625em",
//                             }}
//                           >
//                             Include offer acceptance link?
//                           </div>
//                         </div>
//                         <div style={{ marginTop: "0.625em" }}>
//                         <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                         <Switch
//                             name="approverContactInd"
//                             // component={SwitchComponent}
//                             data={values.approverContactInd}
//                             checkedChildren={"Yes"}
//                             unCheckedChildren={"No"}
//                             width={"5em"}
//                           />
//                             </Popconfirm>
//                         </div>
//                       </div>
//                       <mt-3 marginTop="0.5em" />
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div style={{ width: "100%", marginTop: "0.625em" }}>
//                           <div class=" text-xs font-bold font-poppins
//                             style={{
//                               flexBasis: "13%",
//                               marginTop: "0.625em",
//                             }}
//                           >
//                             Also include PDF attachment
//                           </div>
//                         </div>
//                         <div style={{ marginTop: "0.625em" }}>
//                         <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                                           <Switch

//                             disabled
//                             name="attachmentInd"
//                             // component={SwitchComponent}
//                             data={values.attachmentInd}
//                             checkedChildren={"Yes"}
//                             unCheckedChildren={"No"}
//                             width={"5em"}
//                           />
//                            </Popconfirm>
//                         </div>
//                       </div>
//                       <mt-3 />
//                       <Checkbox
//                         onChange={handleReminderCandidate}
//                         checked={reminderCandidate}
//                       >
//                         Send auto reminder
//                       </Checkbox>

//                       <mt-3 />
//                       {reminderCandidate && (
//                         <>
//                         <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
//                             <div style={{ width: "47%" }}>
//                               <Field
//                                 isRequired
//                                 label="How many? (max-4)"
//                                 name="candidateNoOfTimes"
//                                 component={InputComponent}
//                                 style={{
//                                   flexBasis: "80%",
//                                   width: "84%",
//                                   marginTop: "0.25em",
//                                 }}
//                               />
//                             </div>
//                             <div style={{ width: "45%" }}>
//                               <Field
//                                 isRequired
//                                 label="Frequency"
//                                 name="candidateFrequency"
//                                 type="text"
//                                 placeholder={"Select"}
//                                 options={["Daily", "Weekly", "Monthly"]}
//                                 component={SelectComponent}
//                                 marginTop={"0.25em"}
//                                 className="field"
//                                 style={{
//                                   flexBasis: "80%",
//                                   width: "100%",
//                                   marginTop: "0.25em",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 <div
//                   style={{
//                     height: "100%",
//                     width: "44%",
//                     marginTop: "0.625em",
//                     marginRight: "0.75em",
//                   }}
//                 >
//                   <div>
//                     <div class=" text-xs font-bold font-poppins
//                       style={{
//                         flexBasis: "13%",
//                         marginTop: "0.625em",
//                         fontSize: "1em",
//                         fontStyle: "italic",
//                       }}
//                     >
//                       Sponsor
//                     </div>
//                   </div>
//                   <mt-3 />
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     {" "}
//                     <div style={{ width: "100%", marginTop: "0.625em" }}>
//                       <div class=" text-xs font-bold font-poppins
//                         style={{
//                           flexBasis: "13%",
//                           marginTop: "0.625em",
//                         }}
//                       >
//                         Email for approval on candidate's acceptance?
//                       </div>
//                     </div>
//                     <div style={{ width: "20%", marginTop: "0.625em" }}>
//                     <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                      <Switch
//                         name="sponsorToggleInd"
//                         component={SwitchComponent}
//                         data={values.sponsorToggleInd}
//                         checkedChildren={"Yes"}
//                         unCheckedChildren={"No"}
//                         width={"5em"}
//                       />
//                       </Popconfirm>
//                     </div>
//                   </div>
//                   <mt-3 />
//                   {values.sponsorToggleInd && (
//                     <>
//                       <div class=" text-xs font-bold font-poppins text-black">Send</div>

//                       <div class=" text-xs font-bold font-poppins text-black">to </div>
//                       <mt-3 />
//                       <div style={{ borderBottom: "0.0625em solid #E9E9E9" }}>
//                         <Checkbox
//                           indeterminate={indeterminateForInternal1}
//                           onChange={onCheckAllChangeForInternal1}
//                           checked={checkAllForInternal1}
//                         >
//                           Check all
//                         </Checkbox>
//                       </div>
//                       <CheckboxGroup
//                         options={InternalOption1}
//                         value={checkedListForInternal1}
//                         onChange={onChangeForInternal1}
//                       />
//                       <mt-3 marginTop="0.9375em" />
//                       <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[100%]">
//                         <span style={{ width: "100%" }}>
//                           <Field
//                             isRequired
//                             label="Template"
//                             star
//                             name="sponserTempId"
//                             type="text"
//                             placeholder={"Select"}
//                             marginTop={"0.25em"}
//                             options={
//                               Array.isArray(templateData) ? templateData : []
//                             }
//                             component={SelectComponent}

//                             noLable
//                             className="field"
//                             style={{
//                               flexBasis: "80%",
//                               width: "100%",
//                               margintop: "0.25em",
//                             }}
//                           />
//                         </span>
//                       </div>
//                       {!props.template.length && (
//                         <Link to={`/template/${0}`}>
//                           <p style={{ marginTop: "0.3125em" }}>
//                             Click here to create Template
//                           </p>
//                         </Link>
//                       )}

//                       <mt-3 marginTop="0.9375em" />

//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div style={{ width: "100%", marginTop: "0.625em" }}>
//                           <div class=" text-xs font-bold font-poppins
//                             style={{
//                               flexBasis: "13%",
//                               marginTop: "0.625em",
//                             }}
//                           >
//                             Include approval link?
//                           </div>
//                         </div>
//                         <div style={{ width: "20%", marginTop: "0.625em" }}>
//                         <Popconfirm
//                 title="Do you wish to change Status ? "
//                 // onConfirm={handleEmailJobClick}
//                 // onCancel={handleCancel}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                      <Switch
//                             name="sponserApproveInd"
//                             // component={SwitchComponent}
//                             data={values.sponserApproveInd}
//                             checkedChildren={"Yes"}
//                             unCheckedChildren={"No"}
//                             width={"5em"}
//                           />
//                           </Popconfirm>
//                         </div>
//                       </div>
//                       <mt-3 marginTop="0.9375em" />
                    
//                       <div style={{ marginTop: "17%" }}></div>
//                       <mt-3 />
//                       <Checkbox
//                         onChange={handleReminderSponsor}
//                         checked={reminderSponsor}
//                       >
//                         Send auto reminder
//                       </Checkbox>

//                       <mt-3 />
//                       {reminderSponsor && (
//                         <>
//                           <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
//                             <div style={{ width: "47%" }}>
//                               <Field
//                                 isRequired
//                                 label="How many? (max-4)"
//                                 name="SponsorNoOfTimes"
//                                 component={InputComponent}
//                                 style={{
//                                   flexBasis: "80%",
//                                   width: "84%",
//                                   marginTop: "0.25em",
//                                 }}
//                               />
//                             </div>
//                             <div style={{ width: "45%" }}>
//                               <Field
//                                 isRequired
//                                 label="Frequency"
//                                 name="sponsorFrequency"
//                                 type="text"
//                                 placeholder={"Select"}
//                                 options={["Daily", "Weekly", "Monthly"]}
//                                 component={SelectComponent}
//                                 marginTop={"0.25em"}
//                                 className="field"
//                                 style={{
//                                   flexBasis: "80%",
//                                   width: "100%",
//                                   marginTop: "0.25em",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <mt-3 />
//             <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto  mr-1 ">
//               <Popconfirm
//                 title="Do you wish to proceed?"
//                 onConfirm={() =>
//                   values.template === undefined && values.candidateToggleInd
//                     ? message.info("Select Template")
//                     : values.SponsorNoOfTimes > "4"
//                       ? alert("How many?max to 4")
//                       : values.candidateNoOfTimes > "4"
//                         ? alert("How many?max to 4")
//                         : props.addRecruitProForEmail(
//                           {
//                             ...values,
//                             candidateReminderInd: reminderCandidate,
//                             recepient: checkedListForInternal,
//                             sponsorReminderInd: reminderSponsor,
//                             sponserReceiver: checkedListForInternal1,
//                           },
//                           props.orgId
//                         )
//                 }
//                 onCancel={props.getRecruitProForEmail}
//                 okText="Ok"
//                 cancelText="Cancel"
//               >
//                 <Button
//                   type="primary"
//                   Loading={props.addingRecruitPro}
//                   htmlType="submit"
//                   style={{
//                     marginRight: "-0.4375em",
//                     marginTop: "1.25em",
//                     marginBottom: "0.3125em",
//                   }}
//                 >
//                   Update
//                 </Button>
//               </Popconfirm>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// }

// const mapStateToProps = ({ rule, auth }) => ({
//   template: rule.template,
//   addingRecruitPro: rule.addingRecruitPro,
//   recruitProForEmail: rule.recruitProForEmail,
//   fetchingRecruitPro: rule.fetchingRecruitPro,
//   orgId: auth.userDetails.organizationId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getTemplate,
//       addRecruitProForEmail,
//       getRecruitProForEmail
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RecruitCommunicationForm);
