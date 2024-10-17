import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
 import { addCategory } from "../ProductAction";
import { CurrencySymbol } from "../../../Components/Common";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  categoryName: Yup.string().required("Input Required!"),
});
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
    const { addingCategory, addCategory } = this.props;

   

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
            categoryName:"",
            imageId: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCategory(
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
                            name="categoryName"
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
                  loading={addingCategory}
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
  addingCategory:product.addingCategory,
  addingCategoryError:product.addingCategoryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCategory
    //   getCurrency,
    //   getWorkflowList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductForm);
