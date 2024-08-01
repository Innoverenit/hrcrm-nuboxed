import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { EditOutlined, FileDoneOutlined, PhoneOutlined, ScheduleOutlined } from "@ant-design/icons";
import {  StyledTable } from "../../../../../../../Components/UI/Antd";
import dayjs from "dayjs";
import {getActivityListBySupplierId} from "../../../../SuppliersAction";

class SuppliersActivityTable extends Component {
    componentDidMount() {
        this.props.getActivityListBySupplierId(this.props.supplier.supplierId);
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
                                <EditOutlined className="cursor-pointer text-12px"
                                    // type="edit"                                
                                    onClick={() => {
                                        // this.props.setEditEvents(item);
                                        // handleUpdateEventModal(true);
                                    }}
                                />
                            )}
                            {item.activity === "Call" && (
                                <EditOutlined className="cursor-pointer text-12px"
                                    // type="edit"                                
                                    onClick={() => {
                                        // this.props.setEditCall(item);
                                        // handleUpdateCallModal(true);

                                    }}
                                />
                            )}
                            {item.activity === "Task" && (
                                <EditOutlined className="cursor-pointer text-12px"
                                    // type="edit"                               
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
                        dataSource={this.props.activitySupplier}
                        loading={this.props.fetchingActivitySupplier}
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

const mapStateToProps = ({ suppliers, auth }) => ({
    activitySupplier: suppliers.activitySupplier,
    fetchingActivitySupplier: suppliers.fetchingActivitySupplier,
   
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getActivityListBySupplierId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuppliersActivityTable);
