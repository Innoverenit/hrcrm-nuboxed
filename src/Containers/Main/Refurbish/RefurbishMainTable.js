
import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Tooltip, Button, Badge } from "antd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
    handleAllSpareList,
    handleRefurbishLead,
    refurbishRejectPhone
} from "./RefurbishAction";
import { withRouter } from "react-router";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { HistoryOutlined } from "@ant-design/icons";
import { BundleLoader } from "../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category'
import InfiniteScroll from "react-infinite-scroll-component";
import { BorderColorOutlined, PersonAddAlt1 } from "@mui/icons-material";
import AddLeadInRefurbish from "./AddLeadInRefurbish";
import RefurbishRejectModal from "./RefurbishRejectModal";
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
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg  max-sm:m-1 m-2 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden  justify-between w-[82%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[13.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
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
                        <div className="w-[3.621rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.lead"
                            defaultMessage="Lead"
                        /> </div>
                        <div className="w-[6.62rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.assigned"
                            defaultMessage="Assigned"
                        /> </div>
                        <div className="w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.owner"
                            defaultMessage="owner"
                        /> </div>

                        <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.quoted"
                            defaultMessage="Quoted"
                        /></div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                            id="app.final"
                            defaultMessage="Final"
                        /></div>
                        <div className="w-[21.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Delivery</div>
                        <div className="w-[7.2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.productionOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionOrederId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                        style={{ overflowX: "hidden" }}
                    >
                        {data.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.createAt).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center justify-between p-3  max-sm:h-[8rem] max-sm:flex-col" >
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[9.7rem] max-sm:w-auto ">
                                                <Badge size="small" count={`${item.receiveRemainingQuantity} / ${item.phoneCount}`} overflowCount={5000}>
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
                                            {/* <div className=" flex font-medium w-[6.5rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                                {item.priority === "High" && (
                      <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                    )}
                    </div> */}
                                            <div className=" flex font-medium   w-[10.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.distributorName}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[3.6rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    <MultiAvatar2
                                                        primaryTitle={item.contactPersonName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.53rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.teamLeadUserName && <MultiAvatar
                                                        primaryTitle={item.teamLeadUserName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.84rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.supervisorUserName && <MultiAvatar
                                                        primaryTitle={item.supervisorUserName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                            <div className=" flex font-medium  w-[3.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.expectedPrice}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[4.26rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  w-[5.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {dayjs(item.deliveryDate).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                            {/* <div className=" flex font-medium  w-[4.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.suggestedPrice}
                                                </div>
                                            </div> */}
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                                            <div className=" flex font-medium  w-[9.22rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcStartInd === 0 ? <b>Waiting for QC approval</b>
                                                        : item.qcStartInd === 1 ?
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
                                                            : item.qcStartInd === 2 ? <b style={{ color: "#ff6347" }}>QC Assigned</b>
                                                                : item.qcStartInd === 3 ? <b style={{ color: "#32CD32" }}>
                                                                    QC <CheckCircleIcon className="!text-[#03c04a]" />
                                                                    {dayjs(item.qcEndTime).format("DD-MM-YYYY")}</b> : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[9.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                                        : item.qcRepairInd === 2 ? <b style={{ color: "#ff6347" }}>Repair Assigned</b>
                                                            : item.qcRepairInd === 3 ? <b style={{ color: "#32CD32" }}>Repair
                                                                <CheckCircleIcon className="!text-[#03c04a]" /> {dayjs(item.repairEndTime).format("DD-MM-YYYY")}</b> : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[6.22rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.rejectOrderCount > 0 &&
                                                        <Tooltip title="Reject">
                                                            <Badge size="small" count={`${item.rejectOrderCount} `} overflowCount={3000}>
                                                                <Button
                                                                    className="bg-[#1685e6] text-white"
                                                                    onClick={() => {
                                                                        props.refurbishRejectPhone(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >Reject</Button>
                                                            </Badge>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[1.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-base text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title="Notes">
                                                        <NoteAltIcon
                                                            className="!text-xl cursor-pointer"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[1.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-base text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title="Update">
                                                        <BorderColorOutlined
                                                            className="!text-xl cursor-pointer"
                                                            onClick={() => {
                                                                props.handleTechnicianModal(true)
                                                                handleRowData(item);
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    <Tooltip title="Add Lead">
                                                        <PersonAddAlt1
                                                            className="!text-xl cursor-pointer"
                                                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                            onClick={() => {
                                                                props.handleRefurbishLead(true)
                                                                handleRowData(item)
                                                            }} />
                                                    </Tooltip>
                                                </h4>
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
                    <AddLeadInRefurbish
                        rowData={rowData}
                        showRefurbishLead={props.showRefurbishLead}
                        handleRefurbishLead={props.handleRefurbishLead}
                    />
                    <RefurbishRejectModal
                        rowData={rowData}
                        refurbhsReject={props.refurbhsReject}
                        refurbishRejectPhone={props.refurbishRejectPhone}
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
    productBuilderList: refurbish.productBuilderList,
    showRefurbishLead: refurbish.showRefurbishLead,
    refurbhsReject: refurbish.refurbhsReject
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
            handleAllSpareList,
            handleRefurbishLead,
            refurbishRejectPhone
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductionOrderList)
);
