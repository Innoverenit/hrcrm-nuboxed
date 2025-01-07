import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../../Suppliers/SuppliersAction"
import { addProcureDetails, getBrand, getModel,getAllProductList,getLocationList } from "../../AccountAction";
import ProcureDetailsCardList from "./ProcureDetailsCardList";

const { Option } = Select;

function AddProcureExcel(props) {
 const [isCategoryDropdownClicked, setIsCategoryDropdownClicked] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [currencyOpts, setcurrencyOpts] = useState([]);
  const [isCurrencyDropdownClick, setIsCurrencyDropdownClick] = useState(false);
const [IsLocDropdownClick, setIsLocDropdownClick] =useState(false);
const [LocationOpts,setLocationOpts]= useState([]);
const [IsQualityDropdownClick, setIsQualityDropdownClick] = useState(false);
const [QualityOpts,setQualityOpts] = useState([]);

  const fetchCategoryData = () => {
    if (!isCategoryDropdownClicked) {
      props.getCategorylist();
      setIsCategoryDropdownClicked(true);
    }
  };
  useEffect(() => {
    if (props.categoryList && props.categoryList.length > 0) {
      setCategoryOptions(props.categoryList);
    }
  }, [props.categoryList]);

const fetchCurrency = () => {
    if (!isCurrencyDropdownClick) {
      props.getSaleCurrency();
      setIsCurrencyDropdownClick(true);
    }
  };
  useEffect(() => {
    if (props.saleCurrencies && props.saleCurrencies.length > 0) {
      setcurrencyOpts(props.saleCurrencies);
    }
  }, [props.saleCurrencies]);

const fetchLocationList =()=>{
  if (!IsLocDropdownClick) {
    props.getLocationList(props.orgId);
    setIsLocDropdownClick(true);
  }
}
useEffect(() => {
  if (props.locationlist && props.locationlist.length > 0) {
    setLocationOpts(props.locationlist);
  }
}, [props.locationlist]);

const fetchSupplierSuppliesQuality = () => {
  if (!IsQualityDropdownClick) {
    props.getSupplierSuppliesQuality(props.orgId);
    setIsQualityDropdownClick(true);
  }
}
useEffect(() => {
  if (props.supplierSuppliesQuality && props.supplierSuppliesQuality.length > 0) {
    setQualityOpts(props.supplierSuppliesQuality);
  }
}, [props.supplierSuppliesQuality]);

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
    setRows(updatedRows);

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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[31]}</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.category}
                    onChange={(value) => handleCategoryChange(value, index)}
                    onClick={fetchCategoryData}
                  >
                    {categoryOptions.map((a) => (
                      <Option key={a.categoryId} value={a.categoryId}>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
           
              <div>
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[69]}</div>
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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[70]}</div>
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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[123]}</div>
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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[146]}</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.quality}
                    onChange={(value) => handleQualityChange(value, index)}
                    onClick={fetchSupplierSuppliesQuality}
                  >
                    {QualityOpts.map((a) => (
                      <Option key={a.qualityId} value={a.qualityId}>{a.code}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[21]}</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.locationId}
                    onChange={(value) => handleLocationChange(value, index)}
                    onClick={fetchLocationList}
                  >
                    {LocationOpts.map((a) => (
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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[124]}</div>
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
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[116]}</div>
                <div className="w-[7rem]">
                  <Select
                    style={{ width: 100 }}
                    value={row.currencyId}
                    onChange={(value) => handleCurrencyChange(value, index)}
                    onClick={fetchCurrency}
                  >
                    {currencyOpts.map((a) => (
                      <Option key={a.currency_id} value={a.currency_id}>{a.currency_name}</Option>
                    ))}
                  </Select>
                </div>
              </div>
             
              <div class=" ml-2">
                <div class="font-bold text-xs font-poppins text-black">{props.translatedMenuItems[125]}</div>
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
                <CloseIcon onClick={() => handleRemoveRow(index)} />
              </div>
            </div>
          </div>
        ))}
        <Button type="primary" onClick={handleAddRow}>{props.translatedMenuItems[164]}</Button>
        <Button type="primary" loading={props.addingProcureDetails} onClick={handleSubmit}>{props.translatedMenuItems[84]}</Button>
      </div>
      <ProcureDetailsCardList translatedMenuItems={props.translatedMenuItems}/>
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
