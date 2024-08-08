import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { updateTrainingDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
class UpdateTrainingForm extends Component {
  render() {
    const { updatingTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingTraining.id,
            courseName: this.props.setEditingTraining.courseName || "",
            grade: this.props.setEditingTraining.grade || "",
            startDate: dayjs(this.props.setEditingTraining.startDate) || "",
            endDate: dayjs(this.props.setEditingTraining.startDate) || "",
            organization: this.props.setEditingTraining.organization || "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.employeeId,

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
                <div class=" w-full"
                >
               <div class=" flex justify-between" >
                      <div class=" w-full" >
                      <FastField
                        isRequired
                        name="courseName"
                        //label="Course Name"
                        label={<FormattedMessage
                          id="app.courseName"
                          defaultMessage="Course Name"
                        />}
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                         />
                    </div>
                  </div>

                  <div class=" flex justify-between mt-3" >
                      <div class=" w-[60%]" >
                      {/* <StyledLabel>Organization/Institution</StyledLabel> */}
                      <FastField
                        type="Organization"
                        name="organization"
                        label={<FormattedMessage
                          id="app.organization"
                          defaultMessage="Organization"
                        />}
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                       />
                    </div>
                    <div class=" w-[30%]" >
                      {/* <StyledLabel>Grade</StyledLabel> */}
                      <FastField
                        name="grade"
                        label={<FormattedMessage
                          id="app.grade"
                          defaultMessage="Grade"
                        />}
                        isColumn
                        selectType="text"
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                       />
                    </div>
                  </div>
                  <div class=" flex justify-between mt-3" >
                      <div class=" w-[47%]" >
                      <Field
                        name="startDate"
                        //label="Start Date"
                        label={<FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />}
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
                        //label="End Date "
                        label={<FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />}
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
                <div class=" flex justify-end mt-3" >
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={updatingTrainingDetails}
                  >
                    <FormattedMessage
                      id="app.update"
                      defaultMessage="Update"
                    />
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({
  employeeId: employee.singleEmployee.employeeId,
  setEditingTraining: profile.setEditingTraining,
  updatingTrainingDetails: profile.updatingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateTrainingDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrainingForm);
