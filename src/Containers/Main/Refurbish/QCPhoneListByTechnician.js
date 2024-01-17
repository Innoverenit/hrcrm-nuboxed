import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNoOfPhoneInQCById } from "./RefurbishAction"
import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
import { SubTitle } from '../../../Components/UI/Elements'

const QCPhoneListByTechnician = (props) => {

    useEffect(() => {
        props.getNoOfPhoneInQCById(props.orderPhoneId, props.row.technicianId)
    }, [])
    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Company",
            dataIndex: "company",
            width: "15%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "10%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "12%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "12%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "12%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "12%",
        },
        {
            title: "Condition",
            dataIndex: "conditions",
            width: "12%",
        },
        {
            title: "QR",
            width: "8%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {item.qrCodeId ? (
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
                        )}
                    </SubTitle>
                );
            },
        },


    ];
    return (
        <div>
            <h2>
                <b>Phone List</b>
            </h2>
            <StyledTable
                dataSource={props.phoneByTechId}
                pagination={false}
                columns={column}
                loading={props.fetchingNoOfPhoneInQcById}
            />
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    phoneByTechId: refurbish.phoneByTechId,
    fetchingNoOfPhoneInQcById: refurbish.fetchingNoOfPhoneInQcById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfPhoneInQCById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QCPhoneListByTechnician);

