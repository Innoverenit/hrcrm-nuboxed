import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../Components/UI/Layout";

import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
    addShipperCost
} from "../../ShipperAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({});

class ShipperCostForm extends Component {
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
       
       
       "279",// "Source" 0
       "325",  // Destination 1
       "657",  // price 2
       "154",//Submit
       
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
    // this.props.updateCostShipper()
  };
  render() {
  
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            destination: "",
            orgId: this.props.orgId, //input
            price: "",
          source:"",
            
            userId:this.props.userId,
           
            shipperId:this.props.shipperId
          }}
          //   validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addShipperCost(
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
            <Form className="form-background h-[30vh]">
              <div className="flex justify-between">
                <div class=" w-[30%]">
                  <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[0]}</div>
                  <Field className="h-[2rem] mt-1"
                    name="source"                
                    width={"100%"}
                    isColumn
                    component={InputComponent}
  
                  />
                </div>



                <div class=" w-[30%]">
                <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[1]}</div>
                  <Field className="h-[2rem] mt-1"
                    name="destination"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
             
                  />
</div>
          <div class=" w-[30%]">
          <div class=" mt-3 font-bold font-poppins text-xs">{this.state.translatedMenuItems[2]}</div>
                <Field className="h-[2rem] mt-1"
                    name="price"                   
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                  
                  />
              </div>

              </div>
              

              <div class=" mt-8" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={this.props.addingShipperCost}
                >
             <div class=" font-bold font-poppins text-xs">{this.state.translatedMenuItems[3]}</div>
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

const mapStateToProps = ({ suppliers,shipper, auth }) => ({
  supplier: suppliers.supplier,
  addingShipperCost:shipper.addingShipperCost,
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
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addShipperCost
    //   handleSupplierDocumentUploadModal,
    //   addSupplierDocument,
    //   getSupplierDocument,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperCostForm);
