import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { addProduct } from "../ProductAction";
import { getWorkflowList } from "../../Production/ProductionAction"
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { getCurrency } from "../../Auth/AuthAction";
import { CurrencySymbol } from "../../../Components/Common";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

class Productform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseComponent: false,
      percentage: true,
      amount: true,
      priceGst: true,
      marginCustomer: false,
      marginDistributor: true,
      subscriptionAvailable: false,
    };
  }
  callback = (restForm) => {
    console.log("callback");
    restForm();
  };
  handleComponentChange = (checked) => {
    this.setState({
      baseComponent: checked,
    });
    console.log(this.state.baseComponent);
  };

  handlePriceGstChange = (checked) => {
    console.log(checked);
    this.setState({
      priceGst: checked,
    });
  };

  handleAmountChange = (checked) => {
    console.log(checked);
    this.setState({
      percentage: checked,
    });
  };

  handleCustomerMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      marginCustomer: checked,
    });
  };

  handleDistributorMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      marginDistributor: checked,
    });
  };

  handleConsumerMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      amount: checked,
    });
  };
  handleSubscriptionAvailableChange = (checked) => {
    console.log(checked);
    this.setState({
      subscriptionAvailable: checked,
    });
  };



  componentDidMount() {
    this.props.getCurrency()
    this.props.getWorkflowList(this.props.orgId)
  }
  render() {
    const { addingProduct, addProduct } = this.props;

    const workFlowOption = this.props.workflowProduction.map((item) => {
      return {
        value: item.productionWorkflowDetailsId,
        label: `${item.workflowName || ""}`
      }
    })

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
            active: true,
            userId: this.props.userId,
            attribute: "",
            attributeName: "",
            category: "",
            categoryName: "",
            description: "",
            quantity: 0,
            imageId: "",
            name: "",
            price: 0,
            distributorAllowedMargin: 0,
            distributorMaxMargin: 0,
            consumerAllowedMargin: 0,
            consumerMaxMargin: 0,
            subAttribute: "",
            subAttributeName: "",
            articleNo: "",
            subCategory: "",
            subCategoryName: "",
            tax: 0,
            unitInStock: "",
            expireDays: "",
            bestBefore: "",
            alert: "",
            maxDiscount: 0,
            maxDiscountValidDate: "",
            publishInd: true,
            marginType: this.state.percentage ? "Percentage" : "Amount",
            consumerMarginType: this.state.amount ? "Amount" : "Percentage",
            gstIncludeInd: this.state.priceGst ? true : false,
            customerMarginInd: this.state.marginCustomer ? false : true,
            distributorMarginInd: this.state.marginDistributor ? true : false,
            subscriptionInd: this.state.subscriptionAvailable ? true : false,
            orgId:this.props.orgId,
            brand:"",
            model:""
,          }}
          // validationSchema={ProductSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            addProduct(
              {
                ...values,
                marginType: this.state.percentage ? "Percentage" : "Amount",
                consumerMarginType: this.state.amount ? "Amount" : "Percentage",
                gstIncludeInd: this.state.priceGst ? true : false,
                customerMarginInd: this.state.marginCustomer ? true : false,
                distributorMarginInd: this.state.marginDistributor
                  ? true
                  : false,
                subscriptionInd: this.state.subscriptionAvailable
                  ? true
                  : false,
              },
              () => this.callback(resetForm),
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
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                          <Field
                            name="articleNo"
                            label="Article #"
                            placeholder="Article No"
                            isColumn
                            width={"100%"}
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
                        isRequired
                        name="categoryName"
                        label="Category"
                        placeholder="Search or Create"
                        optionLabel="categoryName"
                        optionValue="categoryName"
                        url={`${base_url2}/product/category`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div>

                    <div class="w-[47%]">
                      <Field
                        name="subCategoryName"
                        label="Sub Category"
                        placeholder="Search or Create"
                        optionLabel="subCategoryName"
                        optionValue="subCategoryName"
                        url={`${base_url2}/product/subcategory`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div>
                  </div>

                  <div class="flex justify-between mt-5">
                    <div class="w-[48%]">
                      <Field
                        name="attributeName"
                        label="Attribute"
                        placeholder="Search or Create"
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url2}/product/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div>
                    <div class="w-[48%]">
                      <Field
                        name="subAttributeName"
                        label="Sub Attribute"
                        placeholder="Search or Create"
                        optionLabel="subAttributeName"
                        optionValue="subAttributeName"
                        url={`${base_url2}/product/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div>
                  </div>
                  <div>
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

                  <div class="flex justify-between">
                    <div class="w-full">
                      <Field
                        name="description"
                        label="Description"
                        isColumn
                        width={"33.125em"}
                        component={TextareaComponent}
                        inlineLabel

                      />
                    </div>
                  </div>
                </div>
                <div class="h-full w-[45%]">
                <div class="flex justify-between ">
                <div class="w-[48%]">
                      <Field
                        isRequired
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

              <div class="flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingProduct}
                >
                  Create
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
  addingProduct: product.addingProduct,
  workflowProduction: production.workflowProduction,
  addingProductError: product.addingProductError,
  addProductModal: product.addProductModal,
  user: auth.serviceDetails,
  userId: auth.serviceDetails.userId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProduct,
      getCurrency,
      getWorkflowList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Productform);
