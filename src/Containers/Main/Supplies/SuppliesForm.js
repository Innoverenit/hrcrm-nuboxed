import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,DatePicker } from "antd";
import * as Yup from "yup";
import moment from 'moment';
import { Formik, Form, Field } from "formik";
import { SwitchComponent } from "../../../Components/Forms/Formik/SwitchComponent";
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
  categoryName: Yup.string().required("Input needed!"),
  // hsn: Yup.string().required("Input needed!"),
});
class Suppliesform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.props.getCurrency()
  }


  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "Category",//0
          
         
        "Sub Category",//1
        "Attribute",//2
        "Sub Attribute",//3
        "Name",//4
        "HSN",//5
        "Re-order",//6
        "Net Weight",//7
        "UOM",//8
        "Gross Weight",//9
        "Description",//10
        "Create",//11
        "Weight",//12
        "Length",//13
        "Width",//14
        "Height",//15

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  convertToUTC = (localDateTime) => {
    if (!localDateTime) return null;
    const localDate = new Date(localDateTime);
    const utcDate = new Date(localDate.toUTCString());
    return utcDate.toISOString(); // Format as 2024-07-31T18:30:00.000Z
  };
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
            fifoInd:false,
            userId: this.props.userId,
            currencyName: "",
            availabilityDate: "",
            weight: "",
            width: "",
             length:"",
              height: "",
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSupplies(
              {
                ...values,
    
                fifoInd: values.fifoInd ? true : false,
                availabilityDate: this.convertToUTC(values.availabilityDate),
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
                  <label>{this.state.translatedMenuItems[0]}</label>
                  <Field
                    isRequired
                    name="categoryName"
                    //label="Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url2}/supplies/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                    <label>{this.state.translatedMenuItems[1]}</label>
                  <Field
                    name="subCategoryName"
                    //label="Sub Category"
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
                    <label>{this.state.translatedMenuItems[2]}</label>
                      <Field
                        name="attributeName"
                        //label="Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url2}/supplies/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                        <label>{this.state.translatedMenuItems[3]}</label>
                      <Field
                        name="subAttributeName"
                        //label="Sub Attribute"
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
                  <div class="flex justify-between">
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[12]}</label>
                      <Field
                        name="weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[13]}</label>
                      <Field
                        name="length"
                        //label="UOM"
                        isColumn
                        inlineLabel
                        component={InputComponent}
                      
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[14]}</label>
                      <Field
                        name="width"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[15]}</label>
                      <Field
                        name="height"
                        isColumn
                        inlineLabel
                        component={InputComponent}
                      
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="h-full w-[50%]">
                  <div class="flex justify-between">
                    <div class="w-wk">
                    <label>{this.state.translatedMenuItems[4]}</label>
                      <Field
                        name="name"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        isRequired
                      />
                    </div>
                   
                  </div>

                  <div class="flex justify-between">
                  <div class="w-[47%]">
                  <label>{this.state.translatedMenuItems[5]}</label>
                      <Field
                        name="hsn"
                        //label="HSN"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[6]}</label>
                      <Field
                        name="reorder"
                        //label="Re-order"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    {/* <div class="w-[47%]">
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
                    </div> */}
                  </div>
                  <div class="flex justify-between">
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[7]}</label>
                      <Field
                        name="netWeight"
                        //label="Net Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[8]}</label>
                      <Field
                        name="netUnit"
                        //label="UOM"
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
                    <label>{this.state.translatedMenuItems[9]}</label>
                      <Field
                        name="grossWeight"
                        //label="Gross Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{this.state.translatedMenuItems[8]}</label>
                      <Field
                        name="grossUnit"
                        //label="UOM"
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
                  <div class="flex justify-between mt-2">
                    <div class="w-[47%]">
                    <Field
                              name="fifoInd"
                              component={SwitchComponent}
                              data={values.fifoInd}
                              checkedChildren={"LIFO"}
                              unCheckedChildren={"FIFO"}
                              width={"7em"}
                            />
                    </div>
                
                  </div>
                  <div class="flex justify-between mt-4">
                    <div class="w-full">
                    <label>{this.state.translatedMenuItems[10]}</label>
                      <Field
                        name="description"
                        //label="Description"
                        isColumn
                        width={"21.875em"}
                        component={TextareaComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="w-full">
                      <label>Date</label>
                      <Field name="availabilityDate">
                        {({ field, form }) => (
                          <input
                            type="date"
                            value={field.value || ''}
                            onChange={(e) => {
                              setFieldValue('availabilityDate', e.target.value);
                            }}
                            style={{ width: '100%' }}
                          />
                        )}
                      </Field>
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
                  {/* Create */}
                  <label>{this.state.translatedMenuItems[11]}</label>
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
  orgId: auth.userDetails.organizationId,
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
