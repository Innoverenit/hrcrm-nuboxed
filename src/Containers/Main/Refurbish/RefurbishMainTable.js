
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Tooltip, Button, Badge } from "antd";
import {
    getProductionOrderId,
    handleProductionNotesModal,
    handleAssignOrderById,
    handleAssignRepairModal,
    handleTechnicianModal,
    handlePhoneByTechnician,
    handleOrderPhone,
    updateFinalPrice,
    handleProductBuilder,
    handleAllSpareList
} from "./RefurbishAction";
import { withRouter } from "react-router";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { HistoryOutlined } from "@ant-design/icons";
import { BundleLoader } from "../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category'
import InfiniteScroll from "react-infinite-scroll-component";
const TechnicianModal = lazy(() => import("./TechnicianModal"));
const AssignOrderModal = lazy(() => import("./AssignOrderModal"));
const AddAssignRepairModal = lazy(() => import("./AddAssignRepairModal"));
const AllSpareListByOrder = lazy(() => import("./AllSpareListByOrder"));
const ShowProductBuilderModal = lazy(() => import("./ShowProductBuilderModal"));

const ProductionOrderList = (props) => {
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getProductionOrderId(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProductionOrderId(props.userId)
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.productionOrder)
    }, [props.productionOrder])



    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg  max-sm:m-1 m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden  justify-between w-[68%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.orderid"
                            defaultMessage="orderid"
                        /></div>
                        <div className=" w-[14.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.customer"
                            defaultMessage="customer"
                        /></div>
                        <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                            id="app.contact"
                            defaultMessage="contact"
                        /></div>
                        <div className="w-[5.62rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.assigned"
                            defaultMessage="assign By"
                        /> </div>
                        <div className="w-[3.61rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.owner"
                            defaultMessage="owner"
                        /> </div>
                        {/* <div className="md:w-[5.8rem]"><FormattedMessage
                        id="app.balance"
                        defaultMessage="balance"
                      /></div> */}
                        <div className="w-[8.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.expectedprice"
                            defaultMessage="expectedprice"
                        /></div>
                        <div className="w-[7.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.deliverydate"
                            defaultMessage="deliverydate"
                        /></div>
                        <div className="w-[7.2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.productionOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionOrederId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                    >
                        {data.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.createAt).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-4 bg-white h-12 items-center justify-between p-3  max-sm:h-[8rem] max-sm:flex-col" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[10.6rem] max-sm:w-auto ">
                                                <Badge size="small" count={`${item.totalReceiveCanRepairQuantity} / ${item.phoneCount}`} overflowCount={5000}>
                                                    <span
                                                        class="underline text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            props.handleProductBuilder(true)
                                                        }}>
                                                        {item.newOrderNo}
                                                    </span>
                                                </Badge>
                                                &nbsp;&nbsp;
                                                {date === currentdate ? (
                                                    <span
                                                        class="text-[tomato] font-bold">
                                                        New
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className=" flex font-medium   w-[10.7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.distributorName}
                                                </div>

                                            </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[5.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    <MultiAvatar
                                                        primaryTitle={item.contactPersonName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[4.64rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.supervisorUserName && <MultiAvatar
                                                        primaryTitle={item.supervisorUserName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[4.6rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.userName && <MultiAvatar
                                                        primaryTitle={item.userName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                       </div>
                                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex font-medium  w-[4.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {item.expectedPrice}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  w-[5.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {dayjs(item.deliveryDate).format("DD-MM-YYYY")}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  w-[5.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {item.suggestedPrice}
                                            </div>
                                        </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex font-medium  w-[5.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs cursor-pointer text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        handleRowData(item);
                                                        props.handleAllSpareList(true)
                                                    }}
                                                ><CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} /> Spares</Button>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  w-[8.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {item.qcStartInd === 1 ?
                                                    // <Badge size="small" count={`${item.totalReceiveQuantity - item.cannotRepairCount} / ${item.totalReceiveQuantity}`} overflowCount={5000}>
                                                    <Tooltip title="Assign For QC">
                                                        <Button
                                                            className="bg-[#1685e6] text-white"
                                                            onClick={() => {
                                                                props.handleAssignOrderById(true);
                                                                handleRowData(item);
                                                            }}
                                                        >Assign For QC </Button>
                                                    </Tooltip>
                                                    // </Badge>
                                                    : item.qcStartInd === 2 ? <b>QC Assigned</b>
                                                        : item.qcStartInd === 3 ? <b style={{ color: "deepgreen" }}>QC on {dayjs(item.qcEndTime).format("DD-MM-YYYY")}</b> : null}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  w-[6.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {item.qcRepairInd === 1 ?
                                                    <Tooltip title="Assign For Repair">
                                                        <Button
                                                            className="bg-[#1685e6] text-white"
                                                            onClick={() => {
                                                                props.handleAssignRepairModal(true);
                                                                handleRowData(item);
                                                            }}
                                                        >Assign For Repair</Button>
                                                    </Tooltip>
                                                    : item.qcRepairInd === 2 ? <b>Repair Assigned</b>
                                                        : item.qcRepairInd === 3 ? <b style={{ color: "deepgreen" }}>Repair on {dayjs(item.repairEndTime).format("DD-MM-YYYY")}</b> : null}
                                            </div>
                                        </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex font-medium  w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-base text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <Tooltip title="Notes">
                                                    <NoteAltIcon
                                                        className="text-base cursor-pointer"
                                                        // style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            props.handleProductionNotesModal(true);
                                                        }}
                                                    />

                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                            <div class=" text-base text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                <Tooltip title="History">
                                                    <HistoryOutlined
                                                        className="text-base cursor-pointer"
                                                        onClick={() => {
                                                            props.handleTechnicianModal(true)
                                                            handleRowData(item);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </div>
                <Suspense fallback={<BundleLoader />}>
                    <AssignOrderModal
                        handleAssignOrderById={props.handleAssignOrderById}
                        assignOrderById={props.assignOrderById}
                        rowData={rowData}
                    />
                    <AllSpareListByOrder
                        handleAllSpareList={props.handleAllSpareList}
                        approveSpareModal={props.approveSpareModal}
                        rowData={rowData} />
                    <AddAssignRepairModal
                        handleAssignRepairModal={props.handleAssignRepairModal}
                        showAssignRepairModal={props.showAssignRepairModal}
                        rowData={rowData}
                    />
                    <ShowProductBuilderModal
                        rowData={rowData}
                        productBuilderList={props.productBuilderList}
                        handleProductBuilder={props.handleProductBuilder} />
                    <TechnicianModal
                        handleTechnicianModal={props.handleTechnicianModal}
                        showTechnicianModal={props.showTechnicianModal}
                        rowData={rowData}
                    />
                </Suspense>
            </div>
        </>
    )

}


const mapStateToProps = ({ refurbish, auth }) => ({
    showTechnicianModal: refurbish.showTechnicianModal,
    productionOrder: refurbish.productionOrder,
    addOrderPhone: refurbish.addOrderPhone,
    fetchingProductionOrederId: refurbish.fetchingProductionOrederId,
    productioNoteModal: refurbish.productioNoteModal,
    assignOrderById: refurbish.assignOrderById,
    phoneByTechnician: refurbish.phoneByTechnician,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    userId: auth.userDetails.userId,
    approveSpareModal: refurbish.approveSpareModal,
    productBuilderList: refurbish.productBuilderList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderId,
            handleProductionNotesModal,
            handleAssignOrderById,
            handleAssignRepairModal,
            handleTechnicianModal,
            handleProductBuilder,
            handlePhoneByTechnician,
            handleOrderPhone,
            updateFinalPrice,
            handleAllSpareList
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductionOrderList)
);
