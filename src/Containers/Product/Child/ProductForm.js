import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { addProduct } from "../ProductAction";
import { getWorkflowList } from "../../Production/ProductionAction"
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction";
import { CurrencySymbol } from "../../../Components/Common";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { SwitchComponent } from "../../../Components/Forms/Formik/SwitchComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import * as Yup from "yup";

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
       translatedMenuItems: [],
    };
  }
 


  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "1058",//Article 0
        "110",//Name 1
        "14",//category 2
        "1154",//sub category 3
        "259",//Atrribute4
        "263",//Sub Attribute 5
        "141",//Workflow 6
        "1241",//Weight 7
        "1242",//Length 8
        "1243",//Width 9 
        "1244",//Height 10
        "254",//Unit 11 
        "265",//model12 
        "147",//Description 13 
        "104"//Create 14
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
 // const [text, setText] = useState("");
    // function handletext(e) {
    //   setText(e.target.value);
    // }
    // const {
    //   transcript,
    //   listening,
    //   resetTranscript,
    //   browserSupportsSpeechRecognition,
    // } = useSpeechRecognition();
  
    // if (!browserSupportsSpeechRecognition) {
    //   return <span>Browser doesn't support speech recognition.</span>;
    // }

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
    this.props.getWorkflowList(this.props.orgId,"Production")
    this.fetchMenuTranslations();


  }
  render() {
    const { addingProduct, addProduct } = this.props;

    const workFlowOption = this.props.workflowProduction.map((item) => {
      return {
        value: item.workflowDetailsId,
        label: `${item.workflowName || ""}`
      }
    })

    const currencySymbol = (
      <span>
        Price&nbsp;
        <CurrencySymbol currencyType={"INR"} />
      </span>
    );
    // const uomType = this.props.UOMListData.map((item) => {
    //   return {
    //     label: item.unitName || "",
    //     value: item.unitName,
    //   };
    // })
   
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
            
brandName:"",
            publishInd: true,
            marginType: this.state.percentage ? "Percentage" : "Amount",
            consumerMarginType: this.state.amount ? "Amount" : "Percentage",
            gstIncludeInd: this.state.priceGst ? true : false,
            customerMarginInd: this.state.marginCustomer ? false : true,
            distributorMarginInd: this.state.marginDistributor ? true : false,
            subscriptionInd: this.state.subscriptionAvailable ? true : false,
            orgId:this.props.orgId,
            brand:"",
            model:"",
            workflowId:"",
            weight: "",
            width: "",
             length:"",
              height: "",
            //   innerHeight:"",
            //   innerWeight:"",
            //   innerLength:"",
            //   innerWidth:"",
            //   innerVolume:"",
            //   masterHeight:"",
            //   masterWeight:"",
            //   masterLength:"",
            //   masterWidth:"",
            //   masterVolume:"",
            //   uom:"",
            // name: "",
            // wtUom:"",
            // volUom:"",
            // hsn: "",
          }}
          validationSchema={ProductSchema}
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
            <Form className="form-background h-[64vh]">
              <div class="flex justify-around">
                <div class="h-full w-[45%]">
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                    <div className=" flex flex-col">
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full ml-2">
                        <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[0]}#</div>
                          <Field
                            name="articleNo"
                            // label="Article #"
                            placeholder="Article No"
                            isColumn
                            width={"100%"}
                            inlineLabel
                            component={InputComponent}

                          />
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[1]}</div>
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
                       {/* <div class="flex flex-col justify-between items-center">
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
                                                    // name="fifoInd"
                                                    component={SwitchComponent}
                                                    data={values.fifoInd}
                                                    checkedChildren={"LIFO"}
                                                    unCheckedChildren={"FIFO"}
                                                    width={"7em"}
                                                  />
                                          </div>  
                                          </div> */}
                    </div>
                  </div>

                  <div class="flex justify-between mt-4">
                    <div class="w-[48%]">
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[2]}</div>
                      <Field
                        isRequired
                        name="categoryName"
                        // label="Category"
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
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[3]}</div>
                      <Field
                        name="subCategoryName"
                        // label="Sub Category"
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

                  {/* <div class="w-[47%]">
                    <div class=" text-xs font-bold font-poppins">
                      Brand
                      </div>
                      <Field
                        name="brandName"
                        // label="Sub Category"
                        placeholder="Search or Create"
                        optionLabel="brandName"
                        optionValue="brandName"
                        url={`${base_url2}/product/brand`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div> */}

                  <div class="flex justify-between mt-5">
                    <div class="w-[48%]">
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[4]}</div>
                      <Field
                        name="attributeName"
                        // label="Attribute"
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
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[5]}</div>
                      <Field
                        name="subAttributeName"
                        // label="Sub Attribute"
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

                  <div class="w-[48%]">
                  <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[6]}</div>
                      <Field
                        name="workflowId"
                        // label="Workflow"
                        //placeholder="Search or Create"
                        //optionLabel="subAttributeName"
                       // optionValue="subAttributeName"
                       // url={`${base_url2}/product/subattribute`}
                       component={SelectComponent}
                       options={Array.isArray(workFlowOption) ? workFlowOption : []}
                        isColumn
                        inlineLabel

                      />
                    </div>
              
 <div class="flex justify-between">
                    <div class="w-[47%] mt-3">
                       <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[7]}</div>
                      <Field
                        name="weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%] mt-3">
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[8]}</div>
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
                <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[9]}</div>
                      <Field
                        name="width"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                       <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[10]}</div>
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
                    <div class="flex justify-between ">
                <div class="w-[48%]">
                <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[11]}</div>
                
                      <Field
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
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[12]}</div>
                   
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
                   
                    <div class="mt-3">
                    <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[13]}</div>
                    <div>
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
                  
                  
              
                </div>
                <div class="h-full w-[45%]">
                {/* <div className="relative  mx-auto mt-4">
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
                                      //  options={Array.isArray(uomType) ? uomType : []}
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
                   </div> */}
                   {/* <div className="relative  mx-auto mt-4">
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
                                      //  options={Array.isArray(uomType) ? uomType : []}
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
                   </div> */}
                   {/* <div className="relative  mx-auto mt-4">
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
                   </div> */}
                </div>
              </div>

              <div class="flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingProduct}
                >
                  {this.state.translatedMenuItems[14]}
                  {/* Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, product, production,settings  }) => ({
  addingProduct: product.addingProduct,
  workflowProduction: production.workflowProduction,
  addingProductError: product.addingProductError,
  addProductModal: product.addProductModal,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
  UOMListData:settings.UOMListData,
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
