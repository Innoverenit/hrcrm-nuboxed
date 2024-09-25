import React, { useEffect, useState,lazy,Suspense} from "react";
import { StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar } from "../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
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
import { Button, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import AddPitchAdressModal from "./AddPitchAdressModal";
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
    props.getPitch(props.userId,page,"creationdate");
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
          "589",//7 First Meeting
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

  // if (fetchingPitch) {
  //   return <BundleLoader />;
  // }

  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <div>
          {props.serachedPitchData.length > 0 ? (
    <PitchSearchedData
    serachedPitchData={props.serachedPitchData}
    />
  ) : (
    <>
  <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
    <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
    <div className=" w-[6.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] text-white bg-red-600  justify-center ">Hot</div>
        <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.6rem] text-black font-bold font-poppins text-xs">
       {translatedMenuItems[0]}  
                {/* name */}           
               </div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className=" w-[7.3rem] max-xl:w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-bold font-poppins text-xs">
        {translatedMenuItems[1]}
        {/* Mobile */}
                </div>
        <div className="w-[1.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className="w-[9.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.122rem]  font-bold font-poppins  text-xs">
        {translatedMenuItems[2]} 
        {/* company */}
                </div>
                    <div className="w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]  font-bold font-poppins text-xs">
                    {translatedMenuItems[3]} 
                     {/* source */}
                </div>
                     <div className="w-[6.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-bold font-poppins text-xs">
                     {translatedMenuItems[4]}  
                     {/* sector */}
                </div>
                 <div className="w-[5.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]  font-bold font-poppins text-xs">
                 {translatedMenuItems[5]} 
                 {/* Category */}
          </div>
          <div className="w-[5.236rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] font-bold font-poppins text-xs">
          {translatedMenuItems[6]}   {/* Shares # */}      
          </div>
          <div className="w-[6.236rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]  font-bold font-poppins text-xs">     
          {translatedMenuItems[7]}  {/* First Meeting */}   
          </div>
          <div className="w-[5.238rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]  font-bold font-poppins text-xs">
          {translatedMenuItems[8]}  
         {/* Value */}  
          </div>
          {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[5.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            Score
          
            </div>
            )}
        <div className="w-[5.122rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]  font-bold font-poppins text-xs">
          {/* Assigned */}
        {translatedMenuItems[9]}
        </div> 
       
        <div className="w-[10.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.4rem] font-bold font-poppins text-xs">
        {translatedMenuItems[10]} 
           {/* qualify */}
                </div>
          
      </div>
      <InfiniteScroll
        dataLength={props.pitchDataHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingPitchHot?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchHot && props.pitchDataHot.length === 0 ?<NodataFoundPage />:props.pitchDataHot.map((item,index) =>  {
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
                            <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                       <div class="flex flex-row items-center w-[5rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
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
                                <div className=" flex   w-[12rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                                <div className="flex max-sm:w-full items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
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
                                            <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-semibold  cursor-pointer">
                                                      {/* {/* <Link */}
                                              
                                               {item.firstName}
                                               &nbsp;
                                               {item.middleName}
                                               &nbsp;
                                               {item.lastName}
                                               {/* </Link> */}
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] mt-[0.4rem] font-bold text-[0.65rem]" >
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
                <div className=" flex   w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* Phone #  */}

                <div class="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                  {item.countryDialCode && item.phoneNumber
                    ? `${item.countryDialCode} ${item.phoneNumber}`
                    : 'None'}
                </div>

                       </div>
                       <div className=" flex   w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                                 
                                  {/* Country */}
                                  <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                              </div>
                              <div className=" flex   w-[11.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                          {/* Company  */}
                           <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.companyName || "None"}
</div>

                       </div>
                             
                            
                      
                       <div className=" flex   w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                            {/* Source */}
                           <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.source || "None"}
</div>

                       </div>
                       <div className=" flex   w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        {/*sector  */}
                           <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                           {item.sector || "None"}
</div>
</div>
                       </div>
                       <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                       <div className=" flex  items-center w-[3.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Category */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>
                                <div className=" flex  items-center w-[5rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Share */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.unitOfShare}
                                    </div>
                                </div>
                                <div className=" flex  items-center w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* # Value */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* # Deals */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.shareCurrency} {item.valueOfShare}
                                    </div>
                                </div>
                       <div className=" flex   w-[4.1rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                   {/* Assigned */}

                                    <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    
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
                   {props.user.aiInd && (
           <div className=" flex  justify-center  w-[9.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
           {item.noteScoreInd}
          
            </div>
            )}
                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                   <div className=" flex  flex-col w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
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
                    className="!text-icon cursor-pointer text-[green]"
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
                className="!text-icon cursor-pointer text-[green]"
              />
           </Tooltip>

            </div>
            
            <div>
<Tooltip
        title= {translatedMenuItems[18]} 
      >
                   <HourglassFullIcon className="text-[#edf67d] !text-icon cursor-pointer" 
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
                className="!text-icon cursor-pointer text-green-400"
                // onClick={() => {
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
            <DeleteOutlined
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

      <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
    <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky z-10">
    <div className=" w-[6.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] bg-orange-600 text-white  justify-center ">Warm</div>
        <div className=" font-bold font-poppins text-xs w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.6rem] ">
        {translatedMenuItems[0]}
        {/* Name */}
                </div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className=" font-bold font-poppins text-xs w-[7.3rem] max-xl:w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[1]} 
        {/* mobile# */}
                </div>
        <div className="w-[1.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className="font-bold font-poppins text-xs w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.122rem]">
        {translatedMenuItems[2]}
        {/* company */}
                </div>
                    <div className="font-bold font-poppins text-xs w-[5.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                    {translatedMenuItems[3]}
                    {/* source */}
                </div>
                     <div className="font-bold font-poppins text-xs w-[5.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {translatedMenuItems[4]}
                   {/* sector */}
                </div>
                 <div className="font-bold font-poppins text-xs w-[5.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
                 {translatedMenuItems[5]} 
                 {/* Category */}
          </div>
          <div className="font-bold font-poppins text-xs w-[5.236rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[6]}
          {/* Shares # */}
          </div>
          <div className="font-bold font-poppins text-xs w-[7.238rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[7]}
          {/* Value */}
          </div>
        <div className="font-bold font-poppins text-xs w-[5.122rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[8]}
          {/* Assigned */}
          </div>
        <div className="font-bold font-poppins text-xs w-[5.21rem] max-xl:text-[0.65rem] max-xl:w-[3.2rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[9]}       
        {/* owner */}
                </div>
                {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[9.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            Score
          
            </div>
            )}
        <div className="font-bold font-poppins text-xs w-[10.6rem] ml-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.4rem]">
        {translatedMenuItems[10]} 
        {/* qualify */}
                </div>


      </div>
      <InfiniteScroll
        dataLength={props.pitchDataWarm.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={props.fetchingPitchWarm?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
         endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchWarm && props.pitchDataWarm.length === 0 ?<NodataFoundPage />:props.pitchDataWarm.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
                      <div
          className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col  p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
        >
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                                <div class="flex flex-row items-center w-[5.rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">

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


                          <div className=" flex   w-[12rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                          <div className="flex max-sm:w-full items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
<div>

      <MultiAvatar
        primaryTitle={item.name}
        imageId={item.imageId}
        imageURL={item.imageURL}
        imgWidth={"1.8rem"}
        imgHeight={"1.8rem"}
      />
    
</div>
          <div class="max-sm:w-full ml-1" >
                                  <Tooltip>
                                    <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                    
                                      <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-semibold  cursor-pointer">
                                          
                                       
                                         {item.firstName}
                                         &nbsp;
                                         {item.middleName}
                                         &nbsp;
                                         {item.lastName}
                                         {/* </Link> */}
                                         &nbsp;&nbsp;
                                         {date === currentdate ? (
                                           <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold" >
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
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex   w-[7rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                   {/* Phone #  */}

                     <div class="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{item.countryDialCode && item.phoneNumber
? `${item.countryDialCode} ${item.phoneNumber}`
: 'None'}
</div>
                 </div>
                 <div className=" flex   w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                           
                           {/* Country */}
                            <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <CountryFlag1 countryCode={countryCode} />
                &nbsp;
                {countryCode}
                              </div>
                        </div>
                        <div className=" flex   w-[11.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                  {/* Company  */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.companyName || "None"}
</div>
                 </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                
                 <div className=" flex    w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                      {/* Company  */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.source || "None"}
</div>
                 </div>
                 <div className=" flex   w-[5.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                     {/* Company  */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.sector || "None"}
</div>

                 </div>
                 <div className=" flex  items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                         {/* Deals */}
                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {Category}
                              </div>
                          </div>
                          <div className=" flex items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                               {/* Deals */}

                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.unitOfShare}
                              </div>
                          </div>
                          <div className=" flex  items-center w-[5.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* # Deals */}

                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.valueOfShare}
                              </div>
                          </div>
                 <div className=" flex w-[4.21rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                           {/* Assigned */}

                              <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              
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
                          
                          
                          {props.user.aiInd && (
           <div className=" flex  justify-center  w-[9.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}      
                            <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                            <div className=" flex  flex-col w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
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
                  )  }
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
              className="!text-icon cursor-pointer text-[green]"
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
                    className="!text-icon cursor-pointer text-[green]"
                  />
              </Tooltip>
      </div>
    
      <div>
                  <Tooltip
                    title= {translatedMenuItems[18]} 
                  >
                 <HourglassFullIcon className="text-[#edf67d] !text-icon cursor-pointer" 
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
            <LocationOnIcon   className="!text-icon cursor-pointer text-[#960a0a]"/>
            </span>
          </Tooltip>
      </div>
    <div>
    <Tooltip title={item.email}>
        <MailOutlineIcon
          type="mail"
          className="!text-icon cursor-pointer text-green-400"
          // onClick={() => {
          //   handleSetCurrentLeadsId(item);
          //   props.handleLeadsEmailDrawerModal(true);
          // }}
        />
      </Tooltip>
      </div>
     
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
      title={translatedMenuItems[20]} 
      onConfirm={() => props.deletePitchData(item.investorLeadsId,props.userId)}
    > <Tooltip title= {translatedMenuItems[21]} >
       {user.imInd === true  &&  user.pitchDeleteInd === true && ( 
      <DeleteOutlined
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
      <div class="rounded max-lg:w-wk max-sm:w-wk max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
    <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
    <div className=" w-[6.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] mr-2 max-lg:text-[0.45rem] bg-blue-600 text-white justify-center ">Cold</div>
        <div className="font-bold font-poppins text-xs w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.6rem] ">
        {translatedMenuItems[0]} 
        {/* name */}
                </div>
        <div className=" w-[5.1rem] max-xl:w-[3rem]"></div>
        <div className="font-bold font-poppins text-xs w-[7.3rem] max-xl:w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[1]} 
        {/* mobile# */}
                </div>
        <div className="w-[1.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" font-bold font-poppins text-xs w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.122rem]">
        {translatedMenuItems[2]} 
        {/* company */}
                </div>
                    <div className="font-bold font-poppins text-xs w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                    {translatedMenuItems[3]}   
                    {/* source */}
                </div>
                     <div className=" font-bold font-poppins text-xs w-[6.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {translatedMenuItems[4]}  
                     {/* sector */}
                </div>
                 <div className=" font-bold font-poppins text-xs w-[5.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
                 {translatedMenuItems[5]}  
                 {/* category */}
          </div>
          <div className="font-bold font-poppins text-xs w-[5.236rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[6]}  
          {/* Shares # */}
          </div>
          <div className="font-bold font-poppins text-xs w-[10.238rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[7]}  
          {/* Value */}
          </div>
        <div className="font-bold font-poppins text-xs w-[5.122rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[8]}  
          {/* Assigned */}
          </div>
          {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            Score
          
            </div>
            )}
              <div className="font-bold font-poppins text-xs w-[4.21rem] max-xl:text-[0.65rem] max-xl:w-[3.2rem] max-lg:text-[0.45rem]">
        {translatedMenuItems[9]}       
        {/* owner */}
                </div>
        <div className="font-bold font-poppins text-xs w-[10.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.4rem]">
        {translatedMenuItems[10]} 
        {/* qualify */}
                </div>
      </div>
      <InfiniteScroll
        dataLength={props.pitchDataCold.length}
        next={handleLoadMore2}
        hasMore={hasMore}
        loader={props.fetchingPitchCold?<div class="flex justify-center" >Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
    { !props.fetchingPitchCold && props.pitchDataCold.length === 0 ?<NodataFoundPage />:props.pitchDataCold.map((item,index) =>  {
 const currentdate = dayjs().format("DD/MM/YYYY");
   const Category=item.pvtAndIntunlInd?"Institutional":"Private"
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
                      <div
          className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
        >
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div class="flex flex-row items-center w-[6rem] max-xl:w-[5rem] max-lg:w-[4.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between">
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


                          <div className=" flex   w-[10rem] max-xl:w-[7rem] max-lg:w-[4.9rem]   max-sm:w-auto">
                          <div className="flex max-sm:w-full items-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> 
<div>

      <MultiAvatar
        primaryTitle={item.name}
        imageId={item.imageId}
        imageURL={item.imageURL}
        imgWidth={"1.8rem"}
        imgHeight={"1.8rem"}
      /> 
</div>
                             <div >
                             </div>
                                  <div class="max-sm:w-full ml-1" >
                                  <Tooltip>
                                    <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">                           
                                      {/* Name   */}
                                      <div class=" text-xs max-sm:text-xs flex text-blue-500  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] font-semibold  cursor-pointer">                                                  
                                         {item.firstName}
                                         &nbsp;
                                         {item.middleName}
                                         &nbsp;
                                         {item.lastName}
                                         {/* </Link> */}
                                         &nbsp;&nbsp;
                                         {date === currentdate ? (
                                           <span class="text-[tomato]  text-[0.65rem ]mt-[0.4rem] font-bold" >
                                             {translatedMenuItems[14]}  {/* New */}
                                           </span>
                                         ) : null}          
                                                      </div>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>
</div>  
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex   w-[6rem] max-sm:w-auto max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
                  {/* Phone #  */}
                     <div class="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{item.countryDialCode && item.phoneNumber
? `${item.countryDialCode} ${item.phoneNumber}`
: 'None'}
</div>
                 </div>
                 <div className=" flex  w-[2.5rem] max-xl:w-[5rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                      
                         {/* Country */}
                            <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <CountryFlag1 countryCode={countryCode} />
                &nbsp;
                {countryCode}
                              </div>
                        </div>
                        <div className=" flex   w-[9.1rem] max-sm:w-auto max-xl:w-[5.1rem] max-lg:w-[4.12rem] max-sm:flex-row  max-sm:justify-between ">
                     {/* Company */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.companyName || "None"}
</div>
                 </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                
                 <div className=" flex  w-[5.1rem] max-xl:w-[5.1rem] max-lg:w-[3.31rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
{/* source  */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.source || "None"}
</div>

                 </div>
                 <div className=" flex    w-[6.12rem] max-xl:w-[5.1rem] max-lg:w-[3.41rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                  {/* sector */}
                     <div className="text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.sector || "None"}
</div>

                 </div>
                 <div className=" flex  items-center w-[6.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            {/* #category */}

                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {Category}
                              </div>
                          </div>
                          <div className=" flex  items-center w-[6.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* #share */}

                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.unitOfShare}
                              </div>
                          </div>
                          <div className=" flex  items-center w-[6.121rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                              {/* # Deals */}

                              <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                              </div>
                          </div>
                 <div className=" flex   w-[4.21rem] max-xl:w-[5.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                             {/* Assigned */}

                              <div class=" text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              
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
                         {props.user.aiInd && (
           <div className=" flex  justify-center  w-[9.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}       
                         <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                         <div className=" flex  flex-col w-4 max-xl:w-[2rem] max-sm:flex-col  max-sm:justify-evenly max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                  <div>
                              {item.companyName ?   (
                    <Tooltip title= {translatedMenuItems[16]} >
                      <ConnectWithoutContactIcon
                        className="!text-icon cursor-not-allowed text-gray-400"
                      />
                    </Tooltip>
                  ):(
                    <Tooltip title= {translatedMenuItems[15]} >
        <ConnectWithoutContactIcon
          onClick={() => {
            handleRowData(item);
            props.handlePitchConvertModal(true);
         
          }}
          className="!text-icon cursor-pointer text-[blue]"
        />
      </Tooltip>
        )
                  }
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
              className="!text-icon cursor-pointer text-[green]"
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
                          className="!text-icon cursor-pointer text-[green]"
                        />
                    </Tooltip>
                    </div>
                    
      <div>
                <Tooltip
                  title= {translatedMenuItems[18]} 
                >
              <HourglassFullIcon className="text-[#edf67d] !text-icon cursor-pointer"
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
      <LocationOnIcon   className="!text-icon cursor-pointer text-[#960a0a]"/>
      </span>
    </Tooltip>
    </div>
    <div>
    <Tooltip title={item.email}>
        <MailOutlineIcon
          type="mail"
          className="!text-icon cursor-pointer text-green-400"
          // onClick={() => {
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
      <DeleteOutlined
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
      <Suspense fallback={<BundleLoader />}>
      <UpdateLPitchModal
        item={currentLeadsId}
        updatePitchModal={props.updatePitchModal}
        // updateLeadsModal={updateLeadsModal}
        handleUpdatePitchModal={props.handleUpdatePitchModal}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      {/* <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      /> */}
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
       <i className={`${iconType} !text-icon max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
         <i className={`${iconType} !text-icon max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
         <i className={`${iconType} !text-icon max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}