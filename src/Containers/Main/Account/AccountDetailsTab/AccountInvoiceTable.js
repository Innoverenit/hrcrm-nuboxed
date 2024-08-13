import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getAccountInvoiveList,
    handlenvoiceOrderModal,
    getGeneratedInvoiveList
} from "../AccountAction";
import {  Select } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvoiceOrderModal from "./InvoiceOrderModal";
import { BundleLoader } from "../../../../Components/Placeholder";
const { Option } = Select;

function AccountInvoiceTable(props) {
    const [pageNo, setPageNo] = useState(0);
    
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Invoice ', // 0
    'Order', // 1
    'Value', // 2
    'Type', // 3
    ' Status', // 4
   


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
        //setPageNo(pageNo + 1);
        props.getAccountInvoiveList(props.distributorId)
        props.getGeneratedInvoiveList(props.distributorId)
    }, []);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const [hasMore, setHasMore] = useState(true);
    
    const handleLoadMore = () => {
        const callPageMapd = props.accountInvoice && props.accountInvoice.length &&props.accountInvoice[0].pageCount
        setTimeout(() => {
          const {
            getAccountInvoiveList,
           // userDetails: { employeeId },
          } = props;
          if  (props.accountInvoice)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getAccountInvoiveList(props.orgId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
      if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                    <div className=" md:w-[7rem] text-[white] flex justify-center bg-[red]">
                  Not Generated
                         </div>
                    <div class=" w-[8.5rem]">Payment ID</div>
                        <div className=" md:w-[7.4rem]"> Date</div>
                        <div className=" md:w-[7.4rem]">Value </div>
                        <div className=" md:w-[7.1rem]">Mode</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[1]} ID</div>
                        
                      
                    </div>
                    <div class="h-[33vh]">
                        {/* <InfiniteScroll
                            dataLength={props.accountInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingAccountInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"33vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.accountInvoice.length ? <>
                                {props.accountInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {item.distributorId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleRowData(item);
                                                                        props.handlenvoiceOrderModal(true);
                                                                    }}
                                                                > {item.newOrderNo}</span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.orderType}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.status}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.accountInvoice.length
                                    && !props.fetchingAccountInvoice ? <NodataFoundPage /> : null}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>

            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                    <div className=" md:w-[6.54rem] text-[white] flex justify-center bg-[Green]">
                   Generated
                         </div>
                    <div class=" w-[8.5rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} </div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[3]}</div>
                        <div className=" md:w-[8.8rem] ">{translatedMenuItems[4]}</div>
                      
                    </div>
                    <div class="h-[33vh]">
                        {/* <InfiniteScroll
                            dataLength={props.accountInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingAccountInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"33vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.generatedInvoice.length ? <>
                                {props.generatedInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {item.invoiceId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleRowData(item);
                                                                        props.handlenvoiceOrderModal(true);
                                                                    }}
                                                                > {item.orderId}</span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.orderPaymentType}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.paymentAmount}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.status}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.generatedInvoice.length
                                    && !props.fetchingGeneratedInvoice ? <NodataFoundPage /> : null}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
            <InvoiceOrderModal
                    rowData={rowData}
                    handlenvoiceOrderModal={props.handlenvoiceOrderModal}
                    invoiceOrders={props.invoiceOrders}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                />  
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingAccountInvoice:distributor.fetchingAccountInvoice,
    accountInvoice:distributor.accountInvoice,
    invoiceOrders:distributor.invoiceOrders,
    fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
    generatedInvoice: distributor.generatedInvoice
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAccountInvoiveList,
            getGeneratedInvoiveList,
            handlenvoiceOrderModal
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvoiceTable);