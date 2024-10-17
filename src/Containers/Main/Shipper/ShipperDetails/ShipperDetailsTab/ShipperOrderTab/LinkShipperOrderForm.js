import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import OrderClearbit from "../../../../../../Components/Forms/Autocomplete/OrderClearbit";
import {
  linkOrderByShipperId,
  setClearbitOrderData,
} from "../../../../ShipperAction";
import { SwitchComponent } from "../../../../../../Components/Forms/Formik/SwitchComponent";
const FormSchema = Yup.object().shape({
  label: Yup.string().required("Input required!"),
  // quantity: Yup.string()
  //     .nullable()
  //     .required("Input required!"),
  // shipperAllowedMargin: Yup.string()
  //     .nullable()
  //     .required("Input required!"),
  // allowedDiscount: Yup.string()
  //     .nullable()
  //     .required("Input required!"),
});
class LinkShipperOrderForm extends Component {
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
    const { productId } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            categoryName: "",
            subCategoryName: "",
            productFullName: "",
            attributeName: "",
            subAttributeName: "",
            price: 0,
            name: "",
            quantity: "",
            shipperAllowedMargin: 0,
            shipperMaxMargin: 0,
            tax: "",
            consumerMaxMargin: 0,
            consumerAllowedMargin: 0,
            productId: productId,
            consumerMarginType: "",
            marginType: "",
            shipperAllowedDiscount: 0,
            shipperDiscountSubType: "",
            shipperDiscountType: "",
            shipperMaxDiscount: 0,
            shipperId: this.props.shipperShipperId,
          }}
          validationSchema={FormSchema}
          shipper
          onSubmit={(values, { resetForm }) => {
            if (
              Number(values.shipperAllowedDiscount) <=
                Number(values.shipperMaxDiscount) &&
              Number(values.shipperAllowedDiscount) >= 0 &&
              Number(values.shipperAllowedMargin) <=
                Number(values.shipperMaxMargin) &&
              Number(values.shipperAllowedMargin) >= 0 &&
              Number(values.consumerAllowedMargin) <=
                Number(values.consumerMaxMargin) &&
              Number(values.consumerAllowedMargin) >= 0
            ) {
              this.props.linkOrderByShipperId(
                {
                  ...values,
                  productId: productId,
                  shipperDiscountSubType:
                    values.shipperDiscountSubType === true
                      ? "Amount"
                      : "Percentage",
                  shipperDiscountType:
                    values.shipperDiscountType === true ? "Cash" : "Cash",
                  marginType:
                    values.marginType === true ? "Amount" : "Percentage",
                  // consumerMarginType: values.consumerMarginType === true ? "Amount" : "Percentage",
                },
                this.props.shipperShipperId
              );
            } else {
              message.error(
                "Value can not exceed maximum discount or be less than 0!"
              );
            }
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
                    placeholder="Start typing..."
                    isColumnWithoutNoCreate
                    setClearbitOrderData={this.props.setClearbitOrderData}
                    component={OrderClearbit}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    disabled="true"
                    name="categoryName"
                    type="text"
                    label="Category"
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
                    name="name"
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
                  </FlexContainer>
                  <div class=" mt-3" style={{ marginTop: "25px" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ fontWeight: "bold" }}>
                      {/* <div
                                                    style={{
                                                        size: "8px",
                                                        fontWeight: "bold",
                                                        marginBottom: "4px",
                                                        height: "35px",
                                                    }}
                                                > */}
                      Discount Details
                    </div>
                    <div style={{ width: "48%" }}>
                      <Field
                        name="shipperDiscountType"
                        component={SwitchComponent}
                        data={values.shipperDiscountType}
                        checkedChildren={"Cash"}
                        unCheckedChildren={"Cash"}
                        width={"62%"}
                        // marginTop={"15px"}
                        disabled={true}
                      />
                    </div>
                  </FlexContainer>

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "35%" }}>
                      <Field
                        name="shipperDiscountSubType"
                        component={SwitchComponent}
                        data={values.shipperDiscountSubType}
                        checkedChildren={"Amount"}
                        unCheckedChildren={"Percentage"}
                        marginTop={"31px"}
                        disabled={true}
                      />
                    </div>
                    <div style={{ width: "31%", marginTop: "8px" }}>
                      <Field
                        name="shipperAllowedDiscount"
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

                    <div style={{ width: "32%", marginTop: "8px" }}>
                      <Field
                        // isRequired
                        name="shipperMaxDiscount"
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
                  <div style={{ fontWeight: "bold" }}>Margin</div>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "35%", fontWeight: "bold" }}>
                      <Field
                        name="marginType"
                        component={SwitchComponent}
                        data={values.marginType}
                        checkedChildren={"Amount"}
                        unCheckedChildren={"Percentage"}
                        marginTop={"20px"}
                        disabled={true}
                      />
                    </div>
                    <div style={{ width: "31%" }}>
                      <Field
                        name="shipperAllowedMargin"
                        label="Allowed"
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
                        label="Max"
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
                  loading={this.props.addingOrderByShipperId}
                >
                  Create
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, shipper }) => ({
  user: auth.userDetails,
  shipper: shipper.shipper,
  productId: shipper.clearbitOrder.productId,
  addingOrderByShipperId: shipper.addingOrderByShipperId,
  // productsByShipperId: account.productsByShipperId,
  // linkingProductToShipper: account.linkingProductToShipper,
  shipperShipperId: shipper.shipperDetailsByShipperId.shipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkOrderByShipperId,
      setClearbitOrderData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkShipperOrderForm);
