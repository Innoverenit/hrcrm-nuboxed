import { Button, Steps } from 'antd';
import React from 'react';
import {
    startQCStatus,
    startRepairInStatus,
    handlePaymentHistory,
    handleRepairReason,
    handlePaidModal
} from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import StartRepairReasonModal from './StartRepairReasonModal';
import ShowPaymentHistoryModal from './ShowPaymentHistoryModal';
import { FormattedMessage } from 'react-intl';
import PaidButtonModal from './PaidButtonModal';

const StatusOfOrder = (props) => (
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
                        <b>On {moment(props.particularRowData.creationDate).format("DD-MM-YYYY")}
                            by {props.particularRowData.userName}</b>
                    </>
                },
                {
                    title: 'Collections',
                    status: <>
                        {props.particularRowData.qcStartInd === 0 ? 'wait'
                            : props.particularRowData.qcStartInd === 1 &&
                                props.particularRowData.qcStartInd === 2 ? 'progress' : null
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
                                    props.particularRowData.qcStartInd === 0 ?
                                        <Button
                                            loading={props.startingQcInStatus}
                                            type='primary'
                                            onClick={() => props.startQCStatus({
                                                orderPhoneId: props.particularRowData.orderId || "",
                                                qcStartInd: 1,
                                                qcStartUserId: props.userId
                                            },
                                                props.distributorId
                                            )}
                                        >
                                            Approve QC
                                        </Button>
                                        : <b> QC approved on {moment(props.particularRowData.qcStartDate).format("DD-MM-YYYY")}
                                            &nbsp;  by {props.particularRowData.qcStartUser}</b>} |
                                <b>Advance as per Order - {props.particularRowData.advancePayment} % </b>
                                <b>Received - {props.particularRowData.receivePayment || 0} % </b>
                            </div>

                        </>
                },
                {
                    title: 'Order Pick Up',
                    status: 'progress',
                    description: <>
                        {props.particularRowData.transferInd !== 0 &&
                            <b>By {props.particularRowData.orderPickUpUser} On {moment(props.particularRowData.orderPickUpDate).format("DD-MM-YYYY")} </b>
                        }
                    </>
                },

                {
                    title: 'Warehouse',
                    status: 'progress',
                    description: <>
                        {/* {props.particularRowData.transferInd === 2 && */}
                        {props.particularRowData.transferInd === 1 && <b>
                            Picked Up on {moment(props.particularRowData.pickUpDate).format("DD-MM-YYYY")}
                            by {props.particularRowData.inventoryUserName} Arrived at {props.particularRowData.locationName}   &nbsp;
                        </b>}
                        {props.particularRowData.inventoryReceiveInd && <b>
                            On {moment(props.particularRowData.inventoryReceiveDate).format("DD-MM-YYYY")},
                            Received by {props.particularRowData.inventoryReceiveUser} |  &nbsp;
                        </b>}
                        {props.particularRowData.inspectionInd === 1
                            || props.particularRowData.inspectionInd === 2 && <b>
                                Inspection started by {props.particularRowData.startInspectionUserName} on
                                &nbsp;{moment(props.particularRowData.startInspectionDate).format("DD-MM-YYYY")} | &nbsp;
                            </b>}
                        {props.particularRowData.inspectionInd === 2 && <b>
                            Inspection completed by {props.particularRowData.stopInspectionUserName} on
                            &nbsp;{moment(props.particularRowData.stoptInspectionDate).format("DD-MM-YYYY")}
                        </b>}
                        {/* } */}
                    </>
                },
                {
                    title: 'QC',
                    status: 'progress',
                    // status: <>
                    //     {
                    //         props.particularRowData.qcStartInd === 3 && 'finish'
                    //     }</>,
                    //qc completed msg on date and user who assign technician                   
                    description:
                        <>
                            {/* <Button
                                        type='primary'
                                        // onClick={() => props.startQCStatus({
                                        //     orderPhoneId: props.particularRowData.orderId || "",
                                        //     qcStartInd: 1,
                                        //     qcStartUserId: props.userId
                                        // },
                                        //     props.distributorId
                                        // )}
                                    >
                                        Start QC     </Button> */}
                            <b>{(props.particularRowData.qcStartInd === 2 || props.particularRowData.qcStartInd === 3) &&
                                (
                                    <>
                                        Assigned by {props.particularRowData.orderAssignUser} on {moment(props.particularRowData.orderAssignDate).format("DD-MM-YYYY")}
                                    </>
                                )}
                                &nbsp;{props.particularRowData.qcStartInd === 3 && (
                                    <>
                                        | Started on {moment(props.particularRowData.orderQcStartTime).format("DD-MM-YYYY")} | Completed on {moment(props.particularRowData.orderQcEndTime).format("DD-MM-YYYY")}
                                    </>
                                )}
                            </b>
                        </>
                },

                {
                    title: 'Order Commercial Confirmation',
                    // start repair button after click show repair started
                    status: <>
                        {props.particularRowData.qcRepairInd === 0 ? 'wait'
                            : props.particularRowData.qcRepairInd === 1 ||
                                props.particularRowData.qcRepairInd === 2 ? 'progress' : null
                        }</>,
                    description:
                        <>
                            {props.particularRowData.priceConfirmInd && <b>
                                Confirmed on {moment(props.particularRowData.orderConfirmedDate).format("DD-MM-YYYY")} by {props.particularRowData.orderConfirmedUser || " "}
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        props.handlePaymentHistory(true)
                                    }}
                                >Show Payment</Button>
                            </b>
                            }
                            {/* props.particularRowData.qcRepairInd === 1 && props.particularRowData.qcRepairInd === 2 ?
                                        <b>Qc Repair Started</b> : props.particularRowData.qcRepairInd === 3 ? <b>Qc Repair Completed</b> : null */}
                        </>
                },
                {
                    title: 'Repair',
                    // after complete show repair completed on date and user
                    status: <>
                        {
                            props.particularRowData.qcRepairInd === 3 && 'progress'
                        }</>,
                    description:
                        <>
                            {
                                props.particularRowData.priceConfirmInd && props.particularRowData.qcRepairInd === 0 ?
                                    (<Button
                                        loading={props.startRepairingInStatus}
                                        type='primary'
                                        onClick={() => props.startRepairInStatus({
                                            qcRepairInd: 1,
                                            orderPhoneId: props.particularRowData.orderId || "",
                                            qcRepairUserId: props.userId,
                                            repairReason: "",
                                            repairReasonInd: true
                                        }, props.distributorId)}
                                    >
                                        Start Repair</Button>)
                                    : !props.particularRowData.repairReasonInd && props.particularRowData.qcRepairInd === 0 && props.particularRowData.qcStartInd === 3 ?
                                        (<Button
                                            type='primary'
                                            onClick={() => {
                                                props.handleRepairReason(true)
                                            }}
                                        // onClick={() => props.startRepairInStatus({
                                        //     qcRepairInd: 1,
                                        //     repairReason: "",
                                        //     repairReasonInd: true,
                                        //     orderPhoneId: props.particularRowData.orderId || "",
                                        //     qcRepairUserId: props.userId
                                        // }, props.distributorId)}
                                        >
                                            Start Repair Without Approve
                                        </Button>
                                        ) :
                                        <b>{(props.particularRowData.qcRepairInd === 2 || props.particularRowData.qcRepairInd === 3) &&
                                            (<>
                                                Assigned by {props.particularRowData.orderRepairAssignUser} on {moment(props.particularRowData.orderRepairAssignDate).format("DD-MM-YYYY")}
                                            </>)}
                                            &nbsp;   {props.particularRowData.qcRepairInd === 3 &&
                                                (<> | Started on {moment(props.particularRowData.orderRepairStartTime).format("DD-MM-YYYY")} | Completed on {moment(props.particularRowData.orderRepairEndTime).format("DD-MM-YYYY")}
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
                        {props.particularRowData.dispatchInspectionInd === 3 &&
                            <b>Packed By {props.particularRowData.packedBy} On {moment(props.particularRowData.packedDate).format("DD-MM-YYYY")}</b>
                        }
                    </>
                },
                {
                    title: 'Schedule PickUp',
                    // after customer pickup order (after delivery address)
                    status: <>
                        {props.particularRowData.pickupInd === false ? 'wait' : 'finish'}</>,
                    description: <>
                        {props.particularRowData.pickupInd && <b>Scheduled for {props.particularRowData.unloadingAddresses && props.particularRowData.unloadingAddresses[0].city || ""} On {moment(props.particularRowData.unloadingDate).format("DD-MM-YYYY")} by {props.particularRowData.unloadingUser}</b>}
                    </>
                },
                {
                    title: 'Order Dispatch',
                    status: 'progress',
                    description: <>
                        {props.particularRowData.completeOrderInd &&
                            <b>Dispatched By {props.particularRowData.dispatchCompleteUserName}
                                On {moment(props.particularRowData.dispatchReceivedDate).format("DD-MM-YYYY")}</b>
                        }
                    </>

                },
                {
                    title: 'Customer Feedback',
                    status: 'progress',

                },
            ]}
        />
        <StartRepairReasonModal
            particularRowData={props.particularRowData}
            handleRepairReason={props.handleRepairReason}
            showRepairReasonModal={props.showRepairReasonModal} />
        <ShowPaymentHistoryModal
            particularRowData={props.particularRowData}
            handlePaymentHistory={props.handlePaymentHistory}
            showPaymentHistoryModal={props.showPaymentHistoryModal}
        />
        <PaidButtonModal
            addPaidButtonModal={props.addPaidButtonModal}
            handlePaidModal={props.handlePaidModal}
            particularRowData={props.particularRowData}
        />
    </div>
);
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    addPaidButtonModal: distributor.addPaidButtonModal,
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
            handlePaymentHistory,
            handleRepairReason,
            handlePaidModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StatusOfOrder);
