import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
// import { addProduct } from "../ProductAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { CurrencySymbol } from "../../../Components/Common";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

class CategoryProductForm extends Component {
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
    
  }
  render() {
    const { addingProduct, addProduct } = this.props;

   

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
            imageId: "",
          }}
          // validationSchema={ProductSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addProduct(
              {
                ...values,
                
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
                        <div class=" w-1/2 max-sm:w-full">
                          <Field
                            name="category"
                            label="Category"
                            placeholder="Category"
                            isColumn
                            width={"100%"}
                            inlineLabel
                            component={InputComponent}

                          />
                        </div>
                       
                      </div>
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
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  groupId: auth.userDetails.groupId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addProduct,
    //   getCurrency,
    //   getWorkflowList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductForm);
