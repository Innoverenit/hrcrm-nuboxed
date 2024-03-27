import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getSpareListByPhoneId, deleteSpareList } from "../Account/AccountAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Popconfirm } from "antd";

function QCSpareListTable(props) {
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
            width: "20%",
        },
        {
            title: "Category",
            width: "15%",
            render: (text, item) => {
                return (
                    <>
                        {item.categoryName} {item.subCategoryName}
                    </>
                )
            },
        },
        {
            title: "Attribute",
            render: (text, item) => {
                return (
                    <>
                        {item.attribute} {item.subAttribute}
                    </>
                )
            },
            width: "15%",
        },
        {
            title: "Units",
            dataIndex: "noOfSpare",
            width: "15%",
        },
        {
            title: "Hours",
            dataIndex: "hours",
            width: "15%",
        },
        {
            title: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <Popconfirm
                        title="Do you want to delete?"
                        onConfirm={() => props.deleteSpareList({}, item.phoneSpareId)}
                    ><DeleteIcon
                            className="text-base cursor-pointer text-[red]"
                        />
                    </Popconfirm>
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
            deleteSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QCSpareListTable);
