import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProcureDetails, getBrand, getModel } from "../../../../../Account/AccountAction";
// import ProcureDetailsCardList from "./ProcureDetailsCardList";
import {addManual,getCategorylist} from "../../../../SuppliersAction";
import {getCurrency} from "../../../../../../Auth/AuthAction";
import { base_url2 } from "../../../../../../../Config/Auth";
import LazySelect from "../../../../../../../Components/Forms/Formik/LazySelect";
import { Field } from "formik";
const { Option } = Select;

function AddManualForm(props) {
  useEffect(() => {
    props.getBrand();
    props.getCurrency();
    props.getCategorylist();
  }, []);

  const [rows, setRows] = useState([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currencies:'',id:'' }]);

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
    props.getModel(value);
  };

  const handleCurrencyChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].currencies = value;
    // updatedRows[index].model = ""; // Reset model when brand changes
    // updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    //props.getModel(value);
  };

  const handleCategoryChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].category = value;
    // updatedRows[index].model = ""; // Reset model when brand changes
    // updatedRows[index].modelId = ""; // Reset modelId when brand changes
    setRows(updatedRows);
    //props.getModel(value);
  };
  

  const handleModelChange = (value, index) => {
    const selectedModel = props.model.find((model) => model.model === value);
    const updatedRows = [...rows];
    updatedRows[index].model = value;
    updatedRows[index].modelId = selectedModel.id; // Assuming model object has an 'id' field
    setRows(updatedRows);
  };

  const handleSpecsChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].specs = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currency_id:'',currencies:'',id:'' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    const dataToSend = rows.map((row) => ({
      orderPhoneId: props.orderDetailsId.orderId,
      brandId: row.modelId,
      unit: row.unit,
      specs: row.specs,
      price: row.price,
      quality: row.quality,
      currencies:row.currencies,
      category:row.category
                      
    }));

    // Make the API call
    props.addManual(dataToSend, props.orderDetailsId.orderId);
    setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currency_id:'',currencies:'',id:'' }]);
  };

  return (
    <>
      <div>
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex justify-around w-[30rem]">

            <div>
                <label>Category</label>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.category}
                    onChange={(value) => handleCategoryChange(value, index)}
                  >
                    {props.categoryList.map((a) => (
                      <Option key={a.id} value={a.id}>{a.categoryName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
 {/* <div className="w-[9rem]">
                      <Field
                        isRequired
                        name="categoryName"
                        label="Category"
                        placeholder="Search or Create"
                        optionLabel="categoryName"
                        optionValue="categoryName"
                        url={`${base_url2}/product/category`}
                        component={LazySelect}
                        isColumn
                        inlineLabel

                      />
                    </div> */}
              <div>
                <label>Brand</label>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.brand}
                    onChange={(value) => handleBrandChange(value, index)}
                  >
                    {props.brand.map((a) => (
                      <Option key={a.brand} value={a.brand}>{a.brand}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <label>Model</label>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
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
                <label>Specs</label>
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
              <div>
                <label>Quality</label>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.quality}
                    onChange={(e) => handleUnitChange(index, 'quality', e.target.value)}
                    placeholder="Enter Quality"
                  />
                </div>
              </div>
              <div>
                <label>Units</label>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.unit}
                    onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
                    placeholder="Enter unit"
                  />
                </div>
              </div>
              <div>
                <label>Price</label>
                <div className="w-24">
                  <Input
                    type="text"
                    value={row.price}
                    onChange={(e) => handleUnitChange(index, 'price', e.target.value)}
                    placeholder="Enter Price"
                  />
                </div>
              </div>
              <div>
                <label>Currency</label>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 120 }}
                    value={row.currencies}
                    onChange={(value) => handleCurrencyChange(value, index)}
                  >
                    {props.currencies.map((a) => (
                      <Option key={a.currency_id} value={a.currency_id}>{a.currency_name}</Option>
                    ))}
                  </Select>
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
  currencies:auth.currencies,
  categoryList:suppliers.categoryList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addManual,
    getBrand,
    getModel,
    getCurrency,
    getCategorylist
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddManualForm);












