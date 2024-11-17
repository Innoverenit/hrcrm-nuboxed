import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { updateTrainingDetails } from "../../../../ProfileAction";
import dayjs from "dayjs";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
class UpdateTrainingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
      
      "Course Name",
       "Organization/Institution",
       "Grade",
       "Start Dates",
        "End Date",
        "Update",
     
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
              {/* <div
                                    style={{
                                        display: "flex",
                                        // border: "0.125em solid red",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "space-between",
                                    }}
                                > */}
              <div class=" w-full"
              >
                <div class=" flex justify-between" >
                <div class=" w-full"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                    <FastField
                      isRequired
                      name="courseName"
                      //label="Course Name"
                      // label={
                      //   <FormattedMessage
                      //     id="app.courseName"
                      //     defaultMessage="Course Name"
                      //   />
                      // }
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      style={{
                        height: "2.0625em",
                        flexBasis: "80%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>

               
                <div class=" flex justify-between mt-3" >
                <div class=" w-full"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                    <FastField
                      isRequired
                      name="courseName"
                      //label="Course Name"
                      // label={
                      //   <FormattedMessage
                      //     id="app.courseName"
                      //     defaultMessage="Course Name"
                      //   />
                      // }
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      style={{
                        height: "2.0625em",
                        flexBasis: "80%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>

               
                <div class=" flex justify-between mt-3" >
                <div class=" w-[60%]"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                    {/* <div class=" text-xs font-bold font-poppins text-black">Organization/Institution</div> */}
                    <FastField
                      type="Organization"
                      name="organization"
                      // label={
                      //   <FormattedMessage
                      //     id="app.organization"
                      //     defaultMessage="Organization/Institution"
                      //   />
                      // }
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                       // marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div class=" w-[30%]"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                    {/* <div class=" text-xs font-bold font-poppins text-black">Grade</div> */}
                    <FastField
                      name="grade"
                      // label={
                      //   <FormattedMessage
                      //     id="app.grade"
                      //     defaultMessage="Grade"
                      //   />
                      // }
                      isColumn
                      selectType="text"
                      width={"30%"}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                       // marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              
                <div class=" flex justify-between mt-3" >
                <div class=" w-[47%]"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                    <Field
                      name="startDates"
                      //label="Start Date"
                      // label={
                      //   <FormattedMessage
                      //     id="app.startDates"
                      //     defaultMessage="Start Dates"
                      //   />
                      // }
                      isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.startDate}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>

                  <div class=" w-[47%]"
              > <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]}</div>
                    <Field
                      name="endDate"
                      //label="End Date "
                      // label={
                      //   <FormattedMessage
                      //     id="app.endDate"
                      //     defaultMessage="End Date"
                      //   />
                      // }
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
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.25em",
                      }}
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
                {this.state.translatedMenuItems[5]}  {/* <FormattedMessage id="app.update" defaultMessage="Update" /> */}
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
