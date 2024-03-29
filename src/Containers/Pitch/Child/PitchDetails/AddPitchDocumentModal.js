import React, {  Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
    addPitchDocument,
} from "../../PitchAction";
import DragableUpload from "../../../../Components/Forms/Formik/DragableUpload";
import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";
import { BundleLoader } from "../../../../Components/Placeholder";

const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
documentId: Yup.string().required("Input needed !"),

});
class AddPitchDocumentModal extends Component {
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
    const { handlePitchDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handlePitchDocumentUploadModal(false)
    );
  };
  callback = () => {
    const {
      lead,
      getLeadsDocument,
      handleLeadsDocumentUploadModal,
    } = this.props;
    // getLeadsDocument(lead.leadsId);
    this.props.handlePitchDocumentUploadModal(false);
  };

  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    const {
      customer,
      leadsDocumentUploadModal,
      handleLeadsDocumentUploadModal,
      addLeadsDocument,
      addingDocumentByLeadsId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;

    return (
      <>
        <StyledDrawer
          title={
            <FormattedMessage id="app.document" defaultMessage="Document" />
          }
          width="60%"
          visible={this.props.pitchDocumentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{ marginTop:"3rem" }}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.handleClose()}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                documentTitle: '',
                documentDescription: "",
                documentId: "",
                investorleadsId: this.props.pitch.investorLeadsId,
              }}
               validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addPitchDocument(
                  {
                    ...values,
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
                 <div class=" flex justify-between ">
                    <div class=" h-full w-2/4">
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <Spacer />
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
                        component={SearchSelect}
                        isColumn
                         value={values.documentId}
                        inlineLabel
                        />
                    </div>
                    <div class=" h-full w-2/5">
                      <Field
                        name="documentTitle"
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
                      <Spacer />
                      <Field
                        name="documentDescription"
                        label={
                          <FormattedMessage
                            id="app.description"
                            defaultMessage="Description"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                        />
                    
                      <Spacer />
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with customer Owner</p>
                      )}
                      <Spacer />
                      {this.state.documentshare && (
                     <div class=" flex justify-between w-full ">
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
                                 <div class=" w-1/3 mr-2">
                                  <Field
                                    inlineLabel
                                    name="department"
                                    label={
                                      <FormattedMessage
                                        id="app.function"
                                        defaultMessage="Function"
                                      />
                                    }
                                    isRequired
                                    isColumn
                                    component={InputComponent}
                                  />
                                </div>
                                <div>
                                  <StyledLabel>
                                    {" "}
                                    <FormattedMessage
                                      id="app.level"
                                      defaultMessage="Level"
                                    />
                                    ,{/* Level */}
                                  </StyledLabel>
                                  <div class=" flex justify-between">
                                    <ButtonGroup>
                                      <Tooltip title="Specific">
                                        <Button
                                          onClick={() =>
                                            this.handleAboveChange("Specific")
                                          }
                                          style={{
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            padding: "0px 7px",
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
                                            fontSize: "18px",
                                            padding: "0px 7px",
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
                                  </div>
                                </div>
                                <div class=" w-5/12">
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

                  <Spacer />
                  <div class=" flex justify-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                      Loading={this.props.addingDocumentByPitchId}
                    >
                      {/* Submit */}
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
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


const mapStateToProps = ({ leads, settings, pitch,auth }) => ({
  lead: leads.lead,
  leadsDocumentUploadModal: leads.leadsDocumentUploadModal,
  addingDocumentByPitchId: pitch.addingDocumentByPitchId,
  
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
        addPitchDocument
    //      handleLeadsDocumentUploadModal,
    //   addLeadsDocument,
    //   getLeadsDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddPitchDocumentModal);
