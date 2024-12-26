
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getProcureDetails,
  deleteProcureData,
  getBrand,
  getModel,
  updateProcureDetails,
  getAllProductList,
  getLocationList,
  addLocationInOrder
} from "../../AccountAction";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import {getCategorylist,getSupplierSuppliesQuality} from "../../../Suppliers/SuppliersAction"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import InputIcon from '@mui/icons-material/Input';
import IosShareIcon from '@mui/icons-material/IosShare'; 
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactsIcon from '@mui/icons-material/Contacts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import QrCodeIcon from '@mui/icons-material/QrCode';
import BentoIcon from '@mui/icons-material/Bento'; //units
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import { base_url2 } from "../../../../../Config/Auth";
import { BundleLoader } from "../../../../../Components/Placeholder";

const { Option } = Select;

function ItemListShow(props) {
  const dispatch = useDispatch();
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [attribute, setAttribute] = useState("");
  const [brand, setBrand] = useState("");
  const [quality, setQuality] = useState("");
  const [model, setModel] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [newUnitName, setUnitName] = useState('');
  const [specs, setSpecs] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("");
  const [newPrice, setPrice] = useState('');
  const [invoices, setInvoices] = useState('');
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [RowInvoices, setRowInvoices] = useState('');

  // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [CreditMemo, setCreditMemo] = useState([]);

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [creditmemoData,setcreditmemoData]=useState([]);

  // useEffect(() => {
  //     const fetchMenuTranslations = async () => {
  //       try {
  //         setLoading(true); 
  //         const itemsToTranslate = [
  // '14', // 0
  // '264', // 1
  // '265', // 2
  // '259', // 3
  // '654', // 4
  // '658', // 5
  // '655',
  // '260',
  // '657',//8
  // '1093',
  // "1169",//10
  // "1225",
  // '1224',//12
  // "110",
  
  //       ];
  
  //         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
  //         setTranslatedMenuItems(translations);
  //         setLoading(false);
  //       } catch (error) {
  //         setLoading(false);
  //         console.error('Error translating menu items:', error);
  //       }
  //     };
  
  //     fetchMenuTranslations();
  //   }, [props.selectedLanguage]);

  useEffect(() => {
    props.getProcureDetails(props.particularRowData.orderPhoneId);
    fetchCreditMemoData();
  }, []);

  const fetchCreditMemoData = async () => {
    try {
      const response = await axios.get(`${base_url2}/creditMemo/creditMemoList/${props.distributorId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setcreditmemoData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

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

  const handlePostChange =  async (item) => {
    const currentDate = new Date().toISOString();
    let updatedItem={
        dispatchReceivedDate: currentDate,
        type:"Item",
        procureOrderInvoiceId:item.id,
      // trackId:trackId?trackId:item.trackId,Order Successfully dispatched!!!!
      orderId:props.particularRowData.orderId,
    }
    let data = {
       inventoryPickUpDate: currentDate,
      transferInd: 1,
      locationId: "LDS65468903772222023",
      userId: props.userId,
      orderPhoneId: props.particularRowData.orderPhoneId,
      orderType:"Procure"
  }
    try {
      const response = await axios.put(`${base_url2}/phoneOrder/procureDispatch`, updatedItem, {  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
       dispatch(addLocationInOrder(data, props.distributorId));
       if (response.data === 'Order Successfully dispatched!!!!') {
        const updatedOrderItems = data.filter(itm => itm.orderId !== item.orderId);
        setData(updatedOrderItems);
      } else {
        console.log(response.data);
      }
        setEditsuppliesId(null);
      } catch (error) {
        console.error("Error updating item:", error);
        setEditsuppliesId(null);
      }
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
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
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

  
  const handleCreditMemo =  (value) => {
    setCreditMemo(value);
  };

  const handleUnitChange = (id, value) => {
    const unitValue = parseInt(value, 10);
    if (unitValue < 1 || isNaN(unitValue)) {
      setEditedFields((prevFields) => ({
        ...prevFields,
        [id]: {
          ...prevFields[id],
          reaminingInvoiceUnit: 1, 
        },
      }));
    } else {
      setEditedFields((prevFields) => ({
        ...prevFields,
        [id]: {
          ...prevFields[id],
          reaminingInvoiceUnit: unitValue,
        },
      }));
    }
  };


const handleGenerateInvoice= async () => {
    setLoading(true);
    setError(null);
    const selectedData = creditmemoData.filter(item => CreditMemo.includes(item.creditMemo));
    const itemList = props.procureDetails.map(item => {
      const unitValue = editedFields[item.id]?.reaminingInvoiceUnit || item.reaminingInvoiceUnit;  
      if (unitValue < 1) {
        Swal.fire({
          title: 'Validation Error!',
          text: 'Unit value must be at least 1 for all items.',
          icon: 'error',
          confirmButtonText: 'OK',
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        return null; 
      }
      
      return {
        price: item.price,
        procureOrderProductId: item.id,
        unit:  inputValues[item.id] || '',
        //unit:RowInvoices,
        // reaminingInvoiceUnit:unitValue
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
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

   

    try {
      const response = await axios.post(`${base_url2}/invoice/procureInvoice`,{

      userId: props.userId,
      distributorId:props.distributorId,
        invoiceId: invoices,
        itemList: itemList,
        procureOrderInvoiceId: "",
        procureOrderProductInvoiceId:"",
        orgId: props.orgId,
        creditMemoList:selectedData,
        processType:"Part",
        procureInvoiceList:[
          {
          orderPhoneId: props.particularRowData.orderId,
        }
      ]

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
        showConfirmButton: false,
        timer: 1500,

    });

    props.handleProcureDetailsModal(false);
    } 
    
    catch (err) {
      setError(err);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue generating the invoice.',
        icon: 'error',
  showConfirmButton: false,
        timer: 1500,
    });
    } finally {
      setLoading(false);
    }
    setInvoices("");
  }; 

  const handleInputChange = (id, value) => {
    setInputValues({
      ...inputValues,
      [id]: value
    });
  };
  console.log(props.distributorData)
  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[100%] h-[89vh] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className="flex justify-between font-bold font-poppins text-xs w-[97%] items-end  p-1 bg-transparent  sticky z-10">
          <div className="w-[19.2rem]  text-[#00A2E8] text-base ">
          <ContactsIcon className="!text-icon mr-1 "/>  {props.translatedMenuItems[122]}
          </div>

        <div className=" w-[8.2rem] md:w-[8.2rem] ">
        <WidgetsIcon className='!text-icon    text-[#42858c]' /> {props.translatedMenuItems[31]}{/* Category" /> */}
          </div>
          <div className="w-[6.2rem] md:w-[6.2rem] ">
          <BrandingWatermarkIcon className="!text-icon" /> {props.translatedMenuItems[69]}{/* Brand" /> */}
          </div>
          <div className="w-[5.2rem] md:w-[5.2rem]">
          <ModelTrainingIcon className=" !text-icon" /> {props.translatedMenuItems[70]} {/* Model" /> */}
          </div>
          <div className="w-[4.6rem] md:w-[5.6rem]">
            <AttractionsIcon className="  !text-icon" /> {props.translatedMenuItems[123]} {/* Attribute" /> */}
          </div>
          <div className="w-[6.21rem] md:w-[5.21rem] ">
          <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' /> {props.translatedMenuItems[124]}{/*Price" /> */}
          </div>
          <div className="w-[5.21rem] md:w-[5.21rem]">
             <BentoIcon className="  !text-icon" /> {props.translatedMenuItems[125]} {/* Units" /> */}
          </div>
        </div>
        <InfiniteScroll
        dataLength={props.procureDetails.length}
        loader={props.fetchingProcureDetails?<div class="flex justify-center"><BundleLoader/></div>:null}
        height={"77vh"}
        style={{scrollbarWidth:"thin"}}
      >
        {props.procureDetails.length > 0 ? 
        props.procureDetails.map((item, index) => {
          const totalPay = item.totalPrice;
          const outStand = props.distributorData.outstanding;
          const currencyPrice = props.distributorData.currencyPrice
          const payStand = totalPay + outStand;
          const canPack = payStand < currencyPrice || payStand === currencyPrice;
          const newpack = props.particularRowData.receiveOfferPricePercentage === props.particularRowData.dispatchPaymentPercentage || props.particularRowData.receiveOfferPricePercentage > props.particularRowData.dispatchPaymentPercentage
          return (
            <div key={index} className="flex rounded justify-between bg-white mt-1  items-center py-1 hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]
              >">
              
              <div className="flex items-center border-l-2 border-green-500 h-8  bg-[#eef2f9]    max-sm:flex-row truncate w-[20rem]  max-sm:justify-between">
              <div className="text-xs ml-gap font-poppins">
           {item.productFullName ? item.productFullName : "No Data"}
           </div>
              </div>

<div className="flex max-sm:flex-row  items-center h-8 ml-gap bg-[#eef2f9]  truncate w-[8rem]  max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                    {item.category ? item.category : "No Data"}
                </div>
              </div>
              <div className="flex  md:w-[7rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[5rem] max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                                   {item.brand ? item.brand:"No Data"}
                </div>
              </div>
              <div className="flex  md:w-[8.2rem] items-center h-8 ml-gap bg-[#eef2f9]  truncate max-sm:flex-row w-[7rem] max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                            {item.model ? item.model:"No Data"}
                </div>
              </div>
              <div className="flex  md:w-[7rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4rem] max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                  {item.attribute ? item.attribute :"No Data"}
                </div>
              </div>
              

            <div className="flex   md:w-[6.1rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4.01rem] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                 
<div className=" text-xs  font-poppins">{item.price?item.price:"No Data"}{item.price ? item.currency:""} </div>
                </div>
              </div>
              <div className="flex  md:w-[6.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4.02rem] max-sm:justify-between">
                <div className="text-xs ml-gap font-poppins">
                {item.unit}
                </div>
              </div>
              {props.user.disPackInd && canPack && newpack &&
              <Button className="w-[5rem]"
                      type="primary"
                      onClick={() => handlePostChange(item)}> 
                      <InputIcon className="!text-icon text-white"/>Pack</Button>}
              <div className="flex justify-end w-[1.06rem] items-center h-8 ml-gap bg-[#eef2f9]   max-sm:flex-row max-sm:w-auto">
               
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
        }):"No Invoices have been created"}
         
             
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
  user: auth.userDetails,
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
      getLocationList,
      addLocationInOrder
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ItemListShow);