import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../../Suppliers/SuppliersAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import {
  getProcureDetails,
  deleteProcureData,
  getBrand,
  getModel,
  updateProcureDetails,
  getAllProductList,
  getLocationList
} from "../../AccountAction";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";

const { Option } = Select;

function ProcureDetailsCardList(props) {
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [attribute, setAttribute] = useState("");
  const [quality, setQuality] = useState("");
  const [currency, setCurrency] = useState("");
  const [location, setLocation] = useState("");
  const [model, setModel] = useState("");
  const [newUnitName, setUnitName] = useState('');
  const [newPrice, setPrice] = useState('');
  const [specs, setSpecs] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  useEffect(() => {
    props.getBrand();
    props.getProcureDetails(props.orderDetailsId.orderId);
    props.getCategorylist();
    props.getSaleCurrency()
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

  const handleEditClick = (id, itemCategory,itemBrand, itemModel,itemAttribute,itemQuality, itemLocation,unit,price,itemCurrency, itemSpecs) => {
    setCategory(itemCategory)
    setEditContactId(id);
    setBrand(itemBrand);
    setAttribute(itemAttribute);
    setQuality(itemQuality);
    setLocation(itemLocation)
    setModel(itemModel);
    setUnitName(unit);
    setPrice(price);
    setCurrency(itemCurrency)
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
  const handleCurrencyChange = async (value) => {
    setCurrency(value);
   
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
      orderPhoneId: props.orderDetailsId.orderId,
      brandId: model,
      unit: newUnitName,
      price:newPrice,
      specs: specs,
      category:category,
      attribute:attribute,
      quality:quality,
      currency:currency,
      location:location,
    };

    props.updateProcureDetails(data, id);

    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  const handleSetParticularOrderData = (item) => {
    setParticularRowData(item);
  };

  // if (props.fetchingProcureDetails) {
  //   return <BundleLoader />;
  // }

  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className="flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className="md:w-[7.4rem]">
            <FormattedMessage id="app.category" defaultMessage="Category" />
          </div>
          <div className="md:w-[7.4rem]">
            <FormattedMessage id="app.brand" defaultMessage="Brand" />
          </div>
          <div className="md:w-[7.1rem]">
            <FormattedMessage id="app.model" defaultMessage="Model" />
          </div>
          <div className="md:w-[7.1rem]">
            <FormattedMessage id="app.attribute" defaultMessage="Attribute" />
          </div>
          <div className="md:w-[7.1rem]">
            <FormattedMessage id="app.quality" defaultMessage="Quality" />
          </div>
          <div className="md:w-[7.1rem]">
            <FormattedMessage id="app.location" defaultMessage="Location" />
          </div>
          <div className="md:w-[8.8rem]">
            <FormattedMessage id="app.specs" defaultMessage="Specs" />
          </div>
   
          <div className="md:w-[8.8rem]">
            <FormattedMessage id="app.unit" defaultMessage="Unit" />
          </div>
          <div className="md:w-[8.8rem]">
            <FormattedMessage id="app.price" defaultMessage="Price" />
          </div>
        
        
          <div className="md:w-[6.12rem]"></div>
        </div>
        <InfiniteScroll
            // hasMore={hasMore}
          dataLength={props.procureDetails.length}
          // next={handleLoadMore}
          loader={props.fetchingProcureDetails?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
        >
        {props.procureDetails.map((item, index) => {
          return (
            <div key={index} className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
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
                      style={{border:"2px solid black",width:"6rem"}}
                      type="text"
                      value={newUnitName}
                      onChange={(e) => setUnitName(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.unit}</div>
                  )}
                </div>
              </div>

              <div className="flex font-medium flex-col ml-2 md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <input
                      placeholder="Update Price"
                      style={{border:"2px solid black",width:"6rem"}}
                      type="text"
                      value={newPrice}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-sm  font-poppins">{item.price} {item.currency}</div>
                  )}
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "70%" }}
                      value={currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                    >
                      {props.saleCurrencies.map((currencyItem, currencyIndex) => (
                        <option key={currencyIndex} value={currencyItem.currency_id}>
                          {currencyItem.currency_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="font-normal text-sm  font-poppins"></div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-[6rem] ml-1 max-sm:flex-row max-sm:w-auto">
                <div className="flex">
                  {editContactId === item.id ? (
                    <>
                      <Button onClick={() => handleUpdate(item.id)}>
                        Save
                      </Button>
                      <Button onClick={() => handleCancelClick(item.id)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <BorderColorIcon
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={() => handleEditClick(item.id, item.category,item.brand, item.model,item.attribute,item.quality,item.location, item.unit,item.price,item.currency, item.specs)}
                      style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                    />
                  )}
                </div>
                <div>
                  <StyledPopconfirm
                    title="Do you want to delete?"
                    onConfirm={() => props.deleteProcureData(item.id)}
                  >
                    <Tooltip title="Delete">
                      <DeleteOutlined
                        type="delete"
                        style={{
                          cursor: "pointer",
                          color: "red",
                          fontSize: "1rem",
                        }}
                      />
                    </Tooltip>
                  </StyledPopconfirm>
                </div>
              </div>
            </div>
          );
        })}
        </InfiniteScroll>
      </div>
    </>
  );
}

const mapStateToProps = ({ distributor,suppliers,auth }) => ({
  procureDetails: distributor.procureDetails,
  orderDetailsId: distributor.orderDetailsId,
  brand: distributor.brand,
  model: distributor.model,
  fetchingProcureDetails: distributor.fetchingProcureDetails,
  categoryList:suppliers.categoryList,
  allProduct:distributor.allProduct,
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality,
  locationlist:distributor.locationlist,
  orgId: auth.userDetails.organizationId,
  saleCurrencies: auth.saleCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSaleCurrency,
      getProcureDetails,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcureDetailsCardList);
