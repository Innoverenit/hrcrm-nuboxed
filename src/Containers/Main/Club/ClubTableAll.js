import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
// import {
//     getInventoryAlllist
   
// } from "../../../../Trade/TradeAction";
import { Button, Select, Tooltip } from 'antd';
import dayjs from "dayjs";
// import PoLocationModal from "./PoLocationModal";
// import POSupplierDetailsModal from "./POSupplierDetailsModal";
import { BorderColorRounded, TerminalSharp } from "@mui/icons-material";
// import TermsnConditionModal from "./TermsnConditionModal";
// import { getCurrency } from "../../../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { MultiAvatar } from "../../../Components/UI/Elements";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

function ClubTableAll(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        // props.getCurrency()
        // props.getPurchaseSuppliersList(props.supplier.supplierId);
      //  props.getInventoryAlllist(props.orgId,pageNo)
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
        const callPageMapd = props.inventoryAllList && props.inventoryAllList.length &&props.inventoryAllList[0].pageCount
        setTimeout(() => {
          const {
            getInventoryAlllist,
           // userDetails: { employeeId },
          } = props;
          if  (props.inventoryAllList)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getInventoryAlllist(props.orgId,pageNo); 
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
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" w-[15.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Trade ID
                            </div>
                        <div className=" w-[10.81rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Category
                            </div>
                        <div className=" w-[11.12rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                            Brand
                        </div>
                        <div className=" w-[19.12rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                           Model
                        </div>
                        <div className=" w-[8.93rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                          Attribute
                        </div>
                        <div className=" w-[6.81rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                            Quality
                        </div>
                        <div className=" w-[8.13rem] max-xl:text-[0.65rem] max-xl:w-[16.13rem]">
                            Specs
                        </div>
                        <div className=" md:w-[8.2rem]">
                           Unit
                        </div>
                        <div className=" md:w-[9.21rem]">
                         Price
                        </div>
                        <div className=" md:w-[11.3rem]"> Location</div>
                        <div className=" md:w-[6.1rem]"> Owner</div>
                        
                    </div>
                    <div class="">
                        {/* <InfiniteScroll
                            dataLength={props.inventoryAllList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInventoryAlllist ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                        >
                            {props.inventoryAllList.length ? <>
                                {props.inventoryAllList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-between items-center w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium justify-between  w-[10.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins flex items-center">
                                                           {item.tradeId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-xs font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div className=" flex font-medium  w-[7.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                           {item.categoryName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[14.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.model}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[6.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.attributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[3.32rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins w-20">
                                                           {item.quality}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[5.41rem] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                            {item.spces}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[5.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[6.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-normal text-[0.85rem] text-cardBody font-poppins">
                                                        {item.currency} {item.price}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-normal text-[0.85rem] text-cardBody font-poppins">
                                                            {item.location}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[2.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-normal text-[0.85rem] text-cardBody font-poppins">
                                                        <MultiAvatar
                                primaryTitle={item.ownerName}
                                imageId={item.ownerImageId}
                                imgWidth={"1.9rem"}
                                imgHeight={"1.9rem"}
                              />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.inventoryAllList.length
                                    && !props.fetchingInventoryAlllist ? <NodataFoundPage /> : null}
                        </InfiniteScroll> */}
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ trade, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingInventoryAlllist:trade.fetchingInventoryAlllist,
    inventoryAllList:trade.inventoryAllList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           // getInventoryAlllist
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ClubTableAll);