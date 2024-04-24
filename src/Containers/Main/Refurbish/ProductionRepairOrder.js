import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairOrderByUser, handleRepairPhone, repairInspectionButton, getOrderIdForCatalogueItem } from "./RefurbishAction"
import { Button, Badge } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";

const OrderPhoneRepairModal = lazy(() => import('./OrderPhoneRepairModal'));

function ProductionRepairOrder(props) {
    // useEffect(() => {
    //     if (props.inspectionRequiredInd) {
    //         props.getOrderIdForCatalogueItem(props.userId)
    //     } else {
    //         props.getRepairOrderByUser( props.userId)
    //     }
    // }, [])

    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getRepairOrderByUser(props.userId)
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
                <div class="rounded-lg max-sm:m-1 m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden w-[82.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[33.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.order#"
                            defaultMessage="Order #"
                        /></div>
                        <div className=" w-[35.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        />
                        </div>
                        <div className=" md:w-[9.8rem] ">
                            <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            />
                        </div>
                        <div className="w-[5.6rem]"></div>
                        <div className="w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
                    </div>
                    <div class="">
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
                                        <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 max-sm:h-[5rem] max-sm:flex-col "   >
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  w-[27.9rem] max-xl:w-[17.8rem] max-lg:w-[14rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
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

                                                <div className=" flex font-medium   w-[22rem] max-xl:w-[15rem] max-lg:w-[9rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                {/* <div className=" flex font-medium  md:w-[37.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins">
                                                    {item.repairCompletePhoneCount}/{item.totalPhone}
                                                </div>
                                            </div> */}
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium justify-center w-[31rem] max-xl:w-[19rem] max-sm:w-auto  max-sm:flex-row  max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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

                                                                        props.userId)
                                                                }}
                                                            >Start Repair</Button> :
                                                            item.repairInspectionInd === 1 ?
                                                                <Button style={{ width: "8rem" }}
                                                                    onClick={handlePauseResume}>
                                                                    {hide ? "Pause Repair" : "Resume Repair"}</Button> : <div class="text-green-600">Completed</div>}

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  w-[.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.reason}
                                                    </div>
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



