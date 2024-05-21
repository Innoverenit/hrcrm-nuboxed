import React, { useState, lazy, Suspense, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrderByUser, handleOrderPhoneModal, qcInspectionButton } from "./RefurbishAction"
import { Button, Badge } from "antd";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from 'react-infinite-scroll-component';
const OrderPhoneModal = lazy(() => import('./OrderPhoneModal'));

function ProductionOrderListById(props) {

    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getOrderByUser(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getOrderByUser(props.userId)
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
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg max-sm:m-1 m-2 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden  w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className='w-[17.2rem]'></div>
                        <div className=" w-[23.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Order #</div>
                        <div className=" w-[36.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        <div className=" w-[34.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.lead"
                            defaultMessage="Lead"
                        /></div>

                        <div className="w-[10.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="status"
                        /></div>
                        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.orderByUser.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOrderByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.orderByUser.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div >
                                        <div className="flex rounded-xl  mt-4 bg-white h-[2.75rem] items-center p-3 max-sm:h-[5rem] max-sm:flex-col "

                                        >
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium w-[8.1rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    {item.priority === "High" && (
                                                        <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[red]"></div>
                                                    )}
                                                    {item.priority === "Medium" && (
                                                        <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[orange]" ></div>
                                                    )}
                                                    {item.priority === "Low" && (
                                                        <div class="rounded-[50%] h-[2rem] w-[2rem] bg-[teal]" ></div>
                                                    )}
                                                </div>
                                                <div className=" flex font-medium w-[15.01rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.qcCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="underline text-sm text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"

                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleOrderPhoneModal(true)
                                                            }}>
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span
                                                            class="text-[tomato] font-bold ml-4 text-sm"
                                                        >
                                                            New
                                                        </span>
                                                    ) : null}
                                                </div>
                                                

                                                <div className=" flex font-medium   w-[14rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.dueDate === null ? "" : dayjs(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium   w-[5.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.lead}
                                                    </div>

                                                </div>

                                                <div className=" flex font-medium   w-[18.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcInProgressPhoneCount} In Progress
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  w-[10.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcInspectionInd === 0 ?
                                                            <Button
                                                                className="w-32"
                                                                type="primary"
                                                                loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingQcInspectionButton}
                                                                onClick={() => {
                                                                    handleRowData(item)
                                                                    props.qcInspectionButton({
                                                                        productionDispatchId: item.productionDispatchId,
                                                                        orderPhoneId: item.orderPhoneId,
                                                                        qcInspectionInd: 1
                                                                    }, item.orderPhoneId, props.userId)
                                                                }}
                                                            >
                                                                Start Inspection

                                                            </Button> : item.qcInspectionInd === 1 ?
                                                                <Button className="w-32" onClick={handlePauseResume}>{hide ? "Pause Inspection" : "Resume Inspection"}</Button> : <div class="text-green-600">Inspection Completed</div>}

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
                <Suspense fallback={<BundleLoader />}>
                    <OrderPhoneModal
                        showPhoneList={props.showPhoneList}
                        handleOrderPhoneModal={props.handleOrderPhoneModal}
                        rowData={rowData}
                    />
                </Suspense>

            </div>
        </>
    )
}

const mapStateToProps = ({ refurbish, auth }) => ({
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    orderByUser: refurbish.orderByUser,
    updatingQcInspectionButton: refurbish.updatingQcInspectionButton,
    showPhoneList: refurbish.showPhoneList,
    fetchingOrderByUser: refurbish.fetchingOrderByUser
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOrderByUser,
            handleOrderPhoneModal,
            qcInspectionButton
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionOrderListById);




