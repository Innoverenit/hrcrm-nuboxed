
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getSpareListByPhoneId, deleteSpareList } from "../../Account/AccountAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Popconfirm } from "antd";
import ToggleForSpare from "./ToggleForSpare";


function SpareListTable(props) {
    useEffect(() => {
        props.getSpareListByPhoneId(props.phoneId)
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
                    <ToggleForSpare
                        spareUseInd={item.spareUseInd}
                        phoneSpareId={item.phoneSpareId}
                    />
                )
            }

        },
        {
            title: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <Popconfirm
                        title="Do you want to delete?"
                        onConfirm={() => props.deleteSpareList({
                            userId: props.userId
                        }, item.phoneSpareId)}
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
            <div class=" flex justify-end">
                <Tooltip title="Make Spare Packet">

                    <Button
                        // style={{ color: expand && item.phoneId === phoneDetails.phoneId ? "red" : "white" }}
                        type="primary"
                    // onClick={() => {
                    //     handleSetphoneDetails(item);

                    // }}
                    >Spare Packet</Button>
                </Tooltip>
            </div>
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    spareList: distributor.spareList,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneId,
            deleteSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SpareListTable);
