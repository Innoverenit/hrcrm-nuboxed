import { Button, Steps, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import {
    startQCStatus,
    startRepairInStatus,
    handlePaymentHistory,
    handleRepairReason,
    handlePaidModal,
    getOrderStatus
} from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import StartRepairReasonModal from './StartRepairReasonModal';
import ShowPaymentHistoryModal from './ShowPaymentHistoryModal';
import { FormattedMessage } from 'react-intl';
import PaidButtonModal from './PaidButtonModal';
import { BundleLoader } from '../../../../../Components/Placeholder';

const StatusOfOrder = (props) => {

    useEffect(() => {
        props.getOrderStatus(props.particularRowData.orderId)
    }, [props.particularRowData.orderId])
    const { orderStatus } = props
    if (props.fetchingOrderStatus) {
        return <BundleLoader />
    } else {
        return (
            <>
                <div class="bg-white">
                    <Steps
                        direction="vertical"
                        current={1}
                        items={[
                            {
                                title: <FormattedMessage
                                    id="app.ordercreated"
                                    defaultMessage="Order Created"
                                />,
                                status: <FormattedMessage
                                    id="app.progress"
                                    defaultMessage="progress"
                                />,
                                description: <>
                                    <b>On {moment(orderStatus.creationDate).format("DD-MM-YYYY")}
                                        by {orderStatus.userName}</b>
                                </>
                            },
                            {
                                title: 'Collections',
                                status: <>
                                    {orderStatus.qcStartInd === 0 ? 'wait'
                                        : orderStatus.qcStartInd === 1 &&
                                            orderStatus.qcStartInd === 2 ? 'progress' : null
                                    }</>,
                                description:
                                    <>

                                        <div className=' flex justify-around w-[45rem]'>
                                            <Button
                                                type='primary'
                                                onClick={() => {
                                                    props.handlePaidModal(true);
                                                }}
                                            >
                                                Receive Payment
                                            </Button>
                                            {
                                                orderStatus.qcStartInd === 0 ?
                                                    <>
                                                        <Popconfirm
                                                            title="Do you wish to approve ? "
                                                            onConfirm={() => props.startQCStatus({
                                                                orderPhoneId: orderStatus.orderId || "",
                                                                qcStartInd: 1,
                                                                qcStartUserId: props.userId
                                                            },
                                                                props.distributorId
                                                            )}
                                                            onCancel={null}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button
                                                                loading={props.startingQcInStatus}
                                                                type='primary'
                                                            >
                                                                Approve QC
                                                            </Button>
                                                        </Popconfirm>
                                                    </>
                                                    : <b> QC approved on {moment(orderStatus.qcStartDate).format("DD-MM-YYYY")}
                                                        &nbsp;  by {orderStatus.qcStartUser}</b>} |
                                            <b>Advance as per Order - {orderStatus.advancePayment} % </b>
                                            <b>Received - {orderStatus.receivePayment || 0} % </b>
                                        </div>

                                    </>
                            },
                            {
                                title: 'Order Pick Up',
                                status: 'progress',
                                description: <>
                                    {orderStatus.transferInd !== 0 &&
                                        <b>By {orderStatus.orderPickUpUser} On {moment(orderStatus.pickUpDate).format("DD-MM-YYYY")} </b>
                                    }
                                </>
                            },

                            {
                                title: 'Warehouse',
                                status: 'progress',
                                description: <>
                                    {/* {orderStatus.transferInd === 2 && */}
                                    {orderStatus.transferInd === 1 && <b>
                                        Picked Up on {moment(orderStatus.pickUpDate).format("DD-MM-YYYY")}
                                        by {orderStatus.inventoryUserName} Arrived at {orderStatus.locationName}   &nbsp;
                                    </b>}
                                    {orderStatus.inventoryReceiveInd && <b>
                                        On {moment(orderStatus.inventoryReceiveDate).format("DD-MM-YYYY")},
                                        Received by {orderStatus.inventoryReceiveUser} |  &nbsp;
                                    </b>}
                                    {orderStatus.inspectionInd === 1
                                        || orderStatus.inspectionInd === 2 && <b>
                                            Inspection started by {orderStatus.startInspectionUserName} on
                                            &nbsp;{moment(orderStatus.startInspectionDate).format("DD-MM-YYYY")} | &nbsp;
                                        </b>}
                                    {orderStatus.inspectionInd === 2 && <b>
                                        Inspection completed by {orderStatus.stopInspectionUserName} on
                                        &nbsp;{moment(orderStatus.stoptInspectionDate).format("DD-MM-YYYY")}
                                    </b>}
                                    {/* } */}
                                </>
                            },
                            {
                                title: 'QC',
                                status: 'progress',
                                // status: <>
                                //     {
                                //         orderStatus.qcStartInd === 3 && 'finish'
                                //     }</>,
                                //qc completed msg on date and user who assign technician                   
                                description:
                                    <>
                                        {/* <Button
                                            type='primary'
                                            // onClick={() => props.startQCStatus({
                                            //     orderPhoneId: orderStatus.orderId || "",
                                            //     qcStartInd: 1,
                                            //     qcStartUserId: props.userId
                                            // },
                                            //     props.distributorId
                                            // )}
                                        >
                                            Start QC     </Button> */}
                                        <b>{(orderStatus.qcStartInd === 2 || orderStatus.qcStartInd === 3) &&
                                            (
                                                <>
                                                    Assigned by {orderStatus.orderAssignUser} on {moment(orderStatus.orderAssignDate).format("DD-MM-YYYY")}
                                                </>
                                            )}
                                            &nbsp;{orderStatus.qcStartInd === 3 && (
                                                <>
                                                    | Started on {moment(orderStatus.orderQcStartTime).format("DD-MM-YYYY")} | Completed on {moment(orderStatus.orderQcEndTime).format("DD-MM-YYYY")}
                                                </>
                                            )}
                                        </b>
                                    </>
                            },

                            {
                                title: 'Order Commercial Confirmation',
                                // start repair button after click show repair started
                                status: <>
                                    {orderStatus.qcRepairInd === 0 ? 'wait'
                                        : orderStatus.qcRepairInd === 1 ||
                                            orderStatus.qcRepairInd === 2 ? 'progress' : null
                                    }</>,
                                description:
                                    <>
                                        {orderStatus.priceConfirmInd && <b>
                                            Confirmed on {moment(orderStatus.orderConfirmedDate).format("DD-MM-YYYY")} by {orderStatus.orderConfirmedUser || " "}
                                            <Button
                                                type='primary'
                                                onClick={() => {
                                                    props.handlePaymentHistory(true)
                                                }}
                                            >Show Payment</Button>
                                        </b>
                                        }
                                        {/* orderStatus.qcRepairInd === 1 && orderStatus.qcRepairInd === 2 ?
                                            <b>Qc Repair Started</b> : orderStatus.qcRepairInd === 3 ? <b>Qc Repair Completed</b> : null */}
                                    </>
                            },
                            {
                                title: 'Repair',
                                // after complete show repair completed on date and user
                                status: <>
                                    {
                                        orderStatus.qcRepairInd === 3 && 'progress'
                                    }</>,
                                description:
                                    <>
                                        {
                                            orderStatus.priceConfirmInd && orderStatus.qcRepairInd === 0 ?
                                                (
                                                    <>
                                                        <Popconfirm
                                                            title="Do you wish to start ? "
                                                            onConfirm={() => props.startRepairInStatus({
                                                                qcRepairInd: 1,
                                                                orderPhoneId: orderStatus.orderId || "",
                                                                qcRepairUserId: props.userId,
                                                                repairReason: "",
                                                                repairReasonInd: true
                                                            }, props.distributorId)}
                                                            onCancel={null}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button
                                                                loading={props.startRepairingInStatus}
                                                                type='primary'

                                                            >
                                                                Start Repair</Button>
                                                        </Popconfirm>
                                                    </>
                                                )
                                                : !orderStatus.repairReasonInd && orderStatus.qcRepairInd === 0 && orderStatus.qcStartInd === 3 ?
                                                    (<Button
                                                        type='primary'
                                                        onClick={() => {
                                                            props.handleRepairReason(true)
                                                        }}
                                                    // onClick={() => props.startRepairInStatus({
                                                    //     qcRepairInd: 1,
                                                    //     repairReason: "",
                                                    //     repairReasonInd: true,
                                                    //     orderPhoneId: orderStatus.orderId || "",
                                                    //     qcRepairUserId: props.userId
                                                    // }, props.distributorId)}
                                                    >
                                                        Start Repair Without Approve
                                                    </Button>
                                                    ) :
                                                    <b>{(orderStatus.qcRepairInd === 2 || orderStatus.qcRepairInd === 3) &&
                                                        (<>
                                                            Assigned by {orderStatus.orderRepairAssignUser} on {moment(orderStatus.orderRepairAssignDate).format("DD-MM-YYYY")}
                                                        </>)}
                                                        &nbsp;   {orderStatus.qcRepairInd === 3 &&
                                                            (<> | Started on {moment(orderStatus.orderRepairStartTime).format("DD-MM-YYYY")} | Completed on {moment(orderStatus.orderRepairEndTime).format("DD-MM-YYYY")}
                                                            </>)}
                                                    </b>
                                        }

                                    </>
                            },

                            {
                                title: 'Packing',
                                // after packed button on enabled level
                                status: 'progress',
                                description: <>
                                    {orderStatus.dispatchInspectionInd === 3 &&
                                        <b>Packed By {orderStatus.packedBy} On {moment(orderStatus.packedDate).format("DD-MM-YYYY")}</b>
                                    }
                                </>
                            },
                            {
                                title: 'Schedule PickUp',
                                // after customer pickup order (after delivery address)
                                status: <>
                                    {orderStatus.pickupInd === false ? 'wait' : 'finish'}</>,
                                description: <>
                                    {orderStatus.pickupInd && <b>Scheduled for {orderStatus.unloadingAddresses && orderStatus.unloadingAddresses[0].city || ""} On {moment(orderStatus.unloadingDate).format("DD-MM-YYYY")} by {orderStatus.unloadingUser}</b>}
                                </>
                            },
                            {
                                title: 'Order Dispatch',
                                status: 'progress',
                                description: <>
                                    {orderStatus.completeOrderInd &&
                                        <b>Dispatched By {orderStatus.dispatchCompleteUserName}
                                            On {moment(orderStatus.dispatchReceivedDate).format("DD-MM-YYYY")}</b>
                                    }
                                </>

                            },
                            {
                                title: 'Customer Feedback',
                                status: 'progress',

                            },
                        ]}
                    />
                </div>
                < StartRepairReasonModal
                    particularRowData={props.orderStatus}
                    handleRepairReason={props.handleRepairReason}
                    showRepairReasonModal={props.showRepairReasonModal} />

                <ShowPaymentHistoryModal
                    particularRowData={props.orderStatus}
                    handlePaymentHistory={props.handlePaymentHistory}
                    showPaymentHistoryModal={props.showPaymentHistoryModal}
                />
                <PaidButtonModal
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={props.orderStatus}
                />
            </>
        )
    }

};
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    addPaidButtonModal: distributor.addPaidButtonModal,
    orderStatus: distributor.orderStatus,
    fetchingOrderStatus: distributor.fetchingOrderStatus,
    showRepairReasonModal: distributor.showRepairReasonModal,
    showPaymentHistoryModal: distributor.showPaymentHistoryModal,
    startingQcInStatus: distributor.startingQcInStatus,
    startRepairingInStatus: distributor.startRepairingInStatus,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            startQCStatus,
            startRepairInStatus,
            getOrderStatus,
            handlePaymentHistory,
            handleRepairReason,
            handlePaidModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StatusOfOrder);
