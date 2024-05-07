import React, { useEffect, useState } from 'react'
import { getRejectedPhoneList } from "./RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyledTable } from '../../../Components/UI/Antd'
import { Button } from 'antd'
import RejectedReassignPhon from './RejectedReassignPhon'

const RejectedPhoneList = (props) => {
    useEffect(() => {
        props.getRejectedPhoneList(props.rowData.orderPhoneId)
    }, [])
    const [row, setRow] = useState({})
    const handleSetdata = (item) => {
        setRow(item)
    }
    const [reassign, setReassign] = useState(false)
    const handleReassign = (item) => {
        setReassign(!reassign)
    }
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
        {
            title: "Technician",
            dataIndex: "technicianName",
            width: "10%",
        },
        {
            title: "Reassign",
            dataIndex: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <Button
                        style={{ color: reassign && item.phoneId === row.phoneId ? 'blue' : 'orange' }}
                        onClick={() => {
                            handleSetdata(item)
                            handleReassign()
                        }}
                    >Reassign</Button>
                )
            }
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
            {reassign && <RejectedReassignPhon row={row} />}
        </>
    )
}
const mapStateToProps = ({ refurbish }) => ({
    rejectPhoneById: refurbish.rejectPhoneById,
    fetchingRejectedPhoneList: refurbish.fetchingRejectedPhoneList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRejectedPhoneList,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RejectedPhoneList);


