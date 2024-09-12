import { Field, Form, Formik } from 'formik'
import React, { useState,useEffect, lazy, Suspense } from 'react'
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../Components/Forms/Formik/InputComponent';
import { Button, Input, Select } from 'antd';
import {getProducts} from "../../../../Product/ProductAction";
import { getAllProductList, saveUnitForCatalogueItem,getBrand, getModel, } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import {getCategorylist} from "../../../Suppliers/SuppliersAction";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { BundleLoader } from '../../../../../Components/Placeholder';

const AddCatalogueTable = lazy(() => import("./AddCatalogueTable"));
const { Option } = Select;

const FormSchema = Yup.object().shape({
    quantity: Yup.string().required("Input needed!"),
})

const AddCatalogueForm = (props) => {
  useEffect(() => {
      props.getProducts("0");
  }, [])

  const catalogueOption = props.products.length && props.products
      .sort(function (a, b) {
          var nameA = a.projectName; // ignore upper and lowercase
          var nameB = b.projectName; // ignore upper and lowercase
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          // names must be equal
          return 0;
      }).map((item) => {
          return {
              label: item.productFullName,
              value: item.productId
          }
      })

  function handleProductList(a, setFieldValue) {
      return props.products.map((item) => {
          if (item.productId === a) {
              setFieldValue("productId", item.productId);
              setFieldValue("name", item.name);
              setFieldValue("categoryName", item.categoryName);
              setFieldValue("subCategoryName", item.subCategoryName);
              setFieldValue("attributeName", item.attributeName);
              setFieldValue("subAttributeName", item.subAttributeName)
          }
      });
  }
  return (
      <>
          {props.fetchingAllProductList ? <BundleLoader /> :
              <>
                  <Formik
                      enableReinitialize
                      initialValues={{
                          type: "Catalogue",
                          productId: "",
                          quantity: "",
                          productName: "",
                          categoryName: "",
                          subCategoryName: "",
                          attributeName: "",
                          subAttributeName: "",
                          distributorDiscountSubType: "amount",
                          marginType: "amount",
                          distributorDiscountType: "cash",
                          orderId: props.productionOrderId.orderId 
                      }}
                      validationSchema={FormSchema}
                      onSubmit={(values, { resetForm }) => {
                          console.log(values)
                          props.saveUnitForCatalogueItem(
                              {
                                  ...values,
                                  distributorId: props.distributorId,
                                  orderId: props.productionOrderId.orderId,
                                  orgId: props.orgId
                              },
                              props.distributorId,
                              props.productionOrderId.orderId
                          );
                          resetForm();
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
                              <div class="justify-between flex mx-4">
                                  <div class="w-[33%]">
                                      <Field
                                          name="productId"
                                          label={<FormattedMessage
                                              id="app.items"
                                              defaultMessage="Items"
                                          />}
                                          isRequired
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={SelectComponent}
                                          onSelect={(e) => {
                                              console.log(e);
                                              handleProductList(e, setFieldValue);
                                          }}
                                          options={Array.isArray(catalogueOption) ? catalogueOption : []}
                                          style={{
                                              borderRight: "0.18em solid red",
                                          }}
                                      />
                                  </div>
                                  <div class="w-[30%]">
                                      <Field
                                          name="categoryName"
                                          label={<FormattedMessage
                                              id="app.category"
                                              defaultMessage="Category"
                                          />}
                                          disabled
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={InputComponent}
                                      />
                                  </div>
                                  <div class="w-[30%]">
                                      <Field
                                          name="subCategoryName"
                                          label={<FormattedMessage
                                              id="app.subcategory"
                                              defaultMessage="Sub Category"
                                          />}
                                          disabled
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={InputComponent}
                                      />
                                  </div>
                              </div>
                              <div class="justify-between flex mx-4">
                                  <div class="w-[25%]">
                                      <Field
                                          name="attributeName"
                                          label={<FormattedMessage
                                              id="app.attribute"
                                              defaultMessage="Attribute"
                                          />}
                                          disabled
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={InputComponent}
                                      />
                                  </div>
                                  <div class="w-[25%]">
                                      <Field
                                          name="subAttributeName"
                                          label={<FormattedMessage
                                              id="app.subattribute"
                                              defaultMessage="Sub Attribute"
                                          />}
                                          disabled
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={InputComponent}
                                      />
                                  </div>
                                  <div class="w-[25%]">
                                      <Field
                                          name="quantity"
                                          label={<FormattedMessage
                                              id="app.unit"
                                              defaultMessage="Unit"
                                          />}
                                          isRequired
                                          isColumn
                                          inlineLabel
                                          width={"100%"}
                                          component={InputComponent}
                                      />
                                  </div>
                                  <div class="w-[15%] mt-4">
                                      <Button
                                          type="primary"
                                          htmlType="submit"
                                          loading={props.addingUnitForCatalogueItem}
                                      >
                                          <FormattedMessage
                                              id="app.submit"
                                              defaultMessage="Submit"
                                          />
                                      </Button>
                                  </div>
                              </div>
                          </Form>
                      )}
                  </Formik>
                  <Suspense fallback={"Loading"}>
                      <AddCatalogueTable
                          distributorId={props.distributorId}
                          orderId={props.productionOrderId.orderId}
                          toggle={props.toggle} />
                  </Suspense>
              </>
          }
      </>
  )
}



