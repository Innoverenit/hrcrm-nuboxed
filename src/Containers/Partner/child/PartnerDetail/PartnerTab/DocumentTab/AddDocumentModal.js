import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip, Icon } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addPartnerDocument,
  getPartnerDocument,
} from "../../../../PartnerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { RightSquareOutlined, ToTopOutlined } from "@ant-design/icons";

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
      partner,
      getPartnerDocument,
      handleDocumentUploadModal,
    } = this.props;
    getPartnerDocument(partner.partnerId);
    handleDocumentUploadModal(false);
  };
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    console.log(this.props.partner.partnerId);
    const {
      partner,
      documentUploadModal,
      handleDocumentUploadModal,
      addPartnerDocument,
      addingDocumentBypartnerId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;

    return (
      <>
        <StyledDrawer
          // title="Document"
          title={<FormattedMessage id="app.documents" defaultMessage="Documents" />}
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
                partnerId: this.props.partner.partnerId,
                documentTitle: "", //input
                documentDescription: "",
                documentId: "",
              }}
               validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                addPartnerDocument(
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
                        // label="Name"
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
                      <div class=" mt-3" />
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
                      <div class=" mt-3" style={{ marginBottom: "15px" }} />

                      <FlexContainer>
                        {/* <div class=" text-xs font-bold font-poppins text-black"> */}
                          {/* Share */}
                          {/* <FormattedMessage id="app.share" defaultMessage="Share" /> */}
                          {/* </div> */}
                        {/* <Switch
                          style={{ width: "100px", marginLeft: "10px" }}
                          onChange={this.handleChange}
                          checked={this.state.documentshare}
                          checkedChildren="Public"
                          unCheckedChildren="Private"
                        /> */}
                      </FlexContainer>
                      <div class=" mt-3" />
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with partner Owner</p>
                      )}
                      <div class=" mt-3" />
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
                                  style={{ width: "30%", marginRight: "10px" }}
                                >
                                  <Field
                                    inlineLabel
                                    name="department"
                                    // label="Function"
                                    label={
                                      <FormattedMessage
                                        id="app.function"
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
                                  <div class=" text-xs font-bold font-poppins text-black">
                                    {/* Level */}
                                    <FormattedMessage id="app.level" defaultMessage="Level" />
                                    </div>
                                  <FlexContainer
                                    justifyContent="space-between"
                                    >
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
                                  </FlexContainer>
                                </div>
                                <div style={{ width: "43%", marginTop: "3px" }}>
                                  <Field
                                    isRequired
                                    name="level"
                                    isColumn
                                    selectType="level"
                                    component={InputComponent}
                                    inlineLabel
                                    marginTop={"4px"}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </FlexContainer>
                      )}
                    </div>
                  </div>

                  <div class=" mt-3" />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                      Loading={addingDocumentBypartnerId}
                    >
                      {/* Submit */}
                      <FormattedMessage id="app.submit" defaultMessage="Submit" />
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

const mapStateToProps = ({ partner, settings, auth }) => ({
  partner: partner.partner,
  documentUploadModal: partner.documentUploadModal,
  addingDocumentBypartnerId: partner.addingDocumentBypartnerId,
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
      addPartnerDocument,
      getPartnerDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
