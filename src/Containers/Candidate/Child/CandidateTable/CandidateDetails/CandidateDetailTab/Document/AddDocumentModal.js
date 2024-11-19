import React, {  Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip,Select } from "antd";
import { Formik, Form, Field, } from "formik";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addCandidateDocument,
  getCandidateDocument,
} from "../../../../../CandidateAction";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";

import { getDocuments } from "../../../../../../../Containers/Settings/Documents/DocumentsAction";
import InputIcon from '@mui/icons-material/Input';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
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
      contract:false,
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
handleContract = (checked) => {
  this.setState({ contract: checked });
};
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
          title="Document"
          
          width="60%"
          visible={documentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{marginTop:"3rem"}}
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
                // contract: this.state.contract ? "true" : "false",
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
                    // contract: this.state.contract ? "true" : "false",
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
                  <div class=" flex justify-between"
                  >
                    <div class=" h-full w-[45%]"
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
               
                      <div class=" flex justify-between mt-4"
                  >
                      <div class=" w-[47%]" >
                     
                    
                      <div class=" text-xs font-bold font-poppins text-black">Type</div> 
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
                      <div class=" w-[47%]" >
                      <Field
                        name="documentTitle"
                        label="Name"
                      
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                       
                      />
                      </div>
                      </div>
                      <div class=" flex  mt-4">
                        <div class=" text-xs font-bold font-poppins text-black">Contract</div>
                        <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          onChange={this.handleContract}
                          checked={this.state.contract}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                      
                      {/* <div class=" text-xs font-bold font-poppins">Sharing</div> */}
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
                    <div class=" h-full w-[45%]"
                    >
                     <Field
                        name="documentDescription"
                         label="Description"
                       
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                        />

                      <div class=" flex mb-[0.9375em]">
                        {/* <div class=" text-xs font-bold font-poppins text-black">Share</div> */}
                        {/* <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          onChange={this.handleChange}
                          checked={this.state.documentshare}
                          checkedChildren="Public"
                          unCheckedChildren="Private"
                        /> */}
                      </div>
                      <div class=" mt-3" />
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with Opportunity Owner</p>
                      )}
                      <div class=" mt-3" />
                      {this.state.documentshare && (
                        <div class=" flex justify-between"                   
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
                                <div class=" w-[30%]"
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                  label="Function"
                                   
                                    isRequired
                                    isColumn
                                   // selectType="department"
                                    component={InputComponent}
                                  />
                                </div>
                                <div>
                                  <div class=" text-xs font-bold font-poppins text-black">
                                    Level
                                  
                                  </div>
                                  <div class=" flex justify-between mt-[0.25em]"
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
                                          <InputIcon type="right-square" />
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
                                          <VerticalAlignTopIcon type="VerticalAlignTopIcon" />
                                        </Button>
                                      </Tooltip>{" "}
                                    </ButtonGroup>
                                  </div>
                                </div>
                                <div class=" w-[43%]"
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
                        </div>
                      )}
                    </div>
                  </div>
                  <div class=" flex justify-end mt-4" >
                    <Button
                      htmlType="submit"
                      type="primary"
                      Loading={addingDocumentByCandidateId}
                    >
                      Submit
                     
                    </Button>
                  </div>
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
