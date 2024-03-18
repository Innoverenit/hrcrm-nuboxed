
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { StyledTable } from "../../../Components/UI/Antd";
import { getSpareListByPhoneId, updateSpareItem } from "../Account/AccountAction";
import { BorderColorOutlined } from "@mui/icons-material";

function RepairSpareListTable(props) {
    useEffect(() => {
        props.getSpareListByPhoneId(props.RowData.phoneId)
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Spare",
            dataIndex: "suppliesName",

        },
        {
            title: "Units",
            dataIndex: "noOfSpare",

        },
        {
            title: "Hours",
            dataIndex: "hours",

        },
        {
            title: "",
            dataIndex: "",
            render: (text, item) => {
                return (
                    <BorderColorOutlined />
                )
            }

        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.spareList}
                pagination={false}
                loading={props.fetchingSpareListByPhoneId}
            />
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    spareList: distributor.spareList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneId,
            updateSpareItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairSpareListTable);
