
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Tooltip, Button, Badge } from "antd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { CurrencySymbol } from '../../../../src/Components/Common';
import {
    getProductionOrderId,
    getProductionUrgent,
    getProductionHigh,
    getProductionNormal,
    handleProductionNotesModal,
    handleAssignOrderById,
    handleAssignRepairModal,
    handleTechnicianModal,
    handlePhoneByTechnician,
    handleOrderPhone,
    updateFinalPrice,
    handleProductBuilder,
    handleAllSpareList,
    handleRefurbishLead,
    refurbishRejectPhone,
    inputAllDataSearch,
    ClearSearchedDataOfAll
} from "./RefurbishAction";

import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import { BorderColorOutlined, PersonAddAlt1 } from "@mui/icons-material";
import AddLeadInRefurbish from "./AddLeadInRefurbish";
import RefurbishRejectModal from "./RefurbishRejectModal";
import SearchedDataRefurbish from "./SearchedDataRefurbish";
import RefurbishNoteAll from "./RefurbishNoteAll";
const TechnicianModal = lazy(() => import("./TechnicianModal"));
const AssignOrderModal = lazy(() => import("./AssignOrderModal"));
const AddAssignRepairModal = lazy(() => import("./AddAssignRepairModal"));
const AllSpareListByOrder = lazy(() => import("./AllSpareListByOrder"));
const ShowProductBuilderModal = lazy(() => import("./ShowProductBuilderModal"));

