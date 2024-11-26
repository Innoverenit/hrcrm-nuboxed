import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { getSaleCurrency } from "../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import ExtendOpportunityProductList from "./ExtendOpportunityProductList";

const { Option } = Select;

function OpportunitytProcureDetails(props) {
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [attribute, setAttribute] = useState("");
  const [brand, setBrand] = useState("");
  const [quality, setQuality] = useState("");
  const [model, setModel] = useState("");
  const [newUnitName, setUnitName] = useState('');
  const [specs, setSpecs] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("");
  const [newPrice, setPrice] = useState('');
  const [showPay, setShowPay] = useState(false);
const [RowItem,setRowItem]=useState({});

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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
  '14', // 0
  '264', // 1
  '265', // 2
  '259', // 3
  '654', // 4
  '658', // 5
  '655', //6
  '260', //7
  '657',//8
        ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);

  useEffect(() => {
   // props.getBrand();
    props.getCategorylist();
   // props.getAllProductList();
    props.getSupplierSuppliesQuality();
    props.getLocationList(props.orgId);
    props.getSaleCurrency()
    props.getQuotationExcelDetails(props.particularRowItem.quotationId);
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
  const handleQualityChange = async (value) => {
    setQuality(value);
  };

  const handleShowPay = () => {
    setShowPay(!showPay)
}
const handleRowItem = (item) => {
  setRowItem(item);
};

  const handleEditClick = (id,itemCategory, itemBrand, itemModel,itemAttribute, itemQuality,itemLocation,unit, itemSpecs,itemCurrency,price) => {
    setEditContactId(id);
    setCategory(itemCategory)
    setBrand(itemBrand);
    setModel(itemModel);
    setAttribute(itemAttribute);
    setQuality(itemQuality);
    setLocation(itemLocation)
    setUnitName(unit);
    setSpecs(itemSpecs);
    setCurrency(itemCurrency)
    setPrice(price);
  };

  const handleLocationChange = async (value) => {
    setLocation(value);
   
  };
  const handleCurrencyChange = async (value) => {
    setCurrency(value);
   
  };

  const handleCancelClick = (id) => {
    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  const handleAttributeChange = async (value) => {
    setAttribute(value);
   
  };

  const handleBrandChange = async (value) => {
    setBrand(value);
    await props.getModel(value);
  };

  const handleCategoryChange = async (value) => {
    setCategory(value);
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

  const handleSpecsChange = (value) => {
    setSpecs(value);
  };

  const handleUpdate = (id) => {
    const data = {
      model: brand,
      orderPhoneId: props.particularRowItem.orderId,
      brandId: model,
      unit: newUnitName,
      specs: specs,
      quality:quality,
      category:category,
      attribute:attribute,
      location:location,
      currency:currency,
      price:newPrice,
    };

    props.updateProcureDetails(data, id);

    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className="flex justify-between  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[2rem] font-semibold  font-poppins"></div>
        <div className="md:w-[7.4rem] text-[#00A2E8] text-base font-bold font-poppins">
        {translatedMenuItems[0]} {/* Category" /> */}
          </div>
          <div className="md:w-[7.4rem] text-xs font-bold font-poppins">
          {translatedMenuItems[1]}{/* "Brand" /> */}
          </div>
          <div className="md:w-[4.1rem] text-xs font-bold font-poppins">
          {translatedMenuItems[2]} {/* "Model" /> */}
          </div>
          <div className="md:w-[4.1rem] text-xs font-bold font-poppins">
          {translatedMenuItems[3]} {/* "Attribute" /> */}
          </div>
          <div className="md:w-[7.1rem] text-xs font-bold font-poppins">
          {translatedMenuItems[4]} {/* "Quality" /> */}
          </div>
          <div className="md:w-[7.1rem] text-xs font-bold font-poppins">
          Speci {/* "Quality" /> */}
          </div>
      
            <div className="w-[7rem] md:w-[5%] text-xs font-bold font-poppins">
            {translatedMenuItems[5]} 
            {/* Location */}
          </div>
          <div className="md:w-[2.8rem] text-xs font-bold font-poppins">
          {translatedMenuItems[7]} {/* "Units" /> */}
          </div>
             
          <div className="md:w-[2rem]"></div>
        </div>
        <InfiniteScroll
        dataLength={props.quotationPhoneDetails.length}
      //   next={handleLoadMore}
      // hasMore={hasMore}
        loader={props.fetchingQuotationExcelDetails?<div class="flex justify-center">Loading...</div>:null}
        height={"79vh"}
        style={{scrollbarWidth:"thin"}}
        // endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
        {props.quotationPhoneDetails.map((item, index) => {
          return (
            <div>
            <div key={index} className="flex rounded justify-between bg-white mt-1 h-8 items-center ">

<div className="flex  md:w-[17rem] h-8  border-l-2 border-green-500 bg-[#eef2f9] items-center justify-center max-sm:flex-row w-full max-sm:justify-between">
<div className=" flex   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        
                                                         <div class=" text-xs  font-poppins text-center">
                                                                 <AddIcon
                                                                     onClick={() => {
                                                                         handleShowPay();
                                                                         handleRowItem(item);
                                                                     }
                                                                     }
                                                                 />
                                                              
                                                         </div>
                                                   </div>
                <div className="text-xs  font-poppins">
                {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.category}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[17rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.brand}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[17rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <Select
                    style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.model}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[17rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.attribute}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[17rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.quality}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[1rem]  max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                    <div className="font-normal text-xs  font-poppins">{item.location}</div>
                  )}
                </div>
              </div>
              <div className="flex  md:w-[7rem] ml-2 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <Select
                    style={{ width: "5rem" }}
                      value={specs}
                      onChange={handleSpecsChange}
                    >
                      <Option value="US">US</Option>
                      <Option value="CE">CE</Option>
                      <Option value="IND">IND</Option>
                      <Option value="HK">HK</Option>
                    </Select>
                  ) : (
                    <div className="font-normal text-xs  font-poppins">{item.specs}</div>
                  )}
                </div>
              </div>


              <div className="flex  ml-2 md:w-[14rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <input
                      placeholder="Update Price"
                      style={{border:"2px solid black",width:"6rem"}}
                      type="text"
                      value={newPrice}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-xs  font-poppins">{item.price}{item.currency} </div>
                  )}
                </div>
              </div>
              
              <div className="flex  ml-2 md:w-[10rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <input
                      placeholder="Update Unit"
                      style={{border:"2px solid black",width:"6rem"}}
                      type="text"
                      value={newUnitName}
                      onChange={(e) => setUnitName(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-xs  font-poppins">{item.unit}</div>
                  )}
                </div>
              </div>
              {/* <div className="flex  md:w-[1rem]  max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                    <select
                      className="customize-select"
                      style={{ width: "5rem" }}
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
                  
                    <div className="font-normal text-xs  font-poppins"></div>
                  )}
                </div>
              </div> */}
             

              <div className="flex flex-col w-[8rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 ml-1 max-sm:flex-row max-sm:w-auto">
                <div className="flex">
                  {editContactId === item.id ? (
                    <>
                      <Button onClick={() => handleUpdate(item.id,)}>
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
                      onClick={() => handleEditClick(item.id,item.category, item.brand, item.model,item.attribute,item.quality,item.location, item.unit, item.specs,item.price,item.currency,)}
                      style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
                    />
                  )}
                    <div>
                  <StyledPopconfirm
                    title="Do you want to delete?"
                    onConfirm={() => props.deleteProcureData(item.id)}
                  >
                    <Tooltip title="Delete">
                    <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                    </Tooltip>
                  </StyledPopconfirm>
                </div>
                </div>
              
              </div>
            </div>
            
            {showPay && (RowItem.orderPhoneId === item.orderPhoneId) &&
              <ExtendOpportunityProductList
             //  newOrderNo={props.newOrderNo}
             //  row={row}
             //  paymentId={item.paymentId}
             RowItem={RowItem}
             selectedLanguage={props.selectedLanguage}
             particularRowItem={props.particularRowItem}
             translateText={props.translateText} 
                               />
         }
           </div>
          );
        })}
          </InfiniteScroll>
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
  saleCurrencies: auth.saleCurrencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         getSaleCurrency,
      getAllProductList,
      getCategorylist,
      getQuotationExcelDetails,
      deleteProcureData,
      getBrand,
      getModel,
      getSupplierSuppliesQuality,
      updateProcureDetails,
      getLocationList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitytProcureDetails);
