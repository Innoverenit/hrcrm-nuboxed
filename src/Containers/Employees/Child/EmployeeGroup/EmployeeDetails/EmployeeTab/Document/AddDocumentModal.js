import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
} from "../../../../../EmployeeAction";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import {addOpportunityDocument} from "../../../../../../Opportunity/OpportunityAction"
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
      opportunity,
      getOpportunityDocument,
      handleDocumentUploadModal,
    } = this.props;
    handleDocumentUploadModal(false);
  };
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    const {
      opportunity,
      documentUploadModal,
      handleDocumentUploadModal,
      addOpportunityDocument,
      adddingDocumentByOpportunityId,
      oppoStages,
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
                documentTypeId: "",
                documentName: "", //input
                documentDescription: "",
                employeeId: this.props.employeeId,
                documentId: ""
              }}
              validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                addOpportunityDocument(
                  values.documentId,

                  {
                    ...values,
                    type:
                      this.state.documentshare === true
                        ? "Public"
                        : "Confidential",
                    levelType:
                      this.state.approvalAbove === true ? "Above" : "Specific",
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
                      <mt-3 />
                      <mt-3 />
                      <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
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
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.documentTitle"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        style={{ height: "2em"}}
                      />
                      <mt-3 />
                      <Field
                        name="documentDescription"
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
                      <mt-3 style={{ marginBottom: "0.9375em" }} />

                      {/* <FlexContainer>
                        <StyledLabel>Share</StyledLabel>
                        <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          onChange={this.handleChange}
                          checked={this.state.documentshare}
                          checkedChildren="Public"
                          unCheckedChildren="Private"
                        />
                      </FlexContainer> */}
                      {/* <mt-3 /> */}
                      {/* {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with Opportunity Owner</p>
                      )}
                      <mt-3 />
                      {this.state.documentshare && (
                        <FlexContainer
                          justifyContent="space-between"
                          style={{ width: "100%", marginBottom: "8%" }}
                        >
                          {organization &&
                            organization.subscriptionType ===
                            "FREE" && (
                              <div style={{ marginTop: "6%" }}>
                              </div>
                            )}
                          {organization &&
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
                            )}
                          {this.state.data.map(() => {
                            return (
                              <>
                                <div
                                  style={{ width: "46%", marginRight: "0.625em" }}
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    label="Function"
                                    isRequired
                                    isColumn
                                    margintop={"0.25em"}
                                    style={{ flexBasis: "80%" }}
                                    // selectType="department"
                                    // component={SearchSelect}
                                  />
                                </div>
                                <div>
                                  <StyledLabel>Level</StyledLabel>
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
                                          <Icon type="right-square" />
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
                                         <Icon type="ToTopOutlined" />
                                        </Button>
                                      </Tooltip>{" "}
                                    </ButtonGroup>
                                  </FlexContainer>
                                </div>
                                <div style={{ width: "22%", marginTop: "0.1875em" }}>
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    // component={SearchSelect}
                                    inlineLabel
                                    marginTop={"0.25em"}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </FlexContainer>
                      )} */}
                    </div>
                  </div>

                  <mt-3 />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                    //   Loading={addingDocumentByOpportunityId}
                    >
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
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

const mapStateToProps = ({ opportunity, settings, auth, employee }) => ({
  //   opportunity: opportunity.opportunity,
  //   oppoStages: settings.oppoStages,
  //   documentUploadModal: opportunity.documentUploadModal,
  //   adddingDocumentByOpportunityId: opportunity.adddingDocumentByOpportunityId,
  //   department: auth.userDetails.department,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,
  employeeId: employee.singleEmployee.employeeId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
        addOpportunityDocument,
      //   getOpportunityDocument,
      //   getOppoStages,
      //   getLevels,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
