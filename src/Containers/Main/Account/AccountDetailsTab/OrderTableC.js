import React, {  useEffect, useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCustomerOrder,handleStatuShowDrawer} from "../AccountAction"
import { Tooltip} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import ProcureStatusShowDrawer from "./AccountOrderTab/ProcureStatusShowDrawer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";
import { base_url2 } from "../../../../Config/Auth";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UpdateIcon from '@mui/icons-material/Update';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
function OrderTableC(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getCustomerOrder(props.distributorId, page);
    setPage(page + 1);
  }, []);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "71",// 'Type',//0
       "660", //  'Order', 1
       "679",  // 'Created',//2
       "73",// 'Contact',3
        "1171",  // 'Payment',//4
       "142", // 'Status',//5
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
 
// Orders

  const handleLoadMore = () => {
    const callPageMapd = props.orderCustomerList && props.orderCustomerList.length &&props.orderCustomerList[0].pageCount
    setTimeout(() => {
      const {
        getCustomerOrder,
       // userDetails: { employeeId },
      } = props;
      if  (props.orderCustomerList)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getCustomerOrder(props.distributorId, page, );
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

  const closeModal = () => {
    setModalVisible(false);
  };

const {handleProcureNotesDrawerModal,
  addDrawerProcureNotesModal
} = props;
  return (
    <div>
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:hidden">
        <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold  font-poppins !text-lm sticky  z-10">
                        <div className="text-[#00A2E8] text-sm w-[12.4rem]   truncate max-md:w-[25rem]">
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]} </div>
                        <div className=" w-[21.8rem]  truncate max-md:w-[14.4rem]">
                        <DynamicFeedIcon className='!text-icon mr-1  text-[#e4eb2f]'/>{translatedMenuItems[1]} ID</div>
                        <div className="  w-[15.7rem] truncate max-md:w-[16.4rem]">
                        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[2]}</div>
                        <div className="  w-[15.6rem]  truncate max-md:w-[7.4rem]">
                        <ContactPageIcon className='!text-icon  '  /> {translatedMenuItems[3]}</div>
                        <div className="w-[10.8rem]  truncate max-md:w-[7.4rem]">
                         <CurrencyExchangeIcon className='!text-icon  mr-1  text-[#e4eb2f]' />{translatedMenuItems[4]}</div>
                        <div className="  w-[9.6rem] truncate max-md:w-[6.14rem]">
                        <UpdateIcon className='!text-icon mr-1 text-[#ff66b3]' /> {translatedMenuItems[5]}</div>
                      
        </div>
        <InfiniteScroll
            hasMore={hasMore}
          dataLength={props.orderCustomerList.length}
          next={handleLoadMore}
          loader={props.fetchingOrderCustomer?<div class="flex justify-center" >Loading...</div>:null}
          height={"79vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.orderCustomerList.length === 0 ? (
    <div className="text-center text-gray-500">Data not available</div>
  ) : props.orderCustomerList.map((item) => {
            const currentDate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
             
            return (
                <div>
                <div
className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 border-l-2 border-green-500 bg-[#eef2f9]
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                     <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                        <div className=" flex   md:w-[12rem] max-sm:flex-row max-sm:justify-between items-center justify-start bg-[#eef2f9] h-8 ">
                            <div class=" text-xs ml-gap font-poppins">
                                {item.orderType}
                            </div>
                            {date === currentDate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                 {translatedMenuItems[9]} 
                                </span>
                              ) : null}
                        </div>
                      
                        </div>
                        <div className=" flex   md:w-[21.1rem] items-center justify-start ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs ml-gap  items-center font-poppins">
                             {item.newOrderNo}
                            </div>                   
                        </div>
                        <div className=" flex   md:w-[15.2rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                            {date}
                            </div>
                        </div>
                        <div className=" flex  md:w-[15.3rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                
                                <MultiAvatar2
                    primaryTitle={item.contactPersonName}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                            </div>

                        </div>
                        <div className=" flex   md:w-[10.4rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs   font-poppins">
                                {item.paymentAmount}
                            </div>
                        </div>
                        <div class="items-center  justify-center w-[7rem] ml-gap bg-[#eef2f9] h-8 flex">
                        <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={translatedMenuItems[5]}>
                                             
                                                                <EventRepeatIcon
                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatuShowDrawer(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                            </div> 
                                          
                                            </div>
                                            <div class="items-center  justify-end w-3.5rem] ml-gap bg-[#eef2f9] h-8 flex">
                                            <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>
            </div>
            </div>
            );
          })}
        </InfiniteScroll>
      </div>
    
    </>
    <ProcureStatusShowDrawer
selectedLanguage={props.selectedLanguage}
translateText={props.translateText} 
           particularRowData={particularRowData}
           showStatusDrwr={props.showStatusDrwr}
           handleStatuShowDrawer={props.handleStatuShowDrawer}
           />
  </div>
  );
}

const mapStateToProps = ({ distributor,procre,auth }) => ({
  orderCustomerList: distributor.orderCustomerList,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  showStatusDrwr:distributor.showStatusDrwr,
  fetchingOrderCustomer:distributor.fetchingOrderCustomer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(

    {

      getCustomerOrder,
      handleStatuShowDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTableC);
