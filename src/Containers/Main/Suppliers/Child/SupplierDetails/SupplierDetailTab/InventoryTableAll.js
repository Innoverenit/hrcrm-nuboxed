import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {
    getInventoryAlllist
   
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

function InventoryTableAll(props) {
    const [pageNo, setPageNo] = useState(0);
    useEffect(() => {
        setPageNo(pageNo + 1);
        // props.getCurrency()
        // props.getPurchaseSuppliersList(props.supplier.supplierId);
        props.getInventoryAlllist(props.orgId,pageNo)
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
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" w-[10.12rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Trade ID
                            </div>
                        <div className=" w-[15.1rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Category
                            </div>
                        <div className=" w-[14.1rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                            Brand
                        </div>
                        <div className=" w-[14.12rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                           Model
                        </div>
                        <div className=" w-[14.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                            Quality
                        </div>
                        <div className=" w-[14.13rem] max-xl:text-[0.65rem] max-xl:w-[16.13rem]">
                            Specs
                        </div>
                        <div className=" md:w-[5.12rem]">
                           Unit
                        </div>
                        <div className=" md:w-[6.1rem]">
                         Price
                        </div>
                        <div className=" md:w-[9.93rem]"> Location</div>
                        <div className=" md:w-[5.1rem]"> Owner</div>
                        
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.inventoryAllList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInventoryAlllist ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.inventoryAllList.length ? <>
                                {props.inventoryAllList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium  w-[12.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins flex items-center">
                                                            <span
                                                                class=" text-sky-700 cursor-pointer"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoListModal(true)
                                                                }}>
                                                                {item.newPoNumber}
                                                            </span>
                                                            {date === currentdate ? (
                                                                <div class="text-xs font-bold text-[tomato]">
                                                                    New
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[9.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.userName}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[9.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.locationName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[12.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">

                                                            {item.poValue}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[7.32rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins w-20">
                                                            {showIcon && rowData.poSupplierDetailsId === item.poSupplierDetailsId ?
                                                                <Select
                                                                    value={currency}
                                                                    onChange={(value) =>
                                                                        handleChangeCurrency(value)
                                                                    }
                                                                // placeholder={`select`}
                                                                >
                                                                    {props.currencies.map((a) => {
                                                                        return <Option value={a.currency_name}>{a.currency_name}</Option>;
                                                                    })}
                                                                </Select> :
                                                                item.poCurrency}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[12.41rem] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                            <Tooltip title="Update Currency">
                                                                {showIcon && rowData.poSupplierDetailsId === item.poSupplierDetailsId ?
                                                                    <div>
                                                                        <Button onClick={() => {
                                                                            props.addCurrencyInPo({
                                                                                poCurrency: currency
                                                                            }, item.poSupplierDetailsId, handleCallback())
                                                                        }}>Save</Button>
                                                                        <Button onClick={handleCurrencyField}>Cancel</Button>
                                                                    </div> :
                                                                   <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                                   <BorderColorIcon
                                                                       className=" !text-base cursor-pointer text-[tomato]"
                                                                        onClick={() => {
                                                                            handleRowData(item);
                                                                            handleCurrencyField()
                                                                        }}
                                                                    />
                                                                    </div>
                                                                }
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[11.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem] text-cardBody font-poppins">
                                                            {item.locationName === null ? <Button
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.handlePoLocationModal(true)
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="app.movetoinventory"
                                                                    defaultMessage="Move To Inventory"
                                                                />
                                                            </Button> : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-normal text-[0.85rem] text-cardBody font-poppins">
                                                            <Tooltip title="Terms and condition">
                                                                <TerminalSharp
                                                                    onClick={() => {
                                                                        handleRowData(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
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
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    userId: auth.userDetails.userId,
    addlocationInPo: suppliers.addlocationInPo,
    orgId: auth.userDetails.organizationId,
    addPoListmModal: suppliers.addPoListmModal,
    addTermsnCondition: suppliers.addTermsnCondition,
    currencies: auth.currencies,
    fetchingInventoryAlllist:suppliers.fetchingInventoryAlllist,
    inventoryAllList:suppliers.inventoryAllList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInventoryAlllist
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTableAll);