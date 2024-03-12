import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addCustomerDocument,
  getCustomerDocument,
} from "../../../../CustomerAction";
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
      contract:false,
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
  handleContract = (checked) => {
    this.setState({ contract: checked });
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
    const { handleDocumentUploadModal } = this.props;
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleDocumentUploadModal(false)
    );
  };
  callback = () => {
    const { customer, getCustomerDocument, handleDocumentUploadModal } =
      this.props;
    getCustomerDocument(customer.customerId);
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
      customer,
      documentUploadModal,
      handleDocumentUploadModal,
      addCustomerDocument,
      addingDocumentByCustomerId,
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
          visible={documentUploadModal}
          onClose={() => this.handleClose()}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                documentTitle: "",
                documentDescription: "",
                contract: this.state.contract ? "true" : "false",
                documentId: "",
                customerId: this.props.customer.customerId,
              }}
              validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                addCustomerDocument(
                  {
                    ...values,
                    contract: this.state.contract ? "true" : "false",
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
                    <div class=" mt-3">
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
                        component={SearchSelect}
                        isColumn
                        value={values.documentId}
                        inlineLabel
                      />
                      </div>
                            <div class=" flex  mt-4">
                            <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Contract</div>
                        <Switch
                          style={{ width: "6.25em", marginLeft: "0.625em" }}
                          onChange={this.handleContract}
                          checked={this.state.contract}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
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
                     <div class=" mt-3">
                      <Field
                        name="documentDescription"
                        //label="Description"
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
 </div>
                      <div>
                      </div>
                      <div class=" mt-3">
                      {!this.state.documentshare && this.props.testShow && (
                        <p>Will be shared with customer Owner</p>
                      )}
                       </div>
                       <div class=" mt-3">
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
                                <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                                    {" "}
                                    <FormattedMessage
                                      id="app.level"
                                      defaultMessage="Level"
                                    />
                                    ,{/* Level */}
                                  </div>
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
                  </div>

                 
                  <div class=" flex justify-end mt-3">
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={addingDocumentByCustomerId}
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

const mapStateToProps = ({ customer, settings, auth }) => ({
  customer: customer.customer,
  documentUploadModal: customer.documentUploadModal,
  addingDocumentByCustomerId: customer.addingDocumentByCustomerId,
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
      addCustomerDocument,
      getCustomerDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
