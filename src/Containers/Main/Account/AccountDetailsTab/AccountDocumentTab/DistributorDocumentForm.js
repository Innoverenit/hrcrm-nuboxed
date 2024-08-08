import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../../../Components/UI/Layout";

import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import {
  handleDistributorDocumentUploadModal,
  addDistributorDocument,
  getDistributorTable,
} from "../../AccountAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({});

class DistributorDocumentForm extends Component {
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
    const { handleDistributorDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleDistributorDocumentUploadModal(false)
    );
  };
  callback = () => {
    const {
      distributor,
      getDistributorTable,
      handleDistributorDocumentUploadModal,
    } = this.props;
    getDistributorTable(distributor.distributorId);
    handleDistributorDocumentUploadModal(false);
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

      handleDistributorDocumentUploadModal,
      addDistributorDocument,
      addingDocumentByDistributorId,
      documentContentType,
      documentType,
      documentTypeId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            documentTypeId: "",
            distributorId: this.props.distributorId,
            documentName: "", //input
            documentDescription: "",
            documentId: "",
            discription:"",
            documentTitle:"",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addDistributorDocument(
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
            <Form class="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  <Field
                    name="documentTypeId"
                    selectType="documentType"
                    label="Type"
                    component={SearchSelect}
                    isColumn
                    margintop={"0.25em"}
                    value={values.documentId}
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
                    label="Name"
                    width={"100%"}
                    isColumn
                    component={InputComponent}              
                  />                
                  <Field
                    name="discription"
                    label="Description"
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <div class=" mt-3" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingDocumentByDistributorId}
                >
                  Submit
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ distributor, auth }) => ({
  distributorId: distributor.distributorDetailsByDistributorId.distributorId,
  distributorDocumentUploadModal: distributor.distributorDocumentUploadModal,
  addingDocumentByDistributorId: distributor.addingDocumentByDistributorId,

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
      handleDistributorDocumentUploadModal,
      addDistributorDocument,
      getDistributorTable,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorDocumentForm);