const ProductionOrderList = (props) => {
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [pageNo, setPageNo] = useState(0);
   
  
    useEffect(() => {
        setPageNo(pageNo + 1);
        // props.getProductionOrderId(props.userId,pageNo)
        props.getProductionUrgent(props.userId,pageNo,"High")
        props.getProductionHigh(props.userId,pageNo,"Medium")
        props.getProductionNormal(props.userId,pageNo,"Low")
    }, [])
    const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPageNo(pageNo + 1);
    //     props.getProductionOrderId(props.userId)
    // };
    const handleLoadMore = () => {
        const callPageMapd = props.productionUrgent && props.productionUrgent.length &&props.productionUrgent[0].pageCount
        setTimeout(() => {
          const {
            getProductionUrgent,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionUrgent)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionUrgent(props.userId,pageNo,"High"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const handleLoadMore1 = () => {
        const callPageMapd = props.productionHigh && props.productionHigh.length &&props.productionHigh[0].pageCount
        setTimeout(() => {
          const {
            getProductionHigh,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionOrder)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionHigh(props.userId,pageNo,"Medium"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const handleLoadMore2 = () => {
        const callPageMapd = props.productionNormal && props.productionNormal.length &&props.productionNormal[0].pageCount
        setTimeout(() => {
          const {
            getProductionNormal,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionNormal)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionNormal(props.userId,pageNo,"Low"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.productionOrder)
    }, [props.productionOrder]);

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "672", //  "orderID",//0
              "248",  // "customer",//1
              "677" , // "Lead",//2             
              "76", // "Assigned ",//3
              "77" , // "Owner",//4
              "770",    //   "Quoted"5
              "106" , // "Urgent",//6
              "772",      //Delivery7
              "108", // "Normal"8
              "771" ,// "Final"9
             "1272",// Add Lead10
              "316",      // "Notes" 11
              "117" ,   // Reject 12
              "1299", // Assign For Repair 13
               "1274",  // Assign For QC 14
               "100" , //  New 15
               "170",   // "Edit" 16
               "661",    //Repair
            //    QC to be approved by Sales Owner/ Customer
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

 return (
        <div>
             {props.searchRefurbish.length > 0 ? (
    <SearchedDataRefurbish
    searchRefurbish={props.searchRefurbish}
    />
  ) : (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded  max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                 <div className=" flex max-sm:hidden  justify-between w-[95%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end z-10 ">
                    <div className=" max-md:w-[3rem] w-[3rem] text-[white] flex justify-center mr-1 bg-[red]"> {translatedMenuItems[6]} </div>
                        <div className="max-md:w-[10.2rem]  w-[10.2rem] flex justify-start ">
                         
                        {/* orderid" */}
                        <DynamicFeedIcon className='!text-sm mr-1  text-[#3F37C9]'/> {translatedMenuItems[0]}
                        </div>
                        {props.accountInfoInd &&(
                        <div className="max-md:w-[10.2rem] w-[7.71rem] ">
                           {/* customer  */}
                           <AcUnitIcon className='!text-base  text-[#92dce5]'
              /> {translatedMenuItems[1]}
                        </div>)}                                      
                        <div className="w-[4.5rem] max-md:w-[4.5rem] "> <LightbulbIcon
              className='!text-base  text-[#84a59d]'
              /> {translatedMenuItems[5]}
                            {/* Quoted */}
                        </div>
                        <div className="w-[3.6rem] max-md:w-[3.6rem]">    <CurrencyExchangeIcon
              className='!text-base  text-[#4CC9F0]'
              /> {translatedMenuItems[9]}
                           {/* final */}
                        </div>
                        <div className="w-[5.7rem] max-md:w-[5.7rem]">
                        <LocalShippingIcon className='!text-base  text-[#e4eb2f]'/> {translatedMenuItems[7]}  {/* Delivery */}
                            </div>
                            <div className="w-[27.2rem] max-md:w-[27.2rem]"></div>
                            <div className="w-[3.01rem] max-md:w-[3.01rem]">
                                {/* lead */}
                                <GroupsIcon className='!text-icon text-[#B23A48]'/> {translatedMenuItems[2]}
                        </div>
                        <div className="w-[4.92rem] max-md:w-[4.92rem]">
                           {/* Assigned */}
                           <AccountCircleIcon className="!text-icon  text-[#d64933]"/>   {translatedMenuItems[3]}
                        </div>
                        <div className="w-[4.81rem] max-md:w-[4.81rem]">
                           {/* Owner */}
                           <AccountCircleIcon className="!text-icon  text-[#FED0BB]"/>   {translatedMenuItems[4]}
                         </div>

                    
                    </div>
                    <InfiniteScroll
                    className=" max-sm:h-[34vh]"
                        dataLength={props.productionUrgent.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionUrgent ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"39vh"} 
                        style={{ overflowX: "hidden",scrollbarWidth:"thin" }}
                        endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {props.productionUrgent.map((item,index) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.createAt).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white  items-center justify-between py-ygap  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={item.orderPhoneId}>
                                        <div class="flex  max-sm:w-wk items-center   max-sm:items-center">
                                        <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9]  items-center md:w-2.26rem]  " >
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row items-center justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                            <div className=" flex w-[9.7rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:w-auto ">
                                                <Badge size="small" count={`${item.receiveRemainingQuantity} / ${item.phoneCount}`} overflowCount={5000} offset={[0, -7]}>
                                                    <span
                                                        class=" underline font-bold ml-gap  text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            props.handleProductBuilder(true)
                                                        }}>
                                                        {item.newOrderNo}
                                                    </span>
                                                </Badge>
                                            
                                                {date === currentdate ? (
                                                    <span
                                                        class="text-[tomato] flex items-center font-bold text-[0.65rem]">
                                                      {translatedMenuItems[15]}  {/* New */}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {props.accountInfoInd &&(
                                            <div className=" flex  w-[10.5rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.distributorName}
                                                </div>
                                            </div> )}
                                        </div>
                                       
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center  max-sm:items-center">
                                            <div className=" flex  w-[4.61rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.expectedPrice / 1000).toFixed(2)}k
                                                </div>
                                            </div>
                                            <div className=" flex w-[4.8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.finalPrice / 1000).toFixed(2)}k
                                                </div>
                                            </div>

                                            <div className=" flex w-[5.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {dayjs(item.deliveryDate).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                          
                                        </div>
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center  max-sm:items-center">

                                            <div className="flex w-[13.22rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs flex items-center justify-start font-poppins  text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcStartInd === 0 ?<div class="ml-gap font-bold text-[#ff1862] text-[0.65rem] text-center">QC to be approved by Sales Owner/ Customer </div>
                                                        : item.qcStartInd === 1 ?
                                                            // <Badge size="small" count={`${item.totalReceiveQuantity - item.cannotRepairCount} / ${item.totalReceiveQuantity}`} overflowCount={5000}>
                                                            <Tooltip title={translatedMenuItems[14]}>
                                                                <Button
                                                                    className="bg-[#1685e6] ml-gap text-white"
                                                                    onClick={() => {
                                                                        props.handleAssignOrderById(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >{translatedMenuItems[14]} </Button>
                                                            </Tooltip>
                                                            // </Badge>
                                                            : item.qcStartInd === 2 ? <div style={{ color: "#ff6347" }}>QC {translatedMenuItems[3]}</div>
                                                                : item.qcStartInd === 3 ? <div class=" text-[#32CD32]">
                                                                    QC <CheckCircleIcon className="!text-[#03c04a]" />
                                                                    {dayjs(item.qcEndTime).format("DD-MM-YYYY")}</div> : null}
                                                </div>
                                            </div>
                                            <div className=" flex w-[10.18rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class="flex text-xs ml-gap font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcRepairInd === 1 ?
                                                        <Tooltip title="Assign For Repair">
                                                            <Button
                                                                className="bg-[#1685e6] text-white"
                                                                onClick={() => {
                                                                    props.handleAssignRepairModal(true);
                                                                    handleRowData(item);
                                                                }}
                                                            >Assign For Repair</Button>
                                                        </Tooltip>
                                                        : item.qcRepairInd === 2 ? <div style={{ color: "#ff6347" }}>{translatedMenuItems[17]}  {translatedMenuItems[3]}</div>
                                                            : item.qcRepairInd === 3 ? <div class=" text-[#32CD32]">{translatedMenuItems[17]}
                                                                <CheckCircleIcon className="!text-[#03c04a]" /> {dayjs(item.repairEndTime).format("DD-MM-YYYY")}</div> : null}
                                                </div>
                                            </div>
                                            <div className=" flex  w-[4.22rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.rejectOrderCount > 0 &&
                                                        <Tooltip title="Reject">
                                                            <Badge size="small" count={`${item.rejectOrderCount} `} overflowCount={3000}>
                                                                <Button
                                                                    className="bg-[#1685e6] text-white"
                                                                    onClick={() => {
                                                                        props.refurbishRejectPhone(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >{translatedMenuItems[12]}</Button>
                                                            </Badge>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center max-sm:items-center">
                                         
                                         <div className=" flex  w-[4.53rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                             <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                 {item.teamLeadUserName && 
                                                 <MultiAvatar
                                                     primaryTitle={item.teamLeadUserName}
                                                     imgWidth={"1.8rem"}
                                                     imgHeight={"1.8rem"}
                                                 />
                                                 }
                                             </div>
                                         </div>
                                         <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[3.84rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                             <div class=" text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                 {item.supervisorUserName && 
                                                 <MultiAvatar
                                                     primaryTitle={item.supervisorUserName}
                                                     imgWidth={"1.8rem"}
                                                     imgHeight={"1.8rem"}
                                                 />
                                              } 
                                             </div>
                                         </div>
                                         <div className=" flex w-[3.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                             <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                 {item.userName && <MultiAvatar
                                                     primaryTitle={item.userName}
                                                     imgWidth={"1.8rem"}
                                                     imgHeight={"1.8rem"}
                                                 />}
                                             </div>
                                         </div>
                                     </div>
                                        <div class="flex w-wk max-sm:justify-evenly max-sm:w-wk items-center  max-sm:items-center justify-end h-8 ml-gap bg-[#eef2f9]">
                                           
                                                <div class="  text-green-600 font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                                                    <Tooltip title={translatedMenuItems[11]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
                                                </div>
                                          
                                                <div class=" text-xs  font-poppins">
                                                    <Tooltip title="Add Lead">
                                                        <PersonAddAlt1
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
                                                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                            onClick={() => {
                                                                props.handleRefurbishLead(true)
                                                                handleRowData(item)
                                                            }} />
                                                    </Tooltip>
                                                </div>
                                            
                                          
                                                <div class="  text-[tomato] font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                                                    <Tooltip title={translatedMenuItems[16]}>
                                                        <BorderColorOutlined
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
                                                            onClick={() => {
                                                                props.handleTechnicianModal(true)
                                                                handleRowData(item);
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                      
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </div>
</div>



<div className=' flex  sticky  z-auto'>
                <div class="rounded  max-sm:m-1  py-ygap w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className=" flex max-sm:hidden  justify-between w-[95%]  p-1 bg-transparent font-bold font-poppins text-lm sticky items-end z-10">
                    <div className=" max-md:w-[3.54rem] w-[3.54rem] text-[white] flex justify-center mr-1 bg-[teal]"> {translatedMenuItems[8]} </div>
                        <div className=" w-[10.2rem] max-md:w-[10.2rem] flex justify-start ">
                            {/* orderID */}
                            <DynamicFeedIcon className='!text-base mr-1  text-[#3F37C9]'/>{translatedMenuItems[0]}
                        </div>
                        {props.accountInfoInd &&(
                        <div className=" w-[7.71rem] max-md:w-[10.2rem]">
                            {/* customer */}
                            <AcUnitIcon className='!text-base  text-[#92dce5]'
              /> {translatedMenuItems[1]}
                        </div>)}                                    
                        <div className="w-[4.5rem] max-md:w-[4.5rem]"> <LightbulbIcon
              className='!text-base  text-[#84a59d]'
              /> {translatedMenuItems[5]}
                            {/* Quoted */}
                        </div>
                        <div className="w-[3.6rem] max-md:w-[3.6rem]">    <CurrencyExchangeIcon
              className='!text-base  text-[#4CC9F0]'
              /> {translatedMenuItems[9]}
                           {/* final */}
                        </div>
                        <div className="w-[5.7rem] max-md:w-[5.7rem]">
                        <LocalShippingIcon className='!text-base  text-[#e4eb2f]'/> {translatedMenuItems[7]}  {/* Delivery */}
                            </div>
                            <div className="w-[27.2rem] max-md:w-[27.2rem]"></div>
                            <div className="w-[3.01rem] max-md:w-[3.01rem]">
                          {/* lead */}
                          <GroupsIcon className='!text-base  text-[#B23A48]'/>  {translatedMenuItems[2]}
                        </div>
                        <div className="w-[4.92rem] max-md:w-[4.92rem]">
                          {/* Assigned */}
                          <AccountCircleIcon className="!text-icon  text-[#d64933]"/>   {translatedMenuItems[3]}
                        </div>
                        <div className="w-[4.81rem] max-md:w-[4.81rem]">
                           
                           {/* Owner  */}
                           <AccountCircleIcon className="!text-icon  text-[#FED0BB]"/>   {translatedMenuItems[4]}
                         </div>
             
                    </div>
                    <InfiniteScroll
                        dataLength={props.productionNormal.length}
                        next={handleLoadMore2}
                        hasMore={hasMore}
                        loader={props.fetchingProductionNormal ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"39vh"}
                        style={{ overflowX: "hidden",scrollbarWidth:"thin" }}
                        endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {props.productionNormal.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.createAt).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white  items-center justify-between py-ygap   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={item.orderPhoneId}>
                                        <div class="flex  max-sm:w-wk items-center max-sm:items-center">
                                        <div className=" flex items-center md:w-[2.26rem] border-l-2 h-8 border-green-500 bg-[#eef2f9] " >
                                                        <Tooltip>
                                                            <div class="flex items-center max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                 
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                            <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[9.7rem] max-sm:w-auto ">
                                                <Badge size="small" count={`${item.receiveRemainingQuantity} / ${item.phoneCount}`} overflowCount={5000}>
                                                    <span
                                                        class=" underline font-bold ml-gap text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            props.handleProductBuilder(true)
                                                        }}>
                                                        {item.newOrderNo}
                                                    </span>
                                                </Badge>
                                               
                                                {date === currentdate ? (
                                                    <span
                                                        class="text-[tomato] flex items-center font-bold text-[0.65rem]">
                                                       {translatedMenuItems[15]} {/* New */}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {props.accountInfoInd && (
                                            <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]   w-[10.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.distributorName}
                                                </div>
                                            </div> )}
                                        </div>
                                        
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                                            <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs ml-gap  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.expectedPrice / 1000).toFixed(2)}k
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.finalPrice / 1000).toFixed(2)}k
                                                </div>
                                            </div>

                                            <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[5.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {dayjs(item.deliveryDate).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                            {/* <div className=" flex   w-[4.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.suggestedPrice}
                                                </div>
                                            </div> */}
                                        </div>
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">

                                        <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[13.22rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                        <div class="flex items-center justify-start text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcStartInd === 0 ?<div class="ml-gap font-bold text-[#ff1862] text-[0.65rem] text-center">QC to be approved by Sales Owner/ Customer </div>
                                                        : item.qcStartInd === 1 ?
                                                            // <Badge size="small" count={`${item.totalReceiveQuantity - item.cannotRepairCount} / ${item.totalReceiveQuantity}`} overflowCount={5000}>
                                                            <Tooltip title={translatedMenuItems[14]}>
                                                                <Button
                                                                    className="bg-[#1685e6] ml-gap text-white"
                                                                    onClick={() => {
                                                                        props.handleAssignOrderById(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >{translatedMenuItems[14]} </Button>
                                                            </Tooltip>
                                                            // </Badge>
                                                            : item.qcStartInd === 2 ? <div style={{ color: "#ff6347" }}>QC {translatedMenuItems[3]}</div>
                                                                : item.qcStartInd === 3 ? <div class=" text-[#32CD32]">
                                                                    QC <CheckCircleIcon className="!text-[#03c04a]" />
                                                                    {dayjs(item.qcEndTime).format("DD-MM-YYYY")}</div> : null}
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9]  w-[10.18rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs ml-gap  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcRepairInd === 1 ?
                                                        <Tooltip title="Assign For Repair">
                                                            <Button
                                                                className="bg-[#1685e6] text-white"
                                                                onClick={() => {
                                                                    props.handleAssignRepairModal(true);
                                                                    handleRowData(item);
                                                                }}
                                                            >Assign For Repair</Button>
                                                        </Tooltip>
                                                        : item.qcRepairInd === 2 ? <div style={{ color: "#ff6347" }}>{translatedMenuItems[17]} {translatedMenuItems[3]}</div>
                                                            : item.qcRepairInd === 3 ? <div class=" text-[#32CD32]">{translatedMenuItems[17]}
                                                                <CheckCircleIcon className="!text-[#03c04a]" /> {dayjs(item.repairEndTime).format("DD-MM-YYYY")}</div> : null}
                                                </div>
                                            </div>
                                            <div className=" flex  w-[4.22rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins w-[2rem] text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.rejectOrderCount > 0 &&
                                                        <Tooltip title={translatedMenuItems[12]}>
                                                            <Badge size="small" count={`${item.rejectOrderCount} `} overflowCount={3000}>
                                                                <Button
                                                                    className="bg-[#1685e6] text-white"
                                                                    onClick={() => {
                                                                        props.refurbishRejectPhone(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >{translatedMenuItems[12]}</Button>
                                                            </Badge>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                               
                                            <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[4.53rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.teamLeadUserName && 
                                                    <MultiAvatar
                                                        primaryTitle={item.teamLeadUserName}
                                                        imgWidth={"1.8rem"}
                                                        imgHeight={"1.8rem"}
                                                    />
                                                    }
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[3.84rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.supervisorUserName && 
                                                    <MultiAvatar
                                                        primaryTitle={item.supervisorUserName}
                                                        imgWidth={"1.8rem"}
                                                        imgHeight={"1.8rem"}
                                                    />
                                                 } 
                                                </div>
                                            </div>
                                            <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[3.7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.userName && <MultiAvatar
                                                        primaryTitle={item.userName}
                                                        imgWidth={"1.8rem"}
                                                        imgHeight={"1.8rem"}
                                                    />}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-evenly max-sm:w-wk w-wk max-sm:items-center items-center justify-end h-8 ml-gap bg-[#eef2f9] ">
 
                                                <div class="   text-green-600 font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                                                    <Tooltip title={translatedMenuItems[11]}>
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer  max-sm:!text-2xl"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
                                                </div>
                                            

                                                <div class="  font-poppins">
                                                    <Tooltip title="Add Lead">
                                                        <PersonAddAlt1
                                                            className="!text-icon cursor-pointer   max-sm:!text-2xl"
                                                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                            onClick={() => {
                                                                props.handleRefurbishLead(true)
                                                                handleRowData(item)
                                                            }} />
                                                    </Tooltip>
                                               
                                            </div>
  
                                                <div class="   text-[tomato] font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title={translatedMenuItems[16]}>
                                                        <BorderColorOutlined
                                                            className="!text-icon cursor-pointer   max-sm:!text-2xl"
                                                            onClick={() => {
                                                                props.handleTechnicianModal(true)
                                                                handleRowData(item);
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                          
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </div>
</div>


                <Suspense fallback={<BundleLoader />}>
                    <AssignOrderModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        handleAssignOrderById={props.handleAssignOrderById}
                        assignOrderById={props.assignOrderById}
                        rowData={rowData}
                    />
                    <AllSpareListByOrder
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        handleAllSpareList={props.handleAllSpareList}
                        approveSpareModal={props.approveSpareModal}
                        rowData={rowData} />
                    <AddAssignRepairModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        handleAssignRepairModal={props.handleAssignRepairModal}
                        showAssignRepairModal={props.showAssignRepairModal}
                        rowData={rowData}
                    />
                    <ShowProductBuilderModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        rowData={rowData}
                        productBuilderList={props.productBuilderList}
                        handleProductBuilder={props.handleProductBuilder} />
                    <TechnicianModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        handleTechnicianModal={props.handleTechnicianModal}
                        showTechnicianModal={props.showTechnicianModal}
                        rowData={rowData}
                    />
                    <AddLeadInRefurbish
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        rowData={rowData}
                        showRefurbishLead={props.showRefurbishLead}
                        handleRefurbishLead={props.handleRefurbishLead}
                    />
                    <RefurbishRejectModal
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                        rowData={rowData}
                        refurbhsReject={props.refurbhsReject}
                        refurbishRejectPhone={props.refurbishRejectPhone}
                    />
                    <RefurbishNoteAll
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
                </Suspense>
            
        </>
        )}
        </div>
    )

}


const mapStateToProps = ({ refurbish, auth }) => ({
    showTechnicianModal: refurbish.showTechnicianModal,
    productionOrder: refurbish.productionOrder,
    addOrderPhone: refurbish.addOrderPhone,
    fetchingProductionOrederId: refurbish.fetchingProductionOrederId,
    productioNoteModal: refurbish.productioNoteModal,
    assignOrderById: refurbish.assignOrderById,
    phoneByTechnician: refurbish.phoneByTechnician,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    userId: auth.userDetails.userId,
    approveSpareModal: refurbish.approveSpareModal,
    productBuilderList: refurbish.productBuilderList,
    showRefurbishLead: refurbish.showRefurbishLead,
    refurbhsReject: refurbish.refurbhsReject,
    productionUrgent: refurbish.productionUrgent,
    productionHigh: refurbish.productionHigh,
    productionNormal: refurbish.productionNormal,
    fetchingProductionUrgent: refurbish.fetchingProductionUrgent,
    fetchingProductionHigh: refurbish.fetchingProductionHigh,
    fetchingProductionNormal: refurbish.fetchingProductionNormal,
    searchRefurbish: refurbish.searchRefurbish,
    user: auth.userDetails,
    accountInfoInd: auth.userDetails.accountInfoInd,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderId,
            handleProductionNotesModal,
            handleAssignOrderById,
            handleAssignRepairModal,
            handleTechnicianModal,
            handleProductBuilder,
            handlePhoneByTechnician,
            handleOrderPhone,
            updateFinalPrice,
            handleAllSpareList,
            handleRefurbishLead,
            refurbishRejectPhone,
            inputAllDataSearch,
            ClearSearchedDataOfAll,
            getProductionUrgent,
            getProductionHigh,
            getProductionNormal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderList)

