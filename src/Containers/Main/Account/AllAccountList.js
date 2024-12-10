import React, { useEffect, useState, lazy, Suspense } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateAccountUserModal from "../Account/UpdateAccountUserModal"
import {
  getAllDistributorsList,
  handleUpdateAccountModal,
  handleAccountAddress,
  handleUpdateAccountUserModal
} from "./AccountAction";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExploreIcon from "@mui/icons-material/Explore";
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from '../../../Components/UI/Elements';
import { BundleLoader } from "../../../Components/Placeholder";
import { Link } from 'react-router-dom';
import { Tooltip, Input,Button,Progress,Select  } from 'antd';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import dayjs from 'dayjs';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import relativeTime from 'dayjs/plugin/relativeTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { base_url2 } from "../../../Config/Auth";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import axios from "axios";
import Swal from 'sweetalert2'
import { getSaleCurrency, getCategory } from "../../Auth/AuthAction";
const AddAccountAdressModal = lazy(() => import("./AddAccountAdressModal"));
const AccountSearchedData = lazy(() => import("./AccountSearchedData"));
const AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const AccountCreditToggle = lazy(() => import("./AccountCreditToggle"));

const { Option } = Select;

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now);
    }
};

const AllAccountList = (props) => {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [RowData, setRowData] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [particularRowData, setParticularRowData] = useState({});
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState(""); 
  const [customerLists,setcustomerLists]=useState([]);

  useEffect(() => {
    props.getAllDistributorsList(props.orgId,page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    setcustomerLists(props.allDistributors);
    props.getCustomer(props.orgId);
    props.getCategory(props.orgId);
    props.getSaleCurrency();
    props.getCountry();
}, [props.allDistributors]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "110",    // 'Name', // 0
          "378",     // 'Work', // 1
          "14",    // 'Category', // 2
          "71",   // 'Type', // 3
          "1295",   // Open Order', // 4
          "1215",  // 'Tax', // 5
          "77",    // 'Owner' 6
          "100", // New 7
          "392",// "Pulse"  8
          "170",// "Edit" 9
          "76",// 'Assigned', // 10  
          "1338",// "Credit",//11
          "592",          // club    12
          "185",//Address13
          "679",//Created14
          "1171"
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
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
  const [visible, setVisible] = useState(false)
  const handleUpdateRevisePrice = () => {
      setVisible(!visible)
  }
  const [price, setPrice] = useState(particularRowData.dispatchPaymentPercentage)
 
  const handleSubmitPrice = () => {
    props.updateAccountPrice(
        {
            dispatchPaymentPercentage: price,
            
        },
        particularRowData.distributorId,

    );
    setVisible(false)
}
const handleChange = (val) => {
  //  setPrice(val)
  if (!isNaN(val) && val > 0 && val < 101) {
    setPrice(val);
  } else {
    setPrice(''); // Reset the input if the value is not valid
  }

}
  const handleLoadMore = () => {
    const PageMapd = props.allDistributors && props.allDistributors.length && props.allDistributors[0].pageCount
    setTimeout(() => {  
      if  (props.allDistributors)
      {
        if (page < PageMapd) {    
          setPage(page + 1);
          props.getAllDistributorsList(props.orgId,page);
            }
              if (page === PageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  };
const handleEditRowField = (distributorId, field, currentValue) => {
    setEditableField({ distributorId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);

      const { distributorId, field } = editableField;
      const updatedData = {};
      let mappedField = field;

      if (field === 'clientName') {
        mappedField = 'clientId'; 
      } else if (field === 'dcategoryName') {
        mappedField = 'dcategory';
      }
      else if (field === 'curName') {
        mappedField = 'currency';
      }
      updatedData[mappedField] = value;
    
      try {
        const response = await axios.put(
          `${base_url2}/distributor/rowEdit/${distributorId}`,
          updatedData,
          {
            headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
            },
          }
        );
        setcustomerLists(prevData =>
          prevData.map(cat =>
            cat.distributorId === distributorId ? response.data : cat
          )
        );
        setEditableField(null); 
        setEditingValue("");
        Swal.fire({
          icon: 'success',
          title: 'Update successful',
          showConfirmButton: false,
          timer: 1500,
        });
    
      } catch (error) {
        console.error("Error updating item:", error);
        setEditableField(null); 
      }
  };

  const handleUpdateSubmit = async () => {
    const { distributorId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === 'clientName') {
      mappedField = 'clientId'; 
    } else if (field === 'dcategoryName') {
      mappedField = 'dcategory';
    }
    updatedData[mappedField] = editingValue;
    try {
      const response = await axios.put(
        `${base_url2}/distributor/rowEdit/${distributorId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      setcustomerLists(prevData => 
        prevData.map(cat =>
          cat.distributorId === distributorId ? response.data : cat
        )
      );
      setEditableField(null);
      setEditingValue("");
        Swal.fire({
          icon: 'success',
          title: 'Update successful',
          showConfirmButton: false,
          timer: 1500,
        });

    } catch (error) {
      console.error("Error updating item:", error);
      setEditableField(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateSubmit(); 
    }
  };
  const handleCancel = () => {
    setEditableField(null);  
    setEditingValue("");     
  };

  const {
    handleUpdateAccountModal,
  } = props;
  return (
    <>
     {props.distributorSearch.length > 0 ? (
          <Suspense fallback={<BundleLoader />}>
    <AccountSearchedData
    distributorSearch={props.distributorSearch}
    selectedLanguage={props.selectedLanguage}
    translateText={props.translateText}
     RowData={RowData}
    />
    </Suspense>
  ) : (
      <div className=' flex  sticky z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex max-sm:hidden  w-[96%]   justify-between p-1 bg-transparent  sticky items-end  z-10 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]">
        <div class=" flex justify-between !text-lm font-poppins  font-bold  w-[94%]  ">
            <div className=" w-[14.3rem] text-[#00A2E8] text-sm max-md:w-[22.1rem] truncate ">  
            <ContactsIcon className="!text-icon  "/> {translatedMenuItems[0]}
            {/* Name */}
            </div>
            <div className=" w-[10.1rem] max-md:w-[10.11rem] truncate">
            <ApartmentIcon className="!text-icon mr-1 "/>  {translatedMenuItems[1]}
             {/* Work */}</div>
            <div className=" w-[14.6rem] max-md:w-[12.1rem] truncate">
            <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[2]}
            {/*category */}</div>
            <div className="w-[9.2rem] max-md:w-[10.01rem] truncate">
            < MergeTypeIcon className='!text-icon text-[#c42847] '  /> {translatedMenuItems[3]}
            {/* type % */}</div>
            <div className="w-[9.3rem] max-md:w-[12.2rem] truncate ">
            <DynamicFeedIcon className='  text-[#e4eb2f]'
              /> {translatedMenuItems[4]}
            {/* Paymentdays % */}</div>
            <div className="w-[8.9rem] max-md:w-[12.2rem] truncate">
            <GolfCourseIcon className='!text-base   text-[#f42c04]'/>  {/* Club */}{translatedMenuItems[12]}
            </div>  
            <div className="w-[17.2rem] max-md:w-[9.2rem]">
            <CurrencyExchangeIcon className='!text-icon    text-[#c42847]' /> {translatedMenuItems[15]}
            {/* Payment % */}
       
            </div>     
                <div className="w-[21.8rem] max-md:w-[7.8rem] truncate">
                <CurrencyExchangeIcon className='!text-icon    text-[#c42847]' />  {translatedMenuItems[11]}
           {/* credit */}        
            </div>
      
            <div className="w-[4.9rem] max-md:w-[6.2rem] truncate ">
            <AccountCircleIcon className="!text-icon  text-[#d64933]"/>  {translatedMenuItems[10]}
            {/* Assigned */}          
            </div>  
            <div className="w-[4.9rem] max-md:w-[6.2rem] truncate ">
            <AccountCircleIcon className="!text-icon  text-[#d64933]"/>  {translatedMenuItems[6]}
            {/* Assigned */}          
            </div>      
            </div>
          </div>
         <InfiniteScroll
            dataLength={customerLists.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"83vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
        >
            {customerLists.length ?
              <>
                {customerLists.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  const acivedPercentage = isNaN(Math.floor((item.outstanding / item.currencyPrice) * 100)) ? 0 : Math.floor((item.outstanding / item.currencyPrice) * 100)
                  const dataLoc = `${item.address && item.address.length && item.address[0].address1
                    } 
${item.address && item.address.length && item.address[0].street
                    }   
${item.address && item.address.length && item.address[0].state}
${(item.address && item.address.length && item.address[0].country) || ""
                    } 

`;
                  return (
                    <div>
                    <div className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">                 
                        <div className=" flex  w-[9rem] max-md:w-[14rem] max-xl:w-[11rem] border-l-2 border-green-500 bg-[#eef2f9] max-lg:w-[8rem]   max-sm:w-auto">
                          <div className="flex max-sm:w-auto">
                            <div>
                              <MultiAvatar
                                primaryTitle={item.name}
                                imageId={item.imageId}
                                imageURL={item.imageURL}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                            <div class="w-[0.25rem] "></div>
                            <div class="max-sm:w-auto flex items-center ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">

                                    <Link
                                      class="overflow-ellipsis whitespace-nowrap  max-sm:text-sm text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                      to={`distributor/${item.distributorId}`}
                                      title={`${item.name}`}>
                                      {item.name.substring(0, 25)}
                                    </Link>  &nbsp;&nbsp;
                                    {date === currentdate ? (
                                      <div class="text-[0.65rem] text-[tomato] font-bold" >
                                        {translatedMenuItems[7]}  {/* New */}
                                      </div>
                                    ) : null}

                                  </div>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                          <div class="flex text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] justify-start max-sm:text-sm ml-gap ">
                        <div className=" flex max-md:w-[9.1rem]  w-[6.6rem] items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">                     
                          {editableField?.distributorId === item.distributorId && editableField?.field === 'dialCode' ? (
                              <Select
                              style={{ width: "9.1rem" }}
                              value={editingValue}
                              onChange={handleChangeRowSelectItem} 
                              autoFocus
                            >
                              {props.countries.map((cntr) => (
                                <Option key={cntr.country_dial_code} value={cntr.country_dial_code}>
                                  {cntr.country_dial_code}
                                </Option>
                              ))}
                            </Select>
                            ) : (
                              <div className="cursor-pointer !text-xs font-poppins"
                               onClick={() => handleEditRowField(item.distributorId, 'DialCode', item.dialCode)}>
                                {item.dialCode || "Update..."}
                              </div>
                            )}
                              <div className='ml-[0.25rem]' >
{editableField?.distributorId === item.distributorId &&
   editableField?.field === 'phoneNo' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'phoneNo', item.phoneNo)} 
    className="cursor-pointer !text-xs font-poppins">
    {item.phoneNo || "Update..."}
    
    </div> 
)}
  </div>
                          </div>

                        </div>

                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">                   
                        <div className=" flex  max-sm:w-auto w-[9.2rem] max-md:w-[9.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs ml-gap font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'dcategoryName' ? (
<Select
      style={{ width: "9.2rem" }}
      value={editingValue}
      onChange={handleChangeRowSelectItem} 
      autoFocus
    >
      {props.category.map((ctg) => (
        <Option key={ctg.categoryId} value={ctg.categoryId}>
          {ctg.name}
        </Option>
      ))}
    </Select>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'dcategoryName', item.dcategoryName)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.dcategoryName || "Update..."}
    
    </div> 
)}

                          </div>
                        </div>
                      
                        <div className=" flex  max-sm:w-auto w-[6rem] max-md:w-[8rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center ml-gap justify-start max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'clientName' ? (
<Select
      style={{ width: "8rem" }}
      value={editingValue}
      onChange={handleChangeRowSelectItem} 
      autoFocus
    >
      {props.customerListData.map((clnt) => (
        <Option key={clnt.customerTypeId} value={clnt.customerTypeId}>
          {clnt.name}
        </Option>
      ))}
    </Select>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'clientName', item.clientName)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.clientName || "Update..."}
    </div> 
)}
                            

                          </div>
                        </div>

                      
                        <div className=" flex  max-sm:w-auto w-[5.7rem] max-md:w-[9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'payment' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'payment', item.payment)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.payment || "Update..."} 
    </div> 
)}

                          </div>
                        </div>
                      
                        <div className=" flex  max-sm:w-auto bg-[cadetblue]  w-[6rem] max-md:w-[7rem] items-center justify-center h-8 ml-gap  max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                            {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'clubName' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'clubName', item.clubName)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.clubName || "Update..."}
    </div> 
)}

                            </div>
                          </div>
                          <div className=" flex  items-center justify-center max-sm:w-auto w-[10.7rem] max-md:w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                            {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'payment' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'payment', item.payment)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.payment || "Update..."} days
    </div> 
)}

                            </div>
                         
                          <div className=" flex  items-center justify-center max-sm:w-auto w-[3rem] max-md:w-[3rem] max-xl:w-[3rem] max-lg:w-[2rem]  bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">       
                              {visible && (item.distributorId === particularRowData.distributorId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)} 
                                                                />
                                                                : item.dispatchPaymentPercentage}%
                            </div>
                          </div>
                          
                          <div className=" flex  items-center justify-center  w-[1.06rem] max-md:w-[1.06rem] bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.distributorId === particularRowData.distributorId) ? (
                                                            <>
                                                                <div className=" flex justify-between ">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >{translatedMenuItems[10]}
                                                                      
                                                                            {/* defaultMessage="Save" */}
                                                                        
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[15]} 
                                                                        {/* defaultMessage="Cancel" */}
                                                                   
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : <Tooltip title={translatedMenuItems[16]}
                                                      
                                                        //     defaultMessage="Update Revised Price"
                                                         
                                                        >
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-icon cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> }

                                                    </div>

                                                </div>
                                                </div>
                      </div>
                     
                      <div className=" flex items-center justify-between bg-[#eef2f9] h-8 ml-gap max-sm:w-auto w-[15.01rem] max-md:w-[9.01rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <div className=" flex items-center max-sm:w-auto w-[3rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <AccountCreditToggle distributorCreditInd={item.distributorCreditInd} distributorId={item.distributorId}/>&nbsp;                            
                          </div>
                          <div>
                          <Tooltip title="">
                                                 
                                                 <Progress
                                                 className=' w-[6rem] cursor-pointer ml-2'
                                                percent={acivedPercentage}
                                                success={{acivedPercentage}}
                                               // strokeColor={getGradientStrokeColor(acivedPercentage)}
                                                format={() => `${acivedPercentage}%`} 
                                                //  style={{width:"6rem",cursor:"pointer", marginLeft:"0.25rem"}} 
                                                      />                                                       
                                                </Tooltip>
                                                </div>
                          <div class=" text-xs flex items-center justify-center font-poppins w-[5.021rem] bg-[#eef2f9] h-8   text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {/* {item.curName} {(item.currencyPrice / 1000).toFixed(0)}k */}
                              {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'curName' ? (
<Select
      style={{ width: "6.021rem" }}
      value={editingValue}
      onChange={handleChangeRowSelectItem} 
      autoFocus
    >
      {props.saleCurrencies.map((crr) => (
        <Option key={crr.currency_id} value={crr.currency_id}>
          {crr.currency_name}
        </Option>
      ))}
    </Select>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'curName', item.curName)} 
    className="cursor-pointer !text-xs font-Poppins">
    {item.curName || "Update..."} 
    </div> 
)}
                     
                              {editableField?.distributorId === item.distributorId &&
   editableField?.field === 'currencyPrice' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onBlur={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.distributorId, 'currencyPrice', item.currencyPrice)} 
    className="cursor-pointer ml-[0.25rem] text-xs font-Poppins">
    {(item.currencyPrice / 1000).toFixed(0)}k  
    </div> 
)}
                            </div>                  
                        </div>
                       
                    
                       <div className=" flex  items-center max-sm:w-auto flex-col w-[4.5rem] max-md:w-[5rem]justify-center ml-gap h-8 bg-[#eef2f9] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                          <div class="max-sm:flex justify-end">
                          {item.assignToUser?
                            <Tooltip title={item.assignToUser}>
                                 <div className=' cursor-pointer'
                                  onClick={() => {
                                  //handleSetCurrentCustomerId(item.customerId)
                                  props.handleUpdateAccountUserModal(true);
                                  handleCurrentRowData(item);
                                }} >
                              <MultiAvatar
                                primaryTitle={item.assignToUser}
                                imageId={item.ownerImageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                              </div>
                            </Tooltip>:""}
                          </div>                      
                      </div>    
                      <div className=" flex  items-center max-sm:w-auto flex-col w-[4.5rem] max-md:w-[5rem]justify-center ml-gap h-8 bg-[#eef2f9] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                          <div class="max-sm:flex justify-end">
                          {item.salesExecutive?
                            <Tooltip title={item.salesExecutive}>
                                 <div className=' cursor-pointer' 
                                  
                               
                                >
                              <MultiAvatar
                                primaryTitle={item.salesExecutive}
                                imageId={item.ownerImageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                              </div>
                            </Tooltip>:""}
                          </div>                      
                      </div>      
                      <div className=" flex items-center w-[5rem] max-md:w-[5rem] justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
<span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[9rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span>

                        
                          </div>  

                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                      <div className=" flex max-md:w-[1.2rem]  max-xl:w-[1.2rem] max-sm:flex-row items-center justify-center h-8 bg-[#eef2f9] max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title=  {translatedMenuItems[8]}>
                            {/* "Pulse"> */}
                              <MonitorHeartIcon
                                onClick={() => {
                                  props.handleAccountPulse(true);
                                  handleCurrentRowData(item);
                                }}
                                className=" !text-icon cursor-pointer text-[#df9697]"
                              />
                            </Tooltip>
                          </div>
                        </div>
                        <div class=" flex items-center justify-center h-8  bg-[#eef2f9]">
                        <Tooltip title=  {translatedMenuItems[13]}>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAccountAddress(true);
            handleCurrentRowData(item);
          }}
          
        /> 
        </Tooltip>  
        </div>

                      <div className=" flex    max-xl:w-[1.2rem] items-center justify-center h-8 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                      <div>
                        <Tooltip title={item.url}>
                          {item.url !== "" ? (
                            <div      
                              onClick={() => { }}
                            >
                              {" "}
                              <a href={`https://${item.url}`} target="_blank">
                                <ExploreIcon
                                  className=" !text-icon cursor-pointer text-[green]"

                                />
                              </a>
                            </div>
                          )
                            : <div class=" w-3">

                            </div>
                          }
                        </Tooltip>

                      </div>
                        </div>
</div>
                      </div>
                    </div>
                
                  )
                })}
              </> 
              : !customerLists.length && !props.fetchingAllDistributors ? <NodataFoundPage /> : ""}
          </InfiniteScroll>
        </div>
        </div>
          )}
            <Suspense fallback={<BundleLoader />}>
  
      <AccountPulseModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        RowData={RowData}
        handleAccountPulse={props.handleAccountPulse}
        showPulseModal={props.showPulseModal}
      />
        <UpdateAccountUserModal 
        RowData={RowData}
        handleUpdateAccountUserModal={props.handleUpdateAccountUserModal}  
        updateAccountUserModal={props.updateAccountUserModal}
      />
       <AddAccountAdressModal   
        item={RowData}
         type="Distributor"
         addAccountAddressModal={props.addAccountAddressModal}
         handleAccountAddress={props.handleAccountAddress}
      /> 
      </Suspense>
    </>
  )
}

const mapStateToProps = ({ distributor,auth,catgCustomer }) => ({
  allDistributors: distributor.allDistributors,
  updateAccountUserModal:distributor.updateAccountUserModal,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  showPulseModal: distributor.showPulseModal,
  updateAccountModal: distributor.updateAccountModal,
  orgId: auth.userDetails.organizationId,
  distributorSearch:distributor.distributorSearch,
  addAccountAddressModal:distributor.addAccountAddressModal,
  category: auth.category,
  customerListData: catgCustomer.customerListData,
  saleCurrencies: auth.saleCurrencies,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
      handleUpdateAccountModal,
      handleAccountAddress,
      handleUpdateAccountUserModal,
      getCategory,
      getCustomer,
      getSaleCurrency,
      getCountry
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);



