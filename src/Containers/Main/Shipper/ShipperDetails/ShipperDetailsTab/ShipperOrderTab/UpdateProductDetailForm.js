import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import OrderClearbit from "../../../../../../Components/Forms/Autocomplete/OrderClearbit";
import {
  setClearbitOrderData,
  //   updateOrderDetails,
} from "../../../../ShipperAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  quantity: Yup.string().required("Input required"),
});

class UpdateProductDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: "false",
      amount: "false",
    };
  }
  handleCashChange = (checked) => {
    console.log(checked);
    this.setState({
      cash: checked,
    });
  };
  handleAmountChange = (checked) => {
    console.log(checked);
    this.setState({
      amount: checked,
    });
  };
  render() {
    return (
      <>
        <Formik
          initialValues={{
            categoryName: this.props.setEditingOrderDetail.categoryName || "",
            subCategoryName:
              this.props.setEditingOrderDetail.subCategoryName || "",
            attributeName: this.props.setEditingOrderDetail.attributeName || "",
            subAttributeName:
              this.props.setEditingOrderDetail.subAttributeName || "",
            price: this.props.setEditingOrderDetail.price || 0,
            maxDiscount: this.props.setEditingOrderDetail.maxDiscount || 0,
            quantity: this.props.setEditingOrderDetail.quantity || 0,
            contactId: this.props.contactId,
            productId: this.props.setEditingOrderDetail.productId || 0,
            shipperAllowedMargin:
              this.props.setEditingOrderDetail.shipperAllowedMargin || 0,
            shipperrMaxMargin:
              this.props.setEditingOrderDetail.shipperMaxMargin || 0,
            marginType: this.props.setEditingOrderDetail.marginType || 0,
          }}
          validationSchema={FormSchema}

          //   onSubmit={(values, { resetForm }) => {
          //     this.props.updateOrderDetails(
          //       {
          //         ...values,
          //       },
          //       this.props.setEditingOrderDetail.productId,
          //       this.props.contactId,

          //     );
          //   }}
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
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="label"
                    type="text"
                    label="Search"
                    disabled={true}
                    placeholder="Start typing to search..."
                    isColumn
                    setClearbitOrderData={this.props.setClearbitOrderData}
                    component={OrderClearbit}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="categoryName"
                    type="text"
                    label="Category"
                    disabled="true"
                    inlineLabel
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                  <div class=" mt-3" />
                  <Field
                    disabled="true"
                    name="subCategoryName"
                    label="Sub Category"
                    inlineLabel
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                  <div class=" mt-3" />
                  <Field
                    disabled="true"
                    name="productFullName"
                    label="Name"
                    inlineLabel
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="attributeName"
                        disabled="true"
                        label="Attribute"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        disabled="true"
                        name="subAttributeName"
                        label="Sub Attribute"
                        inlineLabel
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <div class=" mt-3" />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="quantity"
                        label="Units"
                        type="number"
                        disabled
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        disabled="true"
                        name="price"
                        label="Price"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "50%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                    {/* <div style={{ width: "40%" }}>
                      <Field
                        disabled="true"
                        name="distributorAllowedMargin"
                        label="Margin %"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "50%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div> */}
                  </FlexContainer>
                  <div class=" mt-3" />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <div
                        style={{
                          size: "8px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                          height: "35px",
                        }}
                      >
                        Discount Details
                      </div>
                      <Switch
                        disabled={true}
                        style={{ width: "80px" }}
                        onChange={this.handleCashChange}
                        checked={this.state.cash}
                        checkedChildren="Cash"
                        unCheckedChildren="Cash"
                      />
                    </div>
                  </FlexContainer>

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <Switch
                        disabled={true}
                        style={{ width: "80px", marginTop: "30px" }}
                        onChange={this.handleAmountChange}
                        checked={this.state.amount}
                        checkedChildren="Amount"
                        unCheckedChildren="Percentage"
                      />
                    </div>
                    <div style={{ width: "33%" }}>
                      <Field
                        name="allowedDiscount"
                        label="Value"
                        placeholder={"Value"}
                        isColumn
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div style={{ width: "32%" }}>
                      <Field
                        // isRequired
                        name="maxDiscount"
                        disabled="true"
                        label="MaxDiscount"
                        type="number"
                        isColumn
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <div class=" mt-3" />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <Switch
                        disabled={true}
                        style={{ width: "80px", marginTop: "30px" }}
                        onChange={this.handleAmountChange}
                        checked={this.state.amount}
                        checkedChildren="Percentage"
                        unCheckedChildren="Amount"
                      />
                    </div>
                    <div style={{ width: "33%" }}>
                      <Field
                        name="shipperAllowedMargin"
                        label="Margin"
                        disabled="true"
                        placeholder={"value"}
                        isColumn
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div style={{ width: "32%" }}>
                      <Field
                        // isRequired
                        name="shipperMaxMargin"
                        disabled="true"
                        label="MaxMargin"
                        type="number"
                        isColumn
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                </div>
              </div>

              <div class=" mt-3" />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  //   loading={this.props.updateOrderDetailsByProductId}
                >
                  Update
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
// }

const mapStateToProps = ({ auth, shipper }) => ({
  setEditingOrderDetail: shipper.setEditingOrderDetail,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   updateOrderDetails,
      setClearbitOrderData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProductDetailForm);
