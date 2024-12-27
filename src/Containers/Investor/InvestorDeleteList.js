import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import { bindActionCreators } from "redux";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ExploreIcon from "@mui/icons-material/Explore";
import ArticleIcon from '@mui/icons-material/Article';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FactoryIcon from '@mui/icons-material/Factory';
import SourceIcon from '@mui/icons-material/Source';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Tooltip, Select, } from "antd";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import dayjs from "dayjs";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import {
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
} from "../Customer/CustomerAction";
import ReactCountryFlag from 'react-country-flag';
import {getInvestorDeletelist,
  handleInvestorContModal,
  handleUpdateInvestorModal,
  handleInvestorPulseDrawerModal,
  handleInvestorDocumentModal,
  handleInvestorNotesDrawerModal,emptyInvestor,
  deleteInvestorData,
  handleInvestorPriceDrawer
} from "./InvestorAction";
import { BundleLoader } from "../../Components/Placeholder";

const InventoryPriceDrawer = lazy(() => import("./Child/InvestorTable/InventoryPriceDrawer"));
const AddInvestorNotesDrawerModal = lazy(() => import("./Child/InvestorDetail/AddInvestorNotesDrawerModal"));
const ReInstateInvestor = lazy(() => import("./ReInstateInvestor"));
const InvestorSearchedData = lazy(() => import("./Child/InvestorTable/InvestorSearchedData"));
const ContactsInvestorModal = lazy(() => import("./Child/InvestorTable/ContactsInvestorModal"));
const InvestorPulseDrawerModal = lazy(() => import("./Child/InvestorTable/InvestorPulseDrawerModal"));
const InvestorDocumentDrawerModal = lazy(() => import("./Child/InvestorTable/InvestorDocumentDrawerModal"));

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorDeleteList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
            "278",//1 sector
            "490",//2 Deals
            "144",//3 In Progress
            "579",//4 signed
            "14",//5 Category
            "279",//6 source
            "589",//7 First Meeting
            "1158",//8 share
            "218",//9 Value
            "592",//10 Club
            "76",//11 Assigned
            "77",//12 Owner
          
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
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getInvestorDeletelist(props.orgId);
    // setPage(page + 1);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    return () => props.emptyInvestor();
  }, []);

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {

      setPage(page + 1);
      props.getInvestorDeletelist(
        props.currentUser ? props.currentUser : props.userId,
        page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    handleInvestorContModal,
    handleInvestorPulseDrawerModal,
    handleInvestorDocumentModal,
    addDrawerInvestorPulseModal,
    addDrawerInvestorDocumentModal,
    addDrawerInvestorContactModal,
    updateInvestorModal,
    investor,
    priceInvestorDrawer,
    deleteInvestorData,
    handleInvestorPriceDrawer,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
   {props.investorSerachedData.length > 0 ? (
    <InvestorSearchedData
    investorSerachedData={props.investorSerachedData}
    fetchingInvestorSearchData={props.fetchingInvestorSearchData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between max-sm:hidden  w-[89%]  p-1 bg-transparent font-bold font-poppins text-xs sticky max-xl:text-xs max-lg:text-[0.45rem] !text-lm z-10">
          <div className="w-2"></div>
        <div className=" w-[11.6rem] text-[#00A2E8] text-sm truncate max-md:w-[11.6rem]  max-xl:w-[14.4rem] ">
        <LocationCityIcon className='!text-icon  '  /> {translatedMenuItems[0]} 
        {/* "Name" */}          
                     </div>
        <div className="  w-[7.55rem] truncate max-md:w-[7.55rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]">
        <FactoryIcon className="!text-icon   text-[#84a59d]"/>  {translatedMenuItems[1]}
        {/* "Sector" */}
                    </div>
        <div className=" w-[4.12rem] truncate max-md:w-[4.12rem]  max-xl:w-[5.12rem] max-lg:w-[8.12rem]">
        <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' />  {translatedMenuItems[2]}
         {/* "Deals" */}          
                </div>
        <div className=" w-[5.2rem] truncate max-md:w-[5.2rem] max-xl:w-[8.2rem]">
        {translatedMenuItems[3]}
        {/* "In Progress" */}           
          </div>
          <div className=" w-[5.2rem] truncate max-md:w-[5.2rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[4]}
          {/* "Signed" */}            
          </div>
          <div className=" w-[6.21rem] truncate max-md:w-[6.21rem] max-xl:w-[8.2rem]">
          <FormatListNumberedIcon className='!text-icon    text-[#42858c]' />  {translatedMenuItems[5]}
          {/* "Category" */}            
          </div>
          <div className=" w-[6.34rem] truncate max-md:w-[6.34rem]  max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
          <SourceIcon className="!text-icon   text-[#4b5043]"/>  {translatedMenuItems[6]}
        {/* "Source"         */}
          </div>
          <div className=" w-[8.22rem] truncate max-md:w-[8.22rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[7]}
      {/* First Meeting */}
          </div>
          <div className=" w-[3.212rem] truncate max-md:w-[3.212rem] max-xl:w-[8.2rem]">
          <ShowChartIcon className='!text-icon    text-[#776871]' /> {translatedMenuItems[8]}
       {/* Shares # */}
          </div>         
          <div className=" w-[6.2rem] truncate max-md:w-[6.2rem]  max-xl:w-[8.2rem]">
          {translatedMenuItems[9]}
        {/* Value */}
          </div>
          <div className=" w-[3.21rem] truncate max-md:w-[3.21rem] max-xl:w-[8.2rem]">
          <GolfCourseIcon className='!text-base   text-[#f42c04]'/>  {translatedMenuItems[10]}
        {/* Club */}
          </div>
        <div className=" w-[4.33rem] truncate max-md:w-[4.33rem]  max-xl:w-[10.3rem]">
        <AccountCircleIcon className="!text-icon   text-[#d64933]"/>{translatedMenuItems[11]}
      {/* Assigned" */}         
         </div>
        <div className="  w-[3.13rem] truncate max-md:w-[3.13rem] max-xl:w-[8.21rem]">
        {translatedMenuItems[12]}
        {/* "owner" */}       
                </div>
     
      </div>
       
        
        { props.deleteInvestorList.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                        <div>
                            <div
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:rounded-lg max-xl:text-xs max-lg:text-[0.45rem]  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">


                                     <div className=" flex   w-[9.5rem] ml- border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  items-center">
                                <div>

                                                   <MultiAvatar
                                                      primaryTitle={item.name}
                                                      imageId={item.imageId}
                                                      imageURL={item.imageURL}
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                                  
                                        </div>                                                 
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col ml-1">                                         
                                            {/* Name */}
                                  
                                            <div class=" flex items-center   text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] cursor-pointer  max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
                                            {item.name}
                                        </Link>                                
                                              {/* {/* <Link */}
                                             
                                              
                                              {date === currentdate ? (
                                                <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
       
                                            </div>
                                            </ div>
                                        </Tooltip>
                              
                                </div>
                                </div> 
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[6.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                {/* Sector                     */}
                                    <div class="text-xs items-center ml-gap font-poppins  max-sm:text-sm">   
                                    {item.sector}
                                    </div>
                                </div>
                                                                                                                    
                               
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3rem] max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                              
                               {/* Country */}
                                  <div class="text-xs  font-poppins  max-sm:text-xs">
                                              <ReactCountryFlag
                                    countryCode={item.countryAlpha2Code}
                                    svg
                                    style={{
                                      width: '1rem',
                                      height: '1rem',
                                    }}
                                  />
                                  &nbsp;
                                {item.countryAlpha2Code}
                                              </div>
                                          </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Deals */}

                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.oppNo}
                                    </div>
                                </div>   
                               
                               </div>
                               <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.124rem] max-xl:w-[6.124rem] max-lg:w-[5.124rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Pipeline Value */}

                                    {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center ">
        {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                                </div>
                              
                             
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* # Signed */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.signed}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # category */}

                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.category}
                                    </div>
                                </div>
                               
                            
                                <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[7.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs  font-poppins  max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                </div>
                                    <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* Deals */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">                               
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* Deals */}

                                    <div class="text-xs text-[blue] cursor-pointer justify-center  font-poppins  max-sm:text-sm">
                                  <div  onClick={() => {
                              props.handleInvestorPriceDrawer(true);
                              handleCurrentRowData(item);
                            }}>{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>
                               
                              
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Deals */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.allTotalAmountOfShare}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Deals */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Assigned */}
                                    <div class=" text-xs  font-poppins  max-sm:text-sm">                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                   </Tooltip>
                )}
                </>
              )}
            </span>          
                                    </div>
                                </div>
                                <div className=" flex  w-[3.32rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.1rem] max-lg:w-[3.1rem] max-sm:flex-row max-sm:w-auto mb-1 max-sm:justify-between ">
                                {/* Owner */}                    
                       <span>
                       <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end">
                <Tooltip title={item.ownerName}>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </Tooltip>
            </div>
          </Tooltip>
            </span>
                   </div>
                
                </div>
                                            
                                <div class="flex w-wk cursor-pointer justify-between items-center"> 
                                <div class="items-center justify-center h-8 ml-gap bg-[#eef2f9]  text-xs max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateInvestor investorId={item.investorId} />
                            </div> 
                            <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
                          <Tooltip title="Pulse">
         <MonitorHeartIcon
                  onClick={() => {
                    handleInvestorPulseDrawerModal(true);
                    handleCurrentRowData(item);
                  }}
                  className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl"
                />
             </Tooltip>
                          </div>                                                                            
                          <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
                   <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleInvestorNotesDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
              />
           </Tooltip>
                   </div> 
                   <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
                                  <Tooltip title="Document">
                                    <ArticleIcon 
                                  onClick={() => {
                                    handleInvestorDocumentModal(true);
                                    handleCurrentRowData(item);
                                  }}
                                   className=" !text-icon cursor-pointer"
                                  />
                                  </Tooltip>
                                  </div>          
                                           
                                  <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
                    <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span class="cursor-pointer"
                  //type="edit"
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
                    />
                  </a>
                </span>
              ):<div class=" w-3">                   
              </div>}
            </Tooltip>
                        </div>                                    
                        <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
                        <span 
              className=" !text-icon cursor-pointer"    
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl" />}
            </span> 
                        </div>      
                        <div  class="items-center flex justify-center h-8 ml-gap bg-[#eef2f9]">
            <Tooltip title="Investor Contact">
              <ContactEmergencyIcon
              className=" !text-icon cursor-pointer  text-blue-500 max-sm:!text-xl "
                onClick={() => {
                  handleInvestorContModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            </div>                                                   
            
         
           
                  </div>
                     
                            </div>
                        </div>
                    )
                })}

   
     </div>
     )}  
