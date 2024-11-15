import React, { useState, useEffect,Suspense, lazy,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddSuppliesRowImageModal from "./AddSuppliesRowImageModal"
import DescriptionIcon from '@mui/icons-material/Description';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FWLogo1 from "../../../Assets/Images/smallLogo.png"
import PinIcon from '@mui/icons-material/Pin';
import {
  getBestBeforeJumpList,
} from "./SuppliesAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip, Popconfirm,Button } from "antd";
import {
  DeleteOutlined,
  PhoneFilled,
  UploadOutlined,
} from "@ant-design/icons";

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
import { FormattedMessage } from "react-intl";
import SuppliesSearchedData from "./SuppliesSearchedData";
import EmptyPage from "../EmptyPage";


function BestBeforeTable(props) {
  
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openComplementary,setopenComplementary] = useState(false);
  const [openStatus,setopenStatus] = useState(false);
  const [open , setOpen] = useState(false);
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
    props.getBestBeforeJumpList(props.orgId);
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



 
  return (
    <>

   
      <div className=" flex sticky z-auto mt-4">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[81%] justify-between  p-1 bg-transparent font-bold sticky items-end z-10">
            <div className=" w-[4.25rem] max-xl:w-[2rem]"></div>
            <div className="font-bold text-[#00A2E8] text-base font-poppins  w-[6.522rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* HSN */}
             < PinIcon className=" !text-base"/>{translatedMenuItems[0]} ID
              </div>
              <div className="font-bold font-poppins text-xs w-[9.53rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Supplies */}
              <QrCodeIcon className="!text-icon text-[#b91372]"/>   {translatedMenuItems[24]} 
              </div>
            <div className="font-bold font-poppins text-xs w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Name */}
              <ContactsIcon className="!text-icon mr-1 "/> {translatedMenuItems[2]}
              </div>
            <div className="font-bold font-poppins text-xs w-[11.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Category */}
              <WidgetsIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[3]}
              </div>
            
              <div className="font-bold font-poppins text-xs w-[11.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Brand*/}
              <BrandingWatermarkIcon className="!text-icon" />   {translatedMenuItems[15]}
              </div>
              <div className="font-bold font-poppins text-xs w-[8.135rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Model*/}
              <ModelTrainingIcon className=" !text-icon" />  {translatedMenuItems[16]}
              </div>
            <div className="font-bold font-poppins text-xs w-[10.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Attribute */}
              <AttractionsIcon className="  !text-icon" />  {translatedMenuItems[5]}
              </div>
           
            
            <div className="font-bold font-poppins text-xs w-[15.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Created */}
              {translatedMenuItems[7]}
              </div>
          
             
          </div>

          
            {props.bestBeforeSuppliesList.length ?
              <>
                {props.bestBeforeSuppliesList.map((item,index) => {
                  const currentDate = dayjs().format("DD/MM/YYYY");
                  
                  return (
                    <>
                      <div className="flex rounded  bg-white mt-1 py-1 max-sm:h-[7.5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
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
                                

                                <div class="max-sm:w-auto flex items-center  w-[5.22rem] h-8 ml-gap bg-[#eef2f9] justify-center">

                                  <div className=" flex  max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" text-[0.65rem] max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                      {item.hsn} 
                                    
                                      
                                    </div>
                                    
                                  </div>
                                  
                              
                                </div>
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-center   items-center w-[6.52rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" text-[0.65rem] max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                      {item.msku} 
                                    </div>
                                    
                                  </div>
                                
                              </div>

                          
                          
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex  h-8 ml-gap bg-[#eef2f9] justify-center items-center  w-[8.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs truncate max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.categoryName}  {item.subCategoryName}
                              </div>
                            </div>

                            
                            <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-center items-center w-[9.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.brandName}  
                              </div>
                            </div>
                            <div className=" flex w-[7.19rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                
                              </div>
                            </div>
                            <div className=" flex w-[6.19rem] h-8 ml-gap bg-[#eef2f9] justify-center items-center max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                
                              </div>
                            </div>
                          </div>
                        

                                                             
                      </div>
                    </>
                  );
                })}
              </> :
              !props.bestBeforeSuppliesList.length
                && !props.fetchingBestBeforeJumpList ? <EmptyPage/> : null}
          
        </div>
      </div>



      
      

    </>
  );

}

const mapStateToProps = ({ supplies, auth,settings }) => ({
  fetchingBestBeforeJumpList: supplies.fetchingBestBeforeJumpList,
  bestBeforeSuppliesList: supplies.bestBeforeSuppliesList,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBestBeforeJumpList,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BestBeforeTable);
