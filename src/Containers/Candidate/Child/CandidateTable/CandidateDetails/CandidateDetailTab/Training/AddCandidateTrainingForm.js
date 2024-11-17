import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addCandidateTrainingDetails } from "../../../../../CandidateAction";
import dayjs from "dayjs";


const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
  courseName:Yup.string().required("Input needed !"),
  startDate: Yup.string().required("Input needed !"),
  endDate: Yup.string().required("Input needed !"),
});

class AddCandidateTrainingForm extends Component {
  render() {
    const { addingCandidateTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            courseName: "",
            grade: "",
            startDate: "",
            endDate: "",
            organization: "",
            documentId: "",
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addCandidateTrainingDetails(
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
                    <div class=" w-full"
                >
                        <FastField
                          isRequired
                          name="courseName"                          
                          label="Course Name"
                          
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
                          label="Organization/Institution"
                           
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
                          label="Grade"
                          
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
                          label="Start"
                            
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
                          label="End"
                           
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
                        isColumnWithoutNoCreate
                        selectType="documentTypeName"                       
                        label="Type"
                                                
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
                    Loading={addingCandidateTrainingDetails}
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

const mapStateToProps = ({ candidate }) => ({
  // userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  addingCandidateTrainingDetails: candidate.addingCandidateTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addCandidateTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCandidateTrainingForm);
