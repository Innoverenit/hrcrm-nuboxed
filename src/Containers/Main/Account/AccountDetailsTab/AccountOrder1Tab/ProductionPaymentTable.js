import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button } from "antd";
import { getDistributorOrderPayment, updateOrderPayment } from "../../AccountAction";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductionPaymentTable(props) {

    useEffect(() => {
        props.getDistributorOrderPayment(props.particularRowData.orderId)
    }, [])

    const [editedFields, setEditedFields] = useState({});
    const [editpaymentId, setEditpaymentId] = useState(null);

    const handleChange = (paymentId, fieldName, value) => {
        setEditedFields((prevFields) => ({
            ...prevFields,
            [paymentId]: {
                ...prevFields[paymentId],
                [fieldName]: value,
            },
        }));

    };

    const handleEditClick = (paymentId) => {
        setEditpaymentId(paymentId);
    };
    const handleCancelClick = (paymentId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [paymentId]: undefined }));
        setEditpaymentId(null);
    };

    const handleUpdatePayment = (paymentId, transactionNumber, remarks, orderPaymentType, paymentMode, paymentAmount, docId,
        orderCurrencyId, date, indentId
    ) => {
        let newEndDate = dayjs(date).format('YYYY-MM-DD');
        const data = {
            paymentId: paymentId,
            transactionNumber: editedFields[paymentId]?.transactionNumber !== undefined ? editedFields[paymentId].transactionNumber : transactionNumber,
            remarks: editedFields[paymentId]?.remarks !== undefined ? editedFields[paymentId].remarks : remarks,
            orderPaymentType: editedFields[paymentId]?.orderPaymentType !== undefined ? editedFields[paymentId].orderPaymentType : orderPaymentType,
            paymentMode: editedFields[paymentId]?.paymentMode !== undefined ? editedFields[paymentId].paymentMode : paymentMode,
            paymentAmount: editedFields[paymentId]?.paymentAmount !== undefined ? editedFields[paymentId].paymentAmount : paymentAmount,
            docId: editedFields[paymentId]?.docId !== undefined ? editedFields[paymentId].docId : docId,
            date: `${newEndDate}T00:00:00Z`,
            orderCurrencyId: editedFields[paymentId]?.orderCurrencyId !== undefined ? editedFields[paymentId].orderCurrencyId : orderCurrencyId,
            userId: props.userId,
            orderId: props.particularRowData.orderId
        };

        props.updateOrderPayment(data, paymentId)
        setEditedFields((prevFields) => ({ ...prevFields, [paymentId]: undefined }));
        setEditpaymentId(null);

    };

    return (
        <>

            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">

                        <div className=" md:w-[4.1rem]">Transaction #</div>
                        <div className=" md:w-[4.5rem] ">Created By</div>
                        <div className="md:w-[5.8rem]">Entry</div>
                        <div className=" md:w-[4.2rem] ">Amount</div>
                        <div className=" md:w-[4.2rem] ">Mode</div>
                        <div className=" md:w-[4.2rem] ">Reason</div>
                        <div className=" md:w-[5.2rem] ">Approved By</div>
                        <div className="w-12"></div>
                    </div>

                    {props.paymentHistory.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                                            <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                                                {item.transactionNumber}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">

                                            {item.salesExecutive}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                                        <div class=" text-xs  font-semibold  font-poppins">
                                            {dayjs(item.date).format("DD-MM-YY")}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
                                            {editpaymentId === item.paymentId ? (
                                                <input
                                                    class="w-8 border-2 border-black "
                                                    //  style={{border:"2px solid black"}}
                                                    value={editedFields[item.paymentId]?.paymentAmount !== undefined ? editedFields[item.paymentId].paymentAmount : item.quantity}
                                                    onChange={(e) => handleChange(item.paymentId, 'paymentAmount', e.target.value)}
                                                />

                                            ) : (
                                                <div className="font-normal text-sm  font-poppins">
                                                    <span>  {item.paymentAmount} {item.orderCurrencyName}</span>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">

                                            {item.paymentModeName}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">

                                            {item.remarks}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins">
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

                                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                        <div>
                                            {editpaymentId === item.paymentId ? (
                                                <>
                                                    <Button onClick={() => handleUpdatePayment(item.paymentId, item.supplySupplyLinkId, item.suppliesName, item.description, item.categoryName, item.subCategoryName)}>
                                                        Save
                                                    </Button>
                                                    <Button
                                                        className="ml-2"
                                                        onClick={() => handleCancelClick(item.paymentId)}>
                                                        Cancel
                                                    </Button>
                                                </>

                                            ) : (
                                                <>
                                                    {item.approveByFinanceInd === false && (
                                                        <BorderColorIcon
                                                            className="text-[blue] flex justify-items-center justify-center text-xs cursor-pointer"
                                                            onClick={() => handleEditClick(item.paymentId)}
                                                        // style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <StyledPopconfirm
                                                title="Do you want to delete?"
                                                onConfirm={() => props.removeMaterialBuilder({ active: false }, item.supplySupplyLinkId)}
                                            >
                                                <Tooltip title="Delete">
                                                    <DeleteIcon
                                                        className="text-base cursor-pointer text-[red]"
                                                    />
                                                </Tooltip>
                                            </StyledPopconfirm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    paymentHistory: distributor.paymentHistory,
    fetchingPaymentHistory: distributor.fetchingPaymentHistory,
    userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorOrderPayment,
            updateOrderPayment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionPaymentTable);

