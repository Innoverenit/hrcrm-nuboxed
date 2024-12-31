import React, {  useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventory,  } from "../Inventory/InventoryAction";
import { Tooltip,Button} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UpdateIcon from '@mui/icons-material/Update';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    getEcomList,
    handleItemViewDrawer
} from "./OrderAction";
import CalculateIcon from '@mui/icons-material/Calculate';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import { MultiAvatar } from "../../../Components/UI/Elements";
import { base_url2 } from "../../../Config/Auth";
import ContactsIcon from '@mui/icons-material/Contacts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import axios from "axios";
import { BundleLoader } from "../../../Components/Placeholder";

const EcomStatusCardDrawer = lazy(() => import("./EcomStatusCardDrawer"));
const EcomSearchedData=lazy(()=>import("./EcomSearchedData"));
const EcomInvoiceListDrawer = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/EcomInvoiceListDrawer"));
const ProcureItemViewDrawer = lazy(() => import("./ProcureItemViewDrawer")); //2
const CBMdrawer = lazy(() => import("./CBMdrawer"));

function EcomCardList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [cbmDrawer, setcbmDrawer] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.ecomList.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ecomList]);


  useEffect(() => {
    props.getInventory(props.orgId);
  }, [props.orgId]);

  useEffect(() => {
    props.getEcomList(props.orgId, page);
    setPage(page + 1);
  }, []);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);

// useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         setLoading(true); 
//         const itemsToTranslate = [
//         "660",// 'Order',//0
//        "73", //  'Created', 1
//        "248",  // 'Customer',//2
//        "1209",// 'Shipping Address',3
//         "710",  // 'Billing Address',//4
//        "253", // 'Items',//5
//         "142",// 'Status',6    
//       "1210",  // 'Invoices',7
//        "1377",  // 'Ship',8
//      "100", //  New 9
//      "71" ,//Type 10
//      "880",//Inventory 11
//      "1169",// Invoice 12
//      "1486",// Track 13
//      "218",// Value 14


