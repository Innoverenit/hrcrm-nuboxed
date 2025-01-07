import React, { useEffect, useState,lazy,Suspense} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { MultiAvatar } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/Category'
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {
  getPitch,
  getPitchHot,
  getPitchWarm,
  getPitchCold,
  deletePitchData,
  handleUpdatePitchModal,
  setEditPitch,
  handlePitchNotesDrawerModal,
  updateTypeForPitch,
  handleAssimodal,
  handlePitchConvertModal,
  handleAddresspitchModal
} from "../PitchAction";
import { Button, Tooltip ,Checkbox} from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";
import { BundleLoader } from "../../../Components/Placeholder";


const AddPitchAdressModal =lazy(()=>import("./AddPitchAdressModal"));
const EmptyPage =lazy(()=>import("../../Main/EmptyPage"));
const PitchSearchedData =lazy(()=>import("./PitchSearchedData"));
const UpdateLPitchModal =lazy(()=>import("../Child/UpdateLPitchModal"));
const OpenASSimodal =lazy(()=>import("./OpenASSimodal"));
const AddPitchNotesDrawerModal =lazy(()=>import("./AddPitchNotesDrawerModal"));
const AddConvertPitchStatusModal =lazy(()=>import("./PitchDetails/AddConvertPitchStatusModal"));
const ButtonGroup = Button.Group;

const PitchCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // props.getPitch(props.userId,page,"creationdate");
    props.getPitchHot(props.userId, page,"creationdate","hot");
    props.getPitchCold(props.userId, page,"creationdate","cold");
    props.getPitchWarm(props.userId, page,"creationdate","warm");
    setPage(page + 1)  
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "110",//0 Name
          "546",//1 Mobile
          "277",//2 Company
          "279",//3 source
          "278",//4 sector
          "14",//5 Category
          "1161",//6 shares
          "164",//7 First Meeting
          "218",//8Value
           "76",//9 Assigned
           "1114",//10 qualify
            "271" , // 11 Hot
            "272",  // 12 Warm
            "273",  //13  Cold"
            "100", //14  New
          "1453", //  15"Qualify? Pitch will move to Investor section!
          "1454", // 16 Company name is required to enable qualification action
          "316",// 17 Notes
          "1165", // 18 Activity
          "170", // 19 Edit
          "1259",  // 20 Do you want to delete?
          "84"
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };

