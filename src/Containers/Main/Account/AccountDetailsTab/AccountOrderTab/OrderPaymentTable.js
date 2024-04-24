import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, Select } from "antd";
import { getDistributorOrderPayment, updateOrderPayment, deleteOrderPaymentData, getPaymentMode } from "../../AccountAction";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { BundleLoader } from "../../../../../Components/Placeholder";
const { Option } = Select;

function OrderPaymentTable(props) {

  useEffect(() => {
    props.getDistributorOrderPayment(props.particularRowData.orderId)
    props.getPaymentMode(props.orgId)
  }, [])
  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false);
  const [row, setRow] = useState({});

  const handlePaymentMode = (val) => {
    setMode(val)
  }
  const handleChange = (val) => {
    setAmount(val)
  }
  const handleRowData = (item) => {
    setRow(item);
  };
  const handleEditIcon = () => {
    setEdit(!edit);
  };
  const hnadleCallback = () => {
    setAmount("")
    setMode("")
    setEdit(false)
  }

  return (
    <>

      {props.fetchingPaymentHistory ? <BundleLoader /> : <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">

            <div className=" md:w-[4.1rem]">Transaction #</div>
            <div className=" md:w-[4.5rem] ">Created By</div>
            <div className="md:w-[5.8rem]">Entry</div>
            <div className=" md:w-[4.2rem] ">Amount</div>
            <div className=" md:w-[4.2rem] ">Mode</div>
            <div className=" md:w-[4.2rem] ">Reason</div>
            <div className=" md:w-[5.2rem] ">Approved By</div>
            <div className="md:w-[6rem]"></div>
          </div>

          {props.paymentHistory.map((item) => {
            return (
              <div>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
                  <div class="flex">
                    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                      <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                        {item.transactionNumber}
                      </div>
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">

                      {item.salesExecutive}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {dayjs(item.date).format("DD-MM-YY")}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                      {row.paymentId === item.paymentId && edit ? (
                        <Input
                          value={amount}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      ) : (
                        <div className="font-normal text-sm text-cardBody font-poppins">
                          <span>  {item.paymentAmount} {item.orderCurrencyName}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                      {row.paymentId === item.paymentId && edit ? <Select onChange={handlePaymentMode}>
                        {props.paymentModee.map((a) => {
                          return <Option value={a.paymentCatagoryId}>{a.name}</Option>;
                        })}
                      </Select> :
                        item.paymentModeName}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">

                      {item.remarks}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                      {item.approveByFinanceInd === true ? (
                        <div class="flex">
                          <span class="text-green-700">
                            {item.approveByName} on
                          </span>
                          &nbsp;
                          <span class="text-green-700"> {dayjs(item.approveDate).format('YYYY-MM-DD')}</span>

                        </div>
                      ) : "No Data"}
                    </div>
                  </div>

                  <div class="flex flex-col md:w-[6rem] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      {row.paymentId === item.paymentId && edit ? (
                        <>
                          <Button
                            type="primary"
                            onClick={() => {
                              props.updateOrderPayment({
                                paymentId: item.paymentId,
                                transactionNumber: item.transactionNumber,
                                remarks: item.remarks,
                                orderPaymentType: "Repair",
                                paymentMode: mode,
                                paymentAmount: amount,
                                docId: item.docId,
                                date: `${item.date}T00:00:00Z`,
                                orderCurrencyId: item.orderCurrencyId,
                                userId: props.userId,
                                orderId: props.particularRowData.orderId
                              }, item.paymentId, hnadleCallback())
                            }}>
                            Save
                          </Button>
                          <Button
                            className="ml-2"
                            onClick={() => handleEditIcon()}>
                            Cancel
                          </Button>
                        </>

                      ) : (
                        <>
                          {item.approveByFinanceInd === false && (
                            <BorderColorIcon
                              className="text-[blue] flex justify-items-center justify-center text-xs cursor-pointer"
                              onClick={() => {
                                handleRowData(item);
                                handleEditIcon()
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    {item.approveByFinanceInd === false ? <div>
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => props.deleteOrderPaymentData({
                          orderPaymentType: "Repair",
                          reason: "",
                          paymentId: item.paymentId
                        }, item.paymentId)}
                      >
                        <Tooltip title="Delete">
                          <DeleteIcon
                            className="text-base cursor-pointer text-[red]"
                          />
                        </Tooltip>
                      </StyledPopconfirm>
                    </div> :
                      <div>
                        <Button type="primary">Refund</Button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>}

    </>
  );
}

const mapStateToProps = ({ distributor, auth }) => ({
  paymentHistory: distributor.paymentHistory,
  fetchingPaymentHistory: distributor.fetchingPaymentHistory,
  userId: auth.userDetails.userId,
  paymentModee: distributor.paymentModee,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderPayment,
      updateOrderPayment,
      getPaymentMode,
      deleteOrderPaymentData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);
