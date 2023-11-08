import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import {
  FileDoneOutlined,
  PhoneOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getActivityListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../ShipperAction";
import { setEditCall } from "../../../../../Call/CallAction";
import { setEditEvents } from "../../../../../Event/EventAction";
import { setEditTask } from "../../../../../Task/TaskAction";
import moment from "moment";
// import ShipperCallUpdateModal from "./ShipperCallUpdateModal";
// import ShipperEventUpdateModal from "./ShipperEventUpdateModal";
// import ShipperTaskUpdateModal from "./ShipperTaskUpdateModal";


class ShipperActivityTable extends Component {
  componentDidMount() {
    this.props.getActivityListByShipperId(this.props.shipperId);
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
              {item.activity === "Call" && <PhoneOutlined />}
              {item.activity === "Event" && <ScheduleOutlined />}
              {item.activity === "Task" && <FileDoneOutlined />}
            </>
          );
        },
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
               <ScheduleOutlined
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    // this.props.setEditEvents(item);
                    handleUpdateEventModal(true);
                  }}
                />
              )}
              {item.activity === "Call" && (
               <PhoneOutlined
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    // this.props.setEditCall(item);
                    handleUpdateCallModal(true);
                  }}
                />
              )}
              {item.activity === "Task" && (
               <FileDoneOutlined 
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    // this.props.setEditTask(item);
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
            dataSource={this.props.activityShipper}
            loading={this.props.fetchingActivityShipper}
            scroll={{ y: 320 }}
            pagination={{
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["15", "25", "40", "50"],
            }}
            expandedRowRender={(record) => {
              return (
                <>
                  <div>{record.description || ""}</div>
                </>
              );
            }}
          />
        )}
        {/* <ShipperEventUpdateModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
        />

        <ShipperCallUpdateModal
          updateCallModal={updateCallModal}
          handleUpdateCallModal={handleUpdateCallModal}
        />

        <ShipperTaskUpdateModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  activityShipper: shipper.activityShipper,
  fetchingActivityShipper: shipper.fetchingActivityShipper,
  //  shippershipperId: shipper.shipperDetailsByShipperId.shipperId,
  updateEventModal: shipper.updateEventModal,
  updateCallModal: shipper.updateCallModal,
  updateTaskModal: shipper.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getActivityListByShipperId,
      handleUpdateEventModal,
      handleUpdateCallModal,
      handleUpdateTaskModal,
    //   setEditCall,
      setEditEvents,
      setEditTask,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperActivityTable);
