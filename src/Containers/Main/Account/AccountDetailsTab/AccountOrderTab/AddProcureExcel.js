import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../../Suppliers/SuppliersAction"
import { addProcureDetails, getBrand, getModel,getAllProductList,getLocationList } from "../../AccountAction";
import ProcureDetailsCardList from "./ProcureDetailsCardList";

const { Option } = Select;

function AddProcureExcel(props) {
  useEffect(() => {
    // props.getBrand();
    props.getSaleCurrency()
    props.getCategorylist();
    // props.getAllProductList();
    props.getLocationList(props.orgId);
    props.getSupplierSuppliesQuality();
  }, []);

  const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', specs: '' }]);

  const handleUnitChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };
  const handlePriceChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleBrandChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].brand = value;
    updatedRows[index].model = ""; // Reset model when brand changes
    updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    props.getModel(updatedRows[index].category,value);
  };

  const handleModelChange = (value, index) => {
    const selectedModel = props.model.find((model) => model.model === value);
    const updatedRows = [...rows];
    updatedRows[index].model = value;
    updatedRows[index].modelId = selectedModel.id; // Assuming model object has an 'id' field
    setRows(updatedRows);
    props.getAllProductList(updatedRows[index].category, updatedRows[index].brand,value);
  };

  const handleSpecsChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].specs = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',price:"", }]);
  };
  const handleCategoryChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].category = value;
    // updatedRows[index].model = ""; // Reset model when brand changes
    // updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    props.getBrand(value);
  };
  const handleQualityChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].quality = value;
    // updatedRows[index].model = ""; // Reset model when brand changes
    // updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    //props.getModel(value);
  };
  
  const handleLocationChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].locationId = value;
    setRows(updatedRows);
   
  };
  const handleAttributeChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].attribute = value;
    setRows(updatedRows);
   
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleCurrencyChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].currencyId = value;
    // updatedRows[index].model = ""; // Reset model when brand changes
    // updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    //props.getModel(value);
  };

  const handleSubmit = () => {
    const dataToSend = rows.map((row) => ({
      orderPhoneId: props.orderDetailsId.orderId,
      brandId: row.brand,
      modelId: row.model,
      unit: row.unit,
      price:row.price,
      specs: row.specs,
      category:row.category ,
      attribute:row.attribute,
      location:row.locationId,
      quality: row.quality,
      currency:row.currencyId,
    }));

    // Make the API call
    props.addProcureDetails(dataToSend, props.orderDetailsId.orderId);
    setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:"" }]);
  };

  return (
    <>
      <div>
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex justify-around w-[30rem]">
            <div>
                <div class="font-bold text-xs font-poppins text-black">Category</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.category}
                    onChange={(value) => handleCategoryChange(value, index)}
                  >
                    {props.categoryList.map((a) => (
                      <Option key={a.categoryId} value={a.categoryId}>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
           
              <div>
                <div class="font-bold text-xs font-poppins text-black">Brand</div>
                <div className="w-[13rem]">
                  <Select
                    style={{ width: 200 }}
                    value={row.brand}
                    onChange={(value) => handleBrandChange(value, index)}
                  >
                    {props.brand.map((a) => (
                      <Option key={a.brand} value={a.brand}>{a.brandName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Model</div>
                <div className="w-[13rem]">
                  <Select
                    style={{ width: 200 }}
                    value={row.model}
                    onChange={(value) => handleModelChange(value, index)}
                  >
                    {props.model.map((a) => (
                      <Option key={a.model} value={a.model}>{a.model}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Attribute</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.attribute}
                    onChange={(value) => handleAttributeChange(value, index)}
                  >
                    {props.allProduct.map((a) => (
                      <Option key={a.attributeId} value={a.attributeId}>{a.attributeName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Quality</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.quality}
                    onChange={(value) => handleQualityChange(value, index)}
                  >
                    {props.supplierSuppliesQuality.map((a) => (
                      <Option key={a.qualityId} value={a.qualityId}>{a.code}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">Location</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.locationId}
                    onChange={(value) => handleLocationChange(value, index)}
                  >
                    {props.locationlist.map((a) => (
                      <Option key={a.locationDetailsId} value={a.locationDetailsId}>{a.locationName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Specs</div>
                <div className="w-24 ml-2">
                  <Select
                    style={{ width: 100 }}
                    value={row.specs}
                    onChange={(value) => handleSpecsChange(value, index)}
                  >
                    <Option value="US">US</Option>
                    <Option value="CE">CE</Option>
                    <Option value="IND">IND</Option>
                    <Option value="HK">HK</Option>
                  </Select>
                </div>
              </div>
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">Price</div>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.price}
                    onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
              </div>
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">Currency</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.currencyId}
                    onChange={(value) => handleCurrencyChange(value, index)}
                  >
                    {props.saleCurrencies.map((a) => (
                      <Option key={a.currency_id} value={a.currency_id}>{a.currency_name}</Option>
                    ))}
                  </Select>
                </div>
              </div>
             
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">Unit</div>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.unit}
                    onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
                    placeholder="Enter unit"
                  />
                </div>
              </div>
             
              <div className="w-4 mt-[1.5rem]">
                <CloseOutlined onClick={() => handleRemoveRow(index)} />
              </div>
            </div>
          </div>
        ))}
        <Button type="primary" onClick={handleAddRow}>Add</Button>
        <Button type="primary" loading={props.addingProcureDetails} onClick={handleSubmit}>Submit</Button>
      </div>
      <ProcureDetailsCardList />
    </>
  );
}

const mapStateToProps = ({ distributor,suppliers, brandmodel, auth }) => ({
  userId: auth.userDetails.userId,
  orderDetailsId: distributor.orderDetailsId,
  addingProcureDetails: distributor.addingProcureDetails,
  orgId: auth.userDetails.organizationId,
  brand: distributor.brand,
  model: distributor.model,
  token: auth.token,
  categoryList:suppliers.categoryList,
  allProduct:distributor.allProduct,
  locationlist:distributor.locationlist,
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality,
  saleCurrencies: auth.saleCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addProcureDetails,
    getBrand,
    getModel,
    getSaleCurrency,
    getCategorylist,
    getAllProductList,
    getLocationList,
    getSupplierSuppliesQuality
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProcureExcel);











// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Select } from "antd";
// import { Formik, Form, Field } from "formik";
//  import { addProcureDetails } from "../../AccountAction"
// import DraggableUpload1 from "../../../../../Components/Forms/Formik/DraggableUpload1";
// import { FormattedMessage } from 'react-intl';
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// const { Option } = Select;  
// function AddProcureExcel(props) {

//     const [brandModel, setBrandModel] = useState([]);
//     const [touchedBrand, setTouchedBrand] = useState(false);
//     const [isLoadingBrand, setIsLoadingBrand] = useState(false);
//     const [selectedBrand, setSelectedBrand] = useState(null);
//     const fetchBrand = async () => {
//         setIsLoadingBrand(true);
//         try {
//           const apiEndpoint = `https://develop.tekorero.com/Erp/masterlist/masterList`;
//           const response = await fetch(apiEndpoint,{
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${props.token}`,
//               'Content-Type': 'application/json',
//               // Add any other headers if needed
//             },
//           });
//           const data = await response.json();
//           setBrandModel(data);
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         } finally {
//             setIsLoadingBrand(false);
//         }
//       };
    
//       const handleSelectChange = (value) => {
//         setSelectedBrand(value)
//         console.log('Selected user:', value);
//       };
//     console.log(selectedBrand)
//     const handleSelectFocus = () => {
//         if (!touchedBrand) {
         
//           fetchBrand();
    
//           setTouchedBrand(true);
//         }
//       };
    



//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     orderPhoneId: props.orderDetailsId.orderId,
//                     unit: "",
//                     userId: props.userId,
//                     orgId: props.orgId,
                   

//                 }}
//                 onSubmit={(values, { resetForm }) => {
//                     console.log(values)
//                     props.addProcureDetails(

//                         {
//                             ...values,
//                 brand: selectedBrand,
//                             distributorId: props.distributorId,
//                             // type: "Non-Catalogue"
//                         },
//                         props.distributorId
//                     );

//                 }}
//             >
//                 {({
//                     errors,
//                     touched,
//                     isSubmitting,
//                     setFieldValue,
//                     setFieldTouched,
//                     values,
//                     ...rest
//                 }) => (
//                     <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
//                         <Form class="form-background">
//                             <div class="justify-between flex mt-3">
//                             <div class="h-full w-[45%]">
//                             <div class=" flex justify-between">
//                             {/* <div class="w-[45%]">
//                                         <Field
//                                             label="Quality"
//                                             name="quality"
//                                             component={InputComponent}
//                                             inlineLabel
//                                             width={"100%"}
//                                             isColumn
//                                         />
//                                         </div> */}
//                                         <div class="w-[45%]">
//                                         <Field
//                                                 label="Units"
//                                                 name="unit"
//                                                 component={InputComponent}
//                                                 inlineLabel
//                                                 width={"100%"}
//                                                 isColumn
//                                             />
                                               
//                                         </div>
//                                         </div>
//                                         </div>
//                                 <div class="h-full w-[45%]">
                                 
//                                     <div class=" flex justify-between">
//                                     <div class="w-w47.5" style={{display:"flex",flexDirection:"column"}}>
//                       {/* <FastField
//                         name="source"
//                         type="text"
//                         label={
//                           <FormattedMessage
//                             id="app.source"
//                             defaultMessage="Source"
//                           />
//                         }
//                         isColumnWithoutNoCreate
//                         selectType="sourceName"
//                         component={SearchSelect}
//                         value={values.source}
//                         inlineLabel
//                         className="field"
//                         isColumn
//                       /> */}

// <div style={{fontWeight:"bold",fontSize:"0.75rem"}}>Brand</div>

// <Select
//         showSearch
//         style={{ width: 200 }}
//         placeholder="Search or select brand"
//         optionFilterProp="children"
//         loading={isLoadingBrand}
//         onFocus={handleSelectFocus}
//         onChange={handleSelectChange}
//       >
//         {brandModel.map(item => (
//           <Option key={item.phoneMasterListId} value={item.phoneMasterListId}>
//             {item.brand} {item.model}
//           </Option>
//         ))}
//       </Select>
//                     </div>
                                       
//                                     </div>
//                                 </div>
//                                 </div>
//                             <div class="justify-end flex mt-3">
//                                 <Button
//                                     type="primary"
//                                     htmlType="submit"
//                                      loading={props.addingProcureDetails}
//                                 >
//                                     <FormattedMessage
//                                         id="app.finish"
//                                         defaultMessage="Finish"
//                                     />
//                                 </Button>
//                             </div>
//                         </Form>
//                     </div>
//                 )}
//             </Formik>
//         </>
//     );
// }
// const mapStateToProps = ({ auth, distributor,brandmodel }) => ({
//     userId: auth.userDetails.userId,
//     orderDetailsId: distributor.orderDetailsId,
//     addingProcureDetails: distributor.addingProcureDetails,
//     orgId: auth.userDetails.organizationId,
//     brandModel: brandmodel.brandModel,
//     token: auth.token,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//           addProcureDetails
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AddProcureExcel);

