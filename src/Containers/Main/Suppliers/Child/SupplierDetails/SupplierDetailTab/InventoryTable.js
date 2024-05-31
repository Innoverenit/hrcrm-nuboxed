import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {
    getInventorylist
   
} from "../../../SuppliersAction"
import { Button, Select, Tooltip } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from '../../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import PoLocationModal from "./PoLocationModal";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import POSupplierDetailsModal from "./POSupplierDetailsModal";
import { BorderColorRounded, TerminalSharp } from "@mui/icons-material";
import TermsnConditionModal from "./TermsnConditionModal";
import { getCurrency } from "../../../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const { Option } = Select;

function InventoryTable(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        // props.getCurrency()
        // props.getPurchaseSuppliersList(props.supplier.supplierId);
        props.getInventorylist(props.userId,pageNo)
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
        const callPageMapd = props.inventoryList && props.inventoryList.length &&props.inventoryList[0].pageCount
        setTimeout(() => {
          const {
            getInventorylist,
           // userDetails: { employeeId },
          } = props;
          if  (props.inventoryList)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getInventorylist(props.userId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[90.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[19.1rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Category
                            </div>
                        <div className=" w-[13.1rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                            Brand
                        </div>
                        <div className=" w-[19.12rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                           Model
                        </div>
                        <div className=" w-[13.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                            Quality
                        </div>
                        <div className=" w-[11.13rem] max-xl:text-[0.65rem] max-xl:w-[16.13rem]">
                            Specs
                        </div>
                        <div className=" md:w-[12.1rem]">
                           Unit
                        </div>
                        <div className=" md:w-[3.1rem]">
                         Price
                        </div>
                        
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.inventoryList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInventorylist ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.inventoryList.length ? <>
                                {props.inventoryList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2rem] items-center p-3" >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium  w-[12.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins flex items-center">
                                                            {item.categoryName}
                                                            {date === currentdate ? (
                                                                <div class="text-xs font-bold ml-4 text-[tomato]">
                                                                    New
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[9.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[14.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.model}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.quality}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[7.32rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins w-20">
                                                            {item.spces}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.41rem] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                           {item.price}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.inventoryList.length
                                    && !props.fetchingInventorylist ? <NodataFoundPage /> : null}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    inventoryList: suppliers.inventoryList,
    userId: auth.userDetails.userId,
    addlocationInPo: suppliers.addlocationInPo,
    addPoListmModal: suppliers.addPoListmModal,
    addTermsnCondition: suppliers.addTermsnCondition,
    currencies: auth.currencies,
    inventoryList:suppliers.inventoryList,
    fetchingInventorylist:suppliers.fetchingInventorylist,
    fetchingInventorylist: suppliers.fetchingInventorylist
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInventorylist
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);