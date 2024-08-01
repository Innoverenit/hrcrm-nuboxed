import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getAccountInvoiveList
} from "../AccountAction";
import {  Select } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const { Option } = Select;

function AccountInvoiceTable(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getAccountInvoiveList(props.distributorId,pageNo)
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
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div class=" w-[8.5rem]">Invoice ID</div>
                        <div className=" md:w-[7.4rem]">Order ID</div>
                        <div className=" md:w-[7.1rem]">Value</div>
                        <div className="md:w-[3.8rem]">Type</div>
                        <div className=" md:w-[8.8rem] ">Status</div>
                      
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.accountInvoice.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingAccountInvoice ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                            style={{scrollbarWidth:"thin"}}
                        >
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
                                                                <div class="text-xs font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                        {dayjs(item.creationDate).format("DD/MM/YYYY")}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                           {item.categoryName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.model}
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
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingAccountInvoice:distributor.fetchingAccountInvoice,
    accountInvoice:distributor.accountInvoice
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAccountInvoiveList
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvoiceTable);