import React, { useEffect, useState, lazy ,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import dayjs from "dayjs";
import {
  // getOrderProcurement,
  getDistributorOrderOfHigh,
  getDistributorOrderOfMedium,
  getDistributorOrderOfLow,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  handleStatuShowDrawer
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { BundleLoader } from "../../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const UpdateProcureModal = lazy(() => import('./UpdateProcureModal'));
const AccountProcureDetailsModal = lazy(() => import('../AccountProcureDetailsModal'));
const ProcureStatusShowDrawer = lazy(() => import('./ProcureStatusShowDrawer'));

function CustomerProcurementTable(props) {
  const [page, setPage] = useState(0);
  const [openInvoiceModal,setopenInvoiceModal] = useState(false);

  useEffect(() => {
    props.getProcureRecords(props.distributorId,"procure");
    props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High");
    // props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium");
    props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
    // props.getOrderProcurement(props.distributorId, page,"procure");
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
                "Urgent",
                "Order",
                "Delivery",
                "Location",
               "Budget",
                "Contact",
               "Payment",
                "Status",
                "High",
                "Normal",
                'Created', //10
                'Invoices',//11
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
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High")
};

// const handleLoadMoreMedium = () => {
//   setPage(page + 1);
//   props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium")
// };
const handleLoadMoreLow = () => {
  setPage(page + 1);
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
};
  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   props.getOrderProcurement(props.currentUser ? props.currentUser : props.distributorId, page,"procure"
  //   );
  // }
  //  if (props.fetchingOrderProcurement) {
  //   return <BundleLoader />;
  // }

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">
        {translatedMenuItems[0]} {/* Urgent */}
           </div>
                        <div className=" md:w-[7.4rem] ml-2">
                        {translatedMenuItems[1]}ID{/* <FormattedMessage id="app.orderid" defaultMessage="Order ID"/> */}
                          </div>
                          <div className=" md:w-[6rem]">  
                          {translatedMenuItems[10]}
                          </div>
                        <div className=" md:w-[7.1rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage id="app.delivery" defaultMessage="Delivery"/> */}
                          </div>
                        <div className=" md:w-[8.8rem] ">
                        {translatedMenuItems[3]} {/* <FormattedMessage id="app.location" defaultMessage="Location"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[4]} {/* <FormattedMessage id="app.budget" defaultMessage="Budget"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[5]} {/* <FormattedMessage id="app.contact" defaultMessage="Contact"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[6]}{/* <FormattedMessage id="app.payment" defaultMessage="Payment"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[7]} {/* <FormattedMessage id="app.Status" defaultMessage="Status"/> */}
                          </div>
                          <div className="md:w-[3.8rem]">
                   
                          </div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.highDistributorOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfHigh ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.highDistributorOrder.length ?
                            <>
                                {props.highDistributorOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex  w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex  items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
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
                                                                                          class="underline font-bold cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              props.handleProcureDetailsModal(true);
                                                                                              handleSetParticularOrderData(item);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-[0.65rem] text-[tomato] font-bold">
                                            New
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                            <div className=" flex md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                          </div>
                                        
                                          <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:text-xs">
                                            {` ${dayjs(item.deliveryDate).format("ll")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex   md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                  <Button type="primary">{translatedMenuItems[11]}</Button>
                  </div>
                                        <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}>
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
                                    </div>


                                    )
                                })}
                            </> : !props.highDistributorOrder.length && !props.fetchingDistributorOfHigh ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
     
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">
        {translatedMenuItems[9]} {/* Normal */}
           </div>
                        <div className=" md:w-[7.4rem] ml-2">
                        {translatedMenuItems[1]}ID{/* <FormattedMessage id="app.orderid" defaultMessage="Order ID"/> */}
                          </div>
                          <div className=" md:w-[6rem]">
                          {translatedMenuItems[10]}
                          </div>
                        <div className=" md:w-[7.1rem]">
                        {translatedMenuItems[2]} {/* <FormattedMessage id="app.delivery" defaultMessage="Delivery"/> */}
                          </div>
                        <div className=" md:w-[8.8rem] ">
                        {translatedMenuItems[3]} {/* <FormattedMessage id="app.location" defaultMessage="Location"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[4]} {/* <FormattedMessage id="app.budget" defaultMessage="Budget"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[5]} {/* <FormattedMessage id="app.contact" defaultMessage="Contact"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[6]}{/* <FormattedMessage id="app.payment" defaultMessage="Payment"/> */}
                          </div>
                        <div className="md:w-[3.8rem]">
                        {translatedMenuItems[7]} {/* <FormattedMessage id="app.Status" defaultMessage="Status"/> */}
                          </div>
                          <div className="md:w-[3.8rem]">
                       
                          </div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.lowDistributorOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfLow ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.lowDistributorOrder.length ?
                            <>
                                {props.lowDistributorOrder.map((item) => {
                                  const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
               <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex">
                    <div className=" flex w-wk items-center   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                      <div className=" flex  items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">

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
                    <span className="text-[0.65rem] text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} </span>
                             
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                      <div className=" flex md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                  
                      
                      <div class="max-sm:w-full justify-between flex md:text-xs">
                      {` ${dayjs(item.deliveryDate).format("ll")}`}
                            </div>

                   
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                  <Button type="primary">{translatedMenuItems[11]}</Button>
                  </div>
                  <div class="flex w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                        {/* <Tooltip title={<FormattedMessage
                                                                id="app.edit"
                                                                defaultMessage="Edit"
                                                            />}>
                                                                <BorderColorIcon 
                                                                    className=" !text-icon cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditProcure(item)
                                                                        props.handleUpdateProcureDetailModal(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                                </Tooltip> */}
                                                       <div style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))" }} class="rounded-full bg-white md:w-5 h-5 cursor-pointer">
                                            <Tooltip title={<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}>
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
                                                     

                                                    </div>
                </div>
              </div>


                                    )
                                })}
                            </> : !props.lowDistributorOrder.length && !props.fetchingDistributorOfLow ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      
      <UpdateProcureModal
      selectedLanguage={props.selectedLanguage}
      translateText={props.translateText} 
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateProcureDetailModal={props.handleUpdateProcureDetailModal}
                    updateProcureDetailModal={props.updateProcureDetailModal}
                />

                <AccountProcureDetailsModal
                particularRowData={particularRowData}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />

<ProcureStatusShowDrawer
selectedLanguage={props.selectedLanguage}
translateText={props.translateText} 
           particularRowData={particularRowData}
           showStatusDrwr={props.showStatusDrwr}
           handleStatuShowDrawer={props.handleStatuShowDrawer}
           />
         
    </>
  );



}

const mapStateToProps = ({ distributor }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  highDistributorOrder:distributor.highDistributorOrder,
    fetchingDistributorOfHigh:distributor.fetchingDistributorOfHigh,
    mediumDistributorOrder:distributor.mediumDistributorOrder,
    fetchingDistributorOfMedium:distributor.fetchingDistributorOfMedium,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,
    showStatusDrwr:distributor.showStatusDrwr,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderOfHigh,
      getDistributorOrderOfMedium,
      getDistributorOrderOfLow,
      // getOrderProcurement,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      handleStatuShowDrawer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
