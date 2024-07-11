import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProcureDetails, getBrand, getModel } from "../../../../../Account/AccountAction";
// import ProcureDetailsCardList from "./ProcureDetailsCardList";
import {addManual,getCategorylist} from "../../../../SuppliersAction";
import {getSaleCurrency} from "../../../../../../Auth/AuthAction";
import {getAllProductList,getLocationList} from "../../../../../Account/AccountAction";
import { base_url2 } from "../../../../../../../Config/Auth";
import LazySelect from "../../../../../../../Components/Forms/Formik/LazySelect";
import { Field } from "formik";
const { Option } = Select;

function AddManualForm(props) {
  useEffect(() => {
    // props.getBrand();
    props.getSaleCurrency();
    props.getCategorylist();
    // props.getAllProductList();
    props.getLocationList(props.orgId)
  }, []);

  const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', spces: '',price:'',quality:'',saleCurrencies:'',id:'',currencyId:'' }]);
  
  const [fieldEnabled, setFieldEnabled] = useState({
    brand: false,
    model: false,
    attribute: false,
    specs: false,
    quality: false,
    type: false,
    locationId: false,
    currencyId: false,
    price: false,
    unit: false
  });

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
    setFieldEnabled((prevState) => ({
      ...prevState,
      model: true
    }));
    props.getModel(updatedRows[index].category,value);
  };

  const handleCurrencyChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].currencyId = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      price: true
    }));
  };

  const handleQualityChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].quality = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      type: true
    }));
  };

  const handleAttributeChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].attribute = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      specs: true
    }));
   
  };
  const handleLocationChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].locationId = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      currencyId: true
    }));
  };

  const handleCategoryChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].category = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      brand: true
    }));
    props.getBrand(value);
  };
  

  const handleModelChange = (value, index) => {
    const selectedModel = props.model.find((model) => model.model === value);
    const updatedRows = [...rows];
    updatedRows[index].model = value;
    updatedRows[index].modelId = selectedModel.id; 
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      attribute: true
    }));
    props.getAllProductList(updatedRows[index].category, updatedRows[index].brand,value);
  };

  const handleSpecsChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].spces = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      quality: true
    }));
  };

  const handleTypeChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].type = value;
    setRows(updatedRows);
    setFieldEnabled((prevState) => ({
      ...prevState,
      locationId: true
    }));
  };

  const handleAddRow = () => {
    setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currency_id:'',saleCurrencies:'',id:'' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    const dataToSend = rows.map((row) => ({
      orderPhoneId: props.orderDetailsId.orderId,
      brandId: row.brand,
      modelId: row.model,
      orgId: props.orgId,
      userId: props.userId,
      unit: row.unit,
      spces: row.spces,
      type: row.type,
      price: row.price,
      quality: row.quality,
      currencyId:row.currencyId,
      category:row.category,
      attribute:row.attribute,
      location:row.locationId,
      supplierId: props.supplierId
                      
    }));

    // Make the API call
    props.addManual(dataToSend, props.userId,"0");
    setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currency_id:'',saleCurrencies:'',id:'' }]);
  };

  return (
    <>
      <div>
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex justify-around w-[30rem]">

            <div>
                <label>Category</label>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.category}
                    onChange={(value) => handleCategoryChange(value, index)}
                 >
                    {props.categoryList.map((a) => (
                      <Option key={a.id} value={a.categoryId
                      }>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label>Brand</label>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.brand}
                    onChange={(value) => handleBrandChange(value, index)}
                    disabled={!fieldEnabled.brand}
                 >
                    {props.brand.map((a) => (
                      <Option key={a.brand} value={a.brand}>{a.brand}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Model</label>
                <div className="w-[12rem]">
                  <Select
                    style={{ width: 170 }}
                    value={row.model}
                    onChange={(value) => handleModelChange(value, index)}
                    disabled={!fieldEnabled.model}
                  >
                    {props.model.map((a) => (
                      <Option key={a.model} value={a.model}>{a.model}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Attribute</label>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.attribute}
                    onChange={(value) => handleAttributeChange(value, index)}
                    disabled={!fieldEnabled.attribute}
                 >
                    {props.allProduct.map((a) => (
                      <Option key={a.attribute} value={a.attribute}>{a.attributeName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Specs</label>
                <div className="w-28 ">
                  <Select
                    style={{ width: 100 }}
                    value={row.spces}
                    onChange={(value) => handleSpecsChange(value, index)}
                    disabled={!fieldEnabled.specs}
                 >
                    <Option value="US">US</Option>
                    <Option value="CE">CE</Option>
                    <Option value="IND">IND</Option>
                    <Option value="HK">HK</Option>
                  </Select>
                </div>
              </div>
              <div>
                <label>Grade</label>
                <div className="w-28">
                <Select
                    style={{ width: 100 }}
                    value={row.quality}
                    onChange={(value) => handleQualityChange(value, index)}
                    disabled={!fieldEnabled.quality}
                  >
                     <Option value="A+">A+</Option>
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </div>
              </div>
              <div>
                <label>Type</label>
                <div className="w-28 ">
                  <Select
                    style={{ width: 100 }}
                    value={row.type}
                    onChange={(value) => handleTypeChange(value, index)}
                    disabled={!fieldEnabled.type}
                  >
                    <Option value="Finished">Finished</Option>
                    <Option value="UnFinished">UnFinished</Option>
                  </Select>
                </div>
              </div>
              
              <div>
                <label>Location</label>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.locationId}
                    onChange={(value) => handleLocationChange(value, index)}
                    disabled={!fieldEnabled.locationId}
                 >
                    {props.locationlist.map((a) => (
                      <Option key={a.locationDetailsId} value={a.locationDetailsId}>{a.locationName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Currency</label>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.currencyId}
                    onChange={(value) => handleCurrencyChange(value, index)}
                    disabled={!fieldEnabled.currencyId}
                >
                    {props.saleCurrencies.map((a) => (
                      <Option key={a.currency_id} value={a.currency_id}>{a.currency_name}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Price / Unit</label>
                <div className="w-28">
                  <Input
                    type="text"
                    value={row.price}
                    onChange={(e) => handleUnitChange(index, 'price', e.target.value)}
                    placeholder="Enter Price"
                    disabled={!fieldEnabled.price}
                  />
                </div>
              </div>
             
              <div>
                <label>Units</label>
                <div className="w-28">
                  <Input
                    type="text"
                    value={row.unit}
                    onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
                    placeholder="Enter unit"
                    // disabled={!fieldEnabled.unit}
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
        <Button type="primary" loading={props.addingManual} onClick={handleSubmit}>Submit</Button>
      </div>
      {/* <ProcureDetailsCardList /> */}
    </>
  );
}

const mapStateToProps = ({ distributor, brandmodel, auth,suppliers }) => ({
  userId: auth.userDetails.userId,
  orderDetailsId: distributor.orderDetailsId,
  addingProcureDetails: distributor.addingProcureDetails,
  orgId: auth.userDetails.organizationId,
  brand: distributor.brand,
  model: distributor.model,
  token: auth.token,
  saleCurrencies:auth.saleCurrencies,
  categoryList:suppliers.categoryList,
  allProduct:distributor.allProduct,
  locationlist:distributor.locationlist,
  addingManual:suppliers.addingManual,
  supplierId: suppliers.supplierDetailById.supplierId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addManual,
    getBrand,
    getModel,
    getSaleCurrency,
    getCategorylist,
    getAllProductList,
    getLocationList
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddManualForm);