const handleLoadMore = () => {
  const callPageMapd = props.pitchDataHot && props.pitchDataHot.length &&props.pitchDataHot[0].pageCount
  setTimeout(() => {
    const {
      getPitchHot,
     // userDetails: { employeeId },
    } = props;
    if  (props.pitchDataHot)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getPitchHot(
          props.currentUser ? props.currentUser : props.userId,
          page,
          props.filter?props.filter:"creationdate",
          "hot"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};
const handleLoadMore1 = () => {
  const callPageMapd = props.pitchDataWarm && props.pitchDataWarm.length &&props.pitchDataWarm[0].pageCount
  setTimeout(() => {
    const {
      getPitchWarm,
     // userDetails: { employeeId },
    } = props;
    if  (props.pitchDataWarm)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getPitchWarm(
          props.currentUser ? props.currentUser : props.userId,
          page,
          props.filter?props.filter:"creationdate",
          "warm"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};
const handleLoadMore2 = () => {
  const callPageMapd = props.pitchDataCold && props.pitchDataCold.length &&props.pitchDataCold[0].pageCount
  setTimeout(() => {
    const {
      getPitchCold,
     // userDetails: { employeeId },
    } = props;
    if  (props.pitchDataCold)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getPitchCold(
          props.currentUser ? props.currentUser : props.userId,
          page,
          props.filter?props.filter:"creationdate",
          "cold"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};


  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingPitch,leadsAllData  } = props;


  return (
    <div>
          {props.serachedPitchData.length > 0 ? (
    <PitchSearchedData
    serachedPitchData={props.serachedPitchData}
    />
  ) : (
    <>
  <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className=" flex justify-between max-sm:hidden w-[99%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
    <div className="flex items-center w-[7.12rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] text-white text-sm bg-red-600  justify-center ">Hot</div>
        <div className=" w-[10.1rem] truncate text-[#00A2E8] text-sm max-md:w-[10.1rem] max-xl:w-[9.6rem] ">
        <CategoryIcon className='!text-icon   text-[#e4eb2f]'/>
         {translatedMenuItems[0]}   
                {/* name */}           
               </div>
        <div className=" w-[4.1rem] max-xl:w-[3rem]"></div>
        <div className=" w-[8.3rem] truncate max-md:w-[8.3rem] max-xl:w-[5.1rem]  ">
        <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> 
        {translatedMenuItems[1]}
        {/* Mobile */}
                </div>      
        <div className="w-[9.12rem]  truncate max-md:w-[9.12rem] max-xl:w-[5.122rem]  ">
        <ApartmentIcon className="!text-icon mr-1 "/> 
        {translatedMenuItems[2]} 
        {/* company */}
                </div>
                    <div className="w-[6.12rem]   truncate max-md:w-[6.12rem]">
                    <SourceIcon className="!text-icon  text-[#4b5043]"/>  
                     {translatedMenuItems[3]} 
                     {/* source */}
                </div>
                     <div className="w-[5.121rem]  truncate max-md:w-[5.121rem]">
                     <FactoryIcon className="!text-icon  text-[#84a59d]"/> 
                       {translatedMenuItems[4]}  
                     {/* sector */}
                </div>
                 <div className="w-[7.23rem]  max-xl:w-[8.2rem]  truncate max-md:w-[7.23rem]">
                 <FormatListNumberedIcon className='!text-icon text-[#42858c]' /> 
                 {translatedMenuItems[5]} 
                 {/* Category */}
          </div>
          <div className="w-[5.236rem]  max-xl:w-[8.2rem]  truncate max-md:w-[5.236rem]">
          <ShowChartIcon className='!text-icon    text-[#776871]' />
           {translatedMenuItems[6]}   {/* Shares # */}      
          </div>
          <div className="w-[7.236rem]  max-xl:w-[8.2rem]   truncate max-md:w-[7.236rem]">     
          <EventAvailableIcon className="!text-icon   text-[#4b5043]"/> 1st
           {translatedMenuItems[7]}  {/* First Meeting */}   
          </div>
          <div className="w-[4.238rem]  max-xl:w-[8.2rem]  truncate max-md:">
          <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' />
           {translatedMenuItems[8]}  
         {/* Value */}  
          </div>
          {props.user.aiInd && (
            <div className=" w-[4.81rem]  truncate max-md:w-[4.81rem] max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  Score
          
            </div>
            )}
        <div className="w-[6.122rem]  truncate max-md:w-[6.122rem]">
          {/* Assigned */}
          <AccountCircleIcon className="!text-icon  text-[#d64933]"/> 
          {translatedMenuItems[9]}
        </div> 
       
        <div className="w-[10.6rem]  max-xl:w-[7.4rem] truncate max-md:w-[10.6rem]">
        {translatedMenuItems[10]} 
           {/* qualify */}
                </div>
          
      </div>
      <InfiniteScroll
        dataLength={props.pitchDataWarm.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={props.fetchingPitchWarm?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchWarm && props.pitchDataWarm.length === 0 ?<Suspense> <EmptyPage/> </Suspense>:props.pitchDataWarm.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//  const countryCode = item.address[0].country_alpha2_code  
const countryCode = item.countryAlpha2Code  
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1  items-center max-sm:rounded-lg  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   py-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                       <div class="flex flex-row items-center  border-l-2 border-green-500 bg-[#eef2f9]  w-[6rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
                                       <div class=" text-xs  font-poppins max-sm:text-sm ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.investorLeadsId)}
              checked={props.selectedDeals.includes(item.investorLeadsId)}
              />
                        )}
                        </div>  
                                        <div>
                                              <ButtonGroup>
                                              <RoleButton
                                              type="Hot"
                                              iconType="fas fa-mug-hot"
                                              // tooltip="Hot"
                                              tooltip= {translatedMenuItems[11]} 
                                              role={item.type}
                                                onClick={() =>{
                                              const typ="Hot"
                                              props.updateTypeForPitch(item.investorLeadsId,typ)
                                              }}
                                                />
                                                </ButtonGroup>
                                                </div>
                                                <div><ButtonGroup>
                                                <RoleButton1
                                                type="Warm"
                                                iconType="	fas fa-burn"
                                                // tooltip="Warm"
                                                tooltip= {translatedMenuItems[12]} 
                                                role={item.type}
                                                  onClick={() =>{
                                                const typ="Warm"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup></div>
                                                <div>
                                                <ButtonGroup>
                                                <RoleButton2
                                                type="Cold"
                                                iconType="far fa-snowflake"
                                                // tooltip="Cold"
                                                tooltip= {translatedMenuItems[13]} 
                                                role={item.type}
                                                  onClick={() => {
                                                const typ="Cold"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup>
                                                </div>

                                                </div>  

                                                </div>  
                                <div className=" flex   items-center h-8 ml-gap bg-[#eef2f9] w-[10rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full items-center  "> 
                                            <div>

                                                        <MultiAvatar
                                                          primaryTitle={item.name}
                                                          imageId={item.imageId}
                                                          imageURL={item.imageURL}
                                                          imgWidth={"1.8rem"}
                                                          imgHeight={"1.8rem"}
                                                        />
                                                      
                                            </div>
                                  
                                   <div class="flex max-sm:justify-start max-sm:w-wk items-center">
                                        <div class="max-sm:w-full ml-1" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                                                {/* Name
                                          */}
                                            <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                                      {/* {/* <Link */}
                                              
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}                  
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] ml-1 font-bold text-[0.65rem]" >
                                                 {translatedMenuItems[14]}    {/* New */}
                                                 </span>
                                               ) : null}
                                              
                                                    </div>
                                            </div>
                                        </Tooltip>
                                        </div>
</div>

                                        </div>
                                </div>
      
    
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                <div className=" flex   w-[2.5rem]  items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                                 
                                  {/* Country */}
                                  <div class=" text-xs max-sm:text-xs  font-poppins ">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                <div className=" flex   w-[7rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* Phone #  */}

                <div class="text-xs max-sm:text-xs  font-poppins ">
                  {item.countryDialCode && item.phoneNumber
                    ? `${item.countryDialCode} ${item.phoneNumber}`
                    : 'None'}
                </div>

                       </div>
                      
                              <div className=" flex   w-[8.1rem] items-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                          {/* Company  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.companyName || "None"}
</div>

                       </div>
                             
                            
                      
                       <div className=" flex   w-[5.1rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                            {/* Source */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.source || "None"}
</div>

                       </div>
                       <div className=" flex   w-[4.12rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        {/*sector  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.sector || "None"}
</div>
</div>
                       </div>
                       <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                       <div className=" flex  items-center w-[6.121rem]  h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Category */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Share */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.unitOfShare}
                                    </div>
                                </div>
                                <div className=" flex  items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* # Value */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Deals */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.shareCurrency} {item.valueOfShare}
                                    </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
           {item.noteScoreInd}
          
            </div>
            )}
                       <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.1rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                   {/* Assigned */}

                                    <div class=" text-xs max-sm:text-xs  font-poppins ">
                                    
                                    <span>
                      {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                          <MultiAvatar
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
                   </div>                                                                              
          
                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center  justify-center h-8 ml-gap bg-[#eef2f9]">
                   <div className=" flex   w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly  ">
                                  {/* Qualif */}                                                      
                                    <div>
                                    {item.companyName ?
                                     (
                                      <Tooltip title= {translatedMenuItems[16]} >
                                        <ConnectWithoutContactIcon
                                          className="!text-icon cursor-not-allowed text-gray-400"
                                        />
                                      </Tooltip>
                                    ):
                                    
                                    (
                                      
                                    <Tooltip title= {translatedMenuItems[15]} >
                        <ConnectWithoutContactIcon
                            onClick={() => {
                            handleRowData(item);
                            props.handlePitchConvertModal(true);
                         
                          }}
                          className="!text-icon cursor-pointer text-[blue]"
                        />
                      </Tooltip>
                        ) }

</div>
                                </div>  
                                <div class="rounded-full bg-white  h-5 cursor-pointer w-4 max-xl:w-[1.5rem]">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span className=" cursor-pointer"
                  //type="edit"             
                    onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                    className="!text-icon cursor-pointer text-green-800"
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>  
                              
          
     <div class="flex max-sm:justify-evenly max-sm:w-wk items-center justify-end">
    <div >
                    <Tooltip title= {translatedMenuItems[17]} >
       <NoteAltIcon
                  onClick={() => {
                  props.handlePitchNotesDrawerModal(true);
                  handleSetCurrentLeadsId(item);
                }}
                className="!text-icon cursor-pointer text-green-800"
              />
           </Tooltip>

            </div>
            
            <div>
<Tooltip
        title= {translatedMenuItems[18]} 
      >
                   <HourglassFullIcon className="text-blue-500 !text-icon cursor-pointer" 
                                     onClick={()=>{
                    props.handleAssimodal(true)
                    handleRowData(item)
                    }}
              />
                  </Tooltip>
                  </div>
                  <div>
                                <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                        <span class="cursor-pointer" >
                        <AddLocationAltIcon   className="!text-icon cursor-pointer text-[#8e4bc0]"/>
                        </span>
                      </Tooltip>
                      </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                className="!text-icon cursor-pointer text-green-800"
                //   onClick={() => {
                //   handleSetCurrentLeadsId(item);
                //   props.handleLeadsEmailDrawerModal(true);
                // }}
              />
            </Tooltip> </div>
           
            {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                <div>
            <Tooltip title= {translatedMenuItems[19]} >
              <BorderColorIcon
                className="!text-icon cursor-pointer text-[tomato]"
                  onClick={() => {
                   props.setEditPitch(item);
                   props.handleUpdatePitchModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>      
            </div>
                                )}                         
                        <div>

                        <StyledPopconfirm
            title= {translatedMenuItems[20]} 
            onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
          > <Tooltip title= {translatedMenuItems[21]} >
             {user.imInd === true  &&  user.pitchDeleteInd === true && ( 
           <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
             )} 
             </Tooltip>
          </StyledPopconfirm>
                        </div>
                        </div>     
                      </div>
                   </div>
                    </div>
                    )
                })}
                  </InfiniteScroll>
      </div>

      <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className=" flex justify-between max-sm:hidden w-[99%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
    <div className="flex items-center w-[7.12rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] text-white bg-orange-600  justify-center ">Warm</div>
        <div className=" w-[10.1rem] truncate text-[#00A2E8] max-md:w-[10.1rem]  max-xl:w-[9.6rem]  text-sm">
        <CategoryIcon className='!text-icon text-[#e4eb2f]'/> {translatedMenuItems[0]}  
                {/* name */}           
               </div>
        <div className=" w-[8.3rem]  truncate max-md:w-[8.3rem] max-xl:w-[5.1rem]  ">
        <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> {translatedMenuItems[1]}
        {/* Mobile */}
                </div>      
        <div className=" w-[4.1rem] max-xl:w-[3rem]"></div>
        <div className="w-[9.12rem]  truncate max-md:w-[9.12rem] max-xl:w-[5.122rem]  font-bold font-poppins  text-xs">
        <ApartmentIcon className="!text-icon mr-1 "/> {translatedMenuItems[2]} 
        {/* company */}
                </div>
                    <div className="w-[6.12rem]   truncate max-md:w-[6.12rem]">
                    <SourceIcon className="!text-icon  text-[#4b5043]"/>   {translatedMenuItems[3]} 
                     {/* source */}
                </div>
                     <div className="w-[5.121rem]  truncate max-md:w-[5.121rem]">
                     <FactoryIcon className="!text-icon  text-[#84a59d]"/>  {translatedMenuItems[4]}  
                     {/* sector */}
                </div>
                 <div className="w-[7.23rem]  max-xl:w-[8.2rem] truncate max-md:w-[7.23rem]">
                 <FormatListNumberedIcon className='!text-icon    text-[#42858c]' />  {translatedMenuItems[5]} 
                 {/* Category */}
          </div>
          <div className="w-[5.236rem]  max-xl:w-[8.2rem]  truncate max-md:w-[5.236rem]">
          <ShowChartIcon className='!text-icon    text-[#776871]' /> {translatedMenuItems[6]}   {/* Shares # */}      
          </div>
          <div className="w-[7.236rem]  max-xl:w-[8.2rem]   truncate max-md:w-[7.236rem]">     
          <EventAvailableIcon className="!text-icon   text-[#4b5043]"/> 1st {translatedMenuItems[7]}  {/* First Meeting */}   
          </div>
          <div className="w-[4.238rem]  max-xl:w-[8.2rem]   truncate max-md:w-[4.238rem]">
          <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' /> {translatedMenuItems[8]}  
         {/* Value */}  
          </div>
          {props.user.aiInd && (
            <div className="w-[4.81rem] truncate max-md:w-[4.81rem]  max-xl:w-[3.81rem]">
             <ScoreIcon className="!text-icon  text-[#f28482]"/> Score
          
            </div>
            )}
        <div className="w-[6.122rem]   truncate max-md:w-[6.122rem]">
          {/* Assigned */}
          <AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[9]}
        </div> 
       
        <div className="w-[10.6rem]  max-xl:w-[7.4rem] truncate max-md:w-[10.6rem]">
        {translatedMenuItems[10]} 
           {/* qualify */}
                </div>
          
      </div>
      <InfiniteScroll
        dataLength={props.pitchDataCold.length}
        next={handleLoadMore2}
        hasMore={hasMore}
        loader={props.fetchingPitchCold?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchCold && props.pitchDataCold.length === 0 ?<Suspense> <EmptyPage/> </Suspense>:props.pitchDataCold.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//  const countryCode = item.address[0].country_alpha2_code  
const countryCode = item.countryAlpha2Code  
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1  items-center max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   py-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                       <div class="flex flex-row border-l-2 border-green-500 bg-[#eef2f9]  items-center w-[6rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
                                       <div class=" text-xs  font-poppins max-sm:text-sm ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.investorLeadsId)}
              checked={props.selectedDeals.includes(item.investorLeadsId)}
              />
                        )}
                        </div>  
                                        <div>
                                              <ButtonGroup>
                                              <RoleButton
                                              type="Hot"
                                              iconType="fas fa-mug-hot"
                                              // tooltip="Hot"
                                              tooltip= {translatedMenuItems[11]} 
                                              role={item.type}
                                                onClick={() =>{
                                              const typ="Hot"
                                              props.updateTypeForPitch(item.investorLeadsId,typ)
                                              }}
                                                />
                                                </ButtonGroup>
                                                </div>
                                                <div><ButtonGroup>
                                                <RoleButton1
                                                type="Warm"
                                                iconType="	fas fa-burn"
                                                // tooltip="Warm"
                                                tooltip= {translatedMenuItems[12]} 
                                                role={item.type}
                                                  onClick={() =>{
                                                const typ="Warm"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup></div>
                                                <div>
                                                <ButtonGroup>
                                                <RoleButton2
                                                type="Cold"
                                                iconType="far fa-snowflake"
                                                // tooltip="Cold"
                                                tooltip= {translatedMenuItems[13]} 
                                                role={item.type}
                                                  onClick={() => {
                                                const typ="Cold"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup>
                                                </div>

                                                </div>  

                                                </div>  
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[10rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full items-center "> 
                                            <div>

                                                        <MultiAvatar
                                                          primaryTitle={item.name}
                                                          imageId={item.imageId}
                                                          imageURL={item.imageURL}
                                                          imgWidth={"1.8rem"}
                                                          imgHeight={"1.8rem"}
                                                        />
                                                      
                                            </div>
                                  
                                   <div class="flex max-sm:justify-start max-sm:w-wk items-center">
                                        <div class="max-sm:w-full ml-1" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                                                {/* Name
                                          */}
                                            <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                                      {/* {/* <Link */}
                                              
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}                  
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] ml-1 font-bold text-[0.65rem]" >
                                                 {translatedMenuItems[14]}    {/* New */}
                                                 </span>
                                               ) : null}
                                              
                                                    </div>
                                            </div>
                                        </Tooltip>
                                        </div>
</div>

                                        </div>
                                </div>
      
    
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                <div className=" flex   h-8 ml-gap bg-[#eef2f9] justify-center items-center w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                                 
                                  {/* Country */}
                                  <div class=" text-xs max-sm:text-xs  font-poppins ">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                <div className=" flex  h-8 ml-gap bg-[#eef2f9]  w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* Phone #  */}

                <div class="text-xs max-sm:text-xs  font-poppins ">
                  {item.countryDialCode && item.phoneNumber
                    ? `${item.countryDialCode} ${item.phoneNumber}`
                    : 'None'}
                </div>

                       </div>
                      
                              <div className=" flex  h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                          {/* Company  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.companyName || "None"}
</div>

                       </div>
                             
                            
                      
                       <div className=" flex   h-8 ml-gap bg-[#eef2f9] w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                            {/* Source */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.source || "None"}
</div>

                       </div>
                       <div className=" flex   h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        {/*sector  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.sector || "None"}
</div>
</div>
                       </div>
                       <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                       <div className=" flex  items-center   h-8 ml-gap bg-[#eef2f9] w-[6.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Category */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>
                                <div className=" flex  items-center w-[5rem]  justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Share */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.unitOfShare}
                                    </div>
                                </div>
                                <div className=" flex  items-center w-[5.181rem]  justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* # Value */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Deals */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.shareCurrency} {item.valueOfShare}
                                    </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  items-center justify-center  w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  h-8 ml-gap bg-[#eef2f9] ">
           {item.noteScoreInd}
          
            </div>
            )}
                       <div className=" flex  justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.1rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                   {/* Assigned */}

                                    <div class=" text-xs max-sm:text-xs  font-poppins ">
                                    
                                    <span>
                      {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                          <MultiAvatar
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
                   </div>                                                                              
        
                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center  justify-center h-8 ml-gap bg-[#eef2f9]">
                   <div className=" flex   w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly  ">
                                  {/* Qualif */}                                                      
                                    <div>
                                    {item.companyName ?
                                     (
                                      <Tooltip title= {translatedMenuItems[16]} >
                                        <ConnectWithoutContactIcon
                                          className="!text-icon cursor-not-allowed text-gray-400"
                                        />
                                      </Tooltip>
                                    ):
                                    
                                    (
                                      
                                    <Tooltip title= {translatedMenuItems[15]} >
                        <ConnectWithoutContactIcon
                            onClick={() => {
                            handleRowData(item);
                            props.handlePitchConvertModal(true);
                         
                          }}
                          className="!text-icon cursor-pointer text-[blue]"
                        />
                      </Tooltip>
                        ) }

</div>
                                </div>  
                                <div class="rounded-full cursor-pointer w-4 max-xl:w-[1.5rem]  justify-center h-8 ml-gap bg-[#eef2f9]">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span className=" cursor-pointer"
                  //type="edit"             
                    onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                    className="!text-icon cursor-pointer text-green-800"
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>  
                              
          
     <div class="flex max-sm:justify-evenly max-sm:w-wk items-center h-8 ml-gap bg-[#eef2f9] justify-end">
    <div >
                    <Tooltip title= {translatedMenuItems[17]} >
       <NoteAltIcon
                  onClick={() => {
                  props.handlePitchNotesDrawerModal(true);
                  handleSetCurrentLeadsId(item);
                }}
                className="!text-icon cursor-pointer text-green-800"
              />
           </Tooltip>

            </div>
            
            <div>
<Tooltip
        title= {translatedMenuItems[18]} 
      >
                   <HourglassFullIcon className="text-blue-500 !text-icon cursor-pointer" 
                                     onClick={()=>{
                    props.handleAssimodal(true)
                    handleRowData(item)
                    }}
              />
                  </Tooltip>
                  </div>
                  <div>
                                <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                        <span class="cursor-pointer" >
                        <AddLocationAltIcon   className="!text-icon cursor-pointer text-[#8e4bc0]"/>
                        </span>
                      </Tooltip>
                      </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                className="!text-icon cursor-pointer text-green-800"
                //   onClick={() => {
                //   handleSetCurrentLeadsId(item);
                //   props.handleLeadsEmailDrawerModal(true);
                // }}
              />
            </Tooltip> </div>
           
            {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                <div>
            <Tooltip title= {translatedMenuItems[19]} >
              <BorderColorIcon
                className="!text-icon cursor-pointer text-[tomato]"
                  onClick={() => {
                   props.setEditPitch(item);
                   props.handleUpdatePitchModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>      
            </div>
                                )}                         
                        <div>

                        <StyledPopconfirm
            title= {translatedMenuItems[20]} 
            onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
          > <Tooltip title= {translatedMenuItems[21]} >
             {user.imInd === true  &&  user.pitchDeleteInd === true && ( 
           <DeleteOutlineIcon 
              type="delete"
              className="!text-icon text-[red] cursor-pointer"
              
            />
             )} 
             </Tooltip>
          </StyledPopconfirm>
                        </div>
                        </div>     
                      </div>
                   </div>
                    </div>
                    )
                })}
                  </InfiniteScroll>
      </div>
      <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold font-poppins  !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
    <div className="flex items-center w-[7.12rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] text-white bg-blue-600  justify-center ">Cold</div>
        <div className=" w-[10.1rem] truncate  max-xl:w-[9.6rem] text-[#00A2E8] text-sm">
        <CategoryIcon className='!text-icon  text-[#e4eb2f]'/>{translatedMenuItems[0]}  
                {/* name */}           
               </div>
        <div className=" w-[4.1rem] max-xl:w-[3rem]"></div>
        <div className=" w-[8.3rem] truncate max-xl:w-[5.1rem] ">
        <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>  {translatedMenuItems[1]}
        {/* Mobile */}
                </div>      
        <div className="w-[9.12rem] truncate max-xl:w-[5.122rem]  ">
        <ApartmentIcon className="!text-icon mr-1 "/>   {translatedMenuItems[2]} 
        {/* company */}
                </div>
                    <div className="w-[6.12rem] truncate">
                    <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[3]} 
                     {/* source */}
                </div>
                     <div className="w-[5.121rem] truncate">
                     <FactoryIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[4]}  
                     {/* sector */}
                </div>
                 <div className="w-[7.23rem]  max-xl:w-[8.2rem] truncate">
                 <FormatListNumberedIcon className='!text-icon    text-[#42858c]' />{translatedMenuItems[5]} 
                 {/* Category */}
          </div>
          <div className="w-[5.236rem]  max-xl:w-[8.2rem] truncate">
          <ShowChartIcon className='!text-icon    text-[#776871]' />  {translatedMenuItems[6]}   {/* Shares # */}      
          </div>
          <div className="w-[7.236rem]  max-xl:w-[8.2rem]  truncate">     
          <EventAvailableIcon className="!text-icon   text-[#4b5043]"/>1st {translatedMenuItems[7]}  {/* First Meeting */}   
          </div>
          <div className="w-[4.238rem]  max-xl:w-[8.2rem]  truncate">
          <CurrencyExchangeIcon className='!text-icon    text-[#e4eb2f]' />{translatedMenuItems[8]}  
         {/* Value */}  
          </div>
          {props.user.aiInd && (
            <div className="truncate w-[4.81rem]  max-xl:w-[3.81rem]">
               <ScoreIcon className="!text-icon  text-[#f28482]"/>  Score
          
            </div>
            )}
        <div className="w-[6.122rem]  truncate">
          {/* Assigned */}
           <AccountCircleIcon className="!text-icon  text-[#d64933]"/>{translatedMenuItems[9]}
        </div> 
       
        <div className="w-[10.6rem]  max-xl:w-[7.4rem] truncate">
        {translatedMenuItems[10]} 
           {/* qualify */}
                </div>
          
      </div>
      <InfiniteScroll
        dataLength={props.pitchDataHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingPitchHot?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchHot && props.pitchDataHot.length === 0 ?<Suspense> <EmptyPage/> </Suspense>:props.pitchDataHot.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//  const countryCode = item.address[0].country_alpha2_code  
const countryCode = item.countryAlpha2Code  
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1 items-center max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   py-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                       <div class="flex flex-row items-center border-l-2 border-green-500 bg-[#eef2f9]  w-[6rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
                                       <div class=" text-xs  font-poppins max-sm:text-sm ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.investorLeadsId)}
              checked={props.selectedDeals.includes(item.investorLeadsId)}
              />
                        )}
                        </div>  
                                        <div>
                                              <ButtonGroup>
                                              <RoleButton
                                              type="Hot"
                                              iconType="fas fa-mug-hot"
                                              // tooltip="Hot"
                                              tooltip= {translatedMenuItems[11]} 
                                              role={item.type}
                                                onClick={() =>{
                                              const typ="Hot"
                                              props.updateTypeForPitch(item.investorLeadsId,typ)
                                              }}
                                                />
                                                </ButtonGroup>
                                                </div>
                                                <div><ButtonGroup>
                                                <RoleButton1
                                                type="Warm"
                                                iconType="	fas fa-burn"
                                                // tooltip="Warm"
                                                tooltip= {translatedMenuItems[12]} 
                                                role={item.type}
                                                  onClick={() =>{
                                                const typ="Warm"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup></div>
                                                <div>
                                                <ButtonGroup>
                                                <RoleButton2
                                                type="Cold"
                                                iconType="far fa-snowflake"
                                                // tooltip="Cold"
                                                tooltip= {translatedMenuItems[13]} 
                                                role={item.type}
                                                  onClick={() => {
                                                const typ="Cold"
                                                props.updateTypeForPitch(item.investorLeadsId,typ)
                                                }}
                                                />
                                                </ButtonGroup>
                                                </div>

                                                </div>  

                                                </div>  
                                <div className=" flex   w-[10rem]  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full items-center "> 
                                            <div>

                                                        <MultiAvatar
                                                          primaryTitle={item.name}
                                                          imageId={item.imageId}
                                                          imageURL={item.imageURL}
                                                          imgWidth={"1.8rem"}
                                                          imgHeight={"1.8rem"}
                                                        />
                                                      
                                            </div>
                                  
                                   <div class="flex max-sm:justify-start max-sm:w-wk items-center">
                                        <div class="max-sm:w-full ml-1" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                                                {/* Name
                                          */}
                                            <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                                      {/* {/* <Link */}
                                              
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}                  
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] ml-1 font-bold text-[0.65rem]" >
                                                 {translatedMenuItems[14]}    {/* New */}
                                                 </span>
                                               ) : null}
                                              
                                                    </div>
                                            </div>
                                        </Tooltip>
                                        </div>
