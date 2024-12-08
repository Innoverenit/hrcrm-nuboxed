import React, {  Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addCandidateDocument,
  getCandidateDocument,
} from "../../../../../../Candidate/CandidateAction";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import InputIcon from '@mui/icons-material/Input';

const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
documentId: Yup.string().required("Input needed !"),

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
    };
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

  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    console.log(this.props.candidate.candidateId);
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
        <StyledModal
          title="Document" 
          width="65vw"
          visible={documentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{ top: 40 }}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={() => this.handleClose()}
          footer={null}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                documentName: "", //input
                documentDescription: "",
               
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
                    // type:
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
                      <div class=" mt-3" />
                      <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
                        isColumnWithoutNoCreate
                        label="Types"
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
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="documentTitle"
                        label="Name"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        style={{ height: "2em", marginTop: "0.25em" }}
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

                      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                    
                      </div>
                      <div class=" mt-3" />
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with Opportunity Owner</p>
                      )}
                      <div class=" mt-3" />
                      {this.state.documentshare && (
                        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-full mb-[8%] ">
                                          
                          {this.state.data.map(() => {
                            return (
                              <>
                                <div
                                  style={{
                                    width: "30%",
                                    marginRight: "0.625em",
                                  }}
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    label="Function"
                                    isRequired
                                    isColumn
                                    margintop={"0.25em"}
                                    style={{
                                      flexBasis: "80%",
                                      width: "0.625em",
                                    }}
                                    // selectType="department"
                                    component={InputComponent}
                                  />
                                </div>
                                <div>
                                  <div class=" text-xs font-bold font-poppins text-black">
                                   Level
                                  </div>
                                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto mt-[0.25rem] ">
                                
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
                                <div
                                  style={{
                                    width: "43%",
                                    marginTop: "0.1875em",
                                  }}
                                >
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    component={InputComponent}
                                    inlineLabel
                                    marginTop={"0.25em"}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
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
        </StyledModal>
      </>
    );
  }
}


const mapStateToProps = ({ candidate, settings, auth }) => ({
  candidate: candidate.candidate,
  documentUploadModal: candidate.documentUploadModal,
  addingDocumentBycandidateId: candidate.addingDocumentBycandidateId,

  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      addCandidateDocument,
        getCandidateDocument,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