<Suspense fallback={<BundleLoader />}>
<ContactsInvestorModal
        RowData={RowData}
        addDrawerInvestorContactModal={addDrawerInvestorContactModal}
        handleInvestorContModal={handleInvestorContModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />

<InvestorPulseDrawerModal
        RowData={RowData}
        addDrawerInvestorPulseModal={addDrawerInvestorPulseModal}
        handleInvestorPulseDrawerModal={handleInvestorPulseDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />

<InvestorDocumentDrawerModal
        RowData={RowData}
        addDrawerInvestorDocumentModal={addDrawerInvestorDocumentModal}
        handleInvestorDocumentModal={handleInvestorDocumentModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />
           <AddInvestorNotesDrawerModal
        RowData={RowData}
        addDrawerInvestorNotesModal={props.addDrawerInvestorNotesModal}
        handleInvestorNotesDrawerModal={props.handleInvestorNotesDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
      />
      <InventoryPriceDrawer
          RowData={RowData}
          handleInvestorPriceDrawer={handleInvestorPriceDrawer}
          priceInvestorDrawer={priceInvestorDrawer}
          key={priceInvestorDrawer ? 'open' : 'closed'}
        />
      </Suspense>
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
  investor
}) => ({
  userId: auth.userDetails.userId,
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  investorsbyId:investor.investorsbyId,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  priceInvestorDrawer: investor.priceInvestorDrawer,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  addDrawerInvestorDocumentModal: investor.addDrawerInvestorDocumentModal,
  deleteInvestorList: investor.deleteInvestorList,
  orgId:auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorDeletelist,
      deleteInvestorData,
      handleUpdateInvestorModal,
      handleInvestorContModal,
      emptyInvestor,
      handleInvestorPulseDrawerModal,
      handleInvestorDocumentModal,
      handleInvestorNotesDrawerModal,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      handleInvestorPriceDrawer

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorDeleteList);

