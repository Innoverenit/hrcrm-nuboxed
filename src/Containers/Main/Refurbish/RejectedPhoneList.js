import React, { useEffect } from 'react'
import { getRejectedPhoneList } from "./RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyledTable } from '../../../Components/UI/Antd'

const RejectedPhoneList = (props) => {
    useEffect(() => {
        props.getRejectedPhoneList(props.rowData.orderPhoneId)
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
            title: "Reason",
            dataIndex: "reason",
            width: "10%",
        },
    ];
    return (
        <>
            <StyledTable
                rowKey="phoneId"
                dataSource={props.rejectPhoneById}
                pagination={false}
                columns={column}
                loading={props.fetchingRejectedPhoneList}
            />
        </>
    )
}
const mapStateToProps = ({ auth, refurbish }) => ({
    rejectPhoneById: refurbish.rejectPhoneById,
    fetchingRejectedPhoneList: refurbish.fetchingRejectedPhoneList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRejectedPhoneList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RejectedPhoneList);


