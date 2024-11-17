import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  Tooltip,  } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import {
  
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { updateCandidateEducationDetails } from "../../../../../CandidateAction";

import { getEducations } from "../../../../../../Settings/Educations/EducationAction";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";

function onChange(date) { }

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateCandidateEducationForm extends Component {
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
    const { updatingCandidateEducationDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            candidateId: this.props.candidateId,
            id: this.props.setEditingCandidateEducation.id,
            educationTypeId:
              this.props.setEditingCandidateEducation.educationTypeId || "",
            courseType:
              this.props.setEditingCandidateEducation.courseType || "",
            courseName:
              this.props.setEditingCandidateEducation.courseName || "",
            specialization:
              this.props.setEditingCandidateEducation.specialization || "",
            university:
              this.props.setEditingCandidateEducation.university || "",
            marksSecured:
              this.props.setEditingCandidateEducation.marksSecured || "",
            yearOfPassing:
              this.props.setEditingCandidateEducation.yearOfPassing || "",
            marksType: this.props.setEditingCandidateEducation.marksType || "",
          }}
          onSubmit={(values, { resetForm }) => {
            debugger;
            console.log({
              ...values,
              // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
            });
            this.props.updateCandidateEducationDetails(
              {
                ...values,
                courseType: this.state.active,
                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
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
                <FastField
                  name="educationTypeId"
                  type="text"
                  label="Education"
                  
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
                <div class=" w-[47%]"
              >                 
                  <Field
                    isRequired
                    name="courseName"
                    type="text"
                    isColumn
                    width={"100%"}
                   label="Course Name"
                   
                    component={InputComponent}
                    inlineLabel
                   
                  />
                  </div>
                </div>
                
               
       
                <div class="flex justify-between mt-4"
              >
              <div class=" w-[47%]"
              >
                  <div class=" text-xs font-bold font-poppins text-black">Course Type</div>
                <div class=" mt-4">
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
         
                <div class=" w-[47%] mt-4"
              >
                  <Field
                    isRequired
                    name="specialization"
                    type="text"
                    isColumn
                    width={"100%"}
                    label="Specialization"
                   
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
                </div>
              
                <div class=" mt-4">
                  <Field
                    // isRequired
                    name="university"
                    type="text"
                    isColumn
                    width={"100%"}
                  label="University/Institute "
                  
                    component={InputComponent}
                    inlineLabel
                  />
                </div>

                <div class=" flex mt-4" >
                <div class=" w-[47%]"
              >
                    <Field
                      name="yearOfPassing"
                    label="Year of Passing"
                     
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      // value={values.yearOfPassing}
                      inlineLabel
                      />
                  </div>
                  &nbsp;&nbsp;
                 
                  <div class=" w-[47%]"
              >
                    <Field
                      // isRequired
                     label="Marks Secured"
                      
                      name="marksSecured"
                      type="text"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      />
                  </div>
                  &nbsp;&nbsp;
                  <div class=" w-[47%]"
              >
                    <Field
                      name="marksType"
                      label="Marks Type"
                       
                      type="text"
                      component={SelectComponent}
                      options={["%", "Out of 10", "Out of 5"]}
                      isColumn
                   
                      width={"100%"}
                      />
                  </div>
                </div>

              </div>

              <div class=" w-[45%]"
              >
                
             
             
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
                      selectType="documentTypeName"
                      isColumnWithoutNoCreate
                      label="Type"
                    
                      // isRequired
                      component={SearchSelect}
                      isColumn
                      // margintop={"0.25em"}
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
                Loading={updatingCandidateEducationDetails}
              >
               Update
              </Button>
            </div>
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

const mapStateToProps = ({ candidate, employee,education }) => ({
  setEditingCandidateEducation: candidate.setEditingCandidateEducation,
  // userId: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
  updatingEducationDetails: candidate.updatingEducationDetails,
  educations: education.educations,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateCandidateEducationDetails,getEducations }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateEducationForm);

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
