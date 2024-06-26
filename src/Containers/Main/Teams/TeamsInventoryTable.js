import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import {
    getInventoryInTeam,
    setEditTeamsAllocation,
    handleUpdateTeamsAllocationModal,
} from "./TeamsAction"
import UpdateTeamsAllocationModal from "./UpdateTeamsAllocationModal";
import { Tooltip } from "antd";
import dayjs from "dayjs";

function TeamsInventoryTable(props) {

    useEffect(() => {
        props.getInventoryInTeam()
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "2%",
        },
        {
            title: "Name",
            width: "18%",
            render: (name, item, i) => {
                return (
                    <>
                        {item.firstName || ""} {item.middleName || ""}{" "}
                        {item.lastName || ""}
                    </>
                );
            },
        },
        {
            title: "Designation",
            dataIndex: "designation",
            width: "10%",

        },
        {
            title: "Email",
            dataIndex: "email",
            width: "20%",
        },
        {
            title: "Phone #",
            width: "10%",

        },
        {
            title: "Alternate No",
            width: "10%",

        },
        {
            title: "Start Date",
            width: "10%",
            dataIndex: "locationStartDate",
            render: (name, item, i) => {
                return <>{dayjs(item.locationStartDate).format("ll")}</>;
            },
        },
        {
            title: "End Date",
            width: "10%",
            dataIndex: "locationEndDate",
            render: (name, item, i) => {
                return <>{dayjs(item.locationEndDate).format("ll")}</>;
            },
        },
        {
            title: "Location",
            width: "8%",
            dataIndex: "locationDetailsName",
        },

        {
            title: "",
            dataIndex: "documentId",
            width: "2%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Edit">
                        <div
                            style={{ cursor: "pointer", fontSize: "12px" }}
                            onClick={() => {
                                props.setEditTeamsAllocation(item);
                                props.handleUpdateTeamsAllocationModal(true);
                            }}
                        />
                    </Tooltip>
                );
            },
        },
    ];

    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 200;
    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.inventoryTeam}
                pagination={false}
                scroll={{ y: tableHeight }}
            />
            <UpdateTeamsAllocationModal
                updateTeamsAllocationModal={props.updateTeamsAllocationModal}
                handleUpdateTeamsAllocationModal={
                    props.handleUpdateTeamsAllocationModal
                }
            />
        </>
    );
}

const mapStateToProps = ({ teams, auth, plant }) => ({
    inventoryTeam: teams.inventoryTeam,
    userId: auth.userDetails.userId,
    updateTeamsAllocationModal: teams.updateTeamsAllocationModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInventoryInTeam,
            setEditTeamsAllocation,
            handleUpdateTeamsAllocationModal,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsInventoryTable);

