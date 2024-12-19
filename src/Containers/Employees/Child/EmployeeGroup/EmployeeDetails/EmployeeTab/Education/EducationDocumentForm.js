import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import ButtonGroup from "antd/lib/button/button-group";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { addEducationDetails,getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";
import { getEducations } from "../../../../../../Settings/Educations/EducationAction";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class EducationDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      translatedMenuItems: [],
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };
componentDidMount() {
  this.props.getLinkedUsersDocument(this.props.orgId);
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
      "76",//0Type
      "1195",//1Education"
      "1692",//2Course Name
      "1179",//3 Course Type
      "986",//4"Full Time
      "987",// part time5
      "1691",// Distance6
      "1180",// Specialization7
      "1690",// University/Institute8
      "1175",// year of Passing9
     "1178", // Marks Secured"10
      "1183",// Marks Type"11
      "138",// Document Id12
      "1181",// Name of Document13
     "1182", // Description of document14
     "154", // submit15
    ];

    const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
    this.setState({ translatedMenuItems: translations });
  } catch (error) {
    console.error('Error translating menu items:', error);
  }
};
  render() {
    const { addingEducationDetails } = this.props;
    const documentNameOption = this.props.linkedUserDocument.map((item) => {
      return {
          label: `${item.documentTypeName|| ""}`,
          value: item.documentTypeId,
      };
  });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            documentTypeId: this.props.documentTypeId,
            educationType: "",
            educationTypeId: this.props.educationTypeId,
            courseType: this.state.active,
            courseName: "",
            specialization: "",
            university: "",
            documentId: "",
            creationDate: "",
           departmentName: "",
           documentType: "",
           documentTypeName: "",
           id: "",
           marksSecured: 0,
           marksType: "",
           orgId: "",
           university: "",
           userId: "",
           yearOfPassing:0
         

          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addEducationDetails(
              {
                ...values,
                courseType: this.state.active,

                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
              },"employee",
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
                > <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[0]}</div>
                   <FastField
                    name="documentTypeId"
                    type="text"
                 
                    options={
                      Array.isArray(documentNameOption)
                        ? documentNameOption
                        : []
                    }
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                     />
              <div class=" mt-3">
              <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[1]}</div>
                  <FastField
                    name="educationTypeId"
                  
                    selectType="educationType"
                    component={SearchSelect}
                    value={values.educationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                    className="field"
                    isColumn
                      />
                      </div>
                      <div class=" mt-3">
                      <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[2]}</div>
                    <Field
                      isRequired
                      name="courseName"
                      type="text"
                      isColumn
                      width={"100%"}
                     
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" mt-3">
                  <div class="font-bold font-poppinsm-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  {this.state.translatedMenuItems[3]}</div>
                    <div class=" mt-3">
                    <ButtonGroup>
                      <StatusIcon
                        color="blue"
                        type="Full Time"
                        iconType="fa-hourglass-start"
                        tooltip= {this.state.translatedMenuItems[4]}
                        // "Full Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Full Time")}
                      />

                      <StatusIcon
                        type="Part Time"
                        iconType="fa-hourglass-half"
                        tooltip= {this.state.translatedMenuItems[5]}
                        // "Part Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Part Time")}
                      />

                      <StatusIcon
                        type="Distance"
                        iconType="fa-hourglass"
                        tooltip= {this.state.translatedMenuItems[6]}
                        // "Distance"
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
                  <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[7]}</div>
                    <Field
                      isRequired
                      name="specialization"
                      type="text"
                      isColumn
                      width={"100%"}
                     
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" mt-3">
                  <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[8]}</div>
                    <Field
                      isRequired
                      name="university"
                      type="text"
                      isColumn
                      width={"100%"}
                    
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                

                  <div class=" flex mt-3" >
                    <div class=" w-[50%]" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[9]}</div>
                      <Field
                        name="yearOfPassing"
                      
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        // value={values.yearOfPassing}
                        inlineLabel
                        />
                    </div>
                 
                    <div class=" w-[49%] ml-4" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[10]}</div>
                      <Field
                        isRequired
                       
                        name="marksSecured"
                        type="text"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                      />
                    </div>
                    <div class=" w-[60%] ml-4" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[11]}</div>
                      <Field
                        name="marksType"
                      
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
                >   <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[12]} ID</div>
                  <Field
                    name="documentId"
                    
                    isRequired
                    component={DragableUpload}
                  />
                <div class=" mt-3" >
                <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[13]}</div>
                  <Field
                    name="documentTitle"
                 
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    />
                   </div>
                   <div class=" mt-3" >
                   <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[14]}</div>
                  <Field
                    name="documentDescription"
                    
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                      />
                        </div>
                 
                </div>
              </div>
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEducationDetails}
                >
                  {this.state.translatedMenuItems[15]} 
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

const mapStateToProps = ({ employee,auth, profile,education }) => ({
  employeeId: employee.singleEmployee.employeeId,
  userId: auth.userDetails.userId,
  educations: education.educations,
  orgId: auth.userDetails.organizationId,
  linkedUserDocument:profile.linkedUserDocument,
  addingEducationDetails: profile.addingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addEducationDetails,
    getEducations, 
   getLinkedUsersDocument}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationDocumentForm);

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
