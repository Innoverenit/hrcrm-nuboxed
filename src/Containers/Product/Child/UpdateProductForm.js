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
import { getWorkflowList } from "../../Production/ProductionAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

const ProductSchema = Yup.object().shape({
  categoryName: Yup.string().required("Please provide First Name"),
  // subCategoryName: Yup.string().required("Please provide First Name"),
  // attributeName: Yup.string().required("Please provide First Name"),
  // subAttributeName: Yup.string().required("Please provide First Name"),
  name: Yup.string().required("Please provide Name"),
  // price: Yup.string().required("Please provide First Name"),
  // distributorMaxMargin: Yup.string().required("Please provide First Name"),
  // tax: Yup.string().required("Please provide First Name"),


});


class Productform extends Component {

  componentDidMount() {
    this.props.getWorkflowList(this.props.orgId)
  }

  render() {

    const workFlowOption = this.props.workflowProduction.map((item) => {
      return {
        value: item.productionWorkflowDetailsId,
        label: `${item.workflowName || ""}`
      }
    })

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
            brand:this.props.setEditingProducts.brand || "",
            model:this.props.setEditingProducts.model || "",
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
                        isRequired
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
                  <div class="flex justify-between mt-4">
                  <div class="w-[47%]">
                    <Field
                      label="Workflow"
                      name="workflowId"
                      placeholder="Value"
                      component={SelectComponent}
                      options={Array.isArray(workFlowOption) ? workFlowOption : []}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  <div class="w-[47%]">
                    <Field
                      label="Stage"
                      name="stage"
                      placeholder="Value"
                      component={InputComponent}
                      // options={Array.isArray(workFlowOption) ? workFlowOption : []}

                      inlineLabel
                      width={"100%"}
                      isColumn
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

                <div class="h-full w-[45%]">
                <div class="flex justify-between ">
                <div class="w-[48%]">
                      <Field
                      // defaultValue={{
                      //   label: this.props.setEditingProducts.brand,
                      //   value: this.props.setEditingProducts.brand,
                      // }}
                        name="brand"
                        label="Brand"
                        // placeholder="Search or Create"
                        // optionLabel="categoryName"
                        // optionValue="categoryName"
                        // url={`${base_url2}/masterlist/masterList`}
                        // component={LazySelect}
                        component={InputComponent}
                        isColumn
                        inlineLabel

                      />
                    </div>

                    <div class="w-[47%]">
                      <Field
                        name="model"
                        label="Model"
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        width={"100%"}
                   
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

const mapStateToProps = ({ auth, product, production }) => ({
  updateProductById: product.updateProductById,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  setEditingProducts: product.setEditingProducts,
  workflowProduction: production.workflowProduction,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateProduct,
      getWorkflowList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Productform);
