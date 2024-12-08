import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import {
  handleShipperDocumentUploadModal,
  addShipperDocument,
  getShipperDocument,
} from "../../../ShipperAction";

import * as Yup from "yup";

const FormSchema = Yup.object().shape({});

class ShipperDocumentForm extends Component {
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
       
       "71",//Type 0
       "110",// "Name id" 1
       "147",// "Description" 2
       "154",  //Submit 3
   "887",//Shipper 4
       
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
    const { handleShipperDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleShipperDocumentUploadModal(false)
    );
  };
  callback = () => {
    const {
      shipper,
      getShipperDocument,
      handleShipperDocumentUploadModal,
    } = this.props;
    getShipperDocument(shipper.shipperId);
    handleShipperDocumentUploadModal(false);
  };
  // componentDidMount() {
  //   this.props.getOppoStages();
  //   this.props.getLevels();
  // }
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    const {
      opportunity,
      handleShipperDocumentUploadModal,
      addShipperDocument,
      addingDocumentByShipperId,
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
            shipperId: this.props.shipperId,
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addShipperDocument(
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
            <Form class="form-background h-[30vh]">
              <div className="flex justify-between" >
                <div className="h-[100%] w-[45%]"              
                ><div class=" mt-3"/>
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
                   <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[0]}</div>           
                  <Field
                    name="documentTypeId"
                    selectType="documentType"            
                    component={SearchSelect}
                    isColumn
                    margintop={"0.25em"}
                    value={values.documentId}       
                    inlineLabel              
                  />
                </div>
                <div className="h-[100%] w-[45%]"                
                >
                   <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[1]}</div>
                  <Field
                    name="documentName"              
                    width={"100%"}
                    isColumn
                    component={InputComponent}             
                  />  
                   <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[2]}</div>             
                  <Field
                    name="documentDescription"
                               
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                  />                 
                </div>
              </div>
              <div class=" mt-3" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingDocumentByShipperId}
                >
                       <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[3]}</div>
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  // shipperId: shipper.shipper.shipperId,
  shipperId: shipper.shipperDetailsByShipperId.shipperId,
  shipperDocumentUploadModal: shipper.shipperDocumentUploadModal,
  addingDocumentByShipperId: shipper.addingDocumentByShipperId,

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
      handleShipperDocumentUploadModal,
      addShipperDocument,
      getShipperDocument,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDocumentForm);
