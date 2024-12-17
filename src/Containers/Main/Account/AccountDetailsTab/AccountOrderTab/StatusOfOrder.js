import { Button, Steps, Popconfirm } from 'antd';
import React, { useEffect , useState, lazy, Suspense} from 'react';
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
import dayjs from 'dayjs';
import { BundleLoader } from '../../../../../Components/Placeholder';


const StartRepairReasonModal = lazy(() => import("./StartRepairReasonModal"));
const ShowPaymentHistoryModal=lazy(()=>import("./ShowPaymentHistoryModal"));
const PaidButtonModal = lazy(() => import("./PaidButtonModal"));

const StatusOfOrder = (props) => {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
                        "1421" , // "Order Created" 0
                       "1419" , // Do you wish to Approve1
                        "1395", // On  2
                        "1335", //  by 3
                          "920",  //  'Collections'4
                          "1420", //  Receive Payment 5
                          "80",  //  "Yes"6
                          "81",  //  "No"7
                          "1418",  //  Approve QC 8
                          "1417",  //  QC approved on 9
                          "1396", //  Advance as per Order10
                          "1085",  //  Received 11
                          "1397", //  Order Pick Up',12
                          "347", //  'Warehouse'13
                          "1398",  //  Picked Up on14
                          "1415",//  Arrived at15
                          "1416",//  Received by16
                          "1399",  //  Inspection started by17
                          "1400",  //  Inspection completed by18
                          "1113",  //  Assigned by19
                          "1401",  //  Started on20
                          "1404", //  Completed on21
                          "1407", //  'Order Commercial Confirmation'22
                          "1405", //  Confirmed on23
                          "1410", //  Show Payment 24
                          "661", //  'Repair'25
                          "1409", //  Do you wish to start ?26
                          "1315",//  Start Repair27
                          "1311", //  Start Repair Without Approve28
                            "1264", //  Packing 29
                            "1408", //  Packed By 30
                            "1412", //  Schedule PickUp 31
                            "1413", //  Order Dispatch 32
                            "1097",//  Dispatched By33
                            "1414", //  'Customer Feedback' 34
                        //    / Scheduled for 35
          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
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
                                title: translatedMenuItems[0]                              
                                ,
                                status:"progress" ,
                                description: <>
                                    <b>
                                        {/* On    */} {translatedMenuItems[2] } {dayjs(orderStatus.creationDate).format("DD-MM-YYYY")} {/* by */}{translatedMenuItems[3]} {orderStatus.userName}</b>
                                </>
                            },
                            {
                                title: translatedMenuItems[4]
                                // 'Collections'
                                ,
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
                                              {translatedMenuItems[5]}  {/* Receive Payment */}
                                            </Button>
                                            {
                                                orderStatus.qcStartInd === 0 ?
                                                    <>
                                                        <Popconfirm
                                                            title={translatedMenuItems[1]}
                                                            // "Do you wish to approve ? "
                                                            onConfirm={() => props.startQCStatus({
                                                                orderPhoneId: orderStatus.orderId || "",
                                                                qcStartInd: 1,
                                                                qcStartUserId: props.userId
                                                            },
                                                                props.distributorId
                                                            )}
                                                            onCancel={null}
                                                            okText={translatedMenuItems[6]}
                                                            // "Yes"
                                                            cancelText={translatedMenuItems[7]}
                                                            // "No"
                                                        >
                                                            <Button
                                                                loading={props.startingQcInStatus}
                                                                type='primary'
                                                            >
                                                               {translatedMenuItems[8]} {/* Approve QC */}
                                                            </Button>
                                                        </Popconfirm>
                                                    </>
                                                    : <b>{translatedMenuItems[9]}  {/* QC approved on  */} {dayjs(orderStatus.qcStartDate).format("DD-MM-YYYY")} &nbsp;  {translatedMenuItems[3]}{/* by  */}  {orderStatus.qcStartUser}</b>} |
                                                      <b> {translatedMenuItems[10]} -{/* Advance as per Order -  */}{orderStatus.advancePayment} % </b> |
                                            <b>{translatedMenuItems[11]} {/* Received - */}- {orderStatus.receivePayment || 0} % </b>
                                        </div>

                                    </>
                            },
                            {
                                title: translatedMenuItems[12],
                                // 'Order Pick Up',
                                status: 'progress',
                                description: <>
                                    {orderStatus.transferInd !== 0 &&
                                        <b>{translatedMenuItems[3]} {orderStatus.orderPickUpUser} {translatedMenuItems[2]} {dayjs(orderStatus.pickUpDate).format("DD-MM-YYYY")} </b>
                                    }
                                </>
                            },

                            {
                                title: translatedMenuItems[13],
                                // 'Warehouse',
                                status: 'progress',
                                description: <>
                                    {/* {orderStatus.transferInd === 2 && */}
                                    {orderStatus.transferInd === 1 && <b>
                                        {/* Picked Up on */}{translatedMenuItems[14]}
                                         {dayjs(orderStatus.pickUpDate).format("DD-MM-YYYY")}{translatedMenuItems[3]} {orderStatus.inventoryUserName} | {translatedMenuItems[15]}{orderStatus.locationName}   &nbsp;
                                    </b>}
                                    {orderStatus.inventoryReceiveInd && <b>
                                        {translatedMenuItems[2]} {dayjs(orderStatus.inventoryReceiveDate).format("DD-MM-YYYY")},
                                        {translatedMenuItems[16]} {orderStatus.inventoryReceiveUser} |  &nbsp;
                                    </b>}
                                    {orderStatus.inspectionInd === 1
                                        || orderStatus.inspectionInd === 2 && <b>
                                            {translatedMenuItems[17]} {orderStatus.startInspectionUserName} {translatedMenuItems[2]}
                                            &nbsp;{dayjs(orderStatus.startInspectionDate).format("DD-MM-YYYY")} | &nbsp;
                                        </b>}
                                    {orderStatus.inspectionInd === 2 && <b>
                                        {translatedMenuItems[18]} {orderStatus.stopInspectionUserName} {translatedMenuItems[2]}&nbsp;{dayjs(orderStatus.stoptInspectionDate).format("DD-MM-YYYY")}
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
                                                   {translatedMenuItems[19]} {orderStatus.orderAssignUser} on {dayjs(orderStatus.orderAssignDate).format("DD-MM-YYYY")}
                                                </>
                                            )}
                                            &nbsp;{orderStatus.qcStartInd === 3 && (
                                                <>
                                                    | {translatedMenuItems[20]} {dayjs(orderStatus.orderQcStartTime).format("DD-MM-YYYY")} | {translatedMenuItems[20]} {dayjs(orderStatus.orderQcEndTime).format("DD-MM-YYYY")}
                                                </>
                                            )}
                                        </b>
                                    </>
                            },

                            {
                                title: translatedMenuItems[22],
                                // start repair button after click show repair started
                                status: <>
                                    {orderStatus.qcRepairInd === 0 ? 'wait'
                                        : orderStatus.qcRepairInd === 1 ||
                                            orderStatus.qcRepairInd === 2 ? 'progress' : null
                                    }</>,
                                description:
                                    <>
                                        {orderStatus.priceConfirmInd && <b>
                                            {translatedMenuItems[23]} {dayjs(orderStatus.orderConfirmedDate).format("DD-MM-YYYY")} {translatedMenuItems[3]} {orderStatus.orderConfirmedUser || " "}
                                            <Button
                                                type='primary'
                                                onClick={() => {
                                                    props.handlePaymentHistory(true)
                                                }}
                                            >{translatedMenuItems[24]}</Button>
                                        </b>
                                        }
                                        {/* orderStatus.qcRepairInd === 1 && orderStatus.qcRepairInd === 2 ?
                                            <b>Qc Repair Started</b> : orderStatus.qcRepairInd === 3 ? <b>Qc Repair Completed</b> : null */}
                                    </>
                            },
                            {
                                title: translatedMenuItems[25],
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
                                                            title={translatedMenuItems[26]}
                                                            // "Do you wish to start ? "
                                                            onConfirm={() => props.startRepairInStatus({
                                                                qcRepairInd: 1,
                                                                orderPhoneId: orderStatus.orderId || "",
                                                                qcRepairUserId: props.userId,
                                                                repairReason: "",
                                                                repairReasonInd: true
                                                            }, props.distributorId)}
                                                            onCancel={null}
                                                            okText={translatedMenuItems[6]}
                                                            // "Yes"
                                                            cancelText={translatedMenuItems[7]}
                                                            // "No"
                                                        >
                                                            <Button
                                                                loading={props.startRepairingInStatus}
                                                                type='primary'

                                                            >{translatedMenuItems[27]}
                                                                {/* Start Repair */}
                                                                </Button>
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
                                                      {translatedMenuItems[25]}  {/* Start Repair Without Approve */}
                                                    </Button>
                                                    ) :
                                                    <b>{(orderStatus.qcRepairInd === 2 || orderStatus.qcRepairInd === 3) &&
                                                        (<>
                                                            {translatedMenuItems[19]} {orderStatus.orderRepairAssignUser} {translatedMenuItems[2]} {dayjs(orderStatus.orderRepairAssignDate).format("DD-MM-YYYY")}
                                                        </>)}
                                                        &nbsp;   {orderStatus.qcRepairInd === 3 &&
                                                            (<> | {translatedMenuItems[20]} {dayjs(orderStatus.orderRepairStartTime).format("DD-MM-YYYY")} | {translatedMenuItems[23]} {dayjs(orderStatus.orderRepairEndTime).format("DD-MM-YYYY")}
                                                            </>)}
                                                    </b>
                                        }

                                    </>
                            },

                            {
                                title: translatedMenuItems[29],
                                // 1264
                                // after packed button on enabled level
                                status: 'progress',
                                description: <>
                                    {orderStatus.dispatchInspectionInd === 3 &&
                                        <b>{translatedMenuItems[30]} {orderStatus.packedBy} {translatedMenuItems[2]} {dayjs(orderStatus.packedDate).format("DD-MM-YYYY")}</b>
                                    }
                                </>
                            },
                            {
                                title:translatedMenuItems[31],
                                // after customer pickup order (after delivery address)
                                status: <>
                                    {orderStatus.pickupInd === false ? 'wait' : 'finish'}</>,
                                description: <>
                                    {orderStatus.pickupInd && <b>Scheduled for {orderStatus.unloadingAddresses && orderStatus.unloadingAddresses[0].city || ""} {translatedMenuItems[2]} {dayjs(orderStatus.unloadingDate).format("DD-MM-YYYY")} by {orderStatus.unloadingUser}</b>}
                                </>
                            },
                            {
                                title: translatedMenuItems[32],
                                status: 'progress',
                                description: <>
                                    {orderStatus.completeOrderInd &&
                                        <b>{translatedMenuItems[33]} {orderStatus.dispatchCompleteUserName}
                                            translatedMenuItems[2] {dayjs(orderStatus.dispatchReceivedDate).format("DD-MM-YYYY")}</b>
                                    }
                                </>

                            },
                            {
                                title: translatedMenuItems[34],
                                status: 'progress',

                            },
                        ]}
                    />
                </div>
                <Suspense>
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
                </Suspense>
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
