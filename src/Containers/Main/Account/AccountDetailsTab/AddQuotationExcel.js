import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import { addQuotationPhoneDetails, getBrand, getModel,getAllProductList,getLocationList } from "../AccountAction";
import QuotationDetailsCardList from "./QuotationDetailsCardList";

const { Option } = Select;

function AddQuotationExcel(props) {
  useEffect(() => {
    // props.getBrand();
    props.getCategorylist();
    // props.getAllProductList();
    props.getLocationList(props.orgId);
    props.getSupplierSuppliesQuality();
  }, []);

  const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', specs: '',location:''  }]);

  const handleUnitChange = (index, key, value) => {
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
    setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',location:'' }]);
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

  const handleSubmit = () => {
    const dataToSend = rows.map((row) => ({
      orderPhoneId: props.orderDetailsId.quotationId,
      brandId: row.brand,
      modelId: row.model,
      orderType:"Procure",
      unit: row.unit,
      specs: row.specs,
      category:row.category ,
      attribute:row.attribute,
      // location:row.locationId,
      location: row.location,
      quality: row.quality,
      price: row.price
    }));

    // Make the API call
    props.addQuotationPhoneDetails(dataToSend, props.orderDetailsId.quotationId);
    setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',location:'' }]);
  };

  return (
    <>
    <div class="flex justify-between">
      <div class="w-[18rem] box-content p-2 border-blue border-4">
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex-col">

            <div>
                <div class="font-bold text-xs font-poppins text-black">Category</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 200 }}
                    value={row.category}
                    onChange={(value) => handleCategoryChange(value, index)}
                  >
                    {props.categoryList.map((a) => (
                      <Option key={a.id} value={a.categoryId}>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
           <div class="mt-1" />
              <div>
                <div class="font-bold text-xs font-poppins text-black">Brand</div>
                <div className="w-[13rem]">
                  <Select
                    style={{ width: 200 }}
                    value={row.brand}
                    onChange={(value) => handleBrandChange(value, index)}
                  >
                    {props.brand.map((a) => (
                      <Option key={a.brand} value={a.brand}>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div class="mt-1" />
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
              <div class="mt-1" />
              <div>
                <div class="font-bold text-xs font-poppins text-black">Attribute</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 200 }}
                    value={row.attribute}
                    onChange={(value) => handleAttributeChange(value, index)}
                  >
                    {props.allProduct.map((a) => (
                      <Option key={a.attribute} value={a.attribute}>{a.attributeName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
                                        
              <div class="mt-1" />
              <div class=" ml-4">
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
              <div class="mt-1" />
              <div class=" ml-4">
                <div class="font-bold text-xs font-poppins text-black">Price per Unit</div>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.price}
                     onChange={(e) => handleUnitChange(index, 'price', e.target.value)}
                    placeholder="Enter price"
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
        <Button type="primary" loading={props.addingQuotationPhoneDetails} onClick={handleSubmit}>Submit</Button>
      </div>
      <div class="w-[55rem]">
      <QuotationDetailsCardList />
      </div>
      </div>
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
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality
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