//       ];
//       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);



 
  const handleLoadMore = () => {
    const callPageMapd = props.ecomList && props.ecomList.length &&props.ecomList[0].pageCount
    setTimeout(() => {
      const {
        getEcomList,
       // userDetails: { employeeId },
      } = props;
      if  (props.ecomList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getEcomList(props.orgId, page, );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const openCBM = () => {
    setcbmDrawer(true)
  };

  dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); // e.g., "2 days ago"
    }
};

  const closeModal = () => {
    setModalVisible(false);
  };

  const viewAnDownloadPdf= async (item) => {  
    try {
      const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`order`}/${item.orderId}`, {
        responseType: 'blob',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
  
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const filename = 'custom-pdf-name.pdf';
  
      window.open(url, '_blank');
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename; 
      downloadLink.click(); 
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }  
  
  }; 

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
    {props.orderSearch.length > 0 ? (
      <EcomSearchedData
      orderSearch={props.orderSearch}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
      />
    ) : (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1] max-sm:hidden">
        <div className=" flex justify-between w-[77%]  p-1 bg-transparent font-poppins !text-lm font-bold sticky items-end z-10">
                        <div className="w-[7.2rem] max-md:w-[6.02rem] text-[#00A2E8] text-sm truncate"> 
                          <DynamicFeedIcon className='!text-icon mr-1 '/>
                          {props.translatedMenuItems[14]} ID</div>
                        <div className="w-[4.9rem] max-md:w-[5.14rem] truncate">
                          <ContactsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
                          {props.translatedMenuItems[15]}</div>
                        <div className="w-[9.4rem] max-md:w-[9.4rem] flex truncate">
                          <ApartmentIcon className='!text-icon  text-[#606C38]'/>
                          {props.translatedMenuItems[18]}</div>
                        {/* Customer */}
                        <div className="w-[13.4rem] max-md:w-[10.4rem] truncate">
                        <LocationOnIcon className='!text-icon  text-[#2B2D42]'/>
                        {props.translatedMenuItems[62]}</div>
                        {/* Shipping */}
                        <div className="w-[13.09rem] max-md:w-[11.04rem] truncate">  
                          <TextSnippetIcon className='!text-icon  text-[#457B9D]'/>
                      {props.translatedMenuItems[63]}</div>
                        {/* Billing */}
                        <div className="w-[3.4rem] max-md:w-[4.4rem] truncate">
                          <AddShoppingCartIcon className='!text-icon  text-[#B23A48]'/>
                          {props.translatedMenuItems[64]}
                          </div>
                        {/* item */}              
                        <div className="w-[7.8rem] max-md:w-[5.8rem] truncate"> 
                          <UpdateIcon className='!text-icon text-[#ff66b3]' /> 
                          {props.translatedMenuItems[16]}
                          </div>                 
                        <div className="w-[6.4rem] max-md:w-[5.4rem] truncate"> 
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  /> 
                          {props.translatedMenuItems[68]}                       
                          </div>                     
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.ecomList.length}
          next={handleLoadMore}
          loader={props.fetchingEcomList?<div><BundleLoader/></div>:null}
          height={"83vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex font-poppins text-center font-bold text-xs text-red-500">{props.translatedMenuItems[31]}. </div>}
        >
          {data.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           
           
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 py-ygap items-center   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center h-8 border-l-2 border-green-500 ">
                        <div className=" flex  w-[6.4rem] max-md:w-[6.4rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                                {item.newOrderNo}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold" >
                                 {props.translatedMenuItems[25]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex w-[4.9rem]  items-center max-md:w-[4.9rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                          
                            <div class=" text-xs  items-center font-poppins ">
                            <MultiAvatar
                  primaryTitle={item.contactPersonName}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                            </div>
                    
                        </div>

                        <div className=" flex items-center justify-start h-8 ml-gap w-[9.12rem] bg-[#eef2f9]  max-md:w-[9.12rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                                {item.distributorName}
                            </div>

                        </div>
                        <div className=" flex items-center justify-start h-8 ml-gap  bg-[#eef2f9] w-[13.3rem]  max-md:w-[13.3rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                                {item.loadingAddress?.[0]?.city} {/* Shipping address */}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[13.5rem]  max-md:w-[13.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  font-poppins">
                             
                            </div>

                        </div>


                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[3.1rem] max-md:w-[3.1rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs cursor-pointer text-blue-500 font-poppins"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleItemViewDrawer(true);                               
                            }}>
                                {item.itemCount}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[7.8rem]  max-md:w-[7.8rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.status}
                            </div>

                        </div>
                        <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[6.6rem]  max-md:w-[6.6rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.orderSource}
                            </div>

                        </div>

                        <div className=" flex  items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[7.5rem] max-md:w-[7.5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <Button type="primary" onClick={()=>{setopenInvoiceModal(true);
                     handleSetParticularOrderData(item);
                  }}>          <DataSaverOnIcon className=" !text-icon" /> 
                  {props.translatedMenuItems[66]}
                  </Button>
                        </div>
                        <div class="flex text-xs  items-center font-poppins  justify-center h-8 ml-gap  bg-[#eef2f9]">
                            {/* {date} */}
                            <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span>
                            </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center"> 
                        <div class="w-6 items-center justify-center h-8   bg-[#eef2f9] flex">
                        <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>                                                 
                        <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">                       
                        <Tooltip title={props.translatedMenuItems[16]}
                        // "Status"
                                                                
                                                            >
                                                                <EventRepeatIcon

                                                                    className="!text-icon cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                       openModal();
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                        </div>
                        <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">   
                        <Tooltip title="CBM">
                        <CalculateIcon className="!text-icon "
                         onClick={() => {
                          openCBM();
                           handleSetParticularOrderData(item);
                       }}
                        />
                        </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <Suspense>
      <EcomInvoiceListDrawer
                    particularRowData={particularRowData}
         openInvoiceModal={openInvoiceModal}
         setopenInvoiceModal={setopenInvoiceModal}
         translatedMenuItems={props.translatedMenuItems}
         />
          <ProcureItemViewDrawer       
           particularRowData={particularRowData}
           viewItemDrwr={props.viewItemDrwr}
           handleItemViewDrawer={props.handleItemViewDrawer}                    
           />
           <CBMdrawer
           particularRowData={particularRowData}
           cbmDrawer={cbmDrawer}
           setcbmDrawer={setcbmDrawer}
           />
       <EcomStatusCardDrawer
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
                particularRowData={particularRowData}
                modalVisible={modalVisible}
                closeModal={closeModal} />
                </Suspense>

    </>
       )}
  </div>
  );



}

const mapStateToProps = ({ order,procre,inventory,auth }) => ({
  ecomList: order.ecomList,
  viewItemDrwr: order.viewItemDrwr,
  fetchingEcomList: order.fetchingEcomList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  orderSearch:order.orderSearch,
  inventory: inventory.inventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {
getEcomList,
handleItemViewDrawer,
getInventory

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcomCardList);
