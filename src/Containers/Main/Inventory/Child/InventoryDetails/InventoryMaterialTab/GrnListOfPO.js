import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { getMaterialReceivedDetailData, handleReceivedUnit } from "../../../InventoryAction"
import TransferToStock from "./TransferToStock";
import { InsertEmoticonOutlined, ListAltRounded } from "@mui/icons-material";
import ItemWiseReceivedModal from "./ItemWiseReceivedModal";
import InfiniteScroll from "react-infinite-scroll-component";

const GrnListOfPO = (props) => {
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    }, [])

    const [row, setRow] = useState({})
    const handleRow = (item) => {
        setRow(item)
    }

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.price" defaultMessage="Price" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.unit" defaultMessage="Unit" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.received" defaultMessage="Receive" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.damage" defaultMessage="Damage" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.final" defaultMessage="Final" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.remark" defaultMessage="Remark" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.grn" defaultMessage="GRN #" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.stock" defaultMessage="To Stock" /></div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.receivedDetailData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveDetailData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.receivedDetailData.map((item) => {

                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                    {item.suppliesFullName}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.price}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {`${item.unitReceived - item.unitDamaged}`}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                <ListAltRounded
                                                    onClick={() => {
                                                        handleRow(item)
                                                        props.handleReceivedUnit(true)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                <TransferToStock
                                                    allowGrnInd={item.allowGrnInd}
                                                    grnStockInd={item.grnStockInd}
                                                    poSupplierSuppliesId={item.poSupplierSuppliesId}
                                                    poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
            <ItemWiseReceivedModal
                row={row}
                handleReceivedUnit={props.handleReceivedUnit}
                addReceiveUnit={props.addReceiveUnit}
            />
        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    receivedDetailData: inventory.receivedDetailData,
    addReceiveUnit: inventory.addReceiveUnit,
    fetchingMaterialReceiveDetailData: inventory.fetchingMaterialReceiveDetailData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceivedDetailData,
            handleReceivedUnit
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GrnListOfPO)
);
