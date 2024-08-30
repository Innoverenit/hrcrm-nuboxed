import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  getProcureDetails,
  deleteProcureData,
  getBrand,
  getModel,
  updateProcureDetails,
  getAllProductList,
  getLocationList
} from "../AccountAction";
import { getSaleCurrency } from "../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../Suppliers/SuppliersAction"
import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';

const { Option } = Select;

function AccountProcureDetails(props) {
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
  const [invoices, setInvoices] = useState('');
  // const [particularRowData, setParticularRowData] = useState({});

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
  '655',
  '260',
  '657',//8
  '1223',
  "1169",//10
  "1225",
  '1224',//12
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
    props.getBrand();
    props.getCategorylist();
    props.getAllProductList();
    props.getSupplierSuppliesQuality();
    props.getLocationList(props.orgId);
    props.getSaleCurrency()
    props.getProcureDetails(props.particularRowData.orderPhoneId);
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
   
  };
  
  const handleModelChange = (value) => {
    setModel(value);
  };

  const handleSpecsChange = (value) => {
    setSpecs(value);
  };

  const handleUpdate = (id) => {
    const unitValue = editedFields[id]?.unit || 1;
    if (unitValue < 1) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Unit value must be at least 1.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      model: brand,
      orderPhoneId: props.particularRowData.orderId,
      brandId: model,
      unit: newUnitName,
      specs: specs,
      quality:quality,
      category:category,
      attribute:attribute,
      location:location,
      currency:currency,
      price:newPrice,
      invoice: invoices,
    };

    props.updateProcureDetails(data, id);

    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  // const handleSetParticularOrderData = (item) => {
  //   setParticularRowData(item);
  // };

  // if (props.fetchingProcureDetails) {
  //   return <BundleLoader />;
  // }
  
  const handleUnitChange = (id, value) => {
    const unitValue = parseInt(value, 10);
    if (unitValue < 1 || isNaN(unitValue)) {
      setEditedFields((prevFields) => ({
        ...prevFields,
        [id]: {
          ...prevFields[id],
          unit: 1, 
        },
      }));
    } else {
      setEditedFields((prevFields) => ({
        ...prevFields,
        [id]: {
          ...prevFields[id],
          unit: unitValue,
        },
      }));
    }
  };

const handleGenerateInvoice= async () => {
    setLoading(true);
    setError(null);
    const itemList = props.procureDetails.map(item => {
      const unitValue = editedFields[item.id]?.unit || item.unit;  
      if (unitValue < 1) {
        Swal.fire({
          title: 'Validation Error!',
          text: 'Unit value must be at least 1 for all items.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setLoading(false);
        return null; 
      }
  
      return {
        price: item.price,
        procureOrderProductId: item.id,
        unit: unitValue
      };
    }).filter(item => item !== null); 
  
    if (itemList.length === 0) {
      setLoading(false);
      return; 
    }
    if (invoices.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Invoice field cannot be blank.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    try {
      const response = await axios.post(`${base_url2}/invoice/procureInvoice `,{
      //   paymentMode: "Cash",
      //   remarks: "",
      //   invoiceId:invoices,
      //   userId: props.userId,
      //   orderPaymentType: "Repair",
      //   transactionNumber: "",
      //   orgId: props.orgId,
      //   distributorId:props.distributorId,
      //   orderId: props.particularRowData.orderId,
      //   paymentAmount: "550",
      userId: props.userId,
      distributorId:props.distributorId,
        invoiceId: invoices,
        itemList: itemList,
        orderPhoneId: props.particularRowData.orderId,
        procureOrderInvoiceId: "",
        procureOrderProductInvoiceId:"",
        orgId: props.orgId,
      },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
        
      );
      setData(response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Invoice generated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    } 
    
    catch (err) {
      setError(err);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue generating the invoice.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    } finally {
      setLoading(false);
    }
    setInvoices("");
  }; 



  
  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className="flex justify-between  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className="md:w-[7.4rem]">
        {translatedMenuItems[0]} {/* <FormattedMessage id="app.category" defaultMessage="Category" /> */}
          </div>
          <div className="md:w-[7.4rem]">
          {translatedMenuItems[1]}{/* <FormattedMessage id="app.brand" defaultMessage="Brand" /> */}
          </div>
          <div className="md:w-[7.1rem]">
          {translatedMenuItems[2]} {/* <FormattedMessage id="app.model" defaultMessage="Model" /> */}
          </div>
          <div className="md:w-[7.1rem]">
          {translatedMenuItems[3]} {/* <FormattedMessage id="app.attribute" defaultMessage="Attribute" /> */}
          </div>
          <div className="md:w-[7.1rem]">
          {translatedMenuItems[4]} {/* <FormattedMessage id="app.quality" defaultMessage="Quality" /> */}
          </div>
          <div className="md:w-[7.1rem]">
          {translatedMenuItems[5]}{/* <FormattedMessage id="app.location" defaultMessage="Location" /> */}
          </div>
          <div className="md:w-[8.8rem]">
          {translatedMenuItems[6]}{/* <FormattedMessage id="app.specs" defaultMessage="Specs" /> */}
          </div>
          <div className="md:w-[4.8rem]">
          {translatedMenuItems[8]} {/* <FormattedMessage id="app.price" defaultMessage="Price" /> */}
          </div>
          <div className="md:w-[3.8rem]">
          {translatedMenuItems[7]} {/* <FormattedMessage id="app.units" defaultMessage="Units" /> */}
          </div>
          <div className="md:w-[5.8rem]">
          {translatedMenuItems[9]}
          </div>
          <div className="md:w-[5rem]">
          {translatedMenuItems[10]} 
          </div>
          <div className="md:w-[4.8rem]">
          {translatedMenuItems[11]} 
          </div>
          <div className="md:w-[4.8rem]">
   Remng.Units
          </div>
          <div className="md:w-[2rem]"></div>
        </div>
        <InfiniteScroll
        dataLength={props.procureDetails.length}
      //   next={handleLoadMore}
      // hasMore={hasMore}
        loader={props.fetchingProcureDetails?<div class="flex justify-center">Loading...</div>:null}
        height={"71vh"}
        style={{scrollbarWidth:"thin"}}
        // endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
        {props.procureDetails.map((item, index) => {
          return (
            <div key={index} className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1">

<div className="flex  md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.category}</div>
                  )} */}
                                      <div className="font-normal text-xs  font-poppins">{item.category}</div>
                </div>
              </div>
              <div className="flex  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.brand}</div>
                  )} */}
                                   <div className="font-normal text-xs  font-poppins">{item.brand}</div>
                </div>
              </div>
              <div className="flex  md:w-[15rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.model}</div>
                  )} */}
                             <div className="font-normal text-xs  font-poppins">{item.model}</div>
                </div>
              </div>
              <div className="flex  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.attribute}</div>
                  )} */}
                   <div className="font-normal text-xs  font-poppins">{item.attribute}</div>
                </div>
              </div>
              <div className="flex  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.quality}</div>
                  )} */}
                  <div className="font-normal text-xs  font-poppins">{item.quality}</div>
                </div>
              </div>
              <div className="flex  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.location}</div>
                  )} */}
                  <div className="font-normal text-xs  font-poppins">{item.location}</div>
                </div>
              </div>
              <div className="flex  md:w-[6rem] ml-2 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                    <div className="font-normal text-xs  font-poppins">{item.specs}</div>
                  )} */}
            <div className="font-normal text-xs  font-poppins">{item.specs}</div>
                </div>
              </div>

            <div className="flex  ml-2 md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
                    <input
                      placeholder="Update Price"
                      style={{border:"2px solid black",width:"6rem"}}
                      type="text"
                      value={newPrice}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  ) : (
                    <div className="font-normal text-xs  font-poppins">{item.price}{item.currency} </div>
                  )} */}
