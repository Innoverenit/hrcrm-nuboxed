import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";

import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import {
  handleSupplierDocumentUploadModal,
  addSupplierDocument,
  getSupplierDocument,
} from "../../../../SuppliersAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({});

class AddSupplierDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "71",//0 type
        "110",//1 name
        "147",//2 description
          "154" // 3 submit
       
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
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
    const { handleSupplierDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleSupplierDocumentUploadModal(false)
    );
  };
  callback = () => {
    const {
      supplier,
      getSupplierDocument,
      handleSupplierDocumentUploadModal,
    } = this.props;
    getSupplierDocument(supplier.supplierId);
    handleSupplierDocumentUploadModal(false);
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
    console.log(this.state.data);
    const {
      opportunity,
      supplierDocumentUploadModal,
      handleSupplierDocumentUploadModal,
      addSupplierDocument,
      addingDocumentBySupplierId,
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
          // enableReinitialize
          initialValues={{
            documentTypeId: "",
            documentName: "", //input
            documentDescription: "",
            documentId: "",
            supplierId: this.props.supplierId,
            userId:this.props.userId,
            distributorId:this.props.distributorId,
            shipperId:this.props.shipperId
          }}
          //   validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addSupplierDocument(
              // values.documentId,
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
            <Form>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div class="h-[100%] w-[45%]"
                 
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
               
               
                  <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[0]}</div>
                  <Field
                    name="documentId"
                    selectType="documentTypeName"
                  
                    component={SearchSelect}
                    isColumn
                    margintop={"0.25em"}
                    value={values.documentId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                </div>
                <div class="h-[100%] w-[45%]"
                ><div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[1]}</div>
                  <Field
                    name="documentName"
                
                 
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" />
                  <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[2]}</div>
                  <Field
                    name="documentDescription"
              
                    //   label={
                    //     <FormattedMessage
                    //       id="app.documentDescription"
                    //       defaultMessage="Description"
                    //     />
                    //   }
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
                  Loading={addingDocumentBySupplierId}
                >
                  {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
                  <div class="font-bold font-poppins text-xs"> {this.state.translatedMenuItems[3]}</div>
                  {/* Submit */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ suppliers, auth }) => ({
  supplier: suppliers.supplier,
  supplierId: suppliers.supplierDetailById.supplierId,
  documentUploadModal: suppliers.documentUploadModal,
  addingDocumentBySupplierId: suppliers.addingDocumentBySupplierId,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,
  userId:auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSupplierDocumentUploadModal,
      addSupplierDocument,
      getSupplierDocument,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSupplierDocumentForm);
