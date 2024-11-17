import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import { getDepartments } from "../../Containers/Settings/Department/DepartmentAction";
import {addOrganizationDocument} from "../Auth/AuthAction"
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../Components/Forms/Formik/TextareaComponent";
import {getAssignedToList}  from "../Employees/EmployeeAction"
import * as Yup from "yup";
import {getDocuments} from "../Settings/Documents/DocumentsAction"
import DragableUpload from "../../Components/Forms/Formik/DragableUpload";


import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;

const { Option } = Select;

const documentSchema = Yup.object().shape({

documentId: Yup.string().required("Input needed!"),
});
class AddOrgDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      showUserList: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
  handleSwitchChange = checked => {
    this.setState({ showUserList: checked });
  };
  handleButtonClick = () => {
    console.log(length);
    let length = this.state.data.length;
    this.setState({ data: [...this.state.data, length + 1] });
  };

  handleChange = (checked) => {
    this.setState({
      documentshare: checked,
    });
    console.log(this.state.documentshare);
  };
  handleAboveChange = (data) => {
    debugger;
    this.setState({ ownerAbove: data });
    this.setState({ selectedownerAbove: data });
  };
  handleClose = () => {
    //debugger
    const { handleDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
    //   handleDocumentUploadModal(false)
    );
  };

  componentDidMount() {
   this.props.getDocuments();
    this.props.getDepartments();
    this.props.getAssignedToList(this.props.orgId)
  }

  render() {
   
    const documentNameOption = this.props.documents.map((item) => {
      return {
          label: `${item.documentTypeName|| ""}`,
          value: item.documentTypeId,
      };
  });
   const catagory=[
    {
      id:1,
      name:"Document"  
    },
    {
        id:2,
        name:"Spreadsheet"  
      },
      {
        id:3,
        name:"Presentation"  
      },
      {
        id:4,
        name:"Image"  
      },
   ]


   const catagoryOption = catagory.map((item) => {
    return {
      label: item.name || "",
      value: item.name,
    };
  });

  const departmentOption = this.props.departments.map((item) => {
    return {
      label: item.departmentName || "",
      value: item.departmentId,
    };
  });

  const employeesData =this.props.assignedToList.map((item) => {
    return {
      label: `${item.empName}`,
    
      value: item.employeeId,
    };
  });

 
  const { showUserList } = this.state;
    return (
      <>
       
         
            <Formik
              // enableReinitialize
              initialValues={{
              
                name: "", //input
                description: "",
                included: [],
                documentId:"",
                department:"",
                catagory:"",
                userId:this.props.userId,
                documentType: "",
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addOrganizationDocument(
                  // values.documentId,
                  {
                    ...values,
                    shareInd:this.state.showUserList,
                  },
                  this.props.orgId,
                  this.callback
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <div class=" mt-3" />
                      <Field
                    name="documentType"
                    type="text"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                    
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
                  <div class=" mt-3" />
                        <Field
                        name="description"
                        //label="Description"
                        label={
                          <FormattedMessage
                            id="app.documentDescription"
                            defaultMessage="Description"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                        style={{ height: "5em"}}
                      />
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="name"
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.documentName"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        style={{ height: "2em",  }}
                      />
                      <div class=" mt-3" />
                      <Field
                            // name="department"
                            name="catagory"
                       
                            label="Category"
                             
                            isColumn
                      
                            component={SelectComponent}
                      
                            options={
                              Array.isArray(catagoryOption) ? catagoryOption : []
                            }
                          />

<Field                
                            name="department"                       
                            label="Department"                             
                            isColumn
                            //component={SearchSelect}
                            component={SelectComponent}
                            // value={values.sectorId}
                            options={
                              Array.isArray(departmentOption) ? departmentOption : []
                            }
                          />
                      <div class=" mt-3" style={{ marginBottom: "0.9375em" }} />

                      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                        <div class=" text-xs font-bold font-poppins text-black">Share</div>
                        <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          checked={showUserList}
                          onChange={this.handleSwitchChange}
                
                          checkedChildren="Public"
                          unCheckedChildren="Private"
                        />
                      </div>
                      {!showUserList && (
          <div class="mt-1">
          <Field
            name="included"
            // label="Include"
            label={
              <FormattedMessage
                id="app.include"
                defaultMessage="include"
              />
            }
            mode
            placeholder="Select"
            component={SelectComponent}
            options={Array.isArray(employeesData) ? employeesData : []}
            value={values.included}
            // defaultValue={{
            //   label: `${empName || ""} `,
            //   value: employeeId,
            // }}
          />
         </div>
        )}

                     
                    </div>
                  </div>

                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
                     Loading={this.props.addingOrganizationDocument}
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
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ document, settings,employee, departments,auth }) => ({
    addingOrganizationDocument:auth.addingOrganizationDocument,
    departments: departments.departments,
    documents: document.documents,
    orgId: auth.userDetails.organizationId,
    assignedToList:employee.assignedToList,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addOrganizationDocument,
        getDepartments,
        getDocuments,
        getAssignedToList
    //   handleDocumentUploadModal,
    //   addOpportunityDocument,
    //   getOpportunityDocument,
      //   getOppoStages,
      //   getLevels,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddOrgDocumentForm);
