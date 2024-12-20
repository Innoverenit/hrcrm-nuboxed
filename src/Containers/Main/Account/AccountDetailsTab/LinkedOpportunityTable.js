import React, { useEffect, useState,lazy ,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip} from "antd";
import dayjs from "dayjs";
import ShopIcon from '@mui/icons-material/Shop';
import {
  getQuotationRepairOrder,
  getQuotationProcureOrder,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  quotationToOrder
} from "../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import relativeTime from 'dayjs/plugin/relativeTime';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import OpportunitytProcureDetailsModal from "./OpportunitytProcureDetailsModal";
import OpportuniyConvertDrawer from "./OpportuniyConvertDrawer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { base_url2 } from "../../../../Config/Auth";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from "axios";
const AccountProcureDetailsModal = lazy(() => import('../AccountDetailsTab/AccountProcureDetailsModal'));


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
function LinkedOpportunityTable(props) {

  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair",);
    props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",);
    setPage(page + 1);
  }, []);

  const [openConvertModal,setopenConvertModal]=useState(false);
  const [particularRowItem, setParticularRowItem] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
           "661", //   "Repair",0
          "213",  //   "Quotation",1
           "772", //   "Delivery",2
          "658",  //   "Location",3
           "218", //  "Value",4
          "73",  //   "Contact",5
         "1171",   //  "Payment",6
           "142", //   "Status",7
          "1172", //   "To Order",8
           "1212", //   "Commerce",9
           "679", //   "Created Date"10
        "100",  //  New11
        "1300",  //  Change status to Customer?12
          "387", //  Convert13
         "1341",   // "Change status to Order?
         "14", //Category
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
 
    
  const [hasMore, setHasMore] = useState(true);

  function handleRowItem(item) {
    setParticularRowItem(item);


}
const handleLoadMore = () => {
  setPage(page + 1);
  
  props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair")
};

const handleLoadMoreMedium = () => {
  setPage(page + 1);
  
  props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",)
};

const handleConfirm = (quotationId) => {
  props.quotationToOrder(quotationId,props.userId);
};

