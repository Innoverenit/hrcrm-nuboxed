import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { base_url2 } from "../../../Config/Auth";
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { updateSupplies } from "./SuppliesAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  hsn: Yup.string().required("Input needed!"),
});
class UpdateSuppliesForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newimageId:"",
    };
  }

  componentDidMount() {
    this.props.getCurrency()
  }
  render() {
    const currencyType = this.props.currencies.map((item) => {
      return {
        label: item.currencyName || "",
        value: item.currencyName,
      };
    })
   
    const setImage = (imageId) => {
      this.setState({newimageId:imageId});
    };

    return (
      <>
        <Formik
          initialValues={{
            attribute: "",
            attributeName:this.props.particularDiscountData.attributeName || "",
            category: "",
            categoryName: this.props.particularDiscountData.categoryName || "",
            description:this.props.particularDiscountData.description || "",
            imageId: this.state.newimageId !== "" ? this.state.newimageId : this.props.particularDiscountData.imageId,
            name:this.props.particularDiscountData.name || "",
            hsn:this.props.particularDiscountData.hsn || "",
            subAttribute: "",
            subAttributeName:this.props.particularDiscountData.subAttributeName || "",
            subCategory: "",
            subCategoryName: this.props.particularDiscountData.subCategoryName || "",
            price: 0,
            tax: 0,
            groupId: this.props.groupId,
            userId: this.props.userId,
            currencyName: "",
            grossWeight:this.props.particularDiscountData.grossWeight || "",
            grossUnit:this.props.particularDiscountData.grossUnit || "",
            netUnit:this.props.particularDiscountData.netUnit || "",
            netWeight:this.props.particularDiscountData.netWeight || "",
            reorder:this.props.particularDiscountData.reorder || "",
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateSupplies(
              {
                ...values,
                imageId: this.state.newimageId !== "" ? this.state.newimageId : this.props.particularDiscountData.imageId,
              },
              this.props.particularDiscountData.suppliesId
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
                      <EditUpload
                    imageId={this.props.particularDiscountData.imageId}
                    imgWidth={100}
                    imgHeight={100}
                    getImage={setImage}
                  />
                     
                    </div>
                    </div>
                  </div>
                  <Field
                    isRequired
                    defaultValue={{
                      label: this.props.particularDiscountData.categoryName,
                      value: this.props.particularDiscountData.categoryName,
                    }}
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
                  defaultValue={{
                    label: this.props.particularDiscountData.subCategoryName,
                    value: this.props.particularDiscountData.subCategoryName,
                  }}
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
                       defaultValue={{
                        label: this.props.particularDiscountData.attributeName,
                        value: this.props.particularDiscountData.attributeName,
                      }}
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
                          defaultValue={{
                            label: this.props.particularDiscountData.subAttributeName,
                            value: this.props.particularDiscountData.subAttributeName,
                          }}
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

const mapStateToProps = ({ auth, supplies }) => ({
  addingPurchase: supplies.addingPurchase,
  groupId: auth.userDetails.groupId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateSupplies,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuppliesForm);