const mapStateToProps = ({ distributor,suppliers,product, auth }) => ({
    allProduct: distributor.allProduct,
    orgId: auth.userDetails.organizationId,
    productionOrderId: distributor.productionOrderId,
    fetchingAllProductList: distributor.fetchingAllProductList,
    addingUnitForCatalogueItem: distributor.addingUnitForCatalogueItem,
    categoryList:suppliers.categoryList,
    brand: distributor.brand,
    model: distributor.model,
    products:product.products
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
    saveUnitForCatalogueItem,
    getCategorylist,
    getBrand,
    getModel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueForm);






// function AddCatalogueForm(props) {
  

//   useEffect(() => {
//       props.getCategorylist();
//     }, []);

//   const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', specs: '' }]);

//   const handleUnitChange = (index, key, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][key] = value;
//     setRows(updatedRows);
//   };
//   const handlePriceChange = (index, key, value) => {
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
//     setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',price:"", }]);
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

//   const handleCurrencyChange = (value, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].currencyId = value;
//     // updatedRows[index].model = ""; // Reset model when brand changes
//     // updatedRows[index].modelId = ""; // Reset modelId when brand changes
//     setRows(updatedRows);
//     //props.getModel(value);
//   };

//   const handleSubmit = () => {

//     const row = rows[0];

//     const dataToSend = {
//       distributorId: props.distributorId,
//       orderId: props.productionOrderId.orderId,
//       // orgId: props.orgId,
//       brand: row.brand,
//       model: row.model,
//       units: row.unit,
//       // price:row.price,
//       // specs: row.specs,
//       categoryName:row.category ,
//       attributeName:row.attribute,
//       // location:row.locationId,
//       // quality: row.quality,
//       // currency:row.currencyId,
//       distributorDiscountSubType: "amount",
//       marginType: "amount",
//       distributorDiscountType: "cash",
//       type: "Catalogue",
//     };

//     props.saveUnitForCatalogueItem(dataToSend, props.distributorId,
//       props.productionOrderId.orderId);
//     setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:"" }]);
//   };

//   return (
//     <>
//       <div>
//         {rows.map((row, index) => (
//           <div key={index}>
//             <div className="flex justify-around w-[30rem]">
//             <div>
//                 <div class="font-bold text-xs font-poppins text-black">Category</div>
//                 <div className="w-[9rem]">
//                   <Select
//                     style={{ width: 120 }}
//                     value={row.category}
//                     onChange={(value) => handleCategoryChange(value, index)}
//                   >
//                     {props.categoryList.map((a) => (
//                       <Option key={a.categoryId} value={a.categoryId}>{a.categoryName}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
           
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Brand</div>
//                 <div className="w-[13rem]">
//                   <Select
//                     style={{ width: 200 }}
//                     value={row.brand}
//                     onChange={(value) => handleBrandChange(value, index)}
//                   >
//                     {props.brand.map((a) => (
//                       <Option key={a.brand} value={a.brand}>{a.brand}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
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
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Attribute</div>
//                 <div className="w-[7rem]">
//                   <Select
//                     style={{ width: 100 }}
//                     value={row.attribute}
//                     onChange={(value) => handleAttributeChange(value, index)}
//                   >
//                     {props.allProduct.map((a) => (
//                       <Option key={a.attribute} value={a.attribute}>{a.attributeName}</Option>
//                     ))}
//                   </Select>
//                 </div>
//               </div>
            
             
//               <div class=" ml-2">
//                 <div class="font-bold text-xs font-poppins text-black">Unit</div>
//                 <div className="w-24">
//                   <Input
//                     type="text"
//                     value={row.unit}
//                     onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
//                     placeholder="Enter unit"
//                   />
//                 </div>
//               </div>
             
//               {/* <div className="w-4 mt-[1.5rem]">
//                 <CloseOutlined onClick={() => handleRemoveRow(index)} />
//               </div> */}
//             </div>
//           </div>
//         ))}
//         {/* <Button type="primary" onClick={handleAddRow}>Add</Button> */}
//         <Button type="primary" loading={props.addingProcureDetails} onClick={handleSubmit}>Submit</Button>
//       </div>
//       <AddCatalogueTable
//                           distributorId={props.distributorId}
//                           orderId={props.productionOrderId.orderId}
//                           toggle={props.toggle} />
//     </>
//   );
// }