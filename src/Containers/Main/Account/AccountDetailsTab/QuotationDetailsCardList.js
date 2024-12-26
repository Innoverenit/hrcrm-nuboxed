import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  getQuotationExcelDetails,
  deleteProcureData,
  getBrand,
  getModel,
  updateProcureDetails,
  getAllProductList,
  getLocationList
} from "../AccountAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";

import { BundleLoader } from "../../../../Components/Placeholder";

const { Option } = Select;

function QuotationDetailsCardList(props) {
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [attribute, setAttribute] = useState("");
  const [quality, setQuality] = useState("");
  const [location, setLocation] = useState("");
  const [model, setModel] = useState("");
  const [newUnitName, setUnitName] = useState('');
  const [specs, setSpecs] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  useEffect(() => {
    props.getBrand();
    props.getQuotationExcelDetails(props.orderDetailsId.quotationId);
    props.getCategorylist();
    props.getAllProductList();
    props.getSupplierSuppliesQuality();
    props.getLocationList(props.orgId);
  }, []);

  const handleChange = (id, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [id]: {
        ...prevFields[id],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (id, itemCategory,itemBrand, itemModel,itemAttribute,itemQuality, itemLocation,unit, itemSpecs) => {
    setCategory(itemCategory)
    setEditContactId(id);
    setBrand(itemBrand);
    setAttribute(itemAttribute);
    setQuality(itemQuality);
    setLocation(itemLocation)
    setModel(itemModel);
    setUnitName(unit);
    setSpecs(itemSpecs);
  };

  const handleCancelClick = (id) => {
    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  const handleBrandChange = async (value) => {
    setBrand(value);
    await props.getModel(value);
  };
  const handleCategoryChange = async (value) => {
    setCategory(value);
   
  };
  
  const handleAttributeChange = async (value) => {
    setAttribute(value);
   
  };

  const handleQualityChange = async (value) => {
    setQuality(value);
   
  };
  const handleLocationChange = async (value) => {
    setLocation(value);
   
  };
  
  const handleModelChange = (value) => {
    setModel(value);
  };

  const handleSpecsChange = (value) => {
    setSpecs(value);
  };

  const handleUpdate = (id) => {
    const data = {
      model: brand,
      orderPhoneId: props.orderDetailsId.quotationId,
      brandId: model,
      unit: newUnitName,
      specs: specs,
      category:category,
      attribute:attribute,
      quality:quality,
      location:location,
    };

    props.updateProcureDetails(data, id);

    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  const handleSetParticularOrderData = (item) => {
    setParticularRowData(item);
  };

  if (props.fetchingQuotationExcelDetails) {
    return <BundleLoader />;
  }

  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className="flex justify-between w-full  p-1 bg-transparent font-bold sticky  z-10">
        <div className="md:w-[7.4rem]">
        {props.translatedMenuItems[31]}
          </div>
          <div className="md:w-[7.4rem]">
          {props.translatedMenuItems[69]}
          </div>
          <div className="md:w-[7.1rem]">
          {props.translatedMenuItems[70]}
          </div>
          <div className="md:w-[7.1rem]">
          {props.translatedMenuItems[123]}
          </div>
      
          <div className="md:w-[4.8rem]">
          {props.translatedMenuItems[125]}
          </div>
          <div className="md:w-[5.8rem]">
          {props.translatedMenuItems[124]}
          </div>
          <div className="md:w-[6.8rem]">
          {props.translatedMenuItems[144]}
          </div>
          <div className="md:w-[6.8rem]">
          {props.translatedMenuItems[22]}
          </div>
          <div className="md:w-[6.12rem]"></div>
        </div>

        {props.quotationPhoneDetails.map((item, index) => {
          return (
            <div key={index} className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
               <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      {props.categoryList.map((categoryItem, categoryIndex) => (
                        <option key={categoryIndex} value={categoryItem.id}>
                          {categoryItem.categoryName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.category}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={brand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                    >
                      {props.brand.map((brandItem, brandIndex) => (
                        <option key={brandIndex} value={brandItem.brand}>
                          {brandItem.brand}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.brand}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <Select
                      className="w-32"
                      value={model}
                      onChange={handleModelChange}
                    >
                      {props.model.map((modelItem) => (
                        <Option key={modelItem.id} value={modelItem.id}>
                          {modelItem.model}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.model}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={attribute}
                      onChange={(e) => handleAttributeChange(e.target.value)}
                    >
                      {props.allProduct.map((attributeItem, attributeIndex) => (
                        <option key={attributeIndex} value={attributeItem.productId}>
                          {attributeItem.productFullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.attribute}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={quality}
                      onChange={(e) => handleQualityChange(e.target.value)}
                    >
                      {props.supplierSuppliesQuality.map((qualityItem, qualityIndex) => (
                        <option key={qualityIndex} value={qualityItem.qualityId}>
                          {qualityItem.code}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.quality}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                    >
                      {props.locationlist.map((locationItem, locationIndex) => (
                        <option key={locationIndex} value={locationItem.locationDetailsId}>
                          {locationItem.locationName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.location}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[17rem] ml-2 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <Select
                      style={{ width: 100 }}
                      value={specs}
                      onChange={handleSpecsChange}
                    >
                      <Option value="US">US</Option>
                      <Option value="CE">CE</Option>
                      <Option value="IND">IND</Option>
                      <Option value="HK">HK</Option>
                    </Select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.specs}</div>
                  )}
                </div>
              </div>

              <div className="flex font-medium flex-col ml-2 md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <input
                      placeholder="Update Unit"
                      style={{border:"2px solid black"}}
                      type="text"
                      value={newUnitName}
                      onChange={(e) => setUnitName(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.unit}</div>
                  )}
                </div>
              </div>
             

              <div className="flex flex-col w-[6rem] ml-1 max-sm:flex-row max-sm:w-auto">
                <div className="flex">
                  {editContactId === item.id ? (
                    <>
                      <Button onClick={() => handleUpdate(item.id)}>
                      {props.translatedMenuItems[48]}
                      </Button>
                      <Button onClick={() => handleCancelClick(item.id)} style={{ marginLeft: '0.5rem' }}>
                      {props.translatedMenuItems[49]}
                      </Button>
                    </>
                  ) : (
                    <BorderColorIcon
                      tooltipTitle= {props.translatedMenuItems[58]}
                      iconType="edit"
                      onClick={() => handleEditClick(item.id, item.category,item.brand, item.model,item.attribute,item.quality,item.location, item.unit, item.specs)}
                      style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                    />
                  )}
                </div>
                <div>
                  <StyledPopconfirm
                    title={props.translatedMenuItems[120]}
                    onConfirm={() => props.deleteProcureData(item.id)}
                  >
                    <Tooltip title={props.translatedMenuItems[59]}>
                    <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                    </Tooltip>
                  </StyledPopconfirm>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const mapStateToProps = ({ distributor,suppliers,auth }) => ({
  quotationPhoneDetails: distributor.quotationPhoneDetails,
  orderDetailsId: distributor.orderDetailsId,
  brand: distributor.brand,
  model: distributor.model,
  fetchingQuotationExcelDetails: distributor.fetchingQuotationExcelDetails,
  categoryList:suppliers.categoryList,
  allProduct:distributor.allProduct,
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality,
  locationlist:distributor.locationlist,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuotationExcelDetails,
      getAllProductList,
      deleteProcureData,
      getBrand,
      getModel,
      updateProcureDetails,
      getCategorylist,
      getSupplierSuppliesQuality,
      getLocationList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuotationDetailsCardList);
