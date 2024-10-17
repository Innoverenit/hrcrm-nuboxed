import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import { getDepartments } from "../../Containers/Settings/Department/DepartmentAction";
import {updateRepositoryDocument} from "../Auth/AuthAction"
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import DocumentUpload from "../../Components/Forms/Formik/DocumentUpload";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../Components/Forms/Formik/TextareaComponent";
import {getAssignedToList}  from "../Employees/EmployeeAction"
import * as Yup from "yup";
import {getDocuments} from "../Settings/Documents/DocumentsAction"
import DragableUpload from "../../Components/Forms/Formik/DragableUpload";
import LazySelect from "../../Components/Forms/Formik/LazySelect";

import { FormattedMessage } from "react-intl";
import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;

const { Option } = Select;

const documentSchema = Yup.object().shape({

documentId: Yup.string().required("Input needed!"),
});
class UpdateRepositoryDocumentForm extends Component {
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
      // label: `${item.salutation || ""} ${item.firstName ||
      //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
      value: item.employeeId,
    };
  });

 
  const { showUserList } = this.state;
    return (
      <>
       
         
            <Formik
              // enableReinitialize
              initialValues={{
              
                name: this.props.setEditingRepository.name, //input
                description: this.props.setEditingRepository.description,
                included:[] ,
                documentId:this.props.setEditingRepository.documentId||"",
                department:this.props.setEditingRepository.department||"",
                catagory:this.props.setEditingRepository.catagory||"",
                userId:this.props.userId,
                documentType: this.props.setEditingRepository.documentType||"",
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.updateRepositoryDocument(
                  // values.documentId,
                  {
                    ...values,
                    shareInd:this.state.showUserList,
                    // department:this.props.setEditingRepository.departmentId,
                  },
                  this.props.setEditingRepository.organizationDocumentLinkId,
                //   this.props.orgId,
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
                    // options={[
                    //   "Aadhar Card",
                    //   "Voter-Id Card",
                    //   "Driving-License",
                    //   "Pan Card",
                    //   "Passport",
                    // ]}
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
                            // isColumnWithoutNoCreate
                            //  selectType="sectorName"
                            label="Category"
                             
                            isColumn
                            //component={SearchSelect}
                            component={SelectComponent}
                            // value={values.sectorId}
                            options={
                              Array.isArray(catagoryOption) ? catagoryOption : []
                            }
                          />

<Field
                            // name="department"
                            name="department"
                            // isColumnWithoutNoCreate
                            //  selectType="sectorName"
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
                                        
                    </div>
                  </div>

                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                      type="primary"
                    Loading={this.props.updateRepositoryDocument}
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

const mapStateToProps = ({ document, settings,employee, departments,auth }) => ({
    // addingOrganizationDocument:auth.addingOrganizationDocument,
    departments: departments.departments,
    documents: document.documents,
    orgId: auth.userDetails.organizationId,
    assignedToList:employee.assignedToList,
    userId: auth.userDetails.userId,
    setEditingRepository:auth.setEditingRepository,
    updateRepositoryDocument:auth.updateRepositoryDocument

     
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDepartments,
        getDocuments,
        getAssignedToList,
        updateRepositoryDocument
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRepositoryDocumentForm);
