import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { updateCandidateEmploymentDetails } from "../../../../../CandidateAction";

import { getDesignations } from "../../../../../../Settings/Designation/DesignationAction";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
const documentSchema = Yup.object().shape({});

class UpdateCandidateEmploymentForm extends Component {
  render() {
    const { updatingCandidateEmploymentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setCandidateEditingEmployment.id,
            companyName:
              this.props.setCandidateEditingEmployment.companyName || "",
            startDate:
              dayjs(this.props.setCandidateEditingEmployment.startDate) || "",
            endDate:
              dayjs(this.props.setCandidateEditingEmployment.endDate) || "",
              designationTypeId:
              this.props.setCandidateEditingEmployment.designationTypeId || "",
            description:
              this.props.setCandidateEditingEmployment.description || "",
            salary: this.props.setCandidateEditingEmployment.salary || "",
            salaryType:
              this.props.setCandidateEditingEmployment.salaryType || "",
            currency: this.props.setCandidateEditingEmployment.currency || "",
          }}
          //   validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateCandidateEmploymentDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.candidateId,
              resetForm()
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
            <Form className="form-background">
            <div class=" flex w-full h-full justify-between"
                 >
                   <div class=" w-[45%]"
                   >
                      <div class=" flex justify-between" >
                 <div class=" w-[47%]"
                   >
                          <Field
                           isRequired
                           name="companyName"
                           type="text"
                           isColumn
                           width={"100%"}
                           // label="Organization Name"
                           label="Organization"
                           
                           component={InputComponent}
                           inlineLabel
                           
                         />
                       
                       </div>
                       <div class=" w-[47%]"
                   >
                       <div>
                         <FastField
                           name="designationTypeId"
                           // label="Designations"
                           label="Designation"
                            
                           selectType="designationType"
                           isColumn
                           component={SearchSelect}
                           value={values.designationTypeId}
                           isColumnWithoutNoCreate
                           inlineLabel
                           isRequired
                           />
                       </div>
                       </div>
                       </div>
   
                       <div class="flex justify-between mt-4"
                   >
                   <div class=" w-[47%]"
                   >
                           <Field
                             name="startDate"
                             label="Start Date"
                             
                             isRequired
                             component={DatePicker}
                             isColumn
                             width={"100%"}
                             value={values.startDate}
                             inlineLabel
                             />
                         </div>
                         <div class=" w-[47%]"
                   >
                           <Field
                             name="endDate"
                             label="End Date "
                            
                             isRequired
                             isColumn
                             width={"100%"}
                             component={DatePicker}
                             value={values.endDate}
                             disabledDate={(currentDate) => {
                               if (values.startDate) {
                                 if (
                                   dayjs(currentDate).isBefore(
                                     dayjs(values.startDate)
                                   )
                                 ) {
                                   return true;
                                 } else {
                                   return false;
                                 }
                               }
                             }}
                             inlineLabel
                             />
                         </div>
                       </div>
                       <div class="flex justify-between mt-4"
                   >
                   <div class=" w-[35%]"
                   >
                           <Field
                             // isRequired
                             name="salary"
                             type="text"
                             isColumn
                             width="85%"
                             label="Salary"
                           
                             component={InputComponent}
                             inlineLabel
                           />
                         </div>
                      
                         <div class=" w-[27%]"
                   >
                           <Field
                             // isRequired
                             name="salaryType"
                             type="text"
                             isColumn
                             width="47%"
                           label="Salary Type"
                            
                             component={SelectComponent}
                             options={["Daily", "Monthly", "Annual"]}
                             inlineLabel
                             />
                         </div>
                       
                         <div class=" w-[30%]"
                   >
                           <Field
                             name="currency"
                             isColumnWithoutNoCreate
                             placeholder="Curr"
                             label="Currency"
                               
                             width="100%"
                             isColumn
                             selectType="currencyName"
                             // isRequired
                             component={SearchSelect}
                             // options={Array.isArray(currency) ? currency : []}
                             />
                         </div>
                       </div>
   
                       <div class=" mt-4">
                         <Field
                           name="description"
                           //label="Describe your role"
                           label="Remarks"
                             
                           // isRequired
                           isColumnWithoutNoCreate
                           isColumn
                           width={"100%"}
                           component={TextareaComponent}
                           />
                       </div>
                     </div>
   
                     <div class=" w-[45%]"
                   >
                       <Field
                         name="documentId"
                         // isRequired
                         component={DragableUpload}
                       />
                       <div class="flex justify-between mt-4"
                   >
                   <div class=" w-[47%]"
                   >
                       <Field
                         name="documentTitle"
                       label="Name of Document"
                       
                         width={"100%"}
                         isColumn
                         component={InputComponent}
                         />
                         </div>
                         <div class=" w-[47%]"
                   >
                       <Field
                           name="documentTypeId"
                           selectType="documentTypeName"
                           isColumnWithoutNoCreate
                            label="Type"
                           
                           // isRequired
                           component={SearchSelect}
                           isColumn
                        
                           value={values.documentId}
                           // defaultValue={{ label: firstName, value: documentId }}
                           inlineLabel
                           />
                           
                           </div>
                           </div>
                      
                     </div>
                   </div>
                   <div class=" flex justify-end mt-4" >
                     <Button
                       htmlType="submit"
                       type="primary"
                       Loading={updatingCandidateEmploymentDetails}
                     >
                   Submit
                     </Button>
                   </div>
                 </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ candidate,designations }) => ({
  candidateId: candidate.candidate.candidateId,
  setCandidateEditingEmployment: candidate.setCandidateEditingEmployment,
  updatingCandidateEmploymentDetails:
    candidate.updatingCandidateEmploymentDetails,
    designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCandidateEmploymentDetails,
      getDesignations,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateEmploymentForm);
