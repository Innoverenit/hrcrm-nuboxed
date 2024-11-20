import React, { useEffect, useState,lazy } from "react";
import { Button, Input, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import { Formik, Form, Field } from "formik";
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import { addQuotationPhoneDetails, getBrand, getModel,getAllProductList,getLocationList } from "../AccountAction";
import QuotationDetailsCardList from "./QuotationDetailsCardList";
import LazySelect from "../../../../Components/Forms/Formik/LazySelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import {inputSuppliesDataSearch} from "../../../Main/Supplies/SuppliesAction";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
const OpportunitytProcureDetails =lazy(()=> import("./OpportunitytProcureDetails"));

const { Option } = Select;

function AddQuotationProduct(props) {

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

            orderPhoneId:props.particularRowItem.quotationId
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addQuotationPhoneDetails(
              {
                ...values,
                productId:SuppliesId,
              },
              props.particularRowItem.quotationId
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
                      <div className="font-semibold text-xs font-poppins text-gray-800">Search</div>
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
                        label="Category"
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
                        label="Attribute"
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
                        label="Brand"
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
                        label="Model"
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
                label="Price / Unit"
                placeholder="Price"
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
                name="maxDiscount"
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
                label="Units"
                placeholder="Unit"
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
               /></div>
               <div className="w-wk">
                <Field
                name="discount"
                label="Discount"
                placeholder="Discount"
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
               
               />
                </div>
              </div>
        <Button htmlType="submit" type="primary" loading={props.addingQuotationPhoneDetails}>Submit</Button>
      </div>
      <div class="w-[55rem]">
      <OpportunitytProcureDetails  
               particularRowItem={props.particularRowItem}
               selectedLanguage={props.selectedLanguage}
               translateText={props.translateText}
               />  
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

export default connect(mapStateToProps, mapDispatchToProps)(AddQuotationProduct);
