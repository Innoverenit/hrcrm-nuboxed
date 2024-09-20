import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { base_url2 } from "../../../Config/Auth";
import * as Yup from "yup";
import { BundleLoader } from "../../../Components/Placeholder";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import MultiImageUpload from "../../../Components/MultiImageUpload";
import { updateProduct } from "../ProductAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { CurrencySymbol } from "../../../Components/Common";
import { getWorkflowList } from "../../Production/ProductionAction";

const ProductImagesView =lazy(()=>import("./ProductImagesView"));
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
  constructor(props){
    super(props);
    this.state = {
      imageIds:[],
      translatedMenuItems: [],
    };
    this.handleSetImage = this.handleSetImage.bind(this);
  }

  handleSetImage(imageId) {
    console.log(imageId);
    this.setState((prevState) => ({
      imageIds: [...prevState.imageIds, imageId]
    }));
  }

  componentDidMount() { 
    this.fetchMenuTranslations();
    this.props.getWorkflowList(this.props.orgId)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "657",//price 0
        "1058",//Article 1
        "110",//Name 2
        "14",//category 3
        "1154",//sub category 4
        "259",//Atrribute 5
        "263",//Sub Attribute 6 
        "1241",//Weight 7
        "1242",//Length 8
        "1243",//Width 9
        "1244",//Height 10
        "254",//Brand 11
        "265",//model 12
        "147",//Description 13
        "1246",//Update 14
       "1613", // Article No
       "1614", // Start typing...
       "1615", // Start typing to search or create...
        "1616",// subCategoryName
       "1617", // "attributeName"
       "1618", // subAttributeName"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }};

  render() {
    const Imagedata = this.state.imageIds && this.state.imageIds.map((str, index) => ({ imageId: str}));

    const workFlowOption = this.props.workflowProduction.map((item) => {
      return {
        value: item.productionWorkflowDetailsId,
        label: `${item.workflowName || ""}`
      }
    })

    const { updateProductById, updateProduct } = this.props;
    const currencySymbol = (
      <span>
        {this.state.translatedMenuItems[0]} {/* Price */}
        <CurrencySymbol currencyType={"INR"} />
      </span>
    );

    console.log("kkk",this.state.imageIds)
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
            // imageId: this.props.setEditingProducts.imageId || "",
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
            images:Imagedata,
            weight: "",
            width: "",
             length:"",
              height: "",

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
                images:Imagedata,
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
                    <div> 
                      {/* <Field name="imageId" component={PostImageUpld} /> */}
                      <MultiImageUpload handleSetImage={this.handleSetImage}/>
                    </div>
                    <div>  
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                        <div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[1]} #</div>
                        <Field
                   name="articleNo"
                  //  label="Article #"
                   placeholder= {this.state.translatedMenuItems[15]}
                   width={"100%"}
                   isColumn
                   inlineLabel
                   component={InputComponent}
                 />
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                        <div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[2]}</div>
                        <Field
                        isRequired
                    name="name"
                    // label="Name"
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
<div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[3]}</div>
                  <Field
                    defaultValue={{
                      label: this.props.setEditingProducts.categoryName,
                      value: this.props.setEditingProducts.categoryName,
                    }}
                    isRequired
                    name="categoryName"
                    // label="Category"
                    placeholder={this.state.translatedMenuItems[16]}
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
                  <div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[4]}</div>
                  <Field
                    defaultValue={{
                      label: this.props.setEditingProducts.subCategoryName,
                      value: this.props.setEditingProducts.subCategoryName,
                    }}
                    name="subCategoryName"
                    // label="Sub Category"
                    placeholder={this.state.translatedMenuItems[17]}
                    optionLabel={this.state.translatedMenuItems[18]}
                    optionValue={this.state.translatedMenuItems[18]}
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
                  <div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[5]}</div>
                      <Field
                        defaultValue={{
                          label: this.props.setEditingProducts.attributeName,
                          value: this.props.setEditingProducts.attributeName,
                        }}
                        name="attributeName"
                        // label="Attribute"
                        placeholder={this.state.translatedMenuItems[17]}
                        optionLabel={this.state.translatedMenuItems[19]}
                        optionValue={this.state.translatedMenuItems[19]}
                        url={`${base_url2}/product/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div class=" mt-3" />
                    <div class="w-[47%]">
                    <div class=" font-bold font-poppins text-xs"> {this.state.translatedMenuItems[6]}</div>
                      <Field
                        defaultValue={{
                          label: this.props.setEditingProducts.subAttributeName,
                          value: this.props.setEditingProducts.subAttributeName,
                        }}
                        name="subAttributeName"
                        // label="Sub Attribute"
                        placeholder={this.state.translatedMenuItems[17]}
                        optionLabel={this.state.translatedMenuItems[20]}
                        optionValue={this.state.translatedMenuItems[20]}
                        url={`${base_url2}/product/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                  </div>
                
<div class="flex justify-between">
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">
                    {this.state.translatedMenuItems[7]} {/* Weight */}
                      </div>
                      <Field
                        name="weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">
                    {this.state.translatedMenuItems[8]}{/* Length */}
                      </div>
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
                    <div class="font-bold text-xs font-poppins text-black">
                      {/* Width */}{this.state.translatedMenuItems[9]}

                    </div>
                      <Field
                        name="width"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">
                    {this.state.translatedMenuItems[10]}  {/* Height */}

                    </div>
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

                <div class="h-full w-[45%]">
                <div class="flex justify-between ">
                <div class="w-[48%]">
               <div class="font-bold text-xs font-poppins text-black">
                      {this.state.translatedMenuItems[11]}</div>
                      <Field
                      // defaultValue={{
                      //   label: this.props.setEditingProducts.brand,
                      //   value: this.props.setEditingProducts.brand,
                      // }}
                        name="brand"
                        // label="Brand"
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
                    <div class="font-bold text-xs font-poppins text-black">
                    {this.state.translatedMenuItems[12]}</div>
                      <Field
                        name="model"
                        // label="Model"
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        width={"100%"}
                   
                      />
                    </div>
                    </div>
              
                    <div class="flex justify-between">
<div class="w-full">
<div class="font-bold text-xs font-poppins text-black">
{this.state.translatedMenuItems[13]}</div>
                      <Field
                        name="description"
                        // label="Description"
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
                  <div class="mt-3">
                  <Suspense fallback={<BundleLoader />}>
                      <ProductImagesView /></Suspense>
                    </div>
                </div>
              </div>

              <div class = "flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateProductById}
                >
                 {this.state.translatedMenuItems[14]} {/* Update */}
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
