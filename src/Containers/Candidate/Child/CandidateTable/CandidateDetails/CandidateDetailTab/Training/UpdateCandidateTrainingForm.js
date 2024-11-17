import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { updateCandidateTrainingDetails } from "../../../../../CandidateAction";
import dayjs from "dayjs";


const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
});
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

class UpdateCandidateTrainingForm extends Component {
  render() {
    const { updatingCandidateTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setCandidateEditingTraining.id,
            courseName: this.props.setCandidateEditingTraining.courseName || "",
            grade: this.props.setCandidateEditingTraining.grade || "",
            startDate:
              dayjs(this.props.setCandidateEditingTraining.startDate) || "",
            endDate:
              dayjs(this.props.setCandidateEditingTraining.endDate) || "",
            organization:
              this.props.setCandidateEditingTraining.organization || "",
            candidateTrainingId:this.props.setCandidateEditingTraining.candidateTrainingId || "",
            }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateCandidateTrainingDetails(
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
                        <div class=" w-full"
                    >
                            <FastField
                              isRequired
                              name="courseName"                          
                              label={
                                <FormattedMessage
                                  id="app.courseName"
                                  defaultMessage="Course Name"
                                />
                              }
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                        </div>
                        <div class=" flex justify-between mt-4" >
                  <div class=" w-[60%]"
                    >                   
                            <FastField
                              type="Organization"
                              name="organization"
                              label={
                                <FormattedMessage
                                  id="app.organization"
                                  defaultMessage="Organization/Institution"
                                />
                              }
                              className="field"
                              isColumn
                              width={"100%"}
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                          <div class=" w-[30%]"
                    >                       
                            <FastField
                              name="grade"
                              label={
                                <FormattedMessage
                                  id="app.grade"
                                  defaultMessage="Grade"
                                />
                              }
                              isColumn
                              selectType="text"
                              width={"30%"}
                              component={InputComponent}
                              inlineLabel
                              style={{width:"100%"}}
                              />
                          </div>
                        </div>
                        <div class=" flex justify-between mt-4" >
                  <div class=" w-[47%]"
                    >
                            <Field
                              name="startDate"                        
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
                   
                      </div>
    
                      <div class=" w-[50%]"
                    >
                      <div class=" w-full"
                    >
                          <Field
                            name="documentId"
                            isRequired
                            component={DragableUpload}
                          />
                          <div class=" flex justify-between mt-4" >
                  <div class=" w-[47%]"
                    >
                          <Field
                            name="documentTitle"                        
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
                            isColumnWithoutNoCreate
                            selectType="documentTypeName"                       
                            label={
                              <FormattedMessage
                                id="app.type"
                                defaultMessage="Type"
                              />
                            }                        
                            component={SearchSelect}
                            isColumn
                            value={values.documentId}                        
                            inlineLabel
                          />
                          </div>
                          </div>                      
                        </div>
                      </div>
                    </div>
                    <div class=" flex justify-end mt-4" >
                      <Button
                        htmlType="submit"
                        type="primary"
                        Loading={updatingCandidateTrainingDetails}
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

const mapStateToProps = ({ candidate }) => ({
  candidateId: candidate.candidate.candidateId,
  setCandidateEditingTraining: candidate.setCandidateEditingTraining,
  updatingCandidateTrainingDetails: candidate.updatingCandidateTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateCandidateTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateTrainingForm);
