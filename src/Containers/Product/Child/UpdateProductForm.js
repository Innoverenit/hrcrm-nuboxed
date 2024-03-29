import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { base_url2 } from "../../../Config/Auth";
import * as Yup from "yup";
import { Spacer} from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { updateProduct } from "../ProductAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { CurrencySymbol } from "../../../Components/Common";

const ProductSchema = Yup.object().shape({
  categoryName: Yup.string().required("Please provide First Name"),
  subCategoryName: Yup.string().required("Please provide First Name"),
  attributeName: Yup.string().required("Please provide First Name"),
  subAttributeName: Yup.string().required("Please provide First Name"),
  // name: Yup.string().required("Please provide First Name"),
  price: Yup.string().required("Please provide First Name"),
  distributorMaxMargin: Yup.string().required("Please provide First Name"),
  tax: Yup.string().required("Please provide First Name"),


});


class Productform extends Component {


  render() {
    const { updateProductById, updateProduct } = this.props;
    const currencySymbol = (
      <span>
        Price&nbsp;
        <CurrencySymbol currencyType={"INR"} />
      </span>
    );
    return (
      <>
        <Formik
          initialValues={{
            userId: this.props.userId,
            categoryName: this.props.setEditingProducts.categoryName || "",
            subCategoryName:
              this.props.setEditingProducts.subCategoryName || "",
            name: this.props.setEditingProducts.name || "",
            attributeName: this.props.setEditingProducts.attributeName || "",
            subAttributeName:
              this.props.setEditingProducts.subAttributeName || "",
            price: this.props.setEditingProducts.price || 0,
            tax: this.props.setEditingProducts.tax || 0,
            description: this.props.setEditingProducts.description || "",
            imageId: this.props.setEditingProducts.imageId || "",
            expireDays: this.props.setEditingProducts.expireDays || "",
            bestBefore:this.props.setEditingProducts.bestBefore || "",
            alert:this.props.setEditingProducts.alert || "",
            distributorMaxMargin: this.props.setEditingProducts.distributorMaxMargin || 0,
            marginType: this.props.setEditingProducts.marginType === "Percentage" ? true : false,
            consumerMarginType: this.props.setEditingProducts.consumerMarginType === "Percentage" ? true : false,
            gstIncludeInd: this.props.setEditingProducts.gstIncludeInd ? true : false,
            customerMarginInd: this.props.setEditingProducts.customerMarginInd ? true : false,
            distributorMarginInd: this.props.setEditingProducts.distributorMarginInd ? true : false,
            consumerMaxMargin: this.props.setEditingProducts.consumerMaxMargin || 0,
            articleNo:this.props.setEditingProducts.articleNo || "",
            // unitInStock: this.props.setEditingProducts.unitInStock || "",
          }}
          validationSchema={ProductSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            console.log({ customerMarginInd: values.customerMarginInd === false ? false : true });
            console.log({ distributorMarginInd: values.distributorMarginInd === false ? false : true })
            updateProduct(
              this.props.setEditingProducts.productId,
              {
                ...values,

                marginType: values.marginType === false ? "Amount" : "Percentage",
                consumerMarginType: values.consumerMarginType === false ? "Amount" : "Percentage",
                gstIncludeInd: values.gstIncludeInd === false ? false : true,
                customerMarginInd: values.customerMarginInd === false ? false : true,
                distributorMarginInd: values.distributorMarginInd === false ? false : true,

              },

              () => this.callback(resetForm)
            );
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
             <div class="flex justify-between">
             <div class="h-full w-[45%]">

                  <div class=" flex  flex-nowrap">
                    <div> <Field name="imageId" component={PostImageUpld} /></div>
                    <div>  
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                        <Field
                   name="articleNo"
                   label="Article #"
                   placeholder="Article No"
                   width={"100%"}
                   isColumn
                   inlineLabel
                   component={InputComponent}
                 />
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                        <Field
                    name="name"
                    label="Name"
                    isColumn
                    width={"100%"}
                    inlineLabel
                    component={InputComponent}
                  />
                        </div>
                      </div>
                    </div>
                  </div>

<div class="flex justify-between mt-4">
<div class="w-[48%]">
                  <Field
                    defaultValue={{
                      label: this.props.setEditingProducts.categoryName,
                      value: this.props.setEditingProducts.categoryName,
                    }}
                    isRequired
                    name="categoryName"
                    label="Category"
                    placeholder="Start typing..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url2}/product/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  </div>
                
               
                  <div class="w-[47%]">
                 
                  <Field
                    defaultValue={{
                      label: this.props.setEditingProducts.subCategoryName,
                      value: this.props.setEditingProducts.subCategoryName,
                    }}
                    name="subCategoryName"
                    label="Sub Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="subCategoryName"
                    optionValue="subCategoryName"
                    url={`${base_url2}/product/subcategory`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
</div>
</div>

                  <div class="flex justify-between mt-4">
       

                  <div class="w-[47%]">

                      <Field
                        defaultValue={{
                          label: this.props.setEditingProducts.attributeName,
                          value: this.props.setEditingProducts.attributeName,
                        }}
                        name="attributeName"
                        label="Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url2}/product/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <Spacer />
                    <div class="w-[47%]">
                      <Field
                        defaultValue={{
                          label: this.props.setEditingProducts.subAttributeName,
                          value: this.props.setEditingProducts.subAttributeName,
                        }}
                        name="subAttributeName"
                        label="Sub Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="subAttributeName"
                        optionValue="subAttributeName"
                        url={`${base_url2}/product/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                  </div>
                  {/* <div class="flex justify-between mt-4">
                 <div class="w-[30%]">
                    <Field
                        name="expireDays"
                        label="Expiry"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "30%" }}
                      />
                    </div>
                    <Spacer />
                 <div class="w-[30%]">
                    <Field
                        name="bestBefore"
                        label="Best Before"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "30%" }}
                      />
                    </div>
                    <div class="w-[30%]">
                    <Field
                        name="alert"
                        label="Alert(in days)"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "30%" }}
                      />
                    </div>
                  </div> */}

                </div>

                <div class="h-full w-[45%]">

                  {/* <Spacer style={{ marginBottom: "10px" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "29%" }}>
                      <Field
                        name="price"
                        label={currencySymbol}
                        component={InputComponent}
                        inlineLabel
                        isColumn
                        width={"100%"}
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                        }}
                      />
                    </div>

                    <div style={{ width: "20%" }}>
                      <Field
                        name="tax"
                        label="GST %"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "30%", marginTop: "0px" }}
                      />
                    </div>
                    <div style={{
                      width: "39%",
                      fontWeight: "bold"
                      , marginTop: "2px",
                    }}>

                      Price Includes GST
                      <Field
                        label="Price Includes GST"
                        name="gstIncludeInd"
                        component={SwitchComponent}
                        data={values.gstIncludeInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}

                      />

                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "10px" }} />
                  <FlexContainer justifyContent="space-between">

                    <div style={{ width: "47%" }}>

                      <Field
                        name="marginType"
                        component={SwitchComponent}
                        data={values.marginType}
                        checkedChildren={"Percentage"}
                        unCheckedChildren={"Amount"}
                        marginTop={"20px"}

                      />
                    </div>

                    <div style={{ width: "40%" }}>
                      <Field
                        name="distributorMaxMargin"
                        label="Max. Margin"
                        component={InputComponent}
                        inlineLabel
                        isColumn
                        width={"100%"}
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <div style={{ width: "100%" }}>
                    Margin applicable for Customer
                    <Field

                      name="customerMarginInd"
                      component={SwitchComponent}
                      data={values.customerMarginInd}
                      checkedChildren={"Yes"}
                      unCheckedChildren={"No"}

                    />

                  </div>
                  <Spacer />
                  <div style={{ width: "100%" }}>
                    Margin applicable for Distributor
                    <Field

                      name="distributorMarginInd"
                      component={SwitchComponent}
                      data={values.distributorMarginInd}
                      checkedChildren={"Yes"}
                      unCheckedChildren={"No"}

                    />

                  </div>
                  <Spacer style={{ marginTop: "12px" }} />

                  <div style={{ fontWeight: "bold" }}>
                    Applicable for Customers ONLY
                  </div>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="consumerMarginType"
                        component={SwitchComponent}
                        data={values.consumerMarginType}
                        checkedChildren={"Percentage"}
                        unCheckedChildren={"Amount"}
                        marginTop={"20px"}

                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        name="consumerMaxMargin"
                        label="Consumer MaxMargin"
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
                  <Spacer style={{ marginBottom: "30px" }} />
                  */}

<div class="flex justify-between">
<div class="w-full">
                      <Field
                        name="description"
                        label="Description"
                        isColumn
                        width={"350px"}
                        component={TextareaComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "80px",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                  </div>
                
                </div>
              </div>

              <div class = "flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateProductById}
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, product, opportunity }) => ({
  updateProductById: product.updateProductById,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  setEditingProducts: product.setEditingProducts,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Productform);
