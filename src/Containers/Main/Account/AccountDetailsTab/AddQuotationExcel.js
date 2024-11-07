import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
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

const { Option } = Select;

function AddQuotationExcel(props) {

  useEffect(() => {
    // props.getCategorylist();
    props.getLocationList(props.orgId);
    // props.getSupplierSuppliesQuality();
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
            // unit: "",
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
                name="discount"
                label="Discount"
                placeholder="Discount"
                isColumn
                width={"100%"}
                component={InputComponent}
                inlineLabel
                style={{cursor:"not-allowed"}}
               />
                </div>
              </div>
              <div className="mt-4 w-[22rem]">
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
              </div>
        <Button htmlType="submit" type="primary" loading={props.addingQuotationPhoneDetails}>Submit</Button>
      </div>
      <div class="w-[55rem]">
      <QuotationDetailsCardList />
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




// import React, { useEffect, useState } from "react";
// import { Button, Input, Select } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux"; 
// import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
// import { addQuotationPhoneDetails, getBrand, getModel,getAllProductList,getLocationList } from "../AccountAction";
// import QuotationDetailsCardList from "./QuotationDetailsCardList";

// const { Option } = Select;

// function AddQuotationExcel(props) {
//   useEffect(() => {
//     // props.getBrand();
//     props.getCategorylist();
//     // props.getAllProductList();
//     props.getLocationList(props.orgId);
//     props.getSupplierSuppliesQuality();
//   }, []);

//   const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', specs: '',location:''  }]);

//   const handleUnitChange = (index, key, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][key] = value;
//     setRows(updatedRows);
//   };

//   const handleBrandChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].brand = value;
//     updatedRows[index].model = ""; // Reset model when brand changes
//     updatedRows[index].modelId = ""; // Reset modelId when brand changes
//     setRows(updatedRows);
//     props.getModel(updatedRows[index].category,value);
//   };

//   const handleModelChange = (value, index) => {
//     const selectedModel = props.model.find((model) => model.model === value);
//     const updatedRows = [...rows];
//     updatedRows[index].model = value;
//     updatedRows[index].modelId = selectedModel.id; // Assuming model object has an 'id' field
//     setRows(updatedRows);
//     props.getAllProductList(updatedRows[index].category, updatedRows[index].brand,value);
//   };

//   const handleSpecsChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].specs = value;
//     setRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',location:'' }]);
//   };
//   const handleCategoryChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].category = value;
//     // updatedRows[index].model = ""; // Reset model when brand changes
//     // updatedRows[index].modelId = ""; // Reset modelId when brand changes
//     setRows(updatedRows);
//     props.getBrand(value);
//   };
//   const handleQualityChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].quality = value;
//     // updatedRows[index].model = ""; // Reset model when brand changes
//     // updatedRows[index].modelId = ""; // Reset modelId when brand changes
//     setRows(updatedRows);
//     //props.getModel(value);
//   };
  
//   const handleLocationChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].locationId = value;
//     setRows(updatedRows);
   
//   };
//   const handleAttributeChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].attribute = value;
//     setRows(updatedRows);
   
//   };

//   const handleRemoveRow = (index) => {
//     const updatedRows = [...rows];
//     updatedRows.splice(index, 1);
//     setRows(updatedRows);
//   };

//   const handleSubmit = () => {
//     const dataToSend = rows.map((row) => ({
//       orderPhoneId: props.orderDetailsId.quotationId,
//       brandId: row.brand,
//       modelId: row.model,
//       orderType:"Procure",
//       unit: row.unit,
//       specs: row.specs,
//       category:row.category ,
//       attribute:row.attribute,
//       // location:row.locationId,
//       location: row.location,
//       quality: row.quality,
//       price: row.price
//     }));

//     // Make the API call
//     props.addQuotationPhoneDetails(dataToSend, props.orderDetailsId.quotationId);
//     setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',location:'' }]);
//   };

//   return (
//     <>
//     <div class="flex justify-between">
//       <div class="w-[18rem] box-content p-2 border-blue border-4">
//         {rows.map((row, index) => (
//           <div key={index}>
//             <div className="flex-col">
//             <div class=" w-64 max-sm:w-24">
//         <Input
//           placeholder="Search "
//           width={"100%"}
//          // suffix={suffix}
//           // onPressEnter={handleSearch}
//           // onChange={handleChange}
//         //value={currentData}
//         />
//         </div>
//             <div>
//                 <div class="font-bold text-xs font-poppins text-black">Category</div>
//                 <div className="w-[9rem]">
//                   <Select
//                     style={{ width: 200 }}
//                     value={row.category}
//                     onChange={(value) => handleCategoryChange(value, index)}
//                   >
//                     {props.categoryList.map((a) => (
//                       <Option key={a.id} value={a.categoryId}>{a.categoryName}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
//            <div class="mt-1" />
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Brand</div>
//                 <div className="w-[13rem]">
//                   <Select
//                     style={{ width: 200 }}
//                     value={row.brand}
//                     onChange={(value) => handleBrandChange(value, index)}
//                   >
//                     {props.brand.map((a) => (
//                       <Option key={a.brandName} value={a.brandName}>{a.brandName}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
//               <div class="mt-1" />
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Model</div>
//                 <div className="w-[13rem]">
//                   <Select
//                     style={{ width: 200 }}
//                     value={row.model}
//                     onChange={(value) => handleModelChange(value, index)}
//                   >
//                     {props.model.map((a) => (
//                       <Option key={a.model} value={a.model}>{a.model}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
//               <div class="mt-1" />
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Attribute</div>
//                 <div className="w-[7rem]">
//                   <Select
//                     style={{ width: 200 }}
//                     value={row.attribute}
//                     onChange={(value) => handleAttributeChange(value, index)}
//                   >
//                     {props.allProduct.map((a) => (
//                       <Option key={a.attributeId} value={a.attributeId}>{a.attributeName}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
                                        
             
//               <div class="mt-1" />
//               <div class=" ml-4">
//                 <div class="font-bold text-xs font-poppins text-black">Price per Unit</div>
//                 <div className="w-24">
//                   <Input
//                     type="text"
//                     value={row.price}
//                     disabled
//                      onChange={(e) => handleUnitChange(index, 'price', e.target.value)}
//                     placeholder="Enter price"
//                   />
//                 </div>
//               </div>
//               <div class="mt-1" />
//               <div class=" ml-4 flex">
//                 <div className="flex flex-col">
//                 <div class="font-bold text-xs font-poppins text-black">Unit</div>
//                 <div className="w-24">
//                   <Input
//                     type="text"
//                     value={row.unit}
//                     onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
//                     placeholder="Enter unit"
//                   />
//                 </div>
//                 </div>
//                 <div className="flex flex-col">
//                 <div class="font-bold text-xs font-poppins text-black">Discount</div>
//                 <div className="w-24">
//                   <Input
//                     type="text"
//                     value={row.discount}
//                     onChange={(e) => handleUnitChange(index, 'discount', e.target.value)}
//                     placeholder="Enter discount"
//                   />
//                 </div>
//                 </div>
//               </div>
//               {/* <div className="w-4 mt-[1.5rem]">
//                 <CloseOutlined onClick={() => handleRemoveRow(index)} />
//               </div> */}
//             </div>
//           </div>
//         ))}
//         {/* <Button type="primary" onClick={handleAddRow}>Add</Button> */}
//         <Button type="primary" loading={props.addingQuotationPhoneDetails} onClick={handleSubmit}>Add</Button>
//       </div>
//       <div class="w-[55rem]">
//       <QuotationDetailsCardList />
//       </div>
//       </div>
//     </>
//   );
// }

// const mapStateToProps = ({ distributor,suppliers, brandmodel, auth }) => ({
//   userId: auth.userDetails.userId,
//   orderDetailsId: distributor.orderDetailsId,
//   addingQuotationPhoneDetails: distributor.addingQuotationPhoneDetails,
//   orgId: auth.userDetails.organizationId,
//   brand: distributor.brand,
//   model: distributor.model,
//   token: auth.token,
//   categoryList:suppliers.categoryList,
//   allProduct:distributor.allProduct,
//   locationlist:distributor.locationlist,
//   supplierSuppliesQuality:suppliers.supplierSuppliesQuality
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({
//     addQuotationPhoneDetails,
//     getBrand,
//     getModel,
//     getCategorylist,
//     getAllProductList,
//     getLocationList,
//     getSupplierSuppliesQuality
//   }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(AddQuotationExcel);
