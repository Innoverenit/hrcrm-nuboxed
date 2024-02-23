import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialReceiveData,
    handleMaterialReceived,
    handlegrnlistmodal
} from "../../../InventoryAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import ReceivedDetailModal from "./ReceivedDetailModal";
import { ListAltOutlined } from "@mui/icons-material";
import GrnListOfPOModal from "./GrnListOfPOModal";
import InfiniteScroll from "react-infinite-scroll-component";

const MaterialReceivedTable = (props) => {
    useEffect(() => {
        props.getMaterialReceiveData(props.locationDetailsId)
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
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.po" defaultMessage="PO #" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.created" defaultMessage="Created" /></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.materialReceiveData.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                        <div class="flex">

                                            <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins cursor-pointer underline text-blue-600">
                                                    <div
                                                        onClick={() => {
                                                            handleRow(item);
                                                            props.handleMaterialReceived(true);
                                                        }}
                                                    >{item.newPoNumber}</div>
                                                    {date === currentdate ? (
                                                        <div class="text-xs font-bold text-[tomato]">
                                                            New
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins">
                                                <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                />
                                            </div>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                <ListAltOutlined
                                                    onClick={() => {
                                                        handleRow(item);
                                                        props.handlegrnlistmodal(true)
                                                    }}
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
            <ReceivedDetailModal
                row={row}
                handleMaterialReceived={props.handleMaterialReceived}
                addMaterialReceived={props.addMaterialReceived}
            />
            <GrnListOfPOModal
                handlegrnlistmodal={props.handlegrnlistmodal}
                showGrnListOfPo={props.showGrnListOfPo}
                row={row}
            />
        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    materialReceiveData: inventory.materialReceiveData,
    addMaterialReceived: inventory.addMaterialReceived,
    showGrnListOfPo: inventory.showGrnListOfPo,
    fetchingMaterialReceiveData: inventory.fetchingMaterialReceiveData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceiveData,
            handleMaterialReceived,
            handlegrnlistmodal
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialReceivedTable)
);
