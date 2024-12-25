import { Select, } from 'antd'
import React, { useEffect } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRemainingPhonesList } from "../RefurbishAction"
import QRCodeModal from '../../../../Components/UI/Elements/QRCodeModal'

const RemainingPhoneList = (props) => {

    useEffect(() => {
        props.getRemainingPhonesList(props.orderPhoneId, props.row.technicianId);
    }, [])

    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "OEM",
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
                    <div>
                        {item.qrCodeId ? (
                            <QRCodeModal
                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                imgHeight={"2.8em"}
                                imgWidth={"2.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span color="text-[0.6em] font-bold">
                                No QR
                            </span>
                        )}
                    </div>
                );
            },
        },


    ];


    return (
        <div>


            <StyledTable
                rowKey="phoneId"
                dataSource={props.remainingPhoneById}
                pagination={false}
                columns={column}
                loading={props.fetchingRemainingPhoneList}
            />

        </div>
    )
}


const mapStateToProps = ({ refurbish, auth }) => ({
    remainingPhoneById: refurbish.remainingPhoneById,
    locationId: auth.userDetails.locationId,
    fetchingRemainingPhoneList: refurbish.fetchingRemainingPhoneList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRemainingPhonesList,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemainingPhoneList);
