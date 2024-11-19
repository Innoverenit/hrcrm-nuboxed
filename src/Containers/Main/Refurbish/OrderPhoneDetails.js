import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
// import { getPhonelistById } from "../../../Distributor/DistributorAction";
import { Tooltip } from "antd";
import TaskIcon from '@mui/icons-material/Task';
// import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
// import ReceiveValidationToggle from "../../../Inventory/Child/InventoryDetails/Received/ReceiveValidationToggle"


function DistributorPauseForm(props) {
    useEffect(() => {
       // props.getPhonelistById(props.rowData.orderPhoneId)
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "OEM",
            dataIndex: "company",
            width: "10%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "9%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "8%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "8%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "8%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "10%",
        },
        {
            title: "Condition",
            dataIndex: "conditions",
            width: "10%",
        },
        {
            title: "QR",
            width: "8%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {/* {item.qrCodeId ? (
                            <QRCodeModal
                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                imgHeight={"2.8em"}
                                imgWidth={"2.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                No QR
                            </span>
                        )} */}
                    </SubTitle>
                );
            },
        },
        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Task">
                        <TaskIcon style={{ color: "black" }} type="file-done"

                        //   onClick={() => {
                        //     handleSetParticularOrderData(item);
                        //     handleExpand(item.phoneId);
                        //   }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Notes">
                        <TaskIcon 
                            style={{ cursor: "pointer", fontSize: "13px" }}
                        //   onClick={() => {
                        //     handleSetParticularOrderData(item);
                        //     props.handleReceivedOrderIdPhoneNoteModal(true);
                        //   }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "Received by",
            width: "9%",
            dataIndex: "receivePhoneUserName"
        },
        {
            title: "Received",
            width: "7%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip>
                        {/* <ReceiveValidationToggle
                            orderPhoneId={props.rowData.orderPhoneId}
                            phoneId={item.phoneId}
                            receivePhoneInd={item.receivePhoneInd}
                            inspectionInd={item.inspectionInd} /> */}
                    </Tooltip>
                );
            },
        },

    ];


    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.phoneListById}
                pagination={false}
                scroll={{ y: 200 }}
            />

        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    phoneListById: distributor.phoneListById,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           // getPhonelistById,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorPauseForm);
