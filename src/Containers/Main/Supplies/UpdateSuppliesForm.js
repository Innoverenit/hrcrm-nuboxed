import React, {useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field,FastField } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { SwitchComponent } from "../../../Components/Forms/Formik/SwitchComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { updateSupplies } from "./SuppliesAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import MultiImageUpload from "../../../Components/MultiImageUpload";


const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  categoryName: Yup.string().required("Input needed!"),
});

function UpdateSuppliesForm (props) {

  useEffect(()=> {
   props.getCurrency();
  },[]);

  const [availabilityDate, setAvailabilityDate] = useState('');
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const handleChange = (event) => {
    const date = event.target.value;
    if (date) {
      // Create a new Date object from the date string
      const dateTime = new Date(`${date}T00:00:00Z`);
      // Format the date as ISO string with time component
      const isoString = dateTime.toISOString();
      setAvailabilityDate(isoString);
    } else {
      setAvailabilityDate('');
    }
  };

  useEffect(() => {
    const fetchMenuTranslations = async () => {
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
          "1246",//Update
          "1241",//Weight
        "1242",//Length
        "1243",//Width
        "1244",//Height
          "1275"

      
       
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const [newimageId, setnewimageId] = useState("");

  const uomType = props.UOMListData.map((item) => {
    return {
      label: item.unitName || "",
      value: item.unitName,
    };
  })
  function setImage(imageId) {
    setnewimageId(imageId);
  }

    const currencyType =props.currencies.map((item) => {
      return {
        label: item.currency_name || "",
        value: item.currency_name,
      };
    })
    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().substring(0, 16); // Format: YYYY-MM-DDTHH:MM
    };
  
    // Helper function to get full date-time for storage
    const formatDateForPayload = (dateTime) => {
      const date = new Date(dateTime);
      return date.toISOString(); // Format: YYYY-MM-DDTHH:MM:SS.sssZ
    };

    return (
      <>
        <Formik
          initialValues={{
            attribute: "",
            fifoInd:props.particularDiscountData.fifoInd || "",
            attributeName:props.particularDiscountData.attributeName || "",
            category:props.particularDiscountData.category || "",
            categoryName:props.particularDiscountData.categoryName || "",
            description:props.particularDiscountData.description || "",
            // imageId: newimageId !== "" ? newimageId.imageId : props.particularDiscountData.imageId,
            // imageId: props.particularDiscountData.imageId,
            name:props.particularDiscountData.suppliesName || "",
            hsn:props.particularDiscountData.hsn || "",
            subAttribute:props.particularDiscountData.subAttribute || "",
            subAttributeName:props.particularDiscountData.subAttributeName || "",
            subCategory:props.particularDiscountData.subCategory || "",
            subCategoryName:props.particularDiscountData.subCategoryName || "",
            price: 0,
            tax: 0,
            orgId:props.orgId,
            userId:props.userId,
            currencyName:props.particularDiscountData.costCurrencyName || "",
            grossWeight:props.particularDiscountData.grossWeight || "",
            grossUnit:props.particularDiscountData.grossUnit || "",
            netUnit:props.particularDiscountData.netUnit || "",
            netWeight:props.particularDiscountData.netWeight || "",
            reorder:props.particularDiscountData.reorder || "",
            availabilityDate: availabilityDate,
            uom:"",
            wtUom:"",
            weight: props.particularDiscountData.weight || "",
            width: props.particularDiscountData.width || "",
             length:props.particularDiscountData.length || "",
              height: props.particularDiscountData.height || "",
              volume:props.particularDiscountData.volume || "",
              innerHeight:props.particularDiscountData.innerHeight || "",
              innerWeight:props.particularDiscountData.innerWeight || "",
              innerLength:props.particularDiscountData.innerLength || "",
              innerWidth:props.particularDiscountData.innerWidth || "",
              innerVolume:props.particularDiscountData.innerVolume || "",
              masterHeight:props.particularDiscountData.masterHeight || "",
              masterWeight:props.particularDiscountData.masterWeight || "",
              masterLength:props.particularDiscountData.masterLength || "",
              masterWidth:props.particularDiscountData.masterWidth || "",
              masterVolume:props.particularDiscountData.masterVolume || "",
              shopify:props.particularDiscountData.shopify || "",
              seoTitle:props.particularDiscountData.seoTitle || "",
              seoDescription:props.particularDiscountData.seoDescription || "",
              tag:props.particularDiscountData.tag || "",
              msku:props.particularDiscountData.msku || "",
         
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
           props.updateSupplies(
              {
                ...values,
                fifoInd: values.fifoInd ? true : false,
                availabilityDate: availabilityDate
                // imageId: newimageId !== "" ? newimageId.imageId : props.particularDiscountData.imageId,
                // imageId: props.particularDiscountData.imageId,
              },
             props.particularDiscountData.suppliesId
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
                      <FastField name="imageId" component={PostImageUpld} />

                      </div>
                    </div>
                  </div>
                  <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[0]}</div>
                  <Field
                    defaultValue={{
                      label:props.particularDiscountData.categoryName,
                      value:props.particularDiscountData.categoryName,
                    }}
                    isRequired
                    name="categoryName"
                    // label="Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url2}/supplies/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                     <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[1]}</div>
                  <Field
                    defaultValue={{
                      label:props.particularDiscountData.subCategoryName,
                      value:props.particularDiscountData.subCategoryName,
                    }}
                    name="subCategoryName"
                    // label="Sub Category"
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
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[2]}</div>
                      <Field
                        defaultValue={{
                          label:props.particularDiscountData.attributeName,
                          value:props.particularDiscountData.attributeName,
                        }}
                        name="attributeName"
                        // label="Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url2}/supplies/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                      <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[3]}</div>
                      <Field
                        defaultValue={{
                          label:props.particularDiscountData.subAttributeName,
                          value:props.particularDiscountData.subAttributeName,
                        }}
                        name="subAttributeName"
                        // label="Sub Attribute"
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
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[13]}</div>
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
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[14]}</div>
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
                   
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[15]}</div>
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
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[8]}</div>
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
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Weight</div>
                    <Field
                        name="weight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Volume</div>
                    <Field
                        name="volume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Inner Height</div>
                    <Field
                        name="innerHeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Inner Weight</div>
                    <Field
                        name="innerWeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Inner Length</div>
                    <Field
                        name="innerLength"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Inner Width</div>
                    <Field
                        name="innerWidth"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Inner Volume</div>
                    <Field
                        name="innerVolume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Master Height</div>
                    <Field
                        name="masterHeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Master Weight</div>
                    <Field
                        name="masterWeight"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Master Length</div>
                    <Field
                        name="masterLength"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Master Width</div>
                    <Field
                        name="masterWidth"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Master Volume</div>
                    <Field
                        name="masterVolume"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Shopify</div>
                    <Field
                        name="shopify"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Seo Title</div>
                    <Field
                        name="seoTitle"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Seo Descrption</div>
                    <Field
                        name="seoDescription"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">Tag</div>
                    <Field
                        name="tag"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">MSKU</div>
                    <Field
                        name="msku"
                        //label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                        // isRequired
                      />
                    </div>
                   
                  </div>
                </div>
                <div class="h-full w-[50%]">
                  <div class="flex justify-between">
                    <div class="w-wk">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[4]}</div>
                      <Field
                        name="name"
                        // label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    
                  </div>

                  <div class="flex justify-between">
                  <div class="w-[47%]">
                  <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[5]}</div>
                      <Field
                        name="hsn"
                        // label="HSN"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[6]}</div>
                      <Field
                        name="reorder"
                        // label="Re-order"
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
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[7]}</div>
                      <Field
                        name="netWeight"
                        // label="Net Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[8]}</div>
                    <Field
                        name="wtUom"
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
                  <div class="flex justify-between">
                    <div class="w-[47%]">
                    <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[9]}</div>
                      <Field
                        name="grossWeight"
                        // label="Gross Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
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
                  <div class="flex justify-between mt-4 flex-col">
                  <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[10]}</div>
                    <div class="w-full">
                      <Field
                        name="description"
                        // label="Description"
                        isColumn
                        width={"21.875em"}
                        component={TextareaComponent}
                        inlineLabel
                      />
                    </div>
        
                    {/* <div class="mt-3">
                      <MaterialImagesView />
                    </div> */}
                  </div>
                  <div className="flex justify-between mt-4 flex-col">
                  <div class="font-bold text-xs font-poppins text-black">
                    {/* Availability Date */} {translatedMenuItems[17]}
                    </div>
                  <div className="w-full">
                  <input
        type="date"
        id="availabilityDate"
        onChange={handleChange}
      />
                  </div>
                </div>
                </div>
              </div>
              <div class="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingPurchase}
                >
                  {/* Update */}
                  {translatedMenuItems[11]}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
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
      updateSupplies,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuppliesForm);
