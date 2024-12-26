import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import { Formik, Form, Field } from "formik";
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import { addQuotationPhoneDetails, getBrand, getModel,getAllProductList,getLocationList } from "../AccountAction";
import QuotationDetailsCardList from "./QuotationDetailsCardList";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
const { Option } = Select;
function AddQuotationExcel(props) {
  useEffect(() => {
    props.getLocationList(props.orgId);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [SuppliesId, setSuppliesId] = useState("")

  const handleMaterialSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await axios.get(`${base_url2}/supplies/search/${value}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]); 
    }
  };
  const handleMaterialSelect = (item, setFieldValue) => {
    setSearchTerm(item.suppliesName);
    setSuppliesId(item.suppliesId); 
    setSearchResults([]); 

    setFieldValue('brandId', item.brandName || ''); 
    setFieldValue('modelId', item.modelName || ''); 
    setFieldValue('attribute', item.attributeName || ''); 
    setFieldValue('category', item.categoryName || ''); 
    setFieldValue('price', item.price || '');
    setFieldValue('description', item.description || '');
  };

  const handleInventorySupplierSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await axios.get(`${base_url2}/supplier/inventory/supplier/search/${value}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]); 
    }
  };
  const handleInventorySupplierSelect = (item, setFieldValue) => {
    setSearchTerm(item.categoryName);
    setSuppliesId(item.inventorySupplieId); 
    setSearchResults([]); 

    setFieldValue('brandId', item.brand || ''); 
    setFieldValue('modelId', item.model || ''); 
    setFieldValue('attribute', item.attributeName || ''); 
    setFieldValue('category', item.categoryName || ''); 
    setFieldValue('price', item.price || '');
    setFieldValue('description', item.description || '');
    setFieldValue('allowedDiscount', item.discount && item.discount.length && item.discount[0].allowedDiscount || '');
  };

  const handleProductSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await axios.get(`${base_url2}/product/productName/${value}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]); 
    }
  };
  const handleProductSelect = (item, setFieldValue) => {
    setSearchTerm(item.name);
    setSuppliesId(item.productId); 
    setSearchResults([]); 

    setFieldValue('brandId', item.brandName || ''); 
    setFieldValue('modelId', item.modelName || ''); 
    setFieldValue('attribute', item.attributeName || ''); 
    setFieldValue('category', item.categoryName || ''); 
    setFieldValue('price', item.price || '');
    setFieldValue('description', item.description || '');
  };

 const qPtype="Product";
 console.log("QTN",props.qtionInclItem)


  return (
    <>
    <Formik
          initialValues={{
            // brandId: "",
            // modelId: "",
            orgId: props.orgId,
            userId: props.userId,
            unit: "",
            discount:"",
            // spces: spces,
            // type: type,
            price: "",
            // quality: quality,
            // currencyId:currencyId,
            // category:"",
            // attribute:"",
            // location:locationId,
            productId:SuppliesId,
            productType:props.qtionInclItem === "inventorySuppllier" ? "inventorySuppllier" :
            props.qtionInclItem === "material" ? "material" :
            props.qtionInclItem === "product" ? "product" : "",

            // productType:qPtype === "Inventory Material" ? "Inventory Material" :
            // qPtype === "Material" ? "Material" :
            // qPtype === "Product" ? "Product" : "",

            orderPhoneId:props.orderDetailsId.quotationId
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addQuotationPhoneDetails(
              {
                ...values,
                productId:SuppliesId,
              },
              props.orderDetailsId.quotationId
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
      <div class="w-[22rem] box-content p-2 border-blue border-4">
      <div className="mt-4 w-[22rem]">
                      <div className="font-semibold text-xs font-poppins text-gray-800">
                        {/* Search */}
                        {props.translatedMenuItems[140]}
                      </div>
                    {props.qtionInclItem === "material" && (
                        <> 
                      <Input
                        value={searchTerm}
                        onChange={(e) => handleMaterialSearch(e.target.value)}
                        placeholder="Type to search..."
                      />
                      {searchResults.length > 0 && (
                        <div className="bg-[pink] overflow-auto h-32">
                          {searchResults.map(item => (
                            <div 
                              key={item.id} 
                              onClick={() => handleMaterialSelect(item, setFieldValue)} 
                              className="text-black cursor-pointer"
                            >
                              {item.suppliesName} 
                            </div>
                          ))}
                        </div>
                      )}
                      </> 
                    )}

{props.qtionInclItem === "inventorySuppllier" && (
  <>
<Input
                        value={searchTerm}
                        onChange={(e) => handleInventorySupplierSearch(e.target.value)}
                        placeholder="Type to search..."
                      />
                      {searchResults.length > 0 && (
                        <div className="bg-[pink] overflow-auto h-32">
                          {searchResults.map(item => (
                            <div 
                              key={item.id} 
                              onClick={() => handleInventorySupplierSelect(item, setFieldValue)} 
                              className="text-black cursor-pointer"
                            >
                              {item.categoryName} 
                            </div>
                          ))}
                        </div>
                      )}
</>
)}
{props.qtionInclItem === "product" && (
  <>
<Input
                        value={searchTerm}
                        onChange={(e) => handleProductSearch(e.target.value)}
                        placeholder="Type to search..."
                      />
                      {searchResults.length > 0 && (
                        <div className="bg-[pink] overflow-auto h-32">
                          {searchResults.map(item => (
                            <div 
                              key={item.id} 
                              onClick={() => handleProductSelect(item, setFieldValue)} 
                              className="text-black cursor-pointer"
                            >
                              {item.name} 
                            </div>
                          ))}
                        </div>
                      )}
                      </>
                    )} 



                    </div>
                    <div class="flex w-wk justify-between mt-4">
                    <div className="w-wk">
                      <Field
                      disabled
                        name="category"
                        label={props.translatedMenuItems[31]}
                        component={InputComponent}
                        isColumn
                        inlineLabel 
                        style={{cursor:"not-allowed"}}   
                      />
                    </div>
              
                <div className="w-wk">
                <Field
                disabled
                        name="attribute"
                        label={props.translatedMenuItems[123]}
                        component={InputComponent}
                        isColumn
                        inlineLabel 
                        style={{cursor:"not-allowed"}}
                        />
                </div>
                </div>

                
                    <div class="flex w-wk justify-between mt-4">
                <div className="w-wk">
                <Field
                disabled
                        name="brandId"
                        label={props.translatedMenuItems[69]}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{cursor:"not-allowed"}}
                      />
                </div>
                <div className="w-wk">
                <Field
                disabled
                        name="modelId"
                        label={props.translatedMenuItems[70]}
                        component={InputComponent}
                        isColumn
                        inlineLabel 
                        style={{cursor:"not-allowed"}}
                        />
                </div>
              </div>
              
              <div class="flex w-wk justify-between mt-4">
                <div className="w-wk">
                <Field
                disabled
                name="price"
                label={`${props.translatedMenuItems[124]} / ${props.translatedMenuItems[125]}`}
                placeholder={props.translatedMenuItems[124]}
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
                style={{cursor:"not-allowed"}}
               />
                </div>
                <div className="w-wk">
                <Field
                disabled
                name="allowedDiscount"
                label="Max Discount"
                placeholder="Max Discount"
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
                style={{cursor:"not-allowed"}}
               />
                </div>
              </div>
              <div class="flex w-wk justify-between mt-4">
              <div className="w-wk">
                <Field
                name="unit"
                label={props.translatedMenuItems[125]}
                placeholder={props.translatedMenuItems[125]}
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
               /></div>
               <div className="w-wk">
                <Field
                name="discount"
                label={props.translatedMenuItems[144]}
                placeholder={props.translatedMenuItems[144]}
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
               />
                </div>
              </div>
              <div class="flex w-wk justify-between mt-4">
              <Field
                disabled
                name="description"
                label={props.translatedMenuItems[145]}
                isColumn
                width={"100%"}
                component={TextareaComponent}
                inlineLabel
                style={{cursor:"not-allowed"}}
               />
              </div>
        <Button htmlType="submit" type="primary" loading={props.addingQuotationPhoneDetails}>{props.translatedMenuItems[84]}</Button>
      </div>
      <div class="w-[55rem]">
      <QuotationDetailsCardList translatedMenuItems={props.translatedMenuItems}/>
      </div>
      </div>
      </Form>
       )}
        </Formik>
    </>
  );
}

const mapStateToProps = ({ distributor,suppliers, brandmodel, auth }) => ({
  userId: auth.userDetails.userId,
  orderDetailsId: distributor.orderDetailsId,
  addingQuotationPhoneDetails: distributor.addingQuotationPhoneDetails,
  orgId: auth.userDetails.organizationId,
  brand: distributor.brand,
  model: distributor.model,
  token: auth.token,
  categoryList:suppliers.categoryList,
  allProduct:distributor.allProduct,
  locationlist:distributor.locationlist,
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality,
  qtionInclItem:auth.userDetails.qtionInclItem
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addQuotationPhoneDetails,
    getBrand,
    getModel,
    getCategorylist,
    getAllProductList,
    getLocationList,
    getSupplierSuppliesQuality
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddQuotationExcel);
