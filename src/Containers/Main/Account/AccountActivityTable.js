import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tooltip } from "antd";
import { EditOutlined, FileDoneOutlined, PhoneOutlined, ScheduleOutlined } from "@ant-design/icons";
import { StyledTable } from "../../../Components/UI/Antd";
import {
    getActivityListByDistributorId,
    handleUpdateEventModal,
    handleUpdateTaskModal,
    handleUpdateCallModal
} from "./AccountAction";
import dayjs from "dayjs";

class AccountActivityTable extends Component {
    componentDidMount() {
        this.props.getActivityListByDistributorId(this.props.distributorId);
    }

    render() {
        const {
            handleUpdateEventModal,
            updateEventModal,
            handleUpdateCallModal,
            updateCallModal,
            handleUpdateTaskModal,
            updateTaskModal,
        } = this.props;
        const columns = [
            {
                title: "",
                width: "1%",
            },
            {
                title: "",
                width: "8%",
                dataIndex: "activity",
                render: (name, item, i) => {
                    return (
                        <>
                            {item.activity === "Call" && (
                                <PhoneOutlined />
                            )}
                            {item.activity === "Event" && (
                                <ScheduleOutlined />
                            )}
                            {item.activity === "Task" && (
                                <FileDoneOutlined />
                            )}
                        </>
                    )
                }
            },
            {
                title: "Type",
                width: "20%",
                dataIndex: "type",
            },
            {
                title: "Topic",
                width: "20%",
                dataIndex: "topic",
            },


            {
                title: "Start",
                width: "20%",
                render: (name, item, i) => {
                    return <span>{` ${dayjs(item.startDate).format("lll")}`}</span>;
                },
            },

            {
                title: "End",
                width: "20%",
                render: (name, item, i) => {
                    return <span>{` ${dayjs(item.endDate).format("lll")}`}</span>;
                },
            },

            {
                title: "",
                dataIndex: "activity",
                width: "2%",
                render: (name, item, i) => {
                    //debugger
                    return (
                        <Tooltip title="Edit">
                            {item.activity === "Event" && (
                                <div

                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        this.props.setEditEvents(item);
                                        handleUpdateEventModal(true);
                                    }}
                                />
                            )}
                            {item.activity === "Call" && (
                                <div

                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        this.props.setEditCall(item);
                                        handleUpdateCallModal(true);

                                    }}
                                />
                            )}
                            {item.activity === "Task" && (
                                <div

                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        this.props.setEditTask(item);
                                        handleUpdateTaskModal(true);

                                    }}
                                />
                            )}
                        </Tooltip>
                    );
                },
            },
        ];

        return (
            <>
                {true && (
                    <StyledTable
                        rowKey=""
                        columns={columns}
                        dataSource={this.props.activityDistributor}
                        loading={this.props.fetchingActivityDistributor}
                        scroll={{ y: 320 }}
                        pagination={false}
                        expandedRowRender={(record) => {
                            return (
                                <>
                                    <div>

                                        {record.description || ""}
                                    </div>
                                </>
                            );
                        }}

                    />
                )}
               
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    activityDistributor: distributor.activityDistributor,
    fetchingActivityDistributor: distributor.fetchingActivityDistributor,
    updateEventModal: distributor.updateEventModal,
    updateCallModal: distributor.updateCallModal,
    updateTaskModal: distributor.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getActivityListByDistributorId,
            handleUpdateEventModal,
            handleUpdateCallModal,
            handleUpdateTaskModal,
            // setEditCall,
            // setEditEvents,
            // setEditTask
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActivityTable);
