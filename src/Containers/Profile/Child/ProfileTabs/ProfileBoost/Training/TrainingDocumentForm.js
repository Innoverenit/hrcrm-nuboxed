import React, {   Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addTrainingDetails } from "../../../../ProfileAction";
import dayjs from "dayjs";

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });

class TrainingDocumentForm extends Component {
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
        "Specialization",
        "Organization/Institute",
        "Grade",
        "Start Date",
        "End Date",
        "Name of Document",
        "Type",
        "Description of document",
        "Submit",
      "Course Type"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { addingTrainingDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            documentTypeId: "",
            employeeId: this.props.employeeId,
            courseName: "",
            grade: "",
            startDate: "",
            endDate: "",
            organization: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.employeeId,
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
                    <div class=" w-full" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
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
                    <div class=" w-[60%]">
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                      {/* <div class=" text-xs font-bold font-poppins text-black">Organization/Institution</div> */}
                      <FastField
                        type="Organization"
                        name="organization"
                        // label={
                        //   <FormattedMessage
                        //     id="app.organization/institution"
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
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div class=" w-[30%]">
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
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
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                
                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]">
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                      <Field
                        name="startDate"
                        //label="Start Date"
                        // label={
                        //   <FormattedMessage
                        //     id="app.startDate"
                        //     defaultMessage="Start Date"
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
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div class=" w-[47%]">
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]}</div>
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

                <div class=" w-[50%]">
                  <div class=" flex justify-between" justifyContent="space-between"></div>

                  <div class=" w-full">
                    
                    <Field
                      name="documentId"
                      isRequired
                      component={DragableUpload}
                    />
                 <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[5]}</div>
                    <Field
                      name="documentTitle"
                      //label="Name of Document"
                      // label={
                      //   <FormattedMessage
                      //     id="app.documentTitle"
                      //     defaultMessage="Name of Document"
                      //   />
                      // }
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      style={{ height: "2.0625em", marginTop: "0.25em" }}
                    />
                    <div class=" mt-3">
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[6]}</div>
                    <Field
                          name="documentTypeId"
                          selectType="documentTypeName"
                          isColumnWithoutNoCreate
                          // label="Type"
                          // label={
                          //   <FormattedMessage
                          //     id="app.documentId"
                          //     defaultMessage="Type"
                          //   />
                          // }
                          // isRequired
                          component={SearchSelect}
                          isColumn
                          margintop={"0.25em"}
                          value={values.documentId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          style={{ flexBasis: "80%" }}
                        />
                        </div>
                        <div class=" mt-3">
                        <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[7]}</div>
                    <Field
                      name="documentDescription"
                      //label="Description of Document"
                      // label={
                      //   <FormattedMessage
                      //     id="app.documentDescription"
                      //     defaultMessage="Description of Document"
                      //   />
                      // }
                      isRequired
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      style={{ height: "5em", marginTop: "0.25em" }}
                    />
                     </div>
                
                  </div>

           

                  {/* <FieldArray
                                    name="address"
                                    render={(arrayHelpers) => (
                                        <AddressFieldArray
                                            singleAddress
                                            arrayHelpers={arrayHelpers}
                                            values={values}
                                        />
                                    )}
                                /> */}

                 
                </div>
              </div>
           
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingTrainingDetails}
                >
                {this.state.translatedMenuItems[8]}  {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
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
  addingTrainingDetails: profile.addingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTrainingDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDocumentForm);
