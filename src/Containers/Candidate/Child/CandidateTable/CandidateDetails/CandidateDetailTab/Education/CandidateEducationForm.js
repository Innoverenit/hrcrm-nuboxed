import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Icon } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { addCandidateEducationDetails } from "../../../../../CandidateAction";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { getEducations } from "../../../../../../Settings/Educations/EducationAction";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  // documentId: Yup.string().required("Input needed !"),
  courseName: Yup.string().required("Input needed !"),
  specialization: Yup.string().required("Input needed !"),
  specialization: Yup.string().required("Input needed !"),
  educationTypeId: Yup.string().required("Input needed !"),
});
class CandidateEducationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  render() {
    const { addingCandidateEducationDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            // employeeId: this.props.employeeId,
            candidateId: this.props.candidateId,

            // educationType: "",
            educationTypeId: this.props.educationTypeId,
            courseType: this.state.active,
            courseName: "",
            specialization: "",
            university: "",
            marksSecured: "",
            yearOfPassing: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addCandidateEducationDetails(
              {
                ...values,
                courseType: this.state.active,

                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
              },
              this.props.candidateId,
              // values.documentId,
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
              <div
                style={{
                  display: "flex",
                   width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    }}
                >
              <FlexContainer justifyContent="space-between">
                <div style={{width:"47%"}}>
                  <FastField
                    name="educationTypeId"
                    type="text"
                    //label="Education"
                    label={
                      <FormattedMessage
                        id="app.education"
                        defaultMessage="Education"
                      />
                    }
                    // options={[
                    //   "Matriculation",
                    //   "Intermediate",
                    //   "Graduation",
                    //   "Post-Graduation",
                    //   "Others",
                    // ]}
                    isColumnWithoutNoCreate
                    component={SearchSelect}
                    value={values.educationTypeId}
                    selectType="educationType"
                    inlineLabel
                    isRequired
                    className="field"
                    isColumn
                   
                  />
                  </div>
                  <div style={{width:"47%"}}>                  
                    <Field
                      isRequired
                      name="courseName"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Course Name"
                      label={
                        <FormattedMessage
                          id="app.courseName"
                          defaultMessage="Course Name"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                     
                    />
                    </div>
                  </FlexContainer>
                  
                 
                  <Spacer />

                <FlexContainer justifyContent="space-between">
                <div style={{width:"47%"}}>
                    <StyledLabel>Course Type</StyledLabel>
                    <Spacer />
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
                  <Spacer />
                  <div style={{width:"47%"}}>
                    <Field
                      isRequired
                      name="specialization"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Specialization"
                      label={
                        <FormattedMessage
                          id="app.Specialization"
                          defaultMessage="Specialization"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  </FlexContainer>
                  <Spacer />
                  <div>
                    <Field
                      // isRequired
                      name="university"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="University/Institute "
                      label={
                        <FormattedMessage
                          id="app.university"
                          defaultMessage="University/Institute"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
                  <Spacer />

                  <div style={{ display: "flex" }}>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="yearOfPassing"
                        //label="Year of Passing"
                        label={
                          <FormattedMessage
                            id="app.yearOfPassing"
                            defaultMessage="Year of Passing"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        // value={values.yearOfPassing}
                        inlineLabel
                        />
                    </div>
                    &nbsp;&nbsp;
                   
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        //label="Marks Secured"
                        label={
                          <FormattedMessage
                            id="app.marksSecured"
                            defaultMessage="Marks Secured"
                          />
                        }
                        name="marksSecured"
                        type="text"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        />
                    </div>
                    &nbsp;&nbsp;
                    <div style={{ width: "47%",  }}>
                      <Field
                        name="marksType"
                        label={
                          <FormattedMessage
                            id="app.marksType"
                            defaultMessage="Marks Type"
                          />
                        }
                        type="text"
                        component={SelectComponent}
                        options={["%", "Out of 10", "Out of 5"]}
                        isColumn
                     
                        width={"100%"}
                        />
                    </div>
                  </div>

                  <Spacer />
                </div>

                <div
                  style={{
                    width: "45%",
                    }}
                >
                  
                  <Field
                    name="documentId"
                    label={
                      <FormattedMessage
                        id="app.documentId"
                        defaultMessage="Document Id"
                      />
                    }
                    // isRequired
                    component={DragableUpload}
                  />
                  <Spacer />
                <FlexContainer justifyContent="space-between">
                <div style={{width:"47%"}}>
                  <Field
                    name="documentTitle"
                    //label="Name of Document"
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
                 <div style={{width:"47%"}}>
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
                        // margintop={"0.25em"}
                        value={values.documentId}
                        // defaultValue={{ label: firstName, value: documentId }}
                        inlineLabel
                         />
                         </div>
                         </FlexContainer>
                      <Spacer/>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingCandidateEducationDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ candidate,education }) => ({
  candidateId: candidate.candidate.candidateId,
  addingCandidateEducationDetails: candidate.addingCandidateEducationDetails,
  educations: education.educations,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addCandidateEducationDetails,getEducations }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEducationForm);

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
