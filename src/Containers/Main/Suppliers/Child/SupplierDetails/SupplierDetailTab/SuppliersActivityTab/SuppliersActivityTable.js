import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tooltip } from "antd";
import { EditOutlined, FileDoneOutlined, PhoneOutlined, ScheduleOutlined } from "@ant-design/icons";

import { StyledModal, StyledTable } from "../../../../../Components/UI/Antd";
// import {
//     getActivityListByDistributorId,
//     handleUpdateEventModal,
//     handleUpdateTaskModal,
//     handleUpdateCallModal
// } from "../../../../DistributorAction";
// import { setEditCall } from "../../../../../Call/CallAction";
// import { setEditEvents } from "../../../../../Event/EventAction";
// import { setEditTask } from "../../../../../Task/TaskAction";
import moment from "moment";
// import DistributorCallUpdateModal from "./DistributorCallUpdateModal";
// import DistributorEventUpdateModal from "./DistributorEventUpdateModal";
// import DistributorTaskUpdateModal from "./DistributorTaskUpdateModal";

class SuppliersActivityTable extends Component {
    componentDidMount() {
        // this.props.getActivityListByDistributorId(this.props.distributorId);
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
                                // <Icon type="phone" />
                                <PhoneOutlined/>
                            )}
                            {item.activity === "Event" && (
                                // <Icon type="schedule" />
                                <ScheduleOutlined/>
                            )}
                            {item.activity === "Task" && (
                                // <Icon type="file-done" />
                                <FileDoneOutlined/>
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
                    return <span>{` ${moment(item.startDate).format("lll")}`}</span>;
                },
            },

            {
                title: "End",
                width: "20%",
                render: (name, item, i) => {
                    return <span>{` ${moment(item.endDate).format("lll")}`}</span>;
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
                                <EditOutlined
                                    // type="edit"
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        // this.props.setEditEvents(item);
                                        // handleUpdateEventModal(true);
                                    }}
                                />
                            )}
                            {item.activity === "Call" && (
                                <EditOutlined
                                    // type="edit"
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        // this.props.setEditCall(item);
                                        // handleUpdateCallModal(true);

                                    }}
                                />
                            )}
                            {item.activity === "Task" && (
                                <EditOutlined
                                    // type="edit"
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        // this.props.setEditTask(item);
                                        // handleUpdateTaskModal(true);

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
                        // loading={this.props.fetchingActivityDistributor}
                        scroll={{ y: 320 }}
                        pagination={{
                            defaultPageSize: 15,
                            showSizeChanger: true,
                            pageSizeOptions: ["15", "25", "40", "50"],
                        }}
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
                {/* <DistributorEventUpdateModal
                    updateEventModal={updateEventModal}
                    handleUpdateEventModal={handleUpdateEventModal}
                />

                <DistributorCallUpdateModal
                    updateCallModal={updateCallModal}
                    handleUpdateCallModal={handleUpdateCallModal}
                />

                <DistributorTaskUpdateModal
                    updateTaskModal={updateTaskModal}
                    handleUpdateTaskModal={handleUpdateTaskModal}
                /> */}
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    activityDistributor: distributor.activityDistributor,
    fetchingActivityDistributor: distributor.fetchingActivityDistributor,
    // distributorDistributorId: distributor.distributorDetailsByDistributorId.distributorId,
    updateEventModal: distributor.updateEventModal,
    updateCallModal: distributor.updateCallModal,
    updateTaskModal: distributor.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getActivityListByDistributorId,
            // handleUpdateEventModal,
            // handleUpdateCallModal,
            // handleUpdateTaskModal,
            // setEditCall,
            // setEditEvents,
            // setEditTask
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuppliersActivityTable);
