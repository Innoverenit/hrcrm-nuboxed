import React, {useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field,FastField } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { SwitchComponent } from "../../../Components/Forms/Formik/SwitchComponent";
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { updateSupplies } from "./SuppliesAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import MultiImageUpload from "../../../Components/MultiImageUpload";
// import MaterialImagesView from "./";

const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  categoryName: Yup.string().required("Input needed!"),
});

function UpdateSuppliesForm (props) {

  useEffect(()=> {
   props.getCurrency();
  },[]);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "Category",//0
          "Sub Category",//1
          "Attribute",//1
          "Sub Attribute",//1
          "Name",//1
          "HSN",//1
          "Re-order",//1
          "Net Weight",//1
          "UOM",//1
          "Gross Weight",
          "Description",
          "Update",
          "Weight",//12
          "Length",//13
          "Width",//14
          "Height",//15
      
       
          
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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

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
            availabilityDate: formatDateForPayload(props.particularDiscountData.availabilityDate || new Date()),
            weight: "",
            width: "",
             length:"",
              height: "",
         
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
           props.updateSupplies(
              {
                ...values,
                fifoInd: values.fifoInd ? true : false,
                availabilityDate: formatDateForPayload(props.particularDiscountData.availabilityDate || new Date())
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
                  <label>{translatedMenuItems[0]}</label>
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
                     <label>{translatedMenuItems[1]}</label>
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
                    <label>{translatedMenuItems[2]}</label>
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
                      <label>{translatedMenuItems[3]}</label>
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
                    <label>{translatedMenuItems[12]}</label>
                      <Field
                        name="weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{translatedMenuItems[13]}</label>
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
                    <label>{translatedMenuItems[14]}</label>
                      <Field
                        name="width"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{translatedMenuItems[15]}</label>
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
                    <label>{translatedMenuItems[4]}</label>
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
                  <label>{translatedMenuItems[5]}</label>
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
                    <label>{translatedMenuItems[6]}</label>
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
                    <label>{translatedMenuItems[7]}</label>
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
                    <label>{translatedMenuItems[8]}</label>
                      <Field
                        name="netUnit"
                        // label="UOM"
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
                    <label>{translatedMenuItems[9]}</label>
                      <Field
                        name="grossWeight"
                        // label="Gross Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div class="w-[47%]">
                    <label>{translatedMenuItems[8]}</label>
                      <Field
                        name="grossUnit"
                        // label="UOM"
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
                  <label>{translatedMenuItems[10]}</label>
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
                  <div className="flex justify-between mt-4">
                  <label>Availability Date</label>
                  <div className="w-full">
                    <Field name="availabilityDate">
                      {({ field, form }) => (
                        <input
                          type="date"
                          {...field}
                          value={field.value || formatDateForInput(new Date())}
                          onChange={e => {
                            const { value } = e.target;
                            setFieldValue('availabilityDate', value);
                          }}
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
      updateSupplies,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuppliesForm);