</div>

                                        </div>
                                </div>
      
    
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                <div className=" flex  h-8 ml-gap bg-[#eef2f9] justify-center items-center  w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                                 
                                  {/* Country */}
                                  <div class=" text-xs max-sm:text-xs  font-poppins ">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* Phone #  */}

                <div class="text-xs max-sm:text-xs  font-poppins ">
                  {item.countryDialCode && item.phoneNumber
                    ? `${item.countryDialCode} ${item.phoneNumber}`
                    : 'None'}
                </div>

                       </div>
                      
                              <div className=" flex   h-8 ml-gap bg-[#eef2f9] w-[8.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                          {/* Company  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.companyName || "None"}
</div>

                       </div>
                             
                            
                      
                       <div className=" flex   h-8 ml-gap bg-[#eef2f9] w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                            {/* Source */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.source || "None"}
</div>

                       </div>
                       <div className=" flex  h-8 ml-gap bg-[#eef2f9]  w-[4.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        {/*sector  */}
                           <div className="text-xs max-sm:text-xs  font-poppins ">
                           {item.sector || "None"}
</div>
</div>
                       </div>
                       <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                       <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[6.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Category */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[5rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Share */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.unitOfShare}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* # Value */}

                                    <div class=" text-xs justify-center   font-poppins  max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Deals */}

                                    <div class=" text-xs justify-center  font-poppins  max-sm:text-sm">
                                    {item.shareCurrency} {item.valueOfShare}
                                    </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
           {item.noteScoreInd}
          
            </div>
            )}
                       <div className=" flex justify-center h-8 ml-gap bg-[#eef2f9] w-[4.1rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                   {/* Assigned */}

                                    <div class=" text-xs max-sm:text-xs  font-poppins ">
                                    
                                    <span>
                      {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                          <MultiAvatar
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
                   </div>                                                                              
         
                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center bg-[#eef2f9] h-8 ml-gap ">
                   <div className=" flex  justify-center w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly  ">
                                  {/* Qualif */}                                                      
                                    <div>
                                    {item.companyName ?
                                     (
                                      <Tooltip title= {translatedMenuItems[16]} >
                                        <ConnectWithoutContactIcon
                                          className="!text-icon cursor-not-allowed text-gray-400"
                                        />
                                      </Tooltip>
                                    ):
                                    
                                    (
                                      
                                    <Tooltip title= {translatedMenuItems[15]} >
                        <ConnectWithoutContactIcon
                            onClick={() => {
                            handleRowData(item);
                            props.handlePitchConvertModal(true);
                         
                          }}
                          className="!text-icon cursor-pointer text-[blue]"
                        />
                      </Tooltip>
                        ) }

</div>
                                </div>  
                                <div class=" justify-center  cursor-pointer w-4 max-xl:w-[1.5rem]">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span className=" cursor-pointer"
                  //type="edit"             
                    onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                    className="!text-icon cursor-pointer text-green-800"
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>  
                              
          
     <div class="flex max-sm:justify-evenly max-sm:w-wk items-center ">
    <div >
                    <Tooltip title= {translatedMenuItems[17]} >
       <NoteAltIcon
                  onClick={() => {
                  props.handlePitchNotesDrawerModal(true);
                  handleSetCurrentLeadsId(item);
                }}
                className="!text-icon cursor-pointer text-green-800"
              />
           </Tooltip>

            </div>
            
            <div>
<Tooltip
        title= {translatedMenuItems[18]} 
      >
                   <HourglassFullIcon className="text-blue-500 !text-icon cursor-pointer" 
                                     onClick={()=>{
                    props.handleAssimodal(true)
                    handleRowData(item)
                    }}
              />
                  </Tooltip>
                  </div>
                  <div>
                                <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                        <span class="cursor-pointer" >
                        <AddLocationAltIcon   className="!text-icon cursor-pointer text-[#8e4bc0]"/>
                        </span>
                      </Tooltip>
                      </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                className="!text-icon cursor-pointer text-green-800"
                //   onClick={() => {
                //   handleSetCurrentLeadsId(item);
                //   props.handleLeadsEmailDrawerModal(true);
                // }}
              />
            </Tooltip> </div>
           
            {user.imInd === true  &&  user.pitchUpdateInd === true && (  
                                <div>
            <Tooltip title= {translatedMenuItems[19]} >
              <BorderColorIcon
                className="!text-icon cursor-pointer text-[tomato]"
                  onClick={() => {
                   props.setEditPitch(item);
                   props.handleUpdatePitchModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>      
            </div>
                                )}                         
                        <div>

                        <StyledPopconfirm
            title= {translatedMenuItems[20]} 
            onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
          > <Tooltip title= {translatedMenuItems[21]} >
             {user.imInd === true  &&  user.pitchDeleteInd === true && ( 
           <DeleteOutlineIcon 
              type="delete"
              className="!text-icon text-[red] cursor-pointer"
              
            />
             )} 
             </Tooltip>
          </StyledPopconfirm>
                        </div>
                        </div>     
                      </div>
                   </div>
                    </div>
                    )
                })}
                  </InfiniteScroll>
      </div>
      <Suspense fallback={<BundleLoader/>}>
      <UpdateLPitchModal
        item={currentLeadsId}
        updatePitchModal={props.updatePitchModal}
        // updateLeadsModal={updateLeadsModal}
        handleUpdatePitchModal={props.handleUpdatePitchModal}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
   
      <OpenASSimodal 
        rowdata={rowdata}
        openASSImodal={props.openASSImodal}
      handleAssimodal={props.handleAssimodal}
      />
         <AddPitchNotesDrawerModal 
       item={currentLeadsId}
        addDrawerPitchNotesModal={props.addDrawerPitchNotesModal}
        handlePitchNotesDrawerModal={props.handlePitchNotesDrawerModal}
      />
          <AddConvertPitchStatusModal
           rowdata={rowdata}
          //  handleRowData={handleRowData}
           addPitchConvertModal={props.addPitchConvertModal}
           handlePitchConvertModal={props.handlePitchConvertModal}
           />
            <AddPitchAdressModal 
        item={rowdata}
         type="investorLeads"
         addressPitchModal={props.addressPitchModal}
         handleAddresspitchModal={props.handleAddresspitchModal}
      /> 
            </Suspense>
    </>
     )}
    </div>
  );
};

