import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,DatePicker } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {getUOM} from "../../Settings/SettingsAction"
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
    this.props.getUOM()
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
        "14",//0 
        "1154",//1
        "259",//2
        "263",//3
        "110",//4
        "799",//5
        "815",//6
        "816",//7
        "817",//8
        "818",//9
        "147",//10
        "104",//11
        "818",//Weight
        "1242",//Length
        "1243",//Width
        "1244",//Height
       "1275", // Availability date
      // "",//  Dimensions
      // "",//  Inner Height
      // "",//  Master Length
      // "", //  Master Height
      // "", //  Master Width
      // "",//  Inner Width
      "1369",//  Volume
      // "",//  Inner Volume
      // "", //  Master Volume
    
      // "", //  Master Weight
      // "",//  Inner Weight
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
    const uomType = this.props.UOMListData.map((item) => {
      return {
        label: item.unitName || "",
        value: item.unitName,
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
            uom:"",
            name: "",
            wtUom:"",
            volUom:"",
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
            modelName:"",
            width: "",
             length:"",
              height: "",
              volume:"",
              innerHeight:"",
              innerWeight:"",
              innerLength:"",
              innerWidth:"",
              innerVolume:"",
              masterHeight:"",
              masterWeight:"",
              masterLength:"",
              masterWidth:"",
              masterVolume:"",
              shopify:"",
              seoTitle:"",
              seoDescription:"",
              tag:"",
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
              <div class="flex justify-around">
                <div class="h-full w-[45%]">
                  <div class="flex flex-row justify-between">
                    <div class="w-[40%]">
                      <div class="mt-3">
                        <Field name="imageId" component={PostImageUpld} />
                      </div>
                    </div>
                    <div class="flex flex-col justify-between items-center">
                    <div class="w-w47.5 ">
                  <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[5]}</div>
                      <Field
                        name="hsn"
                        //label="HSN"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-w47.5">
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
                  </div>
                  <div class=" mt-2 font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[0]}</div>
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
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[1]}</div>
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
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[2]}</div>
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
                        <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[3]}</div>
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
                  <div class="font-bold text-xs font-poppins text-black">Brand</div>
                      <Field
                        name="brandName"
                        //label="Sub Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="brandName"
                        optionValue="brandName"
                        url={`${base_url2}/supplies/supplies-brand`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                     <div class="font-bold text-xs font-poppins text-black">Model</div>
                      <Field
                        name="modelName"
                        placeholder="Start typing to search or create..."
                        optionLabel="model"
                        optionValue="model"
                        url={`${base_url2}/masterlist/masterList`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
  <div class="flex justify-between">
                    <div class="w-wk">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[4]}</div>
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
                  
                   
                  </div>  
                 <div class="flex justify-between">
                 <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">Shopify</div>
                   <Field
                       name="shopify"
                       //label="Name"
                       isColumn
                       width={"100%"}
                       inlineLabel
                       component={InputComponent}
                    
                     />
                   </div>
                   <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">SEO Title</div>
                   <Field
                       name="seoTitle"
                       //label="Name"
                       isColumn
                       width={"100%"}
                       inlineLabel
                       component={InputComponent}
                    
                     />
                   </div>
                 </div>
                 <div class="flex justify-between">
                 <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">SEO Descrption</div>
                   <Field
                       name="seoDescription"
                       //label="Name"
                       isColumn
                       width={"100%"}
                       inlineLabel
                       component={InputComponent}                    
                     />
                   </div>
                   <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">Tag</div>
                   <Field
                       name="tag"
                       //label="Name"
                       isColumn
                       width={"100%"}
                       inlineLabel
                       component={InputComponent}                    
                     />
                   </div>
                 </div>
                  <div class="flex justify-between mt-2">
                                
                  </div>
                  <div class="flex justify-between mt-4">
                    <div class="w-full">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[10]}</div>
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
                      <div class="font-bold text-xs font-poppins text-black">
                      {this.state.translatedMenuItems[16]} {/*Availability Date */}
                        </div>
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
                <div class="h-full w-[50%]">
                <div className="relative  mx-auto mt-4">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F5F5F5] px-2">
        <span className="text-[0.65rem] font-poppins font-bold">Dimensions</span>
      </div>
      <div className="border-2 border-grey flex-col rounded-md p-[0.40rem] flex">
      <div class="flex justify-between">
                  <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Inner Height</div>
                    <Field
                        name="innerHeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[15]}</div>
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
                  <div class="flex justify-between">
                   
                   <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[13]}</div>
                     <Field
                       name="length"     
                       isColumn
                       inlineLabel
                       component={InputComponent}                     
                       style={{
                         width: "100%",
                       }}
                     />
                   </div>
                   <div class="w-w47.5">
                   <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[14]}</div>
                     <Field
                       name="width"
                       isColumn
                       width={"100%"}
                       inlineLabel
                       component={InputComponent}
                     />
                   </div>
                 </div>
                  <div class="flex justify-between">
                  <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Master Length</div>
                    <Field
                        name="masterLength"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Inner Length</div>
                    <Field
                        name="innerLength"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    </div>
                    <div class="flex justify-between">
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Master Height</div>
                    <Field
                        name="masterHeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Master Width</div>
                    <Field
                        name="masterWidth"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    </div>
                    <div class="flex justify-between">
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Inner Width</div>
                    <Field
                        name="innerWidth"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[8]}</div>
                    <Field
                        name="uom"
                        //label="UOM"
                        isColumn
                        inlineLabel
                        value={values.unitName}
                        component={SelectComponent}
                        options={Array.isArray(uomType) ? uomType : []}
                        // options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    </div>
      <div >       
      </div>
      </div>
    </div>
    <div className="relative  mx-auto mt-4">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F5F5F5] px-2">
        <span className="text-[0.65rem] font-poppins font-bold">Volume</span>
      </div>
      <div className="border-2 border-grey flex-col rounded-md p-[0.40rem] flex">
      <div class="flex justify-between">
      <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Inner Volume</div>
                    <Field
                        name="innerVolume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Master Volume</div>
                    <Field
                        name="masterVolume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
      </div>
      <div class="flex justify-between">
      <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Volume</div>
                    <Field
                        name="volume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
      <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[8]}</div>
                    <Field
                        name="volUom"
                        //label="UOM"
                        isColumn
                        inlineLabel
                        value={values.unitName}
                        component={SelectComponent}
                        options={Array.isArray(uomType) ? uomType : []}
                        // options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
        </div>
      <div >
       
      </div>
      </div>
    </div>
    <div className="relative  mx-auto mt-4">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F5F5F5] px-2">
        <span className="text-[0.65rem] font-poppins font-bold">Weight</span>
      </div>
      <div className="border-2 border-grey flex-col rounded-md p-[0.40rem] flex">
      <div class="flex justify-between">
      <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Weight</div>
                    <Field
                        name="weight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Master Weight</div>
                    <Field
                        name="masterWeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
        </div>
        <div class="flex justify-between">
        <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">Inner Weight</div>
                    <Field
                        name="innerWeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}                     
                      />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs font-poppins text-black">{this.state.translatedMenuItems[8]}</div>
                      <Field
                        name="wtUom"
                        //label="UOM"
                        isColumn
                        inlineLabel
                        value={values.unitName}
                        component={SelectComponent}
                        options={Array.isArray(uomType) ? uomType : []}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
          </div>

      <div >
       
      </div>
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
                  <div class="font-bold text-xs font-poppins ">{this.state.translatedMenuItems[11]}</div>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, supplies,settings }) => ({
  addingPurchase: supplies.addingPurchase,
  groupId: auth.userDetails.groupId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
  UOMListData:settings.UOMListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSupplies,
      getCurrency,
      getUOM
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Suppliesform);