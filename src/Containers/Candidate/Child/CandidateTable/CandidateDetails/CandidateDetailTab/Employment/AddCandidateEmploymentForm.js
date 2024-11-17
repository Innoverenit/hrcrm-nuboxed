import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addCandidateEmploymentDetails } from "../../../../../CandidateAction";
import dayjs from "dayjs";
import {getSequence} from "../../../../../../Settings/SettingsAction"

import { getDesignations } from "../../../../../../Settings/Designation/DesignationAction";

const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
  companyName: Yup.string().required("Input needed !"),
  startDate: Yup.string().required("Input needed !"),
  endDate: Yup.string().required("Input needed !"),
  designationTypeId: Yup.string().required("Input needed !"),
});
class CandidateEmploymentForm extends Component {
  render() {
    const { addingCandidateEmploymentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            companyName: "",
            startDate: "",
            endDate: "",
            // designation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            salary: "",
            salaryType: "",
            currency: "",
            documentId: "",
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addCandidateEmploymentDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.candidateId,
              values.documentId,

              resetForm()
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
                        label={
                          <FormattedMessage
                            id="app.companyName"
                            defaultMessage="Organization"
                          />
                    
                        }
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
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="Designation"
                          />
                        }
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
                          //label="Start Date"
                          label={
                            <FormattedMessage
                              id="app.start"
                              defaultMessage="Start"
                            />
                          }
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
                          // label="End Date "
                          label={
                            <FormattedMessage
                              id="app.end"
                              defaultMessage="End"
                            />
                          }
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
                          //label="Salary"
                          label={
                            <FormattedMessage
                              id="app.salary"
                              defaultMessage="Salary"
                            />
                          }
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
                          //label="Salary Type"
                          label={
                            <FormattedMessage
                              id="app.salaryType"
                              defaultMessage="Salary Type"
                            />
                          }
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
                          // label="Curr"
                          label={
                            <FormattedMessage
                              id="app.currency"
                              defaultMessage="Currency"
                            />
                          }
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
                        label={
                          <FormattedMessage
                            id="app.remarks"
                            defaultMessage="Remarks"
                          />
                        }
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
                      // label="Name of Document"
                      label={
                        <FormattedMessage
                          id="app.documentTitle"
                          defaultMessage="Name of Document"
                        />
                      }
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
                        // label="Type"
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }
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
                    Loading={addingCandidateEmploymentDetails}
                  >
                    <FormattedMessage id="app.submit" defaultMessage="Submit" />
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ candidate, profile,designations }) => ({
  // userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  addingCandidateEmploymentDetails: profile.addingCandidateEmploymentDetails,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addCandidateEmploymentDetails,getDesignations,getSequence }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEmploymentForm);