const viewAnDownloadPdf= async (item) => {  
  const type="quotation";
  try {
    const response = await axios.get(`${base_url2}/quotation/customer/pdf/${type}/${item.quotationId}`, {
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

  return (
    <>
     { props.user.repairInd === true &&(
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-full p-1 bg-transparent  sticky   z-10">
        <div className='flex   justify-between w-[81%] items-end !text-lm font-bold font-poppins'>
        <div class="text-[#00A2E8] text-sm w-[4.55rem] max-md:w-[4.55rem] truncate">
        <OnDeviceTrainingIcon className="!text-icon text-[#157a6e] cursor-pointer"/>{translatedMenuItems[0]}</div>
<div className="w-[7.9rem] truncate max-md:w-[6.4rem]" > 
<LightbulbIcon className="!text-icon text-[#bfa89e]" /> {translatedMenuItems[1]} ID</div>
           <div className="w-[6.3rem] truncate max-md:w-[5.1rem]">
                      <DateRangeIcon className='!text-icon'/>  {translatedMenuItems[10]}  </div>
                        <div className=" w-[10.3rem] max-md:w-[9.6rem] truncate"> 
                        <LocalShippingIcon className='!text-icon  text-[#7a9e9f]'/> {translatedMenuItems[2]}</div>
                        <div className="w-[17.9rem] max-md:w-[16.8rem] truncate ">
                        <LocationOnIcon className='!text-icon  text-[#42bfdd] '/>  {translatedMenuItems[3]}</div>
                        <div className="w-[7.3rem] max-md:w-[6.8rem] truncate">
                          <CurrencyExchangeIcon className='!text-icon  text-[#ff66b3]' /> {translatedMenuItems[4]}</div>
                        <div className="w-[7.7rem] max-md:w-[6.1rem] truncate"> 
                          <ContactPageIcon className='!text-icon'/>  {translatedMenuItems[5]}</div>           
                        <div className="w-[8.1rem] max-md:w-[9.1rem] truncate">
                           <DynamicFeedIcon className='!text-icon  text-[#fe5f55]'/>  {translatedMenuItems[8]}</div>                   
                   </div>                   
                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationRepairOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationRepairOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"34vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationRepairOrder.length ?
                            <>
                                {props.quotationRepairOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center justify-center md:w-[3.56rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:">
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
                      
                                              <div class="max-sm:w-full flex  md:w-[8.02rem] items-center justify-start ml-gap bg-[#eef2f9] h-8">
                                                <Tooltip>
                                                  <div class="max-sm:w-full   flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline cursor-pointer font-bold text-[#1890ff] ml-gap justify-start "
                                                                                          onClick={() => {
                                                                                            handleRowItem(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold ml-1">
                                           {translatedMenuItems[11]} {/* New */}
                                          
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[10.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                                            </div>
                                            
                                          </div>
                      
                                          <div class="flex flex-row  md:w-[10rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between text-xs">
                                        
                                            
                                        <div class="max-sm:w-full justify-between flex md: text-xs">
                                        {date}
                                              </div>
                  
                                     
                                      </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8  text-xs md:w-[17.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs ml-gap justify-start">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.amount}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row  md:w-[7.04rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                   
                                      
                  <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
               
                          
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                             onClick={()=> { handleRowItem(item);
                              setopenConvertModal(true)}}
                              >
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                              <NextPlanIcon  className="mr-1 !text-icon"/>
                              {translatedMenuItems[13]} {/* Convert */}
                          
                              </div>
                            </Button>
                          
                        {/* </Popconfirm> */}
                      </div>

                     
                  </div>
                  <div class="w-[14.40rem] items-center  ml-gap bg-[#eef2f9] h-8 justify-end flex">
                  <div className="w-[14.40rem] items-center ml-gap bg-[#eef2f9] h-8 justify-end flex">
                  <div className="w-[14.40rem] items-center ml-gap bg-[#eef2f9] h-8 justify-end flex">
                  
    <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
</div>

</div>                
          </div>            
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.quotationRepairOrder.length && !props.fetchingQuotationRepairOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
     )}
     { props.user.moduleMapper.ecomModInd === true &&(
      <div class="rounded m-1 mt-1 max-sm:m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-full p-1 bg-transparent  sticky   z-10">
        <div className='flex   justify-between w-[81%] items-end !text-lm font-bold font-poppins'>
<div class="text-[#00A2E8] text-sm w-[4.25rem] max-md:w-[6.25rem] truncate"> 
<ShopIcon className="text-[#00A2E8] !text-icon" />
  {translatedMenuItems[9]}
</div>
<div className="w-[7.9rem] max-md:w-[6.4rem]" truncate> 
<LightbulbIcon className="!text-icon text-[#bfa89e]" /> {translatedMenuItems[1]} ID</div>
           <div className="w-[6.3rem] max-md:w-[5.1rem]">
                      <DateRangeIcon className='!text-icon  '  />  {translatedMenuItems[10]}  </div>
                        <div className=" w-[10.3rem] max-md:w-[9.6rem] truncate"> 
                        <LocalShippingIcon className='!text-icon  text-[#7a9e9f]'/> {translatedMenuItems[2]}</div>
                        <div className="w-[17.9rem] max-md:w-[16.8rem] truncate ">
                        <LocationOnIcon className='!text-icon  text-[#42bfdd] '/>  {translatedMenuItems[3]}</div>
                        <div className="w-[7.3rem] max-md:w-[6.8rem] truncate">
                          <CurrencyExchangeIcon className='!text-icon  text-[#ff66b3]' /> {translatedMenuItems[4]}</div>
                        <div className="w-[7.7rem] max-md:w-[6.1rem] truncate"> 
                          <ContactPageIcon className='!text-icon  '  />  {translatedMenuItems[5]}</div>           
                        <div className="w-[8.1rem] max-md:w-[9.1rem] truncate">
                           <DynamicFeedIcon className='!text-icon  text-[#fe5f55]'/>  {translatedMenuItems[8]}</div>                   
                   </div>                   
                    </div>
                     
                    <InfiniteScroll
                        dataLength={props.quotationProcureOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationProcureOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"34vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationProcureOrder.length ?
                            <>
                                {props.quotationProcureOrder.map((item) => {
                                 const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    const date1 =  dayjs(item.deliveryDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                      <div className="flex rounded  mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center justify-center md:w-[3.56rem] border-l-2 border-green-500 bg-[#eef2f9] h-8 max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:">
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
                      
                                                                          <div class="max-sm:w-full flex  md:w-[8.02rem] items-center justify-start ml-gap bg-[#eef2f9] h-8">
                                                <Tooltip>
                                                  <div class="max-sm:w-full   flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline cursor-pointer font-bold text-[#1890ff] ml-gap justify-start "
                                                                                          onClick={() => {
                                                                                            handleRowItem(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold ml-1">
                                           {translatedMenuItems[11]} {/* New */}
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[10.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                                            </div> 
                                          </div>
                      
                                          <div class="flex flex-row md:w-[10rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between text-xs">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md: text-xs">
                                            {date1}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex   text-xs md:w-[17.01rem] items-center justify-start ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs justify-start ">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row  md:w-[7.03rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.amount}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[7.04rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                    
                                        <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
             
                  <Button type="primary"  style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }} 
                  onClick={()=>{  handleRowItem(item); setopenConvertModal(true)}}
                  >
                  <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                  <NextPlanIcon  className=" mr-1 !text-icon"/>
                  {translatedMenuItems[13]}  {/* Convert */}
                       
                              </div>
                     </Button>
                  {/* </Popconfirm> */}
                
                      </div>

                      
                  </div>
                  <div class="w-[14.40rem] items-center  ml-gap bg-[#eef2f9] h-8 justify-end flex">
                  <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
                          
          </div>
                         </div>
                          </div>  )
                                })}
                            </> : !props.quotationProcureOrder.length && !props.fetchingQuotationProcureOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
)} 
  <Suspense fallback={<BundleLoader />}>
 <OpportunitytProcureDetailsModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                particularRowItem={particularRowItem}
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />

                <OpportuniyConvertDrawer
                particularRowItem={particularRowItem}
                openConvertModal={openConvertModal}
                setopenConvertModal={setopenConvertModal}
                />
                </Suspense>
    </>
  );
}

const mapStateToProps = ({ distributor,auth }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  quotationRepairOrder:distributor.quotationRepairOrder,
  fetchingQuotationRepairOrder:distributor.fetchingQuotationRepairOrder,
  quotationProcureOrder:distributor.quotationProcureOrder,
    fetchingQuotationProcureOrder:distributor.fetchingQuotationProcureOrder,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuotationRepairOrder,
      getQuotationProcureOrder,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      quotationToOrder
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedOpportunityTable);
