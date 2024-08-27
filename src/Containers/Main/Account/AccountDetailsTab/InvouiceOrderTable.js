import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    // getOrderInvoiveList,
    handleInvoiceModal
} from "../AccountAction";
import {  Select } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvoiceOrderModal from "./InvoiceOrderModal";
import InvoiceModal from "./InvoiceModal";
import { BundleLoader } from "../../../../Components/Placeholder";
const { Option } = Select;

function InvouiceOrderTable(props) {
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
    // useEffect(() => {
    //    // setPageNo(pageNo + 1);
    //     props.getOrderInvoiveList(props.particularRowData.orderId)
    // }, []);
    
    const [particularRowData, setParticularRowData] = useState({})
    const handleRowData = (item) => {
        setParticularRowData(item)
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
    
    // const handleLoadMore = () => {
    //     const callPageMapd = props.orderInvoice && props.orderInvoice.length &&props.orderInvoice[0].pageCount
    //     setTimeout(() => {
    //       const {
    //         getOrderInvoiveList,
    //        // userDetails: { employeeId },
    //       } = props;
    //       if  (props.orderInvoice)
    //       {
    //         if (pageNo < callPageMapd) {
    //             setPageNo(pageNo + 1);
    //             getOrderInvoiveList(props.orgId,pageNo); 
    //       }
    //       if (pageNo === callPageMapd){
    //         setHasMore(false)
    //       }
    //     }
    //     }, 100);
    //   };
    if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                    <div class=" w-[8.5rem]">{translatedMenuItems[0]} ID</div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} ID</div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[3]}</div>
                        <div className=" md:w-[8.8rem] ">{translatedMenuItems[4]}</div>
                      
                    </div>
                    <div class="">
                        {/* <InfiniteScroll
                            dataLength={props.orderInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOrderInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {/* {props.orderInvoice.length ? <>
                                {props.orderInvoice.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return ( */}
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {/* {item.distributorId} */}
                                                           

                                                        </div>
                                                        {/* {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                       // handleRowData(item);
                                                                        props.handleInvoiceModal(true);
                                                                    }}
                                                                > INV123
                                                                {/* {item.orderId} */}
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {/* {item.categoryName} */}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {/* {item.brand} */}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {/* {item.model} */}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                         </>
                                    {/* )
                                })}
                            </>
                                : !props.orderInvoice.length
                                    && !props.fetchingOrderInvoice ? <NodataFoundPage /> : null}  */}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
            <InvoiceModal
                    particularRowData={particularRowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
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
    fetchingOrderInvoice:distributor.fetchingOrderInvoice,
    orderInvoice:distributor.orderInvoice,
    invoiceO:distributor.invoiceO
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           // getOrderInvoiveList,
            handleInvoiceModal
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InvouiceOrderTable);