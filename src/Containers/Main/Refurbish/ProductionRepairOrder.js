import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairOrderByUser, handleRepairPhone, repairInspectionButton, getOrderIdForCatalogueItem } from "./RefurbishAction"
import { Button, Badge } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";

const OrderPhoneRepairModal = lazy(() => import('./OrderPhoneRepairModal'));

function ProductionRepairOrder(props) {
    // useEffect(() => {
    //     if (props.inspectionRequiredInd) {
    //         props.getOrderIdForCatalogueItem(props.userId)
    //     } else {
    //         props.getRepairOrderByUser(props.locationId, props.userId)
    //     }
    // }, [])

    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.locationId, props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.locationId, props.userId)
    };

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    console.log(props.orderByUser)

    const [hide, sethide] = useState(true)
    const handlePauseResume = () => {
        sethide(!hide)
    }
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[82.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[33.12rem]"><FormattedMessage
                            id="app.order"
                            defaultMessage="order"
                        /></div>
                        <div className=" md:w-[35.5rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        {/* <div className=" md:w-[9.8rem] "> 
                        <FormattedMessage
                        id="app.units"
                        defaultMessage="Units"
                      />
                      </div> */}
                        <div className="md:w-[5.6rem]"></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="Status"
                        /></div>
                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                        <InfiniteScroll
                            dataLength={props.repairOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingRepairorderById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.repairOrder.map((item) => {
                                const currentdate = moment().format("DD/MM/YYYY");
                                const date = moment(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "   >
                                            <div class="flex">
                                                <div className=" flex font-medium  md:w-[20.8rem] max-sm:w-full  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline text-[#1890ff] cursor-pointer w-[7rem] flex"
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleRepairPhone(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span class="text-[tomato] font-bold">
                                                            New
                                                        </span>
                                                    ) : null}
                                                </div>

                                                <div className=" flex font-medium   md:w-[24rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                {/* <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins">
                                                    {item.repairCompletePhoneCount}/{item.totalPhone}
                                                </div>
                                            </div> */}
                                            </div>

                                            <div className=" flex font-medium justify-center  md: max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.repairInspectionInd === 0 ?
                                                        <Button
                                                            style={{ width: "8rem" }}
                                                            type="primary"
                                                            loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingRepairInspectionButton}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.repairInspectionButton({
                                                                    repairInspectionInd: 1,
                                                                    orderPhoneId: item.orderPhoneId,
                                                                    productionRepairDispatchId: item.productionRepairDispatchId
                                                                },
                                                                    item.orderPhoneId,
                                                                    props.locationId,
                                                                    props.userId)
                                                            }}
                                                        >Start Repair</Button> :
                                                        item.repairInspectionInd === 1 ?
                                                            <Button style={{ width: "8rem" }}
                                                                onClick={handlePauseResume}>
                                                                {hide ? "Pause Repair" : "Resume Repair"}</Button> : <div class="text-green-600">Completed</div>}

                                                </div>
                                            </div>

                                            <div className=" flex font-medium  md:w-[.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins">
                                                    {item.reason}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
                <OrderPhoneRepairModal
                    showRepairPhoneList={props.showRepairPhoneList}
                    handleRepairPhone={props.handleRepairPhone}
                    rowData={rowData}
                    inspectionRequiredInd={props.inspectionRequiredInd}
                />
            </div>
        </>
    )



}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    choosenOrderCatalogue: refurbish.choosenOrderCatalogue,
    repairOrder: refurbish.repairOrder,
    fetchingRepairorderById: refurbish.fetchingRepairorderById,
    showRepairPhoneList: refurbish.showRepairPhoneList,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    updatingRepairInspectionButton: refurbish.updatingRepairInspectionButton
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairOrderByUser,
            handleRepairPhone,
            repairInspectionButton,
            getOrderIdForCatalogueItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRepairOrder);



