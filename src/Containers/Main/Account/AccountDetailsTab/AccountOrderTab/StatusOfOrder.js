import { Button, Steps, Popconfirm } from "antd";
import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  startQCStatus,
  startRepairInStatus,
  handlePaymentHistory,
  handleRepairReason,
  handlePaidModal,
  getOrderStatus,
} from "../../AccountAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../Components/Placeholder";
const StartRepairReasonModal = lazy(() => import("./StartRepairReasonModal"));
const ShowPaymentHistoryModal = lazy(() => import("./ShowPaymentHistoryModal"));
const PaidButtonModal = lazy(() => import("./PaidButtonModal"));
const StatusOfOrder = (props) => {
  useEffect(() => {
    props.getOrderStatus(props.particularRowData.orderId);
  }, [props.particularRowData.orderId]);
  const { orderStatus } = props;
  if (props.fetchingOrderStatus) {
    return <BundleLoader />;
  } else {
    return (
      <>
        <div class="bg-white">
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: props.translatedMenuItems[85],
                status: "progress",
                description: (
                  <>
                    <b>
                      {/* On    */} {props.translatedMenuItems[87]}{" "}
                      {dayjs(orderStatus.creationDate).format("DD-MM-YYYY")}{" "}
                      {/* by */}
                      {props.translatedMenuItems[88]} {orderStatus.userName}
                    </b>
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[55],
                // 'Collections'
                status: (
                  <>
                    {orderStatus.qcStartInd === 0
                      ? "wait"
                      : orderStatus.qcStartInd === 1 &&
                        orderStatus.qcStartInd === 2
                      ? "progress"
                      : null}
                  </>
                ),
                description: (
                  <>
                    <div className=" flex justify-around w-[45rem]">
                      <Button
                        type="primary"
                        onClick={() => {
                          props.handlePaidModal(true);
                        }}
                      >
                        {props.translatedMenuItems[89]} {/* Receive Payment */}
                      </Button>
                      {orderStatus.qcStartInd === 0 ? (
                        <>
                          <Popconfirm
                            title={props.translatedMenuItems[86]}
                            onConfirm={() =>
                              props.startQCStatus(
                                {
                                  orderPhoneId: orderStatus.orderId || "",
                                  qcStartInd: 1,
                                  qcStartUserId: props.userId,
                                },
                                props.distributorId
                              )
                            }
                            onCancel={null}
                            okText={props.translatedMenuItems[90]}
                            // "Yes"
                            cancelText={props.translatedMenuItems[91]}
                            // "No"
                          >
                            <Button
                              loading={props.startingQcInStatus}
                              type="primary"
                            >
                              {props.translatedMenuItems[92]} {/* Approve QC */}
                            </Button>
                          </Popconfirm>
                        </>
                      ) : (
                        <b>
                          {props.translatedMenuItems[93]}{" "}
                          {/* QC approved on  */}{" "}
                          {dayjs(orderStatus.qcStartDate).format("DD-MM-YYYY")}{" "}
                          &nbsp; {props.translatedMenuItems[88]}
                          {/* by  */} {orderStatus.qcStartUser}
                        </b>
                      )}{" "}
                      |
                      <b>
                        {" "}
                        {props.translatedMenuItems[94]} -
                        {/* Advance as per Order -  */}
                        {orderStatus.advancePayment} %{" "}
                      </b>{" "}
                      |
                      <b>
                        {props.translatedMenuItems[44]} {/* Received - */}-{" "}
                        {orderStatus.receivePayment || 0} %{" "}
                      </b>
                    </div>
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[95],
                // 'Order Pick Up',
                status: "progress",
                description: (
                  <>
                    {orderStatus.transferInd !== 0 && (
                      <b>
                        {props.translatedMenuItems[88]}{" "}
                        {orderStatus.orderPickUpUser}{" "}
                        {props.translatedMenuItems[87]}{" "}
                        {dayjs(orderStatus.pickUpDate).format("DD-MM-YYYY")}{" "}
                      </b>
                    )}
                  </>
                ),
              },

              {
                title: props.translatedMenuItems[96],
                // 'Warehouse',
                status: "progress",
                description: (
                  <>
                    {/* {orderStatus.transferInd === 2 && */}
                    {orderStatus.transferInd === 1 && (
                      <b>
                        {/* Picked Up on */}
                        {props.translatedMenuItems[97]}
                        {dayjs(orderStatus.pickUpDate).format("DD-MM-YYYY")}
                        {props.translatedMenuItems[88]}{" "}
                        {orderStatus.inventoryUserName} |{" "}
                        {props.translatedMenuItems[15]}
                        {orderStatus.locationName} &nbsp;
                      </b>
                    )}
                    {orderStatus.inventoryReceiveInd && (
                      <b>
                        {props.translatedMenuItems[87]}{" "}
                        {dayjs(orderStatus.inventoryReceiveDate).format(
                          "DD-MM-YYYY"
                        )}
                        ,{props.translatedMenuItems[99]}{" "}
                        {orderStatus.inventoryReceiveUser} | &nbsp;
                      </b>
                    )}
                    {orderStatus.inspectionInd === 1 ||
                      (orderStatus.inspectionInd === 2 && (
                        <b>
                          {props.translatedMenuItems[100]}{" "}
                          {orderStatus.startInspectionUserName}{" "}
                          {props.translatedMenuItems[87]}
                          &nbsp;
                          {dayjs(orderStatus.startInspectionDate).format(
                            "DD-MM-YYYY"
                          )}{" "}
                          | &nbsp;
                        </b>
                      ))}
                    {orderStatus.inspectionInd === 2 && (
                      <b>
                        {props.translatedMenuItems[101]}{" "}
                        {orderStatus.stopInspectionUserName}{" "}
                        {props.translatedMenuItems[87]}&nbsp;
                        {dayjs(orderStatus.stoptInspectionDate).format(
                          "DD-MM-YYYY"
                        )}
                      </b>
                    )}
                    {/* } */}
                  </>
                ),
              },
              {
                title: "QC",
                status: "progress",

                description: (
                  <>
                    <b>
                      {(orderStatus.qcStartInd === 2 ||
                        orderStatus.qcStartInd === 3) && (
                        <>
                          {props.translatedMenuItems[102]}{" "}
                          {orderStatus.orderAssignUser} on{" "}
                          {dayjs(orderStatus.orderAssignDate).format(
                            "DD-MM-YYYY"
                          )}
                        </>
                      )}
                      &nbsp;
                      {orderStatus.qcStartInd === 3 && (
                        <>
                          | {props.translatedMenuItems[103]}{" "}
                          {dayjs(orderStatus.orderQcStartTime).format(
                            "DD-MM-YYYY"
                          )}{" "}
                          | {props.translatedMenuItems[103]}{" "}
                          {dayjs(orderStatus.orderQcEndTime).format(
                            "DD-MM-YYYY"
                          )}
                        </>
                      )}
                    </b>
                  </>
                ),
              },

              {
                title: props.translatedMenuItems[105],
                // start repair button after click show repair started
                status: (
                  <>
                    {orderStatus.qcRepairInd === 0
                      ? "wait"
                      : orderStatus.qcRepairInd === 1 ||
                        orderStatus.qcRepairInd === 2
                      ? "progress"
                      : null}
                  </>
                ),
                description: (
                  <>
                    {orderStatus.priceConfirmInd && (
                      <b>
                        {props.translatedMenuItems[23]}{" "}
                        {dayjs(orderStatus.orderConfirmedDate).format(
                          "DD-MM-YYYY"
                        )}{" "}
                        {props.translatedMenuItems[88]}{" "}
                        {orderStatus.orderConfirmedUser || " "}
                        <Button
                          type="primary"
                          onClick={() => {
                            props.handlePaymentHistory(true);
                          }}
                        >
                          {props.translatedMenuItems[108]}
                        </Button>
                      </b>
                    )}
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[1],
                // after complete show repair completed on date and user
                status: <>{orderStatus.qcRepairInd === 3 && "progress"}</>,
                description: (
                  <>
                    {orderStatus.priceConfirmInd &&
                    orderStatus.qcRepairInd === 0 ? (
                      <>
                        <Popconfirm
                          title={props.translatedMenuItems[108]}
                          // "Do you wish to start ? "
                          onConfirm={() =>
                            props.startRepairInStatus(
                              {
                                qcRepairInd: 1,
                                orderPhoneId: orderStatus.orderId || "",
                                qcRepairUserId: props.userId,
                                repairReason: "",
                                repairReasonInd: true,
                              },
                              props.distributorId
                            )
                          }
                          onCancel={null}
                          okText={props.translatedMenuItems[90]}
                          // "Yes"
                          cancelText={props.translatedMenuItems[91]}
                          // "No"
                        >
                          <Button
                            loading={props.startRepairingInStatus}
                            type="primary"
                          >
                            {props.translatedMenuItems[109]}
                            {/* Start Repair */}
                          </Button>
                        </Popconfirm>
                      </>
                    ) : !orderStatus.repairReasonInd &&
                      orderStatus.qcRepairInd === 0 &&
                      orderStatus.qcStartInd === 3 ? (
                      <Button
                        type="primary"
                        onClick={() => {
                          props.handleRepairReason(true);
                        }}
                      >
                        {props.translatedMenuItems[1]}{" "}
                        {/* Start Repair Without Approve */}
                      </Button>
                    ) : (
                      <b>
                        {(orderStatus.qcRepairInd === 2 ||
                          orderStatus.qcRepairInd === 3) && (
                          <>
                            {props.translatedMenuItems[102]}{" "}
                            {orderStatus.orderRepairAssignUser}{" "}
                            {props.translatedMenuItems[87]}{" "}
                            {dayjs(orderStatus.orderRepairAssignDate).format(
                              "DD-MM-YYYY"
                            )}
                          </>
                        )}
                        &nbsp;{" "}
                        {orderStatus.qcRepairInd === 3 && (
                          <>
                            {" "}
                            | {props.translatedMenuItems[103]}{" "}
                            {dayjs(orderStatus.orderRepairStartTime).format(
                              "DD-MM-YYYY"
                            )}{" "}
                            | {props.translatedMenuItems[106]}{" "}
                            {dayjs(orderStatus.orderRepairEndTime).format(
                              "DD-MM-YYYY"
                            )}
                          </>
                        )}
                      </b>
                    )}
                  </>
                ),
              },

              {
                title: props.translatedMenuItems[35],
                // 1264
                // after packed button on enabled level
                status: "progress",
                description: (
                  <>
                    {orderStatus.dispatchInspectionInd === 3 && (
                      <b>
                        {props.translatedMenuItems[111]} {orderStatus.packedBy}{" "}
                        {props.translatedMenuItems[87]}{" "}
                        {dayjs(orderStatus.packedDate).format("DD-MM-YYYY")}
                      </b>
                    )}
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[112],
                // after customer pickup order (after delivery address)
                status: (
                  <>{orderStatus.pickupInd === false ? "wait" : "finish"}</>
                ),
                description: (
                  <>
                    {orderStatus.pickupInd && (
                      <b>
                        Scheduled for{" "}
                        {(orderStatus.unloadingAddresses &&
                          orderStatus.unloadingAddresses[0].city) ||
                          ""}{" "}
                        {props.translatedMenuItems[87]}{" "}
                        {dayjs(orderStatus.unloadingDate).format("DD-MM-YYYY")}{" "}
                        by {orderStatus.unloadingUser}
                      </b>
                    )}
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[113],
                status: "progress",
                description: (
                  <>
                    {orderStatus.completeOrderInd && (
                      <b>
                        {props.translatedMenuItems[114]}{" "}
                        {orderStatus.dispatchCompleteUserName}
                        props.translatedMenuItems[87]{" "}
                        {dayjs(orderStatus.dispatchReceivedDate).format(
                          "DD-MM-YYYY"
                        )}
                      </b>
                    )}
                  </>
                ),
              },
              {
                title: props.translatedMenuItems[115],
                status: "progress",
              },
            ]}
          />
        </div>
        <Suspense>
          <StartRepairReasonModal
            particularRowData={props.orderStatus}
            handleRepairReason={props.handleRepairReason}
            showRepairReasonModal={props.showRepairReasonModal}
          />

          <ShowPaymentHistoryModal
            particularRowData={props.orderStatus}
            handlePaymentHistory={props.handlePaymentHistory}
            showPaymentHistoryModal={props.showPaymentHistoryModal}
            translatedMenuItems={props.translatedMenuItems}
          />
          <PaidButtonModal
            addPaidButtonModal={props.addPaidButtonModal}
            handlePaidModal={props.handlePaidModal}
            particularRowData={props.orderStatus}
            translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </>
    );
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
      handlePaidModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StatusOfOrder);
