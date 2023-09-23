import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Icon,Select } from "antd";
// import { RightSquareOutlined, ToTopOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FieldArray } from "formik";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addCandidateDocument,
  getCandidateDocument,
} from "../../../../../CandidateAction";
// import { getOppoStages, getLevels } from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import LazySelect from "../../../../../../../Components/Forms/Formik/LazySelect";
import { base_url } from "../../../../../../../Config/Auth";
import { FormattedMessage } from "react-intl";
import { getDocuments } from "../../../../../../../Containers/Settings/Documents/DocumentsAction";
import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";
const ButtonGroup = Button.Group;
const { Option } = Select;

const documentSchema = Yup.object().shape({
// documentName: Yup.string().required("This field is required !"),
documentId: Yup.string().required("Input needed !"),
// documentDescription: Yup.string().required("This field is required !"),
// stageId: Yup.string().required("This field is required !")
});
class AddDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
      selectedDocument:"",
      typeSharing:false,
    };
  }
  handleChangeDocument = (value) => {
    this.setState({ selectedDocument:value});
    console.log("555",value)
  }
  
handleTypeShare=(checked)=>{
  this.setState({ typeSharing:checked});
}
  componentDidMount(){
    this.props.getDocuments();
    const doclistsend = this.props.documents.map((item) => {
      return item.documentTypeId
    }); 
    this.setState(doclistsend)
  }
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
      handleDocumentUploadModal(false)
    );
  };
  callback = () => {
    const {
      candidate,
      getCandidateDocument,
      handleDocumentUploadModal,
    } = this.props;
    getCandidateDocument(candidate.candidateId);
    handleDocumentUploadModal(false);
  };
  //   componentDidMount() {
  //     this.props.getOppoStages();
  //     this.props.getLevels();
  //   }
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    const doclist=this.props.documents.map((item)=> {
      return {label:item.documentTypeName,
              value:item.documentTypeId,
      }
    })
    const {
      opportunity,
      documentUploadModal,
      handleDocumentUploadModal,
      addCandidateDocument,
      addingDocumentByCandidateId,
      oppoStages,
      documentTypeId,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;

  
    return (
      <>
        <StyledDrawer
          // title="Document"
          title={
            <FormattedMessage id="app.document" defaultMessage="Document" />
          }
          width="65vw"
          visible={documentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{marginTop:"5rem"}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.handleClose()}
          footer={null}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId:this.state.selectedDocument,
                // documentName: "", //input
                documentDescription: "",
                typeName:this.state.checked ? "true" : this.state.selectedDocument ? "false":"true",
                // levelType:
                //   this.state.approvalAbove === true ? "Above" : "Specific",
                // type:
                //   this.state.documentshare === true ? "Public" : "Confidential",
                // stageId: "",
                candidateId:this.props.candidate.candidateId,
                documentId:""
              }}
              validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                addCandidateDocument(
                  // values.documentId,
                  {
                    ...values,
                    documentTypeId:this.state.selectedDocument,
                    //   this.state.documentshare === true
                    //     ? "Public"
                    //     : "Confidential",
                    // levelType:
                    //   this.state.approvalAbove === true ? "Above" : "Specific",
                  },
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
                      <Spacer />
                      <FlexContainer justifyContent="space-between">
                      <div style={{width:"47%"}}>
                      {/* <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
                        isColumnWithoutNoCreate
                        // label="Types"
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }
                        // isRequired
                        component={SearchSelect}
                        isColumn
                        value={values.documentId}
                        // defaultValue={{ label: firstName, value: documentId }}
                        inlineLabel
                        
                      /> */}
                      <StyledLabel>Type</StyledLabel> 
                      <Select
                        name="documentTypeId"
                        style={{ width: '100%' }}
                        placeholder="Select"
                        // defaultValue={partners}
                        onChange={this.handleChangeDocument}
                      >
  
                        {doclist.map((item, i) => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          )
                        })}
                      </Select> 
                      </div>
                      <div style={{width:"47%"}}>
                      <Field
                        name="documentTitle"
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                       
                      />
                      </div>
                      </FlexContainer>
                      
                      {/* <StyledLabel >Sharing</StyledLabel> */}
                      {this.state.selectedDocument==="DCTP11891528829122022" && (                     
                  <Switch                                              
                  checked={this.state.typeSharing}
                  onChange={this.handleTypeShare}
                   // disabled={this.state.availability}
                   checkedChildren="Yes"
                   unCheckedChildren="No"
                    />
                      )}
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                     <Field
                        name="documentDescription"
                        // label="Description"
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
                        />
                      <Spacer style={{ marginBottom: "0.9375em" }} />

                      <FlexContainer>
                        {/* <StyledLabel>Share</StyledLabel> */}
                        {/* <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          onChange={this.handleChange}
                          checked={this.state.documentshare}
                          checkedChildren="Public"
                          unCheckedChildren="Private"
                        /> */}
                      </FlexContainer>
                      <Spacer />
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with Opportunity Owner</p>
                      )}
                      <Spacer />
                      {this.state.documentshare && (
                        <FlexContainer
                          justifyContent="space-between"                        
                        >
                          {/* {organization &&
                            organization.subscriptionType ===
                            "FREE" && (
                              <div style={{ marginTop: "6%" }}>
                              </div>
                            )} */}
                          {/* {organization &&
                            organization.subscriptionType !==
                            "FREE" && (
                              <Tooltip
                                title={
                                  organization.subscriptionType !==
                                    "FREE"
                                    ? "Upgrade to Professional+ for multiple sharing "
                                    : ""
                                }
                              >
                                <div style={{ marginTop: "6%" }}>
                                </div>
                              </Tooltip>
                            )} */}
                          {this.state.data.map(() => {
                            return (
                              <>
                                <div
                                  style={{
                                    width: "30%",
                                   
                                  }}
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    //label="Function"
                                    label={
                                      <FormattedMessage
                                        id="app.department"
                                        defaultMessage="Function"
                                      />
                                    }
                                    isRequired
                                    isColumn
                                   // selectType="department"
                                    component={InputComponent}
                                  />
                                </div>
                                <div>
                                  <StyledLabel>
                                    <FormattedMessage
                                      id="app.level"
                                      defaultMessage="Level"
                                    />
                                    ,{/* Level */}
                                  </StyledLabel>
                                  <FlexContainer
                                    justifyContent="space-between"
                                    style={{ marginTop: "0.25em" }}
                                  >
                                    <ButtonGroup>
                                      <Tooltip title="Specific">
                                        <Button
                                          onClick={() =>
                                            this.handleAboveChange("Specific")
                                          }
                                          style={{
                                            fontSize: "1.125em",
                                            cursor: "pointer",
                                            padding: "0em 0.4375em",
                                            backgroundColor:
                                              this.state.selectedownerAbove ===
                                              "Specific"
                                                ? "Orange"
                                                : null,
                                            color:
                                              this.state.selectedownerAbove ===
                                              "Specific"
                                                ? "white"
                                                : "rgba(0, 0, 0, 0.65)",
                                          }}
                                        >
                                          <RightSquareOutlined type="right-square" />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip title="Above">
                                        <Button
                                          onClick={() =>
                                            this.handleAboveChange("Above")
                                          }
                                          style={{
                                            fontSize: "1.125em",
                                            padding: "0em 0.4375em",
                                            cursor: "pointer",
                                            backgroundColor:
                                              this.state.selectedownerAbove ===
                                              "Above"
                                                ? "Orange"
                                                : null,
                                            color:
                                              this.state.selectedownerAbove ===
                                              "Above"
                                                ? "white"
                                                : "rgba(0, 0, 0, 0.65)",
                                          }}
                                        >
                                          <ToTopOutlined type="ToTopOutlined" />
                                        </Button>
                                      </Tooltip>{" "}
                                    </ButtonGroup>
                                  </FlexContainer>
                                </div>
                                <div
                                  style={{
                                    width: "43%",
                                    }}
                                >
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    component={InputComponent}
                                    inlineLabel
                                   />
                                </div>
                              </>
                            );
                          })}
                        </FlexContainer>
                      )}
                    </div>
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                      Loading={addingDocumentByCandidateId}
                    >
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
                      {/* Submit */}
                    </Button>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ candidate,document,settings, auth }) => ({
  candidate: candidate.candidate,
  documentUploadModal: candidate.documentUploadModal,
  addingDocumentBycandidateId: candidate.addingDocumentBycandidateId,
  documents: document.documents,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      addCandidateDocument,
        getCandidateDocument,
        getDocuments,
      //   getLevels,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
