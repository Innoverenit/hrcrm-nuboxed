import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getDocumentAlllist
   
} from "../../InvestorAction";
import {  Select } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvestorDocumentToggle from "./InvestorDocumentToggle";
const { Option } = Select;

function InvestorDocumentTable(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
       // setPageNo(pageNo + 1);
        // props.getCurrency()
        // props.getPurchaseSuppliersList(props.supplier.supplierId);
        props.getDocumentAlllist(props.RowData.investorId)
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
    
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[82.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" w-[10.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Document Name
                            </div>
                            <div className=" w-[5.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                           Updated By
                            </div>
                            <div className=" w-[6.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                           Updation Date
                            </div>
                    </div>
                    <div class="">
                        {/* <InfiniteScroll
                            dataLength={props.documentAllList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingDocumentList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                        > */}
                            {props.documentAllList.length ? <>
                                {props.documentAllList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between  items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                           {item.documentTypeName}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-[0.65rem] font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                   
                                                    <div className=" flex  justify-between  w-[8.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                         
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                   
                                                    <div className=" flex  justify-between  w-[7.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs  font-poppins flex items-center">
                                                         
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    
                                                   
                                                   
                                                    <div className=" flex f w-[4.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-normal text-xs  font-poppins">
                                                        <InvestorDocumentToggle
                                                        documentTypeId={item.documentTypeId}
                                                        RowData={props.RowData}
                                                        availableInd={item.availableInd}
                                                        />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.documentAllList.length
                                    && !props.fetchingDocumentList ? <NodataFoundPage /> : null}
                        {/* </InfiniteScroll> */}
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ investor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingDocumentList:investor.fetchingDocumentList,
    documentAllList:investor.documentAllList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDocumentAlllist
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDocumentTable);