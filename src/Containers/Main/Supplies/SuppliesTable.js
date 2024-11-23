import React, { useState, useEffect,Suspense, lazy,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddSuppliesRowImageModal from "./AddSuppliesRowImageModal"
import DescriptionIcon from '@mui/icons-material/Description';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FWLogo1 from "../../../Assets/Images/smallLogo.png"
import PinIcon from '@mui/icons-material/Pin';
import {
  getSuppliesList,
  handleLocationuppliesModal,
  deletePurchaseData,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  handleCurrencyPriceModal,
  handleBrandModel,
  handleMaterialBuilderDrawer,
  handleSuppliersListDrawer,
  handleMaterialInventory,
  handlePriceModal,
  handleUploadSuppliesModal,
  handleErpDocumentUploadModal,
  getBestBeforeJumpListCount,
  getReorderCount
} from "./SuppliesAction";
import {getUOM} from "../../Settings/SettingsAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip, Popconfirm,Button } from "antd";
import CallIcon from '@mui/icons-material/Call';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadIcon from '@mui/icons-material/Upload';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import ContactsIcon from '@mui/icons-material/Contacts';
import dayjs from "dayjs";
import InventoryIcon from '@mui/icons-material/Inventory';
import { BundleLoader } from "../../../Components/Placeholder";
import { JumpStartBox, MultiAvatar } from "../../../Components/UI/Elements";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import InfiniteScroll from "react-infinite-scroll-component";
import MaterialStatusToggle from "./MaterialStatusToggle";
import ReactToPrint from "react-to-print";
import AddDocumentErpModals from "./AddDocumentErpModals";
import DateRangeIcon from '@mui/icons-material/DateRange';
import SuppliesSearchedData from "./SuppliesSearchedData";
import EmptyPage from "../EmptyPage";
import BestJumpOpen from "./BestJumpOpen";
import ReOrderOpen from "./ReOrderOpen";
const MaterialInventoryDrawer = lazy(()=>import("./MaterialInventory/MaterialInventoryDrawer"));
const MaterialBuilderDrawer = lazy(() => import("./MaterialBuilder/MaterialBuilderDrawer"));
const TagBrandModel = lazy(() => import("./TagBrandModel"));
const SuppliersListDrawer = lazy(() => import("./SuppliesSupplierList/SuppliersListDrawer"));
const MaterialDetailsDrawer=lazy(() => import("./MaterialById/MaterialDetailsDrawer"));

function SuppliesTable(props) {
  
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openComplementary,setopenComplementary] = useState(false);
  const [openStatus,setopenStatus] = useState(false);
  const [open , setOpen] = useState(false);
  const [reOpen , setreOpen] = useState(false);
  const {bestbeforelistcount, fetchingbestbefore} = props;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const componentRefs = useRef([]);
  const handlePrint = () => {
    window.print();
};
  useEffect(() => {
    setPage(page + 1);
    props.getSuppliesList(page);
    props.getUOM()
    props.getBestBeforeJumpListCount(props.orgId)
    props.getReorderCount()
  }, []);

  const handleLoadMore = () => {
    const PageMapd = props.purchaseList && props.purchaseList.length && props.purchaseList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliesList,

        userId
      } = props;
      if (props.purchaseList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliesList(page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };


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
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "799",//0
          "800",//1
          "110",//2
          "14",//3
          "1154",//4
          "259",//5
          "815",//6
          "679",//7
          "1068",//8
          "1174",//9
          "1173",//10
          "742",//11
          "824",//12
          "880",//13
          "170",//14
          "264",  // Brand15
          "265",// model16
         "100", // New17
        "1608",//  Updated18
       "1247", // Material Builder19
       "1609" , //  Tag Brand20
       "1259" , //  "Do you want to delete?"21
       "1610" , //  Complimentry22
       "1252" , //  "Print"23
       "800" ,// Supplies Id24
       "1703",  //  "Best before", // 25
       "815", //  "re-order", // 26
        "1231",//   "Orders Closed", // 27
        "1232",//  "Orders Cancelled"//28
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const { updateSuppliesDrawer,
     handleUpdateSupplieDrawer,
      materialBuildrawer, 
      handleMaterialBuilderDrawer,
      handlePriceModal,
      erpDocumentUploadModal,
      handleErpDocumentUploadModal } = props;
  return (
    <>

     <div class=" flex w-full max-sm:flex-col mt-4" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center  text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[25]}
              jumpstartClick={()=> setOpen(true)}
              cursorData={"pointer"}
               value={props.suppliesBestBeforeCount.bbcnt}
            // isLoading={fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[26]} 
            jumpstartClick={()=> setreOpen(true)}
              cursorData={"pointer"}
            //  value={ props.reOrderCount.count}
            // isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                    
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
                bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title= {translatedMenuItems[27]}
          
              //jumpstartClick={()=> handleClick("Closed")}
              cursorData={"pointer"}
            // value={completeOrder}
            // isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                              noProgress
                              title= {translatedMenuItems[28]} 
                             // jumpstartClick={()=> handleClick("Cancelled")}
                              cursorData={"pointer"}
                              value={"0"}
                            // isLoading={props.fetchingorderDetails}
                            />
                          </div>
                      </div>      
                  </div>
                  <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center  text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[25]}
             // jumpstartClick={()=> handleClick("Added")}
              cursorData={"pointer"}
              value={"0"}
            // isLoading={props.fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                              noProgress
                              title= {translatedMenuItems[28]} 
                             // jumpstartClick={()=> handleClick("Cancelled")}
                              cursorData={"pointer"}
                              value={"0"}
                            // isLoading={props.fetchingorderDetails}
                            />
                          </div>
                      </div>      
                  </div>
          </div>
          {props.suppliesSerachedData.length > 0 ? (
    <SuppliesSearchedData
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
    suppliesSerachedData={props.suppliesSerachedData}
    fetchingSuppliesInputSearchData={props.fetchingSuppliesInputSearchData}
    />
  ) : (  
      <div className=" flex sticky z-auto mt-4">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[64%] justify-between  p-1 bg-transparent font-bold font-poppins !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-end z-10">
            <div className=" w-[3.25rem] max-xl:w-[2rem]"></div>
            <div className="text-[#00A2E8] text-sm   w-[6.9rem] truncate max-md:w-[6.522rem] ">
              {/* HSN */}
             < PinIcon className=" !text-icon"/>{translatedMenuItems[0]} ID
              </div>
              <div className=" w-[8.2rem] truncate max-md:w-[9.53rem] ">
              {/* Supplies */}
              <QrCodeIcon className="!text-icon text-[#b91372]"/>   {translatedMenuItems[24]} 
              </div>
            <div className=" w-[9.3rem] truncate max-md:w-[9.1rem] ">
              {/* Name */}
              <ContactsIcon className="!text-icon mr-1 "/> {translatedMenuItems[2]}
              </div>
            <div className=" w-[10.1rem] truncate max-md:w-[11.2rem] ">
              {/* Category */}
              <WidgetsIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[3]}
              </div>
            
              <div className=" w-[11.4rem] truncate max-md:w-[11.13rem] ">
              {/* Brand*/}
              <BrandingWatermarkIcon className="!text-icon" />   {translatedMenuItems[15]}
              </div>
              <div className=" w-[9.135rem] truncate max-md:w-[8.135rem] ">
              {/* Model*/}
              <ModelTrainingIcon className=" !text-icon" />  {translatedMenuItems[16]}
              </div>
            <div className=" w-[8.01rem] truncate max-md:w-[10.01rem] ">
              {/* Attribute */}
              <AttractionsIcon className="  !text-icon" />  {translatedMenuItems[5]}
              </div>
           
            
            {/* <div className=" w-[9.24rem] truncate max-md:w-[15.24rem] ">
              Created
              <DateRangeIcon className="!text-icon "/>  {translatedMenuItems[7]}
              </div> */}
          
      

          </div>

          <InfiniteScroll
            dataLength={props.purchaseList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingPurchaseList ? <div style={{ textAlign: 'center' }}>
              <BundleLoader/>
            </div> : null}
            height={"83vh"}
            style={{ scrollbarWidth:"thin" }}
          >
            {props.purchaseList.length ?
              <>
                {props.purchaseList.map((item,index) => {
                  const currentDate = dayjs().format("DD/MM/YYYY");
                  
                  return (
                    <>
                      <div className="flex rounded  bg-white mt-1 py-ygap max-sm:h-[7.5rem] max-sm:flex-col scale-[0.99] max-xl:text-[0.65rem] max-lg:text-[0.45rem] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                     <div className="flex max-sm:w-wk max-sm:justify-between ">
                                <div className=" flex items-center w-[2rem] border-l-2 border-green-500 bg-[#eef2f9]">
                                  {item.imageId && (
                                    <span>
                                      <MultiAvatar
                                        imageId={item.imageId}
                                        imgWidth={"1.8rem"}
                                        imgHeight={"1.8rem"}
                                      />
                                    </span>
                                  )}
                                </div>
                                

                                <div class="max-sm:w-auto flex   w-[5.22rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center">

                                  <div className=" flex  max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" text-[0.65rem] ml-gap max-sm:text-xs  font-poppins ">
                                      {item.hsn} 
                                    
                                      
                                    </div>
                                    
                                  </div>
                                  
                                                                  
                                <div className=" flex  flex-row w-[6rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" w-[4.8rem] text-[0.65rem] cursor-pointer text-blue-600 max-sm:text-xs  font-poppins "
                               onClick={() => {
                                openModal();
                                handleParticularRowData(item);
                              }}
                              >
                                {item.newSuppliesNo}
                              </div>
                            <div>  <span className="text-[0.5rem] text-green-700 font-bold font-poppins">
                                {item.modifiedAt ? translatedMenuItems[18] : null}
                                        </span></div>
                            </div>
                           
                                </div>
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-center   items-center w-[6.52rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" text-[0.65rem] ml-gap max-sm:text-xs  font-poppins ">
                                      {item.msku} 
                                    </div>
                                    
                                  </div>
                                  <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                        <span className="text-[0.55rem] ml-gap text-[tomato] font-bold">
                                          {translatedMenuItems[17]}  {/* New */}
                                        </span>
                                      ) : null} </span>
                              </div>

                            <div className=" flex  h-8 ml-gap bg-[#eef2f9] justify-start w-[46.1rem] items-center max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs truncate max-w-[100px] ml-gap font-poppins  cursor-pointer text-blue-600" title={item.suppliesName}
                               onClick={() => {
                                openModal();
                                handleParticularRowData(item);
                              }}
                              >
                                {item.suppliesName}
                              </div>
                            </div>
                          
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex  h-8 ml-gap bg-[#eef2f9] justify-start items-center  w-[8.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs truncate max-sm:text-xs ml-gap font-poppins ">
                                {item.categoryName}  {item.subCategoryName}
                              </div>
                            </div>

                            
                            <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-start items-center w-[9.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap  font-poppins ">
                                {item.brandName}  
                              </div>
                            </div>
                            <div className=" flex w-[7.19rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap font-poppins ">
                              {item.modelName}  
                              </div>
                            </div>
                            <div className=" flex w-[6.19rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs ml-gap  font-poppins ">
                               {item.attributeName} 
                              </div>
                            </div>
                          </div>
                           <div class="flex max-sm:justify-between  max-sm:w-wk items-center">
                            

                           
                            <div className=" flex  w-[6.9rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins ">
                                <MultiAvatar
                                  primaryTitle={item.userName}
                                  imageId={item.userImageId}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                {/* {`${dayjs(item.creationDate).format("DD/MM/YYYY")}`} */}
                              </div>
                            </div>
                            <div className=" flex  w-[8.2rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins ">
                                <MaterialStatusToggle
                                  publishInd={item.publishInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>
                          

                          
                          </div> 

                     <div class="flex max-sm:justify-between max-sm:w-wk items-center justify-end w-wk">
                     <div className=" flex   h-8 ml-gap bg-[#eef2f9] justify-center items-center w-[6.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins  max-sm:text-xs">
                                                        <Tooltip title={translatedMenuItems[23]}                                                  
                                                        >                                                         
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>
                                                            {translatedMenuItems[23]}   {/* Print  */}
                                                                <QrCodeIcon className="!text-icon"/></Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>
  <div className=" flex w-[1.25rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins ">
                              <UploadIcon
                               onClick={() => {
                                handleParticularRowData(item)
                                props.handleUploadSuppliesModal(true)
                               }}
                              />
                              </div>
                            </div>
                                                          
                            <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              <Tooltip title={translatedMenuItems[19]}>
                                <ViewQuiltIcon
                                  className="cursor-pointer !text-icon text-[#c589e8]"
                                  onClick={() => {
                                    props.handleMaterialBuilderDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              {props.repairInd && <Tooltip title={translatedMenuItems[20]}>
                                <CallIcon
                                  onClick={() => {
                                    props.handleBrandModel(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-icon cursor-pointer text-[#dc851f]"
                                />
                              </Tooltip>}
                            </div>


                            <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              <Tooltip title={translatedMenuItems[12]}>
                                <CategoryIcon
                                  onClick={() => {
                                    props.handleSuppliersListDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className="!text-icon cursor-pointer text-[#d3c0cd] "
                                />
                              </Tooltip>
                            </div>

                            <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              <Tooltip title={translatedMenuItems[13]}>
                                <InventoryIcon className=" !text-icon cursor-pointer text-[#937666]"  onClick={() => {
                                    props.handleMaterialInventory(true);
                                    handleParticularRowData(item);
                                  }}/>
                              </Tooltip>
                            </div>
                                                                                                                                 
                     <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              <DescriptionIcon className="!text-icon"
                     
                      title="Upload Document"
                        
                      onClick={() => {handleErpDocumentUploadModal(true);
                        handleParticularRowData(item);
                      }}                               
                    />
                              </div>
                              
                            
                           <div className="h-8  bg-[#eef2f9] justify-center items-center flex"> 
                              <Popconfirm
                                title={translatedMenuItems[21]}
                                onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                              >
                                <DeleteOutlineIcon className=" !text-icon cursor-pointer text-[red]" />
                              </Popconfirm>
                            </div>                                      
                          </div>                                              
                      </div>
                    </>
                  );
                })}
              </> :
              !props.purchaseList.length
                && !props.fetchingPurchaseList ? <EmptyPage/> : null}
          </InfiniteScroll>
        </div>
      </div>
  )}  
      <Suspense fallback={<div className="custom-loader">
          <div className="loader !block"> </div>
      <div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
    </div>}>
        <TagBrandModel
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          addBrandModel={props.addBrandModel}
          handleBrandModel={props.handleBrandModel}
          particularDiscountData={particularDiscountData}
        />
         <AddDocumentErpModals
        suppliesId={particularDiscountData.suppliesId}
          erpDocumentUploadModal={erpDocumentUploadModal}
          handleErpDocumentUploadModal={handleErpDocumentUploadModal}
          translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
        />
        <MaterialBuilderDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          materialBuildrawer={materialBuildrawer}
          handleMaterialBuilderDrawer={handleMaterialBuilderDrawer}
        />
        <SuppliersListDrawer
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          suppliersListDrwr={props.suppliersListDrwr}
          handleSuppliersListDrawer={props.handleSuppliersListDrawer}
        />
        <MaterialInventoryDrawer
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={translatedMenuItems}
       particularDiscountData={particularDiscountData}
       materialInveDawer={props.materialInveDawer}
       handleMaterialInventory={props.handleMaterialInventory}
        />
         <MaterialDetailsDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        particularDiscountData={particularDiscountData}
         modalVisible={modalVisible}
       closeModal={closeModal}
       openComplementary={openComplementary}
       setopenComplementary={setopenComplementary}
       handlePriceModal={handlePriceModal}
       priceOpenModal={props.priceOpenModal}
       UOMListData={props.UOMListData}
        />
 
      <AddSuppliesRowImageModal
      particularDiscountData={particularDiscountData}
      uploadSuppliesList={props.uploadSuppliesList}
      handleUploadSuppliesModal={props.handleUploadSuppliesModal}
      />
      <BestJumpOpen
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      particularDiscountData={particularDiscountData}
      open={open}
      setOpen={setOpen}
      />
 <ReOrderOpen
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      particularDiscountData={particularDiscountData}
      reOpen={reOpen}
      setreOpen={setreOpen}
      />
      
      </Suspense>

    </>
  );
}


const mapStateToProps = ({ supplies, auth,settings }) => ({
  fetchingPurchaseList: supplies.fetchingPurchaseList,
  purchaseList: supplies.purchaseList,
  updateSuppliesDrawer: supplies.updateSuppliesDrawer,
  addCurrencyValue: supplies.addCurrencyValue,
  erpDocumentUploadModal:supplies.erpDocumentUploadModal,
  uploadSuppliesList:supplies.uploadSuppliesList,
  addBrandModel: supplies.addBrandModel,
  materialBuildrawer: supplies.materialBuildrawer,
  repairInd: auth.userDetails.repairInd,
  suppliersListDrwr: supplies.suppliersListDrwr,
  materialInveDawer:supplies.materialInveDawer,
  priceOpenModal: supplies.priceOpenModal,
  locationSuppliesModal:supplies.locationSuppliesModal,
  UOMListData:settings.UOMListData,
  suppliesSerachedData:supplies.suppliesSerachedData,
  fetchingSuppliesInputSearchData:supplies.fetchingSuppliesInputSearchData,
  orgId: auth.userDetails.organizationId,
  suppliesBestBeforeCount:supplies.suppliesBestBeforeCount,
  reOrderCount:supplies.reOrderCount
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliesList,
      deletePurchaseData,
      handleUploadSuppliesModal,
      handleUpdateSupplieDrawer,
      setEditSupplies,
      handleLocationuppliesModal,
      handleCurrencyPriceModal,
      handleBrandModel,
      handleMaterialBuilderDrawer,
      handleSuppliersListDrawer,
      handleMaterialInventory,
      handleErpDocumentUploadModal,
      handlePriceModal,
      getUOM,
      getBestBeforeJumpListCount,
      getReorderCount
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTable);
