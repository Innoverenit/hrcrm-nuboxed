import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../Components/Placeholder";
import { Popconfirm, Tooltip,Input,Button } from "antd";
import { Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import InfiniteScroll from "react-infinite-scroll-component";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import {
  getCustomerByUser,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributor,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  handleAccountModal,
  emptyDistributor,
  handleAccountPulse,
  updateAccountPrice,
  handleAccountAddress,
  handleAccountOpportunityModal
} from "./AccountAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import AsignedOpenDrawer from "./AsignedOpenDrawer";
import Opportunity from "../../Opportunity/Opportunity";
const AddAccountAdressModal = lazy(() => import("./AddAccountAdressModal"));
const AccountCreditToggle = lazy(() => import("./AccountCreditToggle"));
const AccountSearchedData = lazy(() => import("./AccountSearchedData"));
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));
const  AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const AccountModal = lazy(() => import("./AccountModal"));
const AccountQuotationDrawer =lazy(()=>import("./AccountDetailsTab/AccountQuotationDrawer"));

function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
 const [asignedDrawer,setasignedDrawer] =useState(false);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
           "110", // 'Name', // 0
         "378", // 'Work', // 1
          "14",  // 'Category', // 2
          "71",  // 'Type', // 3
           "688", // 'Payment(Days)', // 4
            "1171",// 'Payment', // 5
           "1215", // 'Tax', // 6
            "76",// 'Assigned', // 7  
            "1338",// "Credit",//8
            "100", // New 9
            "1259",// "Save" //10
            "692", // More Info With AI 11
            "392",// "Pulse" 12
            "170",// "Edit"13
            "1259", // "Do you want to delete?"14
             "1079",// cancel15
             "1246",// Update  16
             "592",          // club 17
             "185",//Adress 18
             "84",//Delete 19
             "202",//Orders
             "213",//Quotation

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
        setPage(page + 1);
    props.getCustomerByUser(props.userId, page);
  }, [props.userId]);

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
 

  const handleChange = (val) => {
      //  setPrice(val)
      if (!isNaN(val) && val > 0 && val < 101) {
        setPrice(val);
      } else {
        setPrice(''); // Reset the input if the value is not valid
      }
  
  }
  const handleSubmitPrice = () => {
      props.updateAccountPrice(
          {
              dispatchPaymentPercentage: price,
              
          },
          particularRowData.distributorId,

      );
      setVisible(false)
  }

  const handleLoadMore = () => {
    const PageMapd = props.customerListByUser && props.customerListByUser.length && props.customerListByUser[0].pageCount
    setTimeout(() => {  
      if  (props.customerListByUser)
      {
        if (page < PageMapd) {    
          setPage(page + 1);
          props.getCustomerByUser(props.userId, page);
            }
              if (page === PageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  };

  const {
    handleUpdateAccountModal,
    handleAccountModal,
  } = props;
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;

  return (
    <>
    {props.distributorSearch.length > 0 ? (
       <Suspense fallback={<BundleLoader />}>
    <AccountSearchedData
     selectedLanguage={props.selectedLanguage}
     translateText={props.translateText}
    distributorSearch={props.distributorSearch}
    /></Suspense>
  ) : (
      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-white" >
          <div className=" flex max-sm:hidden   w-[91%]  justify-between p-1 bg-transparent sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
           <div class=" flex justify-between items-end !text-lm font-poppins  font-bold  w-[100%]  ">
            <div className="w-1"></div>
            <div className=" w-[12.1rem] text-[#00A2E8] text-sm max-md:w-[12.1rem]"> 
            <ContactsIcon className="!text-icon  "/> {translatedMenuItems[0]}
            {/* Name */}
            </div>
            <div className=" w-[8.11rem] max-md:w-[8.11rem]">
            <ApartmentIcon className="!text-icon mr-1 "/>{translatedMenuItems[1]}
           {/* Work */}
            </div>
            <div className=" w-[8.1rem] max-md:w-[8.1rem] ">
            <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[2]}
              {/* Category */}
              </div>
            <div className="w-[6.02rem] max-md:w-[6.02rem]">
            < MergeTypeIcon className='!text-icon text-[#c42847] '  /> {translatedMenuItems[3]}
          {/* Type */}
             </div>
             <div className="w-[4.01rem] max-md:w-[4.01rem] ">
             <DynamicFeedIcon
              className='!text-base  text-[#e4eb2f]'
              />  {translatedMenuItems[20]}
          {/* Orders */}
             </div>
             <div className="w-[5.03rem] max-md:w-[5.03rem]">
             <LightbulbIcon className="!text-icon text-[#84a59d]"/>  {translatedMenuItems[21]}
          {/* Quotation*/}
             </div>
             <div className="w-[5.210rem] max-md:w-[5.2rem]">
            {/* Club */}  <GolfCourseIcon className='!text-base   text-[#f42c04]'/> {translatedMenuItems[17]}
         
            </div> 

            <div className="w-[9.2rem] max-md:w-[9.2rem]">
            <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' /> {translatedMenuItems[5]}
            {/* Payment % */}
       
            </div>
           {/* "billingaddress" */}
           <div className="w-[5.2rem] max-md:w-[5.2rem]">
           <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' />  {translatedMenuItems[8]}
            {/* Credit */}          
            </div>
  <div className="w-[5.3rem] max-md:w-[5.3rem]">
  <AccountCircleIcon className="!text-icon  text-[#d64933]"/>   {translatedMenuItems[7]}
            {/* Assigned */}          
            </div>         
                 
          </div>
          </div>
          <InfiniteScroll
            dataLength={props.customerListByUser.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingCustomerByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"83vh"}
            style={{ scrollbarWidth:"thin"}}
            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
          >
            {props.customerListByUser.length ?
              <>
                {props.customerListByUser.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  const diff = Math.abs(
                    dayjs().diff(dayjs(item.lastRequirementOn), "days")
                  );
                  const dataLoc = `${item.address && item.address.length && item.address[0].address1
                    } 
            ${item.address && item.address.length && item.address[0].street
                    }   
           ${item.address && item.address.length && item.address[0].state}
          ${(item.address && item.address.length && item.address[0].country) || ""
                    } 
                   ${item.address && item.address.length && item.address[0].postalCode}
            `;
                  return (
                    <div>
                      <div className="flex  justify-between  bg-white mt-1 py-ygap items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "                                >
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                          <div className=" flex w-[12rem] max-md:w-[12rem] max-xl:w-[11rem] max-lg:w-[8rem] border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-auto">
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
                              <div class="w-[0.25rem]"></div>
                             
                                <Tooltip>
                                  <div class="flex max-sm:flex-row justify-between w-full ">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">

                                      <Link
                                        class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 max-sm:text-xs text-[#042E8A] font-bold font-poppins flex items-center cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                        to={`distributor/${item.distributorId}`}
                                        title={`${item.name}`}>
                                        {item.name.substring(0, 25)}
                                      </Link> 
                                      {date === currentdate ? (
                                        <div class="text-[0.65rem] text-[tomato] font-bold items-center" >
                                        {translatedMenuItems[9]}  {/* New */}
                                        </div>
                                      ) : null}

                                </div>
                                  </div>
                                </Tooltip>
                        
                            </div>
                          </div>
                          <div className=" flex  items-center justify-start h-8 ml-gap  bg-[#eef2f9] w-[7.1rem] max-md:w-[7.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">
                            <div class="flex ml-gap text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-xs ">
                              {item.dialCode} {item.phoneNo}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex items-center justify-start max-sm:w-auto max-md:w-[7.2rem] w-[7.2rem]  max-xl:w-[5.2rem] bg-[#eef2f9] h-8 ml-gap max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class="flex ml-gap text-xs items-center  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.dcategoryName}
                            </div>
                          </div>
                          <div className=" flex items-center justify-start  max-sm:w-auto w-[6.2rem] max-md:w-[6.2rem] max-xl:w-[6rem] max-lg:w-[5rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" flex ml-gap text-xs items-center  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.clientName}

                            </div>
                          </div>
                          <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:w-auto w-[4.2rem] max-md:w-[4.2rem] max-xl:w-[6rem] max-lg:w-[5rem]  max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                             
                            {item.procureCount} 

                            </div>
                          </div>
                          <div className=" flex items-center justify-center  max-sm:w-auto w-[5.21rem] max-md:w-[5.21rem] max-xl:w-[6rem] max-lg:w-[5rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs cursor-pointer font-bold font-poppins text-center text-blue-600  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                            
                               onClick={() => {
                                        props.setEditDistributor(item)
                                        props.handleAccountOpportunityModal(true);
                                        handleCurrentRowData(item);
                                      }}
                       >
                           
                            {item.qtProcureCount} 

                            </div>
                          </div>
                          <div className=" flex items-center justify-center  max-sm:w-auto w-[5rem] max-md:w-[5rem] max-xl:w-[3rem] max-lg:w-[2rem] ml-gap bg-[cadetblue] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.clubName}

                            </div>
                          </div>
                          <div className=" flex  items-center justify-center max-sm:w-auto w-[8.2rem] max-md:w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.payment} days

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
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">            
                      <div className=" flex items-center justify-between bg-[#eef2f9] h-8 ml-gap max-sm:w-auto w-[15.01rem] max-md:w-[9.01rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <div className=" flex items-center max-sm:w-auto w-[2rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <AccountCreditToggle distributorCreditInd={item.distributorCreditInd} distributorId={item.distributorId}/>&nbsp;                            
                          </div>
                          <div class=" text-xs flex items-center justify-center font-poppins w-[6.021rem] bg-[#eef2f9] h-8   text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.curName} {item.currencyPrice}

                            </div>                  
                        </div>

                        <div class=" text-xs items-center justify-center flex bg-[#eef2f9] h-8 ml-gap w-[3.5rem] max-md:w-[2.5rem] font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {/* Assigned */}
                                  {item.assignToUser?
                                  <span onClick={()=>{handleCurrentRowData(item);
                                    setasignedDrawer(true)}}>
                                  <MultiAvatar2
            primaryTitle={item.assignToUser}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>:""}
                      </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">   
                              <div className=" flex items-center justify-center bg-[#eef2f9] h-8  ml-gap  max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <Tooltip title={translatedMenuItems[12]}>
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
                            <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                            <Tooltip title={translatedMenuItems[18]}>
                            <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAccountAddress(true);
            handleCurrentRowData(item);
          }}
          
        />  
        </Tooltip>   
        </div>        
<div className=" items-center justify-center flex  bg-[#eef2f9] h-8  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
  <div class=" text-xs  font-poppins">
    <Tooltip title={translatedMenuItems[11]}>
    {/* "More Info With AI" */}
      <AcUnitIcon
        className=" !text-icon cursor-pointer text-[tomato]"
        onClick={() => {
          // props.setEditDistributor(item)
          handleAccountModal(true);
          handleCurrentRowData(item);
        }}
      />
    </Tooltip>
  </div>
</div>                                            
                              <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                                <Tooltip title={item.url}>
                                  {item.url !== "" ? (
                                    <div
                                      style={{ cursor: "pointer" }}
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
                                    : <div class=" w-0">

                                    </div>
                                  }
                                </Tooltip>

                              </div>
                              {/* <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                                <Tooltip title="Quotation">
                                <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm  cursor-pointer" to={`Opportunity`}>
                                   
                                
                                      <LightbulbIcon className="!text-icon text-[#bfa89e]"
                                     
                                      onClick={() => {
                                        props.setEditDistributor(item)
                                        props.handleAccountOpportunityModal(true);
                                        handleCurrentRowData(item);
                                      }}
                                    />
                                     <Opportunity/>
                                     </Link>
                                </Tooltip>

                              </div> */}
                              

                            <div className=" items-center justify-center flex bg-[#eef2f9] h-8  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <Tooltip title={translatedMenuItems[13]}>
                                {/* "Edit"> */}
                                  <BorderColorIcon
                                    className=" !text-icon cursor-pointer text-[tomato]"
                                    onClick={() => {
                                      props.setEditDistributor(item)
                                      handleUpdateAccountModal(true);
                                      handleCurrentRowData(item);
                                    }}
                                  />

                                </Tooltip>
                              </div>


                            </div>
                            <div className=" items-center justify-center flex bg-[#eef2f9] h-8  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                              <Tooltip title={translatedMenuItems[19]}>
                                <Popconfirm
                                loading={props.deletingDistributorById}
                                  title={translatedMenuItems[14]}
                                  // Do you want to delete?"
                                  onConfirm={() => props.deleteDistributor({}, item.distributorId,props.userId)}
                                >
                                  <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                                </Popconfirm>
 </Tooltip>
                              </div>


                            </div>
                          </div>
                       
                      </div>
                    </div>
                  </div>

                  )
                })}
              </>
              : !props.customerListByUser.length && !props.fetchingCustomerByUser ? <NodataFoundPage /> : ""}
          </InfiniteScroll>
        </div>
      </div>
        )}
          <Suspense fallback={<BundleLoader />}>
      <UpdateAccountModal
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}

      />
      <AccountPulseModal
        RowData={RowData}
        handleAccountPulse={props.handleAccountPulse}
        showPulseModal={props.showPulseModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}

      />
        <AccountModal
        RowData={RowData}
        accountModal={props.accountModal}
        handleAccountModal={handleAccountModal}
         selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}/>
         <AddAccountAdressModal    
        item={RowData}
         type="Distributor"
         addAccountAddressModal={props.addAccountAddressModal}
         handleAccountAddress={props.handleAccountAddress}
      /> 
      <AccountQuotationDrawer
       RowData={RowData}
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}
            addAccountOpportunityModal={props.addAccountOpportunityModal}
            handleAccountOpportunityModal={props.handleAccountOpportunityModal}/>

            <AsignedOpenDrawer 
               RowData={RowData}
               setasignedDrawer={setasignedDrawer}
               asignedDrawer={asignedDrawer}
               selectedLanguage={props.selectedLanguage}
               translateText={props.translateText}
            />
</Suspense>
    </>  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  customerListByUser: distributor.customerListByUser,
  serachedData:distributor.serachedData,
  showPulseModal: distributor.showPulseModal,
  fetchingCustomerByUser: distributor.fetchingCustomerByUser,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateAccountModal: distributor.updateAccountModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress,
  accountModal:distributor.accountModal,
  deletingDistributorById:distributor.deletingDistributorById,
  distributorSearch:distributor.distributorSearch,
  addAccountAddressModal:distributor.addAccountAddressModal,
  addAccountOpportunityModal: distributor.addAccountOpportunityModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getCustomerByUser,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributor,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      handleAccountModal,
      emptyDistributor,
      handleAccountPulse,
      updateAccountPrice,
      handleAccountAddress,
      handleAccountOpportunityModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);