const mapStateToProps = ({ auth, leads, sector,pitch }) => ({
//   leadsAllData: leads.leadsAllData,
user: auth.userDetails,
addPitchConvertModal:pitch.addPitchConvertModal,
  userId: auth.userDetails.userId,
  fetchingPitch:pitch.fetchingPitch,
  addDrawerPitchNotesModal:pitch.addDrawerPitchNotesModal,
  updatePitchModal:pitch.updatePitchModal,
  openASSImodal:pitch.openASSImodal,
  pitchData:pitch.pitchData,
  pitchDataHot:pitch.pitchDataHot,
  pitchDataWarm:pitch.pitchDataWarm,
  pitchDataCold:pitch.pitchDataCold,
  fetchingPitchHot:pitch.fetchingPitchHot,
  fetchingPitchWarm:pitch.fetchingPitchWarm,
  fetchingPitchCold:pitch.fetchingPitchCold,
  serachedPitchData:pitch.serachedPitchData,
  addressPitchModal: pitch.addressPitchModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPitch,
        getPitchHot,
  getPitchWarm,
  getPitchCold,
        deletePitchData,
        handleUpdatePitchModal,
        setEditPitch,
        updateTypeForPitch,
        handlePitchNotesDrawerModal,
        handleAssimodal,
        handlePitchConvertModal,
        handleAddresspitchModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchCardList);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "red" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
       <i className={`${iconType} !text-icon max-sm:text-xs `} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "orange" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
         <i className={`${iconType} !text-icon max-sm:text-xs `} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.1rem";
  } else {
    size = ".95rem";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "blue" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
         <i className={`${iconType} !text-icon max-sm:text-xs `} ></i>
      </Button>
    </Tooltip>
  );
}