<div className="font-normal text-xs  font-poppins">{item.price}{item.currency} </div>
                </div>
              </div>
              <div className="flex  ml-2 md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                
                     {/* <input
                      placeholder="Update Unit"
                      style={{border:"2px solid black"}}
                      type="text"
                      value={newUnitName}
                      onChange={(e) => setUnitName(e.target.value)}
                    /> */}
                    {/* {item.reaminingInvoiceUnit === 0 ? `${item.unit}` : */}
                    <input
  placeholder="Update Unit"
  style={{ border: "2px solid black" }}
  type="number"
  min="1"
  value={editedFields[item.id]?.unit || item.unit}
  onChange={(e) => handleUnitChange(item.id, e.target.value)}
  onBlur={(e) => handleUnitChange(item.id, e.target.value)}
/>
        
                 
                </div>
              </div>

              <div className="flex  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {/* {editContactId === item.id ? (
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
                  
                    <div className="font-normal text-xs  font-poppins"></div>
                  )} */}
                </div>
              </div>
             
              {/* <div className="flex  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {editContactId === item.id ? (
                   <input
                   placeholder="invoice"
                   style={{border:"2px solid black"}}
                   type="text"
                   value={invoices}
                   onChange={(e) => setInvoices(e.target.value)}
                 />
                  ) : (
                  
                    <div className="font-normal text-xs  font-poppins"> {item.invoice} </div>
                  )}
                </div>
              </div> */}
              <div className="flex flex-col w-[6rem] ml-1 max-sm:flex-row max-sm:w-auto">
                {/* <div className="flex">
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
                </div> */}
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
         <div className="flex  md:w-[4rem] max-sm:flex-row ">
                <div className="text-xs  font-poppins">
                   <input
                   placeholder="invoice"
                   style={{border:"2px solid black"}}
                   type="text"
                   value={invoices}
                   onChange={(e) => setInvoices(e.target.value)}
                 />
                </div>
              </div>
          <Button
                        type='primary'
                        onClick={handleGenerateInvoice}
                    >
        {translatedMenuItems[12]}
                    </Button>
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
  saleCurrencies: auth.saleCurrencies,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  distributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         getSaleCurrency,
      getAllProductList,
      getCategorylist,
      getProcureDetails,
      deleteProcureData,
      getBrand,
      getModel,
      getSupplierSuppliesQuality,
      updateProcureDetails,
      getLocationList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountProcureDetails);
