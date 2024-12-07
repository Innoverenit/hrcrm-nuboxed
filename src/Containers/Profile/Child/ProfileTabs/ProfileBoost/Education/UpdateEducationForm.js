import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,  } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { updateEducationDetails } from "../../../../ProfileAction";

import { getEducations } from "../../../../../Settings/Educations/EducationAction";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateEducationForm extends Component {
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
      "Type",
       "Course Name",
       "Specialization",
       "University/Institute",
        "Year of Passing",
        "Marks Secured",
        "Marks Type",
        "Update",
     "Course Type"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };



  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  render() {
    const { updatingEducationDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingEducation.id,
            educationTypeId: this.props.setEditingEducation.educationTypeId || "",
            courseType: this.props.setEditingEducation.courseType || "",
            courseName: this.props.setEditingEducation.courseName || "",
            specialization: this.props.setEditingEducation.specialization || "",
            university: this.props.setEditingEducation.university || "",
            marksSecured: this.props.setEditingEducation.marksSecured || "",
            yearOfPassing: this.props.setEditingEducation.yearOfPassing || "",
            marksType: this.props.setEditingEducation.marksType || "",
          }}
          onSubmit={(values, { resetForm }) => {
            debugger;
            console.log({
              ...values,
              // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
            });
            this.props.updateEducationDetails(
              {
                ...values,
                courseType: this.state.active,
                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
              },
              this.props.employeeId,
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
              ><div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                <FastField
                  name="educationTypeId"
                  type="text"
                 
                  selectType="educationType"
                  component={SearchSelect}
                    value={values.educationTypeId}
                    isColumnWithoutNoCreate
                  inlineLabel
                  className="field"
                  isColumn
                  style={{
                    flexBasis: "80%",
                    height: "2.0625em",
                    marginTop: "0.25em",
                  }}
                />
            
                <div class=" mt-3">
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                  <Field
                    isRequired
                    name="courseName"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                    }}
                  />
                </div>
               
                <div class=" mt-3">
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[8]}</div>
                  {/* <div class=" text-xs font-bold font-poppins text-black">Course Type</div> */}
                  <div class=" mt-3">
                    
                  <ButtonGroup>
                    <StatusIcon
                      color="blue"
                      type="Full Time"
                      iconType="fa-hourglass-start"
                      tooltip="Full Time"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Full Time")}
                    />

                    <StatusIcon
                      type="Part Time"
                      iconType="fa-hourglass-half"
                      tooltip="Part Time"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Part Time")}
                    />

                    <StatusIcon
                      type="Distance"
                      iconType="fa-hourglass"
                      tooltip="Distance"
                      status={this.state.active}
                      onClick={() => this.glassButtoClick("Distance")}
                      //  status={item.taskStatus}
                      //  onClick={() =>
                      //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                      //  }
                    />
                  </ButtonGroup>
                  </div>
                </div>
                <div class=" mt-3">
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                  <Field
                    isRequired
                    name="specialization"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                    }}
                  />
                </div>
                <div class=" mt-3">
                <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                  <Field
                    isRequired
                    name="university"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                    }}
                  />
                </div>
               
                <div class=" flex mt-3" >
                  <div class=" w-[50%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]}</div>
                    <Field
                      name="yearOfPassing"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      // value={values.yearOfPassing}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.4375em",
                      }}
                    />
                  </div>
               
                  <div class=" w-[49%] ml-2" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[5]}</div>
                    <Field
                      isRequired
                      
                      name="marksSecured"
                      type="text"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.4375em",
                      }}
                    />
                  </div>
                  <div class=" w-[60%] ml-2" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[6]}</div>
                    <Field
                      name="marksType"
                   
                      type="text"
                      component={SelectComponent}
                      options={["%", "Out of 10", "Out of 5"]}
                      isColumn
                    
                      width={"100%"}
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

              {/* <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />
                  <div class=" mt-3" />

                  <Field
                    name="documentTitle"
                    label="Name"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="documentDescription"
                    label="Description"
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" style={{ marginBottom: "0.9375em" }} />
                </div> */}
              {/* </div> */}
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingEducationDetails}
                >
                {this.state.translatedMenuItems[7]}  
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee,education }) => ({
  setEditingEducation: profile.setEditingEducation,
  // userId: auth.userDetails.userId,
  educations: education.educations,
  employeeId: employee.singleEmployee.employeeId,
  updatingEducationDetails: profile.updatingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateEducationDetails, getEducations}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEducationForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
