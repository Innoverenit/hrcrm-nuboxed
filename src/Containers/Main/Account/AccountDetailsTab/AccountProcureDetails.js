
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { base_url, base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2';
import IosShareIcon from '@mui/icons-material/IosShare'; 
import { MultiAvatar } from "../../../../Components/UI/Elements";

const { Option } = Select;

function AccountProcureDetails(props) {
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
  const [RowInvoices, setRowInvoices] = useState('');

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [CreditMemo, setCreditMemo] = useState([]);

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [creditmemoData,setcreditmemoData]=useState([]);

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
  '1093',
  "1169",//10
  "1225",
  '1224',//12
  "110",
  
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
    // props.getCategorylist();
    // props.getAllProductList();
    // props.getSupplierSuppliesQuality();
    // props.getLocationList(props.orgId);
    // props.getSaleCurrency()
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
          confirmButtonText: 'OK'
        });
        setLoading(false);
        return null; 
      }
      // if (selectedData < 1) {
      //   Swal.fire({
      //     title: 'Validation Error!',
      //     text: 'Credit memo has not valid amount',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      //   setLoading(false);
      //   return null; 
      // }
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
        confirmButtonText: 'OK'
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
  
  return (
    <>
      <div className="rounded m-1 max-sm:m-1 p-1 w-[100%] h-[83vh] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className="flex justify-between font-bold font-poppins text-xs w-[99%]   p-1 bg-transparent  sticky z-10">
          <div className="w-[18.2rem] ">
        {translatedMenuItems[13]}
          </div>

        <div className=" w-[5.2rem] ">
        {translatedMenuItems[0]} {/* Category" /> */}
          </div>
          <div className="w-[6.2rem] ">
          {translatedMenuItems[1]}{/* Brand" /> */}
          </div>
          <div className="w-[4.2rem] ">
          {translatedMenuItems[2]} {/* Model" /> */}
          </div>
          <div className="w-[4.6rem] ">
          {translatedMenuItems[3]} {/* Attribute" /> */}
          </div>

          {/* <div className=" w-[7%] md:w-[7%]">
          {translatedMenuItems[4]}  /> Quality
          </div> */}
          {/* <div className="md:w-[7.1%]">
          {translatedMenuItems[5]} */}
          {/* Location" /> */}
          {/* </div> */}
          {/* <div className=" w-[8%] md:w-[8%]">
          {translatedMenuItems[6]}  Specs  
          </div> */}
          <div className="w-[6.21rem] ">
          {translatedMenuItems[8]} {/*Price" /> */}
          </div>
          <div className="w-[5.21rem] ">
          {translatedMenuItems[7]} {/* Units" /> */}
          </div>
          <div className="w-[5.31rem] ">
          {translatedMenuItems[10]} 
          </div>
          <div className=" w-[5.8rem] ">
          {translatedMenuItems[9]}
          </div>
              <div className="w-[5.01rem] ">
          Supplies ID
          </div>
      
       
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
        {props.procureDetails.length > 0 ? 
        props.procureDetails.map((item, index) => {
          return (
            <div key={index} className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1">
              {/* <div className="flex  md:w-[0.5%] max-sm:flex-row w-[2.5%] max-sm:justify-between">
              <div className="text-xs  font-poppins">
           <MultiAvatar
           imageId={item.imageId}
           />
           </div>
              </div> */}
              <div className="flex items-center h-8 ml-gap bg-[#eef2f9]   max-sm:flex-row truncate w-[20rem]  max-sm:justify-between">
              <div className="text-xs font-poppins">
           {item.productFullName ? item.productFullName : "No Data"}
           </div>
              </div>

<div className="flex max-sm:flex-row items-center h-8 ml-gap bg-[#eef2f9]  truncate w-32  max-sm:justify-between">
                <div className="text-xs  font-poppins">
                    {item.category ? item.category : "No Data"}
                </div>
              </div>
              <div className="flex  md:w-[5rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[5rem] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                                   {item.brand ? item.brand:"No Data"}
                </div>
              </div>
              <div className="flex  md:w-[15.2rem] items-center h-8 ml-gap bg-[#eef2f9]  truncate max-sm:flex-row w-[7%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                            {item.model ? item.model:"No Data"}
                </div>
              </div>
              <div className="flex  md:w-[3rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  {item.attribute ? item.attribute :"No Data"}
                </div>
              </div>
              {/* <div className="flex  md:w-[4%] max-sm:flex-row w-[5%] max-sm:justify-between">                          
                  <div className=" text-xs  font-poppins">{item.quality}</div>      
              </div> */}
              {/* <div className="flex  md:w-[4%] max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                
                 
                  {item.location?item.location:"No Data"}
                </div>
              </div> */}
              {/* <div className="flex  md:w-[4%]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                  
            <div className=" text-xs  font-poppins">{item.specs}</div>
                </div>
              </div> */}

            <div className="flex   md:w-[5.1rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                 
<div className=" text-xs  font-poppins">{item.price?item.price:"No Data"}{item.price ? item.currency:""} </div>
                </div>
              </div>
              <div className="flex  md:w-[3rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                {item.unit}
                    
                   
 
                 
                </div>
              </div>
              <div className="flex  md:w-[5.8rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                {/* {item.reaminingInvoiceUnit === 0 ? `$` : */}
                <input
  placeholder="Units"
  style={{ border: "1px solid grey",width:"4rem" }}
  min="1"
  value={inputValues[item.id] || ''}
  onChange={(e) => handleInputChange(item.id, e.target.value)}
  
  // value={editedFields[item.id]?.RowInvoices || item.RowInvoices}
  // onChange={(e) => setRowInvoices(item.id, e.target.value)}
/>
             
                </div>
              </div>
              <div className="flex  md:w-[7rem] items-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                {item.reaminingInvoiceUnit ? item.reaminingInvoiceUnit :"No Data"}
                </div>
              </div>

              <div className="flex items-center h-8 ml-gap bg-[#eef2f9]   md:w-[7rem] max-sm:flex-row w-[4%] max-sm:justify-between">
                <div className="text-xs  font-poppins">
                {item.productId ? item.productId :"No Data"}
                </div>
              </div>
              <div className="flex justify-end w-4 items-center h-8 ml-gap bg-[#eef2f9]   max-sm:flex-row max-sm:w-auto">
               
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
                          fontSize: "1%",
                        }}
                      />
                    </Tooltip>
                  </StyledPopconfirm>
                </div>
              </div>
            </div>
          );
        }):"No Invoices have been created"}
         <div className="flex max-sm:flex-row mt-2 justify-end">
                <div className="text-xs  font-poppins shadow-sm">
                   <input
                  //  className=" border-red-600 h-6 shadow-sm "
                   placeholder="invoice ID"
                   style={{border:"1px solid red",height:"2rem", }}
                   type="text"
                   value={invoices}
                   onChange={(e) => setInvoices(e.target.value)}
                 />
                </div>
                <div className="ml-2 ">
                <Select
                     style={{width:"9rem"}}
                     placeholder="Apply Credit"
                      value={CreditMemo}
                      onChange={(value) => handleCreditMemo(value)}
                      mode="multiple" 
                    >
   {creditmemoData.map((critem, crindex) => (
      <option  key={critem.creditMemoId} value={critem.creditMemo}>
       {critem.creditMemoId} - {critem.creditMemo}
      </option>
    ))}

                    </Select>
                    </div>
                    <div className="ml-2 ">
                    
                
                    <Button
                        type='primary'
                        onClick={handleGenerateInvoice}
                    >
                      <IosShareIcon className=" !text-icon" />
        {translatedMenuItems[12]}
                    </Button>
                   
              </div>
              </div>
             
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