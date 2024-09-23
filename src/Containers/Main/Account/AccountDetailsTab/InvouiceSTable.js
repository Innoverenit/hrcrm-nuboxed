import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInvoiveL,
   // handleInvoiceModal
} from "../AccountAction";
import {  Select } from 'antd';
import dayjs from "dayjs";

import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

import { BundleLoader } from "../../../../Components/Placeholder";
const { Option } = Select;

function InvouiceSTable(props) {
    const [pageNo, setPageNo] = useState(0);
    
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    '110', // 0
    '14', // 1
    '218', // 2
    '71', // 3
    '260', // 4
    '142', // 5
   '259',//6
    "1492",// Value
  "1379", // Ship on
   "1486" // track ID


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
       // setPageNo(pageNo + 1);
        props.getInvoiveL(props.particularRowData.procureOrderInvoiceId)
    }, []);
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
  
    if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-1 bg-transparent font-bold text-xs font-poppins sticky z-10">
                    <div class=" w-[8.5rem]">{translatedMenuItems[0]} </div>
                        <div className=" md:w-[7.4rem]">{translatedMenuItems[1]} </div>
                        <div className=" md:w-[7rem] ">{translatedMenuItems[6]}</div>
                        <div className=" md:w-[7.1rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[5rem]">{translatedMenuItems[7]}</div>
                        <div className=" md:w-[7rem] ">{translatedMenuItems[4]}</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[8]}</div>
                        <div className="md:w-[3.8rem]">{translatedMenuItems[9]} ID</div>
                    </div>
                    <div class="">
                        {/* <InfiniteScroll
                            dataLength={props.invoiceL.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInvoiceL ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                            style={{scrollbarWidth:"thin"}}
                        > */}
                            {props.invoiceL.length ? <>
                                {props.invoiceL.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                           {item.name}
                                                           

                                                        </div>
                                                        {/* {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                    </div>
                                                    <div className=" flex  w-[14.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {item.category}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                         {item.price}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.totalPrice}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.unit}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                         </>
                                     )
                                })}
                            </>
                                : !props.invoiceL.length
                                    && !props.fetchingInvoiceL ? <NodataFoundPage /> : null}  
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
            {/* <InvoiceModal
                    particularRowData={particularRowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                />   */}
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingInvoiceL:distributor.fetchingInvoiceL,
    invoiceL:distributor.invoiceL,
    invoiceO:distributor.invoiceO
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInvoiveL,
           // handleInvoiceModal
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InvouiceSTable);