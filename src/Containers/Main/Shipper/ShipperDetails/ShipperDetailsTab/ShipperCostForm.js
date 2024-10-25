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
    };
  }

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
            <Form>
              <div style={{  justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                 
                  <div class=" mt-3" />
                  <Field
                    name="source"
                    label="Source"
                    
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2em", marginTop: "0.25em" }}
                  />
                </div>



               
                  <Field
                    name="destination"
                    label="Destination"
                    
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2em", marginTop: "0.25em" }}
                  />


<Field
                    name="price"
                    label="Price"
                    
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2em", marginTop: "0.25em" }}
                  />
              

                




                
              
              </div>
              

              <div class=" mt-3" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
            Loading={this.props.addingShipperCost}
                >
                  {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
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
