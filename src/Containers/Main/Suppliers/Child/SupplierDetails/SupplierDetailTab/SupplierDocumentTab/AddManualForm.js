import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBrand, getModel } from "../../../../../Account/AccountAction";
import {addManual,getCategorylist} from "../../../../SuppliersAction";
import {getSaleCurrency} from "../../../../../../Auth/AuthAction";
import {getAllProductList,getLocationList} from "../../../../../Account/AccountAction";
import InventoryTableList from "./InventoryTableList";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const { Option } = Select;

function AddManualForm(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
     props.getBrand();
    props.getSaleCurrency();
    props.getCategorylist();
    props.getModel();
     props.getAllProductList();
    props.getLocationList(props.orgId)
  }, []);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
          
           
            "14",//0 Category
            "264",//1 Brand
            "265",//2 Model
            "259",//3 Attribute
            "71",//4 type
            "241",//5 currency
            "788",//6 Price/ Units
            "260",//7 Units
           "85",//Add
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);

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
   // props.getModel(updatedRows[index].category,value);
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
  //  props.getBrand(value);
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
    //props.getAllProductList(updatedRows[index].category, updatedRows[index].brand,value);
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
      supplierId: props.supplierId,
      source:"erp"
                      
    }));

    // Make the API call
    props.addManual(dataToSend, props.userId,"0");
    setRows([{ brand: '', model: '', modelId: '', unit: '', specs: '',price:'',quality:'',currency_id:'',saleCurrencies:'',id:'' }]);
  };

  return (
    <>

    <div className="flex justify-between">
      <div class="w-[22%] box-content p-2 border-blue border-4">
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex justify-around  flex-col">

            <div>
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[0]}
                  {/* Category */}
                  </div>
                <div className="w-full">
                  <Select
                   
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
                <div class="font-bold text-xs mt-1 font-poppins text-black"> {translatedMenuItems[1]}
                  {/* Brand */}
                  </div>
                <div className="w-full">
                  <Select
                   
                    value={row.brand}
                    onChange={(value) => handleBrandChange(value, index)}
                   // disabled={!fieldEnabled.brand}
                 >
                    {props.brand.map((a) => (
                      <Option key={a.brand} value={a.brand}>{a.brandName}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs mt-1 font-poppins text-black"> {translatedMenuItems[2]}
                  {/* Model */}
                  </div>
                <div className="w-full">
                  <Select
                 
                    value={row.model}
                    onChange={(value) => handleModelChange(value, index)}
                   // disabled={!fieldEnabled.model}
                  >
                    {props.model.map((a) => (
                      <Option key={a.phoneMasterListId} value={a.phoneMasterListId}>{a.model}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <div class="font-bold text-xs mt-1 font-poppins text-black"> {translatedMenuItems[3]}
                  {/* Attribute */}
                  </div>
                <div className="">
                  <Select
                 
                    value={row.attribute}
                    onChange={(value) => handleAttributeChange(value, index)}
                  //  disabled={!fieldEnabled.attribute}
                 >
                  
                     <Option value="SADG84650329032252024">SADG84650329032252024</Option>
                    
                  </Select>
                </div>
              </div>
        
              <div>
                <div class="font-bold text-xs mt-1 font-poppins text-black"> {translatedMenuItems[4]}
                  {/* Type */}
                  </div>
                <div className="w-full">
                  <Select
                   
                    value={row.type}
                    onChange={(value) => handleTypeChange(value, index)}
                    //disabled={!fieldEnabled.type}
                  >
                    <Option value="Finished">Finished</Option>
                    <Option value="UnFinished">UnFinished</Option>
                  </Select>
                </div>
              </div>
              
         
              <div>
                <div class="font-bold text-xs mt-1 font-poppins text-black"> {translatedMenuItems[5]}
                  {/* Currency */}
                  </div>
                <div className="">
                  <Select
                   
                    value={row.currencyId}
                    onChange={(value) => handleCurrencyChange(value, index)}
                    //disabled={!fieldEnabled.currencyId}
                >
                    {props.saleCurrencies.map((a) => (
                      <Option key={a.currency_id} value={a.currency_id}>{a.currency_name}</Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div class="flex justify-between mt-1 w-[100%]">
              <div className="w-1/2">
                <div class="font-bold text-xs mt-1  font-poppins text-black"> {translatedMenuItems[6]}
                  {/* Price / Unit */}
                  </div>
                <div className="w-full">
                  <Input
                    type="text"
                    value={row.price}
                    onChange={(e) => handleUnitChange(index, 'price', e.target.value)}
                    placeholder="Enter Price"
                    //disabled={!fieldEnabled.price}
                  />
                </div>
              </div>
             
              <div className="w-1/2 ml-gap mb-2">
                <div class="font-bold text-xs mt-1  font-poppins text-black">{translatedMenuItems[7]}
                  {/* Units */}
                  </div>
                <div className="w-full">
                  <Input
                    type="text"
                    value={row.unit}
                    onChange={(e) => handleUnitChange(index, 'unit', e.target.value)}
                    placeholder="Enter unit"
                    // disabled={!fieldEnabled.unit}
                  />
                </div>
              </div>
              </div>

            </div>
          </div>
        ))}
        {/* <Button type="primary" onClick={handleAddRow}>Add</Button> */}
        <div class="flex justify-end ">
        
        <Button type="primary" loading={props.addingManual} onClick={handleSubmit}> <DataSaverOnIcon className="!text-icon"/>{translatedMenuItems[8]}
          {/* Add */}
          </Button>
        </div>
      </div>

      <InventoryTableList
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}/>
          </div>
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












