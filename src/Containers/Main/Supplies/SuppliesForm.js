import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { base_url2 } from "../../../Config/Auth";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { addSupplies } from "./SuppliesAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  hsn: Yup.string().required("Input needed!"),
});
class Suppliesform extends Component {

  componentDidMount() {
    this.props.getCurrency()
  }
  render() {
    const currencyType = this.props.currencies.map((item) => {
      return {
        label: item.currency_name || "",
        value: item.currency_name,
      };
    })
  
    return (
      <>
        <Formik
          initialValues={{
            attribute: "",
            attributeName: "",
            category: "",
            categoryName: "",
            description: "",
            imageId: "",
            name: "",
            hsn: "",
            subAttribute: "",
            subAttributeName: "",
            subCategory: "",
            subCategoryName: "",
            price: 0,
            tax: 0,
            userId: this.props.userId,
            currencyName: ""
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSupplies(
              {
                ...values,
              },  
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
            <Form class="form-background">
              <div class="flex justify-between">
                <div class="h-full w-[45%]">
                  <div class="flex-nowrap">
                    <div class="w-[40%]">
                      <div class="mt-3">
                      <Field name="imageId" component={PostImageUpld} />
                      </div>
                    </div>
                  </div>
                  <Field
                    isRequired
                    name="categoryName"
                    label="Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url2}/supplies/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Field
                    name="subCategoryName"
                    label="Sub Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="subCategoryName"
                    optionValue="subCategoryName"
                    url={`${base_url2}/supplies/subcategory`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                  />
                   <div class="flex justify-between">
                    <div class="w-full">
                      <Field
                        name="attributeName"
                        label="Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url2}/supplies/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                      <Field
                        name="subAttributeName"
                        label="Sub Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="subAttributeName"
                        optionValue="subAttributeName"
                        url={`${base_url2}/supplies/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                  </div>
                </div>
                <div class="h-full w-[50%]">
                <div class="flex justify-between">
                    <div class="w-[47%]">
                      <Field
                        name="name"
                        label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                      <Field
                        name="hsn"
                        label="HSN"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                  </div>

                  <div class="flex justify-between">
                   <div class="w-[47%]">
                      <Field
                        name="reorder"
                        label="Re-order"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                   <div class="w-[47%]">
                      <Field
                        name="currencyName"
                        label="Currency"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={Array.isArray(currencyType) ? currencyType : []}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                   <div class="w-[47%]">
                      <Field
                        name="netWeight"
                        label="Net Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                   <div class="w-[47%]">
                      <Field
                        name="netUnit"
                        label="Units"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                   <div class="w-[47%]">
                      <Field
                        name="grossWeight"
                        label="Gross Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                   <div class="w-[47%]">
                      <Field
                        name="grossUnit"
                        label="Units"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div class="flex justify-between mt-4">
                    <div class="w-full">
                      <Field
                        name="description"
                        label="Description"
                        isColumn
                        width={"21.875em"}
                        component={TextareaComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingPurchase}
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

const mapStateToProps = ({ auth, supplies }) => ({
  addingPurchase: supplies.addingPurchase,
  groupId: auth.userDetails.groupId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSupplies,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Suppliesform);
