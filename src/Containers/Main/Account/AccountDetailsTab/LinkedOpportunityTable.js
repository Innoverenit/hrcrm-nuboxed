import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,Popconfirm } from "antd";
import dayjs from "dayjs";
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
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { FormattedMessage } from "react-intl";
import AccountProcureDetailsModal from "../AccountDetailsTab/AccountProcureDetailsModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

function LinkedOpportunityTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    // props.getProcureRecords(props.distributorData.distributorId,"Quotation");
    props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair",);
    props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",);
  

    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
              "Repair",
              "Quotation",
              "Delivery",
              "Location",
             "Budget",
              "Contact",
             "Payment",
              "Status",
              "To Order",
              
              "Procure"


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
  // useEffect(() => {
  //   return () => props.emptyOrders();
  // }, []);
  const [hasMore, setHasMore] = useState(true);
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);


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
  // Call the function to change the status to "Lost" here
  props.quotationToOrder(quotationId,props.userId);
};
console.log(props.user.moduleMapper.ecomModInd)
  return (
    <>
     { props.user.repairInd === true &&(
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
                        <div class=" w-[8.5rem]"> {translatedMenuItems[0]}</div>
                        <div className=" md:w-[7.4rem]"> {translatedMenuItems[1]}ID</div>
                        <div className=" md:w-[6rem]">
                          Created Date  
                          </div>
                        <div className=" md:w-[7.1rem]"> {translatedMenuItems[2]}</div>
                        <div className=" md:w-[8.8rem] "> {translatedMenuItems[3]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[4]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[5]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[6]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[7]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[8]}</div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationRepairOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationRepairOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationRepairOrder.length ?
                            <>
                                {props.quotationRepairOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  flex-col w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
                                                                                          {item.priority === "High" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                                          )}
                                                                                          {item.priority === "Medium" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                                          {item.priority === "Low" && (
                                                                                              <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                                      </div>
                                                                                  </div>
                                                                              </Tooltip>
                                                                          </div>
                      
                                              <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                                                <Tooltip>
                                                  <div class="max-sm:w-full  justify-between flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline cursor-pointer font-bold text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              handleSetParticularOrderData(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-xs text-[tomato] font-bold">
                                            New
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className=" flex md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                            </div>
                                            
                                          </div>
                      
                                          <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                                            {` ${dayjs(item.deliveryDate).format("ll")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex  flex-col  md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.paymentInTerms}
                                            </div>
                                        </div>
                                        
                  <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
                  <Popconfirm
                          title="Change status to Customer?"
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                             
                              >
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                              Convert<NextPlanIcon  className="!text-icon"/>
                              </div>
                            </Button>
                          
                        </Popconfirm>
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
      <div class="rounded m-1 mt-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
<div class=" w-[8.5rem]"> {translatedMenuItems[9]}</div>
<div className=" md:w-[7.4rem]"> {translatedMenuItems[1]}ID</div>
<div className=" md:w-[6rem]">
                        Created Date  
                        </div>
                        <div className=" md:w-[7.1rem]"> {translatedMenuItems[2]}</div>
                        <div className=" md:w-[8.8rem] "> {translatedMenuItems[3]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[4]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[5]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[6]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[7]}</div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[8]}</div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationProcureOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationProcureOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.quotationProcureOrder.length ?
                            <>
                                {props.quotationProcureOrder.map((item) => {
                                 const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                      <div className="flex rounded  mt-3 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex flex-col w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
                                                                                          {item.priority === "High" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                                          )}
                                                                                          {item.priority === "Medium" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                                          {item.priority === "Low" && (
                                                                                              <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                                      </div>
                                                                                  </div>
                                                                              </Tooltip>
                                                                          </div>
                      
                                              <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                                                <Tooltip>
                                                  <div class="font-bold max-sm:w-full  justify-between flex md:flex flex-row text-xs">
                                                  <span
                                                                                          class="underline font-bold cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              handleSetParticularOrderData(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-xs text-[tomato] font-bold">
                                            New
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                              <div className=" flex md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                            </div> 
                                          </div>
                      
                                          <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                                            {` ${dayjs(item.deliveryDate).format("ll")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex  flex-col  md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-xs">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.paymentInTerms}
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-xs">
                  <Popconfirm
                          title="Change status to Order?"
                          onConfirm={() => handleConfirm(item.quotationId,props.userId)}
                          okText="Yes"
                          cancelText="No"
                        >
                  <Button type="primary"  style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}>
                  <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                              Convert<NextPlanIcon  className="!text-icon"/>
                              </div>
                     </Button>
                  </Popconfirm>
                      </div>
                  </div>
                         </div>
                          </div>  )
                                })}
                            </> : !props.quotationProcureOrder.length && !props.fetchingQuotationProcureOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
)}  <AccountProcureDetailsModal
selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                particularRowData={particularRowData}
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />
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